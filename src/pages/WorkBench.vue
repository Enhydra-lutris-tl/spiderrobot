<template>
  <div class="workbench-box">
    <div class="content">
      <div class="robot-message-card">
        <div class="robot-header">
          <div class="robot-header-box">
            <img class="robot-header-img" src="" alt="">
          </div>
          <span>robot-10086</span>
          <div class="state-box">
            <div class="state-light"></div>
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
      <div>所有功能</div>
    </div>
  </div>
</template>

<script>
import {reactive} from "vue";

export default {
  name: "WorkBench",
  setup() {
    const data = reactive({
      stateShow: 1
    })
    return {
      data
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
  left: 24px;
  top: 24px;
  height: calc(100% - 48px);
  width: calc(100% - 48px);
  border-radius: 4px;
}

.robot-message-card {
  background: white;
  height: 180px;
  width: calc(50% - 12px);
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
  background: #0fe80f;
  animation: greenLight 2.5s infinite;
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
  width: calc(100% - 48px);
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
  width: calc(50% - 12px);
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
  width: calc(50% - 12px);
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
</style>