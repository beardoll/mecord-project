<template>
    <div id="userinterface">
        <div class="uiheader">
          <div class="" id="dropdownhead" style="text-align:center;font-size:24px;color:white;margin-top:auto;padding:auto">
              Mecord
          </div>
        </div>
        <div class="usercenter" v-if="windowIndex === 3">
          <div class="userinfo">
          <div class="am-u-sm-3" style="text-align:left;margin:0;padding:0">
            <img src="../assets/wechat-min.png" style="height:80px;width:80px;margin-top:auto;margin-bottom:auto;margin-left:0">
          </div>
          <div class="am-u-sm-6 am-u-end" style="margin:0;padding-top:10px;text-align:left">
            <div style="text-align:left;margin:auto;padding:auto">
              <p style="margin:0;padding:0">昵称：{{user}}</p>
              <!--<p style="margin:0;padding:0">角色：{{role}}</p>-->
            </div>
          </div>
        </div>
          <div class="useroperation">
          <table class="am-table useroperationlist" style="margin:0">
            <tbody>
              <tr>
                <td @click.stop="goSelfMaterial()">&nbsp;&nbsp;&nbsp;&nbsp;个人资料</td>
              </tr>
              <tr>
                <td @click.stop="upLoadImg()">&nbsp;&nbsp;&nbsp;&nbsp;上传舌苔照片</td>
              </tr>
