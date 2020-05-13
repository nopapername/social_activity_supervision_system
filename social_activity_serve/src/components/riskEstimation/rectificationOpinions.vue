<template>
  <div class="rectificationOpinions">
    <!-- 整改意见管理 -->
    <h1 class="opinions-title" style="margin: 20px 0;">整改意见列表</h1>
    <Divider orientation="left" style="font-size: 12px; font-family: '楷体'; color: rgb(160, 160, 160);">风险预估管理</Divider>
    <div class="opinions-container">
      <a href="javascript:void(0)" style="position: relative; left: 47%; bottom: 5px;" @click="clickAddOpinions">新建</a>
      <Table :columns="columns1" :data="data1">
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" @click="clickUpdateOpinions(row, index)">修改</Button>
        </template>
      </Table>
    </div>
    <rectificationOpinionsAdd v-if="isAddOpinions" @changeIsAddOpinions="changeIsAddOpinions"></rectificationOpinionsAdd>
    <rectificationOpinionsUpdate v-if="isUpdateOpinions" @changeIsUpdateOpinions="changeIsUpdateOpinions" :selectUpdateAct="selectUpdateAct"></rectificationOpinionsUpdate>
  </div>
</template>

<script>
import rectificationOpinionsAdd from './rectificationOpinionsAdd'
import rectificationOpinionsUpdate from './rectificationOpinionsUpdate'
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
        },
        {
          title: '',
          slot: 'action',
          width: 70,
          align: 'right'
        }
      ],
      data1: [],
      isAddOpinions: false,
      isUpdateOpinions: false,
      selectUpdateAct: {}
    }
  },
  components: {
    rectificationOpinionsAdd,
    rectificationOpinionsUpdate
  },
  watch: {
    isAddOpinions (val) {
      if (val === false) {
        this.getRiskRectificationOpinions()
      }
    },
    isUpdateOpinions (val) {
      if (val === false) {
        this.getRiskRectificationOpinions()
      }
    }
  },
  methods: {
    clickAddOpinions () {
      this.isAddOpinions = true
    },
    clickUpdateOpinions (row, index) {
      this.isUpdateOpinions = true
      this.selectUpdateAct = row
    },
    changeIsAddOpinions (val) {
      this.isAddOpinions = val
    },
    changeIsUpdateOpinions (val) {
      this.isUpdateOpinions = val
    },
    getRiskRectificationOpinions () {
      const arr = []
      this.$axios.get('http://localhost:3000/api/riskEstimate/getRiskRectificationOpinions').then(res => {
        res.data.forEach((item) => {
          arr.push({
            eventId: item.activityId,
            eventName: item.activityName,
            eventPlace: item.activityPlace,
            schemeName: item.planName,
            rectificationOpinion: item.zhengGaiOpinion,
            opinionDetails: item.opinionDetail,
            status: item.zhuangTai,
            operating: item.caoZuo
          })
        })
        this.data1 = [...arr]
      })
    }
  },
  created () {
    this.getRiskRectificationOpinions()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
