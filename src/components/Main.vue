<template>
  <div class="main-box">
    <div class="body-box">
      <div class="body-left-box">
<!--        用户信息-->
        <div class="user-message">
          <div class="user-headPortrait" ref="headPortrait">
            <img :src="data.headSrc" alt="????" @mouseover="portraitOver" @mouseout="portraitOut">
          </div>
          <div class="user-name" v-show="data.messageShow">Enhydra lutris</div>
          <ul class="user-contact" v-show="data.messageShow">
            <li><i class="iconfont icon-QQ"></i></li>
            <li><i class="iconfont icon-weixing"></i></li>
            <li><i class="iconfont icon-weibo-fill"></i></li>
            <li><i class="iconfont icon-bilibili-fill"></i></li>
          </ul>
        </div>


        <ul class="menu-color-list">
          <li><i class="iconfont icon-icon-action-user_24px" style="color: #519df8"></i><span>用户信息</span></li>
          <li><i class="iconfont icon-configure" style="color: #6adcc6"></i><span>工作台</span></li>
          <li><i class="iconfont icon-icon-action-bookmark_24px" style="color: #eeac4c"></i><span>常用功能</span></li>
          <li><i class="iconfont icon-stickynote" style="color: #5c72f6"></i><span>待办</span></li>
        </ul>

<!--        单色菜单-->
        <ul class="menu-list">
          <li><i class="iconfont icon-vuesax-bold-grid-6"></i><span>看板</span></li>
          <li><i class="iconfont icon-icon-toggle-radio_button_checked_24px"></i><span>实时操作</span></li>
          <li><i class="iconfont icon-resources"></i><span>资产管理</span></li>
          <li><i class="iconfont icon-icon-action-chartbar_24px"></i><span>数据</span></li>
        </ul>
        <div class="setting"><i class="iconfont icon-bold-setting-2"></i><span>设置</span></div>
      </div>

      <div class="body-right-box">
        <div class="header-box">
          <div class="input-box">
            <div><i class="iconfont icon-vuesax-bold-search-status"></i></div>
            <input type="text" placeholder="???">
          </div>

          <ul>
            <li><i class="iconfont icon-bold-notification"></i></li>
            <li><i class="iconfont icon-icon-action-globle_24px"></i></li>
            <li><i class="iconfont icon-question"></i></li>
            <li><i class="iconfont icon-information"></i></li>
          </ul>
        </div>
        <UserContent></UserContent>

      </div>
    </div>
  </div>
</template>

<script>
import {reactive,ref} from "vue";
import UserContent from "@/pages/UserContent";
export default {
  name: 'HelloWorld',
  components: {
    UserContent
  },

  setup(){
    const headPortrait = ref()
    const data = reactive(
        {
          headSrc:require('@/assets/logo.png'),
          messageShow:1
        }
    )

    function portraitOver(){
      headPortrait.value.style.width = '120px'
      headPortrait.value.style.height = '120px'
      headPortrait.value.style.marginTop = '48px'
      data.messageShow=0
    }

    function portraitOut(){
      headPortrait.value.style.width = '80px'
      headPortrait.value.style.height = '80px'
      headPortrait.value.style.marginTop = '36px'
      setTimeout(()=>{
        data.messageShow=1
      },500)

    }
    return{
      headPortrait,
      data,
      portraitOver,
      portraitOut
    }
  }
}
</script>

<style scoped>
.body-box{
  position: relative;
  margin-left: calc(50% - 720px);
  margin-top: calc(50vh - 540px);
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.12);
  display: flex;
  width: 1440px;
  height: 1080px;
  border-radius: 24px;
  overflow: hidden;
}

.body-left-box{
  width: 240px;
  background: #ffffff;
}
.body-right-box{
  width: 1200px;
  background: #f6f8fc;
}
.header-box{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 24px;
  box-sizing: border-box;
  height: 80px;
  width: 100%;
  background: #ffffff;
  border-left: #f6f8fc solid 2px;
  color: black;
}

/*输入框*/
.input-box{
  position: relative;
}
.header-box input{
  height: 40px;
  width: 320px;
  border:none;
  background: #f6f8fc;
  border-radius: 4px;
  text-indent: 40px;
  font-size: 16px;
}
.input-box div{
  position: absolute;
  height: 40px;
  line-height: 40px;
  width: 40px;
}
.input-box div i{
  font-size: 24px;
  color: #bcb9c7;
}

/*头部右侧菜单按钮*/
.header-box ul{
  display: flex;
  justify-content: space-between;
  list-style: none;
  width: 200px;
}
.header-box ul li{
  height: 40px;
  width: 40px;
  line-height: 40px;
}
.header-box ul li i{
  font-size: 24px;
  color: #bcb9c7;
}


/*用户信息*/
.user-message{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 220px;
}
.user-headPortrait{
  margin-top: 32px;
  height: 80px;
  width: 80px;
  border-radius: 50%;
  background:  #f6f8fc;
  box-shadow: 0 0 10px 2px rgba(169, 169, 169, 0.4);
  overflow: hidden;
  transition: 0.5s;
}

.user-headPortrait img{
  margin-top: 15%;
  height: 70%;
  width: 70%;
}

.user-name{
  margin-top: 16px;
  font-size: 20px;
  font-weight: bold;
}
.user-contact{
  box-sizing: border-box;
  width: 100%;
  display: flex;
  list-style: none;
  justify-content: space-between;
  height: 30px;
  padding: 16px 28px;
}
.user-contact li{
  height: 30px;
  width: 30px;
  line-height: 30px;
  border-radius: 50%;
  transition: 0.5s;
  cursor: pointer;
}

.user-contact li:hover{
   background-image: radial-gradient(circle, #5ffbf1, #7dfcf4, #95fdf7, #abfdf9, #bffefb, #cbfefd, #d7fefe, #e2feff, #ebfeff, #f4fdff, #fbfdff, #ffffff);
  box-shadow: 0 0 20px 2px rgba(85, 222, 195, 0.8);
}

.user-contact li i{
  font-size: 24px;
  color: rgba(93, 88, 88, 0.76);
}


/*彩色菜单*/
.menu-color-list{
  padding-top: 16px;
  box-sizing: border-box;
  width: 100%;
  border-top: 4px solid #f6f8fc;
  list-style: none;
  height: 320px;
}
.menu-color-list li{
  display: flex;
  justify-content: flex-start;
  text-align: left;
  text-indent: 40px;
  line-height: 64px;
  height: 64px;
  cursor:pointer;

}

.menu-color-list li i{
  font-size: 28px;
}
.menu-color-list li span{
  display: block;
  text-indent: 4px;
  color: #303753;
  font-weight: bold;
  font-size: 20px;
}
.menu-color-list li:hover{
  background: #f6f8fc;
}

/*菜单*/
.menu-list{
  padding-top: 16px;
  box-sizing: border-box;
  width: 100%;
  border-top: 2px solid #f6f8fc;
  list-style: none;
  height: 400px;
}
.menu-list li{
  display: flex;
  justify-content: flex-start;
  text-align: left;
  text-indent: 40px;
  line-height: 56px;
  height: 56px;
  color: #bcb9c7;
  cursor: pointer;
}

.menu-list li i{
  font-size: 24px;
}
.menu-list li span{
  display: block;
  text-indent: 8px;
}
.menu-list li:hover{
  background: #f6f8fc;
  color: #303753;
}
.setting{
  display: flex;
  position: absolute;
  bottom: 16px;
  left: 40px;
  height: 56px;
  line-height: 56px;
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
</style>
