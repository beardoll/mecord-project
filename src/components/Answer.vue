<template>
    <div id="answer">
      <div class="anheader">
        <div class="am-u-sm-3">
          <img src="../assets/left-arrow.png" style="cursor:pointer;width:35px;height:35px;margin:auto;padding:auto"
               @click.stop="backToFrontPage()">
        </div>
        <div class="am-u-sm-6 am-u-end" id="dropdownhead" style="text-align:center;
        font-size:24px;color:white;margin-top:0.5%">
          Mecord
        </div>
      </div>
      <div class="anbody">
        <div class="antitle">{{questions.title}}</div>
        <div class="am-progress am-progress-striped anprogressdiv">
          <div class="am-progress-bar am-progress-bar-success" id="anprogress" style="width: 0%;">{{curindex}}/{{questionlength}}</div>
        </div>
        <div class="anquestion">
          <form class= "am-form" style="padding:0;margin:0" id="patient-form">
            <fieldset style="padding:0;margin:0">
              <div v-for="questionItem in questions" track-by = "$index">
                <div v-if="$index === curindex">
                  <div v-if="questionItem.type === 'blank'">
                    <div class="am-form-group" style="text-align:left;margin-top:2px">
                      <label class="am-form-label questiontitle" style="background-color:#cccccc;width:100%">Q{{curindex+1}}&nbsp;&nbsp;{{questionItem.title}}</label>
                      <div v-for="tipsintem in questionItem.tips" class="questiontips" track-by="$index">
                        提示{{$index+1}}:&nbsp;{{questionItem.tips}}
                      </div>
                      <div class="am-g am-form-group">
                        <div class="am-u-sm-6" style="padding-left:0;margin-left:40px;margin-top:20px">
                          <input :type="questionItem.content.dataType" :name="questionItem.title" class="blankinput">
                        </div>
                        <div class="am-u-sm-4 am-u-end" style="margin-top:20px">
                          <span style="font-size:20px">{{questionItem.content.zh_units}}({{questionItem.content.symbol_units}})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="questionItem.type === 'select'">
                    <div class="am-form-group" style="text-align:left">
                      <label class="am-form-label questiontitle" style="background-color:#cccccc;width:100%">Q{{curindex+1}}&nbsp;&nbsp;{{questionItem.title}}</label>
                      <div v-for="tipsintem in questionItem.tips" class="questiontips" track-by="$index">
                        提示{{$index+1}}:&nbsp;{{questionItem.tips}}
                      </div>
                      <div style="margin-top:20px" class="selectinput">
                        <div class="am-radio" v-for="selection in questionItem.content.choice" style="padding-top:5px;padding-bottom:5px">
                          <input type = "radio" :name="questionItem.title" :value="$index" style="margin-left:0px;
                          margin-right:10px">{{selection}}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="questionItem.type === 'multi_select'">
                    <div class= "am-form-group am-g am-g-collapse" style="text-align:left">
                      <label class="am-form-label questiontitle" style="background-color:#cccccc;width:100%">Q{{curindex+1}}&nbsp;&nbsp;{{questionItem.title}}</label>
                      <div v-for="tipsintem in questionItem.tips" class="questiontips" track-by="$index">
                        提示{{$index+1}}:&nbsp;{{questionItem.tips}}
                      </div>
                      <div style="margin-top:20px">
                        <div class="am-checkbox multiselectinput"  v-for="selection in questionItem.content.choice" track-by="$index">
                          <input type= "checkbox" :name="questionItem.title" :value="$index" style="margin-left:10px;
                            margin-right:10px;padding-top:5px;padding-bottom:5px;margin-top:5px;margin-bottom:5px"> {{selection}}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="questionItem.type === 'multi_blank'">
                    <label class="am-form-label questiontitle" style="background-color:#cccccc;width:100%;text-align:left">Q{{curindex+1}}&nbsp;&nbsp;{{questionItem.title}}</label>
                    <div v-for="tipsintem in questionItem.tips" class="questiontips" track-by="$index" style="text-align:left">
                      提示{{$index+1}}:&nbsp;{{questionItem.tips}}
                    </div>
                    <div class="am-form-group  multiblankinput" style="text-align:left;margin-top:20px" >
                      <div v-for = "title in questionItem.content.titles" track-by="$index">
                        <div class="am-g am-form-group" >
                          <div class="am-u-sm-3" style="text-align:right;margin-top:2px">{{title}}</div>
                          <div class="am-u-sm-4 multiblankele">
                            <input :type="questionItem.content.dataTypes[$index]" style="margin-left:0" :name="questionItem.title">
                          </div>
                          <div class="am-u-sm-5" style="text-align:left;margin-top:2px">{{questionItem.content.symbol_units[$index]}}({{questionItem.content.zh_units[$index]}})</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="questionItem.type === 'symptom_score'">
                    <Score :question-item = "questionItem" :curindex = "curindex" :defaultdata = "scoredefaultdata" v-ref:score></Score>
                  </div>
                  <div style="margin-top:50px" v-if = "curindex > 0 && curindex < questionlength">
                    <button type="button" class="pastpagebtn am-btn am-btn-lg am-btn-primary am-radius" @click.stop="backToPastOne(questions[$index-1], $index)">上一题</button>
                    <button type="button" class="nextpagebtn am-btn am-btn-lg am-btn-primary am-radius" @click.stop="goToNextOne(questionItem, $index)">下一题</button>
                  </div>
                  <div style="margin-top:50px" v-if = "curindex === 0">
                    <button type="button" class="nextpagebtn2 am-btn am-btn-lg am-btn-primary am-radius" @click.stop="goToNextOne(questionItem, $index)">下一题</button>
                  </div>
                </div>
              </div>
              <div v-if="curindex === questionlength">
                <p style="margin-top:100px;font-size:28px;color:red">恭喜您完成问卷！</p>
                <div style="margin-top:50px">
                  <button type="button" class="pastpagebtn3 am-btn am-btn-lg am-btn-primary am-radius" @click.stop="backToPastOne(questions[questionlength-1], questionlength-1)">上一题</button>
                  <button type="button" class="nextpagebtn3 am-btn am-btn-lg am-btn-primary am-radius" @click.stop="preview()">预览问卷</button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
