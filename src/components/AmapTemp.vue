<template>
  <div id="container" style="height: calc(100% - 48px);width:calc(100% - 74px);"></div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'
import { onMounted,shallowRef,ref} from "vue";
window._AMapSecurityConfig = {
  //这里的安全密钥不写会导致 行政区查询等API无法使用
  securityJsCode: '9a7876091dd8278d2c669202addeab5f',
};
export default {
  name: "AmapTemp",
   setup() {
    const map = shallowRef(null)
     const driving = ref(null)

     //地图初始化
    function mapInit(){
          AMapLoader.load({
            "key": "cf818aba226d51af0ea4ca8428cb59f9",          // 申请好的Web端开发者Key，首次调用 load 时必填
            "version": "1.4.15",                                // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            "plugins": ['AMap.Driving'],                                      // 需要使用的的插件列表，如比例尺'AMap.Scale'等
            "AMapUI": {                                         // 是否加载 AMapUI，缺省不加载
              "version": '1.1',                               // AMapUI 缺省 1.1
              "plugins": [],                                   // 需要加载的 AMapUI ui插件
            },
            "Loca": {                                            // 是否加载 Loca， 缺省不加载
              "version": '1.3.2'                              // Loca 版本，缺省 1.3.2
            },
          }).then((AMap) => {
            // var satellite = new AMap.TileLayer.Satellite();
            var roadNet = new AMap.TileLayer.RoadNet();
            map.value = new AMap.Map('container', {
              zoom: 20,                                        //级别
              center: [103.890319, 30.788819],                 //中心点坐标
              viewMode: '3D',      //使用3D视图
              layers: [
                // satellite,
                roadNet
              ]
            });

            // 添加标点方法
            function toMarker(R,Q,title){
                let home = new AMap.Marker({
                position: new AMap.LngLat(R, Q),
                title: title
              })
                map.value.add(home)
            }

            // 地图路径规划方法
            function toDriving(R,Q){
              if (driving.value){
                driving.value.clear()
              }

              driving.value = new AMap.Driving({
                policy: AMap.DrivingPolicy.LEAST_TIME,
                map:map.value,//使用默认ui将路线显示在地图上！！！！
              })
              var startLngLat = [103.890319, 30.788819]
              var endLngLat = [R, Q]
              driving.value.search(startLngLat, endLngLat, function () {
                // 未出错时，result即是对应的路线规划方案
                // console.log(result.routes[0].steps)
              })
            }


            toMarker(103.890319, 30.788819,'我家')
            map.value.on('click',(e)=>{
              // console.log(e.lnglat)
              toDriving(e.lnglat.R, e.lnglat.Q)
            })
          }).catch(e => {
            console.log('错误信息：', e);
          })
    }


    onMounted(() => {
        mapInit()
    })
    return {
      map,
    }
  }
}
</script>

<style scoped>
#container {
  margin: 24px 37px;
  border-radius: 4px;
  z-index: 4;
}
</style>