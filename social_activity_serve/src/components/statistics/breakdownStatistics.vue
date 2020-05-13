<template>
  <div class="breakdownStatistics">
    <!-- 分项统计 -->
    <h1>分项统计</h1>
    <Divider orientation="left" style="font-size: 12px; font-family: '楷体'; color: rgb(160, 160, 160);">综合数据管理</Divider>
    <Table border :columns="columns1" :data="data1"></Table>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from 'vuex'
import activityFenXiangTable from './activityFenXiangTable'

export default {
  name: 'breakdownStatistics',
  components: { activityFenXiangTable },
  data () {
    return {
      columns1: [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h(activityFenXiangTable, {
              props: {
                row: params.row
              }
            })
          }
        },
        {
          type: 'index',
          width: 70,
          align: 'center',
          title: '#'
        },
        {
          title: '活动名称',
          key: 'name'
        },
        {
          title: '活动类型',
          key: 'type'
        },
        {
          title: '综合得分',
          key: 'score',
          align: 'center',
          width: 100
        }
      ],
      data1: []
    }
  },
  computed: {
    ...mapGetters(['activities'])
  },
  methods: {
    getActivityRisk () {
      this.$axios.get('http://localhost:3000/api/riskEstimate/getActivityRisk').then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          let totalScore = res.data[i].activitySelectRisk.reduce((total, item) => {
            total += Number(item.selectFen.split(':')[1])
            return total
          }, 0)
          this.data1.push({
            activityId: res.data[i].activityId,
            name: res.data[i].activityName,
            type: res.data[i].activityType,
            score: totalScore,
            activitySelectRisk: res.data[i].activitySelectRisk
          })
          this.data1[0]._expanded = true
        }
      }).catch(e => {
        console.log('信息获取失败：', e)
      })
    }
  },
  mounted () {
    this.getActivityRisk()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