<!--              <tr>
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
        <div class="mainpage"  v-if="windowIndex === 0">
          <!--<div class="searchbox">
            <input type="search" results="s" style="" placeholder="查找任务">
          </div>-->
          <ul class="selectstate" id="changestate">
            <li class="leftstate" @click.stop=toggleState(0)>
              <span style="color:white">未完成</span></li><li  class="rightstate" @click.stop=toggleState(1)>
            <span style="color:dodgerblue">已完成</span></li>
          </ul>

          <div class="mainpagebody">
            <table class="am-table finishedtasktable am-table-bordered " style="margin:0" v-if="state === 1">
              <!-----------  已完成部分  ---------->
              <tbody>
                <tr v-for="taskindex in finished" track-by="$index">
                  <td>
                    <div class="finfirstpanel">
                      <div class="fintasktitle">{{taskindex.title}}</div>
                      <div class="finisheddate">{{taskindex.submissions[taskindex.submissions.length-1].submitDate}}</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="am-table tasktable" style="margin:0" v-if="state === 0">
              <!-----------  未完成部分  ---------->
              <tbody>
              <tr>
                <td style="font-size:20px;padding-top:10px;padding-bottom:10px;text-align:left;padding-left:5px">总任务数：{{totaltasklength}}</td>
              </tr>
              <tr v-if = !showdetail v-for="taskindex in minunfinishedtasks" track-by="$index">
                <td>
                  <div class="firstpanel">
                    <div style="text-align:left" class="am-g">
                      <span class="am-u-sm-7" style="margin:0;padding:0"><span class="tasktitle"> {{taskindex.title}}</span>
                        <span class="taskstyle"> &nbsp;[标准]</span></span>
                      <span class="establisher am-u-sm-5"><span style="margin-right:5px">调查人：{{taskindex.creator.nickname}}</span></span>
                    </div>
                    <div class="am-g" style="margin-top:10px">
                      <div class="am-u-sm-8" style="text-align:left;padding-top:10px;padding-left:0">
                        <span class="taskdeadline" v-if="unfinishedstate[$index] === 0">
                          过期：<span style="color:red">{{taskindex.plandateobj[0].countdown}}天</span></span>
                        <span class="taskdeadline" v-if="unfinishedstate[$index] === 1 && lefttimeunfinished[$index] > 1">
                          离最近任务剩余：<span style="color:blue">{{lefttimeunfinished[$index]}}天</span></span>
                        <span class="taskdeadline" v-if="unfinishedstate[$index] === 1 && lefttimeunfinished[$index] <= 1">
                          离最近任务剩余：<span style="color:red"> {{lefttimeunfinished[$index]}}天</span></span>
                      </div>
                      <span class="gobutton am-u-sm-4" style="text-align:right"
                            v-if="taskindex.plandateobj[0].countdownstate === 1 || taskindex.plandateobj[0].countdownstate === 0">
                        <button class="am-btn am-btn-primary am-radius" @click.stop="goToNav($index,taskindex)">填写</button>
                      </span>
                      <span class="gobutton am-u-sm-4" style="text-align:right"
                            v-if="taskindex.plandateobj[0].countdownstate === 2">
                        <button class="am-btn am-btn-primary am-radius" @click.stop="goToNav($index,taskindex)" disabled = "disabled">填写</button>
                      </span>
                    </div>
                    <div class="am-progress am-progress-striped taskprogress">
                      <div class="am-progress-bar am-progress-bar-success" :id="minprogressname+$index">{{taskindex.progress}}/{{taskamount[$index]}}</div>
                    </div>
                    <div style="margin:0;padding:0">
                      <span style="margin:0;padding:0" class="am-icon am-icon-caret-down am-icon-md" @click.stop="expandSecondLayer($event)"></span>
                    </div>
                  </div>
                  <div style="display:none" class="secondpanel">
                    <div class="secondpanelcolor">
                      <div class="taskdetail">
                        {{taskindex.note}}</div>
                    </div>
                    <table class="am-table tasklist" style="padding:0;margin:0">
                      <tbody>
                        <tr v-for = "planindex in taskindex.plandateobj" track-by="$index">
                          <td class="unfinishedlist am-g">
                              <span class="unfinishednumber am-u-sm-3">序号：{{planindex.number}}</span>
                              <span class="currentdate am-u-sm-5">{{planindex.questionsettitle}}</span>
                              <span v-if="planindex.countdownstate === 1 || planindex.countdownstate === 2" class="lefttime am-u-sm-4">倒计时：<span>{{planindex.countdown}}天</span></span>
                              <span v-if="planindex.countdownstate === 0" class="lefttime am-u-sm-4" style="color:red">已过期：<span>{{planindex.countdown}}天</span></span>
                          </td>
                        </tr>
                        <tr v-for = "planindex in taskindex.finishedlist" track-by="$index">
                          <td class="finishedlist am-g">
                              <span class="unfinishednumber am-u-sm-3">序号：{{planindex.number}}</span>
                              <span class="currentdate am-u-sm-5">{{planindex.questionsettitle}}</span>
                              <span class="lefttime am-u-sm-4" style="margin:auto"><span>已完成</span></span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div v-if="$index !== minunfinishedtasklength-1" class="divider"></div>
                </td>
              </tr>
              <tr v-if = showdetail v-for="taskindex in unfinished" track-by="$index">
                <td>
                  <div class="firstpanel">
                    <div style="text-align:left" class="am-g">
                      <span class="am-u-sm-7" style="margin:0;padding:0"><span class="tasktitle"> {{taskindex.title}}</span>
                        <span class="taskstyle"> &nbsp;[标准]</span></span>
                      <span class="establisher am-u-sm-5"><span style="margin-right:5px">调查人：{{taskindex.creator.nickname}}</span></span>
                    </div>
                    <div class="am-g" style="margin-top:10px">
                      <div class="am-u-sm-8" style="text-align:left;padding-top:10px;padding-left:0">
                        <span class="taskdeadline" v-if="unfinishedstate[$index] === 0">
                          过期：<span style="color:red">{{taskindex.plandateobj[0].countdown}}天</span></span>
                        <span class="taskdeadline" v-if="unfinishedstate[$index] === 1 && lefttimeunfinished[$index] > 1">
                          离最近任务剩余：<span style="color:blue">{{lefttimeunfinished[$index]}}天</span></span>
                        <span class="taskdeadline" v-if="unfinishedstate[$index] === 1 && lefttimeunfinished[$index] <= 1">
                          离最近任务剩余：<span style="color:red"> {{lefttimeunfinished[$index]}}天</span></span>
                      </div>
                      <span class="gobutton am-u-sm-4" style="text-align:right"
                            v-if="taskindex.plandateobj[0].countdownstate === 1 || taskindex.plandateobj[0].countdownstate === 0">
                        <button class="am-btn am-btn-primary am-radius" @click.stop="goToNav($index,taskindex)">填写</button>
                      </span>
                      <span class="gobutton am-u-sm-4" style="text-align:right"
                            v-if="taskindex.plandateobj[0].countdownstate === 2">
                        <button class="am-btn am-btn-primary am-radius" @click.stop="goToNav($index,taskindex)" disabled = "disabled">填写</button>
                      </span>
                    </div>
                    <div class="am-progress am-progress-striped taskprogress">
                      <div class="am-progress-bar am-progress-bar-success" :id="progressname+$index">{{taskindex.progress}}/{{taskamount[$index]}}</div>
                    </div>
                    <div style="margin:0;padding:0">
                      <span style="margin:0;padding:0" class="am-icon am-icon-caret-down am-icon-md" @click.stop="expandSecondLayer($event)"></span>
                    </div>
                  </div>
                  <div style="display:none" class="secondpanel">
                    <div class="secondpanelcolor">
                      <div class="taskdetail">
                        {{taskindex.note}}</div>
                    </div>
                    <table class="am-table tasklist" style="padding:0;margin:0">
                      <tbody>
                      <tr v-for = "planindex in taskindex.plandateobj" track-by="$index">
                        <td class="unfinishedlist am-g">
                          <span class="unfinishednumber am-u-sm-3">序号：{{planindex.number}}</span>
                          <span class="currentdate am-u-sm-5">{{planindex.questionsettitle}}</span>
                          <span v-if="planindex.countdownstate === 1 || planindex.countdownstate === 2" class="lefttime am-u-sm-4">倒计时：<span>{{planindex.countdown}}天</span></span>
                          <span v-if="planindex.countdownstate === 0" class="lefttime am-u-sm-4" style="color:red">已过期：<span>{{planindex.countdown}}天</span></span>
                        </td>
                      </tr>
                      <tr v-for = "planindex in taskindex.finishedlist" track-by="$index">
                        <td class="finishedlist am-g">
                          <span class="unfinishednumber am-u-sm-3">序号：{{planindex.number}}</span>
                          <span class="currentdate am-u-sm-5">{{planindex.questionsettitle}}</span>
                          <span class="lefttime am-u-sm-4" style="margin:auto"><span>已完成</span></span>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  <div v-if="$index !== unfinishedtasklength-1" class="divider"></div>
                </td>
              </tr>
              <tr>
                <td v-if="!showdetail" style="font-size:12px;background-color:#9da0a4;cursor:pointer;
                padding-top:5px;padding-bottom:5px" @click.stop="showdetail=!showdetail">查看更多任务</td>
                <td v-if="showdetail" style="font-size:12px;background-color:#9da0a4;cursor:pointer;
                padding-top:5px;padding-bottom:5px" @click.stop="showdetail=!showdetail">收起</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="notice" style="width:100%;height:80%;overflow:scroll" v-if="windowIndex === 1"></div>
        <div class="phonelist" style="width:100%;height:80%;overflow:scroll" v-if="windowIndex === 2"></div>
        <div class="footer" id="footer">
          <div class="am-u-sm-3" style="background-color:dodgerblue;padding-top:10px;cursor:pointer;
          border: solid 1px yellow" @click.stop="changeIcon(0)">
            <img src="../assets/mainpage-white.png" v-if="shining !== 0">
            <img src="../assets/mainpage-yellow.png"  v-if="shining === 0">
            <p style="margin:0;padding:0;color:orange">主页</p>
          </div>
          <div class="am-u-sm-3" style="background-color:dodgerblue;padding-top:10px;cursor:pointer"
               @click.stop="changeIcon(1)">
            <img src="../assets/notice-white.png" v-if="shining !== 1">
            <img src="../assets/notice-yellow.png" v-if="shining === 1">
            <p style="margin:0;padding:0">通知</p>
          </div>
          <div class="am-u-sm-3" style="background-color:dodgerblue;padding-top:10px;cursor:pointer"
               @click.stop="changeIcon(2)">
            <img src="../assets/phonelist-white.png" v-if="shining !== 2">
            <img src="../assets/phonelist-yellow.png" v-if="shining === 2">
            <p style="margin:0;padding:0">通讯录</p>
          </div>
          <div class="am-u-sm-3" style="background-color:dodgerblue;padding-top:10px;cursor:pointer"
               @click.stop="changeIcon(3)">
            <img src="../assets/selfcenter-white.png"  v-if="shining !== 3">
            <img src="../assets/selfcenter-yellow.png" v-if="shining === 3">
            <p style="margin:0;padding:0" style="color:black">我</p>
          </div>
        </div>
    </div>
