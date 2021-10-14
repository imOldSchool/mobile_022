<template>
  <div>
      <!-- 登录状态-已登录 -->
      <div class="personal" v-if='usertoken.user'>
        <!-- 头像区域 -->
        <div class="personnal_headPortrait">
          <!-- 头像 -->
          <div class='personnal_left'>
            <van-image
              fit="cover"
              round
              :src='userInfoArr.photo || "https://img01.yzcdn.cn/vant/cat.jpeg"'
            />
            <span class='personnal_text'>{{userInfoArr.name}}</span>
          </div>
          <van-button round type="default" to='/main/user'>编辑资料</van-button>
        </div>
        <!-- 粉丝区域 -->
        <div class="personnal_fans">
          <div class="personnal_div">
            <div class='personnal_div_number'>{{userInfoArr.art_count}}</div>
            <div>头条</div>
          </div>
          <div class="personnal_div">
            <div class='personnal_div_number'>{{userInfoArr.follow_count}}</div>
            <div>关注</div>
          </div>
          <div class="personnal_div">
            <div class='personnal_div_number' >{{userInfoArr.fans_count}}</div>
            <div>粉丝</div>
          </div>
          <div class="personnal_div">
            <div class='personnal_div_number'>{{userInfoArr.like_count}}</div>
            <div>获赞</div>
          </div>
        </div>
      </div>

      <!-- 登录状态-未登录 -->
      <div class="notLogin" v-else>
          <router-link class="notLogin_register" to='/login'>
            <div class='notLogin_register_circle'>
              <i class="iconfont icon-shouji"></i>
            </div>
            <div class="notLogin_register_text" >登录 / 注册</div>
          </router-link>
      </div>

      <!-- 收藏和历史 -->
      <van-grid :border="false" :column-num="2">
        <van-grid-item >
          <i slot='icon' class="iconfont icon-shoucang"></i>
          <span slot='text' class='van-grid__text'>收藏</span>
        </van-grid-item>
        <van-grid-item>
          <i slot='icon' class="iconfont icon-lishi"></i>
          <span slot='text' class='van-grid__text'>历史</span>
        </van-grid-item>
      </van-grid>

      <!-- 消息通知和小智同学 -->
      <div class="inform">
        <van-cell title="消息通知" is-link title-class='inform_text' />
        <van-cell title="小智同学" is-link title-class='inform_text' />
      </div>

      <!-- 退出按钮 -->
      <van-button type="primary" @click="logout" v-if="usertoken.user" color="#ffffff" block>退出登录</van-button>

  </div>
</template>

<script>
import { mapState } from 'vuex'
//引入删除本地储存模块
import { removeItem } from '@/utils/storage'
//获取用户信息
import { getUserInfoAPI } from '@/api'
export default {
    name:'myself',
    computed : {
      ...mapState(['usertoken'])
    },
    data(){
      return{
        // art_count:0
        // certi:""
        // fans_count:1
        // follow_count:0
        // id:1161115471538290700
        // intro:"qwe3212999999999999"
        // is_media:false
        // like_count:-6
        // name:"zzzzzz"
        // photo:"http://toutiao-img.itheima.net/Fhx2eXMQLbqqotnQJrx5gZiaWtqX"
        userInfoArr:[]
      }
    },
    methods:{
      //退出登录
      logout(){
        this.$dialog.confirm({
          title: '退出登录',
          message: '是否要退出登录？？',
        })
          .then(() => {
            // on confirm
            console.log('退出登录了')
            //退出清除vuex 数据 和 本地储存数据
            this.usertoken.user = ''
            removeItem('token')
            removeItem('refresh_token')
            this.$router.go(0)
          })
          .catch(() => {
            // on cancel
            console.log('取消了')
          });
      },
      //初始化发起请求
      async getUser(){
          //用户信息请求 如果用户登录了就获取用户信息
          if(this.usertoken.user){
              try{
                  const userRes =  await getUserInfoAPI()
                  console.log(userRes)
                  //储存信息到userInfoArr
                  this.userInfoArr = userRes.data.data
                  this.usertoken.userInfo = userRes.data.data
                  this.$toast('获取用户信息成功！');
              }catch(err){
                  this.$toast('获取用户信息失败');
              }     
        }
      }

    },
    // //初始化发起请求
    // async created(){
    //     //用户信息请求 如果用户登录了就获取用户信息
    //     if(this.usertoken.user){
    //         try{
    //             const userRes =  await getUserInfoAPI()
    //             console.log(userRes)
    //             //储存信息到userInfoArr
    //             this.userInfoArr = userRes.data.data
    //             this.usertoken.userInfo = userRes.data.data
    //             this.$toast('获取用户信息成功！');
    //         }catch(err){
    //             this.$toast('获取用户信息失败');
    //         }     
    //    }
    // },
    watch:{
      $route: {
        handler: function(val){
          console.log(val.name);
          if(val.name == 'myself'){
            this.getUser()
          }
        },
        deep: true,
        immediate: true
      }
    }
}
</script>

