<template>
  <div class="workLog">
    <!-- 日志管理 -->
    <div class="workLog-container">
      <div class="workLogHeader">
        <p style="font-size: 18px; color: rgb(255, 94, 0); font-family: '楷体'; font-weight: bold;">活动日志</p>
      </div>
      <div class="workLog-content">
        <Form :label-width="80">
          <FormItem v-for="(item, index) in workLog" :key="index" :label="'Item ' + index">
            <Row style="display: flex; justify-content: space-between;">
              <Col span="5">
              名称
              <Input type="text" v-model="item.name" placeholder="Enter something..."></Input>
              </Col>
              <Col span="5">
              详情
              <Input type="text" v-model="item.detail" placeholder="Enter something..."></Input>
              </Col>
              <Col span="5">
              编报人
              <Input type="text" v-model="item.bianbaopeople" placeholder="Enter something..."></Input>
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
  name: 'workLog',
  data () {
    return {
      workLog: [
        {
          name: '',
          detail: '',
          bianbaopeople: '',
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
      if (val !== 7) {
        this.$store.commit('setWorkLog', this.workLog)
      }
    }
  },
  methods: {
    handleAdd () {
      this.workLog.push({
        name: '',
        detail: '',
        bianbaopeople: '',
        date: ''
      })
    },
    handleRemove (index) {
      this.workLog.splice(index, 1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.workLog {
  width: 100%;
  display: flex;
  justify-content: center;
}
.workLog-container {
  width: 80%;
  border: 1px solid rgb(0, 217, 255);
  border-top: 2px solid rgb(0, 153, 255);
}
.workLogHeader {
  display: flex;
  justify-content: space-between;
  padding: 8px 20px;
  background-color: rgba(0, 225, 255, 0.5);
}
.workLog-content {
  padding: 20px;
}
</style>
