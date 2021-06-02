<template>
	<ul class="list">
		<li class="item" v-for="(item,key) of cities" :key="key" @click="handleClick">
			{{key}}
		</li>
	</ul>
</template>

<script>
	export default{
		props:{
			cities:Object
		},
		methods:{
			handleClick(e){
				this.$emit('change',e.target.innerText)
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.list
		display flex
		flex-direction column
		justify-content center
		position fixed
		top 1.2rem
		right 0
		bottom 0
		width .5rem
		.item
			font-size 0.375rem
			text-align center
			line-height .5rem
			color #00bcd4
</style>
