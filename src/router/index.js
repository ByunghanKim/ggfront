import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/pages/Home";
import ImageBoard from "@/pages/ImageBoard";
import TestPage from "@/pages/TestPage";
import TestPage2 from "@/pages/TestPage2";
import TestPage3 from "@/pages/TestPage3";
import Login from "@/pages/Login";

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
        },
        {
            path: '/testpage',
            name: 'TestPage',
            component: TestPage,
        },
        {
            path: '/testpage2',
            name: 'TestPage2',
            component: TestPage2,
        },
        {
            path: '/testpage3',
            name: 'TestPage3',
            component: TestPage3,
        },
    ]
})


export default router