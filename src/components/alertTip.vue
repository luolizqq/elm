<!--  -->
<template>
<div class='content'>
    <div>{{tips}}</div>
    <div class="confirm" @click="closeTip">确认</div>
</div>
</template>

<script>

export default {
components: {},
data() {
return {

};
},
computed: {},
watch: {},
methods: {
    closeTip(){
        console.log("执行")
        this.$emit("closeTip")
    }
},
props:["tips"],
created() {

},
mounted() {

},
}
</script>
<style lang='less' scoped>
@keyframes show{
    0%{
        transform: scale(1)
    }
    35%{
        transform: scale(0.8)
    }
    65%{
        transform: scale(1.1)
    }
    100%{
        transform: scale(1)
    }
}
    .content{
        width:12rem;
        height:8rem;
        background:#fff;
        position: fixed;
       top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        animation: show 0.4s ;
        .confirm{
            height:2rem;
            background:#4cd964;
            color:#fff;
            text-align: center;
            line-height:2rem;
            position: absolute;
            bottom:0;
            width:100%;
        }
    }
</style>