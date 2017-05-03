import React, {Component} from 'react';
import ECharts from 're-echarts';
import ChartConfig from './chartConfig'
import {Http, eventProxy} from '../config';


class Bar extends Component {

    constructor(props) {
        super(props);//实现父类的构造函数

        this.http = new Http();
        this.myConfig = new ChartConfig();

        //准备数据
        this.myOption = {

            // 图表标题
            title: {

                text: "默认",
                textStyle: {
                    fontSize: 12,
                },
                x: "left",
                y: "top",
                backgroundColor: "#032D4F",
            },

            grid: {
                left: '10',
                right: '20',
                bottom: '30',
                top: '40',
                y2: '140',
                containLabel: true
            },
            toolbox: {
                show: true,
                feature: {
                    dataView: {readOnly: false},
                    magicType: {type: ['line', 'bar']},

                }
            },
            tooltip: this.myConfig.echartDefault.tooltip,
            showLoading:this.myConfig.echartDefault.showLoading,
            xAxis: {
                type: 'category',
                axisLine: {
                    lineStyle: {
                        width: 1,
                        color: "#1c4960",
                        fontSize: 12,
                    }
                },
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                    interval: 0,
                    rotate: -40
                },

                data: []
            },
            yAxis: {
                type: 'value',
            },
            series: {
                name: '数据来源',
                type: 'bar',
                barWidth: '50%',
                data: [],

            }
        };


        //图表样式
        this.chartsStyle = this.props.style ? this.props.style :{height:300};




        //-------------控件 事件 和初始化------------------------------
        this.state = {
            http: {
                url: this.props.url
            },
            options: this.myOption,
            config: {
                showLoading: true,
                loadingOption: this.myConfig.echartDefault.showLoading
            }
        };


    }




    componentWillReceiveProps(nextProps){

        //从父级Props url 获得url连接
        this.setState({
            http: {
                url: nextProps.url
            }
        });

    }




    //控件加载成功后第一个运行
    componentDidMount() {

        // 监听 msg 事件
        eventProxy.on('cityID', (msg) => {
            // console.log(msg)
            this.setState({
                config: {

                    showLoading: true
                }

            });


            //清空图表数据
            this.myOption.series.data = [];
            this.myOption.xAxis.data = [];


            //获取ajax数据
            this.http.getJson({
                url: this.state.http.url,
                data: msg,
                callback: (res) => {

                    res.data.map((item, index) => {

                        this.myOption.series.data.push(item.xzzfNum)
                        this.myOption.xAxis.data.push(item.name)
                    });

                    this.myOption.title.text=res.info;

                    //把获取的数据, 设置到图表里
                    this.setState({
                        options: this.myOption,
                        config: {
                            theme: this.myConfig.theme,
                            event: [{type: 'click', handler: this.onMapClicked}],
                            showLoading: false,
                            loadingOption: this.myConfig.echartDefault.showLoading
                        }
                    });
                }
            });

        });


    }

    render() {

        let {config, options} = this.state;
        return (
            <ECharts option={options} config={config} style={this.chartsStyle}/>

        )
    }

}

export default Bar;
