<template>
  <div class="securityIncidentManagement">
    <!-- 治安事件管理 -->
    <h1>治安事件管理</h1>
    <Divider orientation="left" style="font-size: 12px; font-family: '楷体'; color: rgb(160, 160, 160);">综合数据管理</Divider>
    <div style="width: 100%;">
      <h3 style="color: rgb(63, 63, 63); font-family: '楷体'; font-size: 16px;">各治安事件及所包含的人员库</h3>
      <div style="width: 100%; display: flex; justify-content: space-between; flex-wrap: nowrap;">
        <Card v-for="(item, index) in zhiAnShiJian" :key="index"
          style="width: 130px; margin-top: 10px;">
          <p slot="title" style="color: rgb(148, 148, 148); font-family: '楷体'; font-size: 18px;">{{ item }}</p>
          <p v-for="(i, ind) in zhiAnShiJianPeople[item]" :key="ind">{{ i }}</p>
        </Card>
      </div>
      <Divider style="font-size: 12px; font-family: '楷体'; color: rgb(160, 160, 160);"></Divider>
      <Button type="info" icon="md-add" style="margin-top: 20px; position: relative; right: 44%; bottom: 15px;" @click="addNewEventPeople">新增犯案人员</Button>
      <Table border :columns="columns1" :data="data1" max-height="400">
        <template slot-scope="{ row, index }" slot="action">
          <Button type="error" size="small" style="margin-right: 5px" icon="ios-trash"
            @click="isDeleteFanAnPeople(row, index)">删除</Button>
        </template>
      </Table>
    </div>
  </div>
</template>

