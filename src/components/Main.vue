<template>
  <div class="main-box">
    <div class="body-box">
      <div class="mouse-command"></div>
      <div class="body-left-box">
      <UserMassage/>

        <ColorMenu/>

        <PMenu/>
        <div class="setting"><i class="iconfont icon-bold-setting-2"></i><span>设置</span></div>
      </div>

      <div class="body-right-box">
        <HeaderBox/>

        <div class="router-box">
          <router-view v-slot="{Component}">
            <transition name="fade">
              <component :is="Component"/>
            </transition>
          </router-view>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
// import {reactive,ref} from "vue";
import UserMassage from "@/components/UserMassage";
import ColorMenu from "@/components/ColorMenu";
import PMenu from "@/components/PMenu";
import HeaderBox from "@/components/HeaderBox";
export default {
  name: 'HelloWorld',
  components: {
    PMenu,
    ColorMenu,
    UserMassage,
    HeaderBox
  },

  setup(){

  }
}
</script>

<style scoped>
.body-box{
  position: relative;
  margin-left: calc(50% - 580px);
  margin-top: calc(50vh - 435px);
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.12);
  display: flex;
  width: 1160px;
  height: 870px;
  overflow: hidden;
}

.body-left-box{
  width: 194px;
  background: #ffffff;
}
.body-right-box{
  width: 966px;
  background: #f6f8fc;
}

/*设置按钮*/
.setting{
  display: flex;
  position: absolute;
  bottom: 16px;
  left: 40px;
  height: 56px;
  line-height: 56px;
  cursor: pointer;
}
.setting i{
  font-size: 20px;
}
.setting span{
  display: block;
  height: 56px;
  line-height: 56px;
  text-indent: 4px;
  font-size: 16px;
  font-weight: bold;
}

.router-box{
  height: calc(100% - 80px);
  width: 100%;
  background: #f6f8fc;
  overflow: hidden;
}

/*路由过渡效果*/
.fade-enter-active {
  animation: ceshi 0.5s;
}

.fade-leave-active {
  animation: ceshi1 0.5s reverse;
}

/*.fade-enter-from,*/
/*.fade-leave-to {*/
/*  transform: translateX(20px);*/
/*  opacity: 0;*/
/*}*/
@keyframes ceshi1 {
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}

/*鼠标可拖拽区域*/
.mouse-command{
  -webkit-app-region: drag;
  position: absolute;
  top: 0;
  left:calc(50% - 37px);
  width: 375px;
  height: 74px;
}
</style>
