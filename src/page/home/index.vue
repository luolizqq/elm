<!--  -->
<template>
<div :style="{overflow:'hidden'}">
<header-top :showUser ="true" >
    <div slot="logo" @click="reload" class="logo">ele.me</div>
</header-top>
    <div :style="{marginTop:'2rem'}">
        <div class="locate_city">
            <div class='locate'>
                <span>当前定位城市：</span>
                <span>定1111位不准时,请在城市列表中选择</span>
            </div>
            <router-link class='current_city' :to="'/city/'+locateCity.id">
                <span>{{locateCity.name}}</span>
                <svg t="1575427920342" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2188" width="16" height="16"><path d="M720.2816 490.752L347.1872 117.76a30.72 30.72 0 1 0-43.4688 43.4688l351.6416 351.232-351.6416 351.3856a30.72 30.72 0 1 0 43.4688 43.4176l373.0944-373.0944a30.72 30.72 0 0 0 0-43.4176z" fill="#666666" p-id="2189"></path></svg>
            </router-link>
        </div>
        <div :class="['hot_city','city']">
            <div class="title" >热1111门城市</div>
            <ul class="city_list" >
                <li v-for='(item) in hotCities' :key="item.pingyin">{{item.name}}</li>
            </ul>
        </div>
        <div>
            <ul>
                <li :class="['group_city','city']" v-for='(item,index) in groupSortCities' :key="index">
                    <div class="title" >{{index}}</div>
                    <ul>
                        <li :style="{color:'#666'}" class='ellips' v-for="city in item" :key="city.longitude" :to="'/city/'+city.id">{{city.name}}</li>
                    </ul>
                    
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
        height:0.7rem;
        line-height:0.7rem;
        top:50%;
        transform:translateY(-50%);
        color:#fff;
    }
    .locate_city{
        padding-top:0.4rem;
        margin-bottom:0.4rem;
        .locate{
            // height:1.5rem;
            // border-bottom:1px solid #ccc;
            // margin-top:0.4rem;
            // padding:0 0.45rem;
            // span{
            //     line-height:1.5rem;
            // }
            // span:first-child{
            //     font-size:0.55rem;
            //     float: left;
            // }
            // span:last-child{
            //     font-size:0.475rem;
            //     color:#9f9f9f;
            //     float:right;
            // }
            display: flex;
            border-bottom:1px solid #ccc;
            padding:0 0.45rem;
            line-height:1.5rem;
            justify-content: space-between;
            span:nth-child(1){
                font-size:0.55rem;
                float: left;
            }
            span:nth-child(2){
                font-size:0.475rem;
                color:#9f9f9f;
            }
        }
        .current_city{

            // height:1.75rem;
            // display:block;
            // padding:0 0.45rem;
            // border-bottom:1px solid #ccc;
            // span{
            //     line-height:1.75rem;
            //     font-size:0.8rem;
            //     float: left;
            //     color:#3190e8;
            // }
            // .icon{
            //     width:0.8rem;
            //     height:1.75rem;
            //     color:#9f9f9f;
            //     float:right;
            // }
            display:flex;
            justify-content: space-between;
            height:1.8rem;
            align-items: center;
            padding:0 0.45rem;
            border-bottom:2px solid #ccc;
            span{
                font-size:0.8rem;
                color:#3190e8;
                text-decoration: none;
            }
            .icon{
                width:0.8rem;
                height:1.75rem;
                color:#9f9f9f;
            }
        }
    }
    .city{
        border-top:2px solid #e4e4e4;
        margin-bottom:0.4rem;
        .title{
            height:1.5rem;
            font:0.55rem/1.45rem "Helvetica Neue";
            text-align:left;
            padding:0 0.45rem;
            border-bottom:1px solid #e4e4e4;
        }
        ul{
            display: flex;
            flex-wrap: wrap;
            li{
                width:25%;
                font:0.7rem/1.75rem "Microsoft YaHei";
                border-bottom:0.025rem solid #e4e4e4;
                border-right:0.025rem solid #e4e4e4;
                box-sizing:border-box;
                color:#3190e8;
            }
            li:nth-child(4n){
                border-right:none;
            }
        }
    }
</style>



