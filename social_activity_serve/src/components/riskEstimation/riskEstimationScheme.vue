<template>
  <div class="riskEstimationScheme">
    <!-- 风险预估方案管理 -->
    <Divider orientation="left" style="font-size: 12px; font-family: '楷体'; color: rgb(160, 160, 160);">风险预估管理</Divider>
    <Table :columns="columns1" :data="data1" v-show="!isHoverEvent">
      <template slot="nameRisk" slot-scope="{ row, index }">
        <a href="javascript:void(0)" @click="selectEvent(row, index)">{{ row.eventName }}</a>
      </template>
    </Table>
    <div v-if="isHoverEvent">
      <h1 class="table-title" style="margin: 10px 0;">{{ data1[rowIndex].eventKind }}活动风险评估方案</h1>
      <div class="table-content">
        <div v-show="!factorData.length" style="border: 1px solid #e7e8eb; padding: 8px 0;">暂无数据</div>
        <div class="table-row" v-for="(items,index1) in factorData" :key="index1">
          <div class="cell-th">{{ items.factor }}</div>
          <div class="td-content">
            <div class="cell-td" v-for="(item, index2) in items.specific" :key="index2"
              @click="selectFactor(index1, index2, item.select)"
              :style="{backgroundColor: item.select ? '#ffa010' : ''}">
              {{ item.name }}</div>
          </div>
        </div>
      </div>
      <div class="submitButton">
        <Button type="primary" style="margin-right: 100px;" @click="submitActivityRisk">保存</Button>
        <Button type="primary" @click="selectEvent">取消</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'riskEstimationScheme',
  data () {
    return {
      factorData: [],
      columns1: [
        {
          title: '活动名称',
          key: 'eventName',
          slot: 'nameRisk'
        },
        {
          title: '活动类型',
          key: 'eventKind'
        }
      ],
      data1: [],
      isHoverEvent: false,
      rowIndex: 0
    }
  },
  computed: {
    ...mapGetters(['activities', 'activityRisk'])
  },
  methods: {
    selectFactor (index1, index2, select) {
      var { factorData } = this
      factorData[index1].specific[index2].select = !select
    },
    selectEvent (row, index) {
      this.rowIndex = index
      this.isHoverEvent = !this.isHoverEvent
    },
    getRiskEstimates () {
      var that = this
      this.axios.get('http://localhost:3000/api/riskEstimate/getRiskEstimate').then((res) => {
        res.data.forEach((item, index) => {
          const findIndex = this.factorData.findIndex((val) => val.factor === item.parentItem)
          if (findIndex === -1) {
            const riskObj = {}
            riskObj.factor = item.parentItem
            riskObj.specific = []
            riskObj.specific.push({
              name: item.childItem,
              opitionsAndFen: item.opitionsAndFen,
              select: Boolean(Math.round(Math.random()))
            })
            this.factorData.push(riskObj)
          } else {
            this.factorData[findIndex].specific.push({
              name: item.childItem,
              opitionsAndFen: item.opitionsAndFen,
              select: Boolean(Math.round(Math.random()))
            })
          }
        })
      }).catch((err) => {
        that.$Message.error('数据获取失败' + err)
      })
    },
    getAllActivities () {
      const that = this
      for (let i = 0; i < this.activities.length; i++) {
        this.data1.push({
          eventName: that.activities[i].activityName,
          eventKind: that.activities[i].activityType
        })
      }
    },
    submitActivityRisk () {
      const activityRiskObj = {}
      activityRiskObj.activityId = this.activities[this.rowIndex].activityId
      activityRiskObj.activityName = this.activities[this.rowIndex].activityName
      activityRiskObj.activityType = this.activities[this.rowIndex].activityType
      activityRiskObj.activitySelectRisk = []
      this.factorData.forEach((item) => {
        item.specific.forEach((val) => {
          if (val.select) {
            const activitySelectRisk = {}
            activitySelectRisk.factor = item.factor
            activitySelectRisk.name = val.name
            activitySelectRisk.opitionsAndFen = val.opitionsAndFen
            activitySelectRisk.selectFen = ''
            activityRiskObj.activitySelectRisk.push(activitySelectRisk)
          }
        })
      })
      this.$store.dispatch('setActivityRisk', activityRiskObj)
      this.rowIndex = 0
      this.isHoverEvent = !this.isHoverEvent
    }
  },
  mounted () {
    this.getAllActivities()
    this.getRiskEstimates()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.riskEstimationScheme {
  width: 100%;
}
.table-content {
  width: 100%;
  padding: 10px 0;
}
.table-row {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.cell-th {
  width: 180px;
  border: 1px solid #f1f1f1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f8f9;
}
.td-content {
  width: calc(100% - 200px);
  display: flex;
  flex-wrap: wrap;
}
.cell-td {
  width: 180px;
  padding: 5px 0;
  border: 1px solid #f1f1f1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.submitButton {
  margin: 100px 0;
}
</style>
