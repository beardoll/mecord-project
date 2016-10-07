import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueRouter)
Vue.use(VueResource)

var router = new VueRouter()

router.map({
  '/interface': {
    component: function (resolve) {
      require(['./components/Interface'], resolve)
    }
  },
  '/demo': {
    component: function (resolve) {
      require(['./components/Demo'], resolve)
    }
  },
  '/edit': {
    component: function (resolve) {
      require(['./components/Edit'], resolve)
    }
  },
  '/create': {
    component: function (resolve) {
      require(['./components/Create'], resolve)
    }
  },
  '/login': {
    component: function (resolve) {
      require(['./components/Login'], resolve)
    }
  },
  '/userinterface/:tabIndex': {
    component: function (resolve) {
      require(['./components/UserInterface'], resolve)
    }
  },
  '/selfmaterial': {
    component: function (resolve) {
      require(['./components/SelfMaterial'], resolve)
    }
  },
  '/mainpage': {
    component: function (resolve) {
      require(['./components/MainPage'], resolve)
    }
  },
  './qnheader': {
    component: function (resolve) {
      require(['./components/Qnheader'], resolve)
    }
  },
  '/navigation': {
    component: function (resolve) {
      require(['./components/Navigation'], resolve)
    }
  },
  '/answer': {
    component: function (resolve) {
      require(['./components/Answer'], resolve)
    }
  },
  '/navigationpre': {
    component: function (resolve) {
      require(['./components/NavigationPre'], resolve)
    }
  },
  '/gate': {
    component: function (resolve) {
      require(['./components/Gate'], resolve)
    }
  },
  '/preview': {
    component: function (resolve) {
      require(['./components/Preview'], resolve)
    }
  },
  '/modification': {
    component: function (resolve) {
      require(['./components/Modification'], resolve)
    }
  }
})

router.redirect({  // 定义全局的重定向规则，全局的重定向会在匹配当前路径之前执行
  // '*': '/userinterface/:0' // 重定向任意未匹配路径到/demo
  // '*': '/demo'
  // '*': '/answer/:1'
  // '*': '/navigation/:1'
  '*': '/gate'
})

router.start(App, 'app')

/* eslint-disable no-new */
/* new Vue({
  el: 'body',
  components: { App }
}) */
