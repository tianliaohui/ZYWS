/**
 * Created by liaohui1080 on 2017/3/17.
 */
import React, {Component} from 'react';
import ECharts from 're-echarts';
import ChartConfig from '../charts/chartConfig'
import {Spin} from 'antd';
import {Http, eventProxy} from '../config';
// import './box_4.css';

class Box extends Component {

    constructor(props) {
        super(props);//实现父类的构造函数

        this.http = new Http();


        this.height = this.props.height ? this.props.height : 100;
        // console.log(this.props)

        this.myConfig = new ChartConfig();
        this.myConfig.echartDefault.tooltip.formatter = "{a}<br/>{b}年 : {c} " + "家";

        //准备数据
        this.myOption = {
            color:['#00B9BC','#F7931E','#5B595A'],

            grid: {
                left: '10',
                right: '20',
                bottom: '30',
                top: '15',
                containLabel: true
            },

            tooltip: this.myConfig.echartDefault.tooltip,
            legend: {
                orient: 'horizontal',
                x: 'center',
                y:'bottom',

                data: []

            },


            xAxis: {
                type: 'category',
                data: []
            },
            yAxis: [
                {
                    type: 'value',
                }
            ],
            series: []
        };


        //-------------控件 事件 和初始化------------------------------
        this.state = {
            list: null,
            loading: true,
            title: this.props.title?this.props.title:'默认标题',
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
            this.myOption.series = [];
            this.myOption.xAxis.data = [];
            //获取ajax数据
            this.http.getJson({
                url: this.state.http.url,
                callback: (res) => {

                    let echartList = res.data.echart;


                    this.myOption.xAxis.data=echartList.year

                    echartList.type.map((item, index) => {
                        this.myOption.series.push(
                            {
                                name: item.name,
                                type: 'bar',
                                data: item.data,
                            }
                        );

                        //给图例添加数据
                        this.myOption.legend.data.push(item.name)
                    });



                    this.setState({
                        list: res.data,
                        loading: false,
                        options: this.myOption,
                        title: res.info,
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

            let {options, config} = this.state;

            return (
                <span>
                    <div className="panel-heading">{this.state.title}</div>
                    <ECharts option={options} config={config} style={{height: this.height - 30}}/>


                </span>
            )
        }


    }


    render() {

        return (

            <Spin tip="正在加载..." spinning={this.state.loading}>
                <div className="panel panel-default" style={{height: this.height}}>


                    {this.listFn()}


                </div>

            </Spin>

        )


    }


}

export default Box