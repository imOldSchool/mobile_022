import { userLogin }from './login'
import { ChangePhoto , getUserInfo , getMyUser , ChangeMyUser} from './user'
import { addChannels , channelList , getArticle , getAllChannels , coverChannels , removeChannels} from './home'
import { searchKey , searchChannel} from './search'
import { LikedCom , NoLikedCom , articles , getComments , PostComment} from './article'
import { NoLikedThat , LikedThat , followings , NoFollowings , collection , NoCollection} from './interaction'
//用户登录获取TOKEN请求
export const userLoginAPI = userLogin
//用户获取用户信息请求
export const getUserInfoAPI = getUserInfo

//获取用户频道列表
export const channelListAPI = channelList
//获取用户点击的频道文章
export const getArticleAPI = getArticle
//获取所有频道 - 频道推荐
export const getAllChannelsAPI = getAllChannels
//覆盖所有频道 - 一次性替换
export const coverChannelsAPI = coverChannels
//删除指定频道
export const removeChannelsAPI = removeChannels
//添加指定频道
export const addChannelsAPI = addChannels

//搜索关键字
export const searchKeyAPI = searchKey
//搜索文章结果
export const searchChannelAPI = searchChannel

//获取文章详情
export const articlesAPI = articles

//关注用户
export const followingsAPI = followings
//取消关注用户
export const NoFollowingsAPI = NoFollowings

//收藏文章
export const collectionAPI = collection
//取消收藏
export const NoCollectionAPI = NoCollection

//文章进行点赞
export const LikedThatAPI = LikedThat
//文章取消点赞
export const NoLikedThatAPI = NoLikedThat

//获取文章的评论
export const getCommentsAPI = getComments
//发表文章评论
export const PostCommentAPI = PostComment

//取消点赞评论
export const NoLikedComAPI = NoLikedCom
//点赞评论
export const LikedComAPI = LikedCom

//获取用户个人资料
export const getMyUserAPI = getMyUser
//编辑用户个人资料
export const ChangeMyUserAPI = ChangeMyUser
//编辑头像
export const ChangePhotoAPI = ChangePhoto