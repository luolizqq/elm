<!--  -->
<template>
<div class='wrapper'>
    <ul class="clearfix">
        <li @click="gotoPage({path:'msite',query:{geohash}})">
            <div>
                <svg class="icon" aria-hidden="true">
                    <use :xlink:href="$route.path.indexOf('msite')>0 ? '#icon-waimai-copy':'#icon-waimai'"></use>
                </svg>
            </div>
            <div>外卖</div>
        </li>
        <li @click ="gotoPage({path:`/search${geohash}`})">
            <div><svg class="icon" aria-hidden="true">
                    <use :xlink:href="$route.path.indexOf('search')>0 ? '#icon-sousuo-copy':'#icon-sousuo'"></use>
                </svg></div>
            <div>搜索</div>
        </li>
        <li @click ="gotoPage({path:'/order'})">
            <div><svg class="icon" aria-hidden="true">
                    <use :xlink:href="$route.path.indexOf('order')>0 ? '#icon-dingdan-copy':'#icon-dingdan'"></use>
                </svg></div>
            <div>订单</div>
        </li>
        <li @click ="gotoPage({path:'/profile'})">
            <div><svg class="icon" aria-hidden="true">
                    <use :xlink:href="$route.path.indexOf('profile')>0 ? '#icon-weibiaoti--copy':'#icon-weibiaoti-'"></use>
                </svg></div>
            <div>我的</div>
        </li>
        
    </ul>
</div>
</template>

<script>
import "assets/iconfont.js";
import {mapState} from "vuex";
export default { 
components: {},
data() {
return {

};
},
computed: {
    ...mapState(['geohash','longitude','latitude'])
},
watch: {},
methods: {
    gotoPage(param){
        this.$router.push(param)
    }
},
created() {

},
mounted() {

},
}
</script>
<style lang='scss' scoped>
@import "style/scss.scss";
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
    .wrapper{
        height:2rem;
        background:#fff;
        border-top:1px solid #ccc;
        position: absolute;
        bottom:0;
        width:100%;
        ul{
            height:100%;
            li{
                height:100%;
                list-style: none;
                float: left;
                width:25%;
                div{
                    height:50%;
                    font-size:0.8rem;
                }
            };
        }
    }
</style>