<!--  -->
<template>
  <div class="food">
    <header-top headTitle="美食" :goBack="true"></header-top>
    <div class="group">
      <div class="sort_item" :class="{'active-item':activeType=='food'}">
        <div class="sort_container category">
          <div class="sort_item_border title" @click="changeSortItem('food')">
            美食
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-jiantou1" />
            </svg>
          </div>
        </div>
      </div>
      <div
        class="sort_item"
        :class="{'active-item':activeType=='sort'}"
        @click="changeSortItem('sort')"
      >
        <div class="sort_container sort">
          <div class="sort_item_border title">
            排序
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-jiantou1" />
            </svg>
          </div>
        </div>
      </div>
      <div
        class="sort_item"
        :class="{'active-item':activeType=='filter'}"
        @click="changeSortItem('filter')"
      >
        <div class="sort_container filter">
          <div class="sort_item_border title">
            筛选
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-jiantou1" />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div class="mask" v-show="activeType!==''">

    </div>
    <div class="choice">
      <transition  name="slide-fade">
        <div class="categoryList" key="category" v-if="activeType=='food'">
          <div class="leftFir">
            <div
              v-for="item in this.categories"
              :key="item.id"
              @click="curParentCate=item"
              :class="{activeItem:curParentCate===item}"
            >
              {{item.name}}
              <span class="count">{{item.count}}</span>
              <span>></span>
            </div>
          </div>
          <div class="rightSecond">
            <div
              @click="selectSecondCate(item.name)"
              v-for="item in curParentCate.sub_categories"
              :key="item.name"
              :class="{active:categoryIds==item.name}"
            >{{item.name}}</div>
          </div>
        </div>
      </transition>
      <transition  name="slide-fade">
        <div class="sort_methods" v-if="activeType =='sort'" key="methods">
          <div class="sortItem" :class="{active:sortByType=='0'}" @click="changeSortMethod('0')">
            智能排序
            <svg class="sort_icon" v-if="sortByType=='0'" aria-hidden="true">
              <use xlink:href="#icon-duihao-copy" />
            </svg>
          </div>
          <div class="sortItem" :class="{active:sortByType=='1'}" @click="changeSortMethod('1')">
            距离最近
            <svg class="sort_icon" v-if="sortByType=='1'" aria-hidden="true">
              <use xlink:href="#icon-duihao-copy" />
            </svg>
          </div>
          <div class="sortItem" :class="{active:sortByType=='2'}" @click="changeSortMethod('2')">
            销量最高
            <svg class="sort_icon" v-if="sortByType=='2'" aria-hidden="true">
              <use xlink:href="#icon-duihao-copy" />
            </svg>
          </div>
          <div class="sortItem" :class="{active:sortByType=='3'}" @click="changeSortMethod('3')">
            起送价最低
            <svg class="sort_icon" v-if="sortByType=='3'" aria-hidden="true">
              <use xlink:href="#icon-duihao-copy" />
            </svg>
          </div>
          <div class="sortItem" :class="{active:sortByType=='4'}" @click="changeSortMethod('4')">
            配送速度最快
            <svg class="sort_icon" v-if="sortByType=='4'" aria-hidden="true">
              <use xlink:href="#icon-duihao-copy" />
            </svg>
          </div>
          <div class="sortItem" :class="{active:sortByType=='5'}" @click="changeSortMethod('5')">
            评分最高
            <svg class="sort_icon" v-if="sortByType=='5'" aria-hidden="true">
              <use xlink:href="#icon-duihao-copy" />
            </svg>
          </div>
        </div>
      </transition>
       <transition name="slide-fade">
        <div class="filterItem" v-if="activeType=='filter'" key="filterItem">
          <div class="sendMethod">
            <h5>配送方式</h5>
            <div class="fengniao_send option" @click="selectFilter('fengniao')">
              <svg class="filter_icon" aria-hidden="true">
                <use :xlink:href="filterSelected.indexOf('fengniao')>-1?'#icon-duihao-copy':'#icon-fengniao'" />
              </svg>
              <span>蜂鸟专送</span>
            </div>
          </div>
          <div class="businessAttr">
            <h5>商家属性</h5>
            <ul class="clearfix">
              <li class="attr option" @click="selectFilter('pin')">
                <svg class="filter_icon" aria-hidden="true" v-if="filterSelected.indexOf('pin') >-1">
                  <use xlink:href="#icon-duihao-copy" />
                </svg>
                <span v-else class="brand" :style="{color:'rgb(63, 189, 230)',borderColor:'rgb(63, 189, 230)'}">品</span>
                <span>品牌商家</span>
              </li>
              <li class="attr option" @click="selectFilter('wai')">
                <svg class="filter_icon" aria-hidden="true" v-if="filterSelected.indexOf('wai')>-1">
                  <use xlink:href="#icon-duihao-copy" />
                </svg>
                <span v-else class="brand" :style="{color:'rgb(153, 153, 153)',borderColor:'rgb(153, 153, 153)'}">保</span>
                <span>外卖保</span>
              </li>
              <li class="attr option" @click="selectFilter('zhun')">
                <svg class="filter_icon" aria-hidden="true" v-if="filterSelected.indexOf('zhun')>-1">
                  <use xlink:href="#icon-duihao-copy" />
                </svg>
                <span v-else class="brand" :style="{color:'rgb(87, 169, 255)',borderColor:'rgb(87, 169, 255)'}">准</span>
                <span>准时达</span>
              </li>
              <li class="attr option" @click="selectFilter('xin')">
                <svg class="filter_icon" aria-hidden="true" v-if="filterSelected.indexOf('xin')>-1">
                  <use xlink:href="#icon-duihao-copy" />
                </svg>
                <span class="brand" v-else :style="{color:'rgb(232, 132, 45)',borderColor:'rgb(232, 132, 45)'}">新</span>
                <span>新店</span>
              </li>
              <li class="attr option" @click="selectFilter('zai')">
                <svg class="filter_icon" aria-hidden="true" v-if="filterSelected.indexOf('zai')>-1">
                  <use xlink:href="#icon-duihao-copy" />
                </svg>
                <span v-else class="brand" :style="{color:'rgb(255, 78, 0)',borderColor:'rgb(255, 78, 0)'}">付</span>
                <span>在线支付</span>
              </li>
              <li class="attr option" @click="selectFilter('kai')">
                <svg class="filter_icon" aria-hidden="true" v-if="filterSelected.indexOf('kai')>-1">
                  <use xlink:href="#icon-duihao-copy" />
                </svg>
                <span v-else class="brand" :style="{color:'rgb(153, 153, 153)',borderColor:'rgb(153, 153, 153)'}">票</span>
                <span>开发票</span>
              </li>
            </ul>
          <div class="btn clearfix">
            <div class="removeAll button" @click="clearAll">清空</div>
            <div class="confirm button" @click="confirm">确认</div>
          </div>
        </div>
        </div>
      </transition>
    </div>
     <shop-list class="shoplist" :categoryIds="categoryIds" :sortByType="sortByType" :deliveryMode="deliveryMode" :geohash="geohash"></shop-list>
  </div>
