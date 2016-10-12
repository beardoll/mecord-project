<template>
    <div>
      <label class="am-form-label questiontitle" style="background-color:#cccccc;width:100%">Q{{curindex+1}}&nbsp;&nbsp;{{questionItem.title}}</label>
      <div v-for="tipsintem in questionItem.tips" class="questiontips" track-by="$index">
        提示{{$index+1}}:&nbsp;{{questionItem.tips}}
      </div>
      <div class="uploadbutton">
        <button type="button" class="am-btn am-btn-primary" id="chooseImg">选择照片</button>
      </div>
      <p>你选择的图片如下:</p>
      <div class="imgpreview">
        <img :src="imgsrc" width="150px" height="200px">
      </div>
    </div>
</template>
<style>
    body{
        background-color: white;
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
    .uploadbutton{
      margin-top: 30px;
      margin-bottom: 30px;
    }
    .imgpreview{
      margin: auto;
      padding: auto;
      width: 300px;
      height: 400px;
    }
</style>
<script>
    var wx = require('weixin-js-sdk')
    export default{
      props: ['questionItem', 'curindex', 'imgsrcforchild'],
      data () {
        return {
          imgsrc: ''
        }
      },
      ready: function () {
        this.imgsrc = this.imgsrcforchild
        var getURL = 'https://api.mecord.cn/api/CoreModels/getJsConfig?url=https%3A%2F%2Fwww.mecord.cn%2F'
        /* var localurl = window.location.href.split('#')[0]
        console.log(localurl)*/
//        var localurl = 'https://www.mecord.cn/'
        this.$http.get(getURL).then((response) => {
          var resbody = response.body
          console.log(JSON.stringify(resbody))
          wx.config({
            debug: false,
            appId: resbody.appId,          // 必填，公众号的唯一标识
            timestamp: resbody.timestamp,      // 必填，生成签名的时间戳
            nonceStr: resbody.nonceStr,      // 必填，生成签名的随机串
            signature: resbody.signature,      // 必填，签名，见附录1
            jsApiList: resbody.jsApiList       // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          })
          wx.ready(function () {
            $('#chooseImg').on('click', function () {
              wx.chooseImage({
                count: 1,  // 默认9
                sizeType: ['original', 'compressed'],  // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'],  // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                  this.imgsrc = res.localIds
                  this.$dispatch('uploadimgsrc', this.imgsrc)
//                  $('#display').attr('src', res.localIds)
//                  var width = $('#display').width()
//                  var height = $('#display').height()
//                  width = width / 2
//                  height = height / 2
//                  $('#display').css('width', width)
//                  $('#display').css('height', height)
                }
              })
            })
          })
        }, (response) => {
          console.log('cannot get signature!')
        })
      }
    }
</script>
