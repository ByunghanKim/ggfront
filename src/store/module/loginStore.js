
const loginStore = {
    namespaced: true,
    state: {
        id: '',
        name: '',
        token: '',
        isLogin: false,

    },
    getters: {
    },
    mutations: {
        set_id(state, payload) {
            state.id = payload;
        },
        set_name(state, payload) {
            state.name = payload;
        },
        set_token(state, payload) {
            state.token = payload;
        },
        set_isLogin(state, payload) {
            state.isLogin = payload;
        }
    },
    actions: {
    }
}

export default loginStore;