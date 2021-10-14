export default {
    state :{
        user : '',
        userInfo : '',
    },
    mutations: {
        //登录写入TOKEN
        updateToken(state,value) {
            state.user = value;
        },
        //获取头像和粉丝数
        upuserInfo(state,value) {
            state.userInfo = value;
        }
    }
}