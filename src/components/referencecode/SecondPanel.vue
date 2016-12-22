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
        <td class="finishedlist am-g" @click.stop="review($index)">
          <span class="unfinishednumber am-u-sm-3">序号：{{planitem.number}}</span>
          <span class="currentdate am-u-sm-5">{{planitem.questionsettitle}}</span>
          <span class="lefttime am-u-sm-4" style="margin:auto"><span>已完成</span></span>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<style lang="scss">
  body{
    background-color:white;
  }
  *{
    padding: 0;
    margin: 0;
  }
  .secondpanel { /* 第二层面板 */
    /* 任务描述部分*/
    .secondpanelcolor {
      background-color: moccasin;
      .taskdetail { /* 任务描述加边框 */
        margin: 0 auto;  /* 上下 左右 */
        padding: 5px 0 5px 0;
        width: 300px;
        border: dotted 3px silver;
        border-radius: 300px;
      }
    }
    /* 子任务列表 */
    .tasklist {
      tbody tr td {
        margin: 0;
        padding: 0;
      }
      /* 未完成的子任务背景 */
      .unfinishedlist {
        background-color: tan;
        padding: 0;
        margin: 20px 0;
      }
      /* 已完成的子任务背景 */
      .finishedlist {
        background-color: lightgray;
        margin: 0;
        padding: 0;
      }
      /* 子任务的序号（通用） */
      .unfinishednumber {
        text-align: left;
        float: left;
        font-size: 14px;
        padding: 10px 0 0 10px;
      }
      /* 现在为问卷类型描述（通用） */
      .currentdate {
        color: white;
        font-size: 14px;
        padding: 10px 0;
      }
      /* 倒计时（通用） */
      .lefttime {
        float: right;
        font-size: 10px;
        padding: 12px 0 0 0;
        span { /* 具体日期外面加个框 */
          padding: 3px 10px;
          border: solid 1px black;
          border-radius: 5px;
        }
      }
    }
  }
</style>
<script>
    export default{
      props: ['taskitem'],
      data () {
        return {
        }
      },
      computed: {
        tasknote: function () {
          return this.taskitem.note
        },
        unfinishedlist: function () {
          return this.taskitem.unfinishedlist
        },
        finishedlist: function () {
          return this.taskitem.finishedlist
        }
      },
      methods: {
        review (index) {
          var cursubmissionid = this.finishedlist[index].submissionid
          var curquestionsetid = this.finishedlist[index].questionsetid
          this.$http.get('https://api.mecord.cn/api/Submissions/' + cursubmissionid + '/answers').then((response) => {
            var curanswercontent = response.body
            console.log(JSON.stringify(curanswercontent))
            var temp = []
            var temp2 = []
            for (var i = 0; i < curanswercontent.length; i++) {
              var temp4 = []
              temp2.push(curanswercontent[i].questionId)
              switch (curanswercontent[i].type) {
                case 'blank':
                  console.log('haha')
                  temp4.push(curanswercontent[i].content.datas)
                  break
                case 'select':
                  temp4.push(curanswercontent[i].content.select)
                  break
                case 'multi_select':
                  temp4.push(curanswercontent[i].content.datas)
                  break
                case 'multi_blank':
                  for (var kk = 0; kk < curanswercontent[i].content.datas.length; kk++) {
                    temp4.push(curanswercontent[i].content.datas[kk])
                  }
                  break
                case 'symptom_score':
                  temp4.push(curanswercontent[i].content.levelScore)
                  temp4.push(curanswercontent[i].content.frequencyScore)
                  break
                case 'upload_image':
                  temp4.push('')
                  break
              }
              temp.push(temp4)
            }
            var answerarr = {}
            answerarr.answers = temp
            answerarr.questionid = temp2
            console.log(JSON.stringify(curanswercontent))
            this.$dispatch('saveanswer', answerarr)  // 将答案上传到app.vue
            var questionseturl = 'https://api.mecord.cn/api/QuestionSets/' + curquestionsetid + '?filter=%7B%22include%22%3A%22questions%22%7D'
            this.$http.get(questionseturl).then((response) => {
              // console.log(JSON.stringify(response.body))
              this.$dispatch('markcurquestionset', response.body)
              this.$router.go('/review')
            }, (response) => {
              console.log('cannot get questions!')
            })
          }, (response) => {
            console.log('cannot get the answers!')
          })
        }
      }
    }
</script>
