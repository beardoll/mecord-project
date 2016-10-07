<template>
  <div id="navigation">
    <div class="navheader">
      <div class="am-u-sm-3">
        <img src="../assets/left-arrow.png" style="cursor:pointer;width:100px;height:40px">
      </div>
      <div class="am-u-sm-6 am-u-end" id="dropdownhead" style="text-align:center;font-size:20px;color:white">
        Mecord
      </div>
    </div>
    <div class="navbody">
      <img src="../assets/tsinghua.gif" style="width:20%;height:40%;margin:auto">
      <hr data-am-widget="divider" style="width:60%" class="am-divider am-divider-dotted" />
      <p style="font-size:28px">感冒健康问卷</p>
      <hr data-am-widget="divider" style="width:60%" class="am-divider am-divider-dashed" />
      <h5>请您务必每天填写</h5>
      <button type="button" class="am-btn am-btn-lg am-btn-primary am-radius"
              style="margin-top:40px">开始</button>
    </div>
  </div>
</template>
<style>
  body{
    background-color: white;
  }
  #navigation{
    margin-top: 0px;
    width: 100%;
    height: 100%;
    padding-bottom: 0px;
  }
  #navigation .navheader{
    width: 100%;
    height: 10%;
    padding-top: 10px;
    background-color: dodgerblue;
  }
  #navigation .navbody{
    width: 100%;
    height: 80%;
    padding-top: 10px;
  }
</style>
<script>
  export default{
/*    data () {
      return {
        taskID: ''
      }
    },*/
    methods: {
      goToFill () {
        this.$router.go('/answer/:taskID')
      }
    }
/*    route: {
      data: function (transition) {
        transition.next(
          {
            taskID: parseInt(transition.to.params.tabIndex.substring(1))
          }
        )
      }
    } */
  }
</script>
