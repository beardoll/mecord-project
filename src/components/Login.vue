<template>
    <div id="login">
      <div class="loginheader">
        <div class="am-u-sm-3">
          <i class="am-icon-md am-icon-arrow-left"></i>
        </div>
        <span class="am-u-sm-6 am-u-end" style="text-align:center;font-size:20px">登录</span>
      </div>
      <div class="loginbody">
        <form>
          <div class="am-form-group am-form-icon">
            <i class="am-icon-user"></i>
            <input type="text" class="am-form-field" placeholder="请输入用户名">
          </div>
          <div class="am-form-group am-form-icon">
            <i class="am-icon-lock"></i>
            <input type="password" class="am-form-field" placeholder="请输入密码">
          </div>
        </form>
        <div class="rempsw">
          <div class="am-u-sm-6" style="padding-left:0px">
            <input type="checkbox" value="a">&nbsp; 记住密码
          </div>
          <div class="am-u-sm-6" style="font-size:10px;color:orange"> 忘记密码 </div>
        </div>
        <div class="loginbutton">
          <button type="button" class="am-btn am-btn-primary" style="padding-left:40px;padding-right:40px">登录</button>
        </div>
        <div class="signature">
          <span style="font-size:12px">还没有账户?&nbsp;&nbsp;</span><span style="font-size:12px;color:orange">立即注册</span>
        </div>
      </div>
    </div>
</template>
<style>
    body{
        background-color:burlywood;
    }
    #login{
      background-color: white;
      margin-top: 100px;
      width: 400px;
      border: solid 1px snow;
      padding-bottom: 150px;
    }
    #login .loginheader{
      width: 100%;
      height: 52px;
      padding-top: 10px;
      background-color: dodgerblue;
    }
    #login .loginbody{
      padding-top: 20px;
      padding-left: 50px;
      padding-right: 50px;
    }
    #login .rempsw{
      width: 100%;
    }
    #login .loginbutton{
      padding-top: 50px;
    }
    #login .signature{
      padding-top: 40px
    }
</style>
<script>
    export default{
      data () {
        return {
          account: '',
          password: ''
        }
      }
    }
</script>
