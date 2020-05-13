<template>
  <div class="addNewManager">
    <div class="form-container">
      <Icon type="md-close" style="position: relative; left: 46%; cursor: pointer; margin-top: 5px" size="20" @click="closeThisForm" />
      <h2 class="form-title">添加新用户</h2>
      <Form ref="registerForm" :model="registerInfo" :rules="registerRules">
        <FormItem prop="registerEmail">
          <Input type="text" placeholder="邮箱" v-model="registerInfo.registerEmail">
            <Icon type="ios-person-outline" slot="prefix"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="registerPassword">
          <Input type="password" placeholder="密码" v-model="registerInfo.registerPassword">
            <Icon type="ios-lock-outline" slot="prefix"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="confirmPassword">
            <Input type="password" placeholder="确认密码" v-model="confirmPassword">
              <Icon type="ios-lock-outline" slot="prefix"></Icon>
            </Input>
          </FormItem>
        <FormItem>
          <Button type="primary" @click="submitRegister('registerForm')">添加</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import loadingSign from '@/plugins/loadingSign'
import { mapGetters } from 'vuex'
export default {
  name: 'addNewManager',
  data () {
    const validateConfirmPassword = (rule, value, callback) => {
      if (this.registerInfo.registerPassword !== this.confirmPassword) {
        callback(new Error('两次密码不相同'))
      } else {
        callback()
      }
    }
    return {
      registerInfo: {
        registerEmail: '',
        registerPassword: ''
      },
      confirmPassword: '',
      registerRules: {
        registerEmail: [
          { required: true, message: '请输入邮箱号', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱号', trigger: 'blur' }
        ],
        registerPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码长度不小于六位', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, validator: validateConfirmPassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    closeThisForm () {
      this.$emit('changeIsloginform', false)
    },
    submitRegister (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          loadingSign.start('注册中...')
          setTimeout(() => {
            this.$axios.post('http://localhost:3000/api/admin/register', this.registerInfo).then((res) => {
              if (res.status === 200) {
                this.registerInfo = {
                  registerEmail: '',
                  registerPassword: ''
                }
                this.confirmPassword = ''
                this.$Message.success({
                  content: '添加新用户成功'
                })
                loadingSign.end()
                this.$emit('changeIsloginform', false)
                this.submitOperating(this.adminInfo.email, this.adminInfo.role, `添加了${this.registerInfo.registerEmail}用户`)
              }
            }).catch((err) => {
              console.log(err)
            })
          }, 900)
        }
      })
    }
  },
  computed: {
    ...mapGetters(['adminInfo'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.addNewManager {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-container {
  width: 350px;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
}
.form-title {
  margin-top: 0;
  margin-bottom: 10px;
  width: 100%;
  color: rgb(0, 0, 0);
  font-size: 20px;
  border-bottom: 1px solid #ddd;
}
</style>
