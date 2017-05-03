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
        this.myConfig.echartDefault.tooltip.formatter="{b}年 : {c} " + "人";

        //准备数据
        this.myOption = {

            color:['#F24452'],

            grid: {
                left: '10',
                right: '20',
                bottom: '10',
                top: '15',
                containLabel: true
            },

            tooltip: this.myConfig.echartDefault.tooltip,
            legend: {
                orient: 'vertical',
                x: 'right',
                data: []

            },


            xAxis:
                {

                    splitLine: {
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: '#173452'
                        }
                    },
                    //设置坐标轴文字颜色
                    axisLabel: {
                        textStyle: {color: "#0096FC"}
                    },
                    type: 'category',
                    boundaryGap: false,
                    data: [],

                },
            yAxis: [
                {
                    type: 'value',
                    //设置坐标轴边框颜色
                    splitLine: {
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: '#173452'
                        }
                    },
                    //设置坐标轴文字颜色
                    axisLabel: {
                        textStyle: {color: "#0096FC"}
                    }
                }
            ],
            series: {
                name: '数据来源',
                type: 'line',
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
            this.myOption.xAxis.data=[];
            //获取ajax数据
            this.http.getJson({
                url: this.state.http.url,
                callback: (res) => {

                    let echartList = res.data.echart;
                    echartList.map((item ,index)=>{
                        this.myOption.series.data.push(item.count)
                        this.myOption.xAxis.data.push(item.year)
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

            let {options,config} = this.state;

            return (
                <span>
                    <div className="panel-heading">{this.state.title}</div>
                    <ECharts option={options} config={config} style={{height:this.height-30}} />


                </span>
            )
        }


    }


    render() {

        return (

            <Spin tip="正在加载..." spinning={this.state.loading}>
                <div className="panel panel-default" style={{height:this.height}}>


                    {this.listFn()}


                </div>

            </Spin>

        )


    }


}

export default Box