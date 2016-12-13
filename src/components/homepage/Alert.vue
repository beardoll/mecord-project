<template>
  <div id="alert">
    <div class="title"></div>
    <div class="content">
      <form id="myform">
        <div class="am-form-group">
          <div class="am-u-sm-6" style="text-align:center">
            <label for="codeinput" class="am-form-label">请输入项目码：</label>
          </div>
          <div class="am-u-sm-6" style="padding:0">
            <input id="codeinput" type="text" class="am-form-field" name="code">
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss">
  #alert{
    width: 300px;
    height: 200px;
    border: 1px solid black;
    .title{
      width: 300px;
      height: 60px;
      border-bottom: 1px solid black;
      background-color: #42b983;
    }
    .content{
      width: 300px;
      height: 140px;
    }
  }
</style>

<script>
  export default{
    data () {
      return {

      }
    }
  }
</script>
