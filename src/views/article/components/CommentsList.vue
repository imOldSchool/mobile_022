<template>
  <div>
      <!-- 评论表头 -->
      <van-cell class='ComTitle' title="评论" :value="totalCount+' 评论'" border='false' />
      <!-- 无结果时显示 -->
      <div class='NoCom' v-if="ComList.length <= 0">
          - 暂无评论，点击抢沙发 -
      </div>
      <!-- 评论内容 -->
        <!-- <ComStyle v-else :ComList='ComList'></ComStyle> -->
        <van-list
        v-else
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        >
        <van-cell v-for="(item,inx) in ComList" :key="inx">
            <van-image
            slot="icon"
            round
            width="30"
            height="30"
            style="margin-right: 10px;"
            :src="item.aut_photo || 'https://img.yzcdn.cn/vant/cat.jpeg'"
            />
            <span style="color: #466b9d;" slot="title">{{item.aut_name}}</span>
            <div slot="label">
            <p style="color: #363636;">{{item.content}}</p>
            <p>
                <span style="margin-right: 10px;">{{item.pubdate | dayFil}}</span>
                <van-button size="mini" type="default">回复 {{item.reply_count}}</van-button>
            </p>
            </div>
            <span :style='item.is_liking ? "color:rgb(218, 48, 48)" : "color:#111"' >{{item.like_count >0 ? item.like_count : '赞'}}</span>         
            <van-icon @click='likeThat(inx)' :class='item.is_liking ? "likeThat" : ""' slot="right-icon"  size="0.5rem" :name="item.is_liking ? 'good-job':'good-job-o'" /> 
        </van-cell>
        </van-list>
  </div>
</template>

<script>
//获取文章评论接口
import { getCommentsAPI , NoLikedComAPI , LikedComAPI} from "@/api"
export default {
  data() {
    return {
    // aut_id: BigNumber {s: 1, e: 18, c: Array(2)}
    // aut_name: "距离"
    // aut_photo: "http://toutiao-img.itheima.net/FmAThezSTc00PjpORSnw_N9ETM7c"
    // com_id: BigNumber {s: 1, e: 18, c: Array(2)}
    // content: "阿城市"
    // is_liking: false 当前用户是否点赞
    // is_top: 0  是否置顶，0-不置顶，1-置顶
    // like_count: 0  点赞数量
    // pubdate: "2021-10-11T15:53:20" 
    // reply_count: 0 回复数量
      ComList: [],
      loading: false,
      finished: false,
      //评论的最后一个ID - 偏移量
      offset:null, 
      //总评论数 total_count: 550
      totalCount:'0'
    };
  },
  components: {
    //   ComStyle
  },
  created(){
      //一开始就先加载一次评论数据
      this.totalCount = '0'
      this.ComList = []
      this.onLoad()
  }
  ,
  //接收祖先组件传的值
  inject:['Art_id'],
  props:['newObjs']
  ,
  methods: {
    //   type	是	a或c	评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
    // source	是		源id，文章id或评论id
    // offset	否		获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
    // limit	否		获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
      //获取评论
    async onLoad() {
        try{
            const { data } = await getCommentsAPI({
                type: 'a',
                source: this.Art_id,
                offset: this.offset || null
            })
            const res = data.data.results
            console.log(res)
            console.log(data.data)
            //传评论数据的最后一个ID 来确定页数
            this.offset = data.data.last_id
            //传总评论数 并且传给父级
            this.totalCount = data.data.total_count
            this.$emit('totalCount',data.data.total_count)
            //把评论列表渲染进去
            this.ComList.push(...res)
            //完成后loading false
            this.loading = false
        }catch (err) {
            console.log(err)
        }

    },
    //发起点赞
    async likeThat(inx){
        try{
            //如果点赞了就取消
            if(this.ComList[inx].is_liking){
                this.ComList[inx].is_liking = false
                this.ComList[inx].like_count--
                //target  要取消点赞的评论id或评论回复id
                const res = await NoLikedComAPI(this.ComList[inx].com_id.toString())
                console.log(res)
            }else{
                this.ComList[inx].is_liking = true
                this.ComList[inx].like_count++
                //target  要取消点赞的评论id或评论回复id
                const res = await  LikedComAPI({
                    target:this.ComList[inx].com_id.toString()
                })
                console.log(res)
            }
        }catch (err) {
            console.log(err.response)
        }

    }
  },
  watch:{
      //监听新数组，变化就加入到评论里
      newObjs:{
          handler(newVal,oldVal){
              if(newVal == oldVal) return
              this.ComList.unshift(newVal)
              this.totalCount++
              this.$emit('totalCount',this.totalCount)
          },
          deep: true,
          immediate: true
      },
      //文章ID变化就清空数组
      Art_id:{
           handler(newVal,oldVal){
              if(newVal == oldVal) return
              this.ComList = ''
          },
          deep: true,
          immediate: true
      }
  }
};
</script>

<style scoped lang='less'>
//评论表头文字样式
.ComTitle{
    margin-bottom: 10px;
    border:0;
    .van-cell__title{
        font-weight: 900;
        font-size:30px;
    }
}
//无内容时显示抢沙发样式
.NoCom {
    width: 100%;
    height: 130px;
    text-align: center;
    line-height: 130px;
    font-size:20px;
    color:#aaa;

}
//点赞后的样式
.likeThat {
    color:rgb(218, 48, 48);
}
</style>