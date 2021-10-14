import request from "@/utils/request";

//关注用户
export const followings = data =>request({
    method:'POST',
    url: '/v1_0/user/followings',
    data
})

//取消关注用户
export const NoFollowings = target =>request({
    method:'DELETE',
    url:`/v1_0/user/followings/${target}`
})

//收藏文章
export const collection = data => request({
    method:'POST',
    url: '/v1_0/article/collections',
    data
})

//取消收藏
export const NoCollection = target =>request({
    method:'DELETE',
    url:`/v1_0/article/collections/${target}`
})

//点赞
export const LikedThat =  data => request({
    method:'POST',
    url: '/v1_0/article/likings',
    data
})
//取消点赞
export const NoLikedThat = target =>request({
    method:'DELETE',
    url:`/v1_0/article/likings/${target}`
})