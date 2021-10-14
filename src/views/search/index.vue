<template>
  <div class='search-box'>
      <div class="toptop">
        <van-search
        v-model.trim="value"
        show-action
        autofocus
        clearable
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
       
        >
        <template #action>
            <div @click="onSearch">搜索</div>
        </template>
        <div slot="left" class='left-goBack' @click="$router.go(-1)"><van-icon name="arrow-left" /></div>
        </van-search>
        </div>
    <!-- 下方搜索列表-->
    <div v-show='value != "" && !ChanneShow'>
        <van-cell-group>
            <van-cell title="搜索建议" class="searchSug"/>
        </van-cell-group>
        <van-list
        :finished="finished"
        finished-text="搜索无结果"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        >
                 <!-- 搜索联想 添加点击后跳转到页面-->
        <van-cell icon="search" v-for="(item,inx) in keyList" :key="inx+'cc'" @click='goSearch(item)'>
            <span slot='title' v-html='keyFilter(item,value)'></span>
        </van-cell>
        </van-list>
    </div>

    <!-- 查询历史模板 -->
    <div class='SearchHistoryClass' v-show='value == "" && !ChanneShow'>
        <van-cell-group>
            <van-cell title="搜索历史" class="searchSug">
            <!-- 右侧隐藏和删除按钮 -->
                <span slot="default" class='searchSug-icon'>
                    <van-icon @click='SearchShow = true' v-show='!SearchShow' name="eye"/>
                    <van-icon @click='SearchShow = false' v-show='SearchShow' name="closed-eye" />
                    <van-icon @click='reItem("f")' name="delete" />
                </span>
            </van-cell>
        </van-cell-group>
        <van-cell v-for="(item,inx) in SearchHistory" v-show='!SearchShow' :key="inx+'aa'" :title="item" @click='goSearch(item)'>
            <span slot="default" class='searchSug-icon'>
                <van-icon @click='reItem(inx)' name="cross" />
            </span>
        </van-cell>
    </div>

    <!-- 搜索结果模块 -->
    <div v-show='ChanneShow'>
        <van-cell title="搜索结果" class="searchSug">
        </van-cell>
        <SearchChanneList :Thekey='key'></SearchChanneList>
    </div>
  </div>
</template>

<script>
//引入 搜索关键字模块
import { searchKeyAPI } from '@/api'
//引入 读写本地存储模块
import { setItem , getItem , removeItem} from '@/utils/storage'
//引入收索结果模块
import  SearchChanneList from './components/searchChanneList.vue'
export default {
    name: 'search'
    ,
    components:{
        SearchChanneList
    },
    data() {
        return {
            value: '',
            //搜索列表
            keyList: [],
            loading: false,
            finished: false,
            error: false,
            timer:null,
            //搜索历史
            SearchHistory:[],
            //隐藏历史
            SearchShow:false,
            //搜索结果显示
            ChanneShow:false,
            key:'',
            clickTimer:null
        };
    },
    created(){
        //初始化时读取本地储存
        this.SearchHistory = getItem('SearchHis') || []
    },
    methods:{
        //返回到主页面
        // goBack(){
        //     console.log("我点击了")
        //     this.$emit('goBackHome',1);
        // },
        onSearch(){
            if(this.value == '' || this.value.length <= 0) return;
            console.log('我点击了搜索')
            //点击搜索后 添加进搜索历史
            //如果历史里没有 才添加  防止重复
            if(this.SearchHistory.every(val=> val != this.value)){
                this.SearchHistory.push(this.value)
                setItem('SearchHis',this.SearchHistory)
            }
            
            //显示搜索文章页面 
            this.ChanneShow = true
            //传值到搜索结果子组件
            this.key = this.value
            console.log('父组件的key:'+this.key)
        },
        //点击搜索联想 发起搜索
        goSearch(item){
            this.value = item
            this.onSearch()
            //异步清除定时器
            this.clickTime = null
            this.clickTime = setTimeout(()=>{
                this.ChanneShow = true
                this.finished = false
                // clearTimeout(this.timer)
                // this.timer = null
                clearTimeout(this.timer)
                this.timer = null
            },100)

        },
         onLoad() {
        // 异步更新数据
        //添加lodash 防抖函数 模块
           
        },
        // page	否		页数，不传默认为1
        // per_page	否		每页数量，不传每页数量由后端决定
        // q	是		搜索关键词
        //发起关键字搜索 请求
        async searchKey(){
            if(this.value == '' || this.value.length <= 0) return;
            try{
                const { data } = await searchKeyAPI({
                    // page: this.page,
                    q: this.value
                })
                let res = data.data.options
                this.keyList = res
                console.log(data)
                //如果没有数据  就显示无结果
                if(res.length <= 0 || res.length == ''){
                    this.finished = true 
                }
            }catch(err){
                //加载失败显示点击重新加载
                this.error = true
            }

           
        },
        //删除历史记录
        reItem(val){
            var _self = this;
            //如果有传值就删除指定的
            if(val>= 0){
                console.log(val)
                //删除指定内容
                this.SearchHistory.splice(val,1)
                setItem('SearchHis',this.SearchHistory)
            }else{
                //没有传值就删除全部
                _self.$dialog.confirm({
                title: '删除',
                message: '确定要删除所有历史记录吗',
                })
                .then(() => {
                   //确定删除所有
                   removeItem('SearchHis')
                   this.SearchHistory = []
                })
                .catch(() => {
                    // on cancel
                });
            }
        },
        keyFilter(text,key){
            let reg = new RegExp(key,'ig')
            return text.replace(reg,`<span style="color: #3296fa">${key}</span>`)
        }
    },
    //监听关键字
    watch:{
        value(newVal){
            //如果输入改变 就隐藏结果页面
            this.ChanneShow = false
            this.finished = false
            //如果新值小于1就清除内容 和 退出执行
            if(newVal == ''|| this.value.length <= 0){
                clearTimeout(this.timer)
                this.timer=null
                this.keyList = []
                return;
            } 
            // console.log(newVal)
            // debounce(this.searchKey(),1000)
            //防抖处理
            clearTimeout(this.timer)
            this.timer = null
            //发起异步定时器
            this.timer = setTimeout(()=>(this.searchKey()),700)
        }
    }
}
</script>

<style scoped lang='less'>
    //搜索框样式
    /deep/.van-search {
        color: #ffffff;
        height: 100px;
        // 搜索框大小
        // .van-search__content  {
        //     width: 460px;
        // }
        //左边返回按钮
        .left-goBack {
            width: 65px;  
            height: 60px;
            margin-right: 5px;
            line-height: 60px;
        }
        //右边搜索按钮
        .van-search__action {
            color: #ffffff;
            width: 95px;
            height: 60px;
            line-height: 60px;
            text-align: center;
        }

    }
    //给大盒子加上内边距
    .search-box {
        padding-top: 100px;
    }
    .toptop {
        position: fixed;
        top: 0;
        z-index: 99999;
        width: 100%;
    }
    //收缩建议提示CELL 文字大小
    .searchSug {
        height: 60px;
        background-color: #f5f7f9;
        line-height:60px;
        padding-top:0;
        color: #777;
    }
    //搜索历史 
    /deep/.SearchHistoryClass {
        //搜索历史 右侧图标
        .searchSug-icon {
            display: inline-block;
            height: 100%;
            .van-icon {
                font-size: 40px;
                margin-right: 15px;
                margin-left: 30px;
            }
        }
    }
</style>