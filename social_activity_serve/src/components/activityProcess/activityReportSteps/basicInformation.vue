<template>
  <div class="basicInformation">
    <!-- 基础资料 -->
    <div class="basic-content">
      <div class="basicHeader">
        <p style="font-size: 18px; color: rgb(255, 94, 0); font-family: '楷体'; font-weight: bold;">基础资料</p>
        <a href="javascript:void(0)" style="font-size: 13px; color: rgb(255, 94, 0); line-height: 26.4px; font-family: '楷体'">进入查看页面</a>
      </div>
      <div class="form-content">
        <Form :model="formItem" :label-width="90" label-position="right" label-colon>
          <Row type="flex" justify="space-around">
            <Col>
              <FormItem label="活动名称">
                <Input v-model="formItem.activityName" placeholder="请输入活动名称"></Input>
              </FormItem>
            </Col>
            <Col>
              <FormItem label="组织单位">
                <Input v-model="formItem.organizationalUnit" placeholder="请输入组织单位"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="space-around">
            <Col>
              <FormItem label="举办时间起">
                <Input v-model="formItem.holdStart" placeholder="请输入开始举办时间"></Input>
              </FormItem>
            </Col>
            <Col>
              <FormItem label="举办时间止">
                <Input v-model="formItem.holdEnd" placeholder="请输入结束举办时间"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="space-around">
            <Col>
              <FormItem label="勤务时间起">
                <Input v-model="formItem.serviceStart" placeholder="请输入勤务时间起"></Input>
              </FormItem>
            </Col>
            <Col>
              <FormItem label="勤务时间止">
                <Input v-model="formItem.serviceEnd" placeholder="请输入勤务时间止"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="space-around">
            <Col>
              <FormItem label="地点">
                <Input v-model="formItem.place" placeholder="请输入地点"></Input>
              </FormItem>
            </Col>
            <Col>
              <FormItem label="性质">
                <Input v-model="formItem.nature" placeholder="请输入性质"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="space-around">
            <Col>
              <FormItem label="规模">
                <Input v-model="formItem.extent" placeholder="请输入规模"></Input>
              </FormItem>
            </Col>
            <Col>
              <FormItem label="参与人数">
                <Input v-model="formItem.peopleNum" placeholder="请输入参与人数"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="space-around">
            <Col>
              <FormItem label="责任民警">
                <Input v-model="formItem.responsiblePolice" placeholder="请输入责任民警"></Input>
              </FormItem>
            </Col>
            <Col>
              <FormItem label="经办人">
                <Input v-model="formItem.managerPeople" placeholder="请输入经办人"></Input>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
      <div class="file-content">
        <Divider orientation="left" style="color:rgb(255, 94, 0)">相关材料</Divider>
        <a href="javascript:void(0)" style="font-size: 13px; position: relative; left: 4 0%;">上传</a>
        <div class="file">
          <div>资质证明</div>
          <div>
            <span>
              <Icon type="ios-alert"></Icon>浏览
            </span>
            <span>
              <Icon type="ios-cloud-download"></Icon>下载
            </span>
            <span>
              <Icon type="md-pricetags"></Icon>编辑
            </span>
            <span>
              <Icon type="md-trash"></Icon>删除
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'basicInformation',
  data () {
    return {
      formItem: {
        activityName: '',
        organizationalUnit: '',
        holdStart: '',
        holdEnd: '',
        serviceStart: '',
        serviceEnd: '',
        place: '',
        nature: '',
        extent: '',
        peopleNum: '',
        responsiblePolice: '',
        managerPeople: ''
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.basicInformation {
  width: 100%;
  display: flex;
  justify-content: center;
}
.basic-content {
  width: 80%;
  border: 1px solid rgb(0, 217, 255);
  border-top: 2px solid rgb(0, 153, 255);
}
.basicHeader {
  display: flex;
  justify-content: space-between;
  padding: 8px 20px;
  background-color: rgba(0, 225, 255, 0.5);
}
.form-content {
  padding: 20px 50px;
}
.file-content {
  padding: 20px 50px;
}
</style>
