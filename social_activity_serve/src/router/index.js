import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import { LoadingBar } from 'view-design'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      // 大型活动风险预估管理------
      {
        // 风险预估项
        path: 'riskEstimation/riskEstimate',
        name: 'riskEstimate',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../components/riskEstimation/riskEstimate.vue')
      },
      {
        // 风险预估方案管理
        path: 'riskEstimation/riskEstimationScheme',
        name: 'riskEstimationScheme',
        component: () => import('../components/riskEstimation/riskEstimationScheme.vue')
      },
      {
        // 风险预估结果管理
        path: 'riskEstimation/riskEstimationResults',
        name: 'riskEstimationResults',
        component: () => import('../components/riskEstimation/riskEstimationResults.vue')
      },
      {
        // 整改意见管理
        path: 'riskEstimation/rectificationOpinions',
        name: 'rectificationOpinions',
        component: () => import('../components/riskEstimation/rectificationOpinions.vue')
      },
      // 大型活动管理------
      {
        // 活动流程管理图
        path: 'activityProcess/processManagementDiagram',
        name: 'processManagementDiagram',
        component: () => import('../components/activityProcess/processManagementDiagram.vue')
      },
      {
        // 活动填报：基础资料
        path: 'activityProcess/activityReportSteps/basicInformation',
        name: 'basicInformation',
        component: () => import('../components/activityProcess/activityReportSteps/basicInformation.vue')
      },
      {
        // 活动填报：预案登记
        path: 'activityProcess/activityReportSteps/planRegistration',
        name: 'planRegistration',
        component: () => import('../components/activityProcess/activityReportSteps/planRegistration.vue')
      },
      {
        // 活动填报：承办单位
        path: 'activityProcess/activityReportSteps/organizer',
        name: 'organizer',
        component: () => import('../components/activityProcess/activityReportSteps/organizer.vue')
      },
      {
        // 活动填报：踏勘记录
        path: 'activityProcess/activityReportSteps/surveyRecord',
        name: 'surveyRecord',
        component: () => import('../components/activityProcess/activityReportSteps/surveyRecord.vue')
      },
      {
        // 活动填报：风险预估
        path: 'activityProcess/activityReportSteps/riskEstimatesAnalysis',
        name: 'riskEstimatesAnalysis',
        component: () => import('../components/activityProcess/activityReportSteps/riskEstimatesAnalysis.vue')
      },
      {
        // 活动填报：发案情况
        path: 'activityProcess/activityReportSteps/caseSituation',
        name: 'caseSituation',
        component: () => import('../components/activityProcess/activityReportSteps/caseSituation.vue')
      },
      {
        // 活动填报：资料管理
        path: 'activityProcess/activityReportSteps/dataManagement',
        name: 'dataManagement',
        component: () => import('../components/activityProcess/activityReportSteps/dataManagement.vue')
      },
      {
        // 活动填报：日志管理
        path: 'activityProcess/activityReportSteps/workLog',
        name: 'workLog',
        component: () => import('../components/activityProcess/activityReportSteps/workLog.vue')
      },
      {
        // 活动填报：工作总结
        path: 'activityProcess/activityReportSteps/workSummary',
        name: 'workSummary',
        component: () => import('../components/activityProcess/activityReportSteps/workSummary.vue')
      },
      // 任务计划安排------
      {
        // 活动时间分配
        path: 'missionPlan/activityTimeAllocation',
        name: 'activityTimeAllocation',
        component: () => import('../components/missionPlan/activityTimeAllocation.vue')
      },
      {
        // 活动分工及考核
        path: 'missionPlan/divisionOfLaborAssessment',
        name: 'divisionOfLaborAssessment',
        component: () => import('../components/missionPlan/divisionOfLaborAssessment.vue')
      },
      // 综合数据管理与统计------
      {
        // 活动分类管理
        path: 'statistics/classifiedArchive',
        name: 'classifiedArchive',
        component: () => import('../components/statistics/classifiedArchive.vue')
      },
      {
        // 重点场所管理
        path: 'statistics/managementOfKeySites',
        name: 'managementOfKeySites',
        component: () => import('../components/statistics/managementOfKeySites.vue')
      },
      {
        // 企业管理
        path: 'statistics/businessManagement',
        name: 'businessManagement',
        component: () => import('../components/statistics/businessManagement.vue')
      },
      {
        // 治安事件管理
        path: 'statistics/securityIncidentManagement',
        name: 'securityIncidentManagement',
        component: () => import('../components/statistics/securityIncidentManagement.vue')
      },
      {
        // 综合统计
        path: 'statistics/comprehensiveStatistics',
        name: 'comprehensiveStatistics',
        component: () => import('../components/statistics/comprehensiveStatistics.vue')
      },
      {
        // 分类统计
        path: 'statistics/breakdownStatistics',
        name: 'breakdownStatistics',
        component: () => import('../components/statistics/breakdownStatistics.vue')
      },
      // 系统管理------
      {
        // 用户管理
        path: 'systemManagement/userManagement',
        name: 'userManagement',
        component: () => import('../components/systemManagement/userManagement.vue')
      },
      {
        // 角色管理
        path: 'systemManagement/roleManagement',
        name: 'roleManagement',
        component: () => import('../components/systemManagement/roleManagement.vue')
      },
      {
        // 权限管理
        path: 'systemManagement/authorityManagement',
        name: 'authorityManagement',
        component: () => import('../components/systemManagement/authorityManagement.vue')
      },
      {
        // 字典管理
        path: 'systemManagement/dictionaryManagement',
        name: 'dictionaryManagement',
        component: () => import('../components/systemManagement/dictionaryManagement.vue')
      },
      {
        // 日志审计
        path: 'systemManagement/logAudit',
        name: 'logAudit',
        component: () => import('../components/systemManagement/logAudit.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  LoadingBar.start()
  const adminToken = localStorage.adminToken
  if (to.path === '/login') {
    if (adminToken) {
      next('/home/activityProcess/processManagementDiagram')
    } else {
      next()
    }
  } else {
    if (adminToken) {
      if (to.path === '/home') {
        next('/home/activityProcess/processManagementDiagram')
      } else {
        next()
      }
    } else {
      next('/login')
    }
  }
})

router.afterEach((to, next) => {
  LoadingBar.finish()
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = '活动安保管理系统'
  }
})

export default router
