<!--  -->
<template>
  <div class="food">
    <header-top :headTitle="headTitle" :goBack="true"></header-top>
    <div class="group">
      <div class="sort_item" :class="{'active-item':activeType=='food'}">
        <div class="sort_container category">
          <div  class="sort_item_border title" @click="changeActiveType('food')">
            {{foodTitle}}
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-jiantou1" />
            </svg>
          </div>
        </div>
      </div>
      <div
        class="sort_item"
        :class="{'active-item':activeType=='sort'}"
        @click="changeActiveType('sort')"
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
        @click="changeActiveType('filter')"
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
        <div class="categoryList"  v-if="activeType=='food'">
          <div class="leftFir">
            <div
              v-for="(item,index) in this.categories"
              :key="item.id"
              @click="selectFirstCate(item.id,index)"
              :class="{activeItem:restaurant_category_id===item.id}"
            >
              {{item.name}}
              <span class="count">{{item.count}}</span>
              <span v-if="index">></span>
            </div>
          </div>
          <div class="rightSecond" v-if="categoryDetail">
            <div
              @click="selectSecondCate(item.id,item.name)"
              v-for="(item,index) in categoryDetail "
              :key="item.name"
              :class="{active:restaurant_category_ids==item.id}"
            >{{item.name}}</div>
          </div>
        </div>
      </transition>
      <transition  name="slide-fade">
        <ul class="sort_methods" v-if="activeType =='sort'" @click="changeSortMethod">
          <li class="sortItem" :class="{active:sortByType=='0'}" data-code="0">
            智能排序
            <svg class="sort_icon" v-if="sortByType=='0'" aria-hidden="true" >
              <use xlink:href="#icon-duihao-copy" />
            </svg>
          </li>
          <li class="sortItem" :class="{active:sortByType=='1'}" data-code="1">
            距离最近
            <svg class="sort_icon" v-if="sortByType=='1'" aria-hidden="true" >
              <use xlink:href="#icon-duihao-copy" />
            </svg>
          </li>
          <li class="sortItem" :class="{active:sortByType=='2'}" data-code="2">
            销量最高
            <svg class="sort_icon" v-if="sortByType=='2'" aria-hidden="true">
              <use xlink:href="#icon-duihao-copy" />
            </svg>
          </li>
          <li class="sortItem" :class="{active:sortByType=='3'}" data-code="3">
            起送价最低
            <svg class="sort_icon" v-if="sortByType=='3'" aria-hidden="true">
              <use xlink:href="#icon-duihao-copy" />
            </svg>
          </li>
          <li class="sortItem" :class="{active:sortByType=='4'}" data-code="4">
            配送速度最快
            <svg class="sort_icon" v-if="sortByType=='4'" aria-hidden="true">
              <use xlink:href="#icon-duihao-copy" />
            </svg>
          </li>
          <li class="sortItem" :class="{active:sortByType=='5'}" data-code="5">
            评分最高
            <svg class="sort_icon" v-if="sortByType=='5'" aria-hidden="true">
              <use xlink:href="#icon-duihao-copy" />
            </svg>
          </li>
        </ul>
      </transition>
       <transition name="slide-fade">
        <div class="filterItem" v-if="activeType=='filter'" >
          <div class="sendMethod">
            <h5>配送方式</h5>
            <div v-for="item in foodDelivery"  :key="item.id" class="fengniao_send option" @click="chooseDeliveryMode(item.id)">
              <svg class="filter_icon" aria-hidden="true">
                <use :xlink:href="delivery_mode ==item.id ?'#icon-duihao-copy':'#icon-fengniao'" />
              </svg>
              <span>{{item.text}}</span>
            </div>
          </div>
          <div class="businessAttr">
            <h5>商家属性</h5>
            <ul class="clearfix">
              <li v-for="(item,index) in foodActivity" :key="item.id" class="attr option" @click="chooseFoodActivity(index)">
                <svg class="filter_icon" aria-hidden="true" v-if="support_ids[index].status">
                  <use xlink:href="#icon-duihao-copy" />
                </svg>
                <span v-else class="brand" :style="{color:'#'+item.icon_color,borderColor:'#'+item.icon_color}">{{item.icon_name}}</span>
                <span>{{item.name}}</span>
              </li>
            </ul>
          <div class="btn clearfix">
            <div class="removeAll button" @click="clearAll">清空</div>
            <div class="confirm button" @click="confirm">确认<span v-if="selectedNum >0">({{selectedNum}})</span></div>
          </div>
        </div>
        </div>
      </transition>
    </div>
     <shop-list class="shoplist"  :restaurant_category_ids='restaurant_category_ids' :restaurant_category_id='restaurant_category_id'  :sortByType="sortByType" :filterConfirmStatus="filterConfirmStatus" :geohash="geohash"></shop-list>
  </div>
