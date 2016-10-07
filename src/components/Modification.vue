<template>
    <div id="modification">
      <div class="mohead">
        <div id="dropdownhead" style="text-align:center;
      font-size:24px;color:white;margin:auto;padding:auto">
          Mecord
        </div>
      </div>
      <div class="mobody">
        <div class="motitle">{{questions.title}}</div>
        <div class="moquestion">
          <form class= "am-form" style="padding:0;margin:0" id="patient-form">
            <fieldset style="padding:0;margin:0">
              <div v-for="questionItem in questions" track-by = "$index">
                <div v-if="$index === curindex">
                  <div v-if="questionItem.type === 'blank'">
                    <div class="am-form-group" style="text-align:left">
                      <label class="am-form-label" style="background-color:#cccccc;width:100%">Q{{curindex+1}}&nbsp;&nbsp;{{questionItem.title}}</label>
                      <div v-for="tipsintem in questionItem.tips" class="questiontips" track-by="$index">
                        提示{{$index+1}}:{{questionItem.tips}}
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
                      <label class="am-form-label" style="background-color:#cccccc;width:100%">Q{{curindex+1}}&nbsp;&nbsp;{{questionItem.title}}</label>
                      <div v-for="tipsintem in questionItem.tips" class="questiontips" track-by="$index">
                        提示{{$index+1}}:{{questionItem.tips}}
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
                      <label class="am-form-label" style="background-color:#cccccc;width:100%">Q{{curindex+1}}&nbsp;&nbsp;{{questionItem.title}}</label>
                      <div v-for="tipsintem in questionItem.tips" class="questiontips" track-by="$index">
                        提示{{$index+1}}:{{questionItem.tips}}
                      </div>
                      <div style="margin-top:20px">
                        <div class="am-checkbox multiselectinput"  v-for="selection in questionItem.content.choice" track-by="$index">
                          <input type= "checkbox" :name="questionItem.title" :value="$index" style="margin-left:10px;
                            margin-right:10px;padding-top:5px;padding-bottom:5px"> {{selection}}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="questionItem.type === 'multi_blank'">
                    <label class="am-form-label" style="background-color:#cccccc;width:100%;text-align:left">Q{{curindex+1}}&nbsp;&nbsp;{{questionItem.title}}</label>
                    <div v-for="tipsintem in questionItem.tips" class="questiontips" track-by="$index" style="text-align:left">
                      提示{{$index+1}}:{{questionItem.tips}}
                    </div>
                    <div class="am-form-group  multiblankinput" style="text-align:left;margin-top:20px" >
                      <div v-for = "title in questionItem.content.titles" track-by="$index">
                        <div class="am-g am-form-group" >
                          <div class="am-u-sm-3" style="text-align:right">{{title}}</div>
                          <div class="am-u-sm-4 multiblankele">
                            <input :type="questionItem.content.dataTypes[$index]" style="margin-left:0" :name="questionItem.title">
                          </div>
                          <div class="am-u-sm-5" style="text-align:left">{{questionItem.content.symbol_units[$index]}}({{questionItem.content.zh_units[$index]}})</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="questionItem.type === 'symptom_score'">
                    <label class="am-form-label" style="background-color:#cccccc;width:100%">Q{{curindex+1}}&nbsp;&nbsp;{{questionItem.title}}</label>
                    <div v-for="tipsintem in questionItem.tips" class="questiontips" track-by="$index">
                      提示{{$index+1}}:{{questionItem.tips}}
                    </div>
                    <div class="am-g" style="margin-top:10px">
                      <span class="am-u-sm-3 am-u-sm-offset-3" style="font-size:14px;color:#50e3c2">症状程度</span>
                      <span class="am-u-sm-3 am-u-end" style="font-size:14px;color:#4278f5">出现频率</span>
                    </div>
                    <div class="diyprogress am-g" style="">
                      <div class="am-u-sm-3" style="margin:0;padding:0;height:230px">
                        <div v-for = "score in questionItem.content.levelScores" track-by="$index"
                             :class="questionItem.type+score" style="text-align: right;width:100%;font-size:14px;margin:auto;padding:auto">
                          {{questionItem.content.levelParts[$index]}}
                        </div>
                      </div>
                      <div class="am-u-sm-3" style="margin:0;padding:0">
                        <div class="score-plugin" style="margin:auto">
                          <select :name="questionItem.title" class="select1 symptomscoreinput1" style="display:none" >
                            <option value = "10">10</option>
                            <option value = "9">9</option>
                            <option value = "8">8</option>
                            <option value = "7">7</option>
                            <option value = "6">6</option>
                            <option value = "5">5</option>
                            <option value = "4">4</option>
                            <option value = "3">3</option>
                            <option value = "2">2</option>
                            <option value = "1">1</option>
                            <option value = "0" selected="selected">0</option>
                          </select>
                          <div class = "bar1 score-default1" data-score="10"></div>
                          <div class = "bar1 score-default1" data-score="9"></div>
                          <div class = "bar1 score-default1" data-score="8"></div>
                          <div class = "bar1 score-default1" data-score="7"></div>
                          <div class = "bar1 score-default1" data-score="6"></div>
                          <div class = "bar1 score-default1" data-score="5"></div>
                          <div class = "bar1 score-default1"></div>
                          <div class = "bar1 score-default1" data-score="3"></div>
                          <div class = "bar1 score-default1" data-score="2"></div>
                          <div class = "bar1 score-default1" data-score="1"></div>
                          <div class = "bar1 score-selected1 score-current" data-score="0"></div>
                          <div class="bottomfigure1">0</div>
                        </div>
                      </div>
                      <div class="am-u-sm-3" style="margin:0;padding:0">
                        <div class=" score-plugin" style="margin:auto">
                          <select :name="questionItem.title" class="select2 symptomscoreinput2" style="display:none">
                            <option value = "10">10</option>
                            <option value = "9">9</option>
                            <option value = "8">8</option>
                            <option value = "7">7</option>
                            <option value = "6">6</option>
                            <option value = "5">5</option>
                            <option value = "4">4</option>
                            <option value = "3">3</option>
                            <option value = "2">2</option>
                            <option value = "1">1</option>
                            <option value = "0" selected="selected">0</option>
                          </select>
                          <div class = "bar2 score-default2" data-score="10"></div>
                          <div class = "bar2 score-default2" data-score="9"></div>
                          <div class = "bar2 score-default2" data-score="8"></div>
                          <div class = "bar2 score-default2" data-score="7"></div>
                          <div class = "bar2 score-default2" data-score="6"></div>
                          <div class = "bar2 score-default2" data-score="5"></div>
                          <div class = "bar2 score-default2" data-score="4"></div>
                          <div class = "bar2 score-default2" data-score="3"></div>
                          <div class = "bar2 score-default2" data-score="2"></div>
                          <div class = "bar2 score-default2" data-score="1"></div>
                          <div class = "bar2 score-selected2 score-current" data-score="0"></div>
                          <div class="bottomfigure2">0</div>
                        </div>
                      </div>
                      <div class="am-u-sm-3" style="margin:0;padding:0;height:230px">
                        <div v-for = "score in questionItem.content.frequencyScores" track-by="$index"
                             :class="questionItem.type+score" style="text-align: left;font-size:14px;margin:auto;padding:auto">
                          {{questionItem.content.frequencyParts[$index]}}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style="margin-top:50px">
                    <button type="button" class="nextpagebtn2 am-btn am-btn-lg am-btn-primary am-radius" @click.stop="validModification()">确认修改</button>
                  </div>
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
    #modification{
      background-color: white;
      margin-top: 0px;
      width: 100%;
      height: 100%;
      padding-bottom: 0px;
    }
    .mohead{
      width: 100%;
      height: 10%;
      padding-top: 10px;
      background-color: dodgerblue;
    }
    .mobody{
      width: 100%;
      height: 90%;
    }
    .motitle{
      background-color: #00d4b4;
      color: white;
      text-align: left;
      font-size: 20px;
      padding-top: 2px;
      padding-bottm: 2px;
    }
    .moquestion{
      width: 100%;
      margin: auto;
    }
    .diyprogress{
      width: 100%;
      height: 180px;
      margin-top: 30px;
    }
    .questiontips{
      text-align: left;
      background-color: #fbedd9;
    }
    .nextpagebtn2{
      position: absolute;
      left: 32%;
      top: 100%
    }
    /* 下面一段是为了给评分控件添加字体 */
    .symptom_score10{
      top: 0px;
      position: absolute;
    }
    .symptom_score9{
      top: 20px;
      position: absolute;
    }
    .symptom_score8{
      top: 40px;
      position: absolute;
    }
    .symptom_score7{
      top: 60px;
      position: absolute;
    }
    .symptom_score6{
      top: 80px;
      position: absolute;
    }
    .symptom_score5{
      top: 100px;
      position: absolute;
    }
    .symptom_score4{
      top: 120px;
      position: absolute;
    }
    .symptom_score3{
      top: 140px;
      position: absolute;
    }
    .symptom_score2{
      top: 160px;
      position: absolute;
    }
    .symptom_score1{
      top: 180px;
      position: absolute;
    }
    .symptom_score0{
      top: 200px;
      position: absolute;
    }

    /*   评分控件（外边框）  */
    .score-plugin{
      width: 82px;
    }
    /*    评分控件（症状）     */
    .bar1{
      width: 80px;
      height: 20px;
      border: solid 1px white;
    }
    .score-default1{
      background-color: #bef5e8;
    }
    .score-selected1{
      background-color: #50e3c2;
    }
    .bottomfigure1{
      width: 100%;
      font-size: large;
      color: #50e3c2;
      padding-top: 5px;
      padding-bottom: 5px;
      margin: auto;
      text-align: center;
      font-weight: bold;
    }
    /*    评分控件（频率）     */
    .bar2{
      width: 80px;
      height: 20px;
      border: solid 1px white;
    }
    .score-default2{
      background-color: #bbcefb;
    }
    .score-selected2{
      background-color: #4278f5;
    }
    .bottomfigure2{
      width: 100%;
      font-size: large;
      color: #4278f5;
      padding-top: 5px;
      padding-bottom: 5px;
      margin: auto;
      text-align: center;
      font-weight: bold;
    }
