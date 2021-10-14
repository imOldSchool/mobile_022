<template>
  <div>
      <!-- 频道文章列表 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
            <van-cell-group v-for="(obj,inx) in ArticleList" :key="inx" 
  
            >
            <!-- to='/main/article' -->
                <van-cell :to='`/main/article/${obj.art_id}`'>
                    <span slot='title' class='cell-title'>
                        {{obj.title}}
                    </span>
                     <!-- 右侧图片 -->
                        <!-- <img slot="default" class="picture_right" src="https://img01.yzcdn.cn/vant/cat.jpeg"/> -->
                            <span slot="default" class="picture_right" v-if='obj.cover.images.length == 1'>
                                <van-image
                                fit="cover"
                                :src="obj.cover.images[0]"
                                />
                            </span>
                       <!-- v-if='obj.cover.length == 1'  :src="obj.cover.images[0]"-->
                    <!-- 内容插槽 -->
                    <div slot='label'>
                        <!-- 3宫格图片 -->
                       <div class="picture" v-if='obj.cover.images.length > 1'>
                           <van-image v-for='(img,inx) in obj.cover.images' :key="inx"
                            fit="cover"
                            :src="img"
                            />
                       </div>
                        <!-- 底部人数 -->  
                    </div>
                    <div slot='label' class='bottomContent'>
                            <span v-show="obj.is_top == 1">顶置</span>
                            <span>{{obj.aut_name}}</span>
                            <span>{{obj.comm_count}}评论</span>
                            <span>{{obj.pubdate | dayFil}}</span>
                    </div>
                </van-cell>
            </van-cell-group>
        </van-list>
    </van-pull-refresh>

  </div>
</template>

<script>
//引入发起获取此频道文章请求模块
import { getArticleAPI } from '@/api'
export default {
    data() {
        return {
            ArticleList: [],
            loading: false,
            finished: false,
            refreshing: false,
            //时间戳
            timeStamp: null
        };
    },
    created(){
        console.log(this.timeStamp)
        console.log('我激活了' + this.id)
       
    },
    props:['id'],
    methods: {
        async onLoad() {
            console.log('触发加载')
             //发起获取此频道文章请求
            try {
                let id = parseInt(this.id);
                console.log(id)
                const { data } = await getArticleAPI({
                    channel_id: id,
                    timestamp: this.timeStamp || Date.now(),
                    with_top: 1
                })
                let arr = data.data
                console.log(arr)
                //获得时间轴后 赋值给this.timeStamp 以便加载后面的数据
                this.timeStamp = arr.pre_timestamp
                //把获取的文章和后来加载的文章添加到后面
                console.log(...arr.results)
                this.ArticleList.push(...arr.results)
                console.log(arr.results[1].cover.images.length)
                console.log(this.ArticleList)
                //文章加载完成
                this.loading = false
            }catch(err){
                console.log('获取频道文章失败')
                this.$toast.success('请先登录')
            }
         },
         //刷新数据
        async onRefresh() {
            console.log('刷新了')
            // 清空列表数据
            this.finished = false;

            // 重新加载数据
            // 将 loading 设置为 true，表示处于加载状态
            this.loading = true;
            let id = parseInt(this.id);
            try {
                const { data } = await getArticleAPI({
                    channel_id: id,
                    //刷新用最新数据
                    timestamp:  Date.now(),
                    with_top: 1
                })
                let arr = data.data
                this.ArticleList = arr.results
                //加载完毕
                this.loading = false;
                //刷新完成
                this.refreshing = false;
            }catch(err){
                console.log('刷新失败')
                this.toast('刷新失败,请稍后重试');
            }
            
        },
     },
    
}
</script>

<style scoped lang='less'>
    //3宫格图片大小
    .picture{
        width: 100%;
        height: 148px;
        display:flex;
        flex-flow: row nowrap;
        justify-content: center;
        margin: 30px 0;
        .van-image {
            width: 230px;
            height: 100%;
            margin-right: 4px;
        }
    }
    // 右侧图片
    .picture_right{
        width: 230px;
        height: 148px;
        border-top: 1px solid #111;
        display: inline-block;
        box-sizing: border-box;
        .van-image{
          width: 230px;
          height: 148px;  
        }
    }
    .van-cell__value{
        flex:unset;
    }
    // 117 76

    //标题文字大小
    .cell-title{
        font-size: 34px;
        color: #111;
    }
    // 底部文字
    .bottomContent {
        span{
            margin: 0 8px;
        }
        :first-child{
            color: red;
            font-size: 24px;
        }
    }
</style>