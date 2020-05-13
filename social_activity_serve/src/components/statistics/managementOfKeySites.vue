<template>
  <div class="managementOfKeySites">
    <!-- 重点场所管理 -->
    <h1>重点场所管理</h1>
    <Divider orientation="left" style="font-size: 12px; font-family: '楷体'; color: rgb(160, 160, 160);">综合数据管理</Divider>
    <Button type="info" icon="md-add" style="margin-top: 20px; position: relative; right: 45%; bottom: 15px;" @click="addNewPlaceImModel">新增</Button>
    <Table border :columns="columns1" :data="data1">
      <template slot-scope="{ row, index }" slot="action">
        <Button type="error" size="small" style="margin-right: 5px" icon="ios-trash"
          @click="isDeletePlaceIm(row, index)">删除</Button>
      </template>
    </Table>
  </div>
</template>

<script>
import loadingSign from '@/plugins/loadingSign'
export default {
  name: 'managementOfKeySites',
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
          title: '重点场所',
          key: 'placeName'
        },
        {
          title: '删除',
          slot: 'action',
          align: 'center',
          width: 120
        }
      ],
      data1: [],
      addPlaceName: '',
      addDescripte: ''
    }
  },
  methods: {
    getAllPlaceIm () {
      this.$axios.get('http://localhost:3000/api/statisticsManage/getAllPlaceIm').then((res) => {
        this.data1 = res.data
        this.data1.forEach((item) => {
          item._expanded = true
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    isDeletePlaceIm (row) {
      loadingSign.start('删除场所中...')
      this.$axios.post('http://localhost:3000/api/statisticsManage/removePlaceIm', row).then((res) => {
        this.$Message.success({
          content: '删除场所成功'
        })
        this.getAllPlaceIm()
        loadingSign.end()
      }).catch((err) => {
        console.log(err)
      })
    },
    addNewPlaceImModel () {
      this.$Modal.confirm({
        title: '添加场所',
        onOk: () => {
          loadingSign.start('添加场所中...')
          const obj = {
            placeName: this.addPlaceName,
            descripte: this.addDescripte
          }
          this.$axios.post('http://localhost:3000/api/statisticsManage/addPlaceIm', obj).then((res) => {
            this.$Message.success({
              content: '添加场所成功'
            })
            this.getAllPlaceIm()
            this.addPlaceName = ''
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
                value: this.addPlaceName,
                autofocus: true,
                placeholder: '请输入场所名字'
              },
              on: {
                input: (val) => {
                  this.addPlaceName = val
                }
              }
            }),
            h('Input', {
              props: {
                value: this.addDescripte,
                autofocus: true,
                placeholder: '请输入重点场所描述',
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
    this.getAllPlaceIm()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
