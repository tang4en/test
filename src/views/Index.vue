<template>
	<div class="index">
		<div id="m1">
			<router-link to="/botnav/search">
				<p>当前搜索城市：{{this.$store.state.city}}</p>
			</router-link>
		</div>
		<div id="m2" v-show="!showAbs" :style="opacityStyle">
			<router-link to="/botnav/search">
				<p>当前搜索城市：{{this.$store.state.city}}</p>
			</router-link>
		</div>
		<cube-slide ref="slide" :data="items" @change="changePage">
			<cube-slide-item v-for="(item, index) in items" :key="index" @click.native="clickHandler(item, index)">
				<a class="m0" :href="item.url">
					<img class="banner" :src="item.image">
				</a>
			</cube-slide-item>
		</cube-slide>
		<cube-slide ref="slidelists" :auto-play="false" :data="lists">
			<cube-slide-item v-for="(list, index) in lists" :key="index">
			   <ul class="listul">
				   <li class="listli" v-for="(item,index1) in list" :key="index1">
					   <a :href="item.url">
						   <img :src="item.image" alt="haha">
						   <p>{{item.label}}</p>
					   </a>
				   </li>
			   </ul>
			</cube-slide-item>
		</cube-slide>
		<div class="recommend-title">
			<p>当前城市热门推荐</p>
		</div>
		<ul>
		  <li class="item" v-for="item of recommendList" :key="item.id">
		    <img class="item-img" :src="item.imgUrl" />
		    <div class="item-info">
		      <p class="item-title">{{item.title}}</p>
		      <p class="item-desc">{{item.desc}}</p>
		      <button class="item-button">查看详情</button>
		    </div>
		  </li>
		</ul>
		<button class="but" @click="handleUpload">上传</button>
		<!-- <div class="tab-navbar">
		    <h1>我是父组件</h1>
			<myomponent>
				<p>这是一些初始内容</p>
				<p>这是更多的内容</p>
			</myomponent>
		</div> -->
	</div>
</template>

<script>
import myomponent from '@/views/components/child.vue'
export default {
	data(){
		return{
			showAbs:true,
			opacityStyle:{
				opacity:0
			},
			items:[],
			lists:[],
			recommendList: [{
			  id: '0001',
			  imgUrl: 'http://img1.qunarzz.com/sight/p0/1804/7f/7f80af3ddefeb12a3.img.jpg_200x200_3c712d3a.jpg',
			  title: '郑州方特水世界',
			  desc: '河南省郑州市中牟县郑开大道与人文路交汇口以南'
			}, {
			  id: '0002',
			  imgUrl: 'http://img1.qunarzz.com/sight/p0/201305/24/30ea5d168daccc88c8d65eac.jpg_200x200_657228b3.jpg',
			  title: '伏羲山飞龙峡',
			  desc: '河南省郑州新密市尖山钟沟村'
			}, {
			  id: '0003',
			  imgUrl: 'http://img1.qunarzz.com/sight/p0/1410/13/448509f1ff8d30796f6c8fc574dcc0e5.jpg_200x200_cd0c23e3.jpg',
			  title: '中原福塔',
			  desc: '河南省郑州市管城回族区航海东路1206号'
			}, {
			  id: '0004',
			  imgUrl: 'http://img1.qunarzz.com/sight/p0/1811/6c/6cbe2a1a22e6bab2a3.img.jpg_200x200_365f258b.jpg',
			  title: '竹林长寿山景区',
			  desc: '河南省郑州巩义市竹林镇孙寨村'
			}, {
			  id: '0005',
			  imgUrl: 'http://img1.qunarzz.com/sight/p0/1501/7f/7f95b9cb5cc9e227.water.jpg_200x200_2767529b.jpg',
			  title: '郑州绿博园',
			  desc: '河南省郑州市中牟县郑开大道与人文路交汇向南1000米'
			}],
			index: 0,
			list: ["#f66", "#66f", "#f90", "#09f"]
		}
	},
	methods:{
		handleUpload(e){
			console.log(e);
			console.log(this.$data);
			console.log(this.$options.data());
		},
		select(i) {
		            this.index = i;
		            this.$refs.tabs.style.setProperty("--tab-index", i);
		},
		handleScroll(){
			const top=document.documentElement.scrollTop || document.body.scrollTop
			if(top>19){
				let opacity=top/124
				opacity=opacity>1 ? 1 : opacity
				this.opacityStyle={
					opacity
				}
				this.showAbs=false
			}else{
				this.showAbs=true
			}
		},
		changePage(current){
			// console.log('当前轮播序号：'+current)
		},
		clickHandler(item,index){
			console.log(item,index)
		}
	},
	
	async created() {
		try{
			const items=await this.$http.get('/api/banner')
			this.items=items.data
			const lists=await this.$http.get('/api/rollinglist')
			this.lists=lists.data
		}catch(err){
			console.log(err)
		}
		window.addEventListener('scroll',this.handleScroll)
	}
}
</script>

<style lang="stylus" scoped>
	.index
		#m1
			width 100%
			height 1.0625rem
			background #00bcd4
			p
				font-size 0.5rem
				color #969896
				text-align center
				line-height 1.0625rem
		#m2
			position fixed
			top 0
			left 0
			width 100%
			height 1.0625rem
			background #00bcd4
			z-index 1000
			p
				font-size 0.5rem
				color #969896
				text-align center
				line-height 1.0625rem
		a.m0
			width 100%
			height 175px
			background #CACACA
			overflow hidden
			.banner
				display block
				width 100%
				height 100%
		.listul
			display flex
			flex-wrap   wrap
			margin-top 3px
			margin-bottom 3px
		.listli
			width 25%
			justify-content center
			overflow hidden
			img
				width 35px
				height  35px
				border-radius  50%
				padding 5px 0
			p
				font-size  14px
				padding-bottom  10px
				overflow hidden
				white-space nowrap
				text-overflow ellipsis
		.recommend-title
			width 100%
			height 0.9375rem
			background-color rgb(238,238,238)
			p
				font-size 0.3975rem
				text-indent .2rem
				text-align left
				line-height 0.9375rem
		ul
			margin-bottom 60px
		.item
			overflow hidden
			display flex
			height 2.3rem
			border-bottom 0.0625rem solid #eee
			.item-img
				width 1.9rem
				height 1.9rem
				padding .1rem
			.item-info
				flex 1
				padding .1rem
				min-width 0
				.item-title
					line-height .54rem
					font-size .32rem
					overflow hidden
					white-space nowrap
					text-overflow ellipsis
					text-align left
				.item-desc
					line-height .65rem
					font-size 0.4375rem
					color #ccc
					text-align left
					overflow hidden
					white-space nowrap
					text-overflow ellipsis
				.item-button
					line-height .44rem
					margin-top .16rem
					background #ff9300
					padding 0 .2rem
					border-radius .06rem
					color #fff
					float left
		.but
			position fixed
			top 1.25rem
			left 1.25rem
</style>
