<template>
  <div id="unfinishedtasks">
    <table class="am-table tasktable" style="margin:0">
      <!-----------  未完成部分  ---------->
      <tbody>
      <tr>
        <td class="taskamount">总任务数：{{totaltasklength}}</td>
      </tr>
      <tr v-if = !showdetail v-for="taskindex in minunfinishedtasks" track-by="$index">
        <td>
          <div class="firstpanel">
            <div style="text-align:left" class="am-g">
              <span class="am-u-sm-7" style="margin:0;padding:0">
                <span class="tasktitle"> {{taskindex.title}}</span>
              </span>
              <span class="establisher am-u-sm-5"><span style="margin-right:5px">调查人：{{taskindex.creator.nickname}}</span></span>
            </div>
            <div class="am-g" style="margin-top:10px">
              <div class="am-u-sm-8" style="text-align:left;padding-top:10px;padding-left:0">
                <span class="taskdeadline" v-if="unfinishedstate[$index] === 0">
                  过期：<span style="color:red">{{taskindex.plandateobj[0].countdown}}天</span></span>
                <span class="taskdeadline" v-if="unfinishedstate[$index] === 1 && lefttimeunfinished[$index] > 1">
                  离最近任务剩余：<span style="color:blue">{{lefttimeunfinished[$index]}}天</span></span>
                <span class="taskdeadline" v-if="unfinishedstate[$index] === 1 && lefttimeunfinished[$index] <= 1">
                  离最近任务剩余：<span style="color:red"> {{lefttimeunfinished[$index]}}天</span></span>
              </div>
              <span class="gobutton am-u-sm-4" style="text-align:right"
                    v-if="taskindex.plandateobj[0].countdownstate === 1 || taskindex.plandateobj[0].countdownstate === 0">
                <button class="am-btn am-btn-primary am-radius" @click.stop="goToNav($index,taskindex)">填写</button>
              </span>
              <span class="gobutton am-u-sm-4" style="text-align:right"
                    v-if="taskindex.plandateobj[0].countdownstate === 2">
                <button class="am-btn am-btn-primary am-radius" @click.stop="goToNav($index,taskindex)" disabled = "disabled">填写</button>
              </span>
            </div>
            <div class="am-progress am-progress-striped taskprogress">
              <div class="am-progress-bar am-progress-bar-success" :id="minprogressname+$index">{{taskindex.progress}}/{{taskamount[$index]}}</div>
            </div>
            <div style="margin:0;padding:0">
              <span style="margin:0;padding:0" class="am-icon am-icon-caret-down am-icon-md" @click.stop="expandSecondLayer($event)"></span>
            </div>
          </div>
          <div style="display:none" class="secondpanel">
            <div class="secondpanelcolor">
              <div class="taskdetail">
                {{taskindex.note}}</div>
            </div>
            <table class="am-table tasklist" style="padding:0;margin:0">
              <tbody>
              <tr v-for = "planindex in taskindex.plandateobj" track-by="$index">
                <td class="unfinishedlist am-g">
                  <span class="unfinishednumber am-u-sm-3">序号：{{planindex.number}}</span>
                  <span class="currentdate am-u-sm-5">{{planindex.questionsettitle}}</span>
                  <span v-if="planindex.countdownstate === 1 || planindex.countdownstate === 2" class="lefttime am-u-sm-4">倒计时：<span>{{planindex.countdown}}天</span></span>
                  <span v-if="planindex.countdownstate === 0" class="lefttime am-u-sm-4" style="color:red">已过期：<span>{{planindex.countdown}}天</span></span>
                </td>
              </tr>
              <tr v-for = "planindex in taskindex.finishedlist" track-by="$index">
                <td class="finishedlist am-g">
                  <span class="unfinishednumber am-u-sm-3">序号：{{planindex.number}}</span>
                  <span class="currentdate am-u-sm-5">{{planindex.questionsettitle}}</span>
                  <span class="lefttime am-u-sm-4" style="margin:auto"><span>已完成</span></span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div v-if="$index !== minunfinishedtasklength-1" class="divider"></div>
        </td>
      </tr>
      <tr v-if = showdetail v-for="taskindex in unfinished" track-by="$index">
        <td>
          <div class="firstpanel">
            <div style="text-align:left" class="am-g">
              <span class="am-u-sm-7" style="margin:0;padding:0">
                <span class="tasktitle"> {{taskindex.title}}</span>
              </span>
              <span class="establisher am-u-sm-5"><span style="margin-right:5px">调查人：{{taskindex.creator.nickname}}</span></span>
            </div>
            <div class="am-g" style="margin-top:10px">
              <div class="am-u-sm-8" style="text-align:left;padding-top:10px;padding-left:0">
                <span class="taskdeadline" v-if="unfinishedstate[$index] === 0">
                  过期：<span style="color:red">{{taskindex.plandateobj[0].countdown}}天</span></span>
                <span class="taskdeadline" v-if="unfinishedstate[$index] === 1 && lefttimeunfinished[$index] > 1">
                  离最近任务剩余：<span style="color:blue">{{lefttimeunfinished[$index]}}天</span></span>
                <span class="taskdeadline" v-if="unfinishedstate[$index] === 1 && lefttimeunfinished[$index] <= 1">
                  离最近任务剩余：<span style="color:red"> {{lefttimeunfinished[$index]}}天</span></span>
              </div>
                <span class="gobutton am-u-sm-4" style="text-align:right"
                      v-if="taskindex.plandateobj[0].countdownstate === 1 || taskindex.plandateobj[0].countdownstate === 0">
                  <button class="am-btn am-btn-primary am-radius" @click.stop="goToNav($index,taskindex)">填写</button>
                </span>
                <span class="gobutton am-u-sm-4" style="text-align:right"
                      v-if="taskindex.plandateobj[0].countdownstate === 2">
                  <button class="am-btn am-btn-primary am-radius" @click.stop="goToNav($index,taskindex)" disabled = "disabled">填写</button>
                </span>
            </div>
            <div class="am-progress am-progress-striped taskprogress">
              <div class="am-progress-bar am-progress-bar-success" :id="progressname+$index">{{taskindex.progress}}/{{taskamount[$index]}}</div>
            </div>
            <div style="margin:0;padding:0">
              <span style="margin:0;padding:0" class="am-icon am-icon-caret-down am-icon-md" @click.stop="expandSecondLayer($event)"></span>
            </div>
          </div>
          <div style="display:none" class="secondpanel">
            <div class="secondpanelcolor">
              <div class="taskdetail">
                {{taskindex.note}}</div>
            </div>
            <table class="am-table tasklist" style="padding:0;margin:0">
              <tbody>
              <tr v-for = "planindex in taskindex.plandateobj" track-by="$index">
                <td class="unfinishedlist am-g">
                  <span class="unfinishednumber am-u-sm-3">序号：{{planindex.number}}</span>
                  <span class="currentdate am-u-sm-5">{{planindex.questionsettitle}}</span>
                  <span v-if="planindex.countdownstate === 1 || planindex.countdownstate === 2" class="lefttime am-u-sm-4">倒计时：<span>{{planindex.countdown}}天</span></span>
                  <span v-if="planindex.countdownstate === 0" class="lefttime am-u-sm-4" style="color:red">已过期：<span>{{planindex.countdown}}天</span></span>
                </td>
              </tr>
              <tr v-for = "planindex in taskindex.finishedlist" track-by="$index">
                <td class="finishedlist am-g">
                  <span class="unfinishednumber am-u-sm-3">序号：{{planindex.number}}</span>
                  <span class="currentdate am-u-sm-5">{{planindex.questionsettitle}}</span>
                  <span class="lefttime am-u-sm-4" style="margin:auto"><span>已完成</span></span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div v-if="$index !== unfinishedtasklength-1" class="divider"></div>
        </td>
      </tr>
      <tr>
        <td v-if="!showdetail" style="font-size:12px;background-color:#9da0a4;cursor:pointer;
                  padding-top:5px;padding-bottom:5px" @click.stop="showmore()">查看更多任务</td>
        <td v-if="showdetail" style="font-size:12px;background-color:#9da0a4;cursor:pointer;
                  padding-top:5px;padding-bottom:5px" @click.stop="showless()">收起</td>
      </tr>
      </tbody>
    </table>
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
    #unfinishedtasks {
      width: 100%;
      height: 100%;
      .tasktable {
        tbody tr td{
          margin: 0;
          padding: 0;
        }
        .divider { /* 任务之间有一条分割线 */
          width: 100%;
          height: 1px;
          background-color: #8a6343;
        }

        .taskamount { /* 统计总任务数 */
          font-size: 20px;
          padding-top: 10px;
          padding-bottom: 10px;
          text-align: left;
          padding-left: 5px;
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

        .secondpanel { /* 第二层面板 */
          .secondpanelcolor { /* 任务描述部分*/
            background-color: moccasin;
            .taskdetail { /* 任务描述加边框 */
              margin-top: 0;
              margin-bottom: 0;
              margin-left: auto;
              margin-right: auto;
              padding-left: 0;
              padding-right: 0;
              padding-top: 5px;
              padding-bottom: 5px;
              width: 300px;
              border: dotted 3px silver;
              border-radius: 300px;
            }
          }
          .tasklist { /* 子任务列表 */
            tbody tr td {
              margin: 0;
              padding: 0;
            }
            .unfinishedlist { /* 未完成的子任务背景 */
              background-color: tan;
              padding: 0;
              margin-top: 20px;
              margin-bottom: 20px;
            }
            .finishedlist { /* 已完成的子任务背景 */
              background-color: lightgray;
              margin-top: 0;
              margin-bottom: 0;
              padding: 0;
            }
            .unfinishednumber { /* 子任务的序号（通用） */
              text-align: left;
              float: left;
              font-size: 14px;
              padding-top: 10px;
            }
            .currentdate { /* 现在为问卷类型描述（通用） */
              color: white;
              font-size: 14px;
              padding-left: 0;
              padding-right: 0;
              padding-bottom: 10px;
              padding-top: 10px;
            }
            .lefttime { /* 倒计时（通用） */
              padding-top: 10px;
              float: right;
              font-size: 10px;
              padding-left: 0;
              padding-right: 0;
              span { /* 具体日期外面加个框 */
                padding-left: 10px;
                padding-right: 10px;
                padding-top: 3px;
                padding-bottom: 3px;
                border: solid 1px black;
                border-radius: 5px;
              }
            }
          }
        }
      }
    }

