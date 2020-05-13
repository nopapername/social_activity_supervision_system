<template>
  <div class="authorityManagement">
    <!-- 权限管理 -->
    <h1>权限管理</h1>
    <Divider orientation="left" style="font-size: 12px; font-family: '楷体'; color: rgb(160, 160, 160);">系统管理</Divider>
    <div class="authorityForm-content">
      <Table :columns="columns1" :data="data1">
        <template slot-scope="{ row }" slot="email">
          <strong>{{ row.email }}</strong>
        </template>
        <template slot-scope="{ row }" slot="authority">
          <strong>{{ row.authority | authorityFilter }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="handleRenderUpdateAuthority(row, index)"
            icon="ios-brush">调整权限</Button>
        </template>
      </Table>
    </div>
  </div>
</template>

<script>
import loadingSign from '@/plugins/loadingSign'
import { mapGetters } from 'vuex'
export default {
  name: 'authorityManagement',
  data () {
    return {
      data1: [],
      columns1: [{
        type: 'index',
        width: 70,
        align: 'center',
        title: '序号'
      },
      {
        title: '帐号',
        align: 'center',
        slot: 'email'
      },
      {
        title: '注册日期',
        align: 'center',
        key: 'date'
      },
      {
        title: '角色',
        key: 'role',
        align: 'center'
      },
      {
        title: '权限',
        slot: 'authority',
        align: 'center'
      },
      {
        title: '操作',
        slot: 'action',
        align: 'center'
      }],
      selectAuthority: '普通管理员',
      authorityList: [
        {
          value: '0',
          label: '高权限'
        },
        {
          value: '1',
          label: '中权限'
        },
        {
          value: '2',
          label: '低权限'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['adminInfo'])
  },
  methods: {
    getAllManagers () {
      const that = this
      this.$axios.get('http://localhost:3000/api/admin/getAllManagers').then((res) => {
        const arr = []
        res.data.forEach((item) => {
          arr.push(item)
        })
        that.data1 = arr
      }).catch(err => {
        console.log(err)
      })
    },
    handleRenderUpdateAuthority (row) {
      this.$Modal.confirm({
        title: '修改权限',
        render: (h) => {
          return h('Select', {
            props: {
              value: row.authority
            },
            on: {
              'on-change': (event) => {
                this.selectAuthority = event
              }
            }
          },
          this.authorityList.map(function (type) {
            return h('Option', {
              props: {
                value: type.value,
                label: type.label
              }
            }, type)
          }))
        },
        onOk: () => {
          // loadingSign.start('修改中...')
          const obj = row
          obj.authority = this.selectAuthority
          this.$axios.post('http://localhost:3000/api/admin/updateAuthority', obj).then(res => {
            console.log(res)
            this.$Message.success({
              content: '用户权限修改成功'
            })
            this.getAllManagers()
            loadingSign.end()
            this.submitOperating(this.adminInfo.email, this.adminInfo.role, `调整了${obj.email}用户的角色`)
          }).catch(err => {
            console.log(err)
          })
        }
      })
    }
  },
  created () {
    this.getAllManagers()
  },
  filters: {
    authorityFilter: function (value) {
      let val = ''
      switch (value) {
        case '0':
          val = '高权限'
          break
        case '1':
          val = '中权限'
          break
        case '2':
          val = '低权限'
          break
      }
      return val
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
