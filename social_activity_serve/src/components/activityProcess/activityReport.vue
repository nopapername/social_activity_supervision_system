<template>
  <div class="activityReport">
    <!-- 活动填报 -->
    <Divider orientation="left" style="font-size: 12px; font-family: '楷体'; color: rgb(160, 160, 160);">活动流程管理</Divider>
    <div class="header-report">
        <Tabs type="card" @on-click="selectTab" :value="thisTab" :animated="false">
          <TabPane label="基础资料"><basicInformation ref="basicInformation"></basicInformation></TabPane>
          <TabPane label="预案登记"><planRegistration ref="planRegistration"></planRegistration></TabPane>
          <TabPane label="单位登记"><organizer ref="organizer"></organizer></TabPane>
          <TabPane label="踏勘记录"><surveyRecord ref="surveyRecord"></surveyRecord></TabPane>
          <TabPane label="风险预估"><riskEstimatesAnalysis ref="riskEstimatesAnalysis"></riskEstimatesAnalysis></TabPane>
          <TabPane label="发案通报"><caseSituation ref="caseSituation"></caseSituation></TabPane>
          <TabPane label="现场资料"><dataManagement ref="dataManagement"></dataManagement></TabPane>
          <TabPane label="活动日志"><workLog ref="workLog"></workLog></TabPane>
          <TabPane label="工作总结"><workSummary ref="workSummary"></workSummary></TabPane>
        </Tabs>
        <div class="right-report">
          <Steps :current="thisTab" direction="vertical">
            <Step title="基础"></Step>
            <Step title="预案"></Step>
            <Step title="单位"></Step>
            <Step title="踏勘"></Step>
            <Step title="风险"></Step>
            <Step title="发案"></Step>
            <Step title="现场"></Step>
            <Step title="日志"></Step>
            <Step title="总结"></Step>
          </Steps>
        </div>
        <div style="margin-top: 50px;">
          <Button type="primary" @click="preStep" v-show="!(thisTab === 0)" style="margin-right: 10px;">上一步</Button>
          <Button type="primary" @click="nextStep" v-show="!(thisTab === 8)">下一步</Button>
          <Button type="primary" v-show="thisTab === 8" @click="submitAllActivityInfo">提交</Button>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import loadingSign from '@/plugins/loadingSign'
