<template>
  <div>
      <van-nav-bar
        title="编辑资料"
        left-arrow
        @click-left="()=>{
             $router.go(-1) 
             
        }"
        />
                <!-- 选择文件-->
                <input type="file" id="photoFile" ref='photoFile' @change='PhotoFileFN' accept="image/jpeg,image/jpg,image/png" style="display:none">
        <!-- 头像区域 -->
        <div class="HeadImg">
            <div class='style-img' @click="$refs.photoFile.click()">
                <van-image
                fit="cover"
                round
                :src="MyUser.photo ||'https://img01.yzcdn.cn/vant/cat.jpeg'"
                />
                <span class="iconfont icon-zhaoxiangji"></span>
            </div>
            <span>点击更换头像</span>
        </div>
        <!-- 用户名 -->
        <van-cell title="昵称" is-link :value="MyUser.name" @click="nameShow = true"/>
        <!-- 性别 -->
        <van-cell @click="sexShow = true" title="性别" is-link :value="MyUser.gender == '0' ? '男' : '女'" />
        <!-- 生日 -->
        <van-cell title="生日" @click="birthdayShow = true" is-link :value="MyUser.birthday" />

        <!-- 用户名弹出层 -->
        <van-popup
        v-model="nameShow"
        position="right"
        :style="{ height: '100%' ,width: '100%' }"
        >
        <NameChange   v-if='nameShow' @closeName='nameShow = false' :name='MyUser.name' @changeName="val => MyUser.name = val"></NameChange>
        </van-popup>

        <!-- 改变性别弹出层 -->
        <van-popup
        v-model="sexShow"
        round
        position="bottom"
        :style="{ height: '35%' }"
        >
        <SexChange @changeSex="val => MyUser.gender = val" :sexInx='MyUser.gender' @closeSex='sexShow = false' v-if="sexShow"></SexChange>
        </van-popup>

        <!-- 改变生日弹出层 -->
        <van-popup
        v-model="birthdayShow"
        round
        position="bottom"
        :style="{ height: '40%' }"
        >
        <BirthdayChange @changeBirthday='val => MyUser.birthday = val' :myBirthday='MyUser.birthday' v-if='birthdayShow' @closeBirth='birthdayShow = false'></BirthdayChange>
        </van-popup>


        <!-- 改变头像弹出层 -->
        <van-popup
        v-model="photoShow"
        lock-scroll
        position="right"
        :style="{ height: '100%' ,width: '100%'}"
        >
        <PhotoChange @changePhoto='val=> MyUser.photo = val' :imgURL='imgURL' v-if='photoShow' @closePhoto='photoShow = false'></PhotoChange>
        </van-popup>
  </div>
</template>

<script>
//引入发起获取个人信息请求
import { getMyUserAPI } from '@/api'
//引入修改用户名模块
import NameChange from './components/nameChange.vue'
//引入修改性别模块
import SexChange from './components/sexChange.vue'
//引入修改生日模块
import BirthdayChange from './components/birthdayChange.vue'
//引入修改头像模块
import PhotoChange from './components/PhotoChange.vue'
export default {
    name:'user',
    components: {
        NameChange,
        SexChange,
        BirthdayChange,
        PhotoChange
    },
    data() {
        return{
        // data:
        // data:
        // birthday: "2021-07-03"
        // gender: 1  性别，0-男，1-女	
        // id: BigNumber {s: 1, e: 18, c: Array(2)}
        // mobile: "13900000000" 
        // name: "zzzzzz"
        // photo: "http://toutiao-img.itheima.net/Fhx2eXMQLbqqotnQJrx5gZiaWtqX"
            MyUser:'',
            //用户名弹出层
            nameShow:false,
            //修改性别
            sexShow: false,
            //修改生日
            birthdayShow: false,
            //转化后的照片地址
            imgURL:'',
            //修改头像
            photoShow:false,
        }
    },
    async created(){
        //获取用户个人资料
        try{
            const { data } = await getMyUserAPI()
            this.MyUser = data.data
        }catch(err) {
            this.$toast('获取失败请返回重试')
        }

    },
    methods:{
        PhotoFileFN(){
            let pho = document.querySelector('#photoFile').files[0]
            console.log(pho)
            //如果选择的取消文件就是空 就return
            if(pho == undefined || pho == ''){
                console.log('取消了 没选图片')
                return
            }
            //将选择的图片信息转为url地址
            const data = window.URL.createObjectURL(pho)
            // blob:http://localhost:8080/115b774a-d38a-4a2e-9ce8-3a8cb1c3836d
            //把地址传给子组件 
            this.imgURL = data
            //打开子组件
            this.photoShow = true
        }
    }
}
</script>

<style scoped lang='less'>
    //编辑资料标题
    /deep/.van-nav-bar__content {
       
        .van-icon{
            color: #f2f8ff;
        }
        .van-nav-bar__title {
           font-size: 30px;
        }
    }
    //头像区域大小
    /deep/.HeadImg {
        height: 270px;
        width: 100%;
        // border: 1px solid #111;
        display:flex;
        justify-content: center;
        align-items: center;
        font-size: 27px;
        font-weight: 500;
        flex-direction: column;
        span{
            margin-top: 10px;
            letter-spacing: 2px;
        }
        //头像蒙版
        .style-img {
            width: 1.8rem;
            height: 1.8rem;
            position: relative;
            .van-image{
                img{
                    opacity:0.6;
                    z-index: -1;
                }
                width: 100%;
                height: 100%;
            }
            //相机图标
            .iconfont{
                display: inline-block;
                font-size: 50px;
                font-weight: 500;
                width: 50px;
                height: 50px;
                position: absolute;
                top: 50%;
                left: 50%;
                color: #fff;
                margin-top: -25px;
                margin-left: -25px;           
            }
            background-color: #111;
            border-radius: 50%;
        }

    }
</style>