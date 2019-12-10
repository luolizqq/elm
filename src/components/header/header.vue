<!--  -->
<template>
<div class='wrapper'>
    <slot name="logo"></slot>
    <slot name="search"></slot>
    <span class="goBack" v-if="goBack" @click="$router.go(-1)">
       <svg t="1575511783894" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1378" width="24" height="24"><path d="M714.83 962c-12.535 0-25.07-4.749-34.689-14.247L274.478 547.142c-9.389-9.281-14.681-21.913-14.681-35.124s5.292-25.843 14.681-35.124L680.141 76.258c19.395-19.166 50.662-18.997 69.814 0.434 19.164 19.406 18.973 50.649-0.434 69.814L379.429 512.018l370.092 365.487c19.406 19.165 19.598 50.408 0.434 69.814C740.301 957.106 727.572 962 714.83 962z" p-id="1379" fill="#ffffff"></path></svg>
    </span>
    <div class="headTitle" v-if='headTitle'>
        {{headTitle}}
    </div>
    <router-link v-if="showUser" class="user_icon"  :to ="userInfo ? '/profile':'/login'">
        <div v-if="userInfo">
            <svg t="1575523475591" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2056" width="24" height="24"><path d="M513.203447 0c-184.075049 0-333.281914 149.206864-333.281914 333.260614s149.206864 333.260614 333.281914 333.260614c184.075049 0 333.260614-149.206864 333.260614-333.260614S697.257196 0 513.203447 0zM513.203447 613.782298c-154.936578 0-280.542985-125.585107-280.542985-280.521685s125.606407-280.521685 280.542985-280.521685c154.915278 0 280.542985 125.585107 280.542985 280.521685S668.118725 613.782298 513.203447 613.782298z" p-id="2057" fill="#ffffff"></path><path d="M386.979339 585.027228l-101.111347-8.03012C181.007836 653.847696 101.984643 788.464025 101.984643 931.579074 101.984643 963.316152 105.456552 1002.678648 111.825267 1023.9787l54.144732 0c-7.327218-21.300052-11.225127-60.534748-11.225127-92.399626C154.744872 772.872387 251.340608 637.467956 386.979339 585.027228z" p-id="2058" fill="#ffffff"></path><path d="M740.496302 576.997109l-103.475653 8.03012c135.638731 52.462028 232.234467 187.845159 232.234467 346.573146 0 31.864878-3.89791 71.099574-11.203827 92.399626l54.123432 0c6.368716-21.300052 9.840624-60.662548 9.840624-92.399626C921.994045 788.464025 845.313858 653.847696 740.496302 576.997109z" p-id="2059" fill="#ffffff"></path></svg>
        </div>
        <div v-else>登录/注册</div>
    </router-link>
    <slot name="city"></slot>
    <slot name="changeCity"></slot>
    <slot name="edit"></slot>
    <slot name="changeLogin"></slot>
</div>
</template>

<script>
import {mapActions,mapState} from "vuex";

export default {
components: {},
data() {
return {

};
},

watch: {},
methods: {
    ...mapActions(['queryUserInfo'])
},
computed: {
    ...mapState(['userInfo'])
},
created() {

},
mounted() {

},
props:['goBack','headTitle','showUser']
}
</script>
<style lang='scss' scoped>
@import 'style/scss.scss';

    .wrapper{
        height:2rem;
        background:#3190e8;
        position: relative;
        z-index: 100;
        .goBack{
            @include atcenter;
            left:0.5rem;
        }
        .headTitle{
            height:2rem;
           line-height: 2rem;
           
            color:#fff;
           text-align: center;
        }
        .user_icon{
            @include atcenter;
            right:0.5rem;
            color:#fff;
        }
    }
</style>