/**
 * Created by liaohui1080 on 2017/3/17.
 */
import React, {Component} from 'react';
import {Spin, Card} from 'antd';
import {Http, eventProxy} from '../config';
// import './box_4.css';

class Box extends Component {

    constructor(props) {
        super(props);//实现父类的构造函数

        this.http = new Http();


        this.height = this.props.height ? this.props.height : 100;
        // console.log(this.props)

        //-------------控件 事件 和初始化------------------------------
        this.state = {
            list: null,
            loading: true,
            title: '默认主题',
            http: {
                url: this.props.url,
                data: null
            }
        };

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
            let height= this.height/2-5
            let list=this.state.list;
            let abc = [];


            list.map((item, index) => {

                abc.push(

                    <div className="row" key={index}>
                        <div className="col-sm-12 col-padding-0">
                            <div className="panel panel-default" style={{height:height}}>
                                <div className="panel-heading">{item.title}</div>
                                <div className="panel-body" style={{fontSize:14}}>
                                    {item.content}


                                </div>

                            </div>
                        </div>
                    </div>

                )


            });

            console.log(list)
            return abc;
        }


    }


    render() {

        return (

            <Spin tip="正在加载..." spinning={this.state.loading}>
                <div style={{height:this.height}}>




                    {this.listFn()}

                </div>

            </Spin>

        )


    }


}

export default Box