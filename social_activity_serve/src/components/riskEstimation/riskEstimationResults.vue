<template>
  <div class="riskEstimationResults">
    <!-- 风险预估结果管理 -->
    <h1 class="riskResult-title" style="margin: 10px 0;">省体育馆3月2日XXX大型足球比赛风险评估</h1>
    <Table border :columns="columns1" :data="data1" max-height="300">
      <template slot="action">
        <Button type="primary" size="small" style="margin-right: 5px">View</Button>
        <Button type="error" size="small">Delete</Button>
      </template>
    </Table>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      columns1: [
        {
          title: '主项名称',
          key: 'parentItem',
          align: 'center',
          filters: [
            {
              label: '人的因素',
              value: 1
            },
            {
              label: '场地的因素',
              value: 2
            },
            {
              label: '事件的因素',
              value: 3
            }
          ],
          filterMultiple: false,
          filterMethod (value, row, label) {
            if (value === 1) {
              return row.parentItem === '人的因素'
            } else if (value === 2) {
              return row.parentItem === '场地的因素'
            } else if (value === 3) {
              return row.parentItem === '事件的因素'
            }
          }
        },
        {
          title: '子项名称',
          align: 'center',
          key: 'childItem'
        },
        {
          title: '选项及分值',
          align: 'center',
          key: 'OpitionAndFen'
        },
        {
          title: '选择',
          key: 'selectOpition',
          align: 'center',
          slot: 'action'
        }
      ],
      data1: [
        {
          parentItem: '人的因素',
          childItem: '有无暴乱记录',
          OpitionAndFen: 'New York No. 1 Lake Park'
        },
        {
          parentItem: '人的因素',
          childItem: '对抗程度',
          OpitionAndFen: 'London No. 1 Lake Park'
        },
        {
          parentItem: '场地的因素',
          childItem: '场地是否成熟',
          OpitionAndFen: 'Sydney No. 1 Lake Park'
        },
        {
          parentItem: '事件的因素',
          childItem: '是否有国际恐怖滋事',
          OpitionAndFen: 'Ottawa No. 2 Lake Park'
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
