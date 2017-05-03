// import anquanyun from './chart_theme/zhuti1.json'
import anquanyun from './chart_theme/暗色.json'


class ChartConfig {
    constructor() {
        // console.log(anquanyun)

    }

    theme = anquanyun;

    echartDefault = {

        //提示框
        tooltip: {
            backgroundColor: 'rgba(250,250,250,0.8)',     // 提示背景颜色，默认为透明度为0.7的黑色
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'line',         // 默认为直线，可选为：'line' | 'shadow'
                lineStyle: {          // 直线指示器样式设置
                    color: '#aaa'
                },
                crossStyle: {
                    color: '#aaa'
                },
                shadowStyle: {                     // 阴影指示器样式设置
                    color: 'rgba(200,200,200,0.2)'
                }
            },
            textStyle: {
                color: '#000',
                fontSize: 12
            },
            formatter: "{a} <br/>{b} : {c} " + "条"
        },

        //加载进度默认配置
        showLoading: {
            text: '',
            textColor: '#1c71a7',
            color: '#c23531',

            maskColor: '#021729',
            zlevel: 0
        }
    };


    yhlxColor = {
        "一般隐患": "#0000FF",
        "重大隐患": "#ff3d00",
        "已整改": "#2db54c",
        "未整改": "#ffcf47",
        "企业自查": "#0071BB",
        "政府巡查": "#FFC040",
    };
    colorChartGrop = [
        "#FE5945",
        "#0071BB",
        "#00B9BB",
        "#941633",
        "#FAAF3B",
        "#7BA6DB",
        "#417D9C",
        "#CEB439",
        "#FF9875",
        "#7BA6DB",
        "#16b424",
        "#fc070c"
    ];


}

export default ChartConfig;