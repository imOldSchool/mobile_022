<template>
    <div id='home-index'>
        <!-- 头部标签 -->
      <div class="headTags">
            <!-- 555 65 @click="show = true"-->
            <router-link to='/main/search'>
             <button class='headTags_but' ><i class="iconfont icon-sousuo"></i>搜索</button>
            </router-link>
      </div>
    <!-- <div>{{usertoken.userInfo}}</div> -->
    <!-- 频道编辑按钮 -->
    <van-popup v-model="channelShow" position="bottom" :style="{ height: '100%' }"  closeable
  close-icon-position="top-left">
        <!-- 编辑频道组件  -->
        <Changecha :channelListArr='channelList' @reactive='reactivebtn' :activeId='channelList[active].id'></Changecha>
    </van-popup>

      <!-- 滚动频道 -->
      <van-tabs line-width='31px' line-height='6px' animated sticky  v-model="active">
          <!-- 右侧小按钮 -->
          <div slot='nav-right' class="nav-right_space"> ```</div>
          <div slot='nav-right' class="van-tab_right" @click="channelShow = !channelShow">
            <i class='iconfont icon-gengduo'></i>
          </div>
        <van-tab v-for="(obj,inx) in channelList" :title="obj.name" :key="obj.id" >
            <channel :key= "inx" :id='obj.id' ></channel>    
        </van-tab>
        
     </van-tabs>
<!-- 

     <van-popup v-model="show" position="right" :style="{ height: '100%' ,width: '100%'}">

         <Search @goBackHome='show = false'></Search>
     </van-popup> -->
    </div>
</template>

<script>
//引入列表组件
import channel from './components/channelList.vue'
//引入频道组件
import Changecha from './components/changeCha.vue'
//引入搜索组件
// import Search from '@/views/search'
//  , coverChannelsAPI
import { channelListAPI} from '@/api'
//引入存储
import { setItem , getItem} from '@/utils/storage'
//引入VUEX
import { mapState } from 'vuex'
export default {
    name:'home',
    components:{
        channel,
        Changecha,
        // Search
    },
    computed:{
        ...mapState(['usertoken/userInfo'])
    },
    data(){
        return{
            // data:
            // data:
            // channels: Array(13)
            // 0: {id: 0, name: '推荐'}
            // 1: {id: 2, name: '开发者资讯'}
            channelList:[],
            // 控制屏幕弹出框
            channelShow: false,
            active: 0 ,
            //定时器
            timer: null, 
            //设一个防止载入时马上加载
            nowatch: 0 ,
            // show: false
        }
        
    },
    // 初始化时获取频道数据
    async created(){
        try{
            //如果登录就是发起请求
            let user = this.$store.state.usertoken.user
           if(user|| user!= ''){
                const res = await channelListAPI()
                console.log(res.data.data)
                this.channelList = res.data.data.channels
                //如果本地储存的channes是空的,就顺便把数据添加到本地储存
                if(!getItem('channes')){
                    setItem('channes',res.data.data.channels)  
                }
            //发起索引变0
            // this.$emit('changeActive')
           }else{
               //如果未登录就先找本地储存 如果本地储存没有数据就发起请求
               if(getItem('channes')){
                   this.channelList =  getItem('channes')
               }else{
                   const res = await channelListAPI()
                    console.log(res.data.data)
                    this.channelList = res.data.data.channels
                     setItem('channes',res.data.data.channels)  
               }
           }
           
        }catch(err){
            console.log(err)
            console.log('获取频道失败')
        }
    },
    methods:{
        //频道组件列表点击切换父组件列表
        reactivebtn(inx){
            this.active = inx
            this.channelShow = false
        },
    },
    updated(){
        console.log("我更新了")
            // this.$emit('acindex',0)
            this.$emit('changeActive')


    },
    watch:{
        // 监听频道数据 改变后加入防抖 时间倒数后发起请求
           channelList:{
             handler(newVal,oldVal){
                 //如果登录了就不执行储存
                let user = this.$store.state.usertoken.user
                if(user|| user!= '') return

                //如果旧数据是空数组就证明是刚载入 不发起储存
                if(oldVal.length == 0 || oldVal == "" || oldVal == null) return
                //如果修改数据就触发请求或者储存
                //防抖功能 3秒后再同步数据
                console.log("防抖开启")
                    window.clearTimeout(this.timer)  
                    this.timer = null  
                //发起异步操作 定时器
                this.timer = window.setTimeout(async ()=>{
                    console.log('定时器触发，修改数据')
                    console.log(newVal)
                    //跟新本地储存 新数组不能小于１
                    if(newVal.length >1){
                    setItem('channes',newVal)  
                    console.log('---查询本地存储')
                    console.log(getItem('channes'))   
                    }             
                },2000)
            },
            deep: true
        },
        // userInfo:{
        //     handler(newVal){
        //         console.log('我登陆了')
        //          console.log(newVal)
        //     },
        //     deep: true
        // }
        userInfo(newVal){

                console.log('我登陆了')
                console.log(newVal)
        }
    }

}
// {
//     "channels": [
//         {
//             "id": 0,
//             "name": "推荐"
//         },
//         {
//             "id": 11,
//             "name": "后端"
//         },
//         {
//             "id": 12,
//             "name": "linux"
//         },
//         {
//             "id": 13,
//             "name": "人工智能"
//         },
//         {
//             "id": 17,
//             "name": "前端"
//         },
//         {
//             "id": 18,
//             "name": "python"
//         },
//         {
//             "id": 7,
//             "name": "数据库"
//         }
//     ]
// }
</script>

<style scoped lang='less'>
    //头部标签
    .headTags {
        height:97px;
        background-color: #3296fa;
        width: 100%;
        // display:fixed;
        position:fixed;
        top: 0;
        display:flex;
        justify-content:center;
        align-items:center;
        box-sizing: border-box;
        //头部搜索按钮
        .headTags_but{
            width: 555px;
            height: 65px;
            background-color: #5babfb;
            color: #ffffff;
            font-size: 30px;
            border: none;
            border-radius: 42px;
            line-height:65px;
            box-sizing: border-box;
            .icon-sousuo {
                font-size: 38px;
                margin: 3px;
            }
        }
    }
    //滑动频道标签
    /deep/ .van-tabs__wrap  {
        height: 92px;
        border-bottom: 1px solid #edeff3;
        //小标签
         .van-tab {
            width: 200px;
            // height: 92px;
            color: #777777;
            border-right: 1px solid #edeff3;
            // border-bottom: 1px solid #edeff3;
        }
        //右侧小标签
        .van-tab_right{
            position: fixed;
            right: 0;
            width: 66px;
            height: 92px;
            // top: 15px;
            text-align: center;
            background-color: rgba(255, 255, 255, 0.8);
            line-height:92px;
            border-left:5px solid #edeff3;
            // border-image: url('~@/assets/gradient-gray-line.png') 30 30 round;
            // border-image: linear-gradient(top, #ace, #f96, #ace, #f96, #ace) 20 20;
            // border-image: linear-gradient(#F80, #2ED) 20 20;
            border-image: linear-gradient(90deg ,rgb(255, 255, 255), rgba(78, 79, 78, 0.337)) 20 20;
           
        }   
        .iconfont {
            font-size:40px;
            color: #333333 !important;
            font-weight: 900 ; 
            margin-left: 10px;          
        }
        .van-tab--active {
            color: #333333;           
        }
        //空白占位
        .nav-right_space {
            color: #fff;
            display: inline-block;
        }
        //底部滑动条
        .van-tabs__line {
            background-color: #3296fa !important;
        }
    }
    #home-index{
        padding: 99px 0 100px;
    }
</style>