<template>
    <div id="qnheader">
      <div class="am-u-sm-3">
        <i class="am-icon-md am-icon-arrow-left" style="cursor:pointer" @click.stop="comeback()"></i>
      </div>
      <span class="am-u-sm-6 am-u-end" style="text-align:center;font-size:20px;color:white">{{header}}</span>
    </div>
</template>
<style>
    body{
        background-color:white;
    }
    #qnheader {
      width: 100%;
      height: 10%;
      padding-top: 10px;
      background-color: dodgerblue;
    }
</style>
<script>
  export default{
    props: ['header', 'backroute'],
    data () {
      return {
      }
    },
    methods: {
      comback () {
        // 回到上一页
        this.$router.go(this.backroute)
      }
    }
  }
</script>
