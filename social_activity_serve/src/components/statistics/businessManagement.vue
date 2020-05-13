<template>
  <div class="businessManagement">
    <!-- 企业管理 -->
    <h1>企业管理</h1>
    <Divider orientation="left" style="font-size: 12px; font-family: '楷体'; color: rgb(160, 160, 160);">综合数据管理</Divider>
    <Button type="info" icon="md-add" style="margin-top: 20px; position: relative; right: 45%; bottom: 15px;" @click="addNewQiYeModel">新增</Button>
    <Table border :columns="columns1" :data="data1">
      <template slot-scope="{ row, index }" slot="action">
        <Button type="error" size="small" style="margin-right: 5px" icon="ios-trash"
          @click="isDeleteQiYe(row, index)">删除</Button>
      </template>
    </Table>
  </div>
</template>

<script>
import loadingSign from '@/plugins/loadingSign'
export default {
  name: 'businessManagement',
  data () {
    return {
      columns1: [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h('p', {}, params.row.descripte)
          }
        },
        {
          type: 'index',
          width: 70,
          align: 'center',
          title: '#'
        },
        {
          title: '企业名称',
          key: 'qiYeName'
        },
        {
          title: '删除',
          slot: 'action',
          align: 'center',
          width: 120
        }
      ],
      data1: [],
      addQiYeName: '',
      addDescripte: ''
    }
  },
  methods: {
    getAllQiYe () {
      this.$axios.get('http://localhost:3000/api/statisticsManage/getAllQiYe').then((res) => {
        this.data1 = res.data
      }).catch((err) => {
        console.log(err)
      })
    },
    isDeleteQiYe (row) {
      loadingSign.start('删除企业中...')
      this.$axios.post('http://localhost:3000/api/statisticsManage/removeQiYe', row).then((res) => {
        this.$Message.success({
          content: '删除企业成功'
        })
        this.getAllQiYe()
        loadingSign.end()
      }).catch((err) => {
        console.log(err)
      })
    },
    addNewQiYeModel () {
      this.$Modal.confirm({
        title: '添加企业',
        onOk: () => {
          loadingSign.start('添加企业中...')
          const obj = {
            qiYeName: this.addQiYeName,
            descripte: this.addDescripte
          }
          this.$axios.post('http://localhost:3000/api/statisticsManage/addQiYe', obj).then((res) => {
            this.$Message.success({
              content: '添加企业成功'
            })
            this.getAllQiYe()
            this.addQiYeName = ''
            this.addDescripte = ''
            loadingSign.end()
          }).catch((err) => {
            console.log(err)
          })
        },
        render: (h) => {
          return h('div', [
            h('Input', {
              props: {
                value: this.addQiYeName,
                autofocus: true,
                placeholder: '请输入企业名字'
              },
              on: {
                input: (val) => {
                  this.addQiYeName = val
                }
              }
            }),
            h('Input', {
              props: {
                value: this.addDescripte,
                autofocus: true,
                placeholder: '请输入企业描述',
                maxlength: 150,
                'show-word-limit': true,
                type: 'textarea'
              },
              style: {
                marginTop: '10px'
              },
              on: {
                input: (val) => {
                  this.addDescripte = val
                }
              }
            })
          ])
        }
      })
    }
  },
  created () {
    this.getAllQiYe()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
