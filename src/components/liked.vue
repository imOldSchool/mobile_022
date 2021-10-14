<template>
    
      <!-- <van-button
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
    </van-button>   -->
     <van-icon
     v-if='!isShow'
        color="#777"
        name="good-job-o"
        @click='collected'
      />
      <van-icon 
      v-else
      color="rgb(235, 202, 72)"
      @click='collected'
      name="good-job" />
</template>

<script>
//引入收藏或取消收藏接口
import { NoLikedThatAPI , LikedThatAPI } from '@/api'
export default {
    data() {
        return{
            isShow: false,
            isloding: false,
        }
    },
    //接收ID 和 是否点赞
    //:aut_id='articleList.aut_id' :is_followed='articleList.is_followed'
    props:['aut_id','is_like'],
    methods:{
        async collected(){
            //发起时显示加载
            this.$toast.loading({
                forbidClick: true,
                duration:7000,
                onClose:()=>{
                    this.$toast.fail('操作超时，请稍候重试')
                }
            });

            try {
                //如果收藏了就发起取消收藏 反之
                if(this.isShow){
                    const res = await NoLikedThatAPI(this.aut_id)
                    console.log(res)
                    //取消收藏后修改ishow
                    this.isShow = false
                    this.$toast('已取消点赞')
                }else{
                   const res = await LikedThatAPI({
                       target: this.aut_id
                   })
                    console.log(res)
                    //关注后修改ishow
                    this.isShow = true
                     this.$toast('点赞成功')
                }

            }catch(err){
                console.log(err.response)
                if(err.response.status == 401){
                  this.$toast('请先登录')
                }else(
                    this.$toast.fail('操作超时，请稍候重试')
                )

            }
            //结束时停止加载
            this.isloding = false
        }
    },
    watch:{
        //点赞 1 不喜欢0 无态度-1
        //如果不等于1就返回false
        is_like:{
            handler(newVal){
                if(newVal == 1){
                    this.isShow = true
                }else{
                    this.isShow = false
                }           
            },
            deep: true,
            immediate: true
        }
    }

}
</script>

<style>

</style>