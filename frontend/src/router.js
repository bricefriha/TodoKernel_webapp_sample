import HelloWorld from './components/HelloWorld.vue';
import VueRouter from 'vue-router';

const routes = [
    { path: '/', name: 'home', component: HelloWorld}
];

const router = new VueRouter({
    routes,
});

export default router;
