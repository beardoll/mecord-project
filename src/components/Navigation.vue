<template>
    <div id="navigation">
<!--      <div class="navheader">
        <div class="am-u-sm-3">
          <img src="../assets/left-arrow.png" style="cursor:pointer;width:35px;height:35px;margin-top:1%"
          @click.stop="backToFrontPage()">
        </div>
        <div class="am-u-sm-6 am-u-end" id="dropdownhead" style="text-align:center;
        font-size:24px;color:white;margin-top:0.5%">
          Mecord
        </div>
      </div>-->
      <div class="navbody">
        <img src="../assets/hospital.jpg" style="margin:auto" id="logo">
          <hr data-am-widget="divider" style="width:70%;margin-left:auto;margin-right:auto;margin-top:10px" class="am-divider am-divider-default" />
        <p style="font-size:28px">{{title}}</p>
          <hr data-am-widget="divider" style="width:70%;margin:auto" class="am-divider am-divider-dotted" />
        <h5>{{description}}</h5>
        <button type="button" class="am-btn am-btn-lg am-btn-primary am-radius"
                style="margin-top:40px" @click.stop="goToFill()">开始</button>
      </div>
    </div>
</template>
<style>
    body{
        background-color: white;
    }
    #navigation{
      background-color: white;
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
    data () {
      return {
      }
    },
    ready: function () {
      var logowidth = $('#logo').width()
      var logoheight = $('#logo').height()
      var ratio = logoheight / logowidth
      var maxwidth = 160
      $('#logo').css('width', maxwidth + 'px')
      $('#logo').css('height', maxwidth * ratio + 'px')
    },
    computed: {
      title: function () {
        return this.$root.rootunfinished[this.$root.currenttaskindex].submissions[this.$root.progress[this.$root.currenttaskindex]].questionSet.title
      },
      description: function () {
        return this.$root.rootunfinished[this.$root.currenttaskindex].submissions[this.$root.progress[this.$root.currenttaskindex]].questionSet.description
      }
    },
    methods: {
      goToFill () {
        this.$router.go('/answer')
      },
      backToFrontPage () {
        this.$router.go('/userinterface/:0')
      }
    },
    route: {
      data: function (transition) {
        transition.next()
      }
    }
  }
</script>
