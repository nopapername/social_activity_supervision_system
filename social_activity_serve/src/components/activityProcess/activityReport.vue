<template>
  <div class="activityReport">
    <!-- 活动填报 -->
    <div class="header-report">
        <Tabs type="card" @on-click="selectTab" :value="thisTab" :animated="false">
          <TabPane label="基础资料"><basicInformation></basicInformation></TabPane>
          <TabPane label="预案登记"><planRegistration></planRegistration></TabPane>
          <TabPane label="单位登记"><organizer></organizer></TabPane>
          <TabPane label="踏勘记录"><surveyRecord></surveyRecord></TabPane>
          <TabPane label="风险预估"><riskEstimatesAnalysis></riskEstimatesAnalysis></TabPane>
          <TabPane label="发案通报"><caseSituation></caseSituation></TabPane>
          <TabPane label="现场资料"><dataManagement></dataManagement></TabPane>
          <TabPane label="活动日志"><workLog></workLog></TabPane>
          <TabPane label="工作总结"><workSummary></workSummary></TabPane>
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
          <Button type="primary" v-show="thisTab === 8">提交</Button>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'activityReport',
  data () {
    return {
      thisTab: 0
    }
  },
  methods: {
    selectTab (name) {
      this.thisTab = name
    },
    nextStep () {
      this.thisTab += 1
    },
    preStep () {
      this.thisTab -= 1
    }
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
