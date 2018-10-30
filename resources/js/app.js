import Vue from 'vue';
import VueRouter from 'vue-router';

// VeeValidate - Validate HTML inputs and Vue components, generate localized errors
import VeeValidate from 'vee-validate';

// Axios - a promise-based HTTP client
import axios from 'axios';
import VueAxios from 'vue-axios';

// Paginate - component to make pagination
import Paginate from 'vuejs-paginate';

// Vue Components
import App from './App.vue';
import Dashboard from './components/Dashboard.vue';
import Home from './components/Home.vue';
import Register from './components/Register.vue';
import Login from './components/Login.vue';
import Company from './components/companies/Company.vue';
import CompaniesCreate from './components/companies/CompaniesCreate.vue';
import CompaniesEdit from './components/companies/CompaniesEdit.vue';
import NotFound from './components/NotFound.vue';

Vue.use(VeeValidate);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.component('paginate', Paginate);

// const Register = () => System.import('./components/Register.vue');
// const Login = () => System.import('./components/Login.vue');

axios.defaults.baseURL = 'http://192.168.0.159/lara-vue-auth/public/api/';

const router = new VueRouter({
    // mode: 'history', //removes # (hashtag) from url
    // base: '/lara-vue-auth/public/',
    // fallback: true, //router should fallback to hash (#) mode when the browser does not support history.pushState
    routes: [{
        path: '/',
        name: 'home',
        component: Home
    },{
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            auth: false
        }
    },{
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            auth: false
        }
    },{
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {
            auth: true
        }
    },{
        path: '/company',
        name: 'company',
        component: Company,
        meta: {
            auth: true
        },
    },
    {
        path: '/company/create', 
        name: 'createCompany',
        component: CompaniesCreate,
        meta: {
            auth: true
        }
    },{
        path: '/company/edit/:id', 
        name: 'editCompany',
        component: CompaniesCreate, 
        meta: {
            auth: true
        }
    },{ 
        path: '*', component: NotFound
    },
    ]
});

// @websanova/vue-auth - This is the library responsible for handling authentication on the client side.
Vue.router = router
Vue.use(require('@websanova/vue-auth'), {
   auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
   http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
   router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
});

App.router = Vue.router
new Vue(App).$mount('#app');