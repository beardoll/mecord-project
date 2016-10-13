<template>
    <div id="preview">
<!--      <div class="preheader">
        <div id="dropdownhead" style="text-align:center;
        font-size:24px;color:white;margin:auto;padding:auto">
          Mecord
        </div>
      </div>-->
      <div class="prebody">
        <div class="pretitle">{{questions.title}}</div>
        <div class="toptips" style="padding-left:5px">点击<span class="am-icon-edit"></span>修改选项</div>
        <div v-for="questionItem in questions" track-by="$index" class="questionbody">
          <div class="questiontitle">Q{{$index+1}}:&nbsp;{{questionItem.title}}
            <span class="am-icon-edit" @click.stop="edit($index)" style="margin:auto;padding:auto"></span>
          </div>
          <div v-if="questionItem.type === 'blank'">
            <div class="blankstyle"> <span style="text-decoration:underline">{{questionItem.answers[0]}}</span>&nbsp;&nbsp;
              <span v-if="questionItem.content.zh_units !== ''">{{questionItem.content.zh_units}}({{questionItem.content.symbol_units}})</span> </div>
          </div>
          <div v-if="questionItem.type === 'select'">
            <div v-for="selection in questionItem.content.choice" track-by="$index">
              <div class="selectedoption selectstyle" v-if="questionItem.answers[$index] === 1">{{questionItem.content.choice[$index]}}</div>
              <div class="notselectedoption selectstyle" v-if="questionItem.answers[$index] === 0">{{questionItem.content.choice[$index]}}</div>
            </div>
          </div>
          <div v-if="questionItem.type === 'multi_blank'">
            <div v-for = "title in questionItem.content.titles" track-by="$index" class="multiblankstylediv">
              <div class="am-g am-form-group multiblankstyle" style="margin-top:0;margin-bottom:0;padding:0">
                {{title}}:&nbsp;&nbsp;<span style="text-decoration:underline">{{questionItem.answers[$index]}}</span>&nbsp;&nbsp;
                <span v-if="questionItem.content.symbol_units[$index] !== ''">{{questionItem.content.zh_units[$index]}}({{questionItem.content.symbol_units[$index]}})</span>
              </div>
            </div>
          </div>
          <div v-if="questionItem.type === 'multi_select'">
            <div v-for="selection in questionItem.content.choice" track-by = "$index" class="multiselectstylediv">
              <div class="selectedoption selectstyle" v-if="questionItem.answers[$index] === 1">{{questionItem.content.choice[$index]}}</div>
              <div class="notselectedoption selectstyle" v-if="questionItem.answers[$index] === 0">{{questionItem.content.choice[$index]}}</div>
            </div>
          </div>
          <div v-if="questionItem.type === 'symptom_score'">
            <div class="symptomtype">症状程度：<span style="text-decoration:underline">{{questionItem.answers[0]}}</span></div>
            <div class="symptomreftitle">症状程度值参考:</div>
            <div v-for = "score in questionItem.content.levelScores" track-by="$index" class="symptomrefvalue">
              {{score}}:{{questionItem.content.levelParts[$index]}}
            </div>
            <div class="symptomtype">频率：<span style="text-decoration:underline">{{questionItem.answers[1]}}</span></div>
            <div class="symptomreftitle">频率值参考:</div>
            <div v-for = "score in questionItem.content.frequencyScores" track-by="$index" class="symptomrefvalue">
              {{score}}:{{questionItem.content.frequencyParts[$index]}}
            </div>
          </div>
          <div v-if="questionItem.type === 'uploadimg'">
            <img class="showimgarea" :src = "questionItem.answers[$index]">
          </div>
        </div>
        <div class="submitbtn am-topbar am-topbar-fixed-bottom" style="background-color:white">
          <button class="am-btn am-btn-primary am-btn-radius" @click.stop="submit()">提交</button>
        </div>
      </div>
    </div>
