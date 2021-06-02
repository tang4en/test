import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import axios from 'axios'
import setaxios from './setaxios.js'

setaxios()
Vue.config.productionTip = false
Vue.prototype.$http=axios

// 路由守卫
router.beforeEach((to,from,next)=>{
	// 无论刷新还是跳转什么的，第一个进入的一定是路由守卫
	store.commit('settoken',localStorage.getItem('token'))
	if(to.meta && to.meta.requireAuth){
		if(store.state.token){
			next()
		}else{
			next({
				path:'/login',
				query:{redirect:to.fullPath}
			})
		}
	}else{
		next()
	}
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
