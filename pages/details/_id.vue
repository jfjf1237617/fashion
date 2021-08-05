<template>
  <div class="product-detail-container">
    <el-dialog
      :visible.sync="dialogVisible"
      class="swiper-box-section"
      :append-to-body="true"
    >
      <swip-box
        class="product-detail-box"
        ref="swiperBox"
        :bigImgBox="imgArr"
        @close-box="dialogVisible = false"
        :index="index"
      ></swip-box>
    </el-dialog>
    <div v-html="goBackIcon" class="border go-back" @click="goBack"></div>
    <div class="product-detail-section">
      <div class="product-detail">
        <carrousel
          @open-swiper-box="openDialog"
          ref="feSwipers"
          :bigImg="imgArr"
        ></carrousel>
        <div v-if="Object.keys(detail).length > 0" class="product-info-section">
          <p class="product-name">{{ detail.name }}</p>
          <el-divider></el-divider>
          <div class="product-grid">
            <p class="product-cost">Cost</p>
            <p class="product-price">${{ detail.price }}</p>
          </div>
          <div class="product-grid">
            <p class="product-stock">Stock</p>
            <p class="product-stock-num">{{ detail.stock }} in stock</p>
          </div>
        </div>
      </div>
      <el-divider></el-divider>
      <div v-if="edit === false" class="import-shopify">
        <button class="product-detail-import" @click.self="importShopify">
          {{ loading ? "" : "Add to My Products" }}
        </button>
      </div>
    </div>
    <div class="product-description-section">
      <div
        class="product-description-info"
        v-if="detail.description"
        v-html="detail.description"
      ></div>
      <img
        class="product-description-img"
        :src="item"
        v-for="(item, index) of imgArr"
        :key="index"
      />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { goBack } from "~/data/svg.js";
