<template>
  <div class="container">
      <van-cell-group>
        <van-cell title="我的频道">
            <button class='redactBtn' @click='redactShow = !redactShow'>{{ redactShow ? '完成' : '编辑'}}</button>
        </van-cell>
    </van-cell-group>
        <!-- 我的频道-宫格 -->
    <van-grid :gutter="10">
        <van-grid-item v-for="value in channelListArr" :key="value.id + 'a'" clickable='true' @click='remOrSwiChannel(value)'>
            <span slot="text" class="grid-text" :style="value.id == activeId ? 'color:red' : ''"><van-icon  v-show='redactShow && value.id!=0' class='grid-text-close' name="close" />{{value.name}}</span>
        </van-grid-item>
    </van-grid>
      <van-cell-group>
        <van-cell title="频道推荐">
        </van-cell>
    </van-cell-group>
        <!-- 频道推荐-宫格 -->
    <van-grid :gutter="10">
        <van-grid-item  class="cccc" v-for="obj in ChannelRecom" :key="obj.id+'b'" clickable='true' @click="addChannel(obj)">
            <span slot="text" class="grid-text"><van-icon name="plus" />{{obj.name}} </span>
        </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getAllChannelsAPI ,removeChannelsAPI , addChannelsAPI} from '@/api'
export default {
    props:['channelListArr','activeId']
    ,    
    data() {
        return {
            //编辑按钮变换 false为默认 true为编辑状态
            redactShow : false,
            //频道推荐数组
            // ChannelRecommend: [],
            //所有频道数组
            allChannels: []
        }
        
    },
    async created(){
        console.log("我激活了弹窗")
        //我激活了弹窗
        try {
             //初始化 加载全部频道数据
            const res = await getAllChannelsAPI()
            console.log(res)
            this.allChannels = res.data.data.channels
            console.log(this.allChannels)
            // this.ChannelRecom()  
        }catch (err) {
            this.$toast('获取频道推荐列表失败，请稍后再试')
        }
    },
    //计算属性 保存和在改变时自动执行运算 剔除已有频道的推荐频道
    computed:{
        ChannelRecom(){
            const arr = this.channelListArr
            return this.allChannels.filter(vals=>{
                // console.log(arr.findIndex(objs=> objs.id != vals.id) == -1 )
                return (arr.findIndex(objs=> objs.id == vals.id) == -1)               
            })
             
        }
    },
    methods:{
        //添加喜欢的频道
        async addChannel(obj){
            this.channelListArr.push(obj)
            //如果用户登录就发请求 没有登陆就只储存本地
            let user = this.$store.state.usertoken.user
            if(user == '' || user.length == 0) return
            //发起添加频道请求
            try{
                const res = await addChannelsAPI({
                id:obj.id,
                seq:this.channelListArr.length + 1
            })
            console.log(res)
            console.log('发起频道添加请求')
            }catch (err) {
                this.$toast('添加频道请求超时,请稍后重试')
            }
        },
        //删除或者跳转到点击频道
        async remOrSwiChannel(obj){
            //如果redactShow 被按下时为true 切不是推荐频道 点击删除
            //不是就跳转频道
            if(this.redactShow && obj.id != 0){
               let inx = this.channelListArr.findIndex(val=> val.id == obj.id)
               console.log(inx)
               this.channelListArr.splice(inx, 1)
                //如果用户登录就发请求 没有登陆就只储存本地
                let user = this.$store.state.usertoken.user
                if(user == '' || user.length == 0) return
                
               try {
                    //发起删除频道请求
                const res = await removeChannelsAPI(obj.id)
                
                console.log(res)
                console.log('发起删除频道请求')
               }catch (err){
                   console.log(err)
               }
              
            }else{
                let inx = this.channelListArr.findIndex(val=> val.id == obj.id)
                this.$emit('reactive',inx)
                // this.activeInx = inx
            }
        }
    }
}
</script>

<style scoped lang='less'>
    .container{
        padding: 90px 23px;
    }
    //编辑按钮
    .redactBtn {
        width: 105px;
        height: 50px;
        color: #f85a5a;
        border: 1px solid #f85a5a;
        border-radius: 40px;
        font-size: 27px;
    }
    //我的频道文字样式
    .van-cell__title {
        font-size: 33px;
        margin-bottom:15px;
        margin-top:15px;
    }
    // 去除cell组件上下边框
    .van-hairline--top-bottom::after {
        border:0;
    }
    //宫格样式
    /deep/.van-grid{
        .van-grid-item{
            width: 160px;
            height: 86px;
            border:0;
            box-sizing: border-box;
            .van-grid-item__content {
                background-color:#f4f5f6 !important;
                border-radius: 6px !important;
                box-sizing: border-box;
                padding: 0;
            }
        }
        [class*=van-hairline]::after{
            border:0;
        }
        //宫格-文字样式
        .grid-text {
            font-size: 30px;
            padding-bottom: 4px;
            text-align: center;
            // margin-left: 15px;
            .van-icon-plus {
                font-size: 34px;
                margin-right: 2px;
                position: absolute;
                left: 0px;
                top:26px;
            }
            //关闭按钮
            .grid-text-close {
                position:absolute;
                right: -7px;
                top: -10px;
            }
        }
    }
    /deep/.cccc{
        .van-grid-item__content {
            padding-left: 28px !important;
        }     
    }
</style>