</template>
<style>
    body{
        background-color:white;
    }
    #answer{
      background-color: white;
      margin-top: 0px;
      width: 100%;
      height: 100%;
      padding-bottom: 0px;
    }
    .anheader{
      width: 100%;
      height: 10%;
      padding-top: 10px;
      background-color: dodgerblue;
    }
    .anbody{
      width: 100%;
      height: 90%;
    }
    .antitle{
      background-color: #00d4b4;
      color: white;
      text-align: left;
      font-size: 20px;
      padding-top: 2px;
      padding-bottm: 2px;
    }
    .anprogressdiv{
      padding: 0;
      margin:0;
      width: 100%;
    }
    .anquestion{
      width: 100%;
      margin: auto;
    }
    .questiontitle{
      padding-left: 5px;
      font-size: 20px;
      text-align: left;
    }
    .diyprogress{
      width: 100%;
      height: 180px;
      margin-top: 5px;
    }
    .questiontips{
      text-align: left;
      background-color: #fbedd9;
      padding-left: 5px;
      margin-top: 10px;
    }
    .nextpagebtn{
       position: absolute;
       left:60%;
       top: 90%;
     }
    .pastpagebtn{
      position: absolute;
      left: 12%;
      top: 90%
    }
    .nextpagebtn3{
      position: absolute;
      left:55%;
      top: 90%;
    }
    .pastpagebtn3{
      position: absolute;
      left: 14%;
      top: 90%
    }
    .nextpagebtn2{
      position: absolute;
      left: 40%;
      top: 100%
    }

