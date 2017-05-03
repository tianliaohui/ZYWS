

import React, {Component} from 'react';
import {Button} from 'antd';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import './App.css';
import './animate.min.css';
import {Http,eventProxy} from './config';
import  {Box_1,Box_2,Box_3,Box_4,Box_5,Box_6,Box_7,Box_8,Box_9,Box_10} from './control/index'
// import moduleUrl from './config.json'


class App extends Component {


    constructor(props) {
        super(props);//实现父类的构造函数
        this.http = new Http();

        this.state = {refreshLoading: false}
        this.refresh=this.refresh.bind(this)
        // console.log(moduleUrl.data)
    }


    componentDidMount() {
        console.log(this.state);



        //获取ajax数据
        this.http.getJson({
            url: 'server_json/config.json',
            callback: (res) => {

                this.setState({
                    ...res.data
                });

                this.refresh()

            }
        });

    }


    //刷新
    refresh(){
        this.setState({
            refreshLoading: true
        });

        setTimeout(()=>{

            eventProxy.trigger('shuaxin', {});

            this.setState({
                refreshLoading: false
            });



        },1000);


    }



    render() {

        return (


            <div className="row">


                <div className="col-sm-12 ">
                    <div className="row">
                        <div className="col-sm-12 col-padding-0">
                            <div className="panel panel-default title  animated fadeInDown">

                                <span style={{fontSize:35}}>职业卫生监管综合展示</span>

                                <Button type="danger"  loading={this.state.refreshLoading}
                                        style={{margin:16}}
                                        className="pull-right"
                                        shape="circle"
                                        icon="reload"
                                        size="small"
                                        onClick={this.refresh} />
                            </div>
                        </div>

                    </div>


                    <div className="row">



                        {/*左*/}
                        <div className="col-md-4">
                            <div className="row">
                                <div className="col-sm-12 col-padding-0 animated fadeInDown">
                                    <Box_1 url={this.state.module_1}  height={220} title="信息推送"/>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-sm-6 col-padding-0 animated fadeInDown">
                                    <Box_5 url={this.state.module_5}  height={285} title="职业健康检查人数"/>
                                </div>
                                <div className="col-sm-6 col-padding-0 animated fadeInDown">
                                    <Box_6 url={this.state.module_6}  height={285} title="职业病人数"/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-12 col-padding-0 animated fadeInDown">
                                    <Box_8 url={this.state.module_8} height={475} title='"三同时" 工作情况'/>
                                </div>
                            </div>


                        </div>





                        {/*中*/}
                        <div className="col-md-4">

                            <div className="row">
                                <div className="col-sm-12 col-padding-0 animated fadeInDown">

                                    <Box_7 url={this.state.module_7} height={220} title="全省企业概况"/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-12 col-padding-0 animated fadeInDown">
                                    <Box_2 url={this.state.module_2} style={{height:285}} title="2017年职业卫生执法信息"/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-12 col-padding-0 animated fadeInDown">
                                    <Box_9 url={this.state.module_9} height={475} title="重点监管企业状态"/>
                                </div>
                            </div>

                        </div>


                        {/*右*/}
                        <div className="col-md-4">

                            <div className="row">

                                <div className="col-sm-7 col-padding-0 animated fadeInDown">
                                    <Box_3 url={this.state.module_3}  height={511} title="全省技术服务机构情况"/>
                                </div>
                                <div className="col-sm-5 ">


                                    <Box_4 url={this.state.module_4} height={515} title="文本内容"/>
                                </div>


                            </div>


                            <div className="row">
                                <div className="col-sm-12 col-padding-0 animated fadeInDown">
                                    <Box_10 url={this.state.module_10} height={475} title="完成检测评价工作情况"/>
                                </div>
                            </div>

                        </div>





                    </div>

                </div>


            </div>

        );
    }


}

export default App;

