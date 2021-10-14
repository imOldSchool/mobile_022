<template>
  <div>
      <van-picker
        title="性别"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="onCancel"
        :default-index="sexInx"
        />
  </div>
</template>

<script>
import { Toast } from 'vant';
//引入接口
import { ChangeMyUserAPI } from '@/api'
export default {
  data() {
    return {
      columns: ['男', '女'],
    };
  },
  //引入性别数据
  props:['sexInx']
  ,
  methods: {
    async onConfirm(value, index) {
      console.log(value,index)
      //如果选择的性别和传过来的数据不一样才执行
      if(index != this.sexInx){
          try{
            const res = await ChangeMyUserAPI({
              gender: index
            })
            console.log(res)
            Toast('修改成功')
            this.$emit('changeSex',index)
            this.$emit('closeSex')
          }catch(err){
              Toast('修改失败,请稍后重试')
          }
      }else{
          this.$emit('closeSex')
      }
    },
    onCancel() {
        this.$emit('closeSex')
    },
  },
};
</script>

<style lang='less' scoped>
    /deep/.van-picker{
        .van-ellipsis {
            color: #111 !important;
            font-size: 35px;
        }
    }

</style>