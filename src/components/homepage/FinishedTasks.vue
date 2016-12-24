<template>
  <table class="am-table finishedtasktable am-table-bordered">
    <!-----------  已完成部分  ---------->
    <tbody>
      <tr v-for="taskindex in finished" track-by="$index">
        <td>
          <div class="finfirstpanel">
            <div class = "am-g" style="margin:0;padding:0">
<!--              <span class="am-u-sm-7" style="margin:0;padding:0;text-align:left">
                <span class="fintasktitle">{{taskindex.title}}</span>
              </span>-->
              <span class="am-u-sm-7 fintasktitle">{{taskindex.title}}</span>
              <span class="am-u-sm-5 fincreator">调查人：{{taskindex.creator.nickname}}</span>
            </div>
            <div class="taskstatus">
              任务状态:<span style="font-size: 16px; color: royalblue" v-if="taskindex.status === 'finished'">[已完成]</span>
              <span style="font-size: 16px; color: crimson" v-if="taskindex.status === 'ended'">[中途放弃]</span>
            </div>
            <div class="finsubmitdates">完成日期：{{submitdate[$index]}}</div>
          </div>
          <div v-if="$index !== finishedtasklength-1" class="divider"></div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<style lang="scss">
    body{
        background-color: white;
    }
    .finishedtasktable {
      margin: 0;
      padding: 0;
      tbody tr td{
        background-color: white;
        margin: 0;
        padding: 0; /* 上右下左 */
      }
      /* 任务之间有分割线 */
      .divider {
        width: 100%;
        height: 1px;
        background-color: #8a6343;
      }
      .finfirstpanel {
        margin: 0 0 10px 0;
        padding: 0;
        /*   任务标题   */
        .fintasktitle {
          font-size: 20px;
          text-align: left;
          margin: 0 0 0 0;
          padding: 0 0 0 5px;
          color: darkblue;
          font-family: 微软雅黑;
        }
        /* 问卷创建人 */
        .fincreator {
          text-align: right;
          margin: 10px 0 0 0;
          padding: 0 5px 0 0;
          color: black;
          font-size: 12px;
        }
        /* 问卷状态 */
        .taskstatus {
          padding: 15px 0 0 5px;
          font-size: 16px;
          text-align: left;
        }
        /*  完成的日期 */
        .finsubmitdates {
          text-align: left;
          color: black;
          margin: 0;
          padding: 15px 0 0 5px;
          font-size: 14px;
        }
      }
    }
</style>
<script>
    export default{
      data () {
        return {
        }
      },
      computed: {
        finished: function () { // 已完成问卷
          var temp = []
          for (var i = 0; i < this.$root.userData.tasks.length; i++) {
            if (this.$root.userData.tasks[i].status === 'finished' || this.$root.userData.tasks[i].status === 'ended') {
              // 已完成问卷分为“已完成”和“中途放弃”两种
              console.log(this.$root.userData.tasks[i].status)
              temp.push(this.$root.userData.tasks[i])
            }
          }
          return temp
        },
        finishedtasklength: function () {  // 已完成任务的数量，用来画分割线
          return this.finished.length
        },
        submitdate: function () {
          // 该任务完成日期，内含day, month和year三个属性
          var temp = []
          var sdate, temp1, day, month, year
          for (var i = 0; i < this.finished.length; i++) {
            sdate = this.finished[i].submissions[this.finished[i].submissions.length - 1].submitDate
            sdate = new Date(sdate)
            day = sdate.getDate()
            month = sdate.getMonth() + 1
            year = sdate.getFullYear()
            temp1 = year + '年' + month + '月' + day + '日'
            temp.push(temp1)
          }
          return temp
        }
      }
    }
</script>
