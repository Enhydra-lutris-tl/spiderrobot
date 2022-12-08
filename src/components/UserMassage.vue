<template>
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
      <li><a href="https://space.bilibili.com/396911528?spm_id_from=333.1007.0.0"><i class="iconfont icon-bilibili-fill"></i></a></li>
    </ul>
  </div>
</template>

<script>
import {reactive, ref} from "vue";

export default {
  name: "UserMassage",
  setup() {
    const headPortrait = ref()
    const data = reactive(
        {
          headSrc: require('@/assets/img/user.jpg'),
          messageShow: 1
        }
    )

    function portraitOver() {
      headPortrait.value.style.width = '120px'
      headPortrait.value.style.height = '120px'
      headPortrait.value.style.marginTop = '48px'
      data.messageShow = 0
    }

    function portraitOut() {
      headPortrait.value.style.width = '80px'
      headPortrait.value.style.height = '80px'
      headPortrait.value.style.marginTop = '36px'
      setTimeout(() => {
        data.messageShow = 1
      }, 500)
    }

    return {
      headPortrait,
      data,
      portraitOver,
      portraitOut,
    }
  }
}
</script>

<style scoped>
a{
  text-decoration: none;
}
/*用户信息*/
.user-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 220px;
}

.user-headPortrait {
  margin-top: 32px;
  height: 80px;
  width: 80px;
  border-radius: 50%;
  background: #f6f8fc;
  box-shadow: 0 0 10px 2px rgba(169, 169, 169, 0.4);
  overflow: hidden;
  transition: 0.5s;
}

.user-headPortrait img {
  /*margin-top: 15%;*/
  height: 100%;
  width: 100%;
}

.user-name {
  margin-top: 16px;
  font-size: 18px;
  font-weight: bold;
}

.user-contact {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  list-style: none;
  justify-content: space-between;
  height: 30px;
  padding: 16px 28px;
}

.user-contact li {
  height: 30px;
  width: 30px;
  line-height: 30px;
  border-radius: 50%;
  transition: 0.5s;
  cursor: pointer;
}

.user-contact li:hover {
  background-image: radial-gradient(circle, #5ffbf1, #7dfcf4, #95fdf7, #abfdf9, #bffefb, #cbfefd, #d7fefe, #e2feff, #ebfeff, #f4fdff, #fbfdff, #ffffff);
  box-shadow: 0 0 20px 2px rgba(85, 222, 195, 0.8);
}

.user-contact li i {
  font-size: 20px;
  color: rgba(93, 88, 88, 0.76);
}
</style>