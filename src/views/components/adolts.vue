<template>
	<div>
		<div class="abq" @click="changeA">
			<div class="item"></div>
			<div class="item"></div>
			<div class="item"></div>
		</div>
		
	</div>
</template>

<script>
	export default{
		name:'Adolt',
		data(){
			return{
				
			}
		},
		methods:{
			changeA(){
				this.$emit('Helloa')
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.abq
		position fixed
		top 0.325rem
		right 0.1875rem
		.item
			float right
			width 7px
			height 7px
			border-radius 50%
			background-color white
			margin-right 0.101rem
			z-index 1000
</style>
