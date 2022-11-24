<template>
  <!--彩色菜单-->
  <ul class="menu-color-list" ref="listActive">
    <li @click="pageShow('UserContent',0)" class="list-active">
      <i class="iconfont icon-icon-action-user_24px" style="color: #519df8"></i>
      <span>用户信息</span>
    </li>
    <li @click="pageShow('WorkBench',1)">
      <i class="iconfont icon-configure" style="color: #6adcc6"></i>
      <span>工作台</span>
    </li>
    <li @click="pageShow('BigMap',2)">
      <i class="iconfont icon-vuesax-bold-layer" style="color: #eeac4c"></i>
      <span>地图</span>
    </li>
    <li @click="pageShow('TodoDetails',3)">
      <i class="iconfont icon-stickynote" style="color: #5c72f6"></i>
      <span>待办</span>
    </li>
  </ul>
</template>

<script>
import {useRouter} from "vue-router/dist/vue-router";
import {onMounted, ref} from "vue";

export default {
  name: "ColorMenu",
  setup() {
    const listActive = ref(null)
    const router = useRouter()

    function pageShow(index,e) {
      for (let i = 0 ; i < listActive.value.children.length ; i++){
        listActive.value.children[i].classList.remove('list-active')
      }
      listActive.value.children[e].classList.add('list-active')
      if (index === 'UserContent') {
        router.push('/UserContent')
      } else if (index === 'WorkBench'){
        router.push('/WorkBench')
      }else if (index === 'BigMap'){
        router.push('/BigMap')
      }else{
        router.push('/TodoDetails')
      }
    }

    onMounted(()=>{
    }
    )
    return {
      listActive,
      pageShow
    }
  }
}
</script>

<style scoped>
/*彩色菜单*/
.menu-color-list {
  padding: 16px 0;
  box-sizing: border-box;
  width: 100%;
  border-top: 4px solid #f6f8fc;
  list-style: none;
}

.menu-color-list li {
  display: flex;
  justify-content: flex-start;
  text-align: left;
  text-indent: 40px;
  line-height: 56px;
  height: 56px;
  cursor: pointer;
}

.menu-color-list li i {
  font-size: 24px;
  transition: .3s;
}

.menu-color-list li span {
  display: block;
  text-indent: 4px;
  color: #303753;
  font-weight: bold;
  font-size: 18px;
}

.menu-color-list li:hover {
  background: #d7e5ff;
}

.list-active{
  background: #f6f8fc;
}
</style>