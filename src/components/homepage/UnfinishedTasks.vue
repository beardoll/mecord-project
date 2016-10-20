<template>
  <div id="unfinishedtasks">
    <table class="am-table tasktable" style="margin:0">
      <!-----------  未完成部分  ---------->
      <tbody>
      <tr>
        <td class="taskamount">总任务数：{{totaltasklength}}</td>
      </tr>
      <tr v-if = !showdetail v-for="taskitem in minunfinishedtasks" track-by="$index">
        <td>
          <div>
            <firstpanel :title="taskitem.title" :creator="taskitem.creator.nickname" :taskstate="unfinishedstate[$index]" :timediff="taskitem.plandateobj[0].countdown"
              :taskindex="$index" :taskid="taskitem.id" :taskprogress="taskitem.progress" :taskamount = "taskamount[$index]"
              :allsubtaskamount = "taskitem.plans.dates.length" :progressname="minprogressname"></firstpanel>
          </div>
          <div style="margin:0;padding:0;background-color:lightyellow">
            <span style="margin:0;padding:0" class="am-icon am-icon-caret-down am-icon-md" @click.stop="expandSecondLayer($event)"></span>
          </div>
          <div style="display:none">
            <secondpanel :tasknote="taskitem.note" :unfinishedlist="taskitem.plandateobj" :finishedlist="taskitem.finishedlist"></secondpanel>
            <!-- unfinishedlist: number（子任务序号）,questionsettile（问卷标题）,countdownstate（倒计时状态，0表示过期，1表示正好今天，2表示明天以后）
                 countdown（倒计时具体天数）-->
            <!-- finishedlist:  number（子任务序号）,questionsettile（问卷标题）-->
          </div>
          <div v-if="$index !== minunfinishedtasklength-1" class="divider"></div>
        </td>
      </tr>
      <tr v-if = showdetail v-for="taskitem in unfinished" track-by="$index">
        <td>
          <div>
            <firstpanel :title="taskitem.title" :creator="taskitem.creator.nickname" :taskstate="unfinishedstate[$index]" :timediff="taskitem.plandateobj[0].countdown"
                        :taskindex="$index" :taskid="taskitem.id" :taskprogress="taskitem.progress" :taskamount = "taskamount[$index]"
                        :allsubtaskamount = "taskitem.plans.dates.length" :progressname="progressname"></firstpanel>
          </div>
          <div style="margin:0;padding:0;background-color:lightyellow">
            <span style="margin:0;padding:0" class="am-icon am-icon-caret-down am-icon-md" @click.stop="expandSecondLayer($event)"></span>
          </div>
          <div style="display:none">
            <secondpanel :tasknote="taskitem.note" :unfinishedlist="taskitem.plandateobj" :finishedlist="taskitem.finishedlist"></secondpanel>
            <!-- unfinishedlist: number（子任务序号）,questionsettile（问卷标题）,countdownstate（倒计时状态，0表示过期，1表示正好今天，2表示明天以后）
                 countdown（倒计时具体天数）-->
            <!-- finishedlist:  number（子任务序号）,questionsettile（问卷标题）-->
          </div>
          <div v-if="$index !== unfinishedtasklength-1" class="divider"></div>
        </td>
      </tr>
      <tr>
        <td v-if="!showdetail" style="font-size:12px;background-color:#9da0a4;cursor:pointer;
                  padding-top:5px;padding-bottom:5px" @click.stop="showdetail=true">查看更多任务</td>
        <td v-if="showdetail" style="font-size:12px;background-color:#9da0a4;cursor:pointer;
                  padding-top:5px;padding-bottom:5px" @click.stop="showdetail=false">收起</td>
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
      }
    }

</style>
<script>
    import firstpanel from './FirstPanel'
    import secondpanel from './SecondPanel'
    export default{
      data () {
        return {
          showdetail: false, // 显示所有任务
          unfinishedstate: [],  // 各个任务的状态，0表示过期，1表示完成日期在将来
          showdropdown: false,
          mintasklength: 2,  // 面板收缩时显示的任务数
          minprogressname: 'minunfinishedprogress',  // 缩小版任务列表的进度条名字
          progressname: 'unfinishedprogress'  // 完整版任务列表的进度条名字
        }
      },
      components: {
        firstpanel,
        secondpanel
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
        this.$dispatch('markunfinishedtask', this.unfinished) // 存放所有未完成的任务
      },
      methods: {
        expandSecondLayer (event) {  // 展开/收起第二层面板
          var target = event.target
          var $td = target.closest('td')
          var secondpanel = $($td).children('div').eq(2)
          secondpanel.toggle()
        }
      }
    }
</script>
