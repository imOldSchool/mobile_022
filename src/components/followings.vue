<template>
    
      <van-button
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            :loading='isloding'
          @click='followings'
          v-if='!isShow'
    >关注</van-button>
    <van-button
    round
    size="small"
    :loading='isloding'
    @click='followings'
    v-else
    >已关注
    </van-button>  
</template>

<script>
//引入关注或取消接口
import { followingsAPI , NoFollowingsAPI } from '@/api'
export default {
    data() {
        return{
            isShow: false,
            isloding: false,
        }
    },
    //接收ID 和 是否关注
    //:aut_id='articleList.aut_id' :is_followed='articleList.is_followed'
    props:['aut_id','is_followed'],
    methods:{
        async followings(){
            //发起时显示加载
            this.isloding = true
            try {
                //如果关注了就发起取消关注 反之
                if(this.isShow){
                    const res = await NoFollowingsAPI(this.aut_id)
                    console.log(res)
                    //取消关注后修改ishow
                    this.isShow = false
                }else{
                   const res = await followingsAPI({
                       target: this.aut_id
                   })
                    console.log(res)
                    //关注后修改ishow
                    this.isShow = true
                }

            }catch(err){
                if(err.response.status == 401){
                  this.$toast('请先登录')
                }else(
                    this.$toast('操作失败,请重试')
                )

            }
            //结束时停止加载
            this.isloding = false
        }
    },
    watch:{
        is_followed:{
            handler(newVal){
               this.isShow = newVal
            },
            deep: true,
            immediate: true
        }
    }

}
</script>

<style>

</style>