<template>
  <div class="basicInformation">
    <!-- 基础资料 -->
    <div class="basic-content">
      <div class="basicHeader">
        <p style="font-size: 18px; color: rgb(255, 94, 0); font-family: '楷体'; font-weight: bold;">基础资料</p>
        <a href="javascript:void(0)" style="font-size: 13px; color: rgb(255, 94, 0); line-height: 26.4px; font-family: '楷体'">进入查看页面</a>
      </div>
      <div class="form-content">
        <Form :model="basicInformation" :label-width="90" label-position="right" label-colon ref="form111">
          <Row type="flex" justify="space-around">
            <Col>
              <FormItem label="活动名称">
                <Input v-model="basicInformation.activityName" placeholder="请输入活动名称"></Input>
              </FormItem>
            </Col>
            <Col>
              <FormItem label="组织单位">
                <Input v-model="basicInformation.organizationalUnit" placeholder="请输入组织单位"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="space-around">
            <Col>
              <FormItem label="举办时间起">
                <Input v-model="basicInformation.holdStart" placeholder="请输入开始举办时间"></Input>
              </FormItem>
            </Col>
            <Col>
              <FormItem label="举办时间止">
                <Input v-model="basicInformation.holdEnd" placeholder="请输入结束举办时间"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="space-around">
            <Col>
              <FormItem label="勤务时间起">
                <Input v-model="basicInformation.serviceStart" placeholder="请输入勤务时间起"></Input>
              </FormItem>
            </Col>
            <Col>
              <FormItem label="勤务时间止">
                <Input v-model="basicInformation.serviceEnd" placeholder="请输入勤务时间止"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="space-around">
            <Col>
              <FormItem label="地点">
                <Input v-model="basicInformation.place" placeholder="请输入地点"></Input>
              </FormItem>
            </Col>
            <Col>
              <FormItem label="类型">
                <Input v-model="basicInformation.nature" placeholder="请输入活动类型"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="space-around">
            <Col>
              <FormItem label="规模">
                <Input v-model="basicInformation.extent" placeholder="请输入规模"></Input>
              </FormItem>
            </Col>
            <Col>
              <FormItem label="参与人数">
                <Input v-model="basicInformation.peopleNum" placeholder="请输入参与人数"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="space-around">
            <Col>
              <FormItem label="责任民警">
                <Input v-model="basicInformation.responsiblePolice" placeholder="请输入责任民警"></Input>
              </FormItem>
            </Col>
            <Col>
              <FormItem label="经办人">
                <Input v-model="basicInformation.managerPeople" placeholder="请输入经办人"></Input>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
      <div class="file-content">
        <Divider orientation="left" style="color:rgb(255, 94, 0);">相关材料</Divider>
        <a href="javascript:void(0)" class="a-upload"><input type="file" multiple="multiple" id="someFile" @change="fileInputChange">上传</a>
        <div class="file" v-for="(item,index) in basicInformation.flieSomes" :key="index">
          <div>{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'basicInformation',
  data () {
    return {
      basicInformation: {
        activityName: '',
        organizationalUnit: '',
        holdStart: '',
        holdEnd: '',
        serviceStart: '',
        serviceEnd: '',
        place: '',
        nature: '',
        extent: '',
        peopleNum: '',
        responsiblePolice: '',
        managerPeople: '',
        flieSomes: null
      }
    }
  },
  computed: {
    ...mapGetters(['thisTab'])
  },
  watch: {
    thisTab (val) {
      if (val !== 0) {
        this.$store.commit('setBasicInformation', this.basicInformation)
      }
    }
  },
  methods: {
    fileInputChange () {
      var fileInput = document.getElementById('someFile')
      this.basicInformation.flieSomes = fileInput.files
    },
    resetFormData () {
      this.$refs.form111.resetFields()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.basicInformation {
  width: 100%;
  display: flex;
  justify-content: center;
}
.basic-content {
  width: 80%;
  border: 1px solid rgb(0, 217, 255);
  border-top: 2px solid rgb(0, 153, 255);
}
.basicHeader {
  display: flex;
  justify-content: space-between;
  padding: 8px 20px;
  background-color: rgba(0, 153, 255, 0.5);
}
.form-content {
  padding: 20px 50px;
}
.file-content {
  padding: 20px 50px;
  position: relative;
}
.a-upload {
  position: relative;
  left: 40%;
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
