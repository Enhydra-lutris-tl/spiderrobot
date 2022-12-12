<template>
  <!--        单色菜单-->
  <ul class="menu-list">
    <li @click="pageShow('OSD')"><i class="iconfont icon-vuesax-bold-grid-6"></i><span>看板</span></li>
    <li><i class="iconfont icon-icon-toggle-radio_button_checked_24px"></i><span>实时操作</span></li>
    <li><i class="iconfont icon-resources"></i><span>资产管理</span></li>
    <li><i class="iconfont icon-icon-action-chartbar_24px"></i><span>数据</span></li>
  </ul>
</template>

<script>
import {useRouter} from "vue-router/dist/vue-router";

export default {
  name: "PMenu",
    setup(){
    const router = useRouter();
    function pageShow(index){
      if (index==='OSD'){
        router.push('/OSD')
      }
    }
    return{
      pageShow,
    }
  }
}
</script>

<style scoped>
/*菜单*/
.menu-list {
  padding-top: 16px;
  box-sizing: border-box;
  width: 100%;
  border-top: 2px solid #f6f8fc;
  list-style: none;
}

.menu-list li {
  display: flex;
  justify-content: flex-start;
  text-align: left;
  text-indent: 40px;
  line-height: 40px;
  height: 40px;
  color: #bcb9c7;
  cursor: pointer;
}

.menu-list li i {
  font-size: 20px;
  transition: 0.3s;
}

.menu-list li span {
  display: block;
  text-indent: 8px;
  font-size: 14px;
}

.menu-list li:hover {
  background: #f6f8fc;
  color: #303753;
}
</style>