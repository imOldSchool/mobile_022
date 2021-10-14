<template>
  <div class="photoClass">
      <!-- 修改头像 -->
      <img :src="imgURL" id="image" alt="">
      <div class='photo-btn'>
         <van-button class='photo-btn-left' type="primary" size="small" round @click="$emit('closePhoto')">取消</van-button>
         <van-button @click='upPhoto' class='photo-btn-right' type="primary" size="small" round>确定</van-button>
      </div>
  </div>
</template>

<script>
// 引入cropper
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs';
//引入接口
import { ChangePhotoAPI } from '@/api'
export default {
    //接收父组件传值
    props:['imgURL'],
    data(){
        return{
            cropper:null
        }
    },
    mounted(){
        const image = document.getElementById('image');
        this.cropper = new Cropper(image, {
            viewMode: 1,
            dragMode: 'move',
            aspectRatio: 1,
            autoCropArea: 1,
            cropBoxMovable: false,
            cropBoxResizable: false,
            background: false,
            movable: true
        });
    },
    methods:{
        async upPhoto(){
            this.$toast.loading({
                message: '更新中...',
                forbidClick: true,
                duration: 10000
            })
            //获取裁剪区域数据 (客户端裁切)
            this.cropper.getCroppedCanvas().toBlob(async(blob) => {
                //转化格式 后端要求formData格式
                const formData = new FormData();
                //后台要求传入的名称为 photo
                formData.append('photo', blob);
                try{
                    const res =  await ChangePhotoAPI(formData)
                    let photo = res.data.data.photo
                    //传值给父组件
                    console.log(photo)
                    this.$emit('changePhoto',photo)
                    this.$toast('更新头像成功')
                    //关闭子组件
                    this.$emit('closePhoto')
                }catch(err){
                    console.log(err.response)
                    this.$toast('更新头像失败')
                }

            })
        }
    }
}
</script>

<style scoped lang='less'>
    //修改头像样式
    .photoClass{
        height: 100%;
        background-color: #111;
    }
    img {
        display: block;
        max-width: 100%;
    }

    //按钮样式
    .photo-btn{
        width: 100%;
        position: fixed;
        bottom: 14px;
        left: 0;
        margin: 0 auto;
        border: 1px solid #111;
        z-index: 999999999 !important;
        //左边
        .photo-btn-left {
            width: 43%;
            margin-left: 8%;
            background-color: rgb(60, 60, 60);
            border:1px solid #555;
            border-radius:30px 0 0 30px;
        }
        //右边
        .photo-btn-right {
            width: 43%;
            background-color: rgb(60, 60, 60);
            border:1px solid #555;
             border-radius: 0 30px 30px 0;
        }
    }
</style>