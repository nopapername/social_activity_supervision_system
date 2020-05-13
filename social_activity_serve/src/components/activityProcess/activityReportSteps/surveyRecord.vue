<template>
  <div class="surveyRecord">
    <!-- 踏勘记录 -->
    <div class="surveyRecord-container">
      <div class="surveyRecordHeader">
        <p style="font-size: 18px; color: rgb(255, 94, 0); font-family: '楷体'; font-weight: bold;">活动现场踏勘</p>
      </div>
      <div class="surveyRecord-content">
        <div class="file-content">
          <a href="javascript:void(0)" class="a-upload"><input type="file" multiple="multiple" accept="image/*" id="imgTakan" @change="fileImgChange">上传图片</a>
          <div class="picture" v-for="(item,index) in surveyRecord.imgFileTakan" :key="index">
            <a href="javascript:void(0)">{{ item.name }}</a>
          </div>
          <Divider style="margin: 20px 0;" />
          <Form ref="form444" :model="surveyRecord.surveyRecordForm" :label-width="80">
            <FormItem v-for="(item, index) in surveyRecord.surveyRecordForm.items" :key="index"
              :label="'Item ' + index">
              <Row style="display: flex; justify-content: space-between;">
                <Col span="5">
                  标题
                  <Input type="text" v-model="item.title" placeholder="Enter something..."></Input>
                </Col>
                <Col span="5">
                  详情
                  <Input type="text" v-model="item.detail" placeholder="Enter something..."></Input>
                </Col>
                <Col span="5">
                  采集人
                  <Input type="text" v-model="item.caijipeople" placeholder="Enter something..."></Input>
                </Col>
                <Col span="5">
                  时间
                  <Input type="text" v-model="item.date" placeholder="Enter something..."></Input>
                </Col>
                <Col span="2">
                  是否删除
                  <Button @click="handleRemove(index)">Delete</Button>
                </Col>
              </Row>
            </FormItem>
            <FormItem>
              <Row>
                <Col span="12">
                <Button type="dashed" long @click="handleAdd" icon="md-add">Add item</Button>
                </Col>
              </Row>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'surveyRecord',
  data () {
    return {
      surveyRecord: {
        imgFileTakan: null,
        surveyRecordForm: {
          items: [
            {
              title: '',
              detail: '',
              caijipeople: '',
              date: ''
            }
          ]
        }
      }
    }
  },
  computed: {
    ...mapGetters(['thisTab'])
  },
  watch: {
    thisTab (val) {
      if (val !== 3) {
        this.$store.commit('setSurveyRecord', this.surveyRecord)
      }
    }
  },
  methods: {
    resetFormData () {
      this.$refs.form444.resetFields()
    },
    fileImgChange () {
      var fileInput = document.getElementById('imgTakan')
      this.surveyRecord.imgFileTakan = fileInput.files
    },
    handleAdd () {
      this.surveyRecord.surveyRecordForm.items.push({
        title: '',
        detail: '',
        caijipeople: '',
        date: ''
      })
    },
    handleRemove (index) {
      this.surveyRecord.surveyRecordForm.items.splice(index, 1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.surveyRecord {
  width: 100%;
  display: flex;
  justify-content: center;
}
.surveyRecord-container {
  width: 80%;
  border: 1px solid rgb(0, 217, 255);
  border-top: 2px solid rgb(0, 153, 255);
}
.surveyRecordHeader {
  display: flex;
  justify-content: space-between;
  padding: 8px 20px;
  background-color: rgba(0, 153, 255, 0.5);
}
.surveyRecord-content {
  padding: 20px 0;
}
.file-content {
  padding: 0 20px;
}
.picture {
  display: flex;
  justify-content: space-around;
}
.a-upload {
  margin-top: 10px;
  position: relative;
  display: inline-block;
  background: #D0EEFF;
  border: 1px solid #99D3F5;
  border-radius: 4px;
  padding: 2px 6px;
  overflow: hidden;
  color: #1E88C7;
  text-decoration: none;
  text-indent: 0;
  font-size: 13px;
}
.a-upload input {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
}
.a-upload:hover {
  background: #AADFFD;
  border-color: #78C3F3;
  color: #004974;
  text-decoration: none;
}
</style>
