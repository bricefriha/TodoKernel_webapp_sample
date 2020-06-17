import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'

// Integrate vuex to the app
Vue.use(Vuex);

const store = new Vuex.Store ({
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
    // Not updatable directly
    strict: true,
    // Options
    state () {
        return {
            user: null,
        }
    },
    getters: {
        user: state => state.user,
    
        // userPicture: (state, getters) => {
        //   const user = getters.user
        //   if (user) {
        //     const photos = user.profile.photos
        //     if (photos.length !== 0) {
        //       return photos[0].value
        //     }
        //   }
        // },
      },
    mutations: {
        user: (state, user) => {
            state.user = user;
        }
    }
});

export default store;