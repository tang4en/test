<template>
	<div>
		<div class="search">
			<input v-model="keyword" class="search-input" type="text" placeholder="请输入城市名或拼音" />
		</div>
		<div class="search-content" v-show="keyword" ref="search">
			<ul>
				<li :style="{color:(ccity==item.name?'red':'')}" class="search-item" v-for="item of list" :key="item.id" @click="changesd(item.name)">{{item.name}}</li>
				<li class="search-item" v-show="hasList">没有找到匹配数据</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import Bscroll from 'better-scroll'
	export default{
		props:{
			cities:Object
		},
		data(){
			return{
				keyword:'',
				list:[],
				timer:null,
				ccity:this.$store.state.city
			}
		},
		computed:{
			hasList(){
				return !this.list.length
			}
		},
		watch:{
			keyword(){
				if(this.timer){
					clearTimeout(this.timer)
				}
				if(!this.keyword){
					this.list=[]
					return
				}
				this.timer=setTimeout(()=>{
					const result=[]
					for(let i in this.cities){
						this.cities[i].forEach((value)=>{
							if(value.spell.indexOf(this.keyword)>-1 || value.name.indexOf(this.keyword)>-1){
								result.push(value)
							}
						})
					}
					this.list=result
				},100)
			}
		},
		mounted() {
			this.scroll=new Bscroll(this.$refs.search,{
				click:true
			})
		},
		methods:{
			changesd(data){
				this.$store.commit('addcity',data)
				this.keyword=''
				setTimeout(()=>{
					this.$router.replace({path:'/botnav/index'})
				},60)
			}
		},
	}
</script>

<style lang="stylus" scoped>
	.search
		height 1rem
		padding 0 .2rem
		background #00bcd4
		.search-input
			box-sizing border-box
			width 100%
			height .62rem
			padding 0 .1rem
			line-height .62rem
			text-align center
			border-radius .06rem
			font-size 0.375rem
			color #666
	.search-content
		z-index 1
		width 100%
		height 100vh
		overflow hidden
		position absolute
		top 2rem
		left 0
		right 0
		bottom 0
		background #eee
		.search-item
			line-height .62rem
			font-size 0.4375rem
			text-align left
			padding-left .2rem
			background #fff
			border-bottom 0.000285rem solid #ccc
			color #666
</style>
