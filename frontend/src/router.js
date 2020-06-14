
import HelloWorld from './components/HelloWorld.vue';
import Login from './components/Login.vue';
import VueRouter from 'vue-router';


const routes = [
    { path: '/', name: 'home', component: HelloWorld},
    { path: '/login', name: 'login', component: Login}
];

const router = new VueRouter({
    mode: 'history',
    name: 'Router',
    routes,
});

export default router;
