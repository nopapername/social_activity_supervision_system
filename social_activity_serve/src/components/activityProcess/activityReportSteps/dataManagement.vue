<template>
  <div class="dataManagement">
    <!-- 资料管理 -->
    <div class="dataManagement-container">
      <div class="dataManagementHeader">
        <p style="font-size: 18px; color: rgb(255, 94, 0); font-family: '楷体'; font-weight: bold;">现场资料</p>
      </div>
      <div class="dataManagement-content">
        <div class="file-content">
          <a href="javascript:void(0)" class="a-upload"><input type="file" multiple="multiple"
              id="fileData" @change="fileChange">上传资料</a>
          <div class="video" v-for="(item,index) in dataManagement.fileData" :key="index">
            <a href="javascript:void(0)">{{ item.name }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'dataManagement',
  data () {
    return {
      dataManagement: {
        fileData: null
      }
    }
  },
  computed: {
    ...mapGetters(['thisTab'])
  },
  watch: {
    thisTab (val) {
      if (val !== 6) {
        this.$store.commit('setDataManagement', this.dataManagement)
      }
    }
  },
  methods: {
    fileChange () {
      var fileInput = document.getElementById('fileData')
      this.dataManagement.fileData = fileInput.files
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
.a-upload {
  margin-top: 10px;
  position: relative;
  display: inline-block;
  background: #D0EEFF;
  border: 1px solid #99D3F5;
  border-radius: 4px;
  padding: 2px 6px;
  overflow: hidden;
  color: #1E88C7;
  text-decoration: none;
  text-indent: 0;
  font-size: 13px;
}
.a-upload input {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
}
.a-upload:hover {
  background: #AADFFD;
  border-color: #78C3F3;
  color: #004974;
  text-decoration: none;
}
</style>
