<template>
  <div class="Login">
    <div class="form-container" v-show="isloginform">
      <h2 class="form-title">活动安保管理系统</h2>
      <Form ref="loginForm" :model="loginInfo" :rules="loginRules">
        <FormItem prop="email">
          <Input type="text" placeholder="邮箱" v-model="loginInfo.email">
            <Icon type="ios-person-outline" slot="prefix"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" placeholder="密码" v-model="loginInfo.password">
            <Icon type="ios-lock-outline" slot="prefix"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="loginCaptcha">
            <Row :gutter="5">
                <Col span="16">
                  <Input type="text" placeholder="验证码" v-model="loginInfo.loginCaptcha"></Input>
                </Col>
                <Col span="8">
                  <img width="80" style="background:#EEE9E9;" ref="captcha" height="32" src="http://localhost:3000/api/verification" @click="refreshCaptcha">
                </Col>
            </Row>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="submitForm('loginForm')">登录</Button>
          <div style="font-size: 12px;">Tips:<a href="javascript:void(0)" @click="register()">注册</a>请点击此处</div>
        </FormItem>
      </Form>
    </div>
    <div v-show="!isloginform">
      <registerComp :isloginform="isloginform" @changeIsloginform="changeIsloginform"></registerComp>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import loadingSign from '@/plugins/loadingSign'
import jwtDecode from 'jwt-decode'
import registerComp from '../components/registerComp'

export default {
  name: 'Login',
  data () {
    return {
      isloginform: true,
      // 登录部分
      loginInfo: {
        email: '',
        password: '',
        loginCaptcha: ''
      },
      loginRules: {
        email: [
          { required: true, message: '请输入邮箱号', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码长度不小于六位', trigger: 'blur' }
        ],
        loginCaptcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      // 注册部分
      registerSecret: ''
    }
  },
  methods: {
    // 刷新验证码
    refreshCaptcha () {
      this.$refs.captcha.src = 'http://localhost:3000/api/verification?d=' + Math.random()
    },
    getCookie () {
      var name = 'captcha='
      var captArr = document.cookie.split(';')
      for (let i = 0; i < captArr.length; i++) {
        var capt = captArr[i].trim()
        if (capt.indexOf(name) === 0) {
          return capt.substring(name.length, capt.length)
        }
      }
    },
    submitForm (name) {
      var that = this
      this.$refs[name].validate((valid) => {
        if (valid) {
          loadingSign.start('登录中...')
          setTimeout(() => {
            if (this.loginInfo.loginCaptcha.toLowerCase() === this.getCookie()) {
              that.$axios.post('http://localhost:3000/api/admin/login', this.loginInfo).then(res => {
                if (res) {
                  // 解析token
                  const { token } = res.data
                  localStorage.setItem('adminToken', token)
                  const decoded = jwtDecode(token)
                  // 存储vuex中
                  this.$store.dispatch('setAdminInfo', decoded)
                  this.$store.dispatch('setAdminAuthorization', true)
                  this.$Message.success(`${decoded.email}登录成功`)
                  loadingSign.end()
                  this.$router.push('/home')
                }
              }).catch((err) => {
                this.refreshCaptcha()
                console.log(err)
              })
            } else {
              this.$Message.error('验证码错误，请重新输入')
              loadingSign.end()
              this.refreshCaptcha()
            }
          }, 1000)
          // this.$router.push('/home')
        }
      })
    },
    register () {
      this.$Modal.confirm({
        title: '注册密钥',
        closable: true,
        loading: true,
        render: (h) => {
          return h('Input', {
            props: {
              value: this.registerSecret,
              autofocus: true,
              placeholder: '请输入注册密钥（注册密钥请联系管理员获取)'
            },
            on: {
              input: (val) => {
                this.registerSecret = val
              }
            }
          })
        },
        onOk: () => {
          // 'anbao是注册密钥，表示同意注册'
          if (this.registerSecret.toLowerCase() === 'anbao') {
            this.$Modal.remove()
            this.registerSecret = ''
            this.isloginform = false
          } else {
            this.$Message.error('注册密钥错误')
            setTimeout(() => {
              this.$Modal.remove()
            }, 500)
          }
        }
      })
    },
    changeIsloginform (val) {
      this.isloginform = val
    }
  },
  components: {
    registerComp: registerComp
  },
  mounted () {
  }
}
</script>

<style scope>
.Login {
  width: 100%;
  height: 100%;
  background: url('../assets/img/login_bg1.jpg') no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-container {
  width: 350px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
}
.form-title {
  width: 100%;
  margin: 18px 0 12px 0;
  color: rgb(90, 90, 90);
  font-family: '楷体';
  font-size: 25px;
  border-bottom: 1px solid #ddd;
}
</style>
