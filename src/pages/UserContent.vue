<template>
  <div class="body-content-box">
    <div class="content">
      <div class="basic-information">
        <div class="user-card">
          <div class="user-name">Enhydra lutris</div>
          <div class="date-message-box">
            <div class="user-greet">{{ userDate.greet }},{{ userDate.temperature }}</div>
            <div class="today-weather">今日天气：{{ userDate.weather }}</div>
          </div>
          <div class="now-date">周{{ userDate.date[0] }} , {{ userDate.date[1] }}</div>
        </div>
        <!--机器人基本信息-->
        <div class="rb-message">
          <ul>
            <li><span class="rb-message-img"><img src="" alt=""></span>
              <span class="rb-name">Robot-10086</span></li>

            <li>
                <span class="message-title">
                 Size</span>
              <span class="message-text">100*120*60 mm</span>
            </li>

            <li>
                <span class="message-title">
                 Battery Capacity</span>
              <span class="message-text">1300mAh</span>
            </li>

            <li>
                <span class="message-title">
                 Bluetooth</span>
              <span class="message-text">NO</span>
            </li>

            <li>
                <span class="message-title">
                  Wifi</span>
              <span class="message-text">YES</span>
            </li>

            <li>
                <span class="message-title">
                  Time</span>
              <span class="message-text">2021-01-01</span>
            </li>
          </ul>
          <div class="rb-more">more</div>
        </div>
        <div class="map-box">
          <AmapTemp/>
        </div>
        <div>

        </div>
        <div class="weather-img"><img :src="userDate.weatherImgSrc" alt=""></div>
      </div>



<!--      右侧栏目-->
      <div class="simple-todo-box">
        <div class="calendar-box">
          <div class="calendar-title">
            <span></span><span>Calendar</span>
          </div>
          <ul class="calendar-header">
            <li v-for="(i,index) in 7" :key="index">{{ userDate.week[i - 1] }}</li>
          </ul>
          <ul class="calendar-body">
            <li v-for="(number,index) in 35" :key="index" ref="calendarBodyNumber">
              {{ number - userDate.calendarOneDay > 0 && number - userDate.calendarOneDay <= userDate.monthNumber ? number - userDate.calendarOneDay : '' }}
            </li>
          </ul>
        </div>

        <div class="todo-lists-box">
          <div class="lists-title">
            <span></span>
            <span class="todo-title-name">Todo</span>
            <div>+</div>
          </div>
          <ul class="todo-lists">
            <li v-for="(i,index) in 8" :key="index">
              <input type="checkbox">
              <span class=todo-list-text>待办事项</span>
              <div class="todo-list-more">
                <span>删除</span><span>详情</span>
              </div>
            </li>
          </ul>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
import {reactive, onMounted, ref} from "vue";
// import Axios from 'axios';
import AmapTemp from "@/components/AmapTemp";

