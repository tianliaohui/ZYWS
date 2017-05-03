/**
 * Created by liaohui1080 on 2017/3/17.
 */
import React, {Component} from 'react';
import ECharts from 're-echarts';
import ChartConfig from '../charts/chartConfig'
import {Spin, Tag,Card} from 'antd';
import {Http, eventProxy} from '../config';
// import './box_4.css';

class Box extends Component {

    constructor(props) {
        super(props);//实现父类的构造函数

        this.http = new Http();


        this.height = this.props.height ? this.props.height : 100;
        // console.log(this.props)

        this.myConfig = new ChartConfig();
        this.myConfig.echartDefault.tooltip.formatter="{a} <br/>{b} : {c} " + "%";

        //准备数据
        this.myOption = {

            color:['#F24452','#5EA0A9','#FF8C14'],
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

            //清空图表数据
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



    listFn() {


        if (this.state.list) {

            let {allQyCount,ldzCount,zybwhCount,ywcsbqyCount} = this.state.list;
            let {options,config} = this.state;
            return (
                <span>
                    <div className="panel-heading">{this.state.title}</div>




                    <div className="row">
                            <div className="col-sm-5">
                        <div className="panel-body" style={{padding: 10}}>

                                <table className="table" style={{margin:0}}>
                                    <tbody>
                                    <tr>
                                    <td><Tag color="#032D4F" >已登记企业总数: {allQyCount}家</Tag></td>
                                    </tr>
                                    <tr>
                                    <td><Tag color="#032D4F" >已完成申报企业数: {ywcsbqyCount}家</Tag></td>
                                    </tr>
                                    <tr>
                                    <td><Tag color="#032D4F" >已申报企业劳动者总人数: {ldzCount}人</Tag></td>
                                    </tr>
                                    <tr>
                                    <td><Tag color="#032D4F" >已申报企业涉及接触职业病危害人数: {zybwhCount}人</Tag></td>
                                    </tr>

                                    </tbody>
                                </table>
                    </div>
                            </div>
                            <div className="col-sm-7">
                                <ECharts option={options} config={config} style={{height:this.height-25}} />
                            </div>
                    </div>




                </span>
            )
        }


    }


    render() {

        return (

            <Spin tip="正在加载..." spinning={this.state.loading}>
                <div className="panel panel-default " style={{height:this.height}}>


                    {this.listFn()}


                </div>

            </Spin>

        )


    }


}

export default Box