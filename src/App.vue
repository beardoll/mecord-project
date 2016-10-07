<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import Demo from './components/Demo'

export default {
  data () {
    return {
      accesstoken: [],
      userData: [],  // 此处存放用户的个人资料以及tasks, questionSet数据,创建者
      currenttaskindex: '', // 当前任务的下标（相对于unfinished任务）
      currentrealtaskid: '', // 当前任务的id
      rootunfinished: [],
      currentanswer: [], // 当前问卷的答案
      editindex: [], // 当前修改答案的题目（在题目预览之后）
      progress: []  // 各个未完成任务的进度
    }
  },
  computed: {

  },
  events: {
    'changetaskindex': function (index) {
      // 改变任务的下标
      this.currenttaskindex = index
    },
    'markunfinishedtask': function (item) {
      // 当前所有未完成的任务
      this.rootunfinished = item
      var temp = []
      for (var i = 0; i < item.length; i++) {
        temp.push(item[i].progress)
      }
      this.progress = temp
    },
    'realtaskid': function (index) {
      // 当前任务在总任务中的真实id
      this.currentrealtaskid = index
    },
    'saveanswer': function (item) {
      this.currentanswer = item
    },
    'seteditindex': function (index) {
      this.editindex = index
    },
    'editanswer': function (item) {
      this.currentanswer[this.editindex] = item
    }
  },
  methods: {
    login: function (data) {
/*      this.accesstoken.userId = data.userId
      this.accesstoken.id = data.id*/
      this.accesstoken.id = data
      this.accesstoken.userId = 1
      process.nextTick(this.loadClientDate())
    },
    loadClientDate () {
      this.$http.get('http://api.mecord.cn/api/MecordUsers/' + this.accesstoken.userId + '?filter=%7B%22include%22%3A%7B%22tasks%22%3A%5B%22creator%22%2C%7B%22submissions%22%3A%7B%22questionSet%22%3A%22questions%22%7D%7D%5D%7D%7D&access_token=' +
        this.accesstoken.id).then((response) => {
          this.$set('userData', response.body)
          // console.log(response.body)
          // console.log('http://mecord.cn:3000/api/MecordUsers/' + this.accesstoken.userId + '?filter=%7B%22include%22%3A%7B%22tasks%22%3A%5B%22creator%22%2C%22questionSet%22%5D%7D%7D&access_token=' +
          // this.accesstoken.id)
          // this.$router.go('/modification')
          // console.log(JSON.stringify(this.userData))
          this.$router.go('/userinterface/:0')
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
