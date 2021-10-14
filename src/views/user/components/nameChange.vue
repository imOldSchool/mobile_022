<template>
  <div>
      <!-- 修改用户名 -->
      <van-nav-bar
        title="修改昵称"
        left-arrow
        @click-left="$emit('closeName')"
        >
        <button slot='right' :style='Uname !="" && Uname != name ? "color:rgb(209, 38, 38)": ""' 
        :disabled='Uname =="" && Uname == name' 
        @click='setName'
        class='right-btn'>提交</button>
      </van-nav-bar>
      <!-- 输入用户名 -->
      <van-field
        v-model.trim="Uname"
        rows="1"
        autosize
        clearable
        autofocus
        label="用户名"
        maxlength="7"
        placeholder="起个有特点的名字把"
        show-word-limit
        />
        <span class="tips">用户名可与兴趣、心情、地域相关</span>
  </div>
</template>

<script>
//引入编辑资料API
import { ChangeMyUserAPI } from "@/api"
export default {
    //引入父组件的数据
    props:['name'],
    data(){
        return{
            Uname:this.name
        }
    },
    methods:{
        async setName(){
            try{
                const res = await ChangeMyUserAPI({
                    name: this.Uname
                })
                console.log(res)
                this.$toast('修改成功')
                //给父组件最新名字
                this.$emit('changeName',this.Uname)
                this.$emit('closeName')
            }catch(err){
                this.$toast('修改失败')
            }

        }
    }

}
</script>

<style scoped lang='less'>
    //标题右侧按钮
    /deep/.van-nav-bar__right{
        button {
            border:0;
            background-color: rgba(255, 255, 255, 0);
            color: #666;
            font-weight: 900;
            letter-spacing: 2px;
        }
    }
    //提示
    .tips {
        color: #777;
        font-size:20px;
        margin-left: 30px;
    }
</style>