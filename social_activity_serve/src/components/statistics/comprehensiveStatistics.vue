<template>
  <div class="comprehensiveStatistics">
    <!-- 综合统计 -->
    <h1>综合统计</h1>
    <Divider orientation="left" style="font-size: 12px; font-family: '楷体'; color: rgb(160, 160, 160);">综合数据管理</Divider>
    <div style="margin: 20px 0;">
      <Button @click="whichEcharts = 0" :type="whichEcharts === 0 ? 'primary' : 'default'">饼状图</Button>
      <Button :type="whichEcharts === 1 ? 'primary' : 'default'" @click="whichEcharts = 1"
        style="margin-left: 10px;">柱状图</Button>
    </div>
    <div style="display: flex; justify-content: center; align-items: center;" v-if="whichEcharts === 0">
      <chart ref="chart1" :options="orgOptionsPie" :auto-resize="true"></chart>
    </div>
    <div style="display: flex; justify-content: center; align-items: center;" v-if="whichEcharts === 1">
      <chart ref="chart2" :options="orgOptionsBar" :auto-resize="true"></chart>
    </div>
  </div>
</template>

<script>
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/toolbox'
import { mapGetters } from 'vuex'
export default {
  name: 'comprehensiveStatistics',
  data () {
    return {
      whichEcharts: 0,
      orgOptionsBar: {
        title: {
          text: '活动类型柱状统计图',
          subtext: '统计有哪些类型的活动',
          left: 'center'
        },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '400%']
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br />{b} : {c}'
        },
        toolbox: {
          show: true,
          feature: {
            mark: {
              show: true
            },
            dataView: {
              show: true,
              readOnly: false
            },
            restore: {
              show: true
            },
            saveAsImage: {
              show: true
            }
          }
        },
        series: [
          {
            data: [],
            type: 'bar',
            name: '活动类型'
          }
        ]
      },
      orgOptionsPie: {
        title: {
          text: '活动类型圆饼统计图',
          subtext: '统计有哪些类型的活动',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          top: 'bottom',
          data: ['体育', '趣味', '聚餐', '会议', '讲座', '展会']
        },
        toolbox: {
          show: true,
          feature: {
            mark: {
              show: true
            },
            dataView: {
              show: true,
              readOnly: false
            },
            magicType: {
              show: true,
              type: ['pie', 'funnel']
            },
            restore: {
              show: true
            },
            saveAsImage: {
              show: true
            }
          }
        },
        series: [
          {
            name: '活动类型',
            type: 'pie',
            radius: [20, 110],
            center: ['50%', '50%'],
            roseType: 'area',
            data: []
          }
        ]
      }
    }
  },
  watch: {
    whichEcharts (val) {
      this.getActivityTypeAndCount()
    }
  },
  computed: {
    ...mapGetters(['activities'])
  },
  methods: {
    getActivityTypeAndCount () {
      if (this.whichEcharts === 0) {
        const dataTmp = []
        const dataLegendTmp = []
        this.activities.forEach((item) => {
          const indexTmp = dataTmp.findIndex((it) => {
            return it.name === item.activityType
          })
          if (indexTmp !== -1) {
            dataTmp[indexTmp].value += 1
          } else {
            dataTmp.push({
              value: 1,
              name: item.activityType
            })
            dataLegendTmp.push(item.activityType)
          }
        })
        setTimeout(() => {
          this.$refs.chart1.mergeOptions({
            legend: {
              data: dataLegendTmp
            },
            series: [
              {
                data: dataTmp
              }
            ]
          })
        }, 0)
      } else if (this.whichEcharts === 1) {
        const dataTmp = []
        const dataXAxisTmp = []
        this.activities.forEach((item) => {
          const indexTmp = dataXAxisTmp.findIndex((it) => {
            return it === item.activityType
          })
          if (indexTmp !== -1) {
            dataTmp[indexTmp] += 1
          } else {
            dataXAxisTmp.push(item.activityType)
            dataTmp.push(1)
          }
        })
        setTimeout(() => {
          this.$refs.chart2.mergeOptions({
            xAxis: {
              data: dataXAxisTmp
            },
            series: [
              {
                data: dataTmp
              }
            ]
          })
        }, 0)
      }
    }
  },
  mounted () {
    this.getActivityTypeAndCount()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
