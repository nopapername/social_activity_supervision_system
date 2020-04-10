<template>
  <div class="riskEstimatesAnalysis">
    <!-- 风险预估填报 -->
    <div class="riskEstimate-container">
      <div class="riskEstimateHeader">
        <p style="font-size: 18px; color: rgb(255, 94, 0); font-family: '楷体'; font-weight: bold;">风险预估分析记录</p>
      </div>
      <div class="riskEstimate-content">
        <Table :columns="columns1" :data="data1"></Table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'riskEstimatesAnalysis',
  data () {
    return {
      columns1: [
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: 'Age',
          key: 'age'
        },
        {
          title: 'Address',
          key: 'address'
        }
      ],
      data1: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.riskEstimatesAnalysis {
  width: 100%;
  display: flex;
  justify-content: center;
}
.riskEstimate-container {
  width: 80%;
  border: 1px solid rgb(0, 217, 255);
  border-top: 2px solid rgb(0, 153, 255);
}
.riskEstimateHeader {
  display: flex;
  justify-content: space-between;
  padding: 8px 20px;
  background-color: rgba(0, 225, 255, 0.5);
}
.riskEstimate-content {
  padding: 20px;
}
</style>
