<template>
	<div class="list" ref="wrapper">
		<div>
			<div class="area">
				<div class="title border-topbottom" ref="wrapD">当前城市</div>
				<div class="button-list">
					<div class="button-wrapper">
						<div class="button">{{this.$store.state.city}}</div>
					</div>
				</div>
			</div>
			<div class="area">
				<div class="title border-topbottom">热门城市</div>
				<div class="button-list">
					<div class="button-wrapper" v-for="item of hot" :key="item.id">
						<div :style="{borderColor:(ccity==item.name?'#00FFFF':'#ccc')}" class="button" @click="handClick(item.name)">{{item.name}}</div>
					</div>
				</div>
			</div>
			<div class="area" v-for="(item, key) of cities" :key="key" :ref="key">
				<div class="title border-topbottom">{{key}}</div>
				<div class="item-list">
					<div :style="{color:(ccity==innerItem.name?'red':'')}" class="item border-bottom" v-for="innerItem of item" :key="innerItem.id" @click="handClick(innerItem.name)">
						{{innerItem.name}}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Bscroll from 'better-scroll'
	export default {
		props:{
			hot:Array,
			cities:Object,
			letterr:String
		},
		data(){
			return{
				ccity:this.$store.state.city
			}
		},
		mounted() {
			this.scroll=new Bscroll(this.$refs.wrapper,{
				click:true
			})
		},
		watch:{
			letterr(){
				if(this.letterr){
					const element=this.$refs[this.letterr][0]
					this.scroll.scrollToElement(element)
				}
			}
		},
		methods:{
			handClick(city){
				this.$store.commit('addcity',city)
				this.scroll.scrollToElement(this.$refs.wrapD)
				setTimeout(()=>{
					this.$router.replace({path:'/botnav/index'})
				},50)
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.border-topbottom
		&:before
			border-color: rgb(238,238,238)
		&:after
			border-color: rgb(238,238,238)
	.border-bottom
		&:before
			border-color: rgb(238,238,238)
	.list
		width 100%
		height 100vh
		overflow hidden
		position absolute
		top 2rem
		left 0
		right 0
		bottom 0
		font-size 0.375rem
		.title
			line-height .64rem
			background #eee
			text-align left
			padding-left .2rem
			color #666
		.button-list
			overflow hidden
			padding .1rem .6rem .1rem .1rem
			.button-wrapper
				float left
				width 33.33%
				.button
					margin .1rem
					padding .1rem 0
					text-align center
					border .02rem solid #ccc
					border-radius .06rem
		.item-list
			.item
				line-height .76rem
				text-align left
				padding-left .2rem
				border-bottom 0.000285rem solid #ccc
</style>