</template>

<script>
import headerTop from "components/header/header";
import shopList from "components/common/shoplist";
import { getCategories } from "service/getData";
import { mapState } from "vuex";

export default {
  components: {
    headerTop,
    shopList
  },
  data() {
    return {
      categories: [],
      activeType: "",
      curParentCate: {},
      sort_method: "1",
      filterSelected:[],
      deliveryMode:[],
      categoryIds:"",
      sortByType:""
    };
  },
  computed: {
    ...mapState(["latitude", "longitude","geohash"])
  },
  watch: {},
  methods: {
    changeSortItem(type) {
      if (this.activeType === type) {
        this.activeType = "";
      } else {
        this.activeType = type;
      }
    },
    changeSortMethod(num) {
      this.sortByType = num;
      this.activeType = "";
    },
    selectSecondCate(name) {
      this.activeType = "";
      this.categoryIds = name;
    },
    selectFilter(type){
      let filterSelected = [...this.filterSelected];
      filterSelected.indexOf(type)>-1 ? filterSelected = filterSelected.filter(item =>item !=type) :filterSelected.push(type);
      this.filterSelected = filterSelected;  
    },
    clearAll(){
      this.filterSelected =[];
    },
    confirm(){
      this.activeType ="";
      this.deliveryMode = this.filterSelected;
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
html::-webkit-scrollbar {
  width: 0px;
}
.active {
  color: #3190e8 !important;
}
.slide-fade-enter-active{
  transition:all 0.3s ease;
}
.slide-fade-leave-active{
   transition:all 0.2s ease;
}
//.slide-fade-enter是刚要进入的起始点，.slide-fade-leave-to是离开的终点
.slide-fade-enter,.slide-fade-leave-to{
  opacity: 0;
  transform: translateY(-100%);
}
.food {
  overflow: hidden;
  // &:before{
  //   content:"";
  //   display: table;
  // }
  .group {
    height: 1.6rem;
    width:100%;
    border-bottom: 1px solid #ddd;
    position: fixed;
    z-index: 100;
    top:2rem;
    background: #fff;
    font-size: 0.55rem;
    box-sizing: border-box;
    padding-top: 0.325rem;
    .sort_item.active-item {
      color: #3190e8;
      .sort_container {
        .icon {
          fill: #3190e8;
          transform: rotate(180deg);
        }
      }
    }
    .sort_item {
      float: left;
      width: (100% /3);
      .sort_container {
        .icon {
          width: 1.5em;
          height: 1.5em;
          vertical-align: middle;
          fill: #ccc;
          overflow: hidden;
          transition: transform 0.3s;
        }
        .sort_item_border {
          position: relative;
          z-index: 101;
          height: 1rem;
          line-height: 1rem;
          border-right: 1px solid #ddd;
        }
      }
    }
  }
  .mask{
    position: fixed;
    z-index:1;
    width:100%;
    height:100%;
    top:0;
    left:0;
    background:rgba(0,0,0,0.3)
  }
  .choice {
    font-size: 0.55rem;
    position: fixed;
    top:3.6rem;
    z-index:2;
    // background:#fff;
    .categoryList {
      height: 16rem;
      width: 16rem;
      position: relative;
      .activeItem {
        background: #fff;
      }
      .leftFir {
        width: 7.75rem;
        float: left;
        height: 100%;
        background: #f1f1f1;
        overflow-y: auto;
        & > div {
          height: 1.8rem;
          line-height: 1.8rem;
          color: #666;
          .count {
            background: #ccc;
            color: #fff;
            line-height: 1.5rem;
            border-radius: 0.75rem;
            padding: 0.1rem 0.3rem;
          }
        }
      }
      .rightSecond {
        float: left;
        width: 8.25rem;
        height: 100%;
        padding-left: 0.5rem;
        box-sizing: border-box;
        overflow-y: auto;
        background: #fff;
        & > div {
          height: 1.6rem;
          line-height: 1.6rem;
          color: #666;
          border-bottom: 1px solid #ddd;
        }
      }
    }
    .sort_methods {
       position: fixed;
      top:3.6rem;
      color: #666;
      background:#fff;
      .sort_icon {
        width: 1em;
        fill: currentColor;
        overflow: hidden;
        float: right;
        line-height: 2.5rem;
        height: 2.5rem;
        margin-right: 1rem;
      }
      .sortItem {
        height: 2.5rem;
        width: 15rem;
        line-height: 2.5rem;
        padding-left: 1rem;
        text-align: left;
        color: #666;
        border-bottom: 1px solid #ddd;
      }
    }
    .filterItem {
       position: fixed;
      top:3.6rem;
      padding-left: 0.5rem;
      background:#fff;

      .filter_icon {
        width: 1.4em;
        height:1.4rem;
        position: relative;
        fill: currentColor;
        overflow: hidden;
        vertical-align: middle;
      }
      h5 {
        height: 1.5rem;
        line-height: 1.5rem;
        text-align: left;
      }
      .option {
          border: 1px solid #ddd;
          border-radius: 2px;
          width: 4.4rem;
          height: 1.4rem;
          line-height: 1.4rem;
          margin :0.2rem;
          margin-top: 0;
          text-align: center;
      }
      .businessAttr{
        .attr{
            float:left;
            .brand{
              border:1px solid #000;
              padding:0.05rem;
              border-radius:2px;
            }
        }
      }
      .btn{
        margin-top:0.5rem;
        .button{
          width:7.5rem;
          height:1.8rem;
          border-radius:0.25rem;
          line-height: 1.8rem;
          float: left;
          font-size:0.8rem;
        }
        .removeAll{
          background: #fff;
           margin-right:0.5rem;
        }
        .confirm{
          background:#56d176;
          color:#fff;
        }
      }
    }
  }
  .shoplist{
    margin-top:3.6rem;
  }
}
</style>