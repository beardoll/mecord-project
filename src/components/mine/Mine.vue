<template>
  <div id="userinfo">
    <div class="am-u-sm-3" style="text-align:left;margin:0;padding:0">
      <img src="../../assets/wechat-min.png" style="height:80px;width:80px;margin-top:auto;margin-bottom:auto;margin-left:0">
    </div>
    <div class="am-u-sm-6 am-u-end" style="margin:0;padding-top:10px;text-align:left">
      <div style="text-align:left;margin:auto;padding:auto">
        <p style="margin:0;padding:0">昵称：{{user}}</p>
        <!--<p style="margin:0;padding:0">角色：{{role}}</p>-->
      </div>
    </div>
    <div class="useroperation">
      <table class="am-table useroperationlist" style="margin:0">
        <tbody>
        <tr>
          <td @click.stop="goSelfMaterial()">&nbsp;&nbsp;&nbsp;&nbsp;个人资料</td>
        </tr>
<!--        <tr>
          <td @click.stop="upLoadImg()">&nbsp;&nbsp;&nbsp;&nbsp;上传舌苔照片</td>
        </tr>
        <tr>
          <td style="text-align:left">&nbsp;&nbsp;&nbsp;&nbsp;账户绑定</td>
        </tr>
        <tr>
          <td style="text-align:left">&nbsp;&nbsp;&nbsp;&nbsp;隐私设置</td>
        </tr>
        <tr>
          <td style="text-align:left">&nbsp;&nbsp;&nbsp;&nbsp;消息推送</td>
        </tr>
        <tr>
          <td style="text-align:left">&nbsp;&nbsp;&nbsp;&nbsp;检查更新</td>
        </tr>
        <tr>
          <td style="text-align:left">&nbsp;&nbsp;&nbsp;&nbsp;关于</td>
        </tr>-->
        </tbody>
      </table>
      <hr data-am-widget="divider" style="margin:0" class="am-divider am-divider-default" />
    </div>
  </div>
</template>
<style lang="scss">
    body{
        background-color: white;
    }
    #userinfo{
      /*   操作选择(e.g 账户绑定等，外div) */
      .useroperation{
        margin-top: 0px;
        .useroperationlist{
          tbody tr td{ /*   具体操作选择    */
            cursor: pointer;
            text-align:left;
          }
          tbody tr td:hover{ /*   具体操作选择,鼠标经过的时候单元格变色    */
            background-color: darkgrey;
          }
        }
      }
    }
</style>
<script>
    export default{
      data () {
        return {
        }
      },
      computed: {
        user: function () {
          return this.$root.userData.nickname
        },
        role: function () {
          var temp = this.$root.userData.role
          if (temp === 'patient') {
            return '病人'
          } else {
            return '医生'
          }
        }
      },
      methods: {
        goSelfMaterial () {
          this.$router.go('/selfmaterial')
        }
      }
    }
</script>
