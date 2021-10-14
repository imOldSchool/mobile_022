import request from '@/utils/request'

//获取用户频道列表
export const  channelList = () => request({
    method: 'GET',
    url:'/v1_0/user/channels'
})


//获取用户点击频道的内容 传参数：频道id
export const getArticle = params => request({
    method: 'GET',
    url: '/v1_1/articles',
    params
})
// export const getArticle = id => request({
//     method: 'GET',
//     url: '/v1_1/articles',
//     params: id
// })

//获取全部频道 - 推荐频道
export const getAllChannels = () => request({
    method: 'GET',
    url: '/v1_0/channels'
})

//覆盖全部频道 channels	─ id seq	
export const coverChannels = channel => request({
    method: 'PUT',
    url: '/v1_0/user/channels',
    data: {
      channels: [channel]
    }
    
})

//删除指定频道
export const removeChannels = target => request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${target}`,
})

//添加指定频道
export const addChannels = channel => request({
    method: 'PATCH',
    url:`/v1_0/user/channels`,
    data: {
        channels: [channel]
    }

})