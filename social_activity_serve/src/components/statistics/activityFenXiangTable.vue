<template>
  <div>
    <Row class="expand-row" v-for="(item, index) in activityRiskData.activitySelectRisk" :key="index">
      <Col span="8">
      <span class="expand-key">主项：</span>
      <span class="expand-value">{{ item.factor }}</span>
      </Col>
      <Col span="8">
      <span class="expand-key">子项：</span>
      <span class="expand-value">{{ item.name }}</span>
      </Col>
      <Col span="8">
      <span class="expand-value">{{ item.selectFen }}分</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="8" offset="16">
        <span class="expand-key">综合总分:</span>
        <span class="expand-value">{{ totalScore }}</span>
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
      activityRiskData: {},
      totalScore: 0
    }
  },
  methods: {
    getActivityRisk () {
      this.activityRiskData = this.row
      this.totalScore = this.row.score
    }
  },
  created () {
    this.getActivityRisk()
  }
}
</script>

<style scoped>
  .expand-row {
    margin-bottom: 16px;
  }
</style>