</template>
<style>
    body{
        background-color:white;
    }
    #preview{
      background-color: white;
      margin-top: 0px;
      width: 100%;
      height: 100%;
      padding-bottom: 0px;
    }
    .preheader{
      width: 100%;
      height: 10%;
      padding-top: 10px;
      background-color: dodgerblue;
    }
    .prebody{
      width: 100%;
      height: 100%;
    }
    .questionbody{
      padding-bottom: 60px;
    }
    .pretitle{
      background-color: #00d4b4;
      color: white;
      text-align: left;
      font-size: 20px;
      padding-top: 2px;
      padding-bottm: 2px;
    }
    .selectedoption{
      color: black;
    }
    .notselectedoption{
      color: darkgrey;
    }
    .toptips{
      text-align: left;
      font-size: 16px;
    }
    .questiontitle{
      background-color: #9da0a4;
      text-align: left;
      font-size: 18px;
      padding-left: 5px;
    }
    .blankstyle{
      text-align: left;
      margin-left: 10px;
    }
    .selectstyle{
      text-align: left;
      margin-left: 10px;

    }
    .multiblankstylediv{

    }
    .multiblankstyle{
      text-align: left;
      margin-left: 10px;
    }
    .symptomtype{
      text-align: left;
      margin-left: 10px;
    }
    .symptomreftitle{
      text-align: left;
      margin-left: 40px;
      color: #b94a48
    }
    .symptomrefvalue{
      text-align: left;
      margin-left: 60px;
      color: #b94a48
    }
    .showimgarea{
      width: 150px;
      height: 200px;
      margin-top: 10px;
      margin-right: auto;
    }
