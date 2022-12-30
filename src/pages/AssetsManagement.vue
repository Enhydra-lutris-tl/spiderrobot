<template>
  <div class="AM-box">
    <div class="table-box">
      <el-table :data="Data.tableData" stripe style="width:100%" height="100%" border>
        <el-table-column header-align="center">
          <template #header>
            <div class="table-header-box">
              <div class="header-title">设备信息列表</div>
              <div class="tabel-lists-button">
                <el-button type="success" @click="fromShow">添加</el-button>
              </div>
            </div>
          </template>
          <el-table-column label="头像" width="120" header-align="center">
            <template #default="scope">
              <div class="list-picture-box">
                <img :src="scope.row.picture" alt="头像" class="list-picture">
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="名字" width="180" header-align="center"/>
          <el-table-column prop="gender" label="性别" width="180" header-align="center"/>
          <el-table-column prop="id" label="ID" header-align="center"/>
        </el-table-column>
      </el-table>
    </div>

    <!--    新建表单-->
    <el-drawer
        v-model="Data.fromShowNumber"
        title="I am the title"
        size="50%"
        :before-close="handleClose"
    >
      <el-form>
        <el-form-item label="头像">
          <el-input v-model="Data.formData.picture" placeholder="请输入图片url连接"/>
        </el-form-item>
        <el-form-item>
          <el-collapse style="width: 100%">
            <el-collapse-item name="1">
              <template #title>
                <div style="font-weight: normal;font-size:14px">Tip</div>
              </template>
              <div style="text-align: left;margin-left: 16px;font-size: 14px">
                图片url：带有http或https开头，以jpg或png结尾的链接!
              </div>
              <div style="text-align: left;margin-left: 16px;font-size: 14px">
                如：https://s1.ax1x.com/2022/12/29/pSS5wzq.jpg
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-form-item>
        <el-form-item label="名字">
          <el-input v-model="Data.formData.name"/>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="Data.formData.gender" placeholder="请选择性别">
            <el-option
                v-for="item in Data.selectGender"
                :key="item"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(1)">提交</el-button>
          <el-button @click="onSubmit(0)">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
    <!--关闭和提交提示框-->
    <el-dialog
        v-model="Data.doShow"
        :title="Data.dialogHeader.title"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
    >
      <div class="dialog-body-box">
        <span>{{ Data.dialogHeader.text[0] }}</span><br>
        <span style="color: red">{{ Data.dialogHeader.text[1] }}</span>
        <div class="dialog-button-box">
          <el-button @click="drClose('close')">取消</el-button>
          <el-button type="primary" @click="drClose" :disabled="Data.buttonDisabled">是</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {reactive, ref} from "vue";
import Axios from 'axios'
export default {
  name: "AssetsManagement",
  setup() {
    const Data = reactive({
      tableData: [],
      fromShowNumber: false,
      doShow: false,
      dialogNumber: 0,
      dialogHeader: {
        title: '警告',
        text: [
          '是否关闭抽屉？',
          '有内容为空，请检查'
        ]
      },
      selectGender: [
        {
          label: '男',
          value: '男'
        },
        {
          label: '女',
          value: '女'
        }
      ],
      formData: {
        gender: '',
        name: '',
        id: '',
        picture: '',
      },
      buttonDisabled: false
    })
    Axios.get('https://randomuser.me/api/?results=10&inc=gender,name,id,picture').then(
        function (message) {
          const D = message.data.results
          for (const i = ref(0); i.value < D.length; i.value++) {
            const Data1 = {
              gender: '',
              name: '',
              id: '',
              picture: ''
            }
            Data1.gender = D[i.value].gender === 'female' ? '女' : '男'
            Data1.name = D[i.value].name.first + ' ' + D[i.value].name.last
            Data1.id = D[i.value].id.value
            Data1.picture = D[i.value].picture.large
            Data.tableData.push(Data1)
          }
        }
    )

    function fromShow() {
      Data.fromShowNumber = !Data.fromShowNumber
    }

    const handleClose = () => {
      onSubmit(0)
    }

    // 提示框关闭方法  通过Data.dialogNumber的值判断操作
    function drClose(index) {
      if (index === 'close') {
        Data.dialogNumber = 0
        Data.buttonDisabled = false
      }
      Data.doShow = false
      if (Data.dialogNumber === 1) {
        Data.fromShowNumber = false
      } else if (Data.dialogNumber === 2) {
        Data.fromShowNumber = false
        const Data1 = Data.formData
        Data.tableData.push(Data1)
        console.log('onSubmit', Data1)
      }
      Data.dialogNumber = 0
    }

    // 数据验证
    function formDataVerify(data) {
      if (data.gender && data.name && data.picture) {
        Data.dialogHeader.text[1] = ''
        console.log('可以提交')
      } else {
        console.log('有内容为空，请检查')
        Data.dialogHeader.text[1] = '有内容为空，请检查'
        Data.buttonDisabled = true
      }
    }

    // 弹出提示框方法
    function onSubmit(number) {
      if (number === 1) {
        formDataVerify(Data.formData)
        Data.dialogHeader.text[0] = '是否提交内容？'
        Data.dialogHeader.title = '确认'
        Data.dialogNumber = 2
      } else if (number === 0) {
        Data.dialogHeader.text[1] = ''
        Data.dialogHeader.text[0] = '是否关闭页面？'
        Data.dialogHeader.title = '警告'
        Data.dialogNumber = 1
      }
      Data.doShow = !Data.doShow
    }


    return {
      Data,
      handleClose,
      fromShow,
      drClose,
      onSubmit,
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
  overflow: hidden;
}

.table-header-box {
  position: relative;
  width: 100%;
  height: 32px;
}

.header-title {
  position: absolute;
  width: 400px;
  height: 32px;
  font-size: 18px;
  line-height: 32px;
  left: calc(50% - 200px);
}

.tabel-lists-button {
  z-index: 1;
  position: absolute;
  right: 24px;
}

.list-picture-box {
  height: 60px;
  width: 60px;
  margin-left: calc((100% - 60px) / 2);
}

.list-picture {
  height: 100%;
  width: 100%;
  border-radius: 50%;
}

.dialog-body-box {
  position: relative;
  height: 100px;
}

.dialog-body-box span {
  font-size: 16px;
}

.dialog-button-box {
  position: absolute;
  bottom: 16px;
  right: 16px;
}
</style>