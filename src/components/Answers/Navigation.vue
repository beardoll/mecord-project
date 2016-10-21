<template>
    <div id="navigation">
      <div class="navbody">
        <img src="../../assets/hospital.jpg" style="margin:auto" id="logo">
          <hr data-am-widget="divider" style="width:70%;margin-left:auto;margin-right:auto;margin-top:10px" class="am-divider am-divider-default" />
        <p style="font-size:28px">{{title}}</p>
          <hr data-am-widget="divider" style="width:70%;margin:auto" class="am-divider am-divider-dotted" />
        <h5>{{description}}</h5>
        <button type="button" class="am-btn am-btn-lg am-btn-primary am-radius"
                style="margin-top:40px" @click.stop="goToFill()">开始</button>
      </div>
    </div>
</template>
<style lang="scss">
    body{
        background-color: white;
    }
    #navigation{
      background-color: white;
      margin-top: 0px;
      width: 100%;
      height: 100%;
      padding-bottom: 0px;
      .navbody{
        width: 100%;
        height: 80%;
        padding-top: 10px;
      }
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
    created: function () {  // 在此处加载submissions数据

    },
    computed: {
      title: function () {
        return this.$root.curtask.submissions[this.$root.curtask.progress].questionSet.title
      },
      description: function () {
        return this.$root.curtask.submissions[this.$root.curtask.progress].questionSet.description
      },
      questionsetid: function () {
        return this.$root.curtask.plans.questionSets[this.$root.curtask.progress]
      }
    },
    methods: {
      goToFill () {  // 点击开始按钮的时候，加载问卷下所有的问题
        var questionseturl = 'https://api.mecord.cn/api/QuestionSets/' + this.questionsetid + '?filter=%7B%22include%22%3A%22questions%22%7D'
        this.$http.get(questionseturl).then((response) => {
          // console.log(JSON.stringify(response.body))
          this.$dispatch('markcurquestionset', response.body)
          this.$router.go('/answer')
        }, (response) => {
          console.log('cannot get questions!')
        })
      }
    },
    route: {
      data: function (transition) {
        transition.next()
      }
    }
  }
</script>
