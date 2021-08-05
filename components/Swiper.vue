<template>
  <div class="bannerBox">
    <div class="swiper-container gallery-top">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) of bigImg" :key="index">
          <img @click.self="openBox(index)" class="img" :src="item" />
        </div>
      </div>
      <div class="swiper-button-next swiper-button-black top-next"></div>
      <div class="swiper-button-prev swiper-button-black top-prev"></div>
    </div>
    <div style="height: 15px; width: 400px"></div>
    <div class="swiper-container gallery-thumbs">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide swiper-bottom"
          v-for="(item, index) of bigImg"
          :key="index"
        >
          <img class="img" :src="item" />
        </div>
      </div>
      <div class="swiper-button-next swiper-button-white thrumb-next"></div>
      <div class="swiper-button-prev swiper-button-white thrumb-prev"></div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Swiper from "swiper";
import { Pagination, Navigation, Autoplay, Thumbs } from "swiper";
Swiper.use([Pagination, Navigation, Autoplay, Thumbs]);
export default Vue.extend({
  props: { bigImg: Array },
  components: { Pagination },
  name: "carrousel",
  data() {
    return {};
  },
  created() {
    if (process.client) {
      this.$nextTick(function () {
        this.galleryThumbsLunbo();
        this.galleryTopLunbo();
      });
    }
  },
  methods: {
    galleryTopLunbo() {
      this.galleryTop = new Swiper(".gallery-top", {
        spaceBetween: 0,
        // loop: true,
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        navigation: {
          nextEl: ".top-next",
          prevEl: ".top-prev",
        },
        thumbs: {
          observer: true,
          observeParents: true,
          observeSlideChildren: true,
          swiper: this.galleryThumbs,
          slideThumbActiveClass: "swiper-slide-thumb-active",
        },
      });
    },
    galleryThumbsLunbo() {
      this.galleryThumbs = new Swiper(".gallery-thumbs", {
        spaceBetween: 15,
        slidesPerView: 4,
        // loop: true,
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        navigation: {
          nextEl: ".thrumb-next",
          prevEl: ".thrumb-prev",
        },
        // thumbs: {
        //   swiper: this.,
        // },
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
      });
    },
    openBox(val) {
      this.$emit("open-swiper-box", val);
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
});
</script>
<style lang="less" scoped>
.bannerBox {
  width: 360px !important;
  .swiper-container {
    margin: 0;
    --swiper-navigation-size: 12px;
    .top-prev,
    .top-next {
      width: 36px;
      height: 36px;
      background-color: #c4cdd5;
      border-radius: 50%;
      font-weight: 600;
    }
    .thrumb-prev,
    .thrumb-next {
      background-color: rgba(33, 43, 54, 0.8) !important;
      height: 74px !important;
      width: 35px !important;
      top: 6px !important;
    }
    .thrumb-prev {
      left: 0 !important;
    }
    .thrumb-next {
      right: 0 !important;
    }
  }
  .img {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  .gallery-top {
    width: 340px;
    height: 340px;
    border: 1px solid #ccd2e7;
    border-radius: 8px;
  }
  .gallery-thumbs {
    width: 340px;
    height: 100px;
    .swiper-bottom {
      height: 74px !important;
      overflow: hidden;
      img {
        border: 1px solid #ccd2e7;
        border-radius: 4px;
        height: 73px !important;
        object-fit: cover;
        z-index: 9999;
      }
    }
  }
}
.swiper-slide-thumb-active {
  border: 2px solid #284198;
  border-radius: 4px;
}
</style>
