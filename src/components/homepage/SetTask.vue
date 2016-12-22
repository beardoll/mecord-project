<template>
  <div id="settask">
    <headtitle name="任务设置"></headtitle>
    <div class="remindtime" >
      <div style="font-weight: bold; text-align: left; color: coral; font-size: 20px">任务起始时间</div>
      <hr data-am-widget="divider" style="margin:2px 0 8px 0;padding:0;width: 50%" class="am-divider am-divider-default" />
      <form id="settime" class="am-form">
        <div class="am-form-group">
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
      <div class="am-topbar am-topbar-fixed-bottom">
        <button type="button" class="pastpagebtn3 am-btn am-btn-lg am-btn-primary am-radius" @click.stop="goBack()">保存设置</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  #settask{
    .remindtime{
      padding: 10px;
    }
  }
</style>

<script>
  import headtitle from '../public_component/head'
  export default {
    data () {
      return {

      }
    },
    components: {
      headtitle
    }
  }
</script>
