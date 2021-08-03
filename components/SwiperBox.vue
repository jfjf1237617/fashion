<template>
  <div class="swiper-box-container">
    <div class="swiper-head">
      <span class="swiper-head-info">View image</span>
      <div
        @click="closeBox"
        class="close-icon-section"
        v-html="closeIcon"
      ></div>
    </div>
    <el-divider></el-divider>
    <div class="swiper-container gallery-top-box">
      <div class="swiper-wrapper swiper-wrapper-box">
        <div
          class="swiper-slide swiper-slide-top-box"
          v-for="(item, index) of bigImgBox"
          :key="index"
        >
          <img class="img-box" :src="item" />
        </div>
      </div>
      <div class="swiper-button-next swiper-button-black top-next-box"></div>
      <div class="swiper-button-prev swiper-button-black top-prev-box"></div>
    </div>
    <div style="height: 15px; width: 620px"></div>
    <div class="swiper-container gallery-thumbs-box">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide swiper-bottom-box"
          v-for="(item, index) of bigImgBox"
          :key="index"
        >
          <img class="img-box" :src="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Swiper from "swiper";
import { Pagination, Navigation, Autoplay, Thumbs } from "swiper";
Swiper.use([Pagination, Navigation, Autoplay, Thumbs]);
import { close } from "~/data/svg";
export default Vue.extend({
  props: { bigImgBox: Array,index:Number },
  components: { Pagination },
  name: "swipBox",
  data() {
    return {
      closeIcon: "",
      galleryTop:Function,
    };
  },
  created() {
    if (process.client) {
      this.$nextTick(function () {
        this.galleryThumbsLunboBox();
        this.galleryTopLunboBox();
      });
    }
  },
  mounted() {
    this.getIcon();
  },
  methods: {
    getIcon() {
      this.closeIcon = close;
    },
    closeBox() {
      this.$emit("close-box");
    },
    galleryTopLunboBox() {
      this.galleryTop = new Swiper(".gallery-top-box", {
        spaceBetween: 0,
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        navigation: {
          nextEl: ".top-next-box",
          prevEl: ".top-prev-box",
        },
        thumbs: {
          swiper: this.galleryThumbs,
          slideThumbActiveClass: "swiper-slide-thumb-active-box",
        },
      });
    },
    galleryThumbsLunboBox() {
      this.galleryThumbs = new Swiper(".gallery-thumbs-box", {
        spaceBetween: 15,
        slidesPerView: 5,
        // loop: true,
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        // navigation: {
        //   nextEl: ".swiper-button-next",
        //   prevEl: ".swiper-button-prev",
        // },
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
      });
    },
    event() {
      const self = this;
      return {};
    },
    network() {
      const self = this;
      return {};
    },
  },
  watch:{
    index:{
      handler(nVal,oVal){
        this.galleryTop.slideTo(nVal)
      }
    }
  }
});
</script>
<style lang="less" scoped>
.swiper-box-container {
  .swiper-head {
    width: 100%;
    padding: 16px 20px 0;
    display: flex;
    .swiper-head-info {
      font-size: 20px;
      font-weight: 400;
      color: #000;
      flex: 1;
    }
    .close-icon-section {
      height: 30px;
      margin: 0 10px;
      padding: 0 4px;
      display: flex;
      align-items: center;
      width: 30px;
      cursor: pointer;
      &:hover {
        background-color: #f6f6f7;
        color: #000;
      }
      .close-icon {
        line-height: 38px;
      }
    }
  }
  .swiper-container {
    margin: 0;
    --swiper-navigation-size: 12px;
    .top-prev-box,
    .top-next-box {
      width: 36px;
      height: 36px;
      background-color: #c4cdd5;
      border-radius: 50%;
      font-weight: 600;
    }
    // .thrumb-prev,
    // .thrumb-next {
    //   background-color: rgba(33, 43, 54, 0.8) !important;
    //   height: 74px !important;
    //   width: 35px !important;
    //   top: 6px !important;
    // }
    // .thrumb-prev {
    //   left: 0 !important;
    // }
    // .thrumb-next {
    //   right: 0 !important;
    // }
  }
  .img-box {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  .gallery-top-box {
    width: 100%;
    // height: calc(width);
    // border: 1px solid #ccd2e7;
    // border-radius: 8px;
  }
  .gallery-thumbs-box {
    width: 450px;
    height: 100px;
    margin: 0 auto;
    .swiper-wrapper {
      margin: 0;
      .swiper-bottom-box {
        height: 78px !important;
        img {
          border: 1px solid #ccd2e7;
          border-radius: 4px;
          height: auto !important;
        }
        &.swiper-slide-thumb-active-box {
          border: 2px solid #284198;
          border-radius: 4px;
        }
      }
    }
  }
}
.el-divider--horizontal {
  margin-bottom: 0;
}
</style>