<template>
	<div>
		<img class="headerimg" src="http://mp-piao-admincp.qunarzz.com/mp_piao_admin_mp_piao_admin/admin/20204/03ae0f8cc1a027d52b1ffa22265f7fb3.jpg_750x200_57386caf.jpg" alt="xiaod" />
		<cube-form
			:model="model"
			:schema="schema"
			@submit="submitHandler">
			</cube-form>
		<router-link class="a" to="/register">未登录，去注册</router-link>
	</div>
</template>

<script>
	export default {
		data() {
			return{
				model:{
					username:'',
					password:''
				},
				schema:{
					fields:[
						{
							type:'input',
							modelKey:'username',
							label:'用户名',
							props:{
								placeholder:'请输入用户名'
							},
							rules:{
								// 校验规则
								required:true,
								type:'string',
								min:3,
								max:15
							},
							trigger:'blur',   //失去焦点时检测
							messages:{
								required:'用户名不能为空',
								min:'用户名不能少于3个字符',
								max:'用户名不能超过15个字符'
							}
						},
						{
							type:'input',
							modelKey:'password',
							label:'密码',
							props:{
								placeholder:'请输入密码',
								type:'password',
								eye:{
									open:false
								}
							},
							rules:{
								// 校验规则
								required:true
							},
							trigger:'blur',   //失去焦点时检测
							messages:{
								required:'用户名不能为空'
							}
						},
						{
							type:'submit',
							label:'登录'
						}
					]
				}
			}
		},
		beforeRouteEnter(to,from,next) {
			if(localStorage.token){
				next(vm=>{
					vm.$router.replace({path:'/botnav/index'})
				})
			}else{
				next()
			}
		},
		methods:{
			async submitHandler(e){
				e.preventDefault()
				try{
					const result=await this.$http.get('/api/login',({params:this.model}))
					if(result.code=='0'){
						this.$store.commit('settoken',result.token)
						this.$store.commit('setName',this.model.username)
						localStorage.setItem('token',result.token)
						localStorage.setItem('sname',this.model.username)
						
						// 判断路由是否带参——带的话就去到参数地址
						if(this.$route.query.redirect){
							this.$router.replace({path:this.$route.query.redirect})
						}else{
							this.$router.replace({path:'/botnav/index'})
						}
					}else{
						alert(result.message)
					}
				}catch(err){
					console.log(err)
				}
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.headerimg
		height 150px
		width 100%
	.a
		font-size 0.375rem
		text-align right
		float right
		padding 0.8125rem
</style>