// Axios.defaults.baseURL = '/dingzhi'
export default {
  name: "UserContent",
  components: {
    AmapTemp
  },

  setup() {
    const calendarBodyNumber = ref()
    const userDate = reactive({
      greet: '早上好',
      weather: '晴朗',
      temperature: '16',
      date: ['', ''],
      week: ['日', '一', '二', '三', '四', '五', '六'],
      city: 101270101,
      weatherImgSrc: require('@/assets/img/111.jpg'),
      calendarOneDay: 0,
      monthNumber: 30
    })

    onMounted(() => {
      const date = new Date()
      const month = date.getMonth()
      const year = date.getFullYear()
      const today = date.getDate()
      userDate.calendarOneDay = new Date(`${year}-${month + 1}-01`).getDate() + 1
      // 月份大小判断
      if (month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) {
        userDate.monthNuber = 31
      } else if (month === 1) {
        userDate.monthNuber = 28
      } else {
        userDate.monthNuber = 30
      }

      // 标记今天
      for (var i = 0; i < 35; i++) {
        if (i - userDate.calendarOneDay < 0 || i - userDate.calendarOneDay >= userDate.monthNumber) {
          calendarBodyNumber.value[i].style.background = 'rgba(188,185,199,0.3)'
        }
      }
      calendarBodyNumber.value[today + 1].style.color = 'white'
      calendarBodyNumber.value[today + 1].style.background = '#5c72f6'

      userDate.date[0] = userDate.week[date.getDay()]
      userDate.date[1] = date.toLocaleDateString()
      if (date.getHours() < 14 && date.getHours() > 6) {
        userDate.greet = '上午好'
      } else if (date.getHours() > 0 && date.getHours() < 6) {
        userDate.greet = '凌晨好'
      } else if (date.getHours() >= 14 && date.getHours() <= 18) {
        userDate.greet = '下午好'
      } else {
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
    return {
      calendarBodyNumber,
      userDate,
    }
  }
}
</script>

<style scoped>
/*内容页面*/
.body-content-box {
  position: relative;
  height: 100%;
  width: 100%;
  background: #f6f8fc;
}

.content {
  position: absolute;
  display: flex;
  left: 24px;
  top: 24px;
  height: calc(100% - 48px);
  width: calc(100% - 48px);
  border-radius: 4px;
}

.basic-information {
  position: relative;
  height: 100%;
  width: 662px;
  border-radius: 8px;
}

.user-card {
  width: 100%;
  border-radius: 8px;
  box-sizing: border-box;
  padding-top: 16px;
  height: 160px;
  box-shadow: 0 0 10px 10px rgba(188, 185, 199, 0.1);
  background-image: linear-gradient(to right bottom, #ffffff, #f6fbff, #e2faff, #c8faff, #affbff, #aafbfb, #a6fcf5, #a3fcef, #abfdf0, #b3fef1, #bbfef2, #c2fff3);
}

.user-name {
  font-size: 28px;
  font-weight: bold;
  text-align: left;
  margin-left: 37px;
  /*margin-top: 37px;*/
}

.date-message-box {
  display: flex;
  margin-left: 37px;
  margin-top: 12px;
  font-size: 16px;
  font-weight: bold;
}

.user-greet {
  text-indent: 4px;
}

.today-weather {
  border-left: #bcb9c7 3px solid;
  text-indent: 4px;
  margin-left: 8px;
}

.now-date {
  text-align: left;
  margin-left: 37px;
  margin-top: 12px;
  font-size: 16px;
}

.rb-message-img {
  height: 40px;
  width: 40px;
  background: #bcb9c7;
  border-radius: 50%;
  margin: 8px 4px 8px 24px;
}

.rb-name {
  font-size: 18px;
  font-weight: bold;
  height: 40px;
  line-height: 40px;
  margin: 8px 4px 8px 24px;
}

.rb-message {
  box-sizing: border-box;
  padding: 24px 0 12px 0;
  width: 100%;
  height: 304px;
  margin-top: 24px;
  background: white;
  box-shadow: 0 0 10px 10px rgba(188, 185, 199, 0.1);
  border-radius: 8px;
}

.rb-message ul {
  width: calc(100% - 48px);
  list-style: none;
  margin-left: 24px;
  border: 1px solid #bcb9c7;
  border-radius: 4px;
}

.rb-message ul li {
  display: flex;
  border-bottom: 1px solid #bcb9c7;
}

.rb-message ul li:last-child {
  border-bottom: none;
}

.rb-message ul li span {
  display: block
}

.rb-message ul li .message-title {
  box-sizing: border-box;
  width: 35%;
  text-align: right;
  padding: 8px 24px 8px 12px;
  border-right: 1px solid #bcb9c7;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
}

.rb-message ul li .message-text {
  box-sizing: border-box;
  width: 65%;
  text-align: left;
  font-size: 14px;
  padding: 8px 24px 8px 24px;
}

.rb-more {
  box-sizing: border-box;
  width: 100%;
  height: 20px;
  margin-top: 8px;
  color: #bcb9c7;
  font-size: 14px;
  text-align: right;
  padding-right: 37px;
  cursor: pointer;
  transition: 0.5s;
}

.rb-more:hover {
  color: black;
}


.weather-img {
  height: 100px;
  width: 100px;
  position: absolute;
  right: 24px;
  top: 24px;
  border-radius: 16px;
  overflow: hidden;
}

.weather-img img {
  height: 100%;
  width: 100%;
}

/*地图相关*/
.map-box {
  width: 100%;
  overflow: hidden;
  background: white;
  margin-top: 24px;
  border-radius: 8px;
  height: calc(100% - 512px);
}


/*右侧栏目*/
.simple-todo-box {
  margin-left: 37px;
  height: 100%;
  /*width: 466px;*/
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 10px 10px rgba(188, 185, 199, 0.1)
}

.calendar-title {
  display: flex;
  height: 24px;
  width: calc(100% - 74px);
  margin-left: 24px;
  margin-top: 24px;
}

.calendar-title span {
  display: block;
}

.calendar-title span:first-child {
  height: 100%;
  width: 16px;
  background: #6adcc6;
}

.calendar-title span:last-child {
  font-size: 20px;
  font-weight: bold;
  text-indent: 8px;
  line-height: 24px;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  list-style: none;
  height: 24px;
  width: calc(100% - 48px);
  margin-left: 24px;
  margin-top: 24px;
}

.calendar-header li {
  line-height: 24px;
  width: 37px;
  font-weight: bold;
  margin: 0 8px;
}

/*日历本体*/
.calendar-body {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  list-style: none;
  width: calc(100% - 48px);
  margin-left: 24px;
  margin-top: 12px;
  border-top: #bcb9c7 2px solid;
  padding-top: 12px;
}

.calendar-body li {
  line-height: 34px;
  width: 34px;
  margin: 8px;
  border-radius: 50%;
  background: #6adcc6;
  color: rgba(255, 255, 255, 0.8);
  font-weight: bold;
  cursor: pointer;
  transition: 0.5s;
  /*font-weight: bold;*/
}

.calendar-body li:hover {
  box-shadow: 0 0 20px 2px rgba(85, 222, 195, 0.8);
  font-size: 20px;
}

/*待办样式*/
.todo-lists-box {
  border-top: 2px rgba(188, 185, 199, 0.2) dashed;
  margin-top: 12px;
  width: 100%;
}

.todo-lists {
  width: calc(100% - 48px);
  height: 246px;
  list-style: none;
  text-align: left;
  margin-left: 24px;
  margin-top: 24px;
  border-top: 1px solid #bcb9c7;
  overflow: auto;
}

.todo-lists li {
  border-bottom: 1px solid #bcb9c7;
  height: 48px;
  line-height: 48px;
}

.lists-title {
  position: relative;
  display: flex;
  height: 24px;
  width: calc(100% - 48px);
  margin-left: 24px;
  margin-top: 24px;
}

.lists-title span {
  display: block;
}

.lists-title span:first-child {
  height: 100%;
  width: 16px;
  background: #6adcc6;
}

.todo-title-name {
  font-size: 20px;
  font-weight: bold;
  text-indent: 8px;
  line-height: 24px;
}

.lists-title div {
  position: absolute;
  right: 0;
  font-size: 24px;
  font-weight: bold;
  height: 24px;
  width: 24px;
  line-height: 24px;
  border-radius: 50%;
  background: #5c72f6;
  color: white;
  cursor: pointer;
}

.lists-title div:hover {
  box-shadow: 0 0 18px 2px rgba(0, 157, 255, 0.8);
  font-size: 20px;
}

.todo-lists li {
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
}

.todo-lists input {
  height: 20px;
  width: 20px;
  /*flex: 1;*/
}

.todo-list-text {
  flex: 2;
  font-weight: bold;
  font-size: 16px;
  margin-left: 8px;
}

.todo-list-more {
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  font-size: 14px;
  margin-right: 8px;
}

.todo-list-more span {
  margin: 0 4px;
}

.todo-list-more span:first-child {
  color: rgba(255, 0, 0, 0.5);
}
</style>