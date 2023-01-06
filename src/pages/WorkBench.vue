<template>
  <div class="workbench-box">
    <div class="content">
      <div class="content-left">
        <div class="robot-message-card">
          <div class="robot-header">
            <div class="robot-header-box">
              <img class="robot-header-img" src="" alt="">
            </div>
            <span>robot-10086</span>
            <div class="state-box">
              <div class="state-light redLight" ref="stateLight"></div>
              <span>{{ data.stateShow ? '开启中' : '关闭中' }}</span>
            </div>
            <div class="switchover-icon"><i class="iconfont icon-qiehuan-"></i></div>
          </div>

          <ul class="robot-state-massage">
            <li>
              <span class="state-title"><i class="iconfont icon-IP"></i></span>
              <span class="state-text">192.168.0.1</span>
            </li>
            <li>
              <span class="state-title"><i class="iconfont icon-wifi_square"></i></span>
              <span class="state-text">已连接</span>
            </li>
            <li>
              <span class="state-title"><i class="iconfont icon-bold-notification"></i></span>
              <span class="state-text">开启</span>
            </li>
            <li>
              <span class="state-title"><i class="iconfont icon-icon-action-tag_24px"></i></span>
              <span class="state-text">四足、12舵机</span>
            </li>
          </ul>


        </div>
        <div class="robot-preinstall-box">
          <h3>预设</h3>
          <ul class="robot-preinstall-lists">
            <li>
              <h4>省电模式</h4>
              <div class="robot-preinstall-text">说明</div>
              <div class="robot-preinstall-operate">
                <div class="robot-preinstall-more">查看详情</div>
                <div class="robot-preinstall-setting">修改</div>
              </div>
            </li>
            <li>
              <h4>静音模式</h4>
              <div class="robot-preinstall-text">说明</div>
              <div class="robot-preinstall-operate">
                <div class="robot-preinstall-more">查看详情</div>
                <div class="robot-preinstall-setting">修改</div>
              </div>
            </li>
            <li>
              <h4>自动模式</h4>
              <div class="robot-preinstall-text">说明</div>
              <div class="robot-preinstall-operate">
                <div class="robot-preinstall-more">查看详情</div>
                <div class="robot-preinstall-setting">修改</div>
              </div>
            </li>
            <li>
              <h4>待机模式</h4>
              <div class="robot-preinstall-text">说明</div>
              <div class="robot-preinstall-operate">
                <div class="robot-preinstall-more">查看详情</div>
                <div class="robot-preinstall-setting">修改</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="robot-operate-switch">
          <h3>开关</h3>
          <ul class="robot-operate-lists">
            <li class="open">
              <div class="robot-operate-text"><i class="iconfont icon-bluetooth"></i></div>
              <h4>蓝牙</h4>
            </li>
            <li>
              <div class="robot-operate-text"><i class="iconfont icon-wifi_square"></i></div>
              <h4>WIFI</h4>
            </li>
            <li>
              <div class="robot-operate-text"><i class="iconfont icon-bold-notification"></i></div>
              <h4>声音</h4>
            </li>
            <li>
              <div class="robot-operate-text"><i class="iconfont icon-vuesax-bold-story"></i></div>
              <h4>灯光</h4>
            </li>
          </ul>
        </div>
      </div>

      <div class="content-right">
        <h3>舵机转动控制实验</h3>
        <ul class="mqtt-send-buttonList">
          <li class="mqtt-send-button" v-for="(i,index) in 5" :key="index" @click="mqttSend(i)">
            {{ 45 * (i - 1) }}°
          </li>
        </ul>
        <div>{{ data.tipMessage }}</div>
        <h3>当前舵机角度</h3>
        <div class="mqtt-get-message">
          {{ data.MQTTre ? data.MQTTre : '10086' }}
        </div>

        <h3>点灯实验</h3>
        <ul class="mqtt-send-buttonList">
          <li class="mqtt-light-button" v-for="(i,index) in 8" :key="index" @click="mqttLightSend(i-1)">
            {{i}}灯
          </li>
        </ul>
        <div>{{ data.tipMessage }}</div>
        <h3>灯状态</h3>
        <div class="mqtt-lightGet-message" ref="lightStates">
          <li class="mqtt-light-state" v-for="(i,index) in data.lightState.light.length" :key="index">
          </li>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {reactive, ref, onBeforeUnmount, onMounted} from "vue";
