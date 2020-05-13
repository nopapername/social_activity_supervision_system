<template>
  <div class="displayActivityRiskRes">
    <!-- 风险预估结果管理 -->
    <div class="risk-container">
      <div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
        <Card :bordered="false" v-for="(item, index) in activityRisk" :key="index"
          @click.native="clickCurActivity(index)"
          style="width: 45%; cursor: pointer; margin-top: 10px; background-color: rgb(255, 247, 236);">
          <p>{{ item.activityName }}</p>
        </Card>
      </div>
      <div class="selectActivityRisk" v-show='isActivityRisk'>
        <h1 class="riskResult-title" style="margin: 10px 0;">{{ selectActivityRisk.activityName }} 风险评估</h1>
        <Table border :columns="columns1" :data="data1"></Table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'displayActivityRiskRes',
  data () {
    return {
      columns1: [
        {
          title: '主项名称',
          key: 'parentItem',
          align: 'center',
          filters: [],
          filterMultiple: false,
          filterMethod (value, row, label) {
            if (value) {
              return row.parentItem === value
            }
          }
        },
        {
          title: '子项名称',
          align: 'center',
          key: 'childItem'
        },
        {
          title: '选项',
          key: 'selectFen',
          align: 'center'
        }
      ],
      activityRisk: [],
      data1: [],
      isActivityRisk: false,
      selectActivityRisk: {}
    }
  },
  mounted () {
    this.getActivityRisk()
  },
  methods: {
    clickCurActivity (index) {
      const that = this
      this.isActivityRisk = false
      this.selectActivityRisk = this.activityRisk[index]
      const activityR = []
      const dataLin = []
      this.selectActivityRisk.activitySelectRisk.forEach((item) => {
        if (activityR.every((item1) => { return item1.label !== item.factor })) {
          activityR.push({
            label: item.factor,
            value: item.factor
          })
        }
        dataLin.push({
          parentItem: item.factor,
          childItem: item.name,
          OpitionAndFen: item.opitionsAndFen,
          selectFen: item.selectFen
        })
      })
      that.columns1[0].filters = [...activityR]
      that.data1 = [...dataLin]
      setTimeout(() => {
        this.isActivityRisk = true
      }, 0)
    },
    getActivityRisk () {
      this.$axios.get('http://localhost:3000/api/riskEstimate/getActivityRisk').then((res) => {
        this.activityRisk = res.data
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.selectActivityRisk {
  animation: actTableJoin .5s ease-in;
}
@keyframes actTableJoin {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
