import Vue from "vue";
import Vuex from "vuex";
import loginStore from "@/store/module/loginStore";
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        loginStore: loginStore
    }, plugins:[createPersistedState({
        paths:["loginStore"],
        storage: window.sessionStorage,
    })]
});