<!--  -->
<template>
<div class=''>
    <header-top :showUser ="true" >
        <router-link slot="search" :goBack="true" to="/search" class="search">
            <svg t="1575525283338" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2980" width="24" height="24"><path d="M921.3 874L738.1 690.8c51.3-62.6 82.1-142.5 82.1-229.6 0-200.1-162.8-363-363-363-200.1 0-363 162.8-363 363s162.8 363 363 363c87 0 167-30.8 229.6-82.1L870 925.3c7.1 7.1 16.4 10.6 25.7 10.6s18.6-3.5 25.7-10.6c14.1-14.2 14.1-37.2-0.1-51.3zM166.8 461.2c0-160.1 130.3-290.4 290.4-290.4s290.4 130.3 290.4 290.4-130.3 290.4-290.4 290.4-290.4-130.3-290.4-290.4z" p-id="2981" fill="#ffffff"></path></svg>
        </router-link>
        <router-link slot="city" class="textEllips" to="/home">
            {{this.cityAll.address}}
        </router-link>
    </header-top>
     <footer-guide></footer-guide>
</div>
</template>

<script>
import  header from "components/header/header"
import  footerGuide from "components/footer/footerGuide"
import {getCityAll,getIndexEntry} from "service/getData"
import log from '../../../node_modules_/loglevel';
import "../../plugins/swiper.min.js";
import "../../style/swiper.min.css"
import {mapState} from "vuex";
export default {
components: {},
data() {
return {
    cityAll:{},
    indexEntries:[]
};
},
computed: {
    ...mapState(['geohash','longitude','latitude'])
},
watch: {},
methods: {
    getCityAll(){
        getCityAll(this.$route.query.geohash).then((res)=>{
           this.cityAll = res;
        })
    },
    getIndexEntry(){
        getIndexEntry(this.geohash).then((res)=>{
            this.indexEntries = res;
        })
    }
},
created() {
    this.getCityAll();
    this.getIndexEntry();
},
mounted() {

},
components:{
    headerTop:header,
    footerGuide
}
}
</script>
<style lang='scss' scoped>
@import "style/scss.scss";
// @import "style/swiper.scss";
.search{
     @include atcenter;
      left:0.5rem;
}
.textEllips{
    width:5rem;
    @include acenter;
    color:#fff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
}
</style>