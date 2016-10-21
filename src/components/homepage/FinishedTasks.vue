<template>
  <table class="am-table finishedtasktable am-table-bordered">
    <!-----------  已完成部分  ---------->
    <tbody>
    <tr v-for="taskindex in finished" track-by="$index">
      <td>
        <div class="finfirstpanel">
          <div class="fintasktitle">{{taskindex.title}}</div>
          <div class="finisheddate">{{taskindex.submissions[taskindex.submissions.length-1].submitDate}}</div>
        </div>
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
      margin:0;
      tbody tr td{
        background-color: lightyellow;
      }
      /*   任务标题   */
      .fintasktitle {
        font-size: 20px;
        text-align: left;
        color: #0f9ae0;
      }
      /*  完成的日期 */
      .finisheddate{
        text-align: left;
        color: gray;
        margin-top: 20px;
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
            if (this.$root.userData.tasks[i].status === 'finished') {
              temp.push(this.$root.userData.tasks[i])
            }
          }
          return temp
        }
      }
    }
</script>
