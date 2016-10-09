<template id="score">
    <label class="am-form-label questiontitle" style="background-color:#cccccc;width:100%">Q{{curindex+1}}&nbsp;&nbsp;{{questionItem.title}}</label>
    <div v-for="tipsintem in questionItem.tips" class="questiontips" track-by="$index">
      提示{{$index+1}}:&nbsp;{{questionItem.tips}}
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
        <div class="score-plugin" style="margin:auto" id="symptom">
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
        <div class=" score-plugin" style="margin:auto" id="frequency">
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
</template>
<style>
    body{
        background-color: white;
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
    .questiontitle{
      padding-left: 5px;
      font-size: 20px;
      text-align: left;
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
    /* var attachFastClick = require('fastclick')*/
    export default{
      props: ['questionItem', 'curindex', 'defaultdata'],
      data () {
        return {
          name: 'score'
        }
      },
      ready: function () {
        this.scoreControl()
        this.setSymptomScoreData(this.defaultdata)
/*        var symptom = document.getElementById('symptom')
        var frequency = document.getElementById('frequency')*/
/*        attachFastClick(symptom)
        attachFastClick(frequency)*/
      },
      attached: function () {
        // attachFastClick('#score')
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
                $('.score-plugin .select1').children('option').eq(index).attr('selected', true)
              } else {
                $(this).removeClass('score-current')
                $('.score-plugin .select1').children('option').eq(index).attr('selected', false)
              }
            })
          })
/*          $('.bar1').on('touchstart', function (event) {
            var target = event.target
            var parentdiv = $(target).parent()
            var curindex = $(parentdiv).children('div').index(target) // 找出事件触发的控件在父控件中的定位
            // console.log(curindex)
            $('.score-plugin .bar1').each(function (index, element) {
              if (index === curindex) {
                $(this).addClass('score-current')
                $('.score-plugin .select1').children('option').eq(index).attr('selected', true)
              } else {
                $(this).removeClass('score-current')
                $('.score-plugin .select1').children('option').eq(index).attr('selected', false)
              }
            })
          })*/
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
                $('.score-plugin .select2').children('option').eq(index).attr('selected', true)
              } else {
                $(this).removeClass('score-current')
                $('.score-plugin .select2').children('option').eq(index).attr('selected', false)
              }
            })
          })
/*          $('.bar2').on('touchstart', function (event) {
            var target = event.target
            var parentdiv = $(target).parent()
            var curindex = $(parentdiv).children('div').index(target) // 找出事件触发的控件在父控件中的定位
            $('.score-plugin .bar2').each(function (index, element) {
              if (index === curindex) {
                $(this).addClass('score-current')
                $('.score-plugin .select2').children('option').eq(index).attr('selected', true)
              } else {
                $(this).removeClass('score-current')
                $('.score-plugin .select2').children('option').eq(index).attr('selected', false)
              }
            })
          })*/
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
        }
      }
    }
</script>
