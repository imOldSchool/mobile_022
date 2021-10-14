<template>
  <div  id="apply">
      <van-field
    v-model.trim="message"
    rows="2"
    cols='5'
    autosize
    autofocus
    type="textarea"
    maxlength="70"
    placeholder="请输入留言"
    show-word-limit
    >
    <button slot='button' @click="PostCom"  :disabled='message ==""' :class='message !="" ? "CanButton" : ""'>发布</button>
    </van-field>
  </div>
</template>

<script>
//引入发表评论接口
import { PostCommentAPI } from '@/api'
export default {
    data() {
      return {
        message: ''
      };
    },
    //接收祖先组件的发过来的值
    inject:['Art_id']
    ,
    methods:{
        // target	integer	必须		评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）	
        // content	string	必须		评论内容	
        // art_id	integer	非必须		文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
        //发表评论
        async PostCom(){
            try{
                const { data } = await PostCommentAPI({
                target: this.Art_id ,
                content: this.message 
                })
                const newObj = data.data.new_obj
                //把返回的新数组发给父组件 然后父组件传给其他组件
                this.$emit('newObj',newObj)
            }catch (err) {
                console.log(err.response.status)
                if(err.response.status == 401){ 
                    this.$toast('请先登录')
                }else{
                    this.$toast('发布评论失败！！请稍后重试')
                }
            }
           
        }
    }
    // data:
// data:
// art_id: BigNumber {s: 1, e: 18, c: Array(2)}
// com_id: BigNumber {s: 1, e: 18, c: Array(2)}
// new_obj:
// aut_id: BigNumber {s: 1, e: 18, c: Array(2)}
// aut_name: "zzzzzz"
// aut_photo: "http://toutiao-img.itheima.net/Fhx2eXMQLbqqotnQJrx5gZiaWtqX"
// com_id: BigNumber {s: 1, e: 18, c: Array(2)}
// content: "231231"
// is_top: 0
// like_count: 0
// pubdate: "2021-10-11T20:18:32"
// reply_count: 0

}
</script>

<style scoped lang='less'>
    //输入框背景
    /deep/.van-field__body {
        .van-field__control{
            background-color: #eee;
        }
        //发布按钮 默认样式
        .van-field__button {
            color: #bbb;
            button{
                border:0;
                background-color: #fff;
            }
        }
    }
    //发布按钮可以按时样式
    .CanButton {
        color: red;
        font-weight: 700;
    }
</style>