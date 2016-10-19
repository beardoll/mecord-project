<template>
    <div id="answer">
      <div class="anbody">
        <div class="antitle">{{questions.title}}</div>
        <div class="am-progress am-progress-striped anprogressdiv">
          <div class="am-progress-bar am-progress-bar-success" id="anprogress" style="width: 0%">{{curindex}}/{{questionlength}}</div>
        </div>
        <div class="anquestion">
          <form class= "am-form" style="padding:0;margin:0" id="patient-form">
            <fieldset style="padding:0;margin:0">
              <div v-for="questionItem in questions" track-by = "$index">
                <div v-if="$index === curindex">
                  <div v-if="questionItem.type === 'blank'">
                    <div class="am-form-group" style="text-align:left;margin-top:2px">
                      <label class="am-form-label questiontitle">Q{{curindex+1}}&nbsp;&nbsp;{{questionItem.title}}</label>
                      <div v-for="tipsitem in questionItem.tips" class="questiontips" track-by="$index">
                        提示{{$index+1}}:&nbsp;{{tipsitem}}
                      </div>
                      <div class="am-g am-form-group">
                        <div class="am-u-sm-6" style="padding-left:0;margin-left:40px;margin-top:20px">
                          <input :type="questionItem.content.dataType" :name="questionItem.title" class="blankinput">
                        </div>
                        <div class="am-u-sm-4 am-u-end" style="margin-top:20px" v-if="questionItem.content.zh_units !== ''">
                          <span style="font-size:20px">{{questionItem.content.zh_units}}({{questionItem.content.symbol_units}})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="questionItem.type === 'select'">
                    <div class="am-form-group" style="text-align:left">
                      <label class="am-form-label questiontitle">Q{{curindex+1}}&nbsp;&nbsp;{{questionItem.title}}</label>
                      <div v-for="tipsitem in questionItem.tips" class="questiontips" track-by="$index">
                        提示{{$index+1}}:&nbsp;{{tipsitem}}
                      </div>
                      <div style="margin-top:20px" class="selectinput">
                        <div class="am-radio" v-for="selection in questionItem.content.choice" style="padding-top:5px;padding-bottom:5px">
                            <div class="am-g">
                              <div class="am-u-sm-1" style="margin:0;padding:0">
                                <input type = "radio" :name="questionItem.title" :value="$index" style="margin-left:0px;
                                width:18px;height:18px;margin-top:4px">
                              </div>
                              <div class="am-u-sm-11" style="margin:0;padding:0">
                                <span style="font-size:18px">{{selection}}</span>
                              </div>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="questionItem.type === 'multi_select'">
                    <div class= "am-form-group am-g am-g-collapse" style="text-align:left">
                      <label class="am-form-label questiontitle">Q{{curindex+1}}&nbsp;&nbsp;{{questionItem.title}}</label>
                      <div v-for="tipsitem in questionItem.tips" class="questiontips" track-by="$index">
                        提示{{$index+1}}:&nbsp;{{tipsitem}}
                      </div>
                      <div style="margin-top:20px">
                        <div class="am-checkbox multiselectinput"  v-for="selection in questionItem.content.choice" track-by="$index">
                            <div class="am-g">
                              <div class="am-u-sm-1" style="margin:0;padding:0;text-align:right">
                                <input type= "checkbox" :name="questionItem.title" :value="$index" style="padding-top:5px;padding-bottom:5px;
                                margin-top:10px;width:18px;height:18px;margin-left:0px">
                              </div>
                              <div class="am-u-sm-11" style="margin:0;padding-top:6px;text-align:left">
                                <span style="font-size:18px">{{selection}}</span>
                              </div>
                            </div>
                      </div>
                    </div>
                    </div>
                  </div>
                  <div v-if="questionItem.type === 'multi_blank'">
                    <label class="am-form-label questiontitle">Q{{curindex+1}}&nbsp;&nbsp;{{questionItem.title}}</label>
                    <div v-for="tipsitem in questionItem.tips" class="questiontips" track-by="$index" style="text-align:left">
                      提示{{$index+1}}:&nbsp;{{tipsitem}}
                    </div>
                    <div class="am-form-group  multiblankinput" style="text-align:left;margin-top:20px" >
                      <div v-for = "title in questionItem.content.titles" track-by="$index">
                        <div class="am-g am-form-group" >
                          <div class="am-u-sm-3" style="text-align:right;margin-top:2px">{{title}}</div>
                          <div class="am-u-sm-4 multiblankele">
                            <input :type="questionItem.content.dataTypes[$index]" style="margin-left:0" :name="questionItem.title">
                          </div>
                          <div class="am-u-sm-5" style="text-align:left;margin-top:2px" v-if="questionItem.content.zh_units !== ''">{{questionItem.content.symbol_units[$index]}}({{questionItem.content.zh_units[$index]}})</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="questionItem.type === 'symptom_score'">
                    <Score :question-item = "questionItem" :curindex = "curindex" :defaultdata = "scoredefaultdata" v-ref:score></Score>
                  </div>
                  <div v-if="questionItem.type === 'upload_image'">
                    <uploadimg :imgsrcforchild = "imgsrcforchild" :question-item = "questionItem" :curindex = "curindex"></uploadimg>
                  </div>
                  <div style="margin-top:50px;background-color:white" v-if = "curindex > 0 && curindex < questionlength" class="am-topbar am-topbar-fixed-bottom">
                    <button type="button" class="pastpagebtn am-btn am-btn-lg am-btn-primary am-radius"
                            style="margin-left:20px;margin-right:20px" @click.stop="backToPastOne($index)">上一题</button>
                    <button type="button" class="nextpagebtn am-btn am-btn-lg am-btn-primary am-radius"
                            style="margin-left:20px;margin-right:20px" @click.stop="goToNextOne($index)">下一题</button>
                  </div>
                  <div style="margin-top:50px;background-color:white" v-if = "curindex === 0" class="am-topbar am-topbar-fixed-bottom">
                    <button type="button" class="nextpagebtn2 am-btn am-btn-lg am-btn-primary am-radius" @click.stop="goToNextOne($index)">下一题</button>
                  </div>
                </div>
              </div>
              <div v-if="curindex === questionlength">
                <p style="margin-top:100px;font-size:28px;color:red;background-color:white">恭喜您完成问卷！</p>
                <div style="margin-top:50px" class="am-topbar am-topbar-fixed-bottom">
                  <button type="button" class="pastpagebtn3 am-btn am-btn-lg am-btn-primary am-radius"
                          style="margin-left:20px;margin-right:20px" @click.stop="backToPastOne(questionlength-1)">上一题</button>
                  <button type="button" class="nextpagebtn3 am-btn am-btn-lg am-btn-primary am-radius"
                          style="margin-left:20px;margin-right:20px" @click.stop="preview()">预览问卷</button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
