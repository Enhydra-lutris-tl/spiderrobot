<template>
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
</template>

<script>
export default {
  name: "HeaderBox"
}
</script>

<style scoped>
.header-box{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 24px;
  box-sizing: border-box;
  height: 74px;
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
  border-radius: 8px;
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
  cursor:pointer;
}
.header-box ul li i{
  font-size: 24px;
  color: #bcb9c7;
}
</style>