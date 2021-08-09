<template>
  <div class="fe-card-container" @click="toDetails">
    <div class="fe-card-section">
      <div
        class="fe-card-img-section"
        :data-background="
          pic.includes('gigab2b')
            ? pic + '?x-oss-process=image%2Fresize%2Cw_500%2Ch_500%2Cm_pad'
            : pic
        "
      ></div>
      <div class="info-section">
        <el-tooltip :content="name">
          <p class="product-descript">
            {{ name }}
          </p>
        </el-tooltip>
        <div class="cost-section">
          <span class="cost-info">Product Cost</span>
          <span class="cost">${{ productInfo.cost }}</span>
        </div>
        <div class="price-section">
          <span class="price-info">Suggested Resale Price</span>
          <span class="price">${{ price }}</span>
        </div>
      </div>
      <div class="hover-section">
        <button
          v-if="notImport"
          @click.prevent="submitProduct(productId)"
          class="shopify"
        >
          Add to My Products
        </button>
        <import-loading v-else-if="importing"></import-loading>
        <import-success v-else></import-success>
      </div>
    </div>
  </div>
</template>
<script>
import { ship } from "~/data/svg";
import Vue from "vue";
import productService from "~/global/service/product.js";
import distributorService from "~/global/service/distributor_product.js";
import adminService from "~/global/service/admin.js";
import ImportLoading from "~/components/ImportLoading.vue";
import ImportSuccess from "~/components/ImportSuccess.vue";
import { mapState, mapMutations } from "vuex";
export default Vue.extend({
  props: ["price", "pic", "name", "productId", "currencyCode", "productInfo"],
  components: {
    ImportLoading,
    ImportSuccess,
  },
  data() {
    return {
      shipIcon: "",
      notImport: true,
      importing: false,
    };
  },
  computed: {
    ...mapState("adminUser", ["user"]),
    ...mapState("product", ["product"]),
  },
  created() {
    this.shipIcon = ship;
  },
  methods: {
    ...mapMutations("product", ["m_get_productDetail"]),
    toDetails(e) {
      if (e.target.className !== "shopify") {
        sessionStorage.setItem("product", this.productId);
        this.m_get_productDetail(this.productInfo);
        this.$router.push({
          name: "details-id",
          params: { id: this.productId },
        });
        document.getElementsByClassName("el-main")[0].scrollTop = 0;
      }
    },
    async submitProduct(id) {
      if (this.user.id) {
        this.notImport = false;
        this.importing = true;
        let params = {
          disStatus: 1,
          ids: id,
        };
        let importProduct =
          await distributorService.postDistributorProductUpdateDissStatus(
            params
          );
        if (importProduct.data.code === 200) {
          this.$message({
            type: "success",
            message: "Add successfully!",
          });
          this.importing = false;
        } else {
          this.$message({
            type: "error",
            message: "Add unsuccessfully!",
          });
          this.notImport = true;
        }
      } else {
        this.$router.push("/slogin");
      }
    },
  },
});
</script>

<style lang="less" scoped>
.fe-card-container {
  width: 244px;
  height: 422px;
  border-radius: 10px;
  // overflow: hidden;
  background-color: #fff;
  background-repeat: no-repeat;
  background-size: contain;
  .fe-card-section {
    width: 220px;
    padding: 10px 10px 16px;
    margin: 0 24px 16px 0;
    position: relative;
    cursor: pointer;
    &:hover {
      background: rgb(255 255 255);
      box-shadow: 0 10px 40px hsl(0deg 0% 59% / 15%);
      border-top-left-radius: 18px;
      border-top-right-radius: 18px;
      transition: all 0.3s;
      .hover-section{
        opacity: 1;
        transition: all 0.3s;
      }
    }
    .fe-card-img-section {
      width: 200px;
      height: 300px;
      border-radius: 8px;
    }
    .info-section {
      // padding: 16px;
      .free-shopping-section {
        display: flex;
        align-items: center;
        padding: 10px 0;
        .ship-icon {
          height: 13px;
        }
      }
      .product-descript {
        margin: 16px 0 8px;
        font-weight: 400;
        font-size: 14px;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .cost-section {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .cost-info {
          color: rgb(51 51 51);
          font-size: 12px;
        }
        .cost {
          font-size: 12px;
          font-weight: 600;
          color: rgb(199 150 24);
        }
      }
      .price-section {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .price-info {
          color: rgb(51 51 51);
          font-size: 12px;
        }
        .price {
          color: rgb(51 51 51);
          font-size: 12px;
          font-weight: 600;
        }
      }
      .original-price {
        font-size: 14px;
        color: rgba(109, 113, 117, 1);
      }
    }
  }
}
.hover-section {
  position: absolute;
  border-bottom-left-radius: 18px;
  border-bottom-right-radius: 18px;
  left: 0;
  bottom: -46px;
  width: 100%;
  height: 46px;
  background: rgb(255 255 255);
  z-index: 9999;
  padding: 0px 10px;
  opacity: 0;
  .shopify {
    cursor: pointer;
    opacity: initial;
    background: rgb(199 152 24);
    box-shadow: 0 4px 10px rgb(118 85 0 / 20%);
    width: 90%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 500;
    color: rgb(255 255 255);
    border: none;
    margin-left: 5%;
    &:hover {
      opacity: 0.6;
    }
  }
}
.original-price-section {
  padding-top: 10px;
  .original-price {
    text-decoration: line-through;
  }
}
@media screen and (max-width: 545px) {
  .fe-card-container {
    width: 100%;
    border-radius: 0;
    .fe-card-img-section {
      background-size: contain !important;
    }
  }
}
</style>
