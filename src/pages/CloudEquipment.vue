<template>
  <div class="cloudEquipment-box">
    <div class="equipment-box">
      <div class="equipment-header-box">
        <el-input
            class="uid-input"
            v-model="userData.uid"
            placeholder="绑定巴法云ID"
            :show-password="userData.showPassword"
            :disabled="userData.showPassword"
        />
        <el-popover
            placement="top-start"
            title="提示"
            :width="200"
            trigger="hover"
            content="修改用户巴法云ID，以获取此ID的MQTT设备"
        >
          <template #reference>
            <el-button
                class="uid-button"
                size="small"
                :type="userData.showPassword?'primary':'success'"
                @click="setUid"
            >
              {{ userData.showPassword ? '修改' : '绑定' }}
            </el-button>
          </template>
        </el-popover>
        <div class="equipment-header-title">设备列表</div>
        <el-button
            size="small"
            class="equipment-header-button"
            type="success"
            @click="drawerShow"
        >
          新增
        </el-button>
        <div @click="getMQTTData" class="equipment-header-refresh">
          <i class="iconfont icon-shuaxin" style="font-size: 30px;color: #bcb9c7"></i>
        </div>
      </div>
      <!--      设备信息展示-->
      <div class="dsp-body-box" style="width: 100%" v-loading="userData.loading">
        <el-descriptions
            class="dsp-title-style"
            v-for="(i,index) in userData.MQTTData"
            :key="index"
            border
        >
          <template #title>
            <div class="dsp-title-box">{{ i.name }}</div>
          </template>
          <template #extra>
            <div class="list-extra-box">
              <el-input
                  style="height: 24px;width: 289px"
                  placeholder="输入要发送的消息"
                  v-model="userData.msgList[index]"
              />
              <el-button-group>
                <el-button
                    type="primary"
                    size="small"
                    @click="MQTTPush(index,i.topic,1,userData.msgList[index])"
                >
                  发送
                </el-button>
                <el-button
                    type="danger"
                    size="small"
                    @click="deleteTopic(i.topic,1)"
                >
                  删除
                </el-button>
              </el-button-group>
            </div>

          </template>
          <el-descriptions-item label="主题值">{{ i.topic }}</el-descriptions-item>
          <el-descriptions-item label="设备类型">{{ i.tid }}</el-descriptions-item>
          <el-descriptions-item label="是否在线">
            <el-tag size="small" :type="i.online?'success':'danger'">
              {{ i.online ? '在线' : '离线' }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="上次消息">{{ i.msg }}</el-descriptions-item>
          <el-descriptions-item label="消息时间">{{ i.time }}</el-descriptions-item>
        </el-descriptions>
      </div>
      <!--      新增设备表单-->
      <el-drawer
          v-model="userData.fromShowNumber"
          title="I am the title"
          size="50%"
          :before-close="handleClose"
      >
        <el-form>
          <el-form-item label="设备昵称">
            <el-input v-model="userData.MQTTSetup.name" placeholder="请输入设备昵称"/>
          </el-form-item>
          <el-form-item label="设备主题">
            <el-input v-model="userData.MQTTSetup.topic" placeholder="主题详解见tip"/>
          </el-form-item>
          <el-form-item>
            <el-collapse style="width: 100%">
              <el-collapse-item name="1">
                <template #title>
                  <div style="font-weight: normal;font-size:14px">Tip</div>
                </template>
                <div style="text-align: left;margin-left: 16px;font-size: 14px">
                  主题内容只支持英文和数字如：light002<br>
                  当主题名字后三位是001时为插座设备。<br>
                  当主题名字后三位是002时为灯泡设备。<br>
                  当主题名字后三位是003时为风扇设备。<br>
                  当主题名字后三位是004时为传感器设备。<br>
                  当主题名字后三位是005时为空调设备。<br>
                  当主题名字后三位是006时为开关设备。<br>
                  当主题名字后三位是009时为窗帘设备。
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-form-item>
          <el-form-item label="设备类型">
            <el-select v-model="userData.MQTTSetup.type" placeholder="请选择设备类型">
              <el-option
                  v-for="item in userData.selectType"
                  :key="item"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button @click="handleClose">关闭</el-button>
          </el-form-item>
        </el-form>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import {reactive, watch} from "vue";
import {ElMessage, ElMessageBox} from 'element-plus'

export default {
  name: "CloudEquipment",
  setup() {
    const userData = reactive({
      loading: true,
      showPassword: true,
      fromShowNumber: false,
      uid: 'c3f195180c1dca00193959c30cab93b5',
      MQTTData: [],
      msgList: [],
      MQTTSetup: {
        uid: 'c3f195180c1dca00193959c30cab93b5',
        topic: '',
        type: null,
        name: ''
      },
      selectType: [
        {
          label: 'MQTT',
          value: 1
        },
        {
          label: 'TCP',
          value: 3
        },
      ],
    })
    //监视uid改变
    watch(() => userData.uid, (newValue) => {
          userData.MQTTSetup.uid = newValue
        }
    );

    //修改用户uid
    function setUid() {
      if (!userData.showPassword){
        getMQTTData()
      }
      userData.showPassword = !userData.showPassword
    }

    // 获取设备信息方法
    function getMQTTData() {
      Axios.get('https://apis.bemfa.com/va/alltopic', {
        params: {
          uid: userData.uid,
          type: 1
        }
      }).then(function (message) {
        userData.loading = true
        userData.MQTTData = message.data.data
        userData.msgList = Array.apply(null, Array(userData.MQTTData.length))
        setTimeout(() => {
          userData.loading = false
        }, 1000)
      })
    }

    // 向设备发送消息方法
    function MQTTPush(index, topic, type, msg) {
      const project = {
        uid: userData.uid,
        topic,
        type,
        msg
      }
      Axios.post('https://apis.bemfa.com/va/postmsg', project).then(
          function (message) {
            if (message.data.message === 'OK') {
              ElMessage({
                message: '发送成功！',
                type: 'success'
              })
            }
          }
      )
      setTimeout(function () {
            getMQTTData()
          }, 1000
      )
    }

    // 打开新建页面方法
    function drawerShow() {
      userData.fromShowNumber = !userData.fromShowNumber
    }

    // 关闭页面提示
    function handleClose() {
      ElMessageBox.confirm(
          '是否关闭页面?',
          '警告',
          {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning',
            closeOnClickModal: false
          }
      ).then(() => {
        userData.fromShowNumber = !userData.fromShowNumber
        userData.MQTTSetup = {
          uid: userData.uid,
          topic: '',
          type: null,
          name: ''
        }
        ElMessage({
          type: 'warning',
          message: '页面已关闭，内容不会保存！',
        })
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '取消操作',
        })
      })
    }

    // 提交方法
    function submitForm() {
      Axios.post('https://pro.bemfa.com/v1/addtopic',
          userData.MQTTSetup).then(
          (msg) => {
            if (msg.data.code === 0) {
              ElMessage({
                message: '创建成功！',
                type: 'success'
              })
              setTimeout(() => {
                    getMQTTData()
                  }, 1000
              )
            }else if(msg.data.code === 40006){
              ElMessage({
                message: '创建失败！设备主题已存在',
                type: 'error'
              })
            }
            userData.MQTTSetup = {
              uid: userData.uid,
              topic: '',
              type: null,
              name: ''
            }
            userData.fromShowNumber = !userData.fromShowNumber
          }
      )
    }

    //删除主题方法
    function deleteTopic(topic, type) {
      ElMessageBox.confirm(
          `是否删除主题[${topic}]?,此操作无法撤回！！！`,
          '警告!!!',
          {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'warning',
            closeOnClickModal: false
          }
      ).then(() => {
        const TopicData = {
          uid: userData.uid,
          topic,
          type
        }
        Axios.post('https://pro.bemfa.com/v1/deltopic',
            TopicData).then((msg) => {
          if (msg.data.message === 'OK') {
            ElMessage({
              type: 'warning',
              message: `主题${topic}已删除，此操作无法撤回!!!`,
            })
          }
          pushWmsg(topic,`请注意,主题${topic}被删除！！！`)
          setTimeout(() => {
            getMQTTData()
          }, 1000)
        })
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '取消操作',
        })
      })
    }

    // 向微信发送信息
    function pushWmsg(device,msg) {
      Axios.get('https://api.bemfa.com/api/wechat/v1/weget.php', {
        params: {
          type: 2,
          uid: userData.uid,
          device,
          msg
        }
      }).then(()=>{
        console.log('发送成功')
      })
    }

    getMQTTData()
    return {
      userData,
      setUid,
      getMQTTData,
      MQTTPush,
      drawerShow,
      handleClose,
      submitForm,
      deleteTopic,
    }
  }
}
</script>

