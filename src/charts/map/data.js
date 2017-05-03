/**
 * Created by liaohui1080 on 2017/3/4.
 */

import _ from 'underscore';

import 贵州省 from './sheng/贵州省.json';
import 六盘水 from './shi/六盘水.json';
import 安顺 from './shi/安顺.json';
import 毕节 from './shi/毕节.json';
import 贵阳 from './shi/贵阳.json';
import 遵义 from './shi/遵义.json';
import 铜仁 from './shi/铜仁.json';
import 黔东南 from './shi/黔东南.json';
import 黔南 from './shi/黔南.json';
import 黔西南 from './shi/黔西南.json';





class Data {
    constructor() {

        console.log("加载地图数据完成");


        //地图列表
        this.mapList = [];


        //省级地图
        let mapListSheng = {id: "520000", name: "贵州省", mapData: 贵州省};


        //市级地图列表
        let mapListShi = [

            //市级地图
            {id: "520100", name: "贵阳", mapData: 贵阳},
            {id: "520400", name: "安顺", mapData: 安顺},
            {id: "520200", name: "六盘水", mapData: 六盘水},
            {id: "522300", name: "黔西南", mapData: 黔西南},
            {id: "520500", name: "毕节", mapData: 毕节},
            {id: "522600", name: "黔东南", mapData: 黔东南},
            {id: "522700", name: "黔南", mapData: 黔南},
            {id: "520600", name: "铜仁", mapData: 铜仁},
            {id: "520300", name: "遵义", mapData: 遵义},
        ];


        //把所有市级地图下面的县级地图 添加到 地图列表中
        mapListShi.map((item, index) => {
            // console.log(item.mapData.features);
            this.mapList.push(item);
            item.mapData.features.map((item, index) => {

                let aaa = {
                    // UTF8Encoding: true,
                    type: "FeatureCollection",
                    features: [item]
                };
                this.mapList.push({
                    id: item.id,
                    name: item.properties.name,
                    mapData: aaa
                })

                // console.log(this.mapList);
            });

        });


        // this.mapList.push(mapListShi);

        //追加省道 数组里
        this.mapList.push(mapListSheng);
        // console.log(this.mapList)

    }


    findMap(cityID) {
        // console.log(cityID);
        // console.log(this.mapList);
        let numberRow = _.findIndex(this.mapList, {id: cityID});

        // console.log(this.mapList[numberRow]);
        // console.log(this.mapList[numberRow]);
        return this.mapList[numberRow]
    }

    findMapArry(cityIDArry) {

        // console.log(cityIDArry)


        //获取父级地图

        let abc = {
            UTF8Encoding: false,
            type: "FeatureCollection",
            features: []
        };

        let superMap = this.mapList[_.findIndex(this.mapList, {id: cityIDArry.superMap})];
        // console.log(superMap)
        let superMapArry = superMap.mapData.features;
        // console.log(superMapArry);

        _.map(cityIDArry.cityID, (row) => {
            // console.log(row);

            let mapData = superMapArry[_.findIndex(superMapArry, {id: row})];
            // console.log(this.mapList[_.findIndex(this.mapList, {id:row})]);
            console.log(mapData);
            abc.features.push(mapData)
        });

        return abc;
    }

}

export default Data;