</style>
<script>
    export default{
      data () {
        return {
          showdetail: false, // 显示所有任务
          unfinishedstate: [],
          lefttimeunfinished: [],
          showdropdown: false,
          mintasklength: 2,  // 面板收缩时显示的任务数
          minprogressname: 'minunfinishedprogress',  // 缩小版任务列表的进度条名字
          progressname: 'unfinishedprogress'  // 完整版任务列表的进度条名字
        }
      },
      computed: {
        totaltasklength: function () {  // 总任务数
          return this.$root.userData.tasks.length
        },
        unfinished: function () {  // 未完成任务，计算各个子任务相对于当前日期的剩余日期等信息，以进行显示
          var unfinishedtemp = []
          for (var k = 0; k < this.$root.userData.tasks.length; k++) {
            if (this.$root.userData.tasks[k].status !== 'finished') {
              // “未完成”有“未开始”和“未填写完”两种情况
              unfinishedtemp.push(this.$root.userData.tasks[k])
            }
          }
          for (var i = 0; i < unfinishedtemp.length; i++) {
            var temp = []
            var temp2 = []
            for (var j = 0; j < unfinishedtemp[i].plans.dates.length; j++) {
              // console.log(this.unfinished[i].progress)
              if (j < unfinishedtemp[i].progress) {
                var finishedlist = {}
                finishedlist.questionsettitle = unfinishedtemp[i].submissions[j].questionSet.title
                finishedlist.number = j + 1
                temp2.push(finishedlist)
              } else {
                var sdate = unfinishedtemp[i].startDate  // 任务开始时间
                sdate = new Date(sdate)
                sdate.setDate(sdate.getDate() + unfinishedtemp[i].plans.dates[j])
                var curdate = new Date()
                var msdiff = sdate.getTime() - curdate.getTime() // 当前时间与开始时间的时间差
                var daysdiff = Math.ceil(msdiff / (24 * 3600 * 1000)) // 相差天数
                var includeOuter = {}
                includeOuter.questionsettitle = unfinishedtemp[i].submissions[j].questionSet.title // 当前问卷的标题
                includeOuter.countdown = Math.abs(daysdiff)
                includeOuter.number = j + 1
                if (daysdiff < 0) {
                  includeOuter.countdownstate = 0 // 负数
                } else {
                  if (daysdiff === 0) {
                    includeOuter.countdownstate = 1 // 零
                  } else {
                    includeOuter.countdownstate = 2 // 正数
                  }
                }
                temp.push(includeOuter)
              }
            }
            if (temp[0].countdownstate === 0) {
              this.unfinishedstate.push(0)  // 当前任务的计划日期已过
            } else {
              this.unfinishedstate.push(1)  // 还没有到当前任务的计划日期
            }
            this.lefttimeunfinished.push(temp[0].countdown)
            unfinishedtemp[i].plandateobj = temp
            unfinishedtemp[i].finishedlist = temp2
          }
          return unfinishedtemp
        },
        minunfinishedtasks: function () { // 未完成的任务的缩小版
          var temp = []
          for (var i = 0; i < this.unfinished.length; i++) {
            if (i < this.mintasklength) {
              temp.push(this.unfinished[i])
            }
          }
          return temp
        },
        minunfinishedtasklength: function () { // 未完成任务的缩小版长度（实际，可能比设定的短），用来规划分割线
          return this.minunfinishedtasks.length
        },
        unfinishedtasklength: function () { // 未完成任务的长度，用来规划分割线
          return this.unfinished.length
        },
        taskamount: function () { // 子任务数量，在显示进度条的时候使用
          var temp = []
          for (var i = 0; i < this.unfinished.length; i++) {
            temp.push(this.unfinished[i].plans.dates.length)
          }
          return temp
        }
      },
      ready: function () {
        this.showminProgress()  // 初始化进度条（缩小版任务的进度条）
      },
      methods: {
        goToNav (index, taskindex) { // 去填写问卷
          this.$dispatch('changetaskindex', index)  // 存放当前任务的下标
          this.$dispatch('markunfinishedtask', this.unfinished) // 存放所有未完成的任务
          this.$dispatch('realtaskid', taskindex.id)  // 存放当前任务的id
          console.log(this.$root.currenttaskindex)
          this.$router.go('/navigation')
        },
        expandSecondLayer (event) {  // 展开/收起第二层面板
          var target = event.target
          var $td = target.closest('td')
          var firstpanel = $($td).children('div').eq(1)
          var secondpanel = $($td).children('div').eq(2)
          secondpanel.toggle()
          firstpanel.toggle()
          if (secondpanel.css('display') !== 'none') {
            secondpanel.toggle()
          }
        },
        showminProgress () {  // 展示进度条函数（缩小版）
          for (var i = 0; i < this.minunfinishedtasks.length; i++) {
            $('#minunfinishedprogress' + i).css('width', (this.unfinished[i].progress) / this.unfinished[i].plans.dates.length * 100 + '%')
          }
        },
        showmaxProgress () { // 展示进度条函数（完整版）
          for (var i = 0; i < this.unfinished.length; i++) {
            $('#unfinishedprogress' + i).css('width', (this.unfinished[i].progress) / this.unfinished[i].plans.dates.length * 100 + '%')
          }
        },
        showmore () {  // 展示完整的任务
          this.showdetail = true
          this.$nextTick(function () {
            this.showmaxProgress()
          })
        },
        showless () {  // 展示部分任务
          this.showdetail = false
          this.$nextTick(function () {
            this.showminProgress()
          })
        }
      }
    }
</script>
