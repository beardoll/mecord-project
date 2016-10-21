<template>
    <div id="gate">
      <div id="tipsword">
        <i class="am-icon-spinner am-icon-md am-icon-spin"></i>
        <p style="font-size:16px">页面加载中</p>
      </div>
    </div>
</template>
<style>
    #gate{
        background-color: white;
        background-repeat: no-repeat;
        background-size: 100%;
    }
    #tipsword{
      width: 70%;
      text-align: center;
      margin: auto;
      margin-top: 200px;
    }
</style>
<script>
/*  var qs = require('querystring')*/
  export default {
/*    created: function () {
      let params = qs.parse(window.location.href.split('?')[1])
      if (params.code) {
        this.$http.get('https://api.mecord.cn/api/MecordUsers/wxLogin?code=' + params.code)
          .then((response) => {
            console.log('登录成功！')
            this.$root.login(response.body.data)
          }, (response) => {
            console.log('bad!')
            // this.$router.go('navigation/:0')
          })
          // this.$router.go('userinterface/:0')
      }
    }*/
    ready: function () {
      console.log('begin login!')
      this.$root.login('VYG8ka7v7xJXFvGQtfe0ZfzWovTNssLsI1Jh13pCfO4jJfJcgU2qMNTfZLlbFUAA')
      this.$root.loadClientDate()
    }
  }
</script>
x