</template>

<script>
import headerTop from "components/header/header";
import shopList from "components/common/shoplist";
import { getCategories,getCityAll,foodDelivery ,foodActivity } from "service/getData";
import { mapState ,mapMutations} from "vuex";

export default {
  components: {
    headerTop,
    shopList
  },
  data() {
    return {
      geohash:"",
      categories: [],
      activeType: "",
      //一级分类选中的id
      restaurant_category_id: null,
      //选中一级分类的子集
      categoryDetail:[],
      //二级分类选中的id
      restaurant_category_ids:null,
      headTitle:"",
      foodTitle :"",
      foodDelivery:[],
      foodActivity:[],
      sortByType:"",
      //筛选选中项的个数
      selectedNum:0,
      //选中的配送方式，单选
      delivery_mode:null,
      support_ids : [],
      filterConfirmStatus:false
    };
  },
  computed: {
    //如果页面刷新，store中的值会全部清空，但是url地址栏中query携带的参数不会丢失，所以geohash应该尽量从地址栏中获取
    ...mapState(["latitude", "longitude"])
  },
  watch: {},
  methods: {
    ...mapMutations({saveAddress:"SAVE_ADDRESS"}),
  async  initData(){
      this.geohash = this.$route.query.geohash;
      this.headTitle = this.$route.query.title;
      this.foodTitle = this.$route.query.title;
      this.restaurant_category_id = this.$route.query.restaurant_category_id;
      if(!this.latitude){
        const res =await getCityAll(this.geohash);
        this.saveAddress(res)
      }
      this.categories=await  getCategories(this.latitude, this.longitude);
      this.categories.forEach(item =>{
        if(item.id = this.restaurant_category_id){
          this.restaurant_category_id = item.id;
          this.categoryDetail =  item.sub_categories;
        }
      });
      this.foodDelivery = await  foodDelivery(this.latitude, this.longitude)
      this.foodActivity = await  foodActivity(this.latitude, this.longitude);
      this.foodActivity.forEach((item,index) =>{
        this.support_ids[index] ={status:false,id:item.id}
      })
    },
    changeActiveType(type) {
      if(this.activeType!= type){
        this.activeType = type;
        if(type =="food"){
          this.foodTitle ="分类"
        }else{
          this.foodTitle = this.headTitle;
        }
      }else{
        this.activeType ="";
        this.foodTitle = this.headTitle;
      }
     
    },
    selectFirstCate(id,index){
      if(index ===0){
        this.restaurant_category_ids = null;
        this.activeType =""
        this.categoryDetail = null;
      }else{
        this.categoryDetail = this.categories[index]['sub_categories'];
      }
      this.restaurant_category_id = id;
    },
    changeSortMethod($event) {
      var target =$event.target;
      var liNode;
      if(target.nodeName.toUpperCase()=="LI"){
          liNode = target;
      }else{
        liNode = target.parentNode;
      }
      this.activeType ="";
      //如果只是普通的自定义属性 用getAttribute获取
      this.sortByType = liNode.dataset.code;
      // this.sortByType = num;
      // this.activeType = "";
    },
    selectSecondCate(id,name) {
      this.activeType = "";
      this.foodTitle = this.headTitle =name;
      this.restaurant_category_ids = id;
    },
    chooseDeliveryMode(id){
      console.log("num",this.selectedNum);
      if(this.delivery_mode ===null){
        console.log(1)
        this.selectedNum++;
        this.delivery_mode =id
      }else if(this.delivery_mode ==id){
         console.log(2)
        this.selectedNum--;
        this.delivery_mode=""
      }else{
         console.log(3)
        this.delivery_mode =id
      }
       console.log("num",this.selectedNum);
    },
    chooseFoodActivity(index){
        const status = !this.support_ids[index].status;
        if(status){
          this.selectedNum++
        }else{
          this.selectedNum--;
        }
        this.support_ids[index].status =status
       
        // this.selectedNum = this.delivery_mode ==null ? 0:1
        // this.support_ids.forEach(item=>{
        //     if(item.status){
        //       this.selectedNum++;
        //     }
        // })
    },
    clearAll(){
      this.delivery_mode =null;
      this.selectedNum =0;
      this.support_ids.map(item=>item.status=false)
    },
    confirm(){
      this.activeType ="";
      this.filterConfirmStatus = !this.filterConfirmStatus;
    }
  },
  created() {
   this.initData()
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