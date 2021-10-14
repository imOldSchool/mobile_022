//搜索页面请求
import request from '@/utils/request'

//发起搜索关键字请求
export const searchKey = params => request({
    method: 'GET',
    // url: '/v1_0/search',
    url: '/v1_0/suggestion',
    params
})

//发起搜索关键字文章结果
export const searchChannel = params => request({
    method: 'GET',
    url: '/v1_0/search',
    params
})