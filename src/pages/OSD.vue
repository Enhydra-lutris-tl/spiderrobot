<template>
  <div class="OSD-box">
    <div class="preview-box">
      <div class="preview">
<!--        屏幕轮播-->
        <div class="preview-slideshow-box" ref="an">
          <div class="slideshow-main">
            <div class="now-time">11:11</div>
            <div class="state-lists-box">
              <div class="state-box">

                <i class="iconfont icon-icon-action-port_24px"></i>
                <div></div>
              </div>
              <div class="state-box">

                <i class="iconfont icon-icon-toggle-radio_button_checked_24px"></i>
                <div></div>
              </div>
            </div>
          </div>
          <div class="slideshow-list" v-for="(i,index) in Data.slideshowData" :key="index">
            <div class="list-number">
              {{i.number}}
            </div>
            <div class="list-title-box">
              <i :class="i.icon"></i>
              <div class="list-title">{{ i.title }}</div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <div>图片上传</div>
    <div>模块参数设置</div>
    <div>功能开关</div>
  </div>
</template>

<script>
import {reactive, ref} from "vue";

export default {
  name: "OSD",
  setup(){
    const an = ref(null)
    const i = ref(0)
    const Data = reactive({
      slideshowData:[
        {
          title:'WIFI',
          icon:'iconfont icon-icon-action-rss_24px',
          number:1
        },
        {
          title:'电量',
          icon:'iconfont icon-dianchi',
                    number:99
        },
        {
          title:'灯光',
          icon:'iconfont icon-dengguang',
                    number:1
        },
        {
          title:'温度',
          icon:'iconfont icon-wendu',
                    number:26
        },
        {
          title:'湿度',
          icon:'iconfont icon-wenshiduchuanganqi',
                    number:10
        },
      ]
    })
    setInterval(
        function (){

          an.value.style.transform = `translateX(${-240*i.value}px)`
          i.value++
          if (i.value===5){
            i.value = 0
          }
        },2000
    )
    return{
      an,
      Data
    }
  }

}
</script>

<style scoped>
.OSD-box{
  position: relative;
  height: 100%;
  width: 100%;
  background: #f6f8fc;
}

.preview-box{
  background: white;
  height: 256px;
  width: 256px;
  border-radius: 8px;
  margin: 24px 0 24px 24px;
  padding-top: 8px;
  box-shadow: 0 0 10px 10px rgba(188, 185, 199, 0.1)

}

.preview{
  margin: 8px;
  height: 240px;
  width: 240px;
  background: #bcb9c7;
  border-radius: 50%;
  overflow: hidden;
}

.preview-slideshow-box{
  height: 240px;
  display: flex;
  width: calc(240px * 6);
  transition: 1s;
}
.slideshow-main{
  position: relative;
  height: 240px;
  width: 240px;
  background: black;
  color: white;
}
.now-time{
  position: absolute;
  top: calc(50% - 60px);
  font-size: 60px;
  font-weight: bold;
  width: 240px;
}
.state-lists-box{
  position: absolute;
  width: 240px;
  bottom: 36px;
  display: flex;
  justify-content: center;
}
.state-box{
  display: flex;
  flex-direction: column;
  margin: 0 8px;
}
.state-box i{
  font-size: 18px;
  color: #bcb9c7;
}
.state-box div{
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #6adcc6;
  margin-top: 4px;
}
.slideshow-list{
  height: 240px;
  width: 240px;
  background: black;
  position: relative;
}

.list-number{
  position: absolute;
  left: calc(50% - 50px);
  top: calc(50% - 60px);
  color: white;
  height: 100px;
  width: 100px;
  line-height: 100px;
  font-weight: bold;
  font-size: 60px;
  border-radius: 50%;
   background-image: radial-gradient(circle, #051937, #051937, rgba(5, 25, 55, 0.87), rgb(142, 215, 222), rgba(150, 216, 222, 0.8));
  box-shadow: 0 0 65px 12px rgb(85, 222, 195)

}

.list-title-box{
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100px;
  bottom: 36px;
  left: calc(50% - 50px);
  color: white;
}

.list-title{
  font-weight: bold;
  font-size: 20px;
}
.iconfont{
  font-size: 24px;
}

</style>