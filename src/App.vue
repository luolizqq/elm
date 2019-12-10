<template>
  <div id="app">
    <transition code="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut " :duration="200">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" />
      </keep-alive>
    </transition>
    <transition code="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut transi" :duration="200">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition> 
    
  </div>
</template>

<script>
import "assets/iconfont.js";
export default {
  name: "App"
};
</script>

<style lang="scss">
@import 'style/reset.css';
@import 'style/global.scss';
@import "animate.css";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .transi{
      animation-duration: 10s;
  }
  /* margin-top: 60px; */
}
</style>
