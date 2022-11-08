<template>
    <div class="body-content-box">
      <div class="content">
        内容
      </div>
    </div>
</template>

<script>
export default {
  name: "UserContent"
}
</script>

<style scoped>
/*内容页面*/
.body-content-box{
  position: relative;
  height: calc(100% - 80px);
  width: 100%;
  background: #f6f8fc;
}

.content{
  position: absolute;
  left: 24px;
  top:24px;
  height: calc(100% - 48px);
  width: calc(100% - 48px);
  background: white;
  border-radius: 4px;
}
</style>