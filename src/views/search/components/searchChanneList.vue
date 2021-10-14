<template>
  <div>
      <!-- 频道文章列表 -->
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
            <van-cell-group v-for="(obj,inx) in ArticleList" :key="inx">
                <!-- 导航到文章详细页面 -->
                <van-cell :to='`/main/article/${obj.art_id}`'>
                    <!-- <span slot='title' class='cell-title'>
                        {{obj.title}}
                    </span> keyFilter(text,key)-->
                    <span slot='title' class='cell-title' v-html='keyFilter(obj.title,Thekey)'>
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

  </div>
</template>

<script>
//引入发起获取此频道文章请求模块
import { searchChannelAPI } from '@/api'
export default {
    data() {
        return {
            ArticleList: [],
            loading: false,
            finished: false,
            //页数
            page: 1
        };
    },
    created(){
        console.log(this.timeStamp)
        console.log('我激活了' + this.id)
       
    },
    props:['Thekey'],
    methods: {
        async onLoad() {
             this.finished = false
            //如果搜索的值为空就退出
            console.log('触发加载,key的值为：'+this.Thekey)
             //发起获取此频道文章请求
            try {
                let id = parseInt(this.id);
                console.log(id)
                const { data } = await searchChannelAPI({
                   page: this.page,
                   q: this.Thekey
                })
                let arr = data.data
                console.log(arr)
                //把获取的文章和后来加载的文章添加到后面
                console.log(...arr.results)
                this.ArticleList.push(...arr.results)
                console.log(arr.results[1].cover.images.length)
                console.log(this.ArticleList)
                //文章加载完成
                this.loading = false
                //页数+1
                this.page++
                //如果获取的数据小于10 就提示没有了
                if(arr.length < 10){
                    this.finished = true
                }
            }catch(err){
                console.log('获取频道文章失败')
                this.$toast.success('获取频道文章失败')
            }
         },
         //关键字高亮
         keyFilter(text,key){
            let reg = new RegExp(key,'gi')
            return text.replace(reg,`<span style="color: #3296fa">${key}</span>`)
        }
       
    },
    watch:{
        //监听传过来的key 是否变化 变化就重置页面
        Thekey(newVal){
            console.log(newVal)
            console.log('key变化了,重置页面key变化了,重置页面key变化了,重置页面')
            //重置页面
            this.page = 1
            this.ArticleList = []
            this.onLoad()
        }
    }
    
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