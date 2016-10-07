<template>
    <div id="gate">
    </div>
</template>
<style>
    #gate{
        background-color: white;
        background-image: url("../assets/schoolgate.jpg");
        background-repeat: no-repeat;
        background-size: 100%;
    }
</style>
<script>
  var qs = require('querystring')
  export default {
    created: function () {
      let params = qs.parse(window.location.href.split('?')[1])
      if (params.code) {
        this.$http.get('http://mecord.cn:3000/api/MecordUsers/wxLogin?code=' + params.code)
          .then((response) => {
            console.log('登录成功！')
            this.$root.login(response.body.data)
          }, (response) => {
            console.log('bad!')
            // this.$router.go('navigation/:0')
          })
          // this.$router.go('userinterface/:0')
      }
    }
/*    ready: function () {
      console.log('begin login!')
      this.$root.login('LVsy17Tx0nKNEewIXbA46g4MFXVlvUKLb7j4qA4jfp13bYzR1HSCktcYmQ3yn8Jo')
      this.$root.loadClientDate()
    }*/
  }
</script>
x
