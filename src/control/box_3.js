/**
 * Created by liaohui1080 on 2017/3/17.
 */
import React, {Component} from 'react';
import ECharts from 're-echarts';
import ChartConfig from '../charts/chartConfig'
import {Spin, Tag} from 'antd';
import {Http, eventProxy} from '../config';
import './box_3.css';

class Box extends Component {

    constructor(props) {
        super(props);//实现父类的构造函数

        this.http = new Http();


        // console.log(this.props)
        this.height = this.props.height ? this.props.height : 100;


        this.myConfig = new ChartConfig();
        this.myConfig.echartDefault.tooltip.formatter="{a} <br/>{b} : {c} " + "个";

        //准备数据
        this.myOption = {

            color:['#0071BC','#F7931E','#00B9BC'],

            grid: {
                left: '0',
                right: '0',
                bottom: '0',
                top: '0',
                y2: '0',
                containLabel: true
            },
            toolbox: {
                show: true,
                feature: {
                    dataView: {readOnly: false}

                }
            },
            tooltip: this.myConfig.echartDefault.tooltip,
            legend: {
                orient: 'vertical',
                x: 'right',
                data: []

            },
            series: {
                name: '数据来源',
                type: 'pie',
                radius : '70%',
                center: ['50%', '50%'],
                data: [],

            }
        };




        //-------------控件 事件 和初始化------------------------------
        this.state = {
            list: null,
            loading: true,
            title: this.props.title,
            http: {
                url: this.props.url,
                data: null
            },
            options: this.myOption
        };

    }


    componentDidMount() {




        // 监听 msg 事件
        eventProxy.on('shuaxin', (msg) => {
            console.log("shuaxin")

            this.setState({loading: true});
            this.myOption.series.data=[];
            //获取ajax数据
            this.http.getJson({
                url: this.state.http.url,
                callback: (res) => {
                    let echartList = res.data.echart;
                    echartList.map((item ,index)=>{
                        this.myOption.series.data.push({value:item.value, name:item.name})
                    });

                    this.setState({
                        title:res.info,
                        list: res.data,
                        loading: false,
                        options: this.myOption,
                        config: {
                            theme: this.myConfig.theme
                        }
                    });
                }
            });
        })

    }


    componentWillReceiveProps(nextProps) {

        //从父级Props url 获得url连接
        this.setState({
            http: {
                url: nextProps.url
            }
        });

    }

    //
    // componentWillReceiveProps(nextProps) {
    //
    //     console.log('componentWillReceiveProps. 父级 props改变');
    //
    //     //获取ajax数据
    //     this.http.getJson({
    //         url: nextProps.url,
    //         callback: (res) => {
    //             this.setState({list: res.data, title: res.info, loading: false,});
    //         }
    //     });
    //
    // }

    listFn() {


        if (this.state.list) {

            let {totalCount, firstCount, secondCount, thirdCount,ffxmhCount}=this.state.list;
            let {options,config} = this.state;

            return (
                <span>
                    <div className="panel-heading">{this.state.title}</div>
                    <div className="list-group">

                        <li className="list-group-item list-group-item-title text-center">
                            <Tag color="pink-inverse" style={{width:"100%"}}>技术服务机构{totalCount}家</Tag>

                        </li>
                        <li className="list-group-item">
                                <span className="badge">{firstCount} 家</span>

                            <Tag color="pink">甲级</Tag>

                        </li>
                        <li className="list-group-item">
                             <span className="badge">{secondCount} 家</span>

                            <Tag color="green">乙级</Tag>
                        </li>
                        <li className="list-group-item">
                             <span className="badge">{thirdCount} 家</span>

                            <Tag color="purple">丙级</Tag>
                        </li>

                         <li className="list-group-item list-group-item-title text-center" style={{borderBottomWidth:0,paddingTop:30}}>
                            <Tag color="purple-inverse" style={{width:"100%"}}>今年已发放项目号{ffxmhCount}个</Tag>

                        </li>
                    </div>




                    <ECharts option={options} config={config} style={{height:this.height/2-20}} />
                </span>
            );
        }


    }


    render() {

        return (

            <Spin tip="正在加载..." spinning={this.state.loading}>
                <div className="panel panel-default"  style={{height:this.height}}>


                    {this.listFn()}


                </div>
            </Spin>

        )


    }


}

export default Box