import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/view/layout/layout'

Vue.use(Router)

export const constantRouter = [{
        path: '',
        redirect: '/index',
        name: '首页',
        component: Layout,
        meta: { title: '首页', icon: 'icon-Homehomepagemenu' },
        children: [{
            path: 'index',
            name: '首页',
            component: () =>
                import ('@/view/homepage/index'),
            meta: { title: '首页', icon: 'icon-Homehomepagemenu' },
            hidden: false
        }]
    },
    {
        path: '/login',
        name: '登录',
        component: () =>
            import ('@/view/login'),
        meta: { title: '登录' },
        hidden: true
    },
    {
        path: '/404',
        component: () =>
            import ('@/view/error-page/404'),
        hidden: true
    },
    {
        path: '/check',
        name: '验证码',
        component: () =>
            import ('@/view/components/check-text'),
        hidden: false
    },
    {
        path: '/score',
        name: '星星评论',
        component: () =>
            import ('@/view/components/score'),
        hidden: false
    }

]

// 异步路由表
export const asyncRouterMap = [
    // 用户角色权限管理
    {
        path: '/permission',
        component: Layout,
        redirect: '/permission/role',
        meta: { title: '表格', icon: 'icon-yonghu' },
        children: [
            // {
            //     path: 'role',
            //     name: '角色管理',
            //     component: () =>
            //         import ('@/view/permission/role'),
            //     meta: { title: '角色管理', icon: 'icon-yonghu' },
            //     menu: 'upms:role:read',
            //     hidden: false
            // },
            {
                path: 'user',
                name: '表格',
                component: () =>
                    import ('@/view/permission/user'),
                meta: { title: '表格', icon: 'icon-yonghu' },
                menu: 'upms:user:read',
                hidden: false
            },
            {
                path: 'userAdd',
                name: '用户管理-添加用户',
                component: () =>
                    import ('@/view/permission/userAdd'),
                meta: { title: '用户管理-添加用户', icon: 'icon-yonghu' },
                menu: 'upms:user:read',
                hidden: true
            },
            // {
            //     path: 'menu',
            //     name: '菜单管理',
            //     component: () =>
            //         import ('@/view/permission/menu'),
            //     meta: { title: '菜单管理', icon: 'icon-yonghu' },
            //     menu: 'upms:menu:read',
            //     hidden: false
            // }
        ]
    },
    // 模块管理
    {
        path: '/mode',
        component: Layout,
        redirect: '/mode/index',
        meta: { title: '富文本编辑器', icon: 'icon-box' },
        children: [{
                path: 'index',
                name: '富文本编辑器',
                component: () =>
                    import ('@/view/richTextEditor/quillEditor'),
                meta: { title: 'quillEditor', icon: 'icon-box' },
                menu: 'upms:mode:read',
                hidden: false
            },
            {
                path: 'log',
                name: '模块注册',
                component: () =>
                    import ('@/view/mode/log'),
                meta: { title: '模块注册', icon: 'icon-box' },
                menu: 'upms:log:read',
                hidden: false
            }
        ]
    }
]

export default new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouter
})