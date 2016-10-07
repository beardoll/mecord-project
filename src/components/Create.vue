<template>
    <div id="create" class="demo">
      <form class= "am-form am-form-horizontal">
        <fieldset>
          <div v-for="questionItem in questionnaire.questionItemList" track-by = "$index">
            <div v-if="questionItem.type === 'blank'">
              <!--- 填空题 --->
              <div class="am-form-group">
                <label :for="questionItem.name+$index" class="am-form-label am-u-sm-4">{{questionItem.title}}</label>
                <div class="am-u-sm-8">
                  <input type="text" :id="questionItem.name+$index">
                </div>
              </div>
            </div>
            <div v-if="questionItem.type === 'radio'">
              <!--- 单选题 --->
              <div class="am-form-group">
                <label :for="questionItem.name+$index" class="am-form-label am-u-sm-4">{{questionItem.title}}</label>
                <div class="am-u-sm-8" :id="questionItem.name+$index">
                  <div v-for="selection in questionItem.selections" class="am-radio am-radio-inline">
                    <input type = "radio" :name="questionItem.name">{{selection}}
                  </div>
                </div>
              </div>
            </div>
            <div v-if="questionItem.type === 'checkbox'">
              <!--- 多选题 --->
              <div class= "am-form-group">
                <label :for="quesitonItem.name+$index" class="am-form-label am-u-sm-4">{{questionItem.title}}</label>
                <div :id = "quesitonItem.name+$index" class="am-u-sm-8">
                  <div v-for = "selection in questionItem.selections" class= "am-checkbox am-checkbox-inline">
                    <input type= 'checkbox' value = "option + $index"> {{selection}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </fieldset>
      </form>

      <div v-show="windowShow" class="windowShow">
        <!--- 当点击添加问卷按钮后，弹出一个窗口 --->
        <div class= "window-head"></div> <!--- 头部 --->
        <div>
          <div>{{newItemTips}}</div>
          <form class="am-form am-form-horizonal">
            <fieldset>
              <div class="am-form-group">
                <label for="title-input-box" class="am-u-sm-4 am-form-label">标题</label>
                <div class="am-u-sm-8">
                  <input type="text" id="title-input-box" placeholder = "请在此输入标题" v-el:item-title/>
                </div>
              </div>
              <div class="am-form-group">
                <label class="am-u-sm-4 am-form-label">选项</label>
                <div class="am-u-sm-8">
                  <input type="text" :disabled="newItemType === 'blank'" id="selection-input-box"
                         placeholder = "选项之间用半角逗号隔开" v-el:item-selections>
                  <!-- 如果是文本题，则选项输入框不可用 -->
                </div>
              </div>
            </fieldset>
          </form>
          <button type="button" class="am-btn am-btn-primary" data-operation = "confirm" @click.stop= "handleInput($event)">确定</button>
          <button type="button" class="am-btn am-btn-primary" data-operation = "cancel" @click.stop= "handleInput($event)">取消</button>
        </div>
      </div>
      <div class="select">
        <div v-show="selectbutton" @click.stop="addItems($event)" class="selectbutton">
          <!----- 当点击“添加问题”按钮后，需要选择添加的题目类型 ---->
          <div class="am-u-sm-4">
            <button type="button" class="am-btn am-btn-primary" data-type="blank">文本题</button>
          </div>
          <div class="am-u-sm-4">
            <button type="button" class="am-btn am-btn-primary" data-type="radio">单选题</button>
          </div>
          <div class="am-u-sm-4">
            <button type="button" class="am-btn am-btn-primary" data-type="checkbox">多选题</button>
          </div>
        </div>
        <div class="addbutton">
          <button type="button" class="am-btn am-btn-primary" @click.stop = "selectbutton=!selectbutton">添加问题</button>
        </div>
      </div>
    </div>
</template>
<style>
    body{
        background-color:white;
    }
    #create{
      position: absolute;
      top: 100px;
      left: 200px;
      width: 600px;
      height: 400px;
    }
    .select{
      position: relative;
      left: 120px;
    }
    .select .selectbutton{
      position: absolute;

    }
    .select .addbutton{
      position: absolute;
      top: 50px;
      left: 130px;
    }

</style>
<script>
  export default{
    data () {
      return {
        windowShow: false,
        selectbutton: false,
        questionnaire: {
          title: '',
          deadline: '',
          questionItemList: [
            // title, type, selections, name
            // type: blank, radio, checkbox
            // name: Date.now()
          ]
        },
        newItem: {}, // 新增加的问题
        newItemType: '', // 新问题的类型
        newItemTips: '' // 提示语
      }
    },
    methods: {
      addItems (event) { // 添加问题的类型选择后，打开设置题目窗口
        this.newItemType = event.target.dataset.type
        this.newItem.type = event.target.dataset.type  // 问题类型
        switch (this.newItemType) {
          case 'blank':
            this.newItemTips = '文本题'
            break
          case 'radio':
            this.newItemTips = '单选题'
            break
          case 'checkbox':
            this.newItemTips = '多选题'
            break
        }
        this.windowShow = true
        this.selectbutton = false
      },
      handleInput (event) { // 填写完所添加问题的信息后，进行数据录入处理
        let operation = event.target.dataset.operation // 操作类型
        let itemTitle = this.$els.itemTitle
        let itemSelections = this.$els.itemSelections
        if (operation === 'confirm') {
          if (this.newItem.type === 'blank') {
            // 如果这次的问题类型是填空题，则直接增加标题即可
            this.addTextarea(itemTitle)
          } else {
            this.addSelections(itemTitle, itemSelections)
          }
        } else {
          this.windowShow = false  // 否则，关闭窗口
        }
      },
      addTextarea (itemTitle) {
        if (itemTitle.value.trim() === '') {
          // 如果问题标题为空
          console.log(itemTitle)
          this.handleCancel()
        } else {
          this.newItem.name = Date.now()
          this.newItem.title = itemTitle.value.trim()
          this.questionnaire.questionItemList.push(this.newItem)
          this.handleCancel()
        }
      },
      addSelections (itemTitle, itemSelections) {
        if (itemTitle.value.trim() === '') {
          this.handleCancel()
        } else {
          this.newItem.title = itemTitle.value.trim()
          this.newItem.selections = itemSelections.value.trim().split(',') // 匹配任何的空白字符串
          this.newItem.name = Date.now()
          this.questionnaire.questionItemList.push(this.newItem)
          this.handleCancel()
        }
      },
      handleCancel () {
        // 添加完问题后，清空变量，关掉窗口
        this.$els.itemTitle.value = ''
        this.$els.itemSelections.value = ''
        this.windowShow = false
        this.newItem = {}
        this.newItemType = ''
        this.newItemTips = ''
      }
    }
  }
</script>
