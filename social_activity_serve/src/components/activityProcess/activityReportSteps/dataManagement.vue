<template>
  <div class="dataManagement">
    <!-- 资料管理 -->
    <div class="dataManagement-container">
      <div class="dataManagementHeader">
        <p style="font-size: 18px; color: rgb(255, 94, 0); font-family: '楷体'; font-weight: bold;">现场资料</p>
      </div>
      <div class="dataManagement-content">
        <div class="file-content">
          <div class="video">
            <a href="javascript:void(0)">视频材料1</a>
            <div class="vid-options">
              <span>
                <Icon type="ios-alert"></Icon>浏览
              </span>
              <span>
                <Icon type="ios-cloud-download"></Icon>下载
              </span>
              <span>
                <Icon type="md-pricetags"></Icon>编辑
              </span>
              <span>
                <Icon type="md-trash"></Icon>删除
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dataManagement',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.dataManagement {
  width: 100%;
  display: flex;
  justify-content: center;
}
.dataManagement-container {
  width: 80%;
  border: 1px solid rgb(0, 217, 255);
  border-top: 2px solid rgb(0, 153, 255);
}
.dataManagementHeader {
  display: flex;
  justify-content: space-between;
  padding: 8px 20px;
  background-color: rgba(0, 225, 255, 0.5);
}
.dataManagement-content {
  padding: 20px 0;
}
.file-content {
  padding: 0 20px;
}
.video {
  display: flex;
  justify-content: space-around;
}
</style>
