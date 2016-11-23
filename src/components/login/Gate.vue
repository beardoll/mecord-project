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
  var qs = require('querystring')
  export default {
    created: function () {
      let params = qs.parse(window.location.href.split('?')[1])
      if (params.code) {
        this.$http.get('https://api.mecord.cn/api/MecordUsers/wxLogin?code=' + params.code)
          .then((response) => {
            console.log('登录成功！')
            var wxurl = window.location.href.split('#')[0]
            wxurl = encodeURIComponent(wxurl)
            this.$root.login(wxurl, response.body.data)
          }, (response) => {
            console.log('bad!')
          })
      }
    }
/*    ready: function () {
      console.log('begin login!')
      var wxurl = window.location.href.split('#')[0]
      wxurl = encodeURIComponent(wxurl)
      this.$root.login(wxurl, 'jb4UA2eu6A2l2x4ZzkS5GE6j6YfUw4nU9Fp6tvsFnwQMMiatKRP7GFlLknU6tPqn')
    }*/
  }
</script>
