<template>
    <div id="uploadimg">
      <label class="am-form-label questiontitle">Q{{curindex+1}}&nbsp;&nbsp;{{questionItem.title}}</label>
      <div v-for="tipsitem in questionItem.tips" class="questiontips" track-by="$index">
        提示{{$index+1}}:&nbsp;{{tipsitem}}
      </div>
      <div class="uploadbutton">
        <button type="button" class="am-btn am-btn-primary" id="chooseImg">选择照片</button>
      </div>
      <p>你选择的图片如下:</p>
      <div class="imgpreview">
        <img width="150px" height="200px" id="img">
      </div>
    </div>
</template>
<style lang="less">
    body{
        background-color: white;
    }
    #uploadimg {
      .questiontips {  /* 问题提示 */
        text-align: left;
        background-color: #fbedd9;
        padding-left: 5px;
        margin-top: 10px;
      }

      .questiontitle { /* 问题标题 */
        padding-left: 5px;
        font-size: 20px;
        text-align: left;
        background-color:#cccccc;
        width:100%;
      }

      .uploadbutton {  /* 上传照片的按钮 */
        margin-top: 30px;
        margin-bottom: 30px;
      }

      .imgpreview {  /* 预览框 */
        margin: auto;
        padding: auto;
        width: 300px;
        height: 400px;
      }
    }
</style>
<script>
    var wx = require('weixin-js-sdk')
    export default{
      props: ['questionItem', 'curindex', 'imgsrcforchild'],
      data () {
        return {
          temp: ''
        }
      },
      computed: {
        resbody: function () {
          return this.$root.wxsignature
        }
      },
      ready: function () {
        let that = this
        $('#img').attr('src', that.imgsrcforchild)
        wx.config({
          debug: false,
          appId: that.resbody.appId,          // 必填，公众号的唯一标识
          timestamp: that.resbody.timestamp,      // 必填，生成签名的时间戳
          nonceStr: that.resbody.nonceStr,      // 必填，生成签名的随机串
          signature: that.resbody.signature,      // 必填，签名，见附录1
          jsApiList: that.resbody.jsApiList       // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })
        wx.ready(function () {
          $('#chooseImg').on('click', function () {
            wx.chooseImage({
              count: 1,  // 默认9
              sizeType: ['original', 'compressed'],  // 可以指定是原图还是压缩图，默认二者都有
              sourceType: ['album', 'camera'],  // 可以指定来源是相册还是相机，默认二者都有
              success: function (res) {
                $('#img').attr('src', res.localIds)
                that.$dispatch('uploadimgsrc', res.localIds)  // 保存照片的地址
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
      }
    }
</script>
