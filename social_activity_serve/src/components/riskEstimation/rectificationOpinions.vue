<template>
  <div class="rectificationOpinions">
    <!-- 整改意见管理 -->
    <h1 class="opinions-title" style="margin: 20px 0;">整改意见列表</h1>
    <Table :columns="columns1" :data="data1"></Table>
    <div class="submitButton" style="margin: 50px 0;">
      <Button type="primary" style="margin-right: 100px;">保存</Button>
      <Button type="primary">取消</Button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rectificationOpinions',
  data () {
    return {
      columns1: [
        {
          title: '活动名称',
          key: 'eventName'
        },
        {
          title: '活动地点',
          key: 'eventPlace'
        },
        {
          title: '方案名称',
          key: 'schemeName'
        },
        {
          title: '整改意见',
          key: 'rectificationOpinion'
        },
        {
          title: '意见详情',
          key: 'opinionDetails'
        },
        {
          title: '状态',
          key: 'status'
        },
        {
          title: '操作',
          key: 'operating'
        }
      ],
      data1: [
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
