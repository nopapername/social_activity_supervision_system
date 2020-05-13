<template>
  <div class="riskEstimatesAnalysis">
    <!-- 风险预估填报 -->
    <div class="riskEstimate-container">
      <div class="riskEstimateHeader">
        <p style="font-size: 18px; color: rgb(255, 94, 0); font-family: '楷体'; font-weight: bold;">风险预估分析记录</p>
      </div>
      <div class="riskEstimate-content">
        <Form :label-width="80" ref="form555">
            <FormItem v-for="(item, index) in riskEstimatesAnalysis" :key="index"
              :label="'Item ' + index">
              <Row style="display: flex; justify-content: space-between;">
                <Col span="5">
                  报告名称
                  <Input type="text" v-model="item.baogaoName" placeholder="Enter something..."></Input>
                </Col>
                <Col span="5">
                  详情
                  <Input type="text" v-model="item.detail" placeholder="Enter something..."></Input>
                </Col>
                <Col span="5">
                  评估人
                  <Input type="text" v-model="item.pingguPeople" placeholder="Enter something..."></Input>
                </Col>
                <Col span="5">
                  时间
                  <Input type="text" v-model="item.date" placeholder="Enter something..."></Input>
                </Col>
                <Col span="2">
                  是否删除
                  <Button @click="handleRemove(index)">Delete</Button>
                </Col>
              </Row>
            </FormItem>
            <FormItem>
              <Row>
                <Col span="12">
                <Button type="dashed" long @click="handleAdd" icon="md-add">Add item</Button>
                </Col>
              </Row>
            </FormItem>
          </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'riskEstimatesAnalysis',
  data () {
    return {
      riskEstimatesAnalysis: [
        {
          baogaoName: '',
          detail: '',
          pingguPeople: '',
          date: ''
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['thisTab'])
  },
  watch: {
    thisTab (val) {
      if (val !== 4) {
        this.$store.commit('setRiskEstimatesAnalysis', this.riskEstimatesAnalysis)
      }
    }
  },
  methods: {
    resetFormData () {
      this.$refs.form555.resetFields()
    },
    handleAdd () {
      this.riskEstimatesAnalysis.push({
        baogaoName: '',
        detail: '',
        pingguPeople: '',
        date: ''
      })
    },
    handleRemove (index) {
      this.riskEstimatesAnalysis.splice(index, 1)
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
  background-color: rgba(0, 153, 255, 0.5);
}
.riskEstimate-content {
  padding: 20px;
}
</style>
