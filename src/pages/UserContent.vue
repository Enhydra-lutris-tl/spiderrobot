<template>
    <div class="body-content-box">
      <div class="content">
        <div class="basic-information">
            <div class="user-card">
              <div class="user-name">Enhydra lutris</div>
              <div class="date-message-box">
                <div class="user-greet">{{userDate.greet}},{{userDate.temperature}}</div>
                <div class="today-weather">今日天气：{{userDate.weather}}</div>
              </div>
              <div class="now-date">周{{userDate.date[0]}} , {{userDate.date[1]}}</div>
            </div>
<!--          机器人基本信息-->
          <div class="rb-message">
            <ul>
              <li><span class="rb-message-img"><img src="" alt=""></span>
                <span class="rb-name">Robot-10086</span></li>
              <li>
                <span class="message-title">
                  <i class="iconfont icon-aspect-ratio-fill" style="color: #8a8a8a"></i>Size</span>
                <span class="message-text">100*120*60 mm</span>
              </li>
              <li>
                <span class="message-title">
                  <i class="iconfont icon-dianchi" style="color: #6de0ca"></i>Battery Capacity</span>
                <span class="message-text">1300mAh</span>
              </li>
              <li>
                <span class="message-title">
                  <i class="iconfont icon-bluetooth" style="color: #5c72f7"></i>Bluetooth</span>
                <span class="message-text">NO</span>
              </li>
              <li>
                <span class="message-title">
                  <i class="iconfont icon-bg-wifi" style="color: #8a8a8a"></i>Wifi</span>
                <span class="message-text">YES</span>
              </li>
              <li>
                <span class="message-title">
                  <i class="iconfont icon-shijian"></i>Time</span>
                <span class="message-text">2021-01-01</span>
              </li>
            </ul>
          </div>

          <div>

          </div>
          <div class="weather-img">天气图片</div>
        </div>
        <div class="simple-todo">
            简单待办列表
        </div>
      </div>
    </div>
</template>

<script>
import {reactive,onMounted} from "vue";
import Axios from 'axios';
Axios.defaults.baseURL='/dingzhi'
export default {
  name: "UserContent",
  setup(){
    const userDate = reactive({
      greet:'早上好',
      weather:'晴朗',
      temperature:'16',
      date:['',''],
      week:['日','一','二','三','四','五','六'],
      city:101270101
    })
    onMounted(()=>{
      const date = new Date()
      userDate.date[0] = userDate.week[date.getDay()]
      userDate.date[1] = date.toLocaleDateString()
      if (date.getHours()<14 && date.getHours()>6){
        userDate.greet = '上午好'
      }else if(date.getHours()>0 && date.getHours()<6){
        userDate.greet = '凌晨好'
      }else if (date.getHours()>=14 && date.getHours()<=18){
        userDate.greet = '下午好'
      }else {
        userDate.greet = '晚上好'
      }
      // Axios.get(`${userDate.city}.html?_=${Date.now()}`
      // ).then(function (response){
      //   const getCityData = response.data.split(';')[0]
      //   const cityData = JSON.parse(getCityData.split('=')[1]).weatherinfo
      //   userDate.weather = cityData.weather
      //   userDate.temperature = `${cityData.tempn}~${cityData.temp}`
      //   console.log(cityData)
      // })
    })
    return{
      userDate
    }
  }
}
</script>

<style scoped>
/*内容页面*/
.body-content-box{
  position: relative;
  height: calc(100% - 80px);
  width: 100%;
  background: #f6f8fc;
}

.content{
  position: absolute;
  display: flex;
  left: 24px;
  top:24px;
  height: calc(100% - 48px);
  width: calc(100% - 48px);
  border-radius: 4px;
}

.basic-information{
  position: relative;
  height: 100%;
  width: 662px;
  background: white;
  border-radius: 4px;
  box-shadow: 10px 10px 100px 1px rgba(188, 185, 199, 0.4);
}

.user-card{
  box-sizing: border-box;
  padding-top:37px;
  height: 200px;
  background-image: linear-gradient(to right bottom, #ffffff, #f6fbff, #e2faff, #c8faff, #affbff, #aafbfb, #a6fcf5, #a3fcef, #abfdf0, #b3fef1, #bbfef2, #c2fff3);
}

.user-name{
  font-size: 36px;
  font-weight: bold;
  text-align: left;
  margin-left: 37px;
  /*margin-top: 37px;*/
}
.date-message-box{
  display: flex;
  margin-left: 37px;
  margin-top: 12px;
  font-size: 16px;
  font-weight: bold;
}

.user-greet{
  text-indent: 4px;
}
.today-weather{
  border-left: #bcb9c7 3px solid;
  text-indent: 4px;
  margin-left: 8px;
}

.now-date{
  text-align: left;
  margin-left: 37px;
  margin-top: 12px;
  font-size: 16px;
}
.rb-message-img{
  height: 60px;
  width: 60px;
  background: #bcb9c7;
  border-radius: 50%;
  margin: 8px 4px 8px 24px;
}

.rb-name{
  font-size: 20px;
  font-weight: bold;
  height: 60px;
  line-height: 60px;
  margin: 8px 4px 8px 24px;
}
.rb-message{
  width: calc(100% - 74px);
  border-top: #bcb9c7 2px solid;
  margin-left: 37px;
  margin-top: 24px;

}

.rb-message ul{
  list-style: none;
  margin-top: 37px;
  border: 1px solid #bcb9c7;
  border-radius: 4px;
}

.rb-message ul li{
  display: flex;
  border-bottom: 1px solid #bcb9c7;
}
.rb-message ul li:last-child{
  border-bottom: none;
}
.rb-message ul li span{
  display: block
}
.rb-message ul li .message-title{
  box-sizing: border-box;
  width: 35%;
  text-align: right;
  padding: 8px 24px 8px 12px;
  border-right: 1px solid #bcb9c7;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
}
.rb-message ul li .message-title i{
  font-size: 24px;
}
.rb-message ul li .message-text{
  box-sizing: border-box;
  width: 65%;
  text-align: left;
  padding: 8px 24px 8px 24px;
}
.weather-img{
  height: 120px;
  width: 120px;
  position: absolute;
  right: 37px;
  top: 37px;
  border: #bcb9c7 2px solid;
  border-radius: 8px;
}



.simple-todo{
  margin-left: 37px;
  height: calc(50% - 24px);
  width: 466px;
  background: white;
  border-radius: 4px;
}


</style>