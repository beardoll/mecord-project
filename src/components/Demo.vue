<template>
  <!----  显示表单内容 --->
    <div id="demo">
      <form class= "am-form am-form-horizontal">
        <fieldset>
          <div v-for="questionItem in questionnaire" track-by = "$index">
            <div v-if="questionItem.type === 'blank'">
              <div class="am-form-group">
                <label :for="questionItem.title+$index" class="am-u-sm-4 am-form-label">{{questionItem.title}}</label>
                <div class="am-u-sm-7">
                  <input type="number" :id="questionItem.title+$index">
                </div>
                <div class="am-u-sm-1">
                  <span>{{questionItem.content.unit}}</span>
                </div>
              </div>
            </div>
            <div v-if="questionItem.type === 'select'">
              <div class="am-form-group">
                <label :for="questionItem.title+$index" class="am-u-sm-4 am-form-label">{{questionItem.title}}</label>
                <div class="am-u-sm-8" :id="questionItem.title+$index">
                  <div class="am-radio am-radio-inline" v-for="selection in questionItem.content.choice" >
                    <input type = "radio" :name = "questionItem.title">{{selection}}
                  </div>
                </div>
              </div>
            </div>
            <div v-if="questionItem.type == 'multi-select'">
              <div class= "am-form-group am-g am-g-collapse">
                <label :for="quesitonItem.title+$index" class="am-u-sm-4 am-form-label">{{questionItem.title}}</label>
                <div :id = "quesitonItem.title+$index" class="am-u-sm-4">
                  <div v-for="selection in questionItem.content.choice">
                    <div class= "am-checkbox-inline">
                      <input type= 'checkbox' value = "option + $index"> {{selection}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </fieldset>
      </form>
      <button type="button" class="am-btn am-btn-primary">提交表单</button>
    </div>
</template>

<style>
    body{
        background-color:white;
    }
    #demo{
      width: 500px;
      height: 400px;
    }
</style>

<script>
  export default{
    data () {
      return {
        questionnaire: []
      }
    },
    ready: function () {
      this.getQuestionnaire()
    },
    methods: {
      getQuestionnaire () {
        this.$http.get('http://mecord.cn:3000/api/Questions').then((response) => {
          this.$set('questionnaire', response.body)
          console.log('success!')
        }, (response) => {
          // error callback
          console.log('bad!')
        })
      }
    }
      /* questionItems: [
          {
            title: '你的名字',
            type: 'blank',
            name: 'name'
          },
          {
            title: '你的体重',
            type: 'blank',
            name: 'weight'
          },
          {
            title: '你的性别',
            type: 'radio',
            name: 'sex',
            selections: ['男', '女']
          }
        ]
      }
    } */
  }
</script>
