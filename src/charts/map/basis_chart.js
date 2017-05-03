/*
 * 形式 ,受控组件
 * react 0.13.3 版本代码

 * */


import React, {Component} from 'react';
import echarts from 'echarts';
import ECharts from 're-echarts';
import ChartConfig from '../chartConfig'

class BasisChart extends Component {


    //定义一个构造函数
    constructor(props) {
        super(props);//实现父类的构造函数
        this.myConfig=new ChartConfig();


        this.state = {
            mapOption: this.options(this.mapCityCode(this.props.data)),
            mapConfig: {
                theme:this.myConfig.theme,
                event: this.props.event
            }
        };


    }

    //图表样式
    chartsStyle = this.props.style ? this.props.style :{height:357};


    componentWillReceiveProps(nextProps){
        this.setState({
            mapOption: this.options(this.mapCityCode(nextProps.data)),

        });


    }

     options(o) {



        return {
            backgroundColor: 'rgb(255,255,255,0)',
            series: [{
                type: 'map',
                mapType: 'guizhou',
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            color: "white"
                        }
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            color: "white"
                        }
                    },
                },

                data: o,

            }]
        }
    }



    //获取地图的地区编码
    mapCityCode(mapData) {
        // console.log(mapData)
        let cityCode = [];
        //通过循环把 城市id编码 放到 data里
        mapData.features.map((item, index) => {
            // console.log(item)
            cityCode[index] = {name: item.properties.name, id: item.id}
        });
        return cityCode
    }




    render() {

        //设置地图数据到 图表里,,放在这里的原因是,  只有 state 更新的时候, render 才回刷新
        echarts.registerMap('guizhou', this.props.data);

        let {mapConfig, mapOption} = this.state;
        // console.log(this.props.data);

        return (
            <ECharts option={mapOption} config={mapConfig} style={this.chartsStyle}/>
        )
    }
}


export default BasisChart;