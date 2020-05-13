<template>
  <div class="classifiedArchive">
    <!-- 活动分类归档 -->
    <h1>活动分类归档</h1>
    <Divider orientation="left" style="font-size: 12px; font-family: '楷体'; color: rgb(160, 160, 160);">综合数据管理</Divider>
    <Table border :columns="columns1" :data="data1"></Table>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from 'vuex'
import activityInfoTable from './activityInfoTable'
export default {
  name: 'classifiedArchive',
  components: { activityInfoTable },
  data () {
    return {
      columns1: [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h(activityInfoTable, {
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
          title: '活动填报时间',
          key: 'date'
        },
        {
          title: '活动进行日期',
          key: 'startToEnd'
        }
      ],
      data1: []
    }
  },
  computed: {
    ...mapGetters(['activities'])
  },
  methods: {
    getAllActivities () {
      for (let i = 0; i < this.activities.length; i++) {
        this.data1.push({
          activityId: this.activities[i].activityId,
          name: this.activities[i].activityName,
          type: this.activities[i].activityType,
          startToEnd: this.activities[i].jubanTimeStart + '-' + this.activities[i].jubanTimeEnd,
          date: new Date(this.activities[i].date).format('yyyy.MM.dd HH:mm:ss')
        })
        this.data1[0]._expanded = true
      }
    }
  },
  mounted () {
    this.getAllActivities()
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
