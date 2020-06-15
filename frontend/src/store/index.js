import Vue from 'vue';
import Vuex from 'vuex';


// Integrate vuex to the app
Vue.use(Vuex);

const store = new Vuex.Store ({
    // Options
    state () {
        return {
            user: null,
        }
    }
});

export default store;