<template>
  <div class="dictionaryManagement">
    <!-- 字典管理 -->
    <h1>字典管理</h1>
    <Divider orientation="left" style="font-size: 12px; font-family: '楷体'; color: rgb(160, 160, 160);">系统管理</Divider>
    <Table row-key="name" :columns="columns1" :data="data1">
      <template slot-scope="{ row, index }" slot="operate">
        <Button type="primary" size="small" style="margin-right: 5px" icon="ios-clipboard" @click="bianjiRow(row, index)">编辑</Button>
      </template>
    </Table>
    <dictionarySome v-if="isClickBianjiRow" @closeCurDictSome="closeCurDictSome" :dictListWord='dictListWord'></dictionarySome>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import dictionarySome from './dictionarySome'
export default {
  name: 'dictionaryManagement',
  data () {
    return {
      isClickBianjiRow: false,
      columns1: [
        {
          type: 'index',
          width: 70,
          align: 'center',
          title: '#'
        },
        {
          title: '字典类型名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '所属模块',
          key: 'ismodule',
          align: 'center'
        },
        {
          title: '备注说明',
          key: 'descripte',
          align: 'center'
        },
        {
          title: '操作',
          slot: 'operate',
          align: 'center'
        }
      ],
      data1: [
        {
          name: '角色类型',
          ismodule: '系统管理',
          descripte: '设置用户的角色类型',
          storeDict: 'roleList'
        }
      ],
      dictListWord: ''
    }
  },
  computed: {
    ...mapGetters(['dictionaryObj'])
  },
  methods: {
    bianjiRow (row) {
      this.isClickBianjiRow = true
      this.dictListWord = row.storeDict
    },
    closeCurDictSome (val) {
      this.isClickBianjiRow = val
    }
  },
  components: {
    dictionarySome
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
