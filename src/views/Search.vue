<template>
	<div>
		<city-header></city-header>
		<city-search :cities="cities"></city-search>
		<city-list :cities="cities" :hot="hotCities" :letterr="letterr"></city-list>
		<city-alphabet :cities="cities" @change="handleChange"></city-alphabet>
	</div>
</template>

<script>
	import CityHeader from './components/Header.vue'
	import CitySearch from './components/Search.vue'
	import CityList from './components/List.vue'
	import CityAlphabet from './components/Alphabet.vue'
	export default{
		components:{
			CityHeader,
			CitySearch,
			CityList,
			CityAlphabet
		},
		data(){
			return{
				cities:{},
				hotCities:[],
				letterr:''
			}
		},
		methods:{
			async getCityInfo(){
				const abc=await this.$http.get('/api/city')
				if(abc.ret && abc.data){
					const data=abc.data
					this.cities=data.cities
					this.hotCities=data.hotCities
				}
			},
			handleChange(letterr){
				this.letterr=letterr
			}
		},
		mounted() {
			this.getCityInfo()
		}
	}
</script>

<style lang="stylus" scoped>
</style>
