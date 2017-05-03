/*
 * 形式 ,受控组件
 * react 0.13.3 版本代码

 * */

import _ from 'underscore';

import React, {Component} from 'react';
import './index.css';
import MapView from './map';
import {Button, MenuItem, DropdownButton, ButtonToolbar} from 'react-bootstrap';
import {eventProxy} from '../../config';


class Map extends Component {


    //定义一个构造函数
    constructor(props) {
        super(props);//实现父类的构造函数
        //分局数据
        this.bureauBlock = [


            {
                "id": "119", /* 分局ID*/
                "name": "水城分局", /* 分局名称*/
                "jgdq": ["520200"]
            }, {
                "id": "118",
                "name": "林东分局",
                "jgdq": ["520100", "522600", "522700", "520400"]
            }, {
                "id": "120",
                "name": "遵义分局",
                "jgdq": ["520300", "520600"]
            }, {
                "id": "121",
                "name": "盘江分局",
                "jgdq": ["522300"]
            }, {
                "id": "122",
                "name": "毕节分局",
                "jgdq": ["520500"]
            }
        ];


        //事件注册
        this.reset = this.reset.bind(this);
        this.back = this.back.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.transferMsg = this.transferMsg.bind(this);


        //state 或者 setState 一般都放在方法的最下面, 所有数据都准备好或者修改好的时候, 在去更新组件
        this.state = {
            mapTitle: null,
            reset: null, //恢复到最初地图
            back: null, //依次返回
            selectMapArry: null, //根据下拉菜单数组 返回地图
            backBtnShow: false
        };

    }


    //组件加载完成后第一个发送广播
    componentDidMount() {

        //给所有控件发送广播,告诉他们要刷新了
        setTimeout(() => {
            eventProxy.trigger('cityID', {xzbm: '520000'});
        }, 1000);
        console.log('componentDidMount')
        console.log(this.state)

    }


    selectInit() {
        let children2 = [];
        this.bureauBlock.map((item, index) => {
            {/*children2.push(<Option key={item.id}>{item.name}</Option>)*/
            }
            children2.push(<MenuItem eventKey={item.id} onSelect={this.selectChange}>{item.name}</MenuItem>)
        });
        return children2;


    }


    selectChange(value) {

        //返回分局的 城市 id
        let aa = this.bureauBlock[_.findIndex(this.bureauBlock, {id: value})];
        // console.log(aa)
        this.setState({
            reset: null, //恢复到最初地图
            back: null, //依次返回
            backBtnShow: false, //隐藏返回按钮
            selectMapArry: {superMap: "520000", cityID: aa.jgdq}
        });


        eventProxy.trigger('cityID', {bureauID: aa.id});//发广播博
        this.selectTitle = aa.name; //设置下拉菜单标题

        //设置地图标题
        this.setState({

            mapTitle: aa.name,

        });

    }


    back() {
        this.setState({
            back: true,
            reset: null, //恢复到最初地图
            selectMapArry: null, //根据下拉菜单数组 返回地图
        });
        this.selectTitle = false;
    }


    reset() {

        this.setState({
            back: null, //依次返回
            reset: true,
            selectMapArry: null, //根据下拉菜单数组 返回地图
        });
        this.selectTitle = false;
    }


    //接受子组件传过来的城市id消息
    transferMsg(msg) {

        this.setState({
            reset: null, //恢复到最初地图
            back: null, //依次返回
            mapTitle: msg.cityName,
            selectMapArry: null, //根据下拉菜单数组 返回地图
            backBtnShow: msg.backBtnShow, //根据子控件传过来的数据 来决定 按钮是否显示
        });

        // console.log(msg)
        //子组件点击事件发生的时候, 给所有控件发广播
        eventProxy.trigger('cityID', {xzbm: msg.cityID});


    }


    render() {
        let select=(

            <ButtonToolbar className="pull-right">
                <DropdownButton className="select3" title={this.selectTitle ? this.selectTitle : "选择分局"}>
                    <MenuItem onSelect={this.reset}>总局</MenuItem>

                    {this.selectInit()}
                </DropdownButton>
            </ButtonToolbar>
        );

        let btnIndex=(<Button bsStyle="primary" className='btn1' onClick={this.reset}>全省</Button>);

        let divShow = null;
        if (this.state.backBtnShow) {

            //显示返回按钮
            divShow = ( <div className=" map">
                <div className="g-sd51">
                    {btnIndex}
                </div>
                <div className="g-mn5">
                    <div className="g-mn5c map-title">
                        {this.state.mapTitle}
                    </div>
                </div>
                <div className="g-sd52">
                    <Button bsStyle="danger" className="btn2  pull-right"  onClick={this.back}>返回</Button>

                    {select}

                </div>
            </div>)


        } else {

            //隐藏返回按钮
            divShow = ( <div className=" map">
                <div className="g-sd51">
                    {btnIndex}
                </div>
                <div className="g-mn52">
                    <div className="g-mn5c2 map-title">
                        {this.state.mapTitle}
                    </div>
                </div>
                <div className="g-sd522">

                    {select}

                </div>
            </div>)
        }


        return (
            <div>

                {divShow}


                <div className="panel panel-default map-region">
                    <MapView
                        transferMsg={this.transferMsg}
                        reset={this.state.reset}
                        back={this.state.back}
                        selectMapArry={this.state.selectMapArry}
                        style={this.props.style}
                    />
                </div>
            </div>


        )
    }
}


export default Map;