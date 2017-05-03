/*
 * 形式 ,受控组件
 * react 0.13.3 版本代码

 * */

import _ from 'underscore';
import React, {Component} from 'react';


import BasisChart from './basis_chart';
import Data from './data'; //导入地图数据




class Map extends Component {


    //定义一个构造函数
    constructor(props) {
        super(props);//实现父类的构造函数

        // this.mapData = new MapData();
        this.mapData = new Data();


        this.onClickMap = this.onClickMap.bind(this);
        this.resetClick = this.resetClick.bind(this);
        this.backClick = this.backClick.bind(this);


        //城市列表,数组的第一个值,就是第一次加载的地图数据
        //共有两个参数 一个是 id  一个是name
        this.cityList = [{cityID:'520000',cityName:"贵州省"}];

        //返回array（数组）的第一个元素
        this.arrayFirst = _.first(this.cityList);

        //城市层级 计步器, 用来记录 进入哪一级的地图
        this.cityLevelStep = this.cityList.length;


        //state 或者 setState 一般都放在方法的最下面, 所有数据都准备好或者修改好的时候, 在去更新组件
        this.state = {
            mapData: this.mapData.findMap(this.arrayFirst.cityID).mapData
        };


        //如果 从父组件传过来的 props参数忘了, 可以用这个打印
        // console.log(this.props);


    }



    //地图点击事件
    onClickMap(item) {


        //如果返回的地图数据数组长度 大于1的话,说明还有下级地图, 这时候就把获取的这个 城市id追加的 cityList里面
        //并且更新 cityLevelStep 计步器的变量,
        //如果返回的地图数组长度 等于一的话,说明已经到最后一层了, 只有一个地图了, 这时候就只需要在数组的最后增加一个城市id就行了,
        //这时候计步器刚好记录到上一次数组长度,拿这个长度来设置数组的最后一位刚刚好,就是数组的最后一位
        if (this.mapData.findMap(item.data.id).mapData.features.length > 1) {

            this.cityList.push({cityID:item.data.id,cityName:item.data.name});

            this.cityLevelStep = this.cityList.length;

        } else if (this.mapData.findMap(item.data.id).mapData.features.length === 1) {

            // this.cityList[this.cityLevelStep] = item.data.id;
            this.cityList[this.cityLevelStep] = {cityID:item.data.id,cityName:item.data.name};

        }

        //根据点击事件获取的 城市id 来显示当前的地图,这里要放在下面,当所有数据都准备好之后,在设置setState,这样才能刷新控件的时候,得到数据变化的数据
        this.setState({
            mapData: this.mapData.findMap(item.data.id).mapData
        });

        //给父组件 发送城市id 和城市名字消息 backBtnShow控制返回按钮是否显示的
        this.props.transferMsg({cityID:item.data.id,cityName:item.data.name,backBtnShow:true});
        // console.log(this.cityList.length);
        // console.log(this.cityLevelStep);
        // console.log(this.cityList)

    }


    //复位地图到最初界面, 也就是页面加载进来时候的 地图
    resetClick() {




        //初始化 cityList 数据为 数组的第一个数据
        this.cityList = [this.arrayFirst];

        //重新设置 地图数据
        this.setState({
            mapData: this.mapData.findMap(this.arrayFirst.cityID).mapData
        });


        //给父组件发消息
        this.props.transferMsg(this.arrayFirst);
    }


    /*
     *依次返回上级城市地图
     *
     * 每次返回时 删除一个 cityList 里面存储的城市id,然后在获取 数组随后一个元素, 用过这个元素去查找地图
     * */
    backClick() {

        //返回数组最后一个元素
        let arrayLast=null;


        //如果 cityList 的长度大于一说明 还没有回到最初
        if (this.cityList.length > 1) {

            //删除数组最后一位元素
            this.cityList.pop();

            //返回数组最后一个元素
            arrayLast = _.last(this.cityList);


            this.setState({
                mapData: this.mapData.findMap(arrayLast.cityID).mapData
            });

            //返回按钮显示
            arrayLast.backBtnShow=true;

            //给父组件发消息
            this.props.transferMsg(arrayLast)
        }

        if(this.cityList.length === 1) {

            //返回按钮隐藏
            arrayLast.backBtnShow=false;

            //给父组件发消息
            this.props.transferMsg(arrayLast)
        }


    }



    componentDidMount() {


        //在组件显示出来的时候,给父组件发送消息,
        this.props.transferMsg(this.arrayFirst);
        // console.log('componentDidMount---map')
    }


    //父组件的 props 有变化的时候运行
    componentWillReceiveProps(nextProps){

        //返回最初状态地图
        if(nextProps.reset===true){
            this.resetClick()
        }

        //依次返回直到最初地图
        if(nextProps.back===true){
            this.backClick()
        }


        //根据下拉菜单 返回地图
        if(nextProps.selectMapArry){
            // this.backClick()
            this.setState({
                mapData: this.mapData.findMapArry(nextProps.selectMapArry)
            });
        }


    }


    render() {

        return (
            <BasisChart style={this.props.style} data={this.state.mapData} event={[{type: 'click', handler: this.onClickMap}]}/>
        )
    }
}

export default Map;



