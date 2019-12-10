<template>
  <div class="rating_star">
    <div class="greyStar">
      <svg class="icon grey-fill" aria-hidden="true" v-for="i in 5" :key="i">
        <use xlink:href="#icon-xingxing" />
      </svg>
    </div>
    <div class="yellowStar" :style="{width:rating*0.4+'rem'}">
      <div class="yellowStarBox">
        <svg class="icon yellow-fill" aria-hidden="true" v-for="i in 5" :key="i">
          <use xlink:href="#icon-xingxing" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["rating"]
};
</script>

<style scoped lang="scss">
.rating_star {
  width: 2rem;
  height: 0.8rem;
  position: relative;
  .icon {
    width: 0.4rem;
    height: 0.4rem;
  }
  .grey-fill {
    fill: #999;
  }
  .yellowStar {
    position: absolute;
    top: 0;
    height: 0.8rem;
    left: 0;
    overflow: hidden;
    .yellowStarBox{
        width:2rem;
        .yellow-fill {
      fill: orange;
    }
    }
    
  }
}
</style>