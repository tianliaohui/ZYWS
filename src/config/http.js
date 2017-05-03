/**
 * Created by liaohui1080 on 2017/3/10.
 */

import http from 'superagent';
class Http {


    componentDidMount() {
        console.log("Http 加载成功")
    }

    //所有ajax前面所要加的HTTP地址
    HTTP = "";
    // var HTTP = "/proxy/42.123.116.131/";

    status(status) {
        switch (status) {
            case 200:
                console.log("200,连通");
                return {status: true, info: "200,连通"}
                break;
            case 404:
                console.log("404,请求的文件不存在");
                return {status: false, info: "404,请求的文件不存在"}
                break;
            case 500:
                console.log("500,服务器错误");
                return {status: false, info: "500,服务器错误"}
            default:
                console.log("参数不符合要求");
                return {status: false, info: "参数不符合要求"}
        }
    }

    postJson(o) {

        http.post(o.url)
            .send(o.data)
            .set('X-API-Key', 'foobar')
            .set('Accept', 'application/json')
            .end(o.callback);
    }


    getJson(o) {

        http.get(o.url)
            .query(o.data)
            .set('X-API-Key', 'foobar')
            .set('Accept', 'application/json')
            .end((err, res) => {

                //res.ok =true 说明 请求是成功的
                if (typeof res.ok) {
                    o.callback(res.body)
                } else {
                    alert(this.status(res.status).info + '\n' + o.url)
                }

            });
    }


}

export default Http;