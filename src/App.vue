<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      accesstoken: [],
      userData: [],  // 此处存放用户的个人资料以及tasks, questionSet数据,创建者
      curtask: '',   // 当前编辑的task
      currentanswer: [],      // 当前问卷的答案
      editindex: [],   // 当前修改答案的题目在问卷中的下标
      wxsignature: '',  // 微信签名，在顶级component获取
      curquestionset: '' // 当前问卷，可索引到questions一层
    }
  },
  computed: {

  },
  ready: function () {
  },
  events: {
    'markcurtask': function (item) {
      // 当前操作的任务
      // dispatched from: FirstPanel.vue -> goToNav()
      this.curtask = item
    },
    'markcurquestionset': function (item) {
      // 当前问卷
      // dispatched from: Navigation.vue -> goToFill()
      //                  SecondPanel.vue -> review()
      this.curquestionset = item
    },
    'saveanswer': function (item) {
      // 保存现在已经完成的答案
      // dispatched from: Answer.vue -> preview()
      //                  SecondPanel.vue -> review()
      this.currentanswer = item
    },
    'seteditindex': function (index) {
      // 当前修改答案的题目在问卷中的下标
      // dispatched from: Preview.vue -> edit(index)
      this.editindex = index
    },
    'editanswer': function (item) {
      // 修改后的新答案
      // dispatched from: Modification.vue -> validModification()
      this.currentanswer[this.editindex] = item
    }
  },
  methods: {
    login: function (wxurl, data) {
      this.accesstoken.userId = data.userId
      this.accesstoken.id = data.id
/*      this.accesstoken.id = data
      this.accesstoken.userId = 1*/
      var geturl = 'https://api.mecord.cn/api/CoreModels/getJsConfig?url=' + wxurl
      this.$http.get(geturl).then((response) => {
        this.wxsignature = response.body
      }, (response) => {
        console.log('cannot get signature')
        window.alert('cannot get signature')
      })
      process.nextTick(this.loadClientDate())
    },
    loadClientDate () {
      this.$http.get('https://api.mecord.cn/api/MecordUsers/' + this.accesstoken.userId + '?filter=%7B%22include%22%3A%20%7B%22tasks%22%3A%20%7B%22submissions%22%3A%22questionSet%22%7D%7D%7D&access_token=' +
        this.accesstoken.id).then((response) => {
          // 只取到questionSet那一层
          console.log('successfully!')
          this.$set('userData', response.body)
          this.$router.go('/outline')
          // console.log(response.body)
          // this.$router.go('/modification')
          console.log(JSON.stringify(this.userData))
          // this.$router.go('/preview')
        }, (response) => {
          console.log('error!')
        })
    }
  }
}
</script>

<style>
  html {
    height: 100%;
  }

  body {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  #app {
    color: #2c3e50;
    width: 100%;
    height: 100%;
  /*  margin-top: 300px;
    max-width: 600px; */
    font-family: Source Sans Pro, Helvetica, sans-serif;
    text-align: center;
  }

  #app a {
    color: #42b983;
    text-decoration: none;
  }
</style>
