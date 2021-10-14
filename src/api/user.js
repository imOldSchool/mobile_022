import request from '@/utils/request'

//获取用户自己信息请求
export const getUserInfo = () => request({
    method:'GET', 
    url: '/v1_0/user'
})

//获取用户个人资料
export const getMyUser = () => request({
    method:'GET', 
    url: '/v1_0/user/profile'
})
//编辑用户个人资料
export const ChangeMyUser = data => request({
    method:'PATCH', 
    url: '/v1_0/user/profile',
    data
})
//编辑用户头像
export const ChangePhoto = data => request({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data
})