</style>
<script>
  import Score from './Score'
  export default {
    data () {
      return {
        curindex: 0,
        finishedanswer: [],  // 已完成的题目
        scoredefaultdata: [0, 0] // 评分控件的默认值
      }
    },
    ready: function () {
    },
    components: {
      Score
    },
    computed: {
      questionSet: function () { // 问卷
        console.log(this.$root.rootunfinished[this.$root.currenttaskindex].submissions)
        return this.$root.rootunfinished[this.$root.currenttaskindex].submissions[this.$root.progress[this.$root.currenttaskindex]].questionSet
      },
      questions: function () {  // 题目
        return this.$root.rootunfinished[this.$root.currenttaskindex].submissions[this.$root.progress[this.$root.currenttaskindex]].questionSet.questions
      },
      questionlength: function () { // 题目数量
        return this.$root.rootunfinished[this.$root.currenttaskindex].submissions[this.$root.progress[this.$root.currenttaskindex]].questionSet.questions.length
      },
      userId: function () { // 用户id
        return this.$root.rootunfinished[this.$root.currenttaskindex].userId
      },
      submission: function () {
        var answer = {}
        answer.taskId = this.$root.currentrealtaskid
        answer.submitterId = this.$root.userData.id
        answer.userId = this.$root.userData.id
        answer.submitDate = new Date()
        answer.orderInTask = this.$root.rootunfinished[this.$root.currenttaskindex].progress + 1
        answer.permission = 'public'
        answer.answers = []
        return answer
      }
    },
/*    ready: function () {
      this.getQuestionnaire()
    }, */
    methods: {
      backToFrontPage () {
        this.$router.go('/userinterface/:0')
      },
      goToNextOne (questionItem, index) {
        var formjson = $('#patient-form').serializeArray()
        // console.log(formjson)
        var status = true
        switch (questionItem.type) {
          // 先检测是否完成输入
          case 'multi_blank':
            var blanklength = questionItem.content.titles.length
            for (var ww = 0; ww < blanklength; ww++) {
              if (formjson[ww].value === '') {
                status = false
              }
            }
            break
          case 'select':
            if (formjson.length === 0) {
              status = false
            }
            break
          case 'blank':
            if (formjson[0].value === '') {
              status = false
            }
            break
          case 'multi_select':
            if (formjson.length === 0) {
              status = false
            }
            break
        }
        if (status === false) {
          window.alert('请完成此题！')
        } else {
          this.curindex = this.curindex + 1
          var percent = this.curindex / this.questionlength * 100
          $('#anprogress').css('width', percent + '%')
          var data = []
          switch (questionItem.type) {
            case 'multi_blank':
              for (var i = 0; i < formjson.length; i++) {
                data.push(formjson[i].value)
              }
              break
            case 'symptom_score':
              data.push(formjson[0].value)
              data.push(formjson[1].value)
              break
            case 'select':
              console.log(formjson[0].value)
              data.push(formjson[0].value)
              break
            case 'blank':
              data.push(formjson[0].value)
              break
            case 'multi_select':
              for (var j = 0; j < formjson.length; j++) {
                data.push(formjson[j].value)
              }
              break
          }
          if (this.finishedanswer.length < this.curindex) { // 当前问题答案未录入
            console.log('front-pushing!')
            console.log(this.finishedanswer.length)
            console.log(this.curindex)
            this.finishedanswer.push(data)
          } else {  // 否则当前问题的答案已经录入过，覆盖
            console.log('front-rewrite!')
            console.log(this.finishedanswer.length)
            console.log(this.curindex)
            this.finishedanswer[this.curindex - 1] = data
          }
          var nextquestion = this.questions[this.curindex]
          if (this.curindex < this.questionlength) {  // 尚有下一个问题
            if (this.finishedanswer.length >= this.curindex + 1) { // 下一个问题已经录入过
              if (nextquestion.type === 'symptom_score') {  // 对评分控件进行单独处理
                this.scoredefaultdata = this.finishedanswer[this.curindex]
              } else {
                this.scoredefaultdata = [0, 0]
                this.$nextTick(function () {  // 需要渲染之后才能填数据，所以要回调
                  switch (nextquestion.type) {
                    case 'multi_blank':
                      this.setMultiBlankData(this.finishedanswer[this.curindex])
                      break
                    case 'select':
                      this.setSelectData(this.finishedanswer[this.curindex])
                      break
                    case 'blank':
                      console.log('come to set blank!')
                      this.setBlankData(this.finishedanswer[this.curindex])
                      break
                    case 'multi_select':
                      this.setMultiSelectData(this.finishedanswer[this.curindex])
                      break
                  }
                })
              }
            }
          }
        }
      },
      backToPastOne (questionItem, index) {
        // 返回上一题
        if (index !== this.questions.length - 1) {
          var formjson = $('#patient-form').serializeArray()
          var lastquestion = this.questions[this.curindex] // 发生点击‘返回上一题’事件的问题
          var data = []
          switch (lastquestion.type) {
            case 'multi_blank':
              for (var i = 0; i < formjson.length; i++) {
                data.push(formjson[i].value)
              }
              break
            case 'symptom_score':
              data.push(formjson[0].value)
              data.push(formjson[1].value)
              break
            case 'select':
              if (formjson.length !== 0) {
                data.push(formjson[0].value)
              }
              break
            case 'blank':
              data.push(formjson[0].value)
              break
            case 'multi_select':
              for (var j = 0; j < formjson.length; j++) {
                data.push(formjson[j].value)
              }
              break
          }
          if (this.finishedanswer.length < this.curindex + 1) { // 当前问题答案未录入
            console.log('Im pushing!')
            console.log(this.finishedanswer.length)
            console.log(this.curindex)
            this.finishedanswer.push(data)
          } else {  // 否则当前问题的答案已经录入过，覆盖
            console.log('Im rewriting!')
            console.log(this.finishedanswer.length)
            console.log(this.curindex)
            this.finishedanswer[this.curindex] = data
          }
        }
        // console.log(this.finishedanswer)
        this.curindex = this.curindex - 1
        var thisquestion = this.questions[this.curindex]
        var percent = this.curindex / this.questionlength * 100
        $('#anprogress').css('width', percent + '%')
        if (thisquestion.type === 'symptom_score') {  // 对评分控件进行单独处理
          this.scoredefaultdata = this.finishedanswer[this.curindex]
        } else {
          this.scoredefaultdata = [0, 0]
          this.$nextTick(function () {
            switch (thisquestion.type) {  // 返回到上一题时，应显示已经完成的问题答案
              case 'multi_blank':
                this.setMultiBlankData(this.finishedanswer[this.curindex])
                break
              case 'select':
                this.setSelectData(this.finishedanswer[this.curindex])
                break
              case 'blank':
                console.log('come to set blank!')
                this.setBlankData(this.finishedanswer[this.curindex])
                break
              case 'multi_select':
                this.setMultiSelectData(this.finishedanswer[this.curindex])
                break
            }
          })
        }
      },
      setMultiBlankData (data) {  // 设置多项填空的值
        $('.multiblankinput input').each(function (index, element) {
          if (data.length >= index + 1) {  // 判断是否有数据
            $(this).val(data[index])
          }
        })
      },
      setSelectData (data) {
        if (data.length !== 0) {
          var checkedindex = parseInt(data[0])  // json存的是字符而不是数字
          $('.selectinput input').each(function (index, element) {
            if (index === checkedindex) {
              $(this).attr('checked', true)
            } else {
              $(this).attr('checked', false)
            }
          })
        }
      },
      setBlankData (data) {
        console.log('haha')
        $('.blankinput').val(data)
      },
      setMultiSelectData (data) {
        var datafigure = []
        var temp = -1
        for (var i = 0; i < data.length; i++) { // 将字符数组转化为数字数组
          temp = parseInt(data[i])
          datafigure.push(temp)
        }
        // console.log(datafigure)
        $('.multiselectinput input').each(function (index, element) {
          var mark = $.inArray(index, datafigure)
          if (mark === -1) {
            $(this).attr('checked', false)
          } else {
            $(this).attr('checked', true)
          }
        })
      },
      preview () { // 预览问卷
        // console.log(this.finishedanswer)
        this.$dispatch('saveanswer', this.finishedanswer)
        this.$router.go('/preview')
      }
    }
  }
</script>