</style>
<script>
//  import CosCloud from '../static/sdk/qcloud_sdk.js'
  export default{
    data () {

    },
    computed: {
      answers: function () {  // 纯数字类型数据
        var currentanswer = this.$root.currentanswer
        var tempquest = this.$root.rootunfinished[this.$root.currenttaskindex].submissions[this.$root.progress[this.$root.currenttaskindex]].questionSet.questions
        var temp = []
        for (var i = 0; i < currentanswer.length; i++) {
          var temp1 = []
          var data1 = currentanswer[i]
          var data = []
          for (var ww = 0; ww < data1.length; ww++) { // 先把字符类型数据转化为数字
            data.push(parseInt(data1[ww]))
          }
          switch (tempquest[i].type) {
            case 'blank':
              temp1.push(data)
              break
            case 'multi_blank':
              for (var j = 0; j < data.length; j++) {
                temp1.push(data[j])
              }
              break
            case 'select':
              for (var k = 0; k < tempquest[i].content.choice.length; k++) {
                if (($.inArray(k, data)) === -1) {
                  temp1.push(0)
                } else {
                  temp1.push(1)
                }
              }
              break
            case 'multi_select':
              for (var kk = 0; kk < tempquest[i].content.choice.length; kk++) {
                if (($.inArray(kk, data)) === -1) {
                  temp1.push(0)
                } else {
                  temp1.push(1)
                }
              }
              break
            case 'symptom_score':
              temp1 = data
              break
          }
          temp.push(temp1)
        }
        return temp
      },
      questions: function () {
        var temp = this.$root.rootunfinished[this.$root.currenttaskindex].submissions[this.$root.progress[this.$root.currenttaskindex]].questionSet.questions
        for (var i = 0; i < temp.length; i++) {
          temp[i].answers = this.answers[i]  // 把每道题的答案放到对应的问题中
        }
        // console.log(this.answers[4])
        return temp
      },
      submissions: function () {
        return this.$root.rootunfinished[this.$root.currenttaskindex].submissions[this.$root.progress[this.$root.currenttaskindex]]
      },
      submissionid: function () {
        return this.submissions.id
      }
    },
    ready: function () {
    },
    methods: {
      edit (index) { // 修改index对应的题目
        this.$dispatch('seteditindex', index)
        console.log(this.$root.currentanswer)
        this.$router.go('/modification')
      },
      checkselect (questionItem, index) {
        // 检查单选题中index对应的选项是否被选中
        if (questionItem.answers[0] === index) {
          console.log('true select!')
          return true
        } else {
          return false
        }
      },
      checkmultiselect (questionItem, index) {
        // 检查多选题中$index对应的选项是否被选中
        var temp = questionItem.answers
        var mark = $.inArray(index, temp)
        if (mark === -1) {
          return false
        } else {
          return true
        }
      },
      submit () {
        // 先上传非图片类问题的答案
        // 再上传图片
        // 提交表单数据
        // console.log(this.submission.answers)
        var submitanswers = []
        for (var i = 0; i < this.questions.length; i++) {
          if (this.questions[i].type !== 'uploadimg') {
            var temp = {}
            temp.userId = this.$root.accesstoken.userId
            temp.questionId = this.questions[i].id
            temp.type = this.questions[i].type
            var content = {}
            var currentanswer = this.answers[i] // 当前问题对应的答案
            switch (this.questions[i].type) {
              case 'symptom_score':
                content.levelScore = currentanswer[0]
                content.frequencyScore = currentanswer[1]
                break
              case 'multi_blank':
                var data = []
                for (var j = 0; j < currentanswer.length; j++) {
                  data.push(currentanswer[j])
                }
                content.datas = data
                break
              case 'select':
                content.select = currentanswer[0]
                break
              case 'multi_select':
                var data2 = []
                for (var k = 0; k < currentanswer.length; k++) {
                  data2.push(currentanswer[k])
                }
                content.datas = data2
                break
              case 'blank':
                content.datas = currentanswer[0]
                break
            }
            temp.content = content
            submitanswers.push(temp)
          }
        }
        console.log(this.submissionid)
        this.$http.post('https://api.mecord.cn/api/Submissions/' + this.submissionid + '/answers?access_token=' + this.$root.accesstoken.id, submitanswers).then(
          (response) => {
            console.log('successfully submit!')
//            for (var j = 0; j < this.questions.length; j++) {   // 一个个图片附件进行上传z
//              if (this.questions[j].type === 'uploadimg') {
//                var imgnode = []
//                imgnode.id = this.questions[j].id
//                var tempsrc = this.answer[j]
//                var bucketName = this.$root.accesstoken.userId + '&' + Date().getTime()
//                this.$http.get('https://api.mecord.cn/api/MecordUsers/{id}/getCosSign?userId=' + this.$root.accesstoken.userId).then(
//                  (response) => {
//                    var successCallBack = function (result) {
//                      var data = []
//                      data.filename = bucketName
//                      data.submmitterId = this.$root.accesstoken.userId
//                      data.description = ''
//                      data.permission = 'public'
//                      data.urls = result
//                      this.$http.post('https://api.mecord.cn/api/Answers/' + imgnode.id + '/attachment', data).then(
//                      (response) => {
//                        console.log('successfully upload to server!')
//                      }, (response) => {
//                        console.log('cannot upload to server!')
//                      })
//                    }
//                    var remotePath = response.path
//                    var errorCallBack = function (result) {
//                      console.log('Cannot upload to cos cloud!')
//                    }
//                    var cos = new CosCloud('APPID')
//                    cos.prototype.uploadFile(successCallBack, errorCallBack, bucketName, remotePath, tempsrc)
//                  }, (response) => {
//                  console.log('cannot get the signature')
//                })
//              }
//            }
            var updatetaskid = this.$root.currentrealtaskid
            var updatetaskurl = 'https://api.mecord.cn/api/Tasks/' + updatetaskid
            var updateprogress = this.$root.progress[this.$root.currenttaskindex] + 1
            var updatestate = ''
            if (updateprogress === this.$root.rootunfinished[this.$root.currenttaskindex].plans.dates.length - 1) {
              updatestate = 'finished'
            } else {
              updatestate = 'unfinished'
            }
            this.$http.put(updatetaskurl, {'progress': updateprogress, 'status': updatestate}).then((response) => {
              console.log('sucessfully put!')
              window.alert('提交成功啦！')
              this.$root.loadClientDate()
            }, (response) => {
              console.log('fail put!')
            })
          }, (response) => {
          console.log(JSON.stringify(submitanswers))
          console.log('fail to submit!')
        })
      }
    }
  }
</script>
