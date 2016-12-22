<template>
  <div id="addtask">
    <div class="mask" v-show="alertmark === true">
      <div class="mask-prompt">
        <headtitle name="设置日程安排"></headtitle>
        <div class="content">
          <div class="codeinput">
            <form id="settime" class="am-form">
              <div class="am-form-group">
                <div style="text-align: left;padding-top:5px; padding-bottom:5px">请选择任务的起始时间</div>
                <div style="text-align: left;padding:0;margin:0">
                  <input class="am-form-field" name="begindates" type="date" :value="today"/>
                </div>
              </div>
              <div class="am-form-group">
                <div style="text-align: left">请选择任务提醒的时间段</div>
                <div>
                  <select>
                    <option value="6">6:00</option>
                    <option value="7">7:00</option>
                    <option value="8">8:00</option>
                    <option value="9">9:00</option>
                    <option value="10">10:00</option>
                    <option value="11">11:00</option>
                    <option value="12">12:00</option>
                    <option value="13">13:00</option>
                    <option value="14">14:00</option>
                    <option value="15">15:00</option>
                    <option value="16">16:00</option>
                    <option value="17">17:00</option>
                    <option value="18">18:00</option>
                    <option value="19">19:00</option>
                    <option value="20">20:00</option>
                    <option value="21">21:00</option>
                    <option value="22">22:00</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
          <div class="mask_validate">
            <div class="am-u-sm-6">
              <button type="button" class="am-btn am-btn-primary am-btn-sm" @click.stop="settimeValidate()">确定</button>
            </div>
            <div class="am-u-sm-6">
              <button type="button" class="am-btn am-btn-primary am-btn-sm" @click.stop="alertmark = false">取消</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <headtitle name="添加任务"></headtitle>
    <div class="searcharea am-g">
      <div class="am-u-sm-9">
        <form id="searchfor" class="am-form">
          <div class="am-form-group">
            <input type="text" name="searchfor" placeholder="在此输入任务编号" id="search">
          </div>
        </form>
      </div>
      <div class="am-u-sm-3" style="margin-top:3px; padding:0">
        <button type="button" class="am-btn am-btn-primary am-btn-sm" @click.stop="onSearch()">搜索</button>
      </div>
    </div>
    <div class="searchresult">
      <table class="am-table">
        <tbody>
          <tr v-for="item in tasklist" track-by="index">
            <td>
              <div class="itemtitle">{{item.title}}</div>
              <div class="itemnote">
                <div class="am-u-sm-9 itemnoteele"> 备注：{{item.note}} </div>
                <div class="am-u-sm-3">
                  <button type="button" class="am-btn am-btn-primary am-btn-sm" style="margin-right: 10px"
                  @click.stop="alertmark = true">添加</button>
                </div>
              </div>
              <div class="itemnum">问卷编号: {{item.taskid}}</div>
            </td>
          </tr>
        </tbody>
      </table>
      <hr data-am-widget="divider" style="margin:0;padding:0" class="am-divider am-divider-default" />
    </div>
    <div class="am-topbar am-topbar-fixed-bottom">
      <button type="button" class="pastpagebtn3 am-btn am-btn-lg am-btn-primary am-radius" @click.stop="goBack()">返回</button>
    </div>
  </div>
</template>

<style lang="scss">
  #addtask{
  /* 遮罩层 */
    .mask {
      left: 0;
      top: 0;
      position: fixed;
      width: 100%;
      height: 100%;
      z-index: 1000;
      background-color: rgba(0, 0, 0, .15);
      /* 弹出框 */
      .mask-prompt {
        top: 50%;
        left: 50%;
        margin: -151px 0px 0px -126px;
        z-index: 10;
        overflow: hidden;
        position: fixed !important;
        _position: absolute;
        width: 250px;
        height: 300px;
        color: aliceblue;
        border: 1px solid black;
        /* 弹出框标题 */
        .title {
          padding-top: 5px;
          color: white;;
          width: 250px;
          height: 40px;
          margin-bottom: 0;
          padding-bottom: 5px;
          background-color: #42b983;
        }
        /* 弹出框内容 */
        .content {
          padding: 1px 0 0 0;
          background-color: white;
          width: 250px;
          height: 250px;
          /* 弹出框里面的选项 */
          .codeinput{
            margin: 1px 0 0 0;
            height: 200px;
            width: 250px;
            padding: 0 20px 0 20px;
          }
           /* 弹出框的按钮 */
          .mask_validate{
            width: 250px;
            height: 30px;
            margin: 1px 0 0 0;
          }
        }
      }
    }
    /* 搜索框区域 */
    .searcharea{
      margin-top: 10px;
      input{
        margin:0;
        text-align: left;
        height: 40px;
        background-image: url('../../assets/search.png');
        background-size: 24px, 24px;
        background-repeat: no-repeat;
        background-position: 95%;
        padding-left: 5px;  /*使输入位置与边框有一定的偏移*/
      }
    }
    /* 显示搜索结果 */
    .searchresult{
      table{
        margin: 0;
        padding: 0;
      }
      margin-top: 0px;
      /* 搜索到的任务标题 */
      .itemtitle{
        text-align: left;
        padding: 2px 5px;
        color: #0f9ae0;
        font-size: 16px;
      }
      /* 任务备注 */
      .itemnote{
        .itemnoteele {
          margin: 0;
          color: orange;
          font-size: 14px;
          text-align: left;
          padding: 2px 5px;
        }
      }
      /* 任务编号 */
      .itemnum{
        font-size: 14px;
        text-align: left;
        padding: 2px 5px;
      }
    }
  }
</style>

<script>
  import headtitle from '../public_component/head'
  export default{
    data () {
      return {
        tasklist: [],
        alertmark: false
      }
    },
    components: {
      headtitle
    },
    computed: {
      today: function () {   // 当前日期
        var mydate = new Date()
        var day = mydate.getDate()
        var month = mydate.getMonth() + 1
        var year = mydate.getFullYear()
        if (parseInt(day) < 10) {
          day = '0' + day
        }
        if (parseInt(month) < 10) {
          month = '0' + month
        }
        var returndata = year + '-' + month + '-' + day
        return returndata
      }
    },
    methods: {
      onSearch () {
        this.$set('tasklist', [])
        console.log('hahahaha!')
        var formjson = $('#searchfor').serializeArray()
        var task = formjson[0].value
        console.log(task)
        var urls = 'https://api.mecord.cn/api/TaskTemplates/searchById?id=' + 2
        this.$http.get(urls).then((response) => {
          var temp = {}
          console.log(JSON.stringify(response.body))
          temp.title = response.body.data.title
          temp.note = response.body.data.note
          temp.taskid = task
          var temp2 = this.tasklist
          temp2.push(temp)
          this.$set('tasklist', temp2)
        }, (response) => {
          console.log('cannot get task!')
        })
      },
      settimeValidate () {
        this.alertmark = false
        // var formjson = $('#settime') .serializeArray()
        window.alert('恭喜你成功添加任务！')
        this.$router.go('/outline')
      },
      goBack () {
        this.$router.go('/outline')
      }
    }
  }
</script>
