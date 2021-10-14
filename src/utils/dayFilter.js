//时间过滤器
import vue from 'vue';
import dayjs from 'dayjs'

//加载中文包 和 relativeTime 插件
import relativeTime from 'dayjs/plugin/relativeTime.js'
import 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

vue.filter('dayFil',value=>{
    return dayjs().to(value)
})