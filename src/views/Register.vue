<template>
	<div>
		<img class="headerimg" src="http://mp-piao-admincp.qunarzz.com/mp_piao_admin_mp_piao_admin/admin/20204/03ae0f8cc1a027d52b1ffa22265f7fb3.jpg_750x200_57386caf.jpg" alt="xiaod" />
		<cube-form
			:model="model"
			:schema="schema"
			@submit="submitHandler">
			</cube-form>
		<router-link class="a" to="/login">去登录</router-link>
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
							label:'注册'
						}
					]
				}
			}
		},
		methods:{
			submitHandler(e){
				e.preventDefault()
				this.$http.get('/api/register',{params:this.model}).then(res=>{
					if(res.success){
						console.log(res.message)
						this.$router.replace({path:'/login'})
					}
				}).catch(err=>{
					console.log(err)
				})
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
		text-align left
		float left
		padding 0.625rem
</style>
