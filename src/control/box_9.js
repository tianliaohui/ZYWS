/**
 * Created by liaohui1080 on 2017/3/17.
 */

import React, {Component} from 'react';
import {Spin, Cascader, Select, Button, Tag, Card, message,Alert,Carousel} from 'antd';
import {Http, eventProxy} from '../config';
import './box_9.css';

class Box extends Component {

    constructor(props) {
        super(props);//实现父类的构造函数

        this.http = new Http();
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeSupervisionGrade = this.onChangeSupervisionGrade.bind(this);
        this.onClickSearch = this.onClickSearch.bind(this);

        this.height = this.props.height ? this.props.height : 100;
        // console.log(this.props)

        //-------------控件 事件 和初始化------------------------------
        this.state = {
            list: null,
            loading: true,
            title: this.props.title,
            http: {
                url: this.props.url,
                data: null
            }
        };


        //存储要发送给服务器的参数
        this.serverSend = {};

    }


    componentDidMount() {




        // 监听 msg 事件
        eventProxy.on('shuaxin', (msg) => {
            console.log("shuaxin")

            this.setState({loading: true});

            //获取ajax数据
            this.http.getJson({
                url: this.state.http.url,
                callback: (res) => {

                    this.setState({list: res.data, loading: false,});
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


    options = [
        {"value": "520100", "label": "贵阳市"}, {
            "value": "520200",
            "label": "六盘水市",
            "children": [{"value": "520201", "label": "钟山区"}, {"value": "520203", "label": "六枝特区"}, {
                "value": "520221",
                "label": "水城县"
            }, {"value": "520222", "label": "盘县"}]
        }, {
            "value": "520300",
            "label": "遵义市",
            "children": [{"value": "520301", "label": "市辖区"}, {"value": "520302", "label": "红花岗区"}, {
                "value": "520303",
                "label": "汇川区"
            }, {"value": "520321", "label": "遵义县"}, {"value": "520322", "label": "桐梓县"}, {
                "value": "520323",
                "label": "绥阳县"
            }, {"value": "520324", "label": "正安县"}, {"value": "520325", "label": "道真仡佬族苗族自治县"}, {
                "value": "520326",
                "label": "务川仡佬族苗族自治县"
            }, {"value": "520327", "label": "凤冈县"}, {"value": "520328", "label": "湄潭县"}, {
                "value": "520329",
                "label": "余庆县"
            }, {"value": "520330", "label": "习水县"}, {"value": "520381", "label": "赤水市"}, {
                "value": "520382",
                "label": "仁怀市"
            }]
        }, {"value": "520400", "label": "安顺市"}, {"value": "520500", "label": "毕节市"}, {
            "value": "520600",
            "label": "铜仁市"
        }, {"value": "522300", "label": "黔西南布依族苗族自治州"}, {"value": "522600", "label": "黔东南苗族侗族自治州"}, {
            "value": "522700",
            "label": "黔南布依族苗族自治州"
        }];


    onChangeCity(value) {
        console.log(value);
        let arrayLast = value[value.length - 1];
        this.serverSend.city = arrayLast;


    }

    onChangeSupervisionGrade(value) {
        console.log(value);
        this.serverSend.supervisionGrade = value;

    }


    onClickSearch(value) {
        console.log(this.serverSend);

        //如果对象没有子内容,则返回提示
        if (this.serverSend.city || this.serverSend.supervisionGrade) {
            console.log("存在")

            this.setState({
                loading: true
            });
            //获取ajax数据
            this.http.getJson({
                url: this.state.http.url,
                data: this.serverSend,
                callback: (res) => {

                    setTimeout(() => {
                        this.setState({list: res.data, loading: false,});

                    }, 1000);

                }
            });
        } else {

            console.log("不存在")
            message.error('请输入筛选内容');
            this.serverSend = {};
        }


    }


    // info() {
    //     message.info('This is a normal message');
    // };

    antTag = {
        padding: "0 5px",
        margin: 0,
        lineHeight: "20px",
        height: 20
    };

    antTag2 = {
        padding: 0,
        lineHeight: "20px",
        height: 20,
        background:'transparent',
        border:'none',
        margin:0,
        fontWeight:1000
    };


    listFn() {


        if (this.state.list) {

            const options = this.options;

            let list = this.state.list;


            let abc = [];


            //如果没有数据, 有数据显示循环列表,没有就先是 没有
            if(list.length>0){
                list.map((item, index) => {

                    abc.push(

                        <div key={index}>
                        <div className="panel panel-primary"   >
                            <div className="panel-heading">
                                <div className="panel-title pull-left">{item.qymc}</div>

                                <div className="pull-right">
                                    <Tag color={item.qyzt === "正常生产" ? "green" : "orange"}
                                         style={this.antTag2}>{item.qyzt}</Tag>

                                </div>
                            </div>
                            <div className="panel-body" >

                                <table className="table" style={{margin:0}}>
                                    <tbody>
                                        <tr>
                                            <td>年度检测评价工作情况:&nbsp;<Tag color={item.ndpjjc === "已完成" ? "blue-inverse" : "pink"}
                                               style={this.antTag}>{item.ndpjjc}</Tag>
                                            </td>
                                            <td>岗位/工种超标点数:&nbsp;<Tag color="blue-inverse" style={this.antTag}>{item.gwgzcbds}</Tag>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>今年已检查次数:&nbsp;&nbsp;
                                                <Tag color="blue-inverse" style={this.antTag}>{item.yjcds} 次</Tag>
                                            </td>
                                            <td>今年查处隐患数:&nbsp;&nbsp;
                                                <Tag color="blue-inverse" style={this.antTag}>{item.ccyhts} 条</Tag>
                                            </td>
                                        </tr>
                                        <tr>

                                            <td>累计职业病发病人数:&nbsp;&nbsp;
                                                <Tag color="red-inverse" style={this.antTag}>{item.ljzybfbrs} 人</Tag>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>


                            </div>
                        </div>
                        </div>
                    )

                });
            }else{
                abc.push(
                    <Alert message="没有内容" type="warning" />
                )
            }







            return (
                <span>
                    <div className="panel-heading"
                         style={{lineHeight: "20px", paddingRight: 0, paddingTop: 1, whiteSpace: "nowrap"}}>
                        {this.state.title}
                        <Button size="small" type="primary"
                                className="pull-right"
                                onClick={this.onClickSearch}
                                style={{borderRadius: 0, marginRight: 1}}>确定</Button>


                        <Cascader className="pull-right" size="small"
                                  style={{width: 100, color: "#333333", marginRight: 2}}

                                  options={options}
                                  onChange={this.onChangeCity}
                                  placeholder="选择城市"/>


                        <Select size="small" className="pull-right" style={{width: 100, marginRight: 2}}
                                onChange={this.onChangeSupervisionGrade} placeholder="监管等级查询">
                          <Option value="">不选择</Option>
                          <Option value="01">严重</Option>
                          <Option value="01">严重</Option>
                          <Option value="02">较重</Option>
                          <Option value="03">一般</Option>

                        </Select>
                    </div>


                      <div className="panel-body" style={{height: this.height - 30, padding: 10, overflowY: "hidden"}}>
                   

                        <Carousel
                        autoplay 
                        vertical="true"
                        dots="false"
                        slidesToShow="3" >
                            {abc}
                        </Carousel>
                        

                      </div>




                </span>
            )
        }


    }


    render() {


        return (

            <Spin tip="正在加载..." spinning={this.state.loading}>
                <div className="panel panel-default " style={{height: this.height}}>


                    {this.listFn()}


                </div>

            </Spin>

        )


    }


}

export default Box
