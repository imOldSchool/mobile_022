import Vue from 'vue'
import VueRouter from 'vue-router'
//引入登录页面
import login from '@/views/login'
//引入404页面
import NOT404 from '@/not404'
//引入搜索页面
import search from '@/views/search'

Vue.use(VueRouter)

const routes = [
    //默认登陆页面
    {
        path: '/',
        redirect: '/main/layout'
    },
    //路由
    {
        path: '/login',
        name: 'login',
        component: login
    },
    //内容主页面
    {
        path:'/main',
        name: 'main',
        redirect: '/main/layout',
        component: () => import('@/views/main'),
        children:[
            {
                path: 'layout',
                name: 'layout',
                component: ()=> import('@/views/layout') ,
                children:[
                    //默认跳转到首页
                    {
                        path: '',
                        name: 'home',
                        component: () => import('@/views/home')
                    },
                    //问答区
                    {
                        path: 'qa',
                        name: 'qa',
                        component: () => import('@/views/qa')
                    },
                    // 跳转到视频页
                    {
                        path: 'videos',
                        name: 'videos',
                        component: () => import('@/views/video')
                    },
                    //跳转到我的信息
                    {
                        path: 'myself',
                        name: 'myself',
                        component: () => import('@/views/myself')
                    },
                    
        
                ]
            },
            //搜索区
            {
                path: 'search',
                name: 'search',
                component: search,
            },
            //文章详情
            {
                path: 'article/:articleId',
                name: 'article',
                component:() => import('@/views/article'),
                props:true
            },
            //编辑资料
            {
                path: 'user',
                name: 'user',
                component: () => import('@/views/user')
            }
        ]
    }
    ,
    // {
    //     path: '/layout',
    //     name: 'layout',
    //     component: ()=> import('@/views/layout') ,
    //     children:[
    //         //默认跳转到首页
    //         {
    //             path: '',
    //             name: 'home',
    //             component: () => import('@/views/home')
    //         },
    //         //问答区
    //         {
    //             path: 'qa',
    //             name: 'qa',
    //             component: () => import('@/views/qa')
    //         },
    //         // 跳转到视频页
    //         {
    //             path: 'videos',
    //             name: 'videos',
    //             component: () => import('@/views/video')
    //         },
    //         //跳转到我的信息
    //         {
    //             path: 'myself',
    //             name: 'myself',
    //             component: () => import('@/views/myself')
    //         },
    //         //搜索区
    //         {
    //             path: 'search',
    //             name: 'search',
    //             component: search,
    //         },

    //     ]
    // },
    //404
    {
        path: '*',
        component: NOT404
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router
