<template>
  <div class="OSD-box">
    <div class="preview-box">
      <div class="preview">屏幕显示预览</div>
    </div>
    <div>图片上传</div>
    <div>模块参数设置</div>
    <div>功能开关</div>
  </div>
</template>

<script>
export default {
  name: "OSD",

}
</script>

<style scoped>
.OSD-box{
  position: relative;
  height: 100%;
  width: 100%;
  background: #f6f8fc;
}

.preview-box{
  background: white;
  height: 256px;
  width: 256px;
  border-radius: 8px;
  margin: 24px 0 24px 24px;
  padding-top: 8px;
  box-shadow: 0 0 10px 10px rgba(188, 185, 199, 0.1)

}

.preview{
  margin: 8px;
  height: 240px;
  width: 240px;
  background: #bcb9c7;
  border-radius: 50%;
  line-height: 240px;
}
</style>