<script>
import loadingSign from '@/plugins/loadingSign'
export default {
  name: 'securityIncidentManagement',
  data () {
    return {
      zhiAnShiJian: ['遗失', '盗窃', '抢劫', '治安斗殴', '交通意外', '意外灾害'],
      zhiAnShiJianPeople: {},
      columns1: [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h('p', {}, params.row.descripte.toString())
          }
        },
        {
          type: 'index',
          width: 70,
          align: 'center',
          title: '#'
        },
        {
          title: '姓名',
          key: 'pName'
        },
        {
          title: '身份证号',
          key: 'pNumber',
          width: 180
        },
        {
          title: '年龄',
          key: 'pAge'
        },
        {
          title: '涉案起数',
          key: 'pEventCount'
        },
        {
          title: '涉案时间',
          key: 'pTime',
          width: 108
        },
        {
          title: '原因',
          key: 'pReason'
        },
        {
          title: '是否团伙成员',
          key: 'pIsGang'
        },
        {
          title: '删除',
          slot: 'action',
          align: 'center',
          width: 100
        }
      ],
      data1: [],
      addPeopleForm: {
        addPName: '',
        addDescripte: '',
        addPNumber: '',
        addPAge: '',
        addPEventCount: '',
        addPTime: '',
        addPReason: '',
        addPIsGang: ''
      },
      addIsGongList: ['是', '否']
    }
  },
  created () {
    this.getAllFanAnPeople()
  },
  methods: {
    getAllFanAnPeople () {
      this.$axios.get('http://localhost:3000/api/statisticsManage/getAllFanAnPeople').then((res) => {
        const zhiAnShiJianPeopleTmp = { // 定义了治安事件的对象
          遗失: [],
          盗窃: [],
          抢劫: [],
          治安斗殴: [],
          交通意外: [],
          意外灾害: []
        }
        for (const k in zhiAnShiJianPeopleTmp) {
          res.data.forEach((item) => { // 将的到的犯案人员数组遍历
            if (item.descripte.some((i) => i === k)) { // 如果其中一个满足治安事件对象的键名
              zhiAnShiJianPeopleTmp[k].push(item.pName)
            }
          })
        }
        this.zhiAnShiJianPeople = zhiAnShiJianPeopleTmp
        this.data1 = res.data
      }).catch((err) => {
        console.log(err)
      })
    },
    isDeleteFanAnPeople (row) {
      loadingSign.start('删除犯案人员中...')
      this.$axios.post('http://localhost:3000/api/statisticsManage/removeFanAnPeople', row).then((res) => {
        this.$Message.success({
          content: '删除企业成功'
        })
        this.getAllFanAnPeople()
        loadingSign.end()
      }).catch((err) => {
        console.log(err)
      })
    },
    addNewEventPeople () {
      this.$Modal.confirm({
        title: '添加犯案人员',
        onOk: () => {
          loadingSign.start('添加犯案人员中...')
          const obj = {
            pName: this.addPeopleForm.addPName,
            descripte: this.addPeopleForm.addDescripte,
            pNumber: this.addPeopleForm.addPNumber,
            pAge: this.addPeopleForm.addPAge,
            pEventCount: this.addPeopleForm.addPEventCount,
            pTime: this.addPeopleForm.addPTime,
            pReason: this.addPeopleForm.addPReason,
            pIsGang: this.addPeopleForm.addPIsGang
          }
          this.$axios.post('http://localhost:3000/api/statisticsManage/addFanAnPeople', obj).then((res) => {
            this.$Message.success({
              content: '添加犯案人员成功'
            })
            this.getAllFanAnPeople()
            this.addPeopleForm = {
              addPName: '',
              addDescripte: '',
              addPNumber: '',
              addPAge: '',
              addPEventCount: '',
              addPTime: '',
              addPReason: '',
              addPIsGang: ''
            }
            loadingSign.end()
          }).catch((err) => {
            console.log(err)
          })
        },
        render: (h) => {
          // 1
          return h('div', [
            h('Input', {
              props: {
                value: this.addPeopleForm.addPName,
                autofocus: true,
                placeholder: '请输入人员名字'
              },
              on: {
                input: (val) => {
                  this.addPeopleForm.addPName = val
                }
              }
            }),
            // 2
            h('Select', {
              on: {
                'on-change': (event) => {
                  this.addPeopleForm.addDescripte = event
                }
              },
              style: {
                marginTop: '10px'
              },
              props: {
                multiple: true
              }
            },
            this.zhiAnShiJian.map(function (type) {
              return h('Option', {
                props: {
                  value: type,
                  label: type
                }
              }, type)
            })),
            // 3
            h('Input', {
              props: {
                value: this.addPeopleForm.addPNumber,
                autofocus: true,
                placeholder: '请输入身份证号'
              },
              style: {
                marginTop: '10px'
              },
              on: {
                input: (val) => {
                  this.addPeopleForm.addPNumber = val
                }
              }
            }),
            // 4
            h('Input', {
              props: {
                value: this.addPeopleForm.addPAge,
                autofocus: true,
                placeholder: '请输入人员年龄'
              },
              style: {
                marginTop: '10px'
              },
              on: {
                input: (val) => {
                  this.addPeopleForm.addPAge = val
                }
              }
            }),
            // 5
            h('Input', {
              props: {
                value: this.addPeopleForm.addPEventCount,
                autofocus: true,
                placeholder: '请输入涉案起数'
              },
              style: {
                marginTop: '10px'
              },
              on: {
                input: (val) => {
                  this.addPeopleForm.addPEventCount = val
                }
              }
            }),
            // 6
            h('Input', {
              props: {
                value: this.addPeopleForm.addPTime,
                autofocus: true,
                placeholder: '请输入涉案时间'
              },
              style: {
                marginTop: '10px'
              },
              on: {
                input: (val) => {
                  this.addPeopleForm.addPTime = val
                }
              }
            }),
            // 7
            h('Input', {
              props: {
                value: this.addPeopleForm.addPReason,
                autofocus: true,
                placeholder: '请输入原因'
              },
              style: {
                marginTop: '10px'
              },
              on: {
                input: (val) => {
                  this.addPeopleForm.addPReason = val
                }
              }
            }),
            // 8
            h('Select', {
              on: {
                'on-change': (event) => {
                  this.addPeopleForm.addPIsGang = event
                }
              },
              style: {
                marginTop: '10px'
              }
            },
            this.addIsGongList.map(function (type) {
              return h('Option', {
                props: {
                  value: type,
                  label: type
                }
              }, type)
            }))
          ])
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
