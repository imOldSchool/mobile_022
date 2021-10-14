<template>
  <div class="article-container markdown-body">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      @click-left="$router.go(-1)"
      title="黑马头条"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中  loding控制-->
      <div class="loading-wrap" v-if='loading'>
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
        <!-- 如果有数据就显示文章-->
      <div class="article-detail" v-else-if="articleList.aut_name">
        <!-- 文章标题 -->
        <h1 class="article-title">{{articleList.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="articleList.aut_photo || 'https://img.yzcdn.cn/vant/cat.jpeg'"
          />
          <div slot="title" class="user-name">{{articleList.aut_name}}</div>
          <div slot="label" class="publish-date">{{articleList.pubdate | dayFil}}</div>
          <!-- <van-button
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            v-if='!articleList.is_followed'
          >关注</van-button>
          <van-button
            class="follow-btn"
            round
            size="small"
          v-else>已关注</van-button>-->
        <Followed class="follow-btn" :aut_id='articleList.aut_id' :is_followed='articleList.is_followed'></Followed>
        </van-cell> 

        <!-- /用户信息 -->
        <!-- 文章内容 -->
        <div class="article-content" v-html='articleList.content'></div>
        <van-divider>正文结束</van-divider>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404   404资源不存在就显示这个-->
      <div class="error-wrap" v-else-if="the404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="$router.go(0)">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
      >写评论</van-button>
      <van-icon
        name="comment-o"
        info="123"
        color="#777"
      />
      <!-- <van-icon
        color="#777"
        name="star-o"
      /> -->
      <!-- 收藏组件 -->
      <Collected :is_collected='articleList.is_collected' :aut_id='articleId'></Collected>
      <!-- <van-icon
        color="#777"
        name="good-job-o"
      /> -->
      <!-- 点赞组件 -->
      <Liked :is_like='articleList.attitude' :aut_id='articleId'></Liked>
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
  </div>
</template>

<script>
//发起获取文章请求
import { articlesAPI } from '@/api'
//添加关注组件 
import Followed from '@/components/followings.vue'
//添加收藏组件
import Collected from '@/components/collected.vue'
//添加点赞组件
import Liked from '@/components/liked.vue'
export default {
  name: 'searchArticle',
  components: {
      Followed,
      Collected,
      Liked
  },
  props: {
    articleId: {
      type: [Number, String , Object],
      required: true
    }
  },
  data () {
    return {
        articleList:[],
        loading: false,
        the404: false,
        // followed: this.articleList.is_followed
    }
  },
  computed: {},
//   data:
// art_id: BigNumber {s: 1, e: 18, c: Array(2)}
// attitude: null
// aut_id: 1
// aut_name: "ggg"
// aut_photo: "http://toutiao-img.itheima.net/FlXc3PYKO_cjFSuRV6o4pc2n_CDf"
// ch_id: 10
// content: "<p>122222222222222222222222222</p>"
// is_collected: false
// is_followed: false
// pubdate: "2020-11-10T15:08:00"
// recomments: []
// title: "33333"
  watch: {
      //检测到ID变化就重新发起请求
     articleId(){  
        this.getArticle()
     } 
  },
  created () {
      //第一进入时 或者刷新时发起请求
      console.log('我刷新了')
      this.getArticle()
  },
  mounted () {
  },
  methods: {
      //定义发起获取文章请求
      async getArticle(){
          //显示加载中
          this.loading = true;
          this.the404 = false;
        try {
            // const { data } = await articlesAPI(this.articleId)
            const { data } = await articlesAPI(this.articleId)
            // console.log(res)
            this.articleList = data.data
        }catch (err){
            console.log(err.response.status)
            //如果 404 就显示资源不存在
            if(err.response.status == 404){
                this.the404 = true;
            }

        }
        //不显示加载
        this.loading = false;
      },
  }
}
</script>

<style scoped lang="less">
//引入markdowncss
@import '../style/github-markdown.css';

.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
