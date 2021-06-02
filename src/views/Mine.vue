<template>
    <div>
		<div ref="imageWrapper">
			<div class="mmxc">
				<img class="headerimg" src="http://img1.qunarzz.com/sight/p0/201301/11/c54024f15c27105d93835fbb.jpg_640x276_3a9a2463.jpg" alt="">
			</div>
			<div id="mone">
				<p>{{this.$store.state.sname}}</p>
			</div>
			<div id="mtwo">
				<p @click="mclick">{{input}}</p>
				<img src="../assets/0.png" alt="修改" />
			</div>
		</div>
		<adolt @Helloa="wq"></adolt>
		<ul>
            <li v-for="item in minearry" class="mineitem" @click="itemclick(item)" :key="item.label">
                <span class="minetitle">{{item.label}}</span>
                <i class="cubeic-arrow"></i>
            </li>
        </ul>
		<div class="mineitem">
			<span class="minetitle">暗黑模式</span>
			<cube-switch v-model="swich" class="abc" @input="inputHandle">
			</cube-switch>
		</div>
		<div id="mthreel" v-show="mxc"></div>
		<transition>
			<div id="mthree" v-show="mxc">
				<p>{{this.$store.state.sname}},编辑你的新签名吧！</p>
				<input type="text" id="input" v-model="iinput" required pattern="[\u4e00-\u9fa5,\s_a-zA-Z0-9]{1,20}" />
				<input class="al" type="button" value="确定" @click="moclick" />
				<input class="al" type="button" value="取消" @click="mtclick" />
			</div>
		</transition>
		<div id="mthreel0" v-show="mb" @click="disagree"></div>
		<img class="app" :src="md" v-if="mb" />
    </div>
</template>

<script>
import Adolt from './components/adolts.vue'
import html2canvas from 'html2canvas'
export default {
    data(){
        return{
			md:'',
			mb:false,
			swich:false,
            minearry:[
                {label:'我的日志'},
                {label:'我的足迹'},
                {label:'店铺收藏'},
                {label:'我的花销'},
				{label:'疫情地图',type:'echart'},
                {label:'退出',type:'exit'},
            ],
			input:'求知若渴，虚心若愚',
			iinput:'',
			mxc:false
        }
    },
	components:{
		Adolt
	},
	mounted() {
		let arr2=localStorage.getItem('qma')
		for(let i in arr2){
			if(this.$store.state.sname===arr2[i].name){
				this.input=arr2[i].qm
			}
		}
		let input=localStorage.getItem('input')
		this.swich=eval(input)
	},
    methods:{
        itemclick(item){
            if(item.type=='exit'){
                this.$store.commit('settoken','')
                localStorage.removeItem('token')
                this.$router.push({path:'/login'})
            }else if(item.type=='echart'){
				this.$router.push({path:'/ec'})
			}else{
				alert('sorry! 功能暂未开放！')
			}
        },
		mclick(){
			this.mxc=true
		},
		moclick(){
			var u=document.querySelector("#input")
			if(u.validity.valueMissing===true){
				u.setCustomValidity("签名不能为空！")
			}else if(u.validity.patternMismatch===true){
				u.setCustomValidity("昵称必须是1-20位数字、汉字、英文字符或_以及空格")
			}else{
				this.input=this.iinput
				let arr=[]
				arr.push({name:this.$store.state.sname,qm:this.iinput})
				for(let i=arr.length-1;i>=0;i--){
					if(arr[i].name===arr[i-1].name){
						arr.splice(i-1,1)
						i--
					}
				}
				localStorage.setItem('qma',arr)
				this.mxc=false
			}
		},
		mtclick(){
			this.mxc=false
		},
		inputHandle(input){
			localStorage.setItem('input',input)
		},
		disagree(){
			this.mb=false
		},
		wq(){
			let _this=this;
			html2canvas(this.$refs.imageWrapper,{backgroundColor:'#fff',useCORS:true,async:true}).then(canvas=>{
				let dataURL=canvas.toDataURL("image/png");
				_this.mb=true;
				_this.md=dataURL;
			}).catch(()=>{
				_this.$api.msg("生成失败")
			})
		}
    }
}
</script>

<style lang="stylus" scoped>
    .mineitem
        font-size  14px
        text-align left 
        height  50px
        line-height 50px
        padding-left 5%
        border-bottom 1px solid #eee
        .minetitle
            display inline-block
            width 90%
		.abc
			float right
			margin-top -37px
			margin-right 9px
	.mmxc
		height  150px
		width  100%
		background-color #CACACA
		.headerimg
			width 100%
			height 100%
	#mone
		position fixed
		top 1.625rem
		left 0.525rem
		width 1.25rem
		height 1.25rem
		border-radius 50%
		background-color white
		z-index 2
		overflow hidden
		white-space nowrap
		text-overflow ellipsis
		p
			font-size 0.36rem
			line-height 1.25rem
			color #555555
	#mtwo
		position fixed
		top 2.265rem
		left 1.875rem
		max-width 73%
		height 0.435rem
		border-bottom 0.00625rem solid #7F7F7F
		overflow hidden
		white-space nowrap
		text-overflow ellipsis
		z-index 2
		cursor pointer
		p
			color white
			line-height 0.435rem
			font-size 0.35rem
			float left
		img
			float left
			margin-left 0.1875rem
			width 0.605rem
			height 0.525rem
	#mthreel
		position fixed
		top 0
		left 0
		width 100%
		height 100vh
		background-color rgba(0,0,0,.3)
		z-index 999
	#mthree
		position fixed
		top 0
		right 0
		bottom 0
		left 0
		margin auto
		width 310px
		height 170px
		background-color white
		border-radius 5px
		z-index 9999
		p
			font-size 0.47rem
			margin-top 0.375rem
		input
			width 90%
			height .82rem
			margin-top 0.375rem
			padding 0 .1rem
			line-height .82rem
			font-size 0.375rem
			color #666
			border-bottom 0.00625rem solid #000000
		.al
			float left
			margin-top 0.4375rem
			margin-left 23.5%
			width 13%
			font-size 0.45rem
			background-color white
			border 0.00625rem solid #888888
	.v-enter,.v-leave-to
		-webkit-transform  translate(0,-250%)
		transform  translate(0,-250%)
	.v-enter-active,.v-leave-active
		transition transform .4s
	#mthreel0
		position fixed
		top 0
		left 0
		width 100%
		height 100vh
		background-color rgba(0,0,0,.3)
		z-index 999
	.app
		position fixed
		top 0
		right 0
		bottom 0
		left 0
		margin auto
		width 100%
		z-index 1003
</style>