import carrousel from "~/components/Swiper.vue";
import swipBox from "~/components/SwiperBox.vue";
import productService from "~/global/service/product.js";
import { Loading } from "element-ui";
import distributorService from "~/global/service/distributor_product.js";
import { mapState } from "vuex";
export default Vue.extend({
  layout:'base',
  validate({ params }) {
    let id = params.id;
    return /^\d+$/.test(id);
  },
  components: {
    carrousel,
    swipBox,
  },
  beforeRouteUpdate(to, from, next) {
    
    next();
  },
  data() {
    return {
      goBackIcon: "",
      imgArr: [],
      imgArrBox: [],
      detail: {} as any,
      value: 4,
      dialogVisible: false,
      index: 0,
      loading: null,
      edit: false,
      img: [
        { icon: require("~/assets/icon/home.png") },
        { icon: require("~/assets/icon/products.png") },
        { icon: require("~/assets/icon/order.png") },
        { icon: require("~/assets/icon/settings.png") },
      ],
    };
  },
  computed: {
    ...mapState("adminUser", ["user"]),
    ...mapState("product", ["productDetail"]),
  },
  methods: {
    getIcon() {
      this.goBackIcon = goBack;
    },
    goBack() {
      this.$router.go(-1);
    },
    onSwiper(swiper: any) {
      // console.log(swiper);
    },
    onSlideChange() {
      // console.log("slide change");
    },
    async getDetail() {
      if (!this.productDetail) {
        console.log('nodetail');
        
        console.log("nodetail");
        let res = await productService.allList({
          idList: this.$route.params.id,
        });
        if (res.data.code === 200 && res.data.data.list.length > 0) {
          this.detail = res.data.data.list[0] as any;
          let picture = this.detail.albumPics;
          this.imgArr = picture.split(",");
          (this.imgArr as any).unshift(this.detail.pic);
          this.imgArr.map((item:any, index) => {
            item.includes("gigab2b")
              ? item + "?x-oss-process=image%2Fresize%2Cw_500%2Ch_500%2Cm_pad"
              : item;
          });
          this.imgArrBox = picture.split(",");
          (this.imgArrBox as any).unshift(this.detail.pic);
        }
        setTimeout(() => {
          // this.$refs.feSwipers.galleryThumbsLunbo();
          // this.$refs.feSwipers.galleryTopLunbo();
        }, 0);
      } else {
        console.log(this.productDetail);
        this.detail = JSON.parse(JSON.stringify(this.productDetail));
        let picture = this.detail.albumPics;
        this.imgArr = picture.split(",");
        (this.imgArr as any).unshift(this.detail.pic);
        this.imgArrBox = picture.split(",");
        (this.imgArrBox as any).unshift(this.detail.pic);
      }
    },
    openDialog(val:number) {
      this.dialogVisible = true;
      this.index = val;
    },
    async importShopify() {
      if (this.user.id) {
        this.loading && (this.loading as any).close();
        (this.loading as any) = Loading.service({
          target: ".product-detail-import",
          background: "rgba(255,255,255,0.5)",
        });
        let id = this.$route.params.id;
        let params = {
          disStatus: 1,
          ids: id,
        };
        let importProduct =
          await distributorService.postDistributorProductUpdateDissStatus(
            params
          );
        console.log(importProduct);
        if (importProduct.data.code === 200) {
          this.$message({
            type: "success",
            message: "Add successfully!",
          });
        } else {
          this.$message({
            type: "error",
            message: "Add unsuccessfully!",
          });
        }
        (this.loading as any).close();
        this.edit = true;
      } else {
        (this.loading as any).close();
        this.$router.push("/slogin");
      }
    },
  },
  beforeMount() {
    this.getIcon();
  },
  mounted() {
    console.log('aaaaaaaa');
    this.getDetail();
  },
});
</script>
<style lang="less" scoped>
.go-back {
  width: 40px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 10px;
}
.product-detail-section {
  background-color: #fff;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0px 0px 5px rgba(23, 24, 24, 0.05);
  margin: 20px 10px;
  padding-bottom: 20px;
  .product-detail {
    padding: 20px;
    display: flex;
    width: 100%;
    overflow-x: hidden;
    .pic-swiper-main {
      background-size: cover;
    }
    .product-info-section {
      width: 100%;
      font-size: 14px;
      .product-name {
        margin-bottom: 20px;
        font-size: 14px;
        line-height: 2rem;
      }
      .product-star-section {
        display: flex;
        align-items: top;
        .product-orders,
        .product-reviews {
          direction: inline-block;
          margin-left: 10px;
          font-size: 14px;
        }
      }
      .product-grid {
        display: grid;
        grid-template-columns: 110px auto;
        margin-bottom: 20px;
        .product-price {
          color: #202223;
          font-size: 16px;
          font-weight: 600;
        }
        .product-shipping-info {
          span {
            font-weight: 600;
          }
        }
      }
    }
  }
  .edit-section,
  .import-shopify {
    width: 100%;
    height: 36px;
    // margin-bottom: 20px;
    position: relative;
    button {
      width: 180px;
      height: 36px;
      position: absolute;
      border: none;
      padding: 0.8rem 1.6rem;
      color: white;
      background-color: #c79818;
      font-size: 1.2rem;
      cursor: pointer;
      border-radius: 0.4rem;
      margin-right: 20px;
      right: 0;
    }
  }
  .product-detail-edit {
    width: 80px !important;
    background-color: #fff !important;
    color: #000 !important;
    border: solid 1px #dcdfe6 !important;
    font-size: 1.2rem !important;
    &:hover {
      background-color: #f6f6f7 !important;
    }
  }
}
.product-description-section {
  background-color: #fff;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0px 0px 5px rgba(23, 24, 24, 0.05);
  margin: 0 10px;
  padding: 20px 0;
  .product-description-info {
    width: 80%;
    max-width: 480px;
    margin: 0 auto;
    font-size: 14px;
  }
  .product-description-img {
    max-width: 480px;
    width: 80%;
    margin: 24px 50%;
    transform: translateX(-50%);
  }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
<style lang="less">
.el-rate {
  width: auto !important;
}
.el-rate__item {
  width: 20px !important;
}
.swiper-box-section {
}
.el-dialog {
  width: 620px;
  height: 90vh;
  max-height: 790px;
  overflow-y: auto;
  overflow-x: hidden;
}
.el-dialog__header {
  display: none;
}
.el-dialog__body {
  padding: 0 !important;
}
@media screen and (max-width: 1020px) {
  .product-detail {
    display: block !important;
  }
}
@media screen and (max-width: 620px) {
  .el-dialog {
    width: 100%;
  }
}
.product-detail-import {
  font-size: 14px !important;
  padding: 11px 22px !important;
  .el-loading-spinner {
    .circular {
      width: 30px;
      height: 41px;
    }
    .path {
      stroke: #fff;
      stroke-width: 4px;
    }
  }
}
</style>
