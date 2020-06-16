import Vue from 'vue';
import Vuex from 'vuex';


// Integrate vuex to the app
Vue.use(Vuex);

const store = new Vuex.Store ({
    // Not updatable directly
    strict: true,
    // Options
    state () {
        return {
            user: null,
        }
    },
    mutations: {
        user: (state, user) => {
            state.user = user;
        }
    }
});

export default store;