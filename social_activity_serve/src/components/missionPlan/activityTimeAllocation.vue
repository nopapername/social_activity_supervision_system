<template>
  <div class="activityTimeAllocation">
    <!-- 活动时间分配 -->
    <h1 style="margin: 20px 0;">活动时间分配</h1>
    <Divider orientation="left" style="font-size: 12px; font-family: '楷体'; color: rgb(160, 160, 160);">任务计划安排</Divider>
    <div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
        <Card :bordered="false" v-for="(item, index) in data1" :key="index" style="width: 45%; margin-top: 10px;">
          <p slot="title">-{{ item.jubanTimeStart }}至{{ item.jubanTimeEnd }}:</p>
          <p>{{ item.activityName }}</p>
        </Card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'activityTimeAllocation',
  data () {
    return {
      data1: []
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
          that.data1 = res.data
        }).catch(e => {
          console.log('信息获取失败：', e)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
