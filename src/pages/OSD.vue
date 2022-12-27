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
    <div class="QRcode-box">

      <div class="QRcode-img-box">
        <img :src="Data.QrcodeSrc" alt="请输入内容后提交">
      </div>
      <div class="QRcode-input-box">
        <input type="text" v-model="Data.QrcodeData">
        <div class="QRcode-button" @click="getQrcode">提交</div>
      </div>
    </div>

    <div>模块参数设置</div>
    <div>功能开关</div>
  </div>
</template>

<script>
import {reactive, ref,onUnmounted} from "vue";

export default {
  name: "OSD",
  components: {},

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
      ],
      size:'200x200',
      QrcodeData:'',
      QrcodeSrc:''
    })

    function getQrcode(){
      const url = 'https://api.qrserver.com/v1/create-qr-code/?size='
      Data.QrcodeSrc = url + Data.size + '&data=' + Data.QrcodeData
    }
    const T1 = setInterval(
        function (){
          an.value.style.transform = `translateX(${-240*i.value}px)`
          i.value++
          if (i.value===6){
            i.value = 0
          }
        },2000
    )
    onUnmounted(()=>{
      clearInterval(T1)
    })
    return{
      an,
      Data,
      getQrcode
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
  top: calc(50% - 50px);
  font-size: 60px;
  font-weight: bolder;
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
  justify-content: center;
  align-items: center;
  margin: 0 8px;
}
.state-box i{
  font-size: 18px;
  color: #bcb9c7;
}
.state-box div{
  height: 12px;
  width: 12px;
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
.QRcode-box{
  background: white;
  height: 256px;
  width: 256px;
  border-radius: 8px;
  margin: 24px 0 24px 24px;
  padding-top: 8px;
  box-shadow: 0 0 10px 10px rgba(188, 185, 199, 0.1)
}
.QRcode-input-box{
  width: 200px;
  height: 30px;
  margin-left: 28px;
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
}
.QRcode-box input{
  height: 30px;
  width: 160px;
  border: none;
  background: #bcb9c7;
}
.QRcode-button{
  height: 30px;
  width: 32px;
  background: #bcb9c7;
  font-size: 11px;
  line-height: 30px;
}
.QRcode-img-box{
  height: 200px;
  width: 200px;
  margin-left: 28px;
  margin-top: 8px;
  line-height: 200px;
  font-weight: bold;
}
</style>