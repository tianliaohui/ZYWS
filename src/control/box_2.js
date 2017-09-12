/**
 * Created by liaohui1080 on 2017/3/17.
 */
import React, {Component} from 'react';
import {Spin, Alert,Tag} from 'antd';
import {Http, eventProxy} from '../config';
import NumberAnimat from './NumberAnimat';
import './box_2.css';

class Box extends Component {

    constructor(props) {
        super(props);//实现父类的构造函数

        this.http = new Http();

        this.style = this.props.style ? this.props.style : 100;
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

    alertStyle = {
        whiteSpace: "nowrap",
        background: "#032D4F",
        borderColor: "#1C4960",
        color: "#ffffff",
        fontWeight: 900,
        fontSize: 14,
        padding: 8,
        marginBottom:6
    }

    fontColor={
        color:'#F39F00'
}




   

    listFn() {


        if (this.state.list) {

            let {year, yhCount, cfqyCount, sjldzCount, fkCount, ztqyCount, gbqyCount,yjcqys,sjjczybCount}=this.state.list;




            return (
                <div>
                    <div className="panel-heading">{year}年 {this.state.title}</div>

                    <table className="table">
                        <tbody>
                        <tr>
                            <td>
                                <div className="alert " style={this.alertStyle} role="alert">已检查企业数: <span style={this.fontColor}><NumberAnimat number={yjcqys}/></span> 家 </div>
                            </td>
                            <td>

                                <div className="alert "  style={this.alertStyle} role="alert">查出职业卫生隐患: <span style={this.fontColor}><NumberAnimat number={yhCount}/></span> 条</div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="alert "  style={this.alertStyle} role="alert">处罚企业: <span style={this.fontColor}>{cfqyCount}</span> 家</div>
                            </td>
                            <td>
                                <div className="alert "  style={this.alertStyle} role="alert">罚款: <span style={this.fontColor}>{fkCount}</span> 元</div>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <div className="alert "  style={this.alertStyle} role="alert">责令暂停生产企业数: <span style={this.fontColor}>{ztqyCount}</span> 家</div>
                            </td>
                            <td>
                                <div className="alert "  style={this.alertStyle} role="alert">提请关闭企业数: <span style={this.fontColor}>{gbqyCount}</span> 家</div>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <div className="alert "  style={this.alertStyle} role="alert">涉及劳动者人数: <span style={this.fontColor}>{sjldzCount}</span> 人</div>
                            </td>
                            <td>
                                <div className="alert "  style={this.alertStyle} role="alert">涉及接触职业病危害人数: <span style={this.fontColor}>{sjjczybCount}</span> 人</div>
                            </td>
                        </tr>

                        </tbody>

                    </table>


                </div>
            );
        }


    }


// <tr>
// <td><Alert style={this.alertStyle} message={list.yjcqyCount} type="info"/></td>
// <td><Alert style={this.alertStyle} message={list.gbqyCount} type="info"/></td>
// </tr>
// <tr>
// <td><Alert style={this.alertStyle} message={list.yhCount} type="error"/></td>
//     <td><Alert style={this.alertStyle} message={list.fkCount} type="info"/></td>
//     </tr>
//
//     <tr>
//     <td><Alert style={this.alertStyle} message={list.cfqyCount} type="info"/></td>
//     <td><Alert style={this.alertStyle} message={list.ztqyCount} type="info"/></td>
//     </tr>
//
//     <tr>
//     <td><Alert style={this.alertStyle} message={list.sjldzCount} type="info"/></td>
//     <td><Alert style={this.alertStyle} message={list.gbqyCount} type="info"/></td>
//     </tr>


    render() {

        return (

            <Spin tip="正在加载..." spinning={this.state.loading}>
                <div className="panel panel-default" style={this.style}>
                    
                    {this.listFn()}


                </div>
            </Spin>

        )


    }


}

export default Box