<style scoped>
.cloudEquipment-box {
  position: relative;
  height: 100%;
  width: 100%;
  background: #f6f8fc;
}

.equipment-box {
  height: calc(100% - 48px);
  width: calc(100% - 48px);
  background: white;
  margin: 24px;
  border-radius: 8px;
  box-shadow: 0 0 10px 10px rgba(188, 185, 199, 0.1);
  overflow: hidden;
}

.equipment-header-box {
  position: relative;
  height: 48px;
}

.uid-input {
  position: absolute;
  font-size: 10px;
  font-weight: bold;
  height: 24px;
  line-height: 24px;
  width: 200px;
  top: calc(50% - 12px);
  left: 12px;
}

.uid-button {
  position: absolute;
  top: calc(50% - 12px);
  left: 220px;
}

.equipment-header-title {
  position: absolute;
  font-size: 24px;
  font-weight: bold;
  height: 36px;
  line-height: 36px;
  width: 300px;
  top: calc(50% - 18px);
  left: calc(50% - 150px);
}

.equipment-header-refresh {
  position: absolute;
  height: 36px;
  line-height: 36px;
  width: 36px;
  border-radius: 4px;
  top: calc(50% - 18px);
  right: 12px;
  cursor: pointer;
}

.equipment-header-button {
  position: absolute;
  top: calc(50% - 12px);
  right: 56px;
}

.dsp-title-style {
  width: calc(100% - 24px);
  margin: 8px 12px;
  border: solid #bcb9c7 1px
}

.dsp-title-box {
  padding: 16px 0 0 11px;
}

.list-extra-box {
  display: flex;
  width: 400px;
  height: 32px;
  align-items: center;
  justify-content: space-between;
  margin-right: 12px;
  padding-top: 16px;
}
</style>