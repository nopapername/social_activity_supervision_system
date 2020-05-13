<template>
  <div class="dictionarySome">
    <div class="dictS-content">
      <Icon type="md-close" size="25" @click="clickClose" style="position: absolute; right: 0; top: 0px; cursor: pointer;" />
      <Card :padding="10" :bordered="true" v-for="(item, index) in dictionaryObj[dictListWord]" :key="index" style="position: relative; width: 45%; margin: 10px 0; background-color: rgb(255, 245, 198);">
        <Badge class="delete">
          <a href="#" class="demo-badge"></a>
          <Icon type="md-close" color="#ed4014" size="18" @click="deleteCur(item.value)" />
        </Badge>
        <p>{{ item.value }}</p>
      </Card>
      <div style="position: absolute; bottom: 20px; left: 150px; display: flex;">
        <Input v-model="value1" placeholder="请输入" />
        <Button type="primary" icon="md-add" style="margin-left: 5px;" @click="addOne"></Button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'dictionarySome',
  props: ['dictListWord'],
  data () {
    return {
      value1: ''
    }
  },
  computed: {
    ...mapGetters(['dictionaryObj', 'adminInfo'])
  },
  methods: {
    clickClose () {
      this.$emit('closeCurDictSome', false)
    },
    deleteCur (value) {
      const obj = {
        value: value
      }
      this.$axios.post('http://localhost:3000/api/admin/removeDictionaryRole', obj).then((res) => {
        this.$Message.success({
          content: '一项删除成功'
        })
        this.$store.dispatch('setDictionaryObj')
        this.submitOperating(this.adminInfo.email, this.adminInfo.role, '删除了一项角色类型')
      }).catch(err => {
        console.log(err)
      })
    },
    addOne () {
      const obj = {
        value: this.value1
      }
      this.$axios.post('http://localhost:3000/api/admin/addDictionaryRole', obj).then((res) => {
        this.$Message.success({
          content: '一项增加成功'
        })
        this.$store.dispatch('setDictionaryObj')
        this.value1 = ''
        this.submitOperating(this.adminInfo.email, this.adminInfo.role, '新增了一项角色类型')
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.dictionarySome {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
}
.dictS-content {
    position: relative;
    width: 500px;
    background-color: rgb(255, 255, 255);
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    border-radius: 5px;
    padding-bottom: 70px;
}
.delete {
    position: absolute;
    left: 170px;
    bottom: 20px;
    cursor: pointer;
    transition: all 0.5s;
}
.delete:hover {
  background-color: rgb(255, 166, 0);
}
</style>