<style scoped lang='less'>
  //上方头像
  .personal {
    width: 750px;
    height: 375px;
    // border: 1px solid #111;
    background-image: url('~@/assets/banner.png');
    background-size: cover;
    
    .personnal_headPortrait {
      // border: 1px solid red;
      width: 750px;
      height: 230px;
      line-height: 230px;
      display:flex;
      //设置padding
      padding: 26px  32px 0px 32px;
      //设置边框盒子 不受内边距影响
      box-sizing: border-box;
      align-items: center;
      justify-content: space-between;
      .personnal_left {
        padding: 0;
         margin: 0;
          // 设置头像大小
        .van-image--round {
          width: 132px;
          height: 132px;
          border: 4px solid #fffffe;
          vertical-align: middle;
        }
        .personnal_text {
          font-size: 32px;
          font-weight: 900;
          margin-left: 37px;
          color: #ffffff;
        }
      }
      
      //设置右侧按钮
      .van-button--default {
        width: 132px;
        height: 49px;
        color:#8c8c8c;
        background-color: #ffffff;
        font-size: 22px;
        word-break:keep-all;
        float:right;
      }
    }
    .personnal_fans {
      // border: 1px solid blue;
      width: 750px;
      height: 145px;
    }
  }
  //粉丝
  .personnal_fans{
    color: #ffffff;
    font-size: 25px;
    display:flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    padding: 0px  32px 0px 32px;
    font-weight: 500;
    
    .personnal_div{
      display: inline-block;
      width: 100px;
      height: 100px;
      text-align: center;
      div{
        height: 50px;
        line-height: 50px;
      }
      .personnal_div_number{
        font-size: 30px;
        letter-spacing:3px;
      }
    }
  }
  //收藏和历史
  .van-grid-item__content{
    //自定义的图标
    .iconfont {
      font-size: 46px;
    }
    .icon-shoucang {
      color: #eb5253
    }
    .icon-lishi{
      color: #ff9d1d
    }
    //下方文字
    .van-grid__text {
      font-size: 31px ;
      color: #333333 ;
      font-weight: 600 ;
      letter-spacing:7px;
    }
  }
  // 通知和小爱同学
  .inform {
    margin-top: 10px;
    .inform_text{
      font-size: 30px;
      font-weight: 600;
    }
  }
  // 退出登陆
  .van-button--block {
    margin-top: 10px;
    color: #d86262 !important;
    font-size: 30px;
  }

  // 未登录状态
  //点击登录、注册
  .notLogin {
    width: 750px;
    height: 375px;
    // border: 1px solid #111;
    background-image: url('~@/assets/banner.png');
    background-size: cover;
    display:flex;
    align-items: center;
    justify-content: center;
    
    .notLogin_register {
      width: 155px;
      height: 180px;
      // border: 1px solid red;
      text-align: center;
      margin-top: 20px;
      .notLogin_register_circle {
        width: 130px;
        height: 130px;
        background-color: #fff;
        border-radius: 50%;
        // text-align: center;
        line-height:130px;
        margin: 0px 10px;
        .icon-shouji {
          font-size: 70px;
          color: #2589ff;
        }
      }
      .notLogin_register_text {
        font-size: 30px;
        color: #ffffff;
        width: 155px;
      }
    }
  }
</style>