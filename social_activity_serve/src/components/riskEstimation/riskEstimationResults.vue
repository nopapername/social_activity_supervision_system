<template>
  <div class="riskEstimationResults">
    <!-- 风险预估结果管理 -->
    <div class="risk-container">
      <h1 style="margin: 20px;">活动列表</h1>
      <Divider orientation="left" style="font-size: 12px; font-family: '楷体'; color: rgb(160, 160, 160);">风险预估管理</Divider>
      <displayActivityRiskRes v-if="activityRisk.length === 0"></displayActivityRiskRes>
      <div v-else style="width: 100%;">
        <div style="display: flex; justify-content: space-between; flex-wrap: wrap; width: 100%;">
          <Card :bordered="false" v-for="(item, index) in activityRisk" :key="index"
            @click.native="clickCurActivity(index)"
            style="width: 45%; cursor: pointer; margin-top: 10px; background-color: rgb(255, 247, 236);">
            <p>{{ item.activityName }}</p>
          </Card>
        </div>
        <div class="selectActivityRisk" v-show='isActivityRisk'>
          <h1 class="riskResult-title" style="margin: 10px 0;">{{ selectActivityRisk.activityName }} 风险评估</h1>
          <Table border :columns="columns1" :data="data1">
            <template slot="action" slot-scope="{ row, index }">
              <Select v-model="row.selectFen" size="small" style="width:100px;" @on-change="selectFen(row, index)"
                :transfer="true">
                <Option v-for="(i, index) in row.OpitionAndFen" :value="index + ':' + i" :key="index">
                  {{ index + ':' + i }}
                </Option>
              </Select>
            </template>
          </Table>
          <Button type="primary" style="margin: 20px 0;" @click="submitActivityRisk">提交</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import displayActivityRiskRes from './displayActivityRiskRes'
import loadingSign from '@/plugins/loadingSign'
export default {
  name: 'riskEstimationResults',
  data () {
    return {
      columns1: [
        {
          title: '主项名称',
          key: 'parentItem',
          align: 'center',
          filters: [],
          filterMultiple: false,
          filterMethod (value, row, label) {
            if (value) {
              return row.parentItem === value
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
      data1: [],
      isActivityRisk: false,
      selectActivityRisk: {},
      curIndex: 0
    }
  },
  methods: {
    clickCurActivity (index) {
      const that = this
      this.curIndex = index
      this.isActivityRisk = false
      this.selectActivityRisk = this.activityRisk[index]
      const activityR = []
      const dataLin = []
      this.selectActivityRisk.activitySelectRisk.forEach((item) => {
        if (activityR.every((item1) => { return item1.label !== item.factor })) {
          activityR.push({
            label: item.factor,
            value: item.factor
          })
        }
        dataLin.push({
          parentItem: item.factor,
          childItem: item.name,
          OpitionAndFen: item.opitionsAndFen,
          selectFen: item.selectFen
        })
      })
      that.columns1[0].filters = [...activityR]
      that.data1 = [...dataLin]
      setTimeout(() => {
        this.isActivityRisk = true
      }, 0)
    },
    selectFen (item, index) {
      this.data1[index].selectFen = item.selectFen
    },
    async submitActivityRisk () {
      loadingSign.start('提交修改中...')
      const obj = {
        index: this.curIndex,
        data: this.data1
      }
      await this.$store.dispatch('setActivityRiskFen', obj)
      loadingSign.end()
      this.$Modal.success({
        title: '成功',
        content: '提交修改 保存成功！',
        onOk: () => {
          this.$store.commit('clearActivityRisk')
        }
      })
    }
  },
  computed: {
    ...mapGetters(['activities', 'activityRisk'])
  },
  components: {
    displayActivityRiskRes
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.selectActivityRisk {
  animation: actTableJoin .5s ease-in;
}
@keyframes actTableJoin {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
