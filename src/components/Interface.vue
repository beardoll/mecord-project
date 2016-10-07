<template>
    <div id="interface">
      <table class= "am-table am-table-striped am-table-hover">
        <thead>
          <tr>
            <th></th>
            <th style="text-align:center">问卷标题</th>
            <th style="text-align:center">截止时间</th>
            <th style="text-align:center">状态</th>
            <th style="text-align:center">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="questionnaireIndex in questionnaireSet">
              <td>
                <div class="am-radio">
                  <input type="radio" name="choose" >
                </div>
              </td>
              <td>
                {{questionnaireIndex.title}}
              </td>
              <td>
                {{questionnaireIndex.deadline}}
              </td>
              <td>
                {{questionnaireIndex.status}}
              </td>
              <td>
                <button type="button" class="am-btn am-btn-primary" @click.stop="handleRequire($event)"
                data-operation="preview">预览问卷</button>
                <button type="button" class="am-btn am-btn-primary" @click.stop="handleRequire($event)"
                data-operation="edit">编辑问卷</button>
              </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <button type="button" class="am-btn am-btn-primary" data-operation="create"
                      @click.stop="handleRequire($event)">增加问卷</button>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
</template>
<style>
    body{
        background-color: white;
    }
</style>
<script>
  export default{
    data () {
      return {
        questionnaireSet: [
          {
            title: '2b',
            status: '未发布',
            deadline: '2016/9/11'
          },
          {
            title: 'rl',
            status: '未发布',
            deadline: '2016/9/11'
          }
        ]
      }
    },
    methods: {
      handleRequire (event) {
        let operation = event.target.dataset.operation
        switch (operation) {
          case 'preview':
            this.$router.go('/demo')
            break
          case 'edit':
            this.$router.go('/edit')
            break
          case 'create':
            this.$router.go('/create')
            break
        }
      }
    }
  }
</script>
