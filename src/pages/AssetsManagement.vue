<template>
  <div class="AM-box">
    <div class="table-box">
      <el-table :data="Data.tableData" stripe style="width: 100%" border>
        <el-table-column header-align="center">
          <template #header>
            <div class="table-header-box">
              <div class="header-title">设备信息列表</div>
              <div class="tabel-lists-button"><el-button type="success">添加</el-button></div>
            </div>
          </template>
          <el-table-column prop="name.title" label="名字" width="180"/>
          <el-table-column prop="gender" label="性别" width="180"/>
          <el-table-column prop="id.value" label="ID"/>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
import {reactive} from "vue";
import Axios from 'axios'
export default {
  name: "AssetsManagement",
  setup(){
    const Data = reactive({
      tableData:[]
    })
    Axios.get('https://randomuser.me/api/?results=5&inc=gender,name,id,picture').then(
        function (message){
          console.log(message.data.results)
          // const Date1 = {
          //   gender:'',
          //   name:'',
          //   id:'',
          //   picture:''
          // }
          // const D = message.data.results
          // for (const i=0;i<D.length;i++){
          //   D[i].
          // }
        }
    )
    return{
      Data
    }
  }
}
</script>

<style scoped>
.AM-box {
  position: relative;
  height: 100%;
  width: 100%;
  background: #f6f8fc;
}

.table-box {
  height: calc(100% - 48px);
  width: calc(100% - 48px);
  background: white;
  margin: 24px;
  border-radius: 4px;
  box-shadow: 0 0 10px 10px rgba(188, 185, 199, 0.1);
}

.table-header-box {
  position: relative;
  width: 100%;
  height: 32px;
}

.header-title  {
  position: absolute;
  width: 400px;
  height: 32px;
  font-size: 18px;
  line-height: 32px;
  left: calc(50% - 200px);
}
.tabel-lists-button{
  z-index: 1;
  position: absolute;
  right: 24px;
}
</style>