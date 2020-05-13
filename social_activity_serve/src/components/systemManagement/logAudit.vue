<template>
  <div class="logAudit">
    <!-- 日志审计 -->
    <h1>日志审计</h1>
    <Divider orientation="left" style="font-size: 12px; font-family: '楷体'; color: rgb(160, 160, 160);">系统管理</Divider>
    <Table height="300" :columns="columns1" :data="data1">
      <template slot-scope="{ row, index }" slot="action">
        <Button type="error" size="small" style="margin-right: 5px" icon="ios-trash"
          @click="isDeleteLogAudit(row, index)">删除</Button>
      </template>
    </Table>
  </div>
</template>

<script>
import loadingSign from '@/plugins/loadingSign'
export default {
  name: 'logAudit',
  data () {
    return {
      columns1: [
        {
          type: 'index',
          width: 70,
          align: 'center',
          title: '#'
        },
        {
          title: '管理员用户',
          key: 'email'
        },
        {
          title: '角色',
          key: 'role'
        },
        {
          title: '操作',
          key: 'operate'
        },
        {
          title: '执行时间',
          key: 'date'
        },
        {
          title: '删除',
          slot: 'action',
          align: 'center'
        }
      ],
      data1: []
    }
  },
  methods: {
    getAllOperatings () {
      const that = this
      this.$axios.get('http://localhost:3000/api/admin/getAllOperating').then((res) => {
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
    isDeleteLogAudit (row) {
      this.$Modal.confirm({
        title: '删除',
        content: '确定删除此条记录？',
        onOk: () => {
          loadingSign.start('删除中...')
          this.$axios.post('http://localhost:3000/api/admin/removeOperating', row).then((res) => {
            console.log(res)
            this.$Message.success({
              content: '记录删除成功'
            })
            loadingSign.end('删除中...')
            this.getAllOperatings()
          }).catch(err => {
            console.log(err)
          })
        }
      })
    }
  },
  created () {
    this.getAllOperatings()
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
