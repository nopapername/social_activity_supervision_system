<template>
  <div class="organizer">
    <!-- 承办单位 -->
    <div class="organize-container">
      <div class="organizeHeader">
        <p style="font-size: 18px; color: rgb(255, 94, 0); font-family: '楷体'; font-weight: bold;">单位登记</p>
      </div>
      <div class="organize-content">
        <Form :model="organizer" :label-width="100" label-position="right"
          style="margin-top: 20px;" label-colon ref="form333">
          <FormItem label="组织承办单位">
            <Input v-model="organizer.organizeName" placeholder="请输入组织承办单位"></Input>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'organizer',
  data () {
    return {
      organizer: {
        organizeName: ''
      }
    }
  },
  computed: {
    ...mapGetters(['thisTab'])
  },
  methods: {
    resetFormData () {
      this.$refs.form333.resetFields()
    }
  },
  watch: {
    thisTab (val) {
      if (val !== 2) {
        this.$store.commit('setOrganizer', this.organizer)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.organizer {
  width: 100%;
  display: flex;
  justify-content: center;
}
.organize-container {
  width: 80%;
  border: 1px solid rgb(0, 217, 255);
  border-top: 2px solid rgb(0, 153, 255);
}
.organizeHeader {
  display: flex;
  justify-content: space-between;
  padding: 8px 20px;
  background-color: rgba(0, 153, 255, 0.5);
}
.organize-content {
  padding: 0 20px;
}
</style>
