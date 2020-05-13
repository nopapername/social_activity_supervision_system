<template>
  <div>
    <Row class="expand-row">
      <Col span="8">
      <span class="expand-key">活动名称: </span>
      <span class="expand-value">{{ activityData.activityName }}</span>
      </Col>
      <Col span="8">
      <span class="expand-key">组织名称: </span>
      <span class="expand-value">{{ activityData.zuzhiName }}</span>
      </Col>
      <Col span="8">
      <span class="expand-key">组织地点: </span>
      <span class="expand-value">{{ activityData.place }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="8">
      <span class="expand-key">类型: </span>
      <span class="expand-value">{{ activityData.xingzhi }}</span>
      </Col>
      <Col span="8">
      <span class="expand-key">活动规模: </span>
      <span class="expand-value">{{ activityData.guimo }}</span>
      </Col>
      <Col span="8">
      <span class="expand-key">参与人数: </span>
      <span class="expand-value">{{ activityData.canyuPeopleNums }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="8">
      <span class="expand-key">责任民警: </span>
      <span class="expand-value">{{ activityData.zerenMingJing }}</span>
      </Col>
      <Col span="8">
      <span class="expand-key">经办人: </span>
      <span class="expand-value">{{ activityData.jingbanren }}</span>
      </Col>
      <Col span="8">
      <span class="expand-key">负责人: </span>
      <span class="expand-value">{{ activityData.jingbanren }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="8">
      <span class="expand-key">活动开始日期: </span>
      <span class="expand-value">{{ activityData.jubanTimeStart }}</span>
      </Col>
      <Col span="8" offset="8">
      <span class="expand-key">活动结束日期: </span>
      <span class="expand-value">{{ activityData.jubanTimeEnd }}</span>
      </Col>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="8">
      <span class="expand-key">勤务开始日期: </span>
      <span class="expand-value">{{ activityData.qinwuTimeStart }}</span>
      </Col>
      <Col span="8" offset="8">
      <span class="expand-key">勤务结束日期: </span>
      <span class="expand-value">{{ activityData.qinwuTimeEnd }}</span>
      </Col>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  props: {
    row: Object
  },
  data () {
    return {
      activityData: {}
    }
  },
  methods: {
    getActivityInfo () {
      this.$axios
        .post('http://localhost:3000/api/activity/getBasicInformation', { activityId: this.row.activityId })
        .then(res => {
          this.activityData = res.data
        }).catch(e => {
          console.log('信息获取失败：', e)
        })
    }
  },
  created () {
    this.getActivityInfo()
  }
}
</script>

<style scoped>
  .expand-row {
    margin-bottom: 16px;
  }
</style>
