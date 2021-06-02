<template>
	<div>
		<div class="jtop">
			<div class="mob">
				<router-link to="/botnav/mine">
					<i class="cubeic-back"></i>
				</router-link>
			</div>
			<p>全国确诊人数分布</p>
		</div>
		
		<div class="hel">
			<!-- 初始化echarts需要有个 有宽高的 盒子 -->
			<div ref="mapbox" style="height: 450px;width: 100%;"></div>
		</div>
	</div>
</template>

<script>
	import echarts from 'echarts'
	import 'echarts/map/js/china.js'
	import jsonp from 'jsonp'
	const option={
		title:{
			text:'小梦地情',
			link:'http://cjxnsb.cn/mxcf/index.html'
		},
		series:[{
			name:'确诊人数',
			type:'map',
			map:'china',
			label:{
				show:true,
				color:'#333',
				fontSize:10
			},
			roam:true,
			zoom:1.05,
			emphasis:{
				label:{
					color:'#fff',
					fontSize:12
				},
				itemStyle:{
					areaColor:'#83b5e7'
				}
			},
			data:[]
		}],
		visualMap:[{
			type:'piecewise',
			show:true,
			pieces:[
				{min:10000},
				{min:1000,max:9999},
				{min:100,max:999},
				{min:10,max:99},
				{min:1,max:9}
			],
			inRange:{
				color:['#ffc0b1','#9c0505']
			}
		}],
		tooltip:{
			trigger:'item'
		},
		toolbox:{
			show:true,
			orient:'vertical',
			left:'right',
			top:'center',
			feature:{
				dataView:{readOnly:false},
				restore:{},
				saveAsImage:{}
			}
		}
	}
	
	export default{
		data(){
			return{
				
			}
		},
		mounted() {
			this.getData()
			this.mychart=echarts.init(this.$refs.mapbox)
			this.mychart.setOption(option)
		},
		methods:{
			getData(){
				jsonp('https://interface.sina.cn/news/wap/fymap2020_data.d.json?_=1580892522427',{},(err,data)=>{
					if(!err){
						let list=data.data.list.map(item=>({name:item.name,value:item.value}))
						option.series[0].data=list
						this.mychart.setOption(option)
					}
				})
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.jtop
		width 100%
		height 1.25rem
		background-color #00bcd4
		.mob
			width 0.375rem
			height 0.375rem
			line-height 1.25rem
		p
			text-align center
			font-size 0.525rem
	.hel
		margin-top 1.25rem
</style>
