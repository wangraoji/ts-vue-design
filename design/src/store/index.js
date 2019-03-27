import Vue from 'vue'
import Vuex from 'vuex'

import storeTest from './modules/storeTest'
Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        storeTest
    }
})

export default store