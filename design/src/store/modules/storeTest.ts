let state = {
    info: {
        data: '状态测试'
    },
    auth: {}
}

const mutations = {
    addAuth: (state,v)=>{
        state.auth.name = v;
    }
}

const getters = {
    info: state => state.info,
    auth: state => state.auth,
}

export default {
    state,
    mutations,
    getters
}