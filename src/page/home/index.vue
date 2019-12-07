<!--  -->
<template>
<div class=''>
<header-top :showUser ="true" >
    <div slot="logo" @click="reload" class="logo">ele.me</div>
</header-top>
    <div>
        <div class="locate_city">
            <div><span>当前定位城市：</span><span>定位不准时,请在城市列表中选择</span></div>
            <router-link :to="'/city/'+locateCity.id">
                <span>{{locateCity.name}}</span>
                <svg t="1575427920342" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2188" width="16" height="16"><path d="M720.2816 490.752L347.1872 117.76a30.72 30.72 0 1 0-43.4688 43.4688l351.6416 351.232-351.6416 351.3856a30.72 30.72 0 1 0 43.4688 43.4176l373.0944-373.0944a30.72 30.72 0 0 0 0-43.4176z" fill="#666666" p-id="2189"></path></svg>
            </router-link>

        </div>
        <div class="hot_city">
            <div class="title">热门城市</div>
            <ul>
                <li v-for='(item) in hotCities' :key="item.pingyin">{{item.name}}</li>
            </ul>
        </div>
        <div class="group_city">
            <ul>
                <li v-for='(item,index) in groupSortCities' :key="index">
                    {{index}}
                    <router-link v-for="city in item" :key="city.longitude" :to="'/city/'+city.id">{{city.name}}</router-link>
                </li>
            </ul>
        </div>
    </div>
    </div>
</template>

<script>
import  header from "components/header/header"
import {getCity} from "service/getData"
export default {
components: {},
data() {
return {
    locateCity:{},
    hotCities:[],
    groupCities:[]
};
},
computed: {
    groupSortCities(){
        let obj={};
        const groupCities = this.groupCities;
        let capital;
        for(var i=65;i<=90;i++){
              //将获取的数据按照A-Z字母开头排序
            capital = String.fromCharCode(i)
            if(!groupCities[capital]) continue;
            obj[capital]=groupCities[capital]
        };
        return obj;
    }
},
watch: {},
methods: {
    reload(){
        window.location.reload();
    },
 guessCity(){
       getCity('guess').then((res)=>{
          this.locateCity = res
       })
 },
 hotCity(){
        getCity("hot").then((res) =>{
            this.hotCities=res;
        })
 },
 groupCity(){
        getCity("group").then((res) =>{
            this.groupCities = res
        })
 }
},
created() {

},
mounted() {
    this.guessCity();
    this.hotCity();
    this.groupCity();
},
components:{
    headerTop:header
}
}
</script>
<style lang='scss' scoped>
@import "style/scss.scss";
    .logo{
        position: absolute;
        left:0.5rem;
        color:#fff;
    }
</style>



