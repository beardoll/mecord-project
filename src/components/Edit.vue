<template>
  <!--- 修改问卷 --->
    <div id="edit">
      <form class= "am-form am-form-horizontal">
        <fieldset>
          <div v-for="questionItem in questionnaire.questItemList" track-by = "$index">
            <div v-if="questionItem.type === 'blank'">
              <!--- 填空题 --->
              <div class="am-form-group am-u-sm-8" >
                <label :for="questionItem.name+$index" class="am-u-sm-4 am-form-label">{{questionItem.title}}</label>
                <div class="am-u-sm-8">
                  <input type="text" :id="questionItem.name+$index">
                </div>
              </div>
            </div>
            <div v-if="questionItem.type === 'radio'" class="am-u-sm-8">
              <!--- 单选题 --->
              <div class="am-form-group">
                <label :for="questionItem.name+$index" class="am-u-sm-4 am-form-label">{{questionItem.title}}</label>
                <div :id="questionItem.name+$index" class="am-u-sm-8">
                  <div class="am-radio am-radio-inline" v-for="selection in questionItem.selections">
                    <input type = "radio">{{selection}}
                  </div>
                </div>
              </div>
            </div>
            <div v-if="questionItem.type === 'checkbox'" class="am-u-sm-8">
              <!--- 多选题 --->
              <div class= "am-form-group">
                <label :for="quesitonItem.name+$index">{{questionItem.title}}</label>
                <div :id = "quesitonItem.name+$index">
                  <div v-for = "selection in questionItem.selections">
                    <label class= "am-checkbox-inline">
                      <input type= 'checkbox' value = "option + $index"> {{selection}}
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="am-u-sm-2">
              <button type="button" class="am-btn am-btn-primary" data-operation="edit" @click.stop="handleInput($event, questionItem, $index)">编辑</button>
            </div>
            <div class="am-u-sm-2">
              <button type="button" class="am-btn am-btn-primary" data-operation="delete" @click.stop="handleInput($event, questionItem, $index)">删除</button>
            </div>
          </div>
        </fieldset>
      </form>
      <div v-if="showEditWindow" class="editWindow">
        <div class="windowHeader"></div>
        <div>
          <form class="am-form">
            <fieldset>
              <div class="am-form-group">
                <label for="titleedit" class="am-u-sm-4 am-form-label">题目</label>
                <div class="am-u-sm-8">
                  <input id="titleedit" type="text" :value="questionItem.title" v-el:edit-title/>
                </div>
              </div>
              <div class="am-form-group">
                <label for="selectionedit" class="am-u-sm-4 am-form-label">选项</label>
                <div class="am-u-sm-8">
                  <input id="selectionedit" type="text" :value="questionItem.selections"
                         :disabled="questionItem.type === 'blank'" v-el:edit-selections/>
                </div>
              </div>
            </fieldset>
          </form>
          <p>*&nbsp 不同选项之间请以半角逗号隔开</p>
          <button type="button" class="am-btn am-btn-primary" data-operation="confirm" @click.stop="handleEdit(questionItem)">确定</button>
          <button type="button" class="am-btn am-btn-primary" data-operation="cancel" @click.stop="showEditWindow=false">取消</button>
        </div>
      </div>
    </div>
</template>
<style>
    body{
        background-color:white;
    }
    #edit{
      padding-top: 150px;
      width: 700px;
      height: 700px;
    }
    .editWindow{
      border: solid 1px wheat;
    }

</style>
<script>
  export default{
    data () {
      return {
        questionItem: {},
        showEditWindow: false,
        questionnaire: {
          title: 'test',
          deadline: '2016/9/11',
          questItemList: [
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
      }
    },
    methods: {
      handleInput (event, questionItem, index) {
        // 当用户选中某个题目并且打算进行编辑时
        let operation = event.target.dataset.operation
        if (operation === 'edit') { // 修改问题
          this.questionItem.title = questionItem.title
          this.questionItem.selections = questionItem.selections
          this.questionItem.index = index
          this.questionItem.type = questionItem.type
          this.showEditWindow = true
        } else {  // 删除问题
          this.questionnaire.questItemList.$remove(questionItem)
        }
      },
      handleEdit (questionItem) {
        // 进行问题编辑
        let newItemTitle = this.$els.editTitle
        console.log(newItemTitle)
        if (newItemTitle.value.trim() === '') {
          this.showEditWindow = false
          return // 无效更改
        } else {
          let newSelections = this.$els.editSelections.value.trim().split(',')
          var qt = {}
          qt.title = newItemTitle.value.trim()
          qt.selections = newSelections
          qt.name = Date.now()
          qt.type = questionItem.type
          console.log(qt)
          // this.questionItem.title = newItemTitle.value.trim()
          // this.questionItem.selections = newSelections
          this.questionnaire.questItemList.splice(this.questionItem.index, 1, qt)
          // this.questionnaire.questItemList.push(qt)
          this.showEditWindow = false
        }
      }
    }
  }
</script>
