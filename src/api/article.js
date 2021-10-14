import request from "@/utils/request"

//文章详情页面
export const articles = id => request({
    url:`/v1_0/articles/${id}`
})

//获取文章评论
export const getComments = params => request({
    method: 'GET',
    url:'/v1_0/comments',
    params
})

//发表文章评论
export const PostComment = data => request({
    method: 'POST',
    url: '/v1_0/comments',
    data
})

//对评论点赞
export const LikedCom = data => request({
    method: 'POST',
    url:'/v1_0/comment/likings',
    data
})
//对评论取消点赞
export const NoLikedCom = target =>request({
    method: 'DELETE',
    URL:`/v1_0/comment/likings/${target}`
})
