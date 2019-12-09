<!--  -->
<template>
  <div class="food">
    <header-top headTitle="美食" :goBack="true"></header-top>
    <div class="group">
      <div class="sort_item" :class="{'active-item':activeType=='food'}" @click="changeSortItem('food')">
        <div class="sort_container category">
          <div class="sort_item_border title">
            美食
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-jiantou1" />
            </svg>
          </div>
        </div>
      </div>
      <div class="sort_item" :class="{'active-item':activeType=='sort'}" @click="changeSortItem('sort')">
        <div class="sort_container sort">
          <div class="sort_item_border title">
            排序
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-jiantou1" />
            </svg>
          </div>
        </div>
      </div>
      <div class="sort_item" :class="{'active-item':activeType=='filter'}" @click="changeSortItem('filter')">
        <div class="sort_container filter">
          <div class="sort_item_border title">
            筛选
            <svg   class="icon" aria-hidden="true">
              <use xlink:href="#icon-jiantou1" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerTop from "components/header/header";
import { getCategories } from "service/getData";
import { mapState } from "vuex";
export default {
  components: {
    headerTop
  },
  data() {
    return {
      categories: [], 
      activeType:"food"
    };
  },
  computed: {
    ...mapState(["latitude", "longitude"])
  },
  watch: {},
  methods: {
      changeSortItem(type){
          this.activeType =type;
      }
  },
  created() {
    getCategories(this.latitude, this.longitude).then(res => {
      this.categories = res;
    });
  },
  mounted() {}
};
</script>
<style lang='scss' scoped>
.food {
  .group {
    height: 1.6rem;
    border-bottom: 1px solid #ddd;
    .sort_item.active-item{
        color:#3190e8;
        .sort_container{
        .icon{
            fill:#3190e8;
            transform:rotate(180deg);
        }
        }
        
    }
    .sort_item {
      float: left;
      width: (100% /3);
      font-size: 0.55rem;
      .sort_container {
        padding-top: 0.3rem;
        .icon {
          width: 1.5em;
          height: 1.5em;
          vertical-align: middle;
          fill: #ccc;
          overflow: hidden;
          transition: transform 0.3s;
        }
        .sort_item_border {
          height: 1rem;
          line-height: 1rem;
          border-right: 1px solid #ddd;
        }
      }
    }
  }
}
</style>