<template>
  <div>  
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  data(){
      return {
          transitionName:''
      }
  },
}
</script>

<style lang='less'>
  .van-ellipsis {
     color: #f2f8ff;
     font-size: 18px;
   
  } 
  .van-nav-bar {
    background-color: #3296fa;
    color: #f2f8ff
  }
  body {
    background-color: #f5f7f9;
    // width: 100%;
    // height: 100%;
    // overflow: hidden;
  }
</style>