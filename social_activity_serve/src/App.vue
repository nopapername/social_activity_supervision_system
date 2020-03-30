<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import jwtDecode from 'jwt-decode'

export default {
  name: 'App',
  data () {
    return {
    }
  },
  created () {
    this.ifLogin()
  },
  methods: {
    ifLogin () {
      if (localStorage.adminToken) {
        var decoded = jwtDecode(localStorage.adminToken)
        this.$store.dispatch('setAdminInfo', decoded)
        this.$store.commit('setAdminAuthorization', true)
      }
    }
  }
}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: calc(100vw - calc(100vw - 100%));
  height: 100vh;
  box-sizing: border-box;
}
</style>
