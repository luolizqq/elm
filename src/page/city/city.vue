<!--  -->
<template>
<div class=''>
    <header-top :go-back='true' :head-title='this.currentCityDetail.name'></header-top>
    <div class="form">
        <input type="text" v-model="address" placeholder="输入学校、商务楼、地址">
        <input type="submit" value="提交" @click="searchCity">
    </div>
    <div v-if='showHistory'>搜索历史</div>
    <div class="result" >
        <div @click="nextPage(item,index)" v-for="(item,index) in placeList"  :key="item.address">
                <div>{{item.name}}</div>
                <div>{{item.address}}</div>
            </div>
            
    </div>
    <div v-if="placeNone">对不起，搜索历史为空</div>
    <div @click="clearAll" v-if='showHistory && placeList.length>0'>清空所有</div> 

    <!-- <div class="history" v-if='showHistory'>
        
            <router-link  v-for="item in historyList" :to="'/msite?geohash='+item.geohash" :key="item.address">
                <div>{{item.name}}</div>
                <div>{{item.address}}</div>
            </router-link>
            <div @click="clearAll">清空所有</div> 
    </div> -->
</div>
</template>

<script>
import  header from "components/header/header";
import {getCityDetail,searchCity} from "service/getData";
import {getStore,setStore,removeStore} from "utils/index";
export default {
data() {
return {
    address:"",
    currentCityDetail:{},
    placeList :[],
    historyList:[],
    placeNone:false, //
    showHistory:true
};
},
computed: {},
watch: {},
methods: {
    cityDetail(){
        getCityDetail(this.$route.params.id).then((res)=>{
            this.currentCityDetail = res;
        })
    },
    searchCity(){
        searchCity(this.currentCityDetail.id,this.address).then((res) =>{
            this.showHistory = false;
            this.placeList =res ||[];
            if(res && res.length==0){
                this.placeNone = true;
            }
        })
    },
    clearAll(){
        setStore("historyList",[]);
        this.placeList =[];
    },
    getHistoryList(){
        let history = getStore("historyList");
        history ? history = JSON.parse(history) :[];
        
        this.placeList = history;
    },
    nextPage(item){
        this.$router.push('/msite?geohash='+item.geohash);
        let checkRepeat =false;
        let history = getStore("historyList");
        if(history){
            history =JSON.parse(history);
            checkRepeat = history.some((i)=>i.geohash ===item.geohash);
            checkRepeat ? null:history.push(item);
            this.$store.commit("SAVE_CITYINFO",item)
            setStore("historyList",history);
        }else{
            setStore("historyList",[item]);
        }
    }
},
created() {
    this.getHistoryList();
},
mounted() {
    this.cityDetail();
},
components:{
    headerTop:header
},
}
</script>
<style lang='less' scoped>

</style>