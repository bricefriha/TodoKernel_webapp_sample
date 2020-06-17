
import HelloWorld from './components/HelloWorld.vue';
import Login from './components/Login.vue';
import Dashboard from './components/Dashboard.vue';
import VueRouter from 'vue-router';
// ToDo: importing store seems totally dumb to me but it works for now  
import store from './store';



const routes = [
    { path: '/', name: 'home', component: HelloWorld},
    { path: '/login', name: 'login', component: Login},
    { path: '/signup', name: 'signup', component: Login},
    { path: '/dashboard', name: 'dashboard', component: Dashboard, meta: { private: true }},
];

const router = new VueRouter({
    mode: 'history',
    name: 'Router',
    routes,
});

router.beforeEach((to, from, next) => {
    console.log(store.getters.user);
    // if the route is set as private and the user is not connected
    if (to.meta.private && !store.getters.user) {
        // rederect to login
        next({name: 'login'});
        return;
    }
    next();
});

export default router;
