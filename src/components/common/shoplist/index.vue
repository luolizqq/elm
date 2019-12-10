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
        
    </div>
</template>

<script>
import { getCityAll, getIndexEntry,getShops ,getCity} from "service/getData";
import { mapState } from "vuex";
import ratingStar from "components/ratingStar/";
export default {
components: {},
data() {
return {
shoplist:[],
imgBaseUrl: "http://elm.cangdu.org/img/"
};
},
computed: {
    ...mapState(["geohash", "longitude", "latitude"])
},

watch: {},
methods: {
    getShops(){
        getShops(this.latitude,this.longitude).then((res)=>{
            this.shoplist = res;
        })
    }
},
created() {
this.getShops();
},
mounted() {

},
components:{
    ratingStar
}
}
</script>
<style lang='scss' scoped>
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