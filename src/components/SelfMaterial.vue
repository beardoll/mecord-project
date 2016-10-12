<template>
    <div id="selfmaterial">
<!--      <div class="smheader">
        <div class="am-u-sm-3" style="text-align:left">
          <img src="../assets/left-arrow.png" style="cursor:pointer;width:35px;height:35px;margin-top:1%"
               @click.stop="backToFrontPage()">
        </div>
        <span class="am-u-sm-6" style="text-align:center;font-size:24px;color:white">个人资料</span>
        <span class="am-u-sm-3 savetext" style="font-size:16px;color:white;margin-top:8px;
        cursor:pointer" @click.stop="save()">保存</span>
      </div>-->
      <div class="" style="width:100%;height:90%">
        <div class="tabs-body">
            <form class="am-form am-form-horizontal">
              <legend>个人信息</legend>
              <div class="am-form-group">
                <div class="am-u-sm-4" style="text-align:left">
                  <label for="smuser" class="am-form-label">昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称</label>
                </div>
                <div class="am-u-sm-8" style="padding:0">
                  <input id="smuser" type="text" class="am-form-field am-u-sm-9" :value = "nickname">
                </div>
              </div>
              <div class="am-form-group">
                <div class="am-u-sm-4" style="text-align:left">
                  <label for="smsex" class="am-form-label">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别</label>
                </div>
                <div class="am-u-sm-8" style="padding:0">
                  <input id="smsex" type="text" class="am-form-field am-u-sm-9" :value = "sex">
                </div>
              </div>
              <div class="am-form-group">
                <div class="am-u-sm-4" style="text-align:left">
                  <label for="smbirth" class="am-form-label">出生年月</label>
                </div>
                <div class="am-u-sm-8" style="padding:0">
                  <p>
                    <input id="smbirth" type="date" :value="birthday"/>
                  </p>
                  <!--<input id="smbirth" type="text" class="am-form-field am-u-sm-9" :value = "birthday">-->
                </div>
              </div>
              <legend>隐私信息
                <span class="am-icon am-icon-caret-down"style="margin:0;padding:0" @click.stop="expandPrivateInfo()"></span>
              </legend>
              <div style="display:none" id="privateinfo">
                <div class="am-form-group">
                  <div class="am-u-sm-4" style="text-align:left">
                    <label for="smphone" class="am-form-label" >手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机</label>
                  </div>
                  <div class="am-u-sm-8" style="padding:0">
                    <input id="smphone" type="text" class="am-form-field am-u-sm-9" placeholder="1300000000">
                  </div>
                </div>
                <div class="am-form-group">
                  <div class="am-u-sm-4" style="text-align:left">
                    <label for="smmail" class="am-form-label">邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱</label>
                  </div>
                  <div class="am-u-sm-8" style="padding:0">
                    <input id="smmail" type="text" class="am-form-field am-u-sm-9" placeholder="">
                  </div>
                </div>
                <div class="am-form-group">
                  <div class="am-u-sm-4" style="text-align:left">
                    <label for="smaddr" class="am-form-label">家庭住址</label>
                  </div>
                  <div class="am-u-sm-8" style="padding:0">
                    <input id="smaddr" type="text" class="am-form-field am-u-sm-9" placeholder="">
                  </div>
                </div>
                <div class="am-form-group">
                  <div class="am-u-sm-4" style="text-align:left">
                    <label for="smrealname" class="am-form-label">真实姓名</label>
                  </div>
                  <div class="am-u-sm-8" style="padding:0">
                    <input id="smrealname" type="text" class="am-form-field am-u-sm-9" placeholder="">
                  </div>
                </div>
              </div>
            </form>
        </div>
      </div>
    </div>
</template>
<style>
    *{
      margin: 0;
      padding: 0;
    }
    body{
        background-color: white;
    }
    #selfmaterial{
      background-color: white;
      width: 100%;
      height: 100%;
      padding-left: 0;
    }
    #selfmaterial .smheader {
      width: 100%;
      height: 10%;
      padding-top: 10px;
      background-color: dodgerblue;
    }
    #selfmaterial .smbody .topbar{
      width: 300px;
      margin: auto;
    }
    #selfmaterial .smbody .publicinfo{
      padding-left: 0px;
      margin-left: 0px;
    }
    #selfmaterial .topbar li{
      display: inline-block;
      width: 100px;
      margin-top: 10px;
      padding-top: 5px;
      padding-bottom: 5px;
      border: solid 1px grey;
    }
    .active{
      background-color: darkgrey;
    }
    .default{
      background-color: white;
    }
    #selfmaterial .topbar{
      margin: auto;
      list-style-type: none;
    }
    .savetext:hover{
      font-weight: bold;
    }
    .tabs-body{
      border:solid 1px snow;
      width:100%;
      margin-top: 20px;
    }
    .tabs-body form{
      margin-right: 40px;
      margin-left: 20px;
    }
    .tabs-body form legend{
      text-align:left;
      font-size:28px;
      color:orange;
      margin-left: 0px;
    }
</style>
<script>
  export default {
    data () {
      return {
        showIndex: 0
      }
    },
    computed: {
      nickname: function () {
        return this.$root.userData.nickname
      },
      sex: function () {
        var temp = this.$root.userData.sex
        if (temp === 1) {
          return '男'
        } else {
          return '女'
        }
      },
      birthday: function () {
        var temp = []
        var bir = this.$root.userData.birthday
        if (bir === null) {
          temp = new Date()
        } else {
          temp = new Date(bir)
        }
        var day = temp.getDay()
        var month = temp.getMonth() + 1
        var year = temp.getFullYear()
        if (parseInt(day) < 10) {
          day = '0' + day
        }
        if (parseInt(month) < 10) {
          month = '0' + month
        }
        var returndata = year + '-' + month + '-' + day
        return returndata
        // return '2014-09-01'
      }
    },
    methods: {
      save () {
        // 保存个人资料
      },
      expandPrivateInfo () {
        $('#privateinfo').toggle()
      },
      backToFrontPage () {
        // 返回上一页
        this.$router.go('/userinterface/:3')
      },
      handleClick (event) {
        // 响应标签点击事件
        var target = event.target
        var selectedIndex = $('#topbar').children('li').index(target) // 被选中的li的编号
        this.showIndex = selectedIndex
        $('#topbar li').each(function (index, element) {
          if (index === selectedIndex) {
            $(this).removeClass('default')
            $(this).addClass('active')
          } else {
            $(this).removeClass('active')
            $(this).addClass('default')
          }
        })
      }
    }
  }
</script>
