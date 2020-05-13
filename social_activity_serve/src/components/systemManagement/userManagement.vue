<template>
  <div class="userManagement">
    <!-- 用户管理 -->
    <h1>用户管理</h1>
    <Divider orientation="left" style="font-size: 12px; font-family: '楷体'; color: rgb(160, 160, 160);">系统管理</Divider>
    <Button type="info" icon="md-add" style="margin-top: 20px; position: relative; right: 45%;" @click="changeIsAddNewManager">新增</Button>
    <div class="userForm-content">
      <Table :columns="columns1" :data="data1">
        <template slot-scope="{ row }" slot="email">
          <strong>{{ row.email }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="handleRender(row, index)" icon="ios-brush">修改密码</Button>
          <Button type="error" size="small" style="margin-right: 5px" icon="ios-trash" @click="isDeleteManager(row)">删除</Button>
        </template>
      </Table>
    </div>
    <div v-if="isAddNewManager" class="isAddNewManager">
      <addNewManager @changeIsloginform="closeIsAddNewManager"></addNewManager>
    </div>
  </div>
</template>

<script>
import loadingSign from '@/plugins/loadingSign'
import addNewManager from './addNewManager'
import { mapGetters } from 'vuex'
export default {
  name: 'userManagement',
  data () {
    return {
      columns1: [
        {
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
          title: '操作',
          slot: 'action',
          align: 'center'
        }
      ],
      data1: [],
      newPassword: '',
      isAddNewManager: false
    }
  },
  methods: {
    changeIsAddNewManager () {
      this.isAddNewManager = true
    },
    closeIsAddNewManager (val) {
      this.isAddNewManager = false
      this.getAllManagers()
    },
    updatePassWord (row, index) {
      console.log(row, index)
    },
    isDeleteManager (row) {
      this.$Modal.confirm({
        title: '删除',
        content: `确定删除${row.email}用户？`,
        onOk: () => {
          loadingSign.start('删除中...')
          this.$axios.post('http://localhost:3000/api/admin/removeManager', row).then((res) => {
            console.log(res)
            this.$Message.success({
              content: '用户删除成功'
            })
            this.getAllManagers()
            loadingSign.end('删除中...')
            this.submitOperating(this.adminInfo.email, this.adminInfo.role, `删除了${row.email}用户`)
          }).catch(err => {
            console.log(err)
          })
        }
      })
    },
    getAllManagers () {
      const that = this
      this.$axios.get('http://localhost:3000/api/admin/getAllManagers').then((res) => {
        if (res.data.length) {
          const arr = []
          res.data.forEach((item) => {
            arr.push(item)
          })
          that.data1 = arr
        } else {
          that.data1 = []
        }
      }).catch(err => {
        console.log(err)
      })
    },
    handleRender (row) {
      this.$Modal.confirm({
        title: '修改密码',
        render: (h) => {
          return h('Input', {
            props: {
              value: this.value,
              placeholder: '请输入新密码...',
              type: 'password',
              password: true
            },
            on: {
              input: (val) => {
                this.newPassword = val
              }
            }
          })
        },
        onOk: () => {
          loadingSign.start('修改中...')
          const obj = row
          obj.newPassword = this.newPassword
          this.$axios.post('http://localhost:3000/api/admin/updatePassword', obj).then(res => {
            console.log(res)
            this.$Message.success({
              content: '密码修改成功'
            })
            loadingSign.end()
            this.submitOperating(this.adminInfo.email, this.adminInfo.role, `修改了${obj.email}用户的密码`)
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
  components: {
    addNewManager
  },
  computed: {
    ...mapGetters(['adminInfo'])
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.userManagement {
  width: 100%;
}
.userForm-content {
  margin: 10px 0;
}
.isAddNewManager {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
