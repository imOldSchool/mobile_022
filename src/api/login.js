import request from '@/utils/request'

//获取TOKEN
export const userLogin = data => request({
    url: '/v1_0/authorizations' ,
    method: 'POST',
    data
})