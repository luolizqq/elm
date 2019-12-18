<!--  -->
<template>
<div :style="{overflow:'hidden'}">
    <header-top :go-back='true' :head-title='this.currentCityDetail.name'></header-top>
    <div class="city">
    <div class="form">
        <div class='city_form'>
            <input type="text" v-model="address" placeholder="输入学校、商务楼、地址">
        </div>
        <div class='city_form'>
            <input type="submit" value="提交" @click="searchCity">
        </div>
    </div>
    <div v-if='showHistory' class="title">搜索历史</div>
    <div class="result" >
        <div @click="nextPage(item,index)" v-for="(item,index) in placeList"  :key="item.address">
                <div>{{item.name}}</div>
                <div>{{item.address}}</div>
            </div>
            
    </div>
    <div v-if="placeNone">对不起，搜索历史为空</div>
    <div @click="clearAll" v-if='showHistory && placeList.length>0'>清空所有</div> 
</div>
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
            console.log("res",res)
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
        history ? history = JSON.parse(history) :history=[];
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
    console.log("执行");
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
.city{
margin-top:2rem;
.form{
    padding-top:0.4rem;
    .city_form{
        width:90%;
        margin:0 auto;
        
        input[type='text']{
        width:100%;
        height:1.4rem;
        border:1px solid #e4e4e4;
        border-radius:3px;
        padding:0 0.3rem;
        font:0.65rem/1.4rem "Microsoft YaHei";
        margin-bottom:0.4rem;
        box-sizing: border-box;
        &:focus{
            outline:none;
        }
    }
        input[type="submit"]{
            width:100%;
            height:1.4rem;
            font:0.65rem/1.4rem "Microsoft YaHei";
            color:#fff;
            // display: block;
            background:#3190e8;
            border-radius:5px;
        }
    }
    }
    .title{
       border-bottom: 1px solid #e4e4e4;
       border-top: 1px solid #e4e4e4;
       font:0.475rem/0.8rem "Microsoft YaHei";
        text-align: left;
        padding-left:0.5rem;
    }
}
</style>