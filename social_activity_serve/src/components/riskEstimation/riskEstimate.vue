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
                  <Select v-model="formItem.select">
                    <Option value="beijing">New York</Option>
                    <Option value="shanghai">London</Option>
                    <Option value="shenzhen">Sydney</Option>
                  </Select>
                </Col>
              </Row>
            </Col>
            <Col span="8">
              <Row>
                <Col span="6">子项目名称</Col>
                <Col span="15">
                <Select v-model="formItem.select">
                  <Option value="beijing">New York</Option>
                  <Option value="shanghai">London</Option>
                  <Option value="shenzhen">Sydney</Option>
                </Select>
                </Col>
              </Row>
            </Col>
            <Col span="4">
              <Row>
                <Col span="10">
                  <Button type="primary">查询</Button>
                </Col>
                <Col span="10">
                  <Button type="primary">清空</Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </FormItem>
        <FormItem style="margin-top: 30px;margin-bottom: 5px;">
          <Row>
            <Col span="2" offset="20">
              <Button type="text">新增</Button>
            </Col>
            <Col span="1">
              <Button type="text">编辑</Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem style="padding: 0 10px">
          <Table border :columns="columns6" :data="data5" max-height="300"></Table>
        </FormItem>
      </Form>
      <div class="add-container">
        <Divider style="font-size:10px; color: #c1c2c4;">新增风险预估项目</Divider>
        <Form ref="formAddOption">
          <FormItem>
            <Row type="flex" justify="center">
              <Col>
                <Row>
                  <Col span="8">主项目名称</Col>
                  <Col span="16"><Input placeholder="主项目名称" /></Col>
                </Row>
              </Col>
              <Col offset="2">
                <Row>
                  <Col span="8">子项目名称</Col>
                  <Col span="16"><Input placeholder="子项目名称" /></Col>
                </Row>
              </Col>
            </Row>
          </FormItem>
          <Divider dashed/>
          <FormItem
            v-for="(itemsOptionAndFen, index) in formAddOption.itemsOptionAndFen"
            :key="index"
          >
            <Row type="flex" justify="center">
              <Col span="6">
                <Row type="flex" justify="end">
                  <Col span="7">项分值名称</Col>
                  <Col span="12"><Input placeholder="选项名称" /></Col>
                </Row>
              </Col>
              <Col span="5">
                <Row>
                  <Col span="6" offset="1">项分值</Col>
                  <Col span="2"><InputNumber :editable="false" :min="0"></InputNumber></Col>
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
                <Button type="primary">保存</Button>
              </Col>
              <Col span="2">
                <Button>取消</Button>
              </Col>
            </Row>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'riskEstimate',
  data () {
    return {
      // 表格部分
      formItem: {
        select: ''
      },
      columns6: [
        {
          title: '主项名称',
          key: 'parentItem',
          filters: [
            {
              label: '人的因素',
              value: 1
            },
            {
              label: '场地的因素',
              value: 2
            },
            {
              label: '事件的因素',
              value: 3
            }
          ],
          filterMultiple: false,
          filterMethod (value, row, label) {
            if (value === 1) {
              return row.parentItem === '人的因素'
            } else if (value === 2) {
              return row.parentItem === '场地的因素'
            } else if (value === 3) {
              return row.parentItem === '事件的因素'
            }
          }
        },
        {
          title: '子项名称',
          key: 'childItem'
        },
        {
          title: '选项及分值',
          key: 'OpitionAndFen'
        }
      ],
      data5: [
        {
          parentItem: '人的因素',
          childItem: '有无暴乱记录',
          OpitionAndFen: 'New York No. 1 Lake Park'
        },
        {
          parentItem: '人的因素',
          childItem: '对抗程度',
          OpitionAndFen: 'London No. 1 Lake Park'
        },
        {
          parentItem: '场地的因素',
          childItem: '场地是否成熟',
          OpitionAndFen: 'Sydney No. 1 Lake Park'
        },
        {
          parentItem: '事件的因素',
          childItem: '是否有国际恐怖滋事',
          OpitionAndFen: 'Ottawa No. 2 Lake Park'
        }
      ],
      // 添加选项区域
      formAddOption: {
        itemsOptionAndFen: [
          {
            value: '',
            index: 1,
            status: 1
          }
        ]
      }
    }
  },
  methods: {
    itemsOptionAndFenAdd () {
      var index = this.formAddOption.itemsOptionAndFen.length + 1
      this.formAddOption.itemsOptionAndFen.push({
        value: '',
        index: index,
        status: 1
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.add-container {
  margin-top: 50px;
}
</style>
