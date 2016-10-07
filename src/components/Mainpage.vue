<template>
    <div id="mainpage">
      <div class="mainpageheader">
        <div class="am-u-sm-3">
          <i class="am-icon-md am-icon-arrow-left"></i>
        </div>
        <span class="am-u-sm-6 am-u-end" style="text-align:center;font-size:20px">Mecord</span>
      </div>
      <div class="searchbox">
        <input type="search" results="s" style="width:350px;height:30px;border-radius:15px;text-align:center" placeholder="查找任务">
      </div>
      <div class="mainpagebody">
        <table class="am-table">
          <tbody>
            <tr>
              <td style="font-size:20px;padding-top:20px;padding-bottom:20px;text-align:left">当前已完成任务：(1/12)</td>
            </tr>
            <tr>
              <td style="background-color:#9da0a4;text-align:left;padding-left:15px" >
                <i class="am-icon am-icon-envelope"></i>&nbsp;&nbsp;&nbsp;我的任务:
              </td>
            </tr>
            <tr v-if = !showdetail v-for="taskindex in minitasks" track-by="$index">
              <td>
                <p style="text-align:left"><span style="font-size:20px;color:blue">{{taskindex.title}}</span>
                  <span style="font-size:12px">&nbsp;&nbsp;[标准]</span>
                  <span style="font-size:12px;color:blue;float:right;padding-right:20px">[详情]</span>
                </p>
                <p style="text-align:left;font-size:12px">{{taskindex.description}}</p>
                <p style="text-align:left;font-size:12px">预期完成时间：{{taskindex.deadline}}</p>
              </td>
            </tr>
            <tr v-if = showdetail v-for="taskindex in tasks" track-by="$index">
              <td>
                <p style="text-align:left"><span style="font-size:20px;color:blue">{{taskindex.title}}</span>
                  <span style="font-size:12px">&nbsp;&nbsp;[标准]</span>
                  <span style="font-size:12px;color:blue;float:right;padding-right:20px">[详情]</span>
                </p>
                <p style="text-align:left;font-size:12px">{{taskindex.description}}</p>
                <p style="text-align:left;font-size:12px">预期完成时间：{{taskindex.deadline}}</p>
              </td>
            </tr>
            <tr>
              <td style="font-size:12px;background-color:#9da0a4;cursor:pointer" @click.stop="showdetail=!showdetail">查看更多任务</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="footer" style="margin-top:100px" id="footer">
        <div class="am-u-sm-3" style="background-color:dodgerblue;padding-top:10px;cursor:pointer"
             data-defaultimg = "am-icon-md am-icon-home" data-showimg = "am-icon-md am-icon-user"
             @click.stop="changeimg($event)">
          <i class="am-icon-md am-icon-home"></i>
          <p style="margin:0;padding:0">主页</p>
        </div>
        <div class="am-u-sm-3" style="background-color:dodgerblue;padding-top:10px;cursor:pointer"
             data-defaultimg = "am-icon-md am-icon-home" data-showimg = "am-icon-md am-icon-user"
             @click.stop="changeimg($event)">
          <i class="am-icon-md am-icon-home"></i>
          <p style="margin:0;padding:0">通知</p>
        </div>
        <div class="am-u-sm-3" style="background-color:dodgerblue;padding-top:10px;cursor:pointer"
             data-defaultimg = "am-icon-md am-icon-home" data-showimg = "am-icon-md am-icon-user"
             @click.stop="changeimg($event)">
          <i class="am-icon-md am-icon-home"></i>
          <p style="margin:0;padding:0">通讯录</p>
        </div>
        <div class="am-u-sm-3" style="background-color:dodgerblue;padding-top:10px;cursor:pointer"
             data-defaultimg = "am-icon-md am-icon-home" data-showimg = "am-icon-md am-icon-user"
             @click.stop="changeimg($event)">
          <i class="am-icon-md am-icon-home"></i>
          <p style="margin:0;padding:0" style="color:black">个人中心</p>
        </div>
      </div>
    </div>
</template>
<style>
    body{
        background-color:white;
    }
    #mainpage{
      background-color: white;
      margin-top:500px;
      width: 450px;
      border: solid 1px gold;
      padding-bottom: 0px;
    }
    #mainpage .mainpageheader{
      width: 100%;
      height: 52px;
      padding-top: 10px;
      background-color: dodgerblue;
    }
    #mainpage .searchbox{
      padding-top: 10px;
      padding-bottom: 10px;
    }
</style>
<script>
  export default{
    data () {
      return {
        showdetail: false,
        tasks: [
          {
            title: '感冒健康问卷。',
            description: '针对于感冒流感等症状进行的问卷咨询。',
            deadline: '今天'
          },
          {
            title: '肺炎健康问卷。',
            description: '针对肺炎发热等症状进行的问卷咨询。',
            deadline: '2016.10.13'
          },
          {
            title: 'XX健康问卷。',
            description: '针对xxxx等症状进行的问卷咨询。',
            deadline: '2016.9.10'
          }
        ]
      }
    },
    computed: {
      minitasks: function () {
        var temp = []
        for (var i = 0; i < this.tasks.length; i++) {
          if (i < 2) {
            temp.push(this.tasks[i])
          }
        }
        console.log(temp)
        return temp
      }
    },
    methods: {
/*      showdetail () {
        this.showdetail = true
      }*/
    }
  }
</script>
