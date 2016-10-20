<template>
  <div class="firstpanel">
    <div style="text-align:left" class="am-g">
              <span class="am-u-sm-7" style="margin:0;padding:0">
                <span class="tasktitle"> {{title}}</span>
              </span>
      <span class="establisher am-u-sm-5"><span style="margin-right:5px">调查人：{{creator}}</span></span>
    </div>
    <div class="am-g" style="margin-top:10px">
      <div class="am-u-sm-8" style="text-align:left;padding-top:10px;padding-left:0">
        <span class="taskdeadline" v-if="taskstate === 0">
          过期：<span style="color:red">{{timediff}}天</span></span>
        <span class="taskdeadline" v-if="taskstate === 1 && timediff > 1">
          离最近任务剩余：<span style="color:blue">{{timediff}}天</span></span>
        <span class="taskdeadline" v-if="taskstate === 1 && timediff <= 1">
          离最近任务剩余：<span style="color:red"> {{timediff}}天</span></span>
      </div>
        <span class="gobutton am-u-sm-4" style="text-align:right"
              v-if="taskstate === 0 || taskstate === 1 && timediff === 0">
          <button class="am-btn am-btn-primary am-radius" @click.stop="goToNav(taskindex, taskid)">填写</button>
        </span>
        <span class="gobutton am-u-sm-4" style="text-align:right"
              v-if="taskstate === 1 && timediff >= 1">
          <button class="am-btn am-btn-primary am-radius" @click.stop="goToNav(taskindex, taskid)" disabled = "disabled">填写</button>
        </span>
    </div>
    <div class="am-progress am-progress-striped taskprogress">
      <div class="am-progress-bar am-progress-bar-success" :id="progressname+taskindex">{{taskprogress}}/{{taskamount}}</div>
    </div>
  </div>
</template>
<style lang="less">
  body{
    background-color:white;
  }
  *{
    padding: 0;
    margin: 0;
  }
  .firstpanel { /* 第一层面板 */
    background-color: lightyellow;
    margin: 0;
    padding: 0;
    .tasktitle { /*   任务标题   */
      font-size: 20px;
      color: blue;
      margin-left: 5px;
      padding: 0;
    }
    .establisher { /* 创建者 */
      color: black;
      font-size: 12px;
      text-align: right;
      margin-top: 10px;
      margin-right: 0px;
    }
    .taskdeadline { /* 任务剩余天数 */
      text-align: left;
      font-size: 12px;
      padding-left: 0px;
      margin-bottom: 5px;
      margin-left: 7px;
      margin-top: 10px;
      span { /* 具体天数上加个椭圆边框 */
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 5px;
        padding-bottom: 5px;
        border: solid 1px black;
        border-radius: 5px;
        text-align: left;
      }
    }
    .gobutton { /* 填写按钮的样式 */
      padding-top: 5px;
      font-size: 12px;
      color: blue;
      padding-right: 5px;
      button {
        margin-right: 10px;
      }
    }
    .taskprogress { /* 任务进度条 */
      background-color: lightyellow;
      padding-top: 0;
      padding-bottom: 0;
      margin-bottom: 0;
      margin-top: 20px;
    }
  }
</style>
<script>
    export default{
      props: ['title', 'creator', 'taskstate', 'timediff', 'taskindex', 'taskid', 'taskprogress',
        'taskamount', 'allsubtaskamount', 'progressname'],
      // taskstate: 0表示当前任务已过期，1表示任务在今天或者将来
      // timediff: 最近任务与当前的时间差，取绝对值
      // taskindex: 当前任务在unfinished任务列表中的下标
      // taskid: 当前任务的id
      // taskprogress: 当前任务的进度
      data () {
        return {
        }
      },
      ready: function () {
        this.showProgress()
      },
      methods: {
        goToNav (taskindex, taskid) { // 去填写问卷
          this.$dispatch('changetaskindex', taskindex)  // 存放当前任务的下标（相对于unfinishedtasks）
          this.$dispatch('realtaskid', taskid)  // 存放当前任务的id
          this.$router.go('/navigation')
        },
        showProgress () {
          $('#' + this.progressname + this.taskindex).css('width', this.taskprogress / this.allsubtaskamount * 100 + '%')
        }
      }
    }
</script>
