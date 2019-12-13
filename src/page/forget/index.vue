<!--  -->
<template>
<div class=''>
    <headerTop headTitle="重置密码" :goBack="true" ></headerTop> 
    <div class="content">
    <form >
        <section>
            <input type="text" placeholder="账号" v-model="accountNumber">
            <button v-if="!send" :style="{background:accountNumber ? '#4cd964':'#ddd'}" @click.prevent="getCode">获取验证码</button>
            <button v-else :style="{background:'#ddd'}" @click.prevent>已发送({{secondLeft}}s)</button>
        </section>
        <section>
            <input type="text" placeholder="旧密码" v-model="oldPassword">
        </section>
        <section>
            <input type="text" placeholder="新密码" v-model="newPassword">
        </section>
        <section>
            <input type="text" placeholder="确认密码" v-model="confirmPassword">
        </section>
        <section>
            
            <input type="text" placeholder="验证码" v-model="vertifiCode">
            <img :src="codeImg" alt="">
            <div>
                看不清<br/>
                <a href="" @click.prevent="getVerticode">换一张</a>
            </div>
        </section>
    </form>
    <button @click="confirmChange">确认修改</button>
    <alert-tip v-if="alertShow" :tips="tips" @closeTip="closeTip"></alert-tip>
    </div>
</div>
</template>

<script>
import headerTop from "components/header/header";
import alertTip from "components/alertTip";
import {getcaptchas,changePassword} from "service/getData";
export default {
components: {headerTop,alertTip},
data() {
return {
accountNumber:"",
oldPassword:"",
newPassword:"",
confirmPassword:"",
vertifiCode:"",
alertShow:false,
tips:"",
codeImg:"",
//是否发送获取验证码的短信
send:false,
//还剩多少秒
secondLeft:30,
timer:null
};
},
computed: {},
watch: {},
methods: {
    getCode(){
        if(this.accountNumber){
            this.send=true;
            this.timer=setInterval(()=>{
                this.secondLeft--;
                if(this.secondLeft ===0){
                    clearInterval(this.timer);
                    this.send=false;
                }
            },1000)
        }
    },
  async  confirmChange(){
        if(!this.accountNumber){
            this.alertShow = true;
            this.tips = "请输入验证码码！"
            return 
        }
        if(!this.oldPassword){
            this.alertShow = true;
            this.tips = "请输入旧密码！"
            return 
        }
        if(!this.newPassword){
            this.alertShow = true;
            this.tips = "请输入新密码！"
            return 
        }
        if(!this.confirmPassword){
            this.alertShow = true;
            this.tips = "请输入确认密码！"
            return 
        }
        if(this.confirmPassword !== this.newPassword){
            this.alertShow = true;
            this.tips = "密码输入不一致！"
            return 
        }
        if(!this.vertifiCode){
            this.alertShow = true;
            this.tips = "请输入验证码！"
            return 
        }
        const res =await changePassword(this.accountNumber,this.oldPassword,this.newPassword,this.confirmPassword,this.vertifiCode);
        if(res.message){
            this.getVerticode();
            this.alertShow=true;
            this.tips = res.message;
        }else{
             this.alertShow=true;
            this.tips = "密码修改成功";
        }
    },
    closeTip(){
        this.alertShow=false;
    },
    getVerticode(){
        getcaptchas().then(res=>{
            this.codeImg = res.code;
        })
    }
},
created() {
    this.getVerticode();
},
mounted() {

},
}
</script>
<style lang='less' scoped>
.content{
    position: absolute;
    top:2rem;
    .getCode{
        background:#ddd;
    }
}
</style>