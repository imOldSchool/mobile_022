<template>
  <div>
     
      <!-- 路由切换页 -->
      <keep-alive>
        <router-view @changeActive='changeActiveBTN'></router-view>
      </keep-alive>
      <!-- 下方选择标签 -->
      <van-tabbar v-model="active" active-color='#4ba3fb'>
        <!-- <van-tabbar-item to='/layout' icon="iconfont icon-youjiantou">首页</van-tabbar-item>
        <van-tabbar-item to='/layout/qa' icon="search">问答</van-tabbar-item>
        <van-tabbar-item to='/layout/video' icon="friends-o">视频</van-tabbar-item>
        <van-tabbar-item to='/layout/myself' icon="setting-o">我的</van-tabbar-item> -->
        <van-tabbar-item to='/main/layout'>
            <i slot='icon' class="iconfont icon-shouye" ></i>
            <span>首页</span>
        </van-tabbar-item>
        <van-tabbar-item to='/main/layout/qa'>
            <i slot='icon' class="iconfont icon-wenda" ></i>
            <span>问答</span>
        </van-tabbar-item>
        <van-tabbar-item to='/main/layout/videos'>
            <i slot='icon' class="iconfont icon-shipin" ></i>
            <span>视频</span>
        </van-tabbar-item>
        <van-tabbar-item to='/main/layout/myself'>
            <i slot='icon' class="iconfont icon-wode" ></i>
            <span>{{usertoken.user ? '我的' : '未登录'}}</span>
        </van-tabbar-item>
    </van-tabbar>
  </div>
  <!-- 4ba3fb -->
</template>

<script>
import { mapState } from 'vuex'

export default {
    name:'layout',
     data() {
        return {
            active: 0,
            show: true,
            //默认向右切换
            slide:'slide-left'
        };
    },
    computed:{
        ...mapState(['usertoken'])
    },
    methods:{
        changeActiveBTN(){
            //改变索引为首页
            this.active = 0
        },
        cccccc(){
            console.log(this.userInfo)
        }
    },

}
</script>

<style scoped lang='less'>
    .van-tabbar-item__icon{
        i.iconfont {
            font-size:40px;
        }

    }
</style>