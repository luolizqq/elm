<!--  -->
<template>
<div class='load_container'>
    <div class="load_img" :style='{backgroundPositionY: -positionY%7 * 2.5 +"rem"}'></div>
</div>
</template>

<script>

export default {
components: {},
data() {
return {
    positionY:0,
    timer:null
};
},
computed: {},
watch: {},
methods: {

},
created() {

},
mounted() {
    this.timer = setInterval(()=>{
        this.positionY ++;
    },600)
},
beforeDestroy(){
    clearInterval(this.timer)
}
} 
</script>
<style lang='less' scoped>
@keyframes load {
    0%{
        transform: translateY(0px);
    }
    50%{
        transform:translateY(-50px)
    }
    100%{
        transform:translateY(0px)
    }
}
    .load_container{
        width:2.5rem;
        height:2.5rem;
        position: fixed;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        .load_img{
            width:100%;
            height:100%;
            background:url("../../../images/icon_loading.png") no-repeat 0 0;
            background-size: 2.5rem auto;
            transform: translateY(0px);
            animation:load 0.3s  ease infinite ;
            position: relative;
    	    z-index: 11;
        }
    }
</style>