import { createApp } from 'vue'
import App from './App.vue'
// import router from '@/router/index'
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from 'pinia'

import Home from "@/components/HomeSec.vue";
import Login from "@/components/LoginSec.vue"
import RegistrationForm from "@/components/RegistrationForm.vue"
import UserProfile from '@/components/UserProfile.vue'
import dashBoard from '@/components/dashBoard.vue'   
import ShowTodo from './components/ShowTodo.vue';
import ProfileEdit from './components/ProfileEdit.vue';
import notFound from './components/notFound.vue';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


const router = createRouter({ 
    history: createWebHistory(),
    routes:[
      {
        path: "/",
        name: "Home",
        component: Home,
        meta: { requiresAuth: true, title: "home" },
      },
      {
        path: "/login",
        name: "login",
        component: Login,
        meta: { requiresAuth: false, title: "login" },
      },
      {
        path: "/registration",
        name: "registration",
        component: RegistrationForm,
        meta: { title: "registration" },
      },
      {
        path: "/profile",
        name:'profile',
        component: UserProfile,
        meta:{ requiresAuth: true,}
      },
      {
        path: "/dashboard",
        name:'dashboard',
        component: dashBoard,
        meta:{ requiresAuth: true, title:'dashboard'}
      },
      {
        path: "/taskManager",
        name:'taskManager',
        component: ShowTodo,
        meta:{ requiresAuth: true, title:'ShowTodo'}
      },
      {
        path: "/ProfileEdit",
        name:'ProfileEdit',
        component: ProfileEdit,
        meta:{ requiresAuth: true, title:'ProfileEdit'}
      },
        {
        path: "/:catchAll(.*)",
        name:'notFound',
        component: notFound,
        meta:{ requiresAuth: true, title:'notFound'}
      },
    ]
    
  });
  const defalutTitle = "router | ";
  document.isAuthenticated = false
  router.afterEach((to) => {
    document.title = defalutTitle + to.meta.title;
  });
  const getter = () => {
    let key = localStorage.getItem("key");
    return !!key;
  };
  // console.log(getter())
  
  router.beforeEach((to, from, next) => {
    console.log("to--------------", to);
    console.log("from----------", from);
    // if(localStorage.getItem("key").length != null){
    if (to.meta.requiresAuth && !getter()) {
      next("/login");
    } else if (to.name === "login" && getter()) {
      next("/");
    }else if(to.name === "registration" && getter()){
      next("/");
    } else {
      next();
    }
    // }
  });
const app = createApp(App);
app.use(router);
app.use(createPinia())
app.use(VueSweetalert2);
app.mount("#app");
