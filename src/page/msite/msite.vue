<!--  -->
<template>
  <div class>
    <header-top :showUser="true">
      <router-link slot="search" :goBack="true" to="/search" class="search">
        <svg
          t="1575525283338"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2980"
          width="24"
          height="24"
        >
          <path
            d="M921.3 874L738.1 690.8c51.3-62.6 82.1-142.5 82.1-229.6 0-200.1-162.8-363-363-363-200.1 0-363 162.8-363 363s162.8 363 363 363c87 0 167-30.8 229.6-82.1L870 925.3c7.1 7.1 16.4 10.6 25.7 10.6s18.6-3.5 25.7-10.6c14.1-14.2 14.1-37.2-0.1-51.3zM166.8 461.2c0-160.1 130.3-290.4 290.4-290.4s290.4 130.3 290.4 290.4-130.3 290.4-290.4 290.4-290.4-130.3-290.4-290.4z"
            p-id="2981"
            fill="#ffffff"
          />
        </svg>
      </router-link>
      <router-link slot="city" class="textEllips" to="/home">{{this.cityAll.address}}</router-link>
    </header-top>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in indexEntries" :key="index">
          <router-link
            v-for="single in item"
            class="entry"
            :key="single.title"
            :to="{path:'/food',query:{geohash,title:single.title,restaurant_category_id:252}}"
          >
            <img :src="imgBaseUrl+single.image_url" alt />
            <div>{{single.title}}</div>
          </router-link>
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>
    <div class="food_list">
      <div>附近商家{{test.yuwen.ii}}</div>
      <button @click="test.yuwen.ii = '卡卡卡卡';score='888888888888888888888'">安安娜娜{{kk}}</button>
      <ul>
        <li is="shop-list" v-for="(item,index) in shoplist" :key="index">{{item.name}}</li>
      </ul>
    </div>
    <shop-list></shop-list>
    <footer-guide></footer-guide>
  </div>
</template>

<script>
import headerTop from "components/header/header";
import footerGuide from "components/footer/footerGuide";
import shopList from "components/common/shoplist";
import { getCityAll, getIndexEntry, getCity} from "service/getData";
import Swiper from "swiper";
import "../../style/swiper.min.css";
import { mapState,mapMutations } from "vuex";
export default {
  components: {},
  provide(){
    return {
      rank:this.test,
      score:this.kk
    }
  },
  data() {
    return {
      test:{
        yuwen:{ii:"我"}
      },
      kk:80,
      cityAll: {},
      geohash:"",
      indexEntries: [],
      shoplist:[],
      imgBaseUrl: "https://fuss10.elemecdn.com" //图片域名地址
    };
  },
  beforeRouteEnter(to,from,next){
    if(from.name==="City"){
      to.meta.isBack = true;
    }
    next();
  },
  async activated(){
    if(this.$route.meta.isBack){
     
      if(!this.$route.query.geohash){
      const cityInfo = await  getCity("guess");
      
      this.saveCityInfo(cityInfo)
      this.geohash= cityInfo.latitude+','+cityInfo.longitude;
    }else{
      this.geohash = this.$route.query.geohash;
    }
    getCityAll(this.geohash).then(res=>{
        this.cityAll = res;
        this.saveAddress(res);
    })

      this.renderSwiper();
    }
  },
  async beforeMount(){
    console.log("gggg",this.geohash)
   if(!this.$route.query.geohash){
      const cityInfo = await  getCity("guess");
      
      this.saveCityInfo(cityInfo)
      this.geohash= cityInfo.latitude+','+cityInfo.longitude;
    }else{
      this.geohash = this.$route.query.geohash;
    }
    
    getCityAll(this.geohash).then(res=>{
        this.cityAll = res;
        this.saveAddress(res);
    })
  },
  methods: {
    ...mapMutations({saveCityInfo:"SAVE_CITYINFO",saveAddress:"SAVE_ADDRESS"}),
    swiperInit() {
      var mySwiper = new Swiper(".swiper-container", {
        pagination: {
          el: ".swiper-pagination"
        }
      });
    },
    getCategoryId(link) {
      const content = decodeURIComponent(
        link.split("=")[1].replace("&target_name", "")
      );
    },
    renderSwiper(){
      console.log("222",this.geohash)
      getIndexEntry(this.geohash).then(res => {
        const groupNum = Math.ceil(res.length / 8);
        this.indexEntries=[];
        for (var i = 0; i < groupNum; i++) {
          const slideGroup = res.slice(i * 8, (i + 1) * 8);
          this.indexEntries.push(slideGroup);
        }
      }).then((res)=>{
        //凡是涉及到dom操作的应该写在mounted里面
        this.swiperInit();
      });
    }
  },
  // created() {
  //   getIndexEntry(this.geohash).then(res => {
  //       const groupNum = Math.ceil(res.length / 8);
  //       for (var i = 0; i < groupNum; i++) {
  //         const slideGroup = res.slice(i * 8, (i + 1) * 8);
  //         this.indexEntries.push(slideGroup);
  //         this.$nextTick(this.swiperInit);
  //       }
  //     });
  // },
  mounted() {
    this.renderSwiper();

    // this.swiperInit();
  },
  components: {
    headerTop,
    footerGuide,
    shopList
  }
};
</script>
<style lang='scss' scoped>
@import "style/scss.scss";
// @import "style/swiper.scss";
.swiper-container {
  width: 100%;
  height: 9rem;
  border-bottom: 1px solid #ccc;
  font-size: 0.55rem;
  .entry {
    display: inline-block;
    width: 25%;
    height: 4rem;
    img {
      width: 1.8rem;
      height: 1.8rem;
      margin-bottom: 0.5rem;
    }
  }
}
.search {
  @include atcenter;
  left: 0.5rem;
}
.textEllips {
  width: 5rem;
  @include acenter;
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>