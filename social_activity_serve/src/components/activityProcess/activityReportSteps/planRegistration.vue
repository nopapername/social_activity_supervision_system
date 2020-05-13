<template>
  <div class="planRegistration">
    <!-- 预案登记 -->
    <div class="plan-container">
      <div class="planHeader">
        <p style="font-size: 18px; color: rgb(255, 94, 0); font-family: '楷体'; font-weight: bold;">预案登记</p>
      </div>
      <div class="plan-content">
        <img :src="imgSrc" alt="planImg" width="100%" v-show="imgSrc">
        <a href="javascript:void(0)" class="a-upload"><input type="file" id="imgFile" @change="fileImgChange">上传图片</a>
        <Form ref="planImgForm" :model="planImgForm" :rules="planImgFormRule" inline :label-width="90" label-position="right" style="margin-top: 20px;">
          <FormItem label="图片名称" prop="imgName">
            <Input v-model="planImgForm.imgName" placeholder="请输入活动名称"></Input>
          </FormItem>
          <FormItem label="内容描述" prop="imgContent">
            <Input v-model="planImgForm.imgContent" placeholder="请输入活动名称"></Input>
          </FormItem>
        </Form>
        <Divider style="margin-top: 0;" />
        <Form :model="planFormItem" :label-width="100" label-position="right" label-colon ref="form222">
          <FormItem label="场地预案名称">
            <Input v-model="planFormItem.sitePlanName" placeholder="请输入场地预案名称"></Input>
          </FormItem>
          <Row type="flex" justify="space-around">
            <Col>
              <FormItem label="活动时长">
                <Input v-model="planFormItem.activityDuration" placeholder="请输入活动时长"></Input>
              </FormItem>
            </Col>
            <Col>
              <FormItem label="活动地点/场所" :label-width="105">
                <Input v-model="planFormItem.activityPlace" placeholder="请输入活动地点/场所"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="space-around">
            <Col>
              <FormItem label="预案提交单位">
                <Input v-model="planFormItem.unitSubmittingPlan" placeholder="请输入预案提交单位"></Input>
              </FormItem>
            </Col>
            <Col>
              <FormItem label="承办方责任人">
                <Input v-model="planFormItem.personResponsible" placeholder="请输入承办方责任人"></Input>
              </FormItem>
            </Col>
          </Row>
          <FormItem label="承办单位详情">
            <Input v-model="planFormItem.undertakerDetails" type="textarea" :autosize="{minRows: 3,maxRows: 6}"
              placeholder="请输入承办单位详情..." />
          </FormItem>
          <FormItem label="预案详细方案">
            <Input v-model="planFormItem.detailedPlan" type="textarea" :autosize="{minRows: 3,maxRows: 6}"
              placeholder="请输入预案详细方案..." />
          </FormItem>
          <FormItem label="安全预案">
            <Input v-model="planFormItem.safetyPlan" type="textarea" :autosize="{minRows: 3,maxRows: 6}"
              placeholder="请输入安全预案..." />
          </FormItem>
          <FormItem label="紧急疏导方案">
            <Input v-model="planFormItem.emergencyGroomingPlan" type="textarea" :autosize="{minRows: 3,maxRows: 6}"
              placeholder="请输入紧急疏导方案..." />
          </FormItem>
          <Row type="flex" justify="space-around">
            <Col>
              <FormItem label="场地部署">
                <Input v-model="planFormItem.siteDeployment" placeholder="请输入部署场地"></Input>
              </FormItem>
            </Col>
            <Col>
              <FormItem label="预案制定人">
                <Input v-model="planFormItem.planner" placeholder="请输入预案制定人"></Input>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'planRegistration',
  data () {
    return {
      planImgForm: {
        imgName: '',
        imgContent: ''
      },
      planImgFormRule: {
        imgName: [
          { required: true, message: '请输入图片名称', trigger: 'blur' }
        ],
        imgContent: [
          { required: true, message: '请输入详细信息', trigger: 'blur' }
        ]
      },
      planFormItem: {
        sitePlanName: '',
        activityDuration: '',
        activityPlace: '',
        unitSubmittingPlanL: '',
        personResponsible: '',
        undertakerDetails: '',
        detailedPlan: '',
        safetyPlan: '',
        emergencyGroomingPlan: '',
        siteDeployment: '',
        planner: '',
        imgFile: null
      },
      imgSrc: ''
    }
  },
  computed: {
    planRegistration () {
      return {
        planImgForm: this.planImgForm,
        planFormItem: this.planFormItem
      }
    },
    ...mapGetters(['thisTab'])
  },
  watch: {
    thisTab (val) {
      if (val !== 1) {
        this.$store.commit('setPlanRegistration', this.planRegistration)
      }
    }
  },
  methods: {
    fileImgChange () {
      var that = this
      var fileInput = document.getElementById('imgFile')
      this.planFormItem.imgFile = fileInput.files
      var reader = new FileReader()
      reader.readAsDataURL(fileInput.files[0])
      reader.onload = function (e) {
        that.imgSrc = this.result
      }
    },
    resetFormData () {
      this.$refs.form222.resetFields()
      this.$refs.planImgForm.resetFields()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.planRegistration {
  width: 100%;
  display: flex;
  justify-content: center;
}
.plan-container {
  width: 80%;
  border: 1px solid rgb(0, 217, 255);
  border-top: 2px solid rgb(0, 153, 255);
}
.planHeader {
  display: flex;
  justify-content: space-between;
  padding: 8px 20px;
  background-color: rgba(0, 153, 255, 0.5);
}
.plan-content {
  padding: 0 20px;
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