</template>
<style lang="less">
    body{
        background-color:white;
    }
    #answer{
      background-color: white;
      margin-top: 0px;
      width: 100%;
      height: 100%;
      padding-bottom: 0px;
      .anbody{
        width: 100%;
        height: 100%;
        .antitle{  /* 问卷标题  */
          background-color: #00d4b4;
          color: white;
          text-align: left;
          font-size: 20px;
          padding-top: 2px;
          padding-bottom: 2px;
        }
      }

      .anprogressdiv{  /* 进度条 */
        padding: 0;
        margin:0;
        width: 100%;
      }

      .anquestion{ /* 问卷中的问题 */
        width: 100%;
        margin: auto;
        padding-bottom: 60px;

        .questiontitle{  /* 问题标题 */
          padding-left: 5px;
          font-size: 20px;
          text-align: left;
          background-color:#cccccc;
          width:100%;
        }

        .questiontips{  /* 问题提示 */
          text-align: left;
          background-color: #fbedd9;
          padding-left: 5px;
          margin-top: 10px;
        }
      }
    }
</style>
<script>
  import Score from './Score'
  import uploadimg from './UploadImg'
  export default {
    data () {
      return {
        curindex: 0,
        scoredefaultdata: [0, 0], // 评分控件的默认值
        imgsrc: '',  // 舌苔上传题的本地地址
        imgsrcforchild: '' // 给子组件传递的img地址
      }
    },
    ready: function () {
    },
    components: {
      Score,
      uploadimg
    },
    events: {
      'uploadimgsrc': function (item) {
        // 保存用户上传的图片地址
        // dispatched from: UploadImg.vue -> wx.ready()
        this.imgsrc = item
      }
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
      finishedanswer: function () {  // 要提交的答案
        var temp = []
        for (var i = 0; i < this.questionlength; i++) {
          temp.push('')
        }
        return temp
      }
    },
/*    ready: function () {
      this.getQuestionnaire()
    }, */
    methods: {
      backToFrontPage () {
        this.$router.go('/userinterface/:0')
      },
      goToNextOne (index) {
        var questionItem = this.questions[index]
        console.log(JSON.stringify(this.questions[index + 1]))
        var formjson
        if (questionItem.type !== 'upload_image') {
          formjson = $('#patient-form').serializeArray()
        } else {
          formjson = this.imgsrc
        }
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
          case 'upload_image':
            if (formjson === '') {
              status = false
            }
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
            case 'upload_image':
              data.push(formjson)  // 把URL压入堆栈中
              break
          }
          this.finishedanswer[this.curindex - 1] = data  // 将当前答案录入
          var nextquestion = this.questions[this.curindex]
          if (this.curindex < this.questionlength) {  // 尚有下一个问题
            if (this.finishedanswer[this.curindex] !== '') { // 下一个问题已经录入过
              console.log('answers loading, front!')
              if (nextquestion.type === 'symptom_score' || nextquestion.type === 'upload_image') {  // 对评分控件进行单独处理
                switch (nextquestion.type) {
                  case 'symptom_score':
                    this.scoredefaultdata = this.finishedanswer[this.curindex]
                    break
                  case 'upload_image':
                    this.imgsrcforchild = this.finishedanswer[this.curindex]
                    break
                }
              } else {
                this.scoredefaultdata = [0, 0] // 复位，这是给子组件传的数据，默认为[0, 0]
                this.imgsrcforchild = '' // 复位，这是给子组件传的数据，默认为''
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
                      console.log(this.finishedanswer[this.curindex])
                      this.setMultiSelectData(this.finishedanswer[this.curindex])
                      break
                  }
                })
              }
            }
          }
        }
      },
      backToPastOne (index) {
        // 返回上一题
        var questionItem = this.questions[index]
        if (index !== this.questions.length - 1) {
          var formjson
          if (questionItem.type === 'upload_image') {
            formjson = this.imgsrc
          } else {
            formjson = $('#patient-form').serializeArray()
          }
          var lastquestion = questionItem // 发生点击‘返回上一题’事件的问题
          var data = []
          console.log(lastquestion.type)
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
            case 'upload_image':
              data.push(formjson)  // 把URL压入堆栈中
              break
          }
          this.finishedanswer[this.curindex] = data // 将当前答案压入堆栈中
        }
        // console.log(this.finishedanswer)
        this.curindex = this.curindex - 1
        var thisquestion = this.questions[this.curindex]
        var percent = this.curindex / this.questionlength * 100
        $('#anprogress').css('width', percent + '%')
        console.log(thisquestion.type)
        if (thisquestion.type === 'symptom_score' || thisquestion.type === 'upload_image') {  // 对评分控件进行单独处理
          switch (thisquestion.type) {
            case 'symptom_score':
              this.scoredefaultdata = this.finishedanswer[this.curindex]
              break
            case 'upload_image':
              this.imgsrcforchild = this.finishedanswer[this.curindex]
              break
          }
        } else {
          this.scoredefaultdata = [0, 0]  // 复位，这是给子组件传的数据，默认为[0, 0]
          this.imgsrcforchild = '' // 复位，这是给子组件传的数据，默认为''
          this.$nextTick(function () {
            console.log('answers loading, back!')
            switch (thisquestion.type) {  // 返回到上一题时，应显示已经完成的问题答案
              case 'multi_blank':
                console.log(this.finishedanswer[this.curindex])
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
        this.$dispatch('saveanswer', this.finishedanswer)  // 保存现在已经完成的答案
        this.$router.go('/preview')
      }
    }
  }
</script>
