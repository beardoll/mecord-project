<template>
    <div id="modification">
      <div class="mobody">
        <div class="motitle">{{questions.title}}</div>
        <div class="moquestion">
          <form class= "am-form" style="padding:0;margin:0" id="patient-form">
            <fieldset style="padding:0;margin:0">
              <div v-for="questionItem in questions" track-by = "$index">
                <div v-if="$index === curindex">
                  <div v-if="questionItem.type === 'blank'">
                    <div class="am-form-group" style="text-align:left">
                      <label class="am-form-label questiontitle" >Q{{curindex+1}}&nbsp;&nbsp;{{questionItem.title}}</label>
                      <div v-for="tipsitem in questionItem.tips" class="questiontips" track-by="$index">
                        提示{{$index+1}}:{{tipsitem}}
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
                      提示{{$index+1}}:{{tipsitem}}
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
                    <Score :question-item = "questionItem" :curindex = "curindex" :defaultdata = "scoredefaultdata" v-ref:score></Score>
                  </div>
                  <div v-if="questionItem.type === 'upload_image'">
                    <uploadimg :imgsrcforchild = "imgsrcforchild" :question-item = "questionItem" :curindex = "curindex"></uploadimg>
                  </div>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
      <div style="margin-top:50px" class="am-topbar am-topbar-fixed-bottom">
        <button type="button" class="am-btn am-btn-lg am-btn-primary am-radius" @click.stop="validModification()">确认修改</button>
      </div>
    </div>
</template>
<style lang="less">
    body{
        background-color:white;
    }
    #modification{
      background-color: white;
      margin-top: 0px;
      width: 100%;
      height: 100%;
      padding-bottom: 0px;

      .mobody{
        width: 100%;
        height: 100%;

        .motitle{ /* 问卷的标题 */
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
          }
        }
      }
    }
</style>
<script>
  import Score from './Score'
  import uploadimg from './UploadImg'
  export default{
    data () {
      return {
        scoredefaultdata: [0, 0],
        imgsrcforchild: '', // 给子组件传递的img地址
        imgsrc: ''
      }
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
    created: function () {
      if (this.curquestion.type === 'symptom_score') {
        this.scoredefaultdata = this.curanswer
      }
      if (this.curquestion.type === 'upload_image') {
        this.imgsrcforchild = this.curanswer
      }
    },
    ready: function () {
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
      }
    },
    methods: {
      setMultiBlankData (data) {  // 设置多项填空的值
        console.log(data)
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
      validModification () {
        var formjson
        if (this.curquestion.type !== 'upload_image') {
          formjson = $('#patient-form').serializeArray()
        } else {
          formjson = this.imgsrc
        }
        // console.log(formjson)
        var status = true
        switch (this.curquestion.type) {  // 先验证是否已完成题目
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
          case 'upload_image':
            if (formjson === '') {
              status = false
            }
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
              data.push(formjson)
              break
          }
          this.$dispatch('editanswer', data)  // 修改后的答案
          this.$router.go('/preview')
        }
      }
    }
  }
</script>
