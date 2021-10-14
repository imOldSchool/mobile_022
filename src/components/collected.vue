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
        name="star-o"
        @click='collected'
      />
      <van-icon 
      v-else
      color="rgb(235, 202, 72)"
      @click='collected'
      name="star" />
</template>

<script>
//引入收藏或取消收藏接口
import { collectionAPI , NoCollectionAPI } from '@/api'
export default {
    data() {
        return{
            isShow: false,
            isloding: false,
        }
    },
    //接收ID 和 是否收藏
    //:aut_id='articleList.aut_id' :is_followed='articleList.is_followed'
    props:['aut_id','is_collected'],
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
                    const res = await NoCollectionAPI(this.aut_id)
                    console.log(res)
                    //取消收藏后修改ishow
                    this.isShow = false
                    this.$toast('已取消收藏')
                }else{
                   const res = await collectionAPI({
                       target: this.aut_id
                   })
                    console.log(res)
                    //关注后修改ishow
                    this.isShow = true
                     this.$toast('收藏成功')
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
        is_collected:{
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