import * as mqtt from "mqtt/dist/mqtt.min.js";
// import Axios from 'axios'

export default {
  name: "WorkBench",
  setup() {
    const lightStates = ref(null)
    const stateLight = ref(null);
    const data = reactive({
      stateShow: 0,
      MQTTre: '',
      tipMessage: '',
      lightState:JSON.parse(localStorage.getItem('lightState'))
    })

    // MQTT相关配置
    const connectUrl = `wss://bemfa.com:9504/wss`;
    const client = mqtt.connect(connectUrl, {
      clean: false,
      connectTimeout: 4000,
      reconnectPeriod: 100000,
      clientId: 'c3f195180c1dca00193959c30cab93b5',
      username: 'WebLink&hzowldY3YLc',
      password: 'fe5596b5e47c02a9276c10981e3c03bf9f455e2ee7e69b5a60ce23b48e1fb1b9',
    })

    if (!localStorage.getItem('lightState')){
      localStorage.setItem('lightState',JSON.stringify({
        light:[0,0,0,0,0,0,0,0]
      }))
    }

    console.log(data.lightState)
    function mqttLink() {
      // 需要订阅的主题
      const topic1 = 'light002';
      // 这里可以订阅多个主题
      client.subscribe([topic1], (err) => {
        if (data.stateShow === 1) {
          data.tipMessage = '请勿重复订阅'
          console.log('请勿重复订阅')
        } else {
          data.stateShow = 1
          stateLight.value.style.background = '#0fe80f'
          stateLight.value.classList.remove('redLight')
          stateLight.value.classList.add('greenLight')
          if (!err) {
            data.tipMessage = '订阅成功'
          } else {
            data.tipMessage = err
          }
        }
      })
    }

    //成功连接后触发的回调
    client.on('connect', () => {
      data.tipMessage = '服务器连接成功'
      console.log('服务器连接成功');
      mqttLink()
    });

    //重连
    client.on('reconnect', (err) => {
      if (!err) {
        data.tipMessage = '正在重连...'
        console.log('正在重连...')
      } else {
        data.tipMessage = err
        console.log(err)
      }

    })

    // 当客户端收到一个发布过来的消息时触发回调
    client.on('message', function (topic, message) {
      console.log("返回的数据：", message.toString())
      // 这里有可能拿到的数据格式是Uint8Array格式，所以可以直接用toString转成字符串
      // let data = JSON.parse(message.toString());
      //消息发布格式：{"ST":1,"code":1,"L":1}
      data.tipMessage = '收到数据'
      // 如果数据为控灯，即：code=1
      if (JSON.parse(message.toString()).code === 1){

        var lightNumber = JSON.parse(message.toString()).L  //几号灯
        var state = JSON.parse(message.toString()).ST       //灯状态

        console.log(`灯${lightNumber+1},${state?'开':'关'}`)

        data.lightState.light[lightNumber] = state
        localStorage.setItem('lightState',JSON.stringify(data.lightState))
        if (JSON.parse(message.toString()).ST === 1){
          lightStates.value.children[lightNumber].classList.remove('redLight')
          lightStates.value.children[lightNumber].classList.add('greenLight')
          lightStates.value.children[lightNumber].style.background = '#0fe80f'
        }else {
          lightStates.value.children[lightNumber].classList.remove('greenLight')
          lightStates.value.children[lightNumber].classList.add('redLight')
          lightStates.value.children[lightNumber].style.background = '#ff4242'
        }

      }

    });

    // 连接断开后触发的回调
    client.on("close", function () {
      data.tipMessage = '已断开连接'
      console.log("已断开连接")
    });

    // 错误回调
    client.on("error", (error) => {
      console.log(error)
    });

    // 向MQTT服务器发送信息
    function mqttSend(number) {
      client.publish(
          'light002',
          JSON.stringify(
              {
                "params": {
                  "Angle": number
                },
              }
          ),
          function (err) {
            if (!err) {
              data.tipMessage = '发送成功'
              console.log('发送成功')
            } else {
              data.tipMessage = err
              console.log(err)
            }
          }
      )
    }
    // 向MQTT服务器发送信息 改变灯状态
    function mqttLightSend(i){
      let stDate;
      if (data.lightState.light[i] === 0){
        stDate = 1
      }else {
        stDate = 0
      }
      client.publish(
          'light002',
          JSON.stringify(
              {"ST":stDate,"code":1,"L":i}
          ),
          function (err) {
            if (!err) {
              data.tipMessage = '发送成功'
              console.log('发送成功')
            } else {
              data.tipMessage = err
              console.log(err)
            }
          }
      )
    }

    //根据本地存储改变灯状态
    onMounted(()=>{
      for (let i=0; i < lightStates.value.children.length ; i++){
        if (data.lightState.light[i] === 0){
          lightStates.value.children[i].classList.remove('greenLight')
          lightStates.value.children[i].classList.add('redLight')
          lightStates.value.children[i].style.background = '#ff4242'
        }else {
          lightStates.value.children[i].classList.remove('redLight')
          lightStates.value.children[i].classList.add('greenLight')
          lightStates.value.children[i].style.background = '#0fe80f'
        }
      }
    })
    // 组件关闭后结束链接
    onBeforeUnmount(() => {

      client.end()
    })
    return {
      lightStates,
      stateLight,
      data,
      mqttSend,
      mqttLightSend
    }
  }
}
</script>

