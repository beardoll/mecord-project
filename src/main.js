import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueRouter)
Vue.use(VueResource)

var router = new VueRouter()

router.map({
  '/selfmaterial': {
    component: function (resolve) {
      require(['./components/mine/SelfMaterial'], resolve)
    }
  },
  '/navigation': {
    component: function (resolve) {
      require(['./components/Answers/Navigation'], resolve)
    }
  },
  '/answer': {
    component: function (resolve) {
      require(['./components/Answers/Answer'], resolve)
    }
  },
  '/gate': {
    component: function (resolve) {
      require(['./components/login/Gate'], resolve)
    }
  },
  '/preview': {
    component: function (resolve) {
      require(['./components/Answers/Preview'], resolve)
    }
  },
  '/modification': {
    component: function (resolve) {
      require(['./components/Answers/Modification'], resolve)
    }
  },
  '/outer': {
    component: function (resolve) {
      require(['./components/homepage/Outer'], resolve)
    }
  },
  '/outline': {
    component: function (resolve) {
      require(['./components/Outline'], resolve)
    }
  },
  '/review': {
    component: function (resolve) {
      require(['./components/Answers/Review'], resolve)
    }
  },
  '/addtask': {
    component: function (resolve) {
      require(['./components/homepage/AddTask'], resolve)
    }
  },
  '/withdrawtask': {
    component: function (resolve) {
      require(['./components/homepage/WithdrawTask'], resolve)
    }
  },
  '/taskdetail': {
    component: function (resolve) {
      require(['./components/homepage/TaskDetail'], resolve)
    }
  },
  '/settask': {
    component: function (resolve) {
      require(['./components/homepage/SetTask'], resolve)
    }
  }
})

router.redirect({  // 定义全局的重定向规则，全局的重定向会在匹配当前路径之前执行
  // '*': '/userinterface/:0' // 重定向任意未匹配路径到/demo
  // '*': '/demo'
  // '*': '/answer/:1'
  // '*': '/navigation/:1'
  '*': '/gate'
  // '*': 'outer'
  // '*': '/addtask'
  // '*': '/withdrawtask'
})

router.start(App, 'app')
/* eslint-disable no-new */
/* new Vue({
  el: 'body',
  components: { App }
}) */
