<template>
  <div class="roleManagement">
    <!-- 角色管理 -->
    <h1>角色管理</h1>
    <Divider orientation="left" style="font-size: 12px; font-family: '楷体'; color: rgb(160, 160, 160);">系统管理</Divider>
    <div class="roleForm-content">
      <Table :columns="columns1" :data="data1">
        <template slot-scope="{ row }" slot="email">
          <strong>{{ row.email }}</strong>
        </template>
        <template slot-scope="{ row }" slot="roles">
          <strong>{{ row.role }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="handleRenderUpdateRole(row, index)"
            icon="ios-brush">修改角色</Button>
        </template>
      </Table>
    </div>
  </div>
</template>

<script>
import loadingSign from '@/plugins/loadingSign'
import { mapGetters } from 'vuex'
export default {
  name: 'roleManagement',
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
        slot: 'roles',
        align: 'center'
      },
      {
        title: '操作',
        slot: 'action',
        align: 'center'
      }],
      selectRole: '普通管理员'
    }
  },
  computed: {
    ...mapGetters(['adminInfo', 'dictionaryObj'])
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
    handleRenderUpdateRole (row) {
      this.$Modal.confirm({
        title: '修改角色',
        render: (h) => {
          return h('Select', {
            props: {
              value: row.role
            },
            on: {
              'on-change': (event) => {
                this.selectRole = event
              }
            }
          },
          this.dictionaryObj.roleList.map(function (type) {
            return h('Option', {
              props: {
                value: type.value,
                label: type.label
              }
            }, type)
          }))
        },
        onOk: () => {
          loadingSign.start('修改中...')
          const obj = row
          obj.role = this.selectRole
          this.$axios.post('http://localhost:3000/api/admin/updateRole', obj).then(res => {
            console.log(res)
            this.$Message.success({
              content: '用户角色修改成功'
            })
            this.getAllManagers()
            loadingSign.end()
            this.submitOperating(this.adminInfo.email, this.adminInfo.role, `修改了${obj.email}用户的角色`)
          }).catch(err => {
            console.log(err)
          })
        }
      })
    }
  },
  created () {
    this.getAllManagers()
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