</template>
<style>
    *{
      padding: 0;
      margin: 0;
    }
    body{
        background-color:white;
    }
    .uiheader{  /*   页头   */
      width: 100%;
      height: 10%;
      padding-top: 10px;
      background-color: dodgerblue;
    }
    /********************** 用户中心部分 **********************/
    #userinterface{
      background-color: white;
      margin-top: 0px;
      width: 100%;
      height: 100%;
      padding-bottom: 0px;
    }

    /*************************  主页部分 ************************/
    .mainpage {
      width: 100%;
      height: 80%;
      overflow: scroll;
    }

    .mainpage .searchbox { /*    搜索框(外div)    */
      padding-top: 10px;
      padding-bottom: 0px;
      width: 100%;
    }

    .mainpage .searchbox input { /*    搜索框(输入)    */
      width: 50%;
      height: 40px;
      border-radius: 40px;
      text-align: center
    }

    .mainpage .selectstate { /*    任务状态选择(外div)   */
      list-style-type: none;
      margin-bottom: 10px;
      padding: 0;
      margin-top: 10px;
    }

    .mainpage .selectstate .leftstate { /*    任务状态选择(左按钮)   */
      display: inline-block;
      border: solid 1px dodgerblue;
      padding-left: 15px;
      padding-right: 15px;
      padding-top: 3px;
      padding-bottom: 3px;
      text-align: center;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      background-color: dodgerblue;
      cursor: pointer;
    }

    .mainpage .selectstate .rightstate { /*    任务状态选择(右按钮)   */
      display: inline-block;
      border: solid 1px dodgerblue;
      padding-left: 15px;
      padding-right: 15px;
      padding-top: 3px;
      padding-bottom: 3px;
      ext-align: center;
      background-color: white;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      cursor: pointer;
    }

    .mainpage .mainpagebody { /*   主体部分(装载所有任务的div)   */
      width: 100%;
      margin-top: 0px;
    }

    .mainpage .tasktable tbody tr{
      padding-left: 0px;
    }
    .mainpage .tasktable tbody tr td:hover{
      /* background-color: darkgray; */
    }
    .mainpage .tasktable tbody tr td{
      cursor: pointer;
      margin: 0;
      padding-left: 0px;
      padding-top: 0;
      padding-bottom: 0;
      padding-right: 0;
    }

                  /*    已完成的任务  */
    .mainpage .finishedtasktable {

    }
    .mainpage .finishedtasktable .fintasktitle { /*   任务标题   */
      font-size: 20px;
      color: grey;
      text-align: left;
      color: #0f9ae0;
    }
    .mainpage .finishedtasktable .finisheddate{
      text-align: left;
      color: gray;
      margin-top: 20px;
    }


                      /*     未完成的任务样式   */
    .mainpage .tasktable .tasktitle { /*   任务标题   */
      font-size: 20px;
      color: blue;
      margin-left: 5px;
      padding:0;
    }

    .mainpage .tasktable .taskstyle { /*   任务类型(e.g. 标准)   */
      font-size: 12px;
      margin-bottom: 10px;
    }

    .mainpage .tasktable .gobutton { /* 填写问卷的按钮 */
      padding-top: 5px;
      font-size: 12px;
      color: blue;
      padding-right: 5px;
    }
    .mainpage .tasktable .gobutton>button{
      margin-right: 10px;
    }

    .mainpage .tasktable .firstpanel .establisher { /* 创建者  */
      color: black;
      font-size: 12px;
      text-align: right;
      margin-top: 10px;
      mar-right: 5px;
    }

    .mainpage .tasktable .taskdescription { /*   任务描述   */
      text-align: left;
      font-size: 12px;
      padding-left: 10px;
    }

    .mainpage .tasktable .taskdeadline { /*   任务期限  */
      text-align: left;
      font-size: 12px;
      padding-left: 0px;
      margin-bottom: 5px;
      margin-left: 7px;
      margin-top: 10px;
    }

    .mainpage .tasktable .taskdeadline span{
      padding-left: 10px;
      padding-right: 10px;
      padding-top: 5px;
      padding-bottom: 5px;
      border: solid 1px black;
      border-radius: 5px;
      text-align: left;
    }

    .mainpage .tasktable .taskprogress{
      background-color: lightyellow;
      padding-top: 0;
      padding-bottom: 0;
      margin-bottom: 0;
      margin-top: 20px;
    }

    .mainpage .tasktable .taskdetail { /*   任务具体描述(一个圆形框)  */
      margin-left: auto;
      margin-right: auto;
      width: 300px;
      border: dotted 3px silver;
      border-radius: 300px;
      padding-top: 5px;
      padding-bottom: 5px;
    }

    .mainpage .tasktable .firstpanel{
      background-color: lightyellow;
    }

    .mainpage .tasktable .secondpanel .taskdetail{
      margin-top: 0;
      margin-bottom: 0;
      padding-left: 0;
      padding-right: 0;
      padding-top: 10px;
      padding-bottom: 10px;
    }
    .mainpage .tasktable .secondpanel .unfinishedlist{
      background-color: tan;
      margin-top: 0;
      margin-bottom: 0;
      padding: 0;
    }
    .mainpage .tasktable .secondpanel .finishedlist{
      background-color: lightgray;
      margin-top: 0;
      margin-bottom: 0;
      padding: 0;
    }
    .secondpanel .secondpanelcolor{
      background-color: moccasin;
    }
    .secondpanel .tasklist .unfinishednumber{
      text-align: left;
      float: left;
      font-size: 14px;
      padding-top: 10px;
    }
    .secondpanel .tasklist .lefttime{
      padding-top: 10px;
      float: right;
      font-size: 10px;
      padding-left: 0;
      padding-right: 0;
    }
    .secondpanel .tasklist .lefttime>span{
      padding-left: 10px;
      padding-right: 10px;
      padding-top: 3px;
      padding-bottom: 3px;
      border: solid 1px black;
      border-radius: 5px;
    }
    .secondpanel .tasklist table tbody tr td{
      margin: 0;
      padding: 0;
    }
    .secondpanel .tasklist .currentdate{
      color: white;
      font-size: 14px;
      padding-left: 0;
      padding-right: 0;
      padding-bottom: 10px;
      padding-top: 10px;
    }
    .secondpanel .tasklist .unfinishedlist{
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .mainpage .tasktable .divider{
      width: 100%;
      height: 1px;
      background-color: #8a6343;
    }

    /************************* 通知 ***********************/
    .notice{
      width: 100%;
      height: 80%;
      padding-top: 50px;
      background-color: #00d4b4;
      display: block;
    }

    /************************* 通讯录 ***********************/


    /************************* 个人中心 ***********************/
    .usercenter{
      width:100%;
      height:80%;
      overflow:scroll
    }
    #userinterface .useroperation{  /*   操作选择(e.g 账户绑定等，外div) */
      margin-top: 0px;
    }
    .useroperationlist tbody tr td{ /*   具体操作选择    */
      cursor: pointer;
      text-align:left;
    }
    .useroperation table tbody tr td:hover{ /*   具体操作选择    */
      background-color: darkgrey;
    }

    /***************** 页脚 ****************/
    #footer{
      width: 100%;
      height: 10%;
      margin: 0;
      padding: 0;
    }
    #footer div img{
      width: 40px;
      height:30px
    }
