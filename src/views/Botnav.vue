<template>
    <div>
        <transition :name="transitionName" mode="out-in">
            <router-view class="Router"></router-view>
        </transition>
        <cube-tab-bar
            v-model="selectedLabelDefault"
            :data="tabs"
            @click="clickHandler"
            @change="changeHandler"
            class="botnav">
        </cube-tab-bar>
		<span class="countsum">{{countsum}}</span>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      transitionName:'slide-right',
      selectedLabelDefault: '首页',
      tabs: [{
        label: '首页',
        icon: 'cubeic-home'
      }, {
        label: '购物',
        icon: 'cubeic-tag'
      }, {
        label: '搜索',
        icon: 'cubeic-search'
      }, {
        label: '购物车',
        icon: 'cubeic-mall'
      }, {
        label: '我的',
        icon: 'cubeic-person'
      }]
    }
  },
  computed:{
	...mapGetters({
	  countsum:'countsum'
	})
},
  methods: {
    clickHandler (label) {
      // if you clicked home tab, then print 'Home'
      console.log(label)
    },
    //点击与自身不同的其他导航
    changeHandler (label) {
      // if you clicked different tab, this methods can be emitted
      switch(label){
          case '首页':
			this.$router.push('/botnav/index');
			break;
          case '购物':
			this.$router.push({path:'/botnav/list'});
			break;
          case '搜索':
			this.$router.push({path:'/botnav/search'});
			break;
          case '购物车':
			this.$router.push({path:'/botnav/cart'});
			break;
          case '我的':
			this.$router.push({path:'/botnav/mine'});
			break;
      }
    },
	speak(sentence, volume=0.6) {
	    const utterance = new SpeechSynthesisUtterance(sentence)
		
		utterance.volume = volume
	
	    window.speechSynthesis.speak(utterance)
	}
  },
  created(){
    switch(this.$route.path){
		case '/botnav/index':
			this.selectedLabelDefault='首页';
			break;
		case '/botnav/list':
			this.selectedLabelDefault='购物';
			break;
		case '/botnav/search':
			this.selectedLabelDefault='搜索';
			break;
		case '/botnav/cart':
			this.selectedLabelDefault='购物车';
			break;
		case '/botnav/mine':
			this.selectedLabelDefault='我的';
			break;
		}
	},
	mounted(){
		this.speak('欢迎回到由云小梦打造的旅游购物天地，这里有景点简介、地区搜索、购物指南等一系列功能等你发掘，祝各位使用愉快')
	},
	
	watch:{
		$route(to,from){   //导航发生变化，$route也就是会改变
			if(to.meta.index > from.meta.index){
				this.transitionName='slide-left'
			}else{
				this.transitionName='slide-right'
			}
			switch(to.path){
				case '/botnav/index':
					this.selectedLabelDefault='首页';
					break;
				case '/botnav/list':
					this.selectedLabelDefault='购物';
					break;
				case '/botnav/search':
					this.selectedLabelDefault='搜索';
					break;
				case '/botnav/cart':
					this.selectedLabelDefault='购物车';
					break;
				case '/botnav/mine':
					this.selectedLabelDefault='我的';
					break;
			}
		}
	}
}
</script>

<style lang="stylus">
    .cube-tab-bar.botnav
        position  fixed
        bottom  0
        left 0
        z-index 1000
        width 100%
        background #fff
        .cube-tab div
            font-size  16px
            padding-top  3px
        i 
            font-size 20px
    .Router
        position absolute
        width  100%
        transition all .45s ease
    .silde-left-enter,.slide-right-leave-active
        opacity 0
        -webkit-transform  translate(100%,0)
        transform  translate(100%,0)
    .slide-right-enter,.slide-left-leave-active
        opacity 0
        -webkit-transform  translate(-100%,0)
        transform  translate(-100%,0)
	.countsum
	    position  fixed
	    bottom 33px
	    right 23%
	    z-index  1001
	    width 18px
	    height 18px
	    line-height 18px
	    border-radius 50%
	    font-size 14px
	    background red
	    color #fff
</style>
