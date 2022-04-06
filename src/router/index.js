import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/pages/Home";
import ImageBoard from "@/pages/ImageBoard";
import Login from "@/pages/Login";

import NoticeBoard from "@/pages/NoticeBoard";
import {store} from "@/store/store";
import Content from "@/pages/Content";
import BoardWrite from "@/pages/BoardWrite";
import BoardUpdate from "@/pages/BoardUpdate";
import Join from "@/pages/Join";

Vue.use(VueRouter)


const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,

        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
        },
        {
            path: '/imageboard',
            name: 'ImageBoard',
            component: ImageBoard,
            beforeEnter: (to, from, next) => {
              if(store.state.loginStore.isLogin) {next();}
              else {next({name: 'Login'});}
            },
        },
        {
            path: '/notice',
            name: 'Notice',
            component: NoticeBoard,
        },
        {
            path: '/board/detail',
            name: 'Content',
            component: Content,
            props: (route) => ({boardType: route.query.boardType, num:route.query.num}),
        },
        {
            path:'/board/write',
            name: 'BoardWrite',
            component: BoardWrite,
            props: (route) => ({boardType: route.query.boardType}),
        },
        {
            path:'/board/update',
            name: 'BoardUpdate',
            component: BoardUpdate,
            props: (route) => (
                {
                    boardType: route.query.boardType,
                    num: route.query.num,
                    content: route.query.content,
                }
            ),
        },
        {
            path: '/join',
            name: 'Join',
            component: Join,
        }

    ]
});





export default router