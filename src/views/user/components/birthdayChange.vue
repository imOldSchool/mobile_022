<template>
  <div>
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="$emit('closeBirth')"
        @confirm='setBirFn'
       />
  </div>
</template>

<script>
import dayjs from 'dayjs'
//传入接口
import { ChangeMyUserAPI } from '@/api'
export default {
  data() {
    return {
      minDate: new Date(1960, 0, 1),
      maxDate: new Date(2021, 10, 1),
    //   currentDate: new Date(myBirthday),
    //   currentDate: new Date(2020, 0, 17),
      currentDate: dayjs(this.myBirthday).toDate(),
    };
  },
  //引入生日数据
  props:['myBirthday'],
  methods:{
      async setBirFn(){
          if(this.currentDate == this.myBirthday){
              this.$emit('closeBirth')
              return
          }
          try{
            console.log(dayjs(this.currentDate).format('YYYY-MM-DD'))
            let birDay = dayjs(this.currentDate).format('YYYY-MM-DD')
            //如果和传过来的日期不同就发起修改
            const res = await ChangeMyUserAPI({
              birthday: birDay
            })
            console.log(res)
            //成功就传值给父组件然后关闭
            this.$toast('修改成功')
            this.$emit('changeBirthday',birDay)
            this.$emit('closeBirth')
          }catch(err) {
              this.$toast('修改失败请重试')
          }
      }
  }
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