export default {
  name: 'activityReport',
  data () {
    return {
    }
  },
  methods: {
    selectTab (name) {
      this.$store.commit('selectTab', name)
    },
    nextStep () {
      this.$store.commit('nextStep')
    },
    preStep () {
      this.$store.commit('preStep')
    },
    async submitAllActivityInfo () {
      loadingSign.start('提交信息中...')
      this.$refs.workSummary.setWorkSummaryAgain()
      // {"basicInformationData":{"activityName":"202体育竞赛","organizationalUnit":"川师202","holdStart":"2020.05.20","holdEnd":"2020.05.21","serviceStart":"2020.05.19","serviceEnd":"2020.05.22","place":"成都川师操场","nature":"友好竞赛类","extent":"6人","peopleNum":"6人","responsiblePolice":"马强","managerPeople":"林秋志","flieSomes":"[object
      // FileList]"},"planRegistrationData":{"planImgForm":{"imgName":"场地分配图","imgContent":"关于场地的一些东西"},"planFormItem":{"sitePlanName":"202体育竞赛场地预案","activityDuration":"2天","activityPlace":"川师操场","unitSubmittingPlanL":"","personResponsible":"蒲智鹏","undertakerDetails":"承办单位详情:承办单位详情","detailedPlan":"预案详细方案:预案详细方案","safetyPlan":"安全预案:安全预案:安全预案","emergencyGroomingPlan":"紧急疏导方案:紧急疏导方案","siteDeployment":"操场草地","planner":"罗静","imgFile":"[object
      // FileList]","unitSubmittingPlan":"川师202"}},"organizerData":{"organizeName":"川师202"},"surveyRecordData":{"imgFileTakan":"[object
      // FileList]","surveyRecordForm":{"items":[{"title":"踏勘记录1","detail":"没啥问题","caijipeople":"马强","date":"2020.04.30"}]}},"riskEstimatesAnalysisData":[{"baogaoName":"风险报告1","detail":"无风险","pingguPeople":"林秋志","date":"2020.05.01"}],"caseSituationData":[{"name":"发案通报1","descripte":"无通报","tongbaopeople":"林秋志","date":"2020.05.02"}],"dataManagementData":{"fileData":"[object
      // FileList]"},"workLogData":[{"name":"日志1","detail":"无工作","bianbaopeople":"蒲智鹏","date":"2020.05.05"}],"workSummaryData":[{"name":"总结1","detail":"详情总结","bianbaopeople":"邵博超","date":"2020.05.03"}]}

      const activity = this.activity
      // 上传
      await this.sendAllFile()
      activity.basicInformationData.flieSomes = null
      activity.planRegistrationData.planFormItem.imgFile = null
      activity.surveyRecordData.imgFileTakan = null
      activity.dataManagementData.fileData = null
      this.$axios
        .post('http://localhost:3000/api/activity/saveActivity', activity)
        .then(res => {
          console.log(res)
          loadingSign.end()
          this.$Message.success({
            content: '保存成功'
          })
          this.$router.push('./processManagementDiagram')
          this.submitOperating(this.adminInfo.email, this.adminInfo.role, `新增填报了${activity.basicInformationData.activityName}`)
          this.$refs.basicInformation.resetFormData()
          this.$refs.planRegistration.resetFormData()
          this.$refs.organizer.resetFormData()
          this.$refs.surveyRecord.resetFormData()
          this.$refs.riskEstimatesAnalysis.resetFormData()
          this.$refs.caseSituation.resetFormData()
          this.$refs.workLog.resetFormData()
          this.$refs.workSummary.resetFormData()
        }).catch(e => {
          console.log('activityInfo保存失败', e)
        })
    },
    sendAllFile () {
      const activity = this.activity
      const config = {
        // 传文件必须设置content-type
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      if (activity.basicInformationData.flieSomes) {
        const basicInformationFile = new FormData()
        for (var i in activity.basicInformationData.flieSomes) {
          basicInformationFile.append('file', activity.basicInformationData.flieSomes[i])
        }
        this.$axios
          .post('http://localhost:3000/api/activity/saveBasicInformationFile', basicInformationFile, config)
          .then(res => {
            console.log(res)
          }).catch(e => {
            console.log('basicInformationFile保存失败', e)
          })
      }
      if (activity.planRegistrationData.planFormItem.imgFile) {
        const planRegistrationFile = new FormData()
        for (var j in activity.planRegistrationData.planFormItem.imgFile) {
          planRegistrationFile.append('file', activity.planRegistrationData.planFormItem.imgFile[j])
        }
        this.$axios
          .post('http://localhost:3000/api/activity/savePlanRegistrationFile', planRegistrationFile, config)
          .then(res => {
            console.log(res)
          }).catch(e => {
            console.log('planRegistrationFile保存失败', e)
          })
      }
      if (activity.surveyRecordData.imgFileTakan) {
        const surveyRecordFile = new FormData()
        for (var k in activity.surveyRecordData.imgFileTakan) {
          surveyRecordFile.append('file', activity.surveyRecordData.imgFileTakan[k])
        }
        this.$axios
          .post('http://localhost:3000/api/activity/saveSurveyRecordFile', surveyRecordFile, config)
          .then(res => {
            console.log(res)
          }).catch(e => {
            console.log('surveyRecordFile保存失败', e)
          })
      }
      if (activity.dataManagementData.fileData) {
        const dataManagementFile = new FormData()
        for (var l in activity.dataManagementData.fileData) {
          dataManagementFile.append('file', activity.dataManagementData.fileData[l])
        }
        this.$axios
          .post('http://localhost:3000/api/activity/saveDataManagementFile', dataManagementFile, config)
          .then(res => {
            console.log(res)
          }).catch(e => {
            console.log('dataManagementFile保存失败', e)
          })
      }
    }
  },
  computed: {
    ...mapGetters(['thisTab', 'activity', 'adminInfo'])
  },
  components: {
    basicInformation: () => import('./activityReportSteps/basicInformation.vue'),
    planRegistration: () => import('./activityReportSteps/planRegistration.vue'),
    organizer: () => import('./activityReportSteps/organizer.vue'),
    surveyRecord: () => import('./activityReportSteps/surveyRecord.vue'),
    riskEstimatesAnalysis: () => import('./activityReportSteps/riskEstimatesAnalysis.vue'),
    caseSituation: () => import('./activityReportSteps/caseSituation.vue'),
    dataManagement: () => import('./activityReportSteps/dataManagement.vue'),
    workLog: () => import('./activityReportSteps/workLog.vue'),
    workSummary: () => import('./activityReportSteps/workSummary.vue')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.activityReport {
    width: 100%;
}
.header-report {
    width: calc(100% - 80px);
}
.right-report {
    width: 80px;
    position: fixed;
    right: 50px;
    top: calc(50% - 221.5px);
}
</style>