<style scoped>
.workbench-box {
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


.content-left {
  width: 50%;
}

.robot-message-card {
  background: white;
  height: 180px;
  width: 100%;
  margin: 0 12px 0 0;
  border-radius: 8px;
  box-shadow: 0 0 10px 10px rgba(188, 185, 199, 0.1)
}

.robot-header {
  display: flex;
  height: 76px;
  align-items: center;
  width: calc(100% - 48px);
  margin-left: 24px;
}

.robot-header-box {
  height: 60px;
  width: 60px;
  background: #bcb9c7;
  border-radius: 50%;

}

.robot-header > span {
  margin-left: 16px;
  font-size: 20px;
  font-weight: bold;
}

.state-box {
  display: flex;
  margin-left: 60px;
}

.state-light {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #ff4242;
  transition: 0.5s;
}

.greenLight {
  animation: greenLight 2.5s infinite;
}

.redLight {
  animation: redLight 2.5s infinite;
}

@keyframes redLight {
  0% {
    box-shadow: none;
  }
  50% {
    box-shadow: 0 0 10px 2px #ff8080;
  }
  100% {
    box-shadow: none;
  }
}

@keyframes greenLight {
  0% {
    box-shadow: none;
  }
  50% {
    box-shadow: 0 0 10px 2px #5eff9f;
  }
  100% {
    box-shadow: none;
  }
}


.state-box > span {
  margin-left: 12px;
}

.switchover-icon {
  margin-left: 16px;
}

.switchover-icon > i {
  font-size: 20px;
  color: #bcb9c7;
}

.robot-state-massage {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 16px;
  list-style: none;
  width: 100%;
  margin: 8px 0 0 24px;
  color: rgba(0, 0, 0, 0.8);
}

.robot-state-massage li {
  box-sizing: border-box;
  display: flex;
  height: 30px;
  line-height: 37px;
  padding: 0 16px;
}

.state-title i {
  font-size: 22px;
}

.state-text {
  font-size: 14px;
  margin-left: 16px;
  border-left: 2px solid #bcb9c7;
  text-indent: 16px;
  font-weight: bold;
}

.robot-preinstall-box {
  margin-top: 24px;
  width: 100%;
  background: white;
  border-radius: 8px;
  height: 360px;
  box-shadow: 0 0 10px 10px rgba(188, 185, 199, 0.1)
}

.robot-preinstall-box > h3 {
  font-size: 20px;
  text-align: left;
  text-indent: 24px;
  padding-top: 8px;
}

.robot-preinstall-box > ul {
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 8px;
  height: calc(100% - 73px);
  width: calc(100% - 48px);
  margin: 12px 24px 0 24px;
}

.robot-preinstall-box > ul li {
  border: #bcb9c7 1px solid;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}

.robot-preinstall-lists li h4 {
  margin-top: 12px;
  font-size: 24px;
}

.robot-preinstall-text {
  box-sizing: border-box;
  padding-top: 4px;
  border-top: #bcb9c7 2px solid;
  width: calc(100% - 8px);
  margin-left: 4px;
  margin-top: 12px;
  height: 40%;
}

.robot-preinstall-operate {
  display: flex;
  justify-content: center;
  color: rgba(0, 0, 0, 0.8);
  font-size: 14px;
}

.robot-preinstall-setting {
  margin-left: 24px;
}

/*操作开关*/
.robot-operate-switch {
  margin-top: 24px;
  width: 100%;
  background: white;
  border-radius: 8px;
  height: calc(100% - 588px);
  box-shadow: 0 0 10px 10px rgba(188, 185, 199, 0.1)
}

.robot-operate-switch > h3 {
  font-size: 20px;
  text-align: left;
  text-indent: 24px;
  padding-top: 8px;
}

.robot-operate-switch > ul {
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 8px;
  height: calc(100% - 60px);
  width: calc(100% - 48px);
  margin: 12px 24px 0 24px;
}

.robot-operate-switch > ul li {
  border: #bcb9c7 1px solid;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.robot-operate-lists li h4 {
  font-size: 16px;
  margin-bottom: 8px;
}

.robot-operate-text {
  box-sizing: border-box;
  padding-top: 12px;
  width: calc(100% - 8px);
  margin-left: 4px;
  height: 40%;
}

.robot-operate-text i {
  font-size: 36px;
}

.open {
  background: #5c72f6;
  color: white;
}

.content-right {
  margin-left: 24px;
  width: calc(50% - 24px);
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 10px 10px rgba(188, 185, 199, 0.1)
}

.mqtt-send-buttonList {
  display: flex;
  width: calc(100% - 24px);
  list-style: none;
  margin-left: 12px;
}

.mqtt-send-button {
  margin: 24px 12px;
  height: 40px;
  line-height: 40px;
  width: 80px;
  background: #bcb9c7;
  border-radius: 4px;
  cursor: pointer;
  transition: .5s;
}

.mqtt-send-button:hover {
  background: #55dec3;
}

.mqtt-get-message {
  font-size: 20px;
  font-weight: bold;
  width: 100px;
  height: 50px;
  line-height: 50px;
  margin: 24px 0 24px calc(50% - 50px);
  background: #bcb9c7;
  border-radius: 4px;
}

.content-right h3{
  margin: 24px;
}

.mqtt-light-button{
  margin: 24px 6px;
  height: 40px;
  line-height: 40px;
  width: 80px;
  background: #bcb9c7;
  border-radius: 4px;
  cursor: pointer;
  transition: .5s;
}

.mqtt-light-button:hover {
  background: #55dec3;
}

.mqtt-lightGet-message{
  display: flex;
  list-style: none;
  width: calc(100% - 24px);
  margin-left: 12px;
  justify-content: space-between;
}

.mqtt-light-state{
  margin: 6px 16px;
  height: 20px;
  line-height: 20px;
  width: 20px;
  background: #ff4242;
  border-radius: 50%;
  transition: .5s;
}
</style>