<template>
  <div class="rectificationOpinionsUpdate">
    <!-- 整改意见管理 -->
    <div class="updateOpinions-container">
        <Icon type="md-close" size="25" style="position: relative; left: 380px; top: 10px; cursor: pointer;" @click="closeThisModel" />
        <h1>修改意见</h1>
        <div style="padding: 20px 30px;">
          <Form :model="formupdateOpinions" ref="formupdateOpinions" label-position="right" :label-width="75" :rules="ruleValidate" label-colon>
            <Row>
              <Col span="11">
                <FormItem label="活动名称" prop="activityName">
                  <Select v-model="formupdateOpinions.activityName" @on-change="onselectActivity" disabled>
                    <Option v-for="item in activitiesList" :value="item.value" :key="item.value">{{ item.label }}
                    </Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="11" offset="2">
                <FormItem label="活动地点" prop="activityPlace">
                  <Input v-model="formupdateOpinions.activityPlace" placeholder="请输入活动地点..."></Input>
                </FormItem>
              </Col>
            </Row>
            <FormItem label="方案名称" prop="planName">
              <Input v-model="formupdateOpinions.planName" placeholder="请输入方案名称..."></Input>
            </FormItem>
            <FormItem label="整改意见" prop="zhengGaiOpinion">
              <Input v-model="formupdateOpinions.zhengGaiOpinion" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入整改意见..."></Input>
            </FormItem>
            <FormItem label="意见详情" prop="opinionDetail">
              <Input v-model="formupdateOpinions.opinionDetail" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入意见详情..."></Input>
            </FormItem>
            <Row>
              <Col span="11">
                <FormItem label="状态">
                  <Select v-model="formupdateOpinions.zhuangTai" disabled>
                    <Option v-for="item in zhuangTaiList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="11" offset="2">
                <FormItem label="操作">
                  <Select v-model="formupdateOpinions.caoZuo" @on-change="onselectCaoZuo">
                    <Option v-for="item in caoZuoList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <FormItem>
              <Button type="primary" @click="handleSubmit('formupdateOpinions')">提交</Button>
            </FormItem>
          </Form>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import loadingSign from '@/plugins/loadingSign'
export default {
  name: 'rectificationOpinionsUpdate',
  props: ['selectUpdateAct'],
  data () {
    return {
      formupdateOpinions: {
        activityId: '',
        activityName: '',
        activityPlace: '',
        planName: '',
        zhengGaiOpinion: '',
        opinionDetail: '',
        zhuangTai: '未处理',
        caoZuo: '未操作'
      },
      zhuangTaiList: [
        {
          value: '已处理',
          label: '已处理'
        },
        {
          value: '未处理',
          label: '未处理'
        }
      ],
      caoZuoList: [
        {
          value: '未操作',
          label: '未操作'
        },
        {
          value: '通过',
          label: '通过'
        },
        {
          value: '不通过',
          label: '不通过'
        }
      ],
      ruleValidate: {
        activityName: [
          { required: true, message: '请选择活动', trigger: 'blur' }
        ],
        activityPlace: [
          { required: true, message: '请输入活动地点', trigger: 'blur' }
        ],
        planName: [
          { required: true, message: '请输入预案名称', trigger: 'blur' }
        ],
        zhengGaiOpinion: [
          { required: true, message: '请输入整改意见', trigger: 'blur' }
        ],
        opinionDetail: [
          { required: true, message: '请输入意见详情', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onselectCaoZuo () {
      if (this.formupdateOpinions.caoZuo !== '未操作') {
        this.formupdateOpinions.zhuangTai = '已处理'
      } else {
        this.formupdateOpinions.zhuangTai = '未处理'
      }
    },
    closeThisModel () {
      this.$emit('changeIsUpdateOpinions', false)
    },
    handleSubmit (name) {
      loadingSign.start('整改意见修改中')
      const that = this
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$axios.post('http://localhost:3000/api/riskEstimate/updateRiskRectificationOpinions', this.formupdateOpinions).then((res) => {
            loadingSign.end()
            this.$Message.success({
              content: res.data.result
            })
            setTimeout(() => {
              that.handleReset()
              that.closeThisModel()
            }, 100)
          })
        }
      })
    },
    handleReset () {
      this.$refs.formupdateOpinions.resetFields()
    },
    onselectActivity (value) {
      const that = this
      this.activitiesList.forEach((item) => {
        if (item.value === value) {
          that.formupdateOpinions.activityId = item.id
        }
      })
    }
  },
  computed: {
    ...mapGetters(['activities']),
    activitiesList () {
      const arr = []
      this.activities.forEach((item) => {
        arr.push({
          value: item.activityName,
          label: item.activityName,
          id: item.activityId
        })
      })
      return arr
    }
  },
  created () {
    this.formupdateOpinions.activityId = this.selectUpdateAct.eventId
    this.formupdateOpinions.activityName = this.selectUpdateAct.eventName
    this.formupdateOpinions.activityPlace = this.selectUpdateAct.eventPlace
    this.formupdateOpinions.planName = this.selectUpdateAct.schemeName
    this.formupdateOpinions.zhengGaiOpinion = this.selectUpdateAct.rectificationOpinion
    this.formupdateOpinions.opinionDetail = this.selectUpdateAct.opinionDetails
    this.formupdateOpinions.zhuangTai = this.selectUpdateAct.status
    this.formupdateOpinions.caoZuo = this.selectUpdateAct.operating
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.rectificationOpinionsUpdate {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: fixed;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}
.updateOpinions-container {
    width: 800px;
    background-color: rgb(255, 255, 255);
}
</style>
