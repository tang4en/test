import Vue from 'vue'
import VueRouter from 'vue-router'
import List from '../views/List.vue'
import Mine from '../views/Mine.vue'
import Cart from '../views/Cart.vue'
import Ec from '../views/ec.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'login',
    redirect: '/login'
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/index',
    name: 'index',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Index.vue')
  },
  {
	path: '/botnav',
	name: 'botnav',
	component: () => import('../views/Botnav.vue'),
	children:[
	  {
		path: 'index',
		name: 'index',
		component: () => import('../views/Index.vue'),
		meta:{
			index:1
		}
	  },
	  {
		path: 'list',
		name: 'list',
		component: () => import('../views/List.vue'),
		meta:{
			index:2
		}
	  },
	  {
		path: 'search',
		name: 'search',
		component: () => import('../views/Search.vue'),
		meta:{
			index:3
		}
	  },
	  {
		path: 'cart',
		name: 'cart',
		meta:{
		  requireAuth:true,//当有这个字段的时候，我们就认为他这个路由页面是要有登录权限的
		  index:4
		},
		component: () => import('../views/Cart.vue')
	  },
	  {
		path: 'mine',
		name: 'mine',
		meta:{
		  requireAuth:true,//当有这个字段的时候，我们就认为他这个路由页面是要有登录权限的
		  index:5
		},
		component: () => import('../views/Mine.vue')
	  },
	]
  },
  {
	  path:'/ec',
	  name:'Ec',
	  component:()=>import('../views/ec.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
