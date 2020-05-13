<template>
  <div class="caseSituation">
    <!-- 发案情况 -->
    <div class="caseSituation-container">
      <div class="caseSituationHeader">
        <p style="font-size: 18px; color: rgb(255, 94, 0); font-family: '楷体'; font-weight: bold;">活动案发通报</p>
      </div>
      <div class="caseSituation-content">
        <Form :label-width="80" ref="form666">
          <FormItem v-for="(item, index) in caseSituation" :key="index" :label="'Item ' + index">
            <Row style="display: flex; justify-content: space-between;">
              <Col span="5">
              名称
              <Input type="text" v-model="item.name" placeholder="Enter something..."></Input>
              </Col>
              <Col span="5">
              描述
              <Input type="text" v-model="item.descripte" placeholder="Enter something..."></Input>
              </Col>
              <Col span="5">
              通报人
              <Input type="text" v-model="item.tongbaopeople" placeholder="Enter something..."></Input>
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
  name: 'caseSituation',
  data () {
    return {
      caseSituation: [
        {
          name: '',
          descripte: '',
          tongbaopeople: '',
          date: ''
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['thisTab', 'activity'])
  },
  watch: {
    thisTab (val) {
      if (val !== 5) {
        this.$store.commit('setCaseSituation', this.caseSituation)
      }
    }
  },
  methods: {
    resetFormData () {
      this.$refs.form666.resetFields()
    },
    handleAdd () {
      this.caseSituation.push({
        name: '',
        descripte: '',
        tongbaopeople: '',
        date: ''
      })
    },
    handleRemove (index) {
      this.caseSituation.splice(index, 1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.caseSituation {
  width: 100%;
  display: flex;
  justify-content: center;
}
.caseSituation-container {
  width: 80%;
  border: 1px solid rgb(0, 217, 255);
  border-top: 2px solid rgb(0, 153, 255);
}
.caseSituationHeader {
  display: flex;
  justify-content: space-between;
  padding: 8px 20px;
  background-color: rgba(0, 153, 255, 0.5);
}
.caseSituation-content {
  padding: 20px;
}
</style>