</style>
<script>
  export default{
    data () {

    },
    computed: {
      questions: function () {
        return this.$root.rootunfinished[this.$root.currenttaskindex].submissions[this.$root.progress[this.$root.currenttaskindex]].questionSet.questions
      },
      curindex: function () { // 当前编辑问题的位置
        return this.$root.editindex
      },
      curquestion: function () { // 当前编辑的具体问题
        return this.$root.rootunfinished[this.$root.currenttaskindex].submissions[this.$root.progress[this.$root.currenttaskindex]].questionSet.questions[this.curindex]
      },
      curanswer: function () {  // 当前问题的答案
        return this.$root.currentanswer[this.curindex]
      }
    },
    ready: function () {
      console.log(this.curindex)
      switch (this.curquestion.type) {
        case 'blank':
          this.setBlankData(this.curanswer)
          break
        case 'multi_blank':
          this.setMultiBlankData(this.curanswer)
          break
        case 'select':
          this.setSelectData(this.curanswer)
          break
        case 'multi_select':
          this.setMultiSelectData(this.curanswer)
          break
        case 'symptom_score':
          this.setSymptomScoreData(this.curanswer)
          this.scoreControl()
          break
      }
    },
    methods: {
      scoreControl () {
        // 症状控件函数
        $('.bar1').mouseenter(function (event) {
          var target = event.target
          // console.log(target)
          var parentdiv = $(target).parent()
          var curindex = $(parentdiv).children('div').index(target) // 找出事件触发的控件在父控件中的定位
          $('.bottomfigure1').text(10 - curindex)
          $('.score-plugin .bar1').each(function (index, element) {
            if (index >= curindex) {
              $(this).removeClass('score-default1').addClass('score-selected1')
            } else {
              $(this).removeClass('score-selected1').addClass('score-default1')
            }
          })
        }).mouseleave(function (event) {
          // console.log(target)
          var curindex = getCurrentIndex1()
          $('.bottomfigure1').text(10 - curindex)
          $('.score-plugin .bar1').each(function (index, element) {
            if (index >= curindex) {
              $(this).removeClass('score-default1').addClass('score-selected1')
            } else {
              $(this).removeClass('score-selected1').addClass('score-default1')
            }
          })
        })
        $('.bar1').on('click', function (event) {
          var target = event.target
          var parentdiv = $(target).parent()
          var curindex = $(parentdiv).children('div').index(target) // 找出事件触发的控件在父控件中的定位
          // console.log(curindex)
          $('.score-plugin .bar1').each(function (index, element) {
            if (index === curindex) {
              $(this).addClass('score-current')
            } else {
              $(this).removeClass('score-current')
            }
          })
          var selectedindex = getCurrentIndex1()
          $('.score-plugin .select1 option').each(function (index, element) {
            if (index === selectedindex) {
              // console.log($(this))
              $(this).attr('selected', true)
            } else {
              $(this).attr('selected', false)
            }
          })
          // console.log(getCurrentIndex())
        })
        function getCurrentIndex1 () {
          // 返回'score-current'对应的控件在父组件中的位置
          var curindex = -1
          $('.score-plugin .bar1').each(function (index, element) {
            if ($(this).hasClass('score-current')) {
              curindex = index
            }
          })
          return curindex
        }

        // 频率控件函数
        $('.bar2').mouseenter(function (event) {
          var target = event.target
          // console.log(target)
          var parentdiv = $(target).parent()
          var curindex = $(parentdiv).children('div').index(target) // 找出事件触发的控件在父控件中的定位
          $('.bottomfigure2').text(10 - curindex)
          $('.score-plugin .bar2').each(function (index, element) {
            if (index >= curindex) {
              $(this).removeClass('score-default2').addClass('score-selected2')
            } else {
              $(this).removeClass('score-selected2').addClass('score-default2')
            }
          })
        }).mouseleave(function (event) {
          // console.log(target)
          var curindex = getCurrentIndex2()
          $('.bottomfigure2').text(10 - curindex)
          $('.score-plugin .bar2').each(function (index, element) {
            if (index >= curindex) {
              $(this).removeClass('score-default2').addClass('score-selected2')
            } else {
              $(this).removeClass('score-selected2').addClass('score-default2')
            }
          })
        })
        $('.bar2').on('click', function (event) {
          var target = event.target
          var parentdiv = $(target).parent()
          var curindex = $(parentdiv).children('div').index(target) // 找出事件触发的控件在父控件中的定位
          $('.score-plugin .bar2').each(function (index, element) {
            if (index === curindex) {
              $(this).addClass('score-current')
            } else {
              $(this).removeClass('score-current')
            }
          })
          var selectedindex = getCurrentIndex2()
          $('.score-plugin .select2 option').each(function (index, element) {
            if (index === selectedindex) {
              // console.log($(this))
              $(this).attr('selected', true)
            } else {
              $(this).attr('selected', false)
            }
          })
          // console.log(getCurrentIndex())
        })
        function getCurrentIndex2 () {
          // 返回'score-current'对应的控件在父组件中的位置
          var curindex = -1
          $('.score-plugin .bar2').each(function (index, element) {
            if ($(this).hasClass('score-current')) {
              curindex = index
            }
          })
          return curindex
        }
      },
      setMultiBlankData (data) {  // 设置多项填空的值
        console.log(data)
        $('.multiblankinput input').each(function (index, element) {
          if (data.length >= index + 1) {  // 判断是否有数据
            $(this).val(data[index])
          }
        })
      },
      setSymptomScoreData (data) { // 设置评分题的值
        var datafigure = []
        datafigure.push(parseInt(data[0]))
        datafigure.push(parseInt(data[1]))
        $('.bottomfigure1').text(datafigure[0])
        var selectedindex1 = 10 - datafigure[0] // option指定的选项在父组件中的位置
        $('.score-plugin .bar1').each(function (index, element) {
          $('.score-plugin .select1 option').eq(index).attr('selected', false)
          $(this).removeClass('score-current')
          if (index === selectedindex1) {
            $(this).addClass('score-current')
            $('.score-plugin .select1 option').eq(index).attr('selected', true)
          }
          if (index >= selectedindex1) {
            $(this).removeClass('score-default1').addClass('score-selected1')
          } else {
            $(this).removeClass('score-selected1').addClass('score-default1')
          }
        })
        $('.bottomfigure2').text(datafigure[1])
        var selectedindex2 = 10 - datafigure[1] // option指定的选项在父组件中的位置
        $('.score-plugin .bar2').each(function (index, element) {
          $('.score-plugin .select2 option').eq(index).attr('selected', false)
          $(this).removeClass('score-current')
          if (index === selectedindex2) {
            $(this).addClass('score-current')
            $('.score-plugin .select2 option').eq(index).attr('selected', true)
          }
          if (index >= selectedindex2) {
            $(this).removeClass('score-default2').addClass('score-selected2')
          } else {
            $(this).removeClass('score-selected2').addClass('score-default2')
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
      validModification () {
        var formjson = $('#patient-form').serializeArray()
        // console.log(formjson)
        var status = true
        switch (this.curquestion.type) {
          case 'multi_blank':
            var blanklength = this.curquestion.content.titles.length
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
          var data = []
          switch (this.curquestion.type) {
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
          this.$dispatch('editanswer', data)
          this.$router.go('/preview')
        }
      }
    }
  }
</script>
