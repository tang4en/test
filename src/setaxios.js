import axios from 'axios'
import store from './store/index.js'
import router from './router/index.js'

// http全局拦截——一旦发请求，第一个进入的一定是“请求拦截”
// token放在请求的header上带回去给“后端”
export default function setAxios(){
	axios.interceptors.request.use(config=>{
		if(store.state.token){
			config.headers.token=store.state.token
		}
		return config
	})
	axios.interceptors.response.use(response=>{
		if(response.status==200){
			const data=response.data
			if(data.code==-1){
				// 登陆过期了
				store.commit('settoken','')
				localStorage.removeItem('token')
				router.replace({path:'/login'})
			}
			return data
		}
		return response
	})
}