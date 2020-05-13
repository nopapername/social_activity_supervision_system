<template>
  <div class="processManagementDiagram">
    <!-- 活动流程管理图 -->
    <h1 style="margin: 20px 0;">活动列表</h1>
    <Divider orientation="left" style="font-size: 12px; font-family: '楷体'; color: rgb(160, 160, 160);">活动流程管理</Divider>
    <Table :columns="columns1" :data="data1"></Table>
    <Button type="primary" style="margin: 20px 0;" @click="tianjiaT">添加活动</Button>
  </div>
</template>

<script>
import '@/plugins/Date'
export default {
  name: 'processManagementDiagram',
  data () {
    return {
      columns1: [
        {
          title: '活动名称',
          key: 'name'
        },
        {
          title: '活动填报时间',
          key: 'date'
        },
        {
          title: '活动日期',
          key: 'startToEnd'
        }
      ],
      data1: [
      ]
    }
  },
  mounted () {
    this.getAllActivities()
  },
  methods: {
    getAllActivities () {
      var that = this
      this.$axios
        .get('http://localhost:3000/api/activity/getAllActivities')
        .then(res => {
          this.$store.dispatch('setActivities', res.data)
          for (let i = 0; i < res.data.length; i++) {
            that.data1.push({
              name: res.data[i].activityName,
              startToEnd: res.data[i].jubanTimeStart + '-' + res.data[i].jubanTimeEnd,
              date: new Date(res.data[i].date).format('yyyy.MM.dd HH:mm:ss')
            })
          }
        }).catch(e => {
          console.log('信息获取失败：', e)
        })
    },
    tianjiaT () {
      this.$router.push('./activityReport')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