</style>
<script>
  export default {
    data () {
      return {
        unfinishedstate: [],
        lefttimeunfinished: [],
        showdropdown: false,
        showdetail: false,  // 显示所有任务
        mintasklength: 2,  // 面板收缩时显示的任务数
        windowIndex: 0,
        shining: 0,
        state: 0
      }
    },
    computed: {
      totaltasklength: function () {
        return this.$root.userData.tasks.length
      },
      user: function () {
        return this.$root.userData.nickname
      },
      minprogressname: function () {
        var temp = 'minunfinishedprogress'
        return temp
      },
      progressname: function () {
        var temp = 'unfinishedprogress'
        return temp
      },
      role: function () {
        var temp = this.$root.userData.role
        if (temp === 'patient') {
          return '病人'
        } else {
          return '医生'
        }
      },
      unfinished: function () {  // 未完成任务
        var unfinishedtemp = []
        for (var k = 0; k < this.$root.userData.tasks.length; k++) {
          if (this.$root.userData.tasks[k].status !== 'finished') {
            // “未完成”有“未开始”和“未填写完”两种情况
            unfinishedtemp.push(this.$root.userData.tasks[k])
          }
        }
        for (var i = 0; i < unfinishedtemp.length; i++) {
          var temp = []
          var temp2 = []
          for (var j = 0; j < unfinishedtemp[i].plans.dates.length; j++) {
            // console.log(this.unfinished[i].progress)
            if (j < unfinishedtemp[i].progress) {
              var finishedlist = {}
              finishedlist.questionsettitle = unfinishedtemp[i].submissions[j].questionSet.title
              finishedlist.number = j + 1
              temp2.push(finishedlist)
            } else {
              var sdate = unfinishedtemp[i].startDate  // 任务开始时间
              sdate = new Date(sdate)
              sdate.setDate(sdate.getDate() + unfinishedtemp[i].plans.dates[j])
              var curdate = new Date()
              var msdiff = sdate.getTime() - curdate.getTime() // 当前时间与开始时间的时间差
              var daysdiff = Math.ceil(msdiff / (24 * 3600 * 1000)) // 相差天数
              // var tday = sdate.getDate()
              // var tmonth = sdate.getMonth() + 1
              // var tyear = sdate.getFullYear()
              // var temp1 = tyear + '年' + tmonth + '月' + tday + '日'
              var includeOuter = {}
              includeOuter.questionsettitle = unfinishedtemp[i].submissions[j].questionSet.title
              // 当前问卷的标题
              includeOuter.countdown = Math.abs(daysdiff)
              includeOuter.number = j + 1
              if (daysdiff < 0) {
                includeOuter.countdownstate = 0 // 负数
              } else {
                if (daysdiff === 0) {
                  includeOuter.countdownstate = 1 // 零
                } else {
                  includeOuter.countdownstate = 2 // 正数
                }
              }
              temp.push(includeOuter)
            }
          }
          if (temp[0].countdownstate === 0) {
            this.unfinishedstate.push(0)  // 当前任务的计划日期已过
          } else {
            this.unfinishedstate.push(1)  // 还没有到当前任务的计划日期
          }
          this.lefttimeunfinished.push(temp[0].countdown)
          unfinishedtemp[i].plandateobj = temp
          unfinishedtemp[i].finishedlist = temp2
        }
        return unfinishedtemp
      },
      finished: function () { // 已完成问卷
        var temp = []
        for (var i = 0; i < this.$root.userData.tasks.length; i++) {
          if (this.$root.userData.tasks[i].status === 'finished') {
            temp.push(this.$root.userData.tasks[i])
          }
        }
        return temp
      },
      minunfinishedtasks: function () { // 未完成的任务的缩小版
        var temp = []
        for (var i = 0; i < this.unfinished.length; i++) {
          if (i < this.mintasklength) {
            temp.push(this.unfinished[i])
          }
        }
        return temp
      },
      minunfinishedtasklength: function () { // 未完成任务的缩小版
        return this.minunfinishedtasks.length
      },
      unfinishedtasklength: function () { // 未完成任务的长度
        return this.unfinished.length
      },
      taskamount: function () { // 子任务数量
        var temp = []
        for (var i = 0; i < this.unfinished.length; i++) {
          temp.push(this.unfinished[i].plans.dates.length)
        }
        return temp
      }
    },
    ready: function () {
      // console.log(this.$root.userData.tasks[0].questionSet.questions[0].title)
      this.changeIcon(this.windowIndex)
      this.showProgress()
      // this.parseDate()
      // this.loadClientDate ()
    },
    created: function () {
      // this.parseDate()
      // this.setInitialData()
      // this.countLeftTime()
    },
    methods: {
//      setInitialData () {
//        this.totaltasklength = this.$root.userData.tasks.length
//        var temp = []
//        for (var i = 0; i < this.$root.userData.tasks.length; i++) {
//          if (this.$root.userData.tasks[i].status !== 'finished') {
//            // “未完成”有“未开始”和“未填写完”两种情况
//            temp.push(this.$root.userData.tasks[i])
//          }
//        }
//        this.unfinished = temp
//        var temp2 = []
//        for (var i2 = 0; i2 < this.$root.userData.tasks.length; i2++) {
//          if (this.$root.userData.tasks[i2].status === 'finished') {
//            temp2.push(this.$root.userData.tasks[i2])
//          }
//        }
//        this.finished = temp2
//        var temp3 = []
//        for (var i3 = 0; i3 < this.unfinished.length; i3++) {
//          if (i < this.mintasklength) {
//            temp3.push(this.unfinished[i3])
//          }
//        }
//        this.minunfinishedtasks = temp3
//      },
      goSelfMaterial () {
        this.$router.go('/selfmaterial')
      },
      goToNav (index, taskindex) { // 去填写问卷
        this.$dispatch('changetaskindex', index)
        this.$dispatch('markunfinishedtask', this.unfinished)
        this.$dispatch('realtaskid', taskindex.id)
        console.log(this.$root.currenttaskindex)
        this.$router.go('/navigation')
      },
      backToFrontPage () {
        // 返回上一页
      },
      showdetail () {
        this.showdetail = true
      },
      changeIcon (tips) {
        if (tips === 1 || tips === 2) {
          return
        } else {
          var selectedIndex = tips
          this.shining = tips
          this.windowIndex = tips

          $('#footer div').each(function (index, element) {
            if (index === selectedIndex) {  // 当前下标指向发生点击事件的图标
              // console.log($(this).attr('id'))
              $(this).css({
                'border-top': 'solid 1px yellow',
                'border-left': 'solid 1px yellow',
                'border-right': 'solid 1px yellow'
              }) // 当前选中的标签带框
              $(this).children('p').css('color', 'orange')
            } else {
              // console.log($(this).children('p'))
              $(this).css('border', 'solid 0px white') // 未被选中的标签外框消失
              $(this).children('p').css('color', 'black')
            }
          })
        }
      },
      toggleState (tips) {
        if (this.state === 0) {
          this.state = 1
        } else {
          this.state = 0
        }
        $('#changestate li').each(function (index, element) {
          if (tips === index) {
            $(this).css({
              'background-color': 'dodgerblue'
            })
            $(this).children('span').css('color', 'white')
          } else {
            $(this).css({
              'background-color': 'white'
            })
            $(this).children('span').css('color', 'dodgerblue')
          }
        })
      },
      expandSecondLayer (event) {
        // console.log(this.unfinishedstate[0])
        // console.log($('#userinterface'))
        var target = event.target
        var $td = target.closest('td')
        console.log($td)
        var firstpanel = $($td).children('div').eq(1)
        var secondpanel = $($td).children('div').eq(2)
        secondpanel.toggle()
        firstpanel.toggle()
        if (secondpanel.css('display') !== 'none') {
          secondpanel.toggle()
        }
      },
      showProgress () {  // 展示进度条函数
        for (var i = 0; i < this.unfinished.length; i++) {
          $('#unfinishedprogress' + i).css('width', (this.unfinished[i].progress) / this.unfinished[i].plans.dates.length * 100 + '%')
          if (i < this.mintasklength) {
            $('#minunfinishedprogress' + i).css('width', (this.unfinished[i].progress) / this.unfinished[i].plans.dates.length * 100 + '%')
          }
        }
      },
      upLoadImg () {
        this.$router.go('/uploadimg')
      }
    },
    route: {
      data: function (transition) {
        transition.next(
          {
            windowIndex: parseInt(transition.to.params.tabIndex.substring(1)),
            // windowIndex: parseInt(transition.to.params.tabIndex),
            shining: parseInt(transition.to.params.tabIndex.substring(1))
          }
        )
      }
    }
  }
</script>
