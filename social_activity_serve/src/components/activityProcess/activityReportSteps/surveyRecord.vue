<template>
  <div class="surveyRecord">
    <!-- 踏勘记录 -->
    <div class="surveyRecord-container">
      <div class="surveyRecordHeader">
        <p style="font-size: 18px; color: rgb(255, 94, 0); font-family: '楷体'; font-weight: bold;">活动现场踏勘</p>
      </div>
      <div class="surveyRecord-content">
        <div class="file-content">
          <div class="picture">
            <a href="javascript:void(0)">2016年3月1日踏勘现场照片</a>
            <div class="pic-options">
              <span>
                <Icon type="ios-alert"></Icon>浏览
              </span>
              <span>
                <Icon type="ios-cloud-download"></Icon>下载
              </span>
              <span>
                <Icon type="md-pricetags"></Icon>编辑
              </span>
              <span>
                <Icon type="md-trash"></Icon>删除
              </span>
            </div>
          </div>
          <Divider style="margin: 20px 0;" />
          <Table :columns="columns1" :data="data1"></Table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'surveyRecord',
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
.surveyRecord {
  width: 100%;
  display: flex;
  justify-content: center;
}
.surveyRecord-container {
  width: 80%;
  border: 1px solid rgb(0, 217, 255);
  border-top: 2px solid rgb(0, 153, 255);
}
.surveyRecordHeader {
  display: flex;
  justify-content: space-between;
  padding: 8px 20px;
  background-color: rgba(0, 225, 255, 0.5);
}
.surveyRecord-content {
  padding: 20px 0;
}
.file-content {
  padding: 0 20px;
}
.picture {
  display: flex;
  justify-content: space-around;
}
</style>
