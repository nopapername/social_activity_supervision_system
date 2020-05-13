<template>
  <div class="rectificationOpinionsAdd">
    <!-- 整改意见管理 -->
    <div class="addOpinions-container">
        <Icon type="md-close" size="25" style="position: relative; left: 380px; top: 10px; cursor: pointer;" @click="closeThisModel" />
        <h1>新建整改意见</h1>
        <div style="padding: 20px 30px;">
          <Form :model="formAddOpinions" ref="formAddOpinions" label-position="right" :label-width="75" :rules="ruleValidate" label-colon>
            <Row>
              <Col span="11">
                <FormItem label="活动名称" prop="activityName">
                  <Select v-model="formAddOpinions.activityName" @on-change="onselectActivity">
                    <Option v-for="item in activitiesList" :value="item.value" :key="item.value">{{ item.label }}
                    </Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="11" offset="2">
                <FormItem label="活动地点" prop="activityPlace">
                  <Input v-model="formAddOpinions.activityPlace" placeholder="请输入活动地点..."></Input>
                </FormItem>
              </Col>
            </Row>
            <FormItem label="方案名称" prop="planName">
              <Input v-model="formAddOpinions.planName" placeholder="请输入方案名称..."></Input>
            </FormItem>
            <FormItem label="整改意见" prop="zhengGaiOpinion">
              <Input v-model="formAddOpinions.zhengGaiOpinion" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入整改意见..."></Input>
            </FormItem>
            <FormItem label="意见详情" prop="opinionDetail">
              <Input v-model="formAddOpinions.opinionDetail" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入意见详情..."></Input>
            </FormItem>
            <Row>
              <Col span="11">
                <FormItem label="状态">
                  <Select v-model="formAddOpinions.zhuangTai" disabled>
                    <Option v-for="item in zhuangTaiList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="11" offset="2">
                <FormItem label="操作">
                  <Select v-model="formAddOpinions.caoZuo" disabled>
                    <Option v-for="item in caoZuoList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <FormItem>
              <Button type="primary" @click="handleSubmit('formAddOpinions')">提交</Button>
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
  name: 'rectificationOpinionsAdd',
  data () {
    return {
      formAddOpinions: {
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
    closeThisModel () {
      this.$emit('changeIsAddOpinions', false)
    },
    handleSubmit (name) {
      loadingSign.start('整改意见提交中')
      const that = this
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$axios.post('http://localhost:3000/api/riskEstimate/addRiskRectificationOpinions', this.formAddOpinions).then((res) => {
            loadingSign.end()
            this.submitOperating(this.adminInfo.email, this.adminInfo.role, '新建整改意见')
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
      this.$refs.formAddOpinions.resetFields()
    },
    onselectActivity (value) {
      const that = this
      this.activitiesList.forEach((item) => {
        if (item.value === value) {
          that.formAddOpinions.activityId = item.id
        }
      })
    }
  },
  computed: {
    ...mapGetters(['activities', 'adminInfo']),
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.rectificationOpinionsAdd {
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
.addOpinions-container {
    width: 800px;
    background-color: rgb(255, 255, 255);
}
</style>
