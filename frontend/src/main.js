import Vue from 'vue'
import App from './App.vue';

import PortalVue from 'portal-vue';
import router from './router';
import store from './store';
import VueRouter from 'vue-router';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from "axios"

import SequentialEntrance from 'vue-sequential-entrance';
import 'vue-sequential-entrance/vue-sequential-entrance.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import { faCheckCircle, faPlusSquare, faPlusCircle,faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false;

library.add(faCircle,faCheckCircle, faPlusCircle, faPlusSquare,faPlus);
Vue.component('font-awesome-icon', FontAwesomeIcon);


Vue.use(axios);

Vue.use(SequentialEntrance);

// create http base
const http = axios.create({
    baseURL: process.env.BACKEND_URL ? process.env.BACKEND_URL : 'http://localhost/',
  });
  Vue.prototype.$http = http;
// import PopperJs from '@popperjs/core';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons);
// This imports all the layout components such as <b-container>, <b-row>, <b-col>:
import { LayoutPlugin } from 'bootstrap-vue'
Vue.use(LayoutPlugin)

// This imports <b-modal> as well as the v-b-modal directive as a plugin:
import { ModalPlugin } from 'bootstrap-vue'
Vue.use(ModalPlugin)

// This imports <b-card> along with all the <b-card-*> sub-components as a plugin:
import { CardPlugin } from 'bootstrap-vue'
Vue.use(CardPlugin)

// This imports directive v-b-scrollspy as a plugin:
import { VBScrollspyPlugin } from 'bootstrap-vue'
Vue.use(VBScrollspyPlugin)

// This imports the dropdown and table plugins
import { DropdownPlugin, TablePlugin } from 'bootstrap-vue'
Vue.use(DropdownPlugin)
Vue.use(TablePlugin)

// Integrate vue-router to the app 
 Vue.use(VueRouter);

// Integrate portal to the app 
Vue.use(PortalVue);

// Integrate PopperJs to the app 
// Vue.use(PopperJs);

Vue.config.productionTip = false;


new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
