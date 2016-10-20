<template>
  <div class="secondpanel">
    <div class="secondpanelcolor">
      <div class="taskdetail">
        {{tasknote}}</div>
    </div>
    <table class="am-table tasklist" style="padding:0;margin:0">
      <tbody>
      <tr v-for = "planitem in unfinishedlist" track-by="$index">
        <td class="unfinishedlist am-g">
          <span class="unfinishednumber am-u-sm-3">序号：{{planitem.number}}</span>
          <span class="currentdate am-u-sm-5">{{planitem.questionsettitle}}</span>
          <span v-if="planitem.countdownstate === 1 || planitem.countdownstate === 2" class="lefttime am-u-sm-4">倒计时：<span>{{planitem.countdown}}天</span></span>
          <span v-if="planitem.countdownstate === 0" class="lefttime am-u-sm-4" style="color:red">已过期：<span>{{planitem.countdown}}天</span></span>
        </td>
      </tr>
      <tr v-for = "planitem in finishedlist" track-by="$index">
        <td class="finishedlist am-g">
          <span class="unfinishednumber am-u-sm-3">序号：{{planitem.number}}</span>
          <span class="currentdate am-u-sm-5">{{planitem.questionsettitle}}</span>
          <span class="lefttime am-u-sm-4" style="margin:auto"><span>已完成</span></span>
        </td>
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
</style>
<script>
    export default{
      props: ['tasknote', 'unfinishedlist', 'finishedlist'],
      data () {
        return {
        }
      }
    }
</script>
