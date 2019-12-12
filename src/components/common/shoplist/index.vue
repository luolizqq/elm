<!--  -->
<template>
    <div class='wrapper'>
        <ul>
            <router-link class="shopItem" to="/imgBaseUrl"  v-for="item in shoplist" :key="item.id">
                <div class="itemImg">
                    <img  :src="imgBaseUrl + item.image_path" alt="">
                </div>
                <div class='shop_right'>
                    <header :class="item.is_premium ? 'premium':''">
                        {{item.name}}
                    </header>
                    <rating-star :rating="4"></rating-star>
                </div>
            </router-link>
        </ul>
        <transition name="loading">
            <loading v-if="loading"></loading>
        </transition>
        
    </div>
</template>
<script>
import { getCityAll, getIndexEntry,getShops ,getCity} from "service/getData";
import { mapState } from "vuex";
import ratingStar from "components/ratingStar/";
import loading from "components/common/loading/loading";
export default {
components: {},
data() {
return {
shoplist:[],
imgBaseUrl: "http://elm.cangdu.org/img/",
loading:true
};
},
computed: {
    ...mapState(["geohash", "longitude", "latitude"])
},
watch: {},
props:[
    "deliveryMode",
    "sortByType",
    "categoryIds"
],
methods: {
    getShops(){
        this.loading=true;
        getShops(this.latitude,this.longitude).then((res)=>{
            this.shoplist = res;
            this.loading=false;
        },(err=>{
            console.log(err);
            this.loading= false;
        }))
    }
},
created() {
this.getShops();
},
mounted() {

},
components:{
    ratingStar,
    loading
},
watch:{
 sortByType(){
     this.getShops();
 },
 categoryIds(){
     this.getShops();
 },
 deliveryMode:{
     handler:function(){
     this.getShops();},
    deep:true
 }  
}}
</script>
<style lang='scss' scoped>
    .loading-enter-active,.loading-leave-active{
        transition:all 0.3s ease;
    }
    .loading-enter,.laoding-leave-to{
        opacity: 0;
    }
    .wrapper{
        height:5.5rem;
        padding:0.7rem 0.4rem;
        .shopItem{
            height:5rem;
            width:100%;
            display: block;
            padding:0.5rem 0.5rem;
            border-bottom:1px solid #ccc;
            .itemImg{
                width: 2.7rem;
                height: 2.7rem;
                float:left;
                overflow: hidden;
                img{
                    width:100%;
                    height:100%;

                }
            }
            .shop_right{
                width:calc(100% - 3rem);
                float:left;
                color:#000;
                .premium:before{
                content:"品牌";
                background:orange;
            }
            }
            
        }

    }
</style>