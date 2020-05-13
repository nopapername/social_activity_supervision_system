<template>
  <div class="Home">
    <div class="layout">
      <Layout>
        <Header>
          <div class="header-title">活动安保管理系统</div>
          <div class="layout-date">
            <p><Icon type="ios-time-outline" style="margin-right: 5px;"/>{{ nowTime }}</p>
          </div>
          <div class="layout-logout">
            <a href="javascript:void(0)" @click="clickLogout">注销</a>
          </div>
          <div class="layout-logo">
            <Icon type="ios-contact" size="35" color= "white"/>
            <p style="margin-left: 10px; color: white;">管理员：{{ managerInfo.email }}</p>
          </div>
        </Header>
        <Layout>
          <Sider hide-trigger :style="{background: '#fff'}">
            <Menu active-name="1-1" theme="light" width="auto" :open-names="['1']">
              <Submenu name="1">
                <template slot="title">
                  <Icon type="ios-body" style="float: left; line-height: 20px;" />
                  大型活动管理
                </template>
                <router-link to="/home/activityProcess/processManagementDiagram">
                  <MenuItem name="1-1">
                    流程管理图
                  </MenuItem>
                </router-link>
                <router-link to="/home/activityProcess/activityReport">
                  <MenuItem name="1-2">
                    活动填报
                  </MenuItem>
                </router-link>
              </Submenu>
              <Submenu name="2">
                <template slot="title">
                  <Icon type="ios-nuclear" style="float: left; line-height: 20px;" />
                  活动风险预估管理
                </template>
                <router-link to="/home/riskEstimation/riskEstimate">
                  <MenuItem name="2-1">
                  风险预估项管理
                  </MenuItem>
                </router-link>
                <router-link to="/home/riskEstimation/riskEstimationScheme">
                  <MenuItem name="2-2">
                  风险预估方案管理
                  </MenuItem>
                </router-link>
                <router-link to="/home/riskEstimation/riskEstimationResults">
                  <MenuItem name="2-3">
                  风险预估结果管理
                  </MenuItem>
                </router-link>
                <router-link to="/home/riskEstimation/rectificationOpinions">
                  <MenuItem name="2-4">
                  整改意见管理
                  </MenuItem>
                </router-link>
              </Submenu>
              <Submenu name="3">
                <template slot="title">
                  <Icon type="ios-calendar" style="float: left; line-height: 20px;" />
                  任务计划安排
                </template>
                <router-link to="/home/missionPlan/activityTimeAllocation">
                  <MenuItem name="3-1">
                    活动时间分配
                  </MenuItem>
                </router-link>
                <router-link to="/home/missionPlan/divisionOfLaborAssessment">
                  <MenuItem name="3-2">
                    活动分工及考核
                  </MenuItem>
                </router-link>
              </Submenu>
              <Submenu name="4">
                <template slot="title">
                  <Icon type="ios-stats" style="float: left; line-height: 20px;" />
                  综合数据管理与统计
                </template>
                <router-link to="/home/statistics/classifiedArchive">
                  <MenuItem name="4-1">
                    活动分类归档
                  </MenuItem>
                </router-link>
                <router-link to="/home/statistics/managementOfKeySites">
                  <MenuItem name="4-2">
                    重点场所管理
                  </MenuItem>
                </router-link>
                <router-link to="/home/statistics/businessManagement">
                  <MenuItem name="4-3">
                    企业管理
                  </MenuItem>
                </router-link>
                <router-link to="/home/statistics/securityIncidentManagement">
                  <MenuItem name="4-4">
                    治安事件管理
                  </MenuItem>
                </router-link>
                <router-link to="/home/statistics/comprehensiveStatistics">
                  <MenuItem name="4-5">
                    综合统计
                  </MenuItem>
                </router-link>
                <router-link to="/home/statistics/breakdownStatistics">
                  <MenuItem name="4-6">
                    分项统计
                  </MenuItem>
                </router-link>
              </Submenu>
              <Submenu name="5">
                <template slot="title">
                  <Icon type="ios-cog" style="float: left; line-height: 20px;" />
                  系统管理
                </template>
                <router-link to="/home/systemManagement/userManagement">
                  <MenuItem name="5-1">
                    用户管理
                  </MenuItem>
                </router-link>
                <router-link to="/home/systemManagement/roleManagement">
                  <MenuItem name="5-2">
                    角色管理
                  </MenuItem>
                </router-link>
                <router-link to="/home/systemManagement/authorityManagement">
                  <MenuItem name="5-3">
                    权限管理
                  </MenuItem>
                </router-link>
                <router-link to="/home/systemManagement/dictionaryManagement">
                  <MenuItem name="5-4">
                    字典管理
                  </MenuItem>
                </router-link>
                <router-link to="/home/systemManagement/logAudit">
                  <MenuItem name="5-5">
                    日志审计
                  </MenuItem>
                </router-link>
              </Submenu>
            </Menu>
          </Sider>
          <Layout :style="{padding: '0 24px 0'}">
            <Content :style="{padding: '24px', minHeight: '75vh', background: '#fff'}">
              <div class="every-content">
                <router-view />
              </div>
            </Content>
          </Layout>
        </Layout>
        <Footer>2020 Graduation Project © By: Oyjh</Footer>
      </Layout>
    </div>
  </div>
</template>

<script>
import '@/plugins/Date'

export default {
  name: 'Home',
  data () {
    return {
      managerInfo: {},
      nowTime: '',
      nowTimeInterval: null
    }
  },
  methods: {
    clickLogout () {
      this.$Modal.confirm({
        title: '注销',
        content: '请确认是否注销账户？',
        onOk: () => {
          this.$store.dispatch('clearAdminAuthorization')
          this.$router.push('/login')
        }
      })
    },
    getCurrentTime () {
      this.nowTimeInterval = setInterval(() => {
        this.nowTime = new Date().format('yyyy/MM/dd HH:mm:ss')
      }, 1000)
    },
    getManagerInfo () {
      this.managerInfo = this.$store.getters.adminInfo
    },
    getExpiresInfo () {
      this.$axios.get('http://localhost:3000/api/admin/isExpired').then(res => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    },
    getAllDictionary () {
      this.$store.dispatch('setDictionaryObj')
    }
  },
  created () {
    this.getAllDictionary()
    this.getExpiresInfo()
    this.getCurrentTime()
    this.getManagerInfo()
  },
  beforeDestroy () {
    clearInterval(this.nowTimeInterval)
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.header-title {
  float:left;
  color: rgb(196, 196, 196);
  font-family: '楷体';
  font-size: 25px;
}
.layout-date {
  float: left;
  margin-left: 20px;
  color: rgb(196, 196, 196);
}
.layout-logo {
  float: right;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
}
.layout-logo:hover {
  background: #576277;
  cursor: pointer;
}
.layout-logout {
  float: right;
  margin-left: 15px;
}
</style>
<style>
.ivu-menu-submenu-title span>i, .ivu-menu-submenu-title>i {
  margin-right: -5px !important;
}
</style>
