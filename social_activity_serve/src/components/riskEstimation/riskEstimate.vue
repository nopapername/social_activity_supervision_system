<template>
  <div class="riskEstimate">
    <!-- 风险预估项管理 -->
    <div class="inquire-container">
      <Form>
        <FormItem>
          <Row type="flex" justify="center">
            <Col span="8">
              <Row>
                <Col span="6">主项目名称</Col>
                <Col span="15">
                  <Select v-model="formItem.selectParent">
                    <Option v-for="(item,index) in queryItem.pItem" :value="item" :key="index">{{ item }}</Option>
                  </Select>
                </Col>
              </Row>
            </Col>
            <Col span="8">
              <Row>
                <Col span="6">子项目名称</Col>
                <Col span="15">
                <Select v-model="formItem.selectChild">
                  <Option v-for="(item,index) in queryItem.cItem" :value="item" :key="index">{{ item }}</Option>
                </Select>
                </Col>
              </Row>
            </Col>
            <Col span="4">
              <Row>
                <Col span="10">
                  <Button type="primary" @click="queryOneData()">查询</Button>
                </Col>
                <Col span="10">
                  <Button type="primary" @click="qingkong()">清空</Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <div style="margin-top: 20px;">查询结果：选项及分值{{returnQuery? returnQuery: '暂无' }}</div>
        </FormItem>
        <FormItem style="margin-top: 30px;margin-bottom: 5px;">
          <Row>
            <Col span="2" offset="20">
              <Button :type="ifAdd? 'primary' : 'text'" @click="ifAddBtn()">新增</Button>
            </Col>
            <Col span="1">
              <Button :type="this.columns6.length === 4 ? 'primary' : 'text'" @click="bianji()">删除</Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem style="padding: 0 10px">
          <Table border :columns="columns6" :data="data5" max-height="300" @on-selection-change="selectOne">
          </Table>
          <Button type="primary" style="float: right; margin: 30px 30px;" v-show="this.columns6.length === 4 ? true : false" @click="deleteSome()">确认删除</Button>
        </FormItem>
      </Form>
      <transition name="bounce">
        <div class="add-container" v-show="ifAdd">
          <Divider style="font-size:10px; color: #c1c2c4;">新增风险预估项目</Divider>
          <Form ref="formAddOption" :model="itemWrite">
            <FormItem>
              <Row type="flex" justify="center">
                <Col>
                <Row>
                  <Col span="8">主项目名称</Col>
                  <Col span="16">
                  <FormItem prop="parentItem" :rules="{ required: true, message: '请输入主项目名称', trigger: 'blur' }">
                    <Input placeholder="主项目名称" v-model="itemWrite.parentItem" />
                  </FormItem>
                  </Col>
                </Row>
                </Col>
                <Col offset="2">
                <Row>
                  <Col span="8">子项目名称</Col>
                  <Col span="16">
                  <FormItem prop="childItem" :rules="{ required: true, message: '请输入子项目名称', trigger: 'blur' }">
                    <Input placeholder="子项目名称" v-model="itemWrite.childItem" />
                  </FormItem>
                  </Col>
                </Row>
                </Col>
              </Row>
            </FormItem>
            <Divider dashed />
            <FormItem v-for="(itemsOptionAndFen, index) in itemWrite.opitionsAndFen" :key="index">
              <Row type="flex" justify="center">
                <Col span="6">
                <Row type="flex" justify="end">
                  <Col span="7">项分值名称</Col>
                  <Col span="12">
                  <FormItem :prop="'opitionsAndFen[' + index + '].value'"
                    :rules="{ required: true, message: '请输入内容', trigger: 'blur' }">
                    <Input placeholder="选项名称" v-model="itemsOptionAndFen.value" />
                  </FormItem>
                  </Col>
                </Row>
                </Col>
                <Col span="5">
                <Row>
                  <Col span="6" offset="1">项分值</Col>
                  <Col span="2">
                  <InputNumber :editable="false" :min="0" v-model="itemsOptionAndFen.fen"></InputNumber>
                  </Col>
                </Row>
                </Col>
              </Row>
            </FormItem>
            <FormItem>
              <Row type="flex" justify="center">
                <Col span="4">
                <Button type="dashed" long @click="itemsOptionAndFenAdd" icon="md-add">新增分值项</Button>
                </Col>
              </Row>
            </FormItem>
            <FormItem style="margin: 50px 0;">
              <Row type="flex" justify="center">
                <Col span="2">
                <Button type="primary" @click="addRiskEstimates('formAddOption')">添加</Button>
                </Col>
                <Col span="2">
                <Button>取消</Button>
                </Col>
              </Row>
            </FormItem>
          </Form>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'riskEstimate',
  data () {
    return {
      queryItem: {
        pItem: [],
        cItem: []
      },
      returnQuery: '',
      formItem: {
        selectParent: '',
        selectChild: ''
      },
      ifAdd: false,
      itemWrite: {
        parentItem: '',
        childItem: '',
        opitionsAndFen: [
          {
            value: '',
            index: 1,
            fen: 1
          }
        ]
      },
      columns6: [
        {
          title: '主项名称',
          key: 'parentItem',
          filters: [
            {
              label: '人的因素',
              value: '人的因素'
            }
          ],
          filterMultiple: false,
          filterMethod (value, row) {
            if (value) {
              return row.parentItem === value
            }
          }
        },
        {
          title: '子项名称',
          key: 'childItem'
        },
        {
          title: '选项及分值',
          key: 'opitionsAndFen'
        }
      ],
      data5: [],
      deleteData: []
    }
  },
  created () {
    this.getRiskEstimates()
  },
  methods: {
    itemsOptionAndFenAdd () {
      var index = this.itemWrite.opitionsAndFen.length + 1
      this.itemWrite.opitionsAndFen.push({
        value: '',
        index: index,
        fen: 1
      })
    },
    getRiskEstimates () {
      var that = this
      this.axios.get('http://localhost:3000/api/riskEstimate/getRiskEstimate').then((res) => {
        that.data5 = res.data
        that.data5.forEach((item) => {
          if (that.columns6[0].filters.every((item1) => { return item1.label !== item.parentItem })) {
            that.columns6[0].filters.push({
              label: item.parentItem,
              value: item.parentItem
            })
          }
          if (that.queryItem.pItem.indexOf(item.parentItem) === -1) {
            that.queryItem.pItem.push(item.parentItem)
          }
          if (that.queryItem.cItem.indexOf(item.childItem) === -1) {
            that.queryItem.cItem.push(item.childItem)
          }
        })
      }).catch((err) => {
        that.$Message.error('数据获取失败' + err)
      })
    },
    addRiskEstimates (name) {
      var that = this
      this.$refs[name].validate((valid) => {
        if (valid) {
          const opitionsAndFens = {}
          that.itemWrite.opitionsAndFen.forEach((item) => {
            opitionsAndFens[item.value] = item.fen
          })
          const addRiskEstimate = {
            parentItem: that.itemWrite.parentItem,
            childItem: that.itemWrite.childItem,
            opitionsAndFen: opitionsAndFens
          }
          that.axios.post('http://localhost:3000/api/riskEstimate/saveRiskEstimate', addRiskEstimate).then((res) => {
            that.$Message.success('添加成功')
            that.getRiskEstimates()
            that.itemWrite = {
              parentItem: '',
              childItem: '',
              opitionsAndFen: [
                {
                  value: '',
                  index: 1,
                  fen: 1
                }
              ]
            }
          }).catch((err) => {
            that.$Message.error('数据获取失败' + err)
          })
        }
      })
    },
    bianji () {
      if (this.columns6.length === 3) {
        this.columns6.push({
          type: 'selection',
          width: 100,
          align: 'center'
        })
      } else if (this.columns6.length === 4) {
        this.columns6.pop()
      }
    },
    ifAddBtn () {
      this.ifAdd = !this.ifAdd
      this.itemWrite = {
        parentItem: '',
        childItem: '',
        opitionsAndFen: [
          {
            value: '',
            index: 1,
            fen: 1
          }
        ]
      }
    },
    selectOne (selection) {
      this.deleteData = selection
    },
    deleteSome () {
      var that = this
      if (Object.keys(this.deleteData).length !== 0) {
        this.$Modal.confirm({
          title: '删除',
          content: '确认删除选中数据?',
          onOk: () => {
            that.axios.post('http://localhost:3000/api/riskEstimate/deleteRiskEstimate', that.deleteData)
              .then((res) => {
                this.$Message.success('删除成功')
                that.getRiskEstimates()
              }).catch((err) => {
                console.log(err)
              })
          }
        })
      } else {
        this.$Modal.info({
          title: '错误',
          content: '请选择要删除的数据'
        })
      }
    },
    queryOneData () {
      for (let i = 0; i < this.data5.length; i++) {
        if (this.formItem.selectParent === this.data5[i].parentItem && this.formItem.selectChild ===
        this.data5[i].childItem) {
          this.returnQuery = this.data5[i].opitionsAndFen
          break
        } else {
          this.returnQuery = ''
        }
      }
    },
    qingkong () {
      this.returnQuery = ''
      this.formItem.selectChild = ''
      this.formItem.selectParent = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
.add-container {
  margin-top: 50px;
}
</style>
