<template>
  <div>
      <!-- 头部标题 -->
      <van-nav-bar title="登录" />
     <!-- 登录 -->
     <van-form @submit="onSubmit">
       
            <van-field
                v-model="mobile"
                clearable
                placeholder="请输入手机号"
                :rules="rule.phonerule"
            >
                <i slot='left-icon' class="iconfont icon-shouji"></i>
            </van-field>
            <van-field
            v-model="code"
            center
            clearable
            :rules="rule.smsrule"
            placeholder="请输入短信验证码"
            >
                <i slot='left-icon' class="iconfont icon-yanzhengma"></i>
                <template #button>
                    <!-- <van-button size="small" type="primary">发送验证码</van-button> -->
                    <span class="verification" @click='getCode' v-if='time == 0'>获取验证码</span>
                    <span class="verification" v-else>{{time}}</span>
                </template>
            </van-field>
        
     
            <div style="margin: 28px 16px;">
                <van-button round block type="info" native-type="submit">提交</van-button>
            </div>
        </van-form>
            <!-- <span class="iconfont icon-dianzan"></span> -->
    </div>
</template>

<script >
import { userLoginAPI } from '@/api'
// 传入封装好的本地存储
import { setItem } from '@/utils/storage'
export default {
    name: 'login',
    data() {
        return {
        mobile: '13911111111',
        code: '',
        rule: {
            //手机号验证规则
            phonerule :[{ required: true },{ pattern : /^1\d{10}$/ , message : '请输入正确的手机号'}],
            //验证码验证
            smsrule:[{ required: true },{ pattern : /^\d{6}$/ , message : '请输入正确的六位数验证码'}]
        },
        time: 0,
        }
         
    },
    methods: {
       async onSubmit() {
            console.log(this.mobile);
            console.log(this.code)
            console.log(this.$store.state.token)
            //登录中提示
            var _self = this;
            this.$toast.loading({
                 message: '加载中...',
                forbidClick: true,
                closeOnClick: true,
                duration: 10000,
                //如果请求超时就显示回调函数
                onClose : ()=> {
                    _self.$toast.loading({
                     message: '请求超时重新尝试',
                    forbidClick: true,
                    closeOnClick: true,
                    duration: 1500,
                    })
                    return
                }
            });
            try{
                //发起登录请求
                const res = await userLoginAPI({
                    mobile: '13900000000',
                    code: '246810',
                })
                console.log(res)
                console.log(res.data.data)
                console.log(res.data.data.token)
                console.log('等待数据')
            
                //如果正常就显示登录成功
                this.$toast.success('登录成功')
                console.log('登录成功')
                //保存数据到vuex 
                this.$store.commit('updateToken',res.data.data)
                //保存两种tonken到本地储存
                setItem('token',res.data.data.token)
                setItem('refresh_token',res.data.data.refresh_token)

                //跳转到主页面
                this.$router.push({
                    path: '/'
                })
                console.log(this.$store.state.usertoken.user)
            }catch(err){
                console.log(err)
                console.log(err.response)
                 //如果参数错误提示不正确
                if(err.response.status == 400){
                    this.$toast.fail('手机号格式或者验证码不正确或者失效')
                }else{
                    this.$toast.fail('登录失败：用户非实名用户无权限登录或者服务器异常')
                }
               
            }
           
        },
        //验证码显示 验证码发送
        getCode(){
            //验证码倒时器
            this.time = 15 
            const timer = setInterval(() =>{
                if(this.time <= 0){
                    clearInterval(timer);
                    this.time = 0
                    return;
                }
                this.time--
            },1000)
            this.code = '246810'
            this.$toast.success('获取验证码成功')
        }
    },
}
// data:
// data:
// id: 1
// name: "www"
// photo: "http://toutiao-img.itheima.net/Fj4Y873c1dGRkKW3QzMrrqhO4WAQ"
// refresh_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MzQxMjc3MjYsInVzZXJfaWQiOjEsInJlZnJlc2giOnRydWUsInZlcmlmaWVkIjp0cnVlfQ.ytd-pfTtHPDPYOf83olubfRdBdAqIg4ILvDfSMl9Wcc"
// token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NjQzNjc3MjYsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.NGAUTTAOeR-IefCyEWwZcoxgSIzM5vxYHor3CKP8RQI"

// {data: {…}, status: 201, statusText: 'CREATED', headers: {…}, config: {…}, …}
// config:
// adapter: ƒ xhrAdapter(config)
// baseURL: "http://api-toutiao-web.itheima.net"
// data: "{\"mobile\":\"13911111111\",\"code\":\"246810\"}"
// headers: {Accept: 'application/json, text/plain, */*', Content-Type: 'application/json'}
// maxBodyLength: -1
// maxContentLength: -1
// method: "post"
// timeout: 0
// transformRequest: [ƒ]
// transformResponse: Array(1)
// 0: ƒ transformResponse(data)
// length: 1
// [[Prototype]]: Array(0)
// transitional: {silentJSONParsing: true, forcedJSONParsing: true, clarifyTimeoutError: false}
// url: "/mp/v1_0/authorizations"
// validateStatus: ƒ validateStatus(status)
// xsrfCookieName: "XSRF-TOKEN"
// xsrfHeaderName: "X-XSRF-TOKEN"
// [[Prototype]]: Object
// data:
// data:
// id: 1
// name: "ja"
// photo: "http://toutiao-img.itheima.net/Fj0-ydvS9Q5wei7LusfPuOS1b8I3"
// refresh_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MzQxMjAxMzAsInVzZXJfaWQiOjEsInJlZnJlc2giOnRydWUsInZlcmlmaWVkIjp0cnVlfQ.rByFxvk7mAJtV4nuPQhN9yCM8A0ColJIuiJuwPo42T8"
// token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NjQzNjAxMzAsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.ALtusx6QyWUjgM9iJhl5VMaXJcP50NlGKJ1rVBge-Xs"
// [[Prototype]]: Object
// message: "OK"
// [[Prototype]]: Object
// headers: {content-length: '484', content-type: 'application/json'}
// request: XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
// status: 201

</script>

<style scoped lang='less'>
    .iconfont {
        font-size: 20px;
        margin-right: 5px;
    }
    .verification{
        width: 160px;
        height: 40px;
        background-color: #ededed;
        color: #7a7a7a;
        font-size: 8px;
        display: inline-block;
        text-align: center;
        line-height: 40px;
        border-radius:24px;
    }
    //发送验证码字体大小
    /deep/.van-field__button {
        .verification {
            font-size: 25px;
        }
       
    }
</style>
