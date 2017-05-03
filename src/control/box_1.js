/**
 * Created by liaohui1080 on 2017/3/17.
 */
import React, {Component} from 'react';
import {Spin} from 'antd';
import {Http, eventProxy} from '../config';
import './box_1.css';

class Box_1 extends Component {

    constructor(props) {
        super(props);//实现父类的构造函数

        this.http = new Http();

        this.height = this.props.height ? this.props.height : 100;

        // console.log(this.props)

        //-------------控件 事件 和初始化------------------------------
        this.state = {
            loading: true,
            title: '默认主题',
            http: {
                url: this.props.url,
                data: null
            }
        };

    }


    // componentDidMount() {
    //
    //     console.log(this.state)
    //
    //     if (this.state.http.url) {
    //         //获取ajax数据
    //         this.http.getJson({
    //             url: this.state.http.url,
    //             callback: (res) => {
    //
    //                 this.setState({list: res.data});
    //             }
    //         });
    //     }
    //
    //
    // }


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
    //


    componentDidMount() {




        // 监听 msg 事件
        eventProxy.on('shuaxin', (msg) => {
            console.log("shuaxin")

            this.setState({loading: true});

            //获取ajax数据
            this.http.getJson({
                url: this.state.http.url,
                callback: (res) => {

                    this.setState({list: res.data, title: res.info, loading: false,});
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
        let abc = [];

        if (this.state.list) {




            this.state.list.map((item, index) => {

                switch (item.type) {
                    case '异常信息':
                        abc.push(
                            <a href="#" key={index} className="list-group-item list-group-item-danger"
                               style={{ whiteSpace:"nowrap"}}>
                                <span className="label label-danger"> {item.type}</span>
                                &nbsp;&nbsp;{item.content}</a>
                        );

                        break;

                    case '系统消息':
                        abc.push(
                            <a href="#" key={index} className="list-group-item" style={{ whiteSpace:"nowrap"}}>
                                <span className="label label-primary" >{item.type}</span>
                                &nbsp;&nbsp;{item.content}</a>
                        );
                        break;
                }


            });
        }


        return (
            <div>
                <div className="panel-heading">{this.state.title}</div>

                <div className="list-group">
                    {abc}

                </div>
            </div>
        );
    }


    render() {

        return (

            <Spin tip="正在加载..."  spinning={this.state.loading}>
                <div className="panel panel-default  " style={{height:this.height}}>
                    {this.listFn()}


                </div>
            </Spin>

        )


    }


}

export default Box_1