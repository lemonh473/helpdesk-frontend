import { createWebHistory, createRouter } from "vue-router";
import Home from "@/components/Home.vue";
import AdminHome from "@/components/AdminHome.vue";
import Login from "@/components/auth/Login.vue";
import Register from "@/components/auth/Register.vue";
import Index from "@/components/issues/Index.vue";
import Create from "@/components/issues/Create.vue";
import Edit from "@/components/issues/Edit.vue";

const routes = [
    {
        path: "/admin",
        component: AdminHome,
        children: [
            {
                path: "/login",
                name: "Login",
                component: Login,
                meta: {
                    guest: true
                }
            },
            {
                path: "/register",
                name: "Register",
                component: Register,
                meta: {
                    guest: true
                }
            },
        ],
    },
    {
        path: "/",
        component: Home,
        children: [
          {
            path: "",
            name: "Home",
            component: Create,
          },
          {
            path: "/edit/:id",
            name: "Edit",
            component: Edit,
          },
          {
            path: "/issues",
            name: "Issues",
            component: Index,
            meta: {
                auth: true
            }
          },
      ],
    },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const isLoggedIn = localStorage.getItem('session')

  if (isLoggedIn && to.meta.guest) {
    next('/')
    return
  }

  if (!isLoggedIn && to.meta.auth) {
    next('/login')
    return
  }
  
  next()
})

export default router;