<template>
  <div>
    <password-box ref="passwordBox"></password-box>
    <div class="settings-container">
      <div class="pricing-rules-section">
        <p class="pricing-rules-title">Pricing Rules</p>
        <div class="product-price-section">
          <div class="product-price-left">
            <span class="price-change" v-html="priceChangeIcon"></span>
            <span class="price-change-text">Product Price:</span>
            <el-tooltip
              class="item"
              popper-class="atooltip"
              content="E.g., A product that costs 10 USD would have its price set to 50 USD (10 x 5 = 50)."
              placement="left-start"
            >
              <span class="info-circle" v-html="infoCircleIcon"></span>
            </el-tooltip>
          </div>
          <div class="product-price-right">
            <span class="cost-usd"
              >Cost&nbsp;(USD)&nbsp;&nbsp;x&nbsp;&nbsp;</span
            >
            <div class="product-price-handle">
              <el-input
                class="product-price-input"
                v-model="productPriceInput"
                placeholder=""
              ></el-input>
              <div class="product-price-select">MULTIPLIER</div>
            </div>
          </div>
          <el-button
            @click="savePriceRule"
            :loading="loading"
            class="save-price-rule"
            >Save</el-button
          >
        </div>
      </div>
    </div>
    <div class="settings-password-container">
      <div class="settings-password-section">
        <p class="settings-password-title">Password</p>
        <el-button @click="openPasswordBox" class="open-password-box-btn"
          >CHANGE PASSWORD</el-button
        >
        <p class="settings-password-info">
          Change your password to keep your account secure
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { EventBus } from "~/event-bus";
import { mapMutations } from "vuex";
import { priceChanged, infoCircle } from "~/data/svg.js";
import shopifyService from "~/global/service/shopify.js";
import PasswordBox from "~/components/PasswordBox";
export default Vue.extend({
  layout: "base",
  async asyncData({ $axios, params }) {
    if (process.server) {
      let res = await $axios.get("/shopify/config");
      if (res.data.data.priceRate) {
        if (params.changePassword) {
          return {
            passwordBoxVisible: true,
            productPriceInput: res.data.data.priceRate,
          };
        } else {
          return {
            productPriceInput: res.data.data.priceRate,
          };
        }
      }
    } else if (process.client) {
      let res = await shopifyService.getShopifyConfig();
      if (res.data.data.priceRate) {
        if (params.changePassword) {
          return {
            passwordBoxVisible: true,
            productPriceInput: res.data.data.priceRate,
          };
        } else {
          return {
            productPriceInput: res.data.data.priceRate,
          };
        }
      }
    }
  },
  components: {
    PasswordBox,
  },
  data() {
    return {
      screenWidth: "",
      priceChangeIcon: "",
      infoCircleIcon: "",
      productPriceInput: "1.2",
      productPriceValue: "MULTIPLIER",
      productPriceOptions: ["MULTIPLIER"],
      loading: false,
      passwordBoxVisible: false,
    };
  },
  watch: {
    $route: {
      immediate: true,
      handler(nVal, oVal) {
        if (!nVal.path.includes("products")) {
          this.m_clear_checkCategories();
        }
      },
    },
  },
  mounted() {
    this.resizes();
    this.getIcon();
    if (this.passwordBoxVisible === true) {
      console.log("jfjnvnhguuu");
      this.$refs.passwordBox.passwordBoxVisible = true;
    }
  },
  methods: {
    getIcon() {
      this.priceChangeIcon = priceChanged;
      this.infoCircleIcon = infoCircle;
    },
    resizes() {
      this.screenWidth = String(document.body.clientWidth);
      EventBus.$emit("sendScreenWidth", this.screenWidth);
    },
    async savePriceRule() {
      this.loading = true;
      let res = await shopifyService.putShopifyConfigPriceRate(
        this.productPriceInput
      );
      if (res.data.code === 200) {
        this.$message({
          type: "success",
          message: "Save success!",
        });
        this.loading = false;
      }
    },
    openPasswordBox() {
      this.$refs.passwordBox.passwordBoxVisible = true;
    },
    ...mapMutations("category", ["m_clear_checkCategories"]),
  },
});
</script>
<style lang="less" scoped>
@title-color: #272742;
.settings-container {
  max-width: 1112px;
  background-color: #fff;
  padding: 52px 24px;
  .pricing-rules-title {
    font-size: 16px;
    color: @title-color;
    margin-bottom: 24px;
    font-weight: 600;
  }
  .product-price-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    padding-bottom: 50px;
    .product-price-left {
      display: flex;
      width: 175px;
      align-items: center;
      justify-content: space-between;
      .price-change-text {
        font-size: 14px;
        color: @title-color;
        font-weight: 600;
      }
    }
    .product-price-right {
      display: flex;
      align-items: center;
      width: 323px;
      .cost-usd {
        font-size: 14px;
        color: @title-color;
      }
      .product-price-handle {
        border: 1px solid #8e8eb0;
        border-radius: 3px;
        color: @title-color;
        position: relative;
        display: flex;
        .product-price-input {
          width: 50%;
          height: 100%;
        }
        .product-price-select {
          width: 50%;
          height: 100%;
          font-size: 14px;
          text-align: center;
          background-color: #ededf2 !important;
          border-radius: 0 3px 3px 0 !important;
          line-height: 40px;
        }
      }
    }
    .save-price-rule {
      width: 100px;
      height: 30px;
      font-size: 14px;
      background-color: #62628d;
      border: none;
      color: white;
      border-radius: 3px;
      position: absolute;
      bottom: 0;
      right: 0;
      cursor: pointer;
      padding: 0 20px !important;
      &:active {
        opacity: 0.9;
      }
      span {
        line-height: 30px;
      }
    }
  }
}
.product-price-select {
  /deep/ .el-input__inner {
    border: none !important;
    background-color: #ededf2 !important;
    border-radius: 0 3px 3px 0 !important;
  }
}
.product-price-input {
  /deep/ .el-input__inner {
    border: none !important;
    border-radius: 3px 0 0 3px !important;
  }
}
.settings-password-container {
  max-width: 1112px;
  background-color: #fff;
  padding: 52px 24px;
  .settings-password-title {
    font-size: 16px;
    color: @title-color;
    margin-bottom: 24px;
    font-weight: 600;
  }
  .settings-password-info {
    margin-bottom: 14px;
    padding-top: 14px;
    font-size: 14px;
  }
  .open-password-box-btn {
    color: #62628d;
    font-weight: 600;
    font-size: 12px;
    background-color: #ededf2;
    border: 0;
    border-radius: 3px;
  }
}
</style>
<style lang="less">
body > .atooltip {
  width: 250px !important;
  line-height: 20px !important;
  &.is-dark {
    background: #03002f !important;
    color: white !important;
  }
}
</style>
