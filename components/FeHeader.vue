<template>
  <el-header>
    <div class="left-section">
      <img class="fashion-express-logo" src="~/assets/icon/fashion-express-logo.png" />
    </div>
    <div class="center-section"></div>
    <div class="right-section">
      <div v-if="token" class="shopify-section">
        <div
          v-if="shopify.photo"
          :style="{
            background:
              '#fff' + ` url(${shopify.photo})` + ' no-repeat' + ' center/100%',
          }"
          class="shopify-head-left-photo"
        ></div>
        <div v-else class="shopify-head-left-photo">
          {{ user.username.substr(0, 1) }}
        </div>
        <div class="shopify-head-left-info">
          <p class="shopify-name">
            {{ user.username }}
          </p>
        </div>
        <el-button class="shopify-log-out" @click="logOut">Log Out</el-button>
      </div>
      <div v-else class="shopify-section">
        <button class="shopify-log-out" @click="$router.push('/slogin?from=fe')">
          Log In
        </button>
      </div>
      <button
        class="start-shopify-btn"
        v-if="openShopify === true"
        @click="toShopify"
      >
        Start free on shopify
      </button>
    </div>
  </el-header>
</template>
<script>
import Vue from "vue";
import { EventBus } from "~/event-bus";
import { categories, hotProducts, fold, shopifyLogo, logOut } from "~/data/svg";
import Cookies from "js-cookie";
import { mapState, mapMutations } from "vuex";
import shopifyService from "~/global/service/shopify.js";
export default Vue.extend({
  data() {
    return {
      loading: false,
      shopifyLogoIcon: "",
      logOutIcon: "",
      foldIcon: "",
      categoryIcon: "",
      hotProductIcon: "",
      openShopify: true,
      openSquare: true,
      dialogVisible: false,
      token: "",
      logInForm: {
        name: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "Please enter your store name",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    ...mapState("category", ["categories", "checkCategories"]),
    ...mapState("shopifyInfo", ["shopify"]),
    ...mapState("adminUser", ["user"]),
  },
  beforeMount() {
    this.judgeStatus();
  },
  mounted() {
    this.getIcon();
  },
  methods: {
    ...mapMutations("category", [
      "m_get_checkCategories",
      "m_clear_checkCategories",
    ]),
    logOut() {
      Cookies.remove("token");
      location.href = "/slogin?from=fe";
    },
    getIcon() {
      this.foldIcon = fold;
      this.categoryIcon = categories;
      this.hotProductIcon = hotProducts;
      this.shopifyLogoIcon = shopifyLogo;
      this.logOutIcon = logOut;
    },
    toShopify() {
      window.open("https://apps.shopify.com/MixShop");
    },
    toSquare() {
      window.open("https://squareup.com/");
    },
    async judgeStatus() {
      let token = Cookies.get("token");
      this.token = token;
      if (!this.user.id) {
        await this.$store.dispatch("adminUser/getUser", token);
        let adminSquareStatus = this.user.squareStatus;
        if (adminSquareStatus === 11 || adminSquareStatus === 22) {
          this.openShopify = false;
        } else {
          this.openShopify = true;
        }
        if (adminSquareStatus === 1 || adminSquareStatus === 22) {
          this.openSquare = false;
        } else {
          this.openSquare = true;
        }
      } else {
        let adminSquareStatus = this.user.squareStatus;
        if (adminSquareStatus === 11 || adminSquareStatus === 22) {
          this.openShopify = false;
        } else {
          this.openShopify = true;
        }
        if (adminSquareStatus === 1 || adminSquareStatus === 22) {
          this.openSquare = false;
        } else {
          this.openSquare = true;
        }
      }
    },
  },
});
</script>

<style scoped lang="less">
.el-header {
  color: #333;
  background-color: #fff;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left;
  line-height: 0rem;
  height: 67px !important;
  width: 100% !important;
  border:1px solid rgb(238 238 238);
  // box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2) !important;
  position: absolute;
  top: 0;
  // 头部
  z-index: 1500;
  .fold {
    cursor: pointer;
  }
  .left-section {
    cursor: pointer;
    min-width: 160px;
    .fashion-express-logo{
      // width: 65px;
      height: 50px;
      margin-left: 30px;
      margin-top: 10px;
    }
  }
  .center-section {
    flex: 1;
    margin-left: 95px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    white-space: nowrap;
    overflow: hidden;
    .title {
      font-size: 21px;
      font-weight: 600;
      line-height: 26px;
    }
    .sub-title {
      font-size: 14px;
      line-height: 18px;
      color: rgba(109, 113, 117, 1);
    }
  }
  .right-section {
    display: flex;
    align-items: center;
    .shopify-section {
      display: flex;
      align-items: center;
      padding: 5px;
      &:hover {
        transition: all 0.2s linear;
      }
      .shopify-head-left-photo {
        width: 38px;
        height: 38px;
        text-align: center;
        line-height: 38px;
        border-radius: 50%;
        // background-color: #ffc96b;
        background-color: #c79818;
        color: #fff;
        font-size: 20px;
      }
      .shopify-head-left-info {
        cursor: pointer;
        max-width: 16rem;
        margin-left: 1rem;
        .shopify-name {
          font-size: 16px;
          line-height: 20px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-weight: 500;
          color: rgba(32, 34, 35, 1);
        }
        .shopify-url {
          font-size: 1.2rem;
          line-height: 1.6rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          opacity: 0.7;
          color: rgba(32, 34, 35, 0.7);
        }
      }
    }
    .start-shopify-btn {
      padding: 4px 16px !important;
      height: 32px;
      background-color: #c79818;
      border: none;
      color: white;
      font-size: 14px;
      cursor: pointer;
      border-radius: 4px;
      margin-right: 15px;
    }
  }
}
@import "~/assets/mobileStyles/appHeader.less";
</style>
<style lang="less">
body > .shopify-log-out {
  padding: 8px !important;
  width: 150px;
  .el-dropdown-menu__item {
    margin: 0 auto;
    border-radius: 5px;
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 10px;
    &:hover {
      color: #606266;
      background-color: #f6f6f7;
    }
    span {
      display: inline-block;
      margin-right: 15px;
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
}
.product-header-dialog-section {
  .el-dialog {
    text-align: center;
    width: 500px;
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      .login-with-shopify {
        font-size: 26px;
        font-weight: 550;
        margin-top: 20px;
        margin-bottom: 20px;
        font-style: italic;
      }
      .shopify-input-section {
        width: 100%;
        position: relative;
        margin-top: 50px;
        .el-input {
          width: 200px;
          margin-left: 70px;
        }
        .shopify-com {
          position: absolute;
          left: 230px;
          display: inline-block;
          width: 200px;
          color: black;
          font-size: 16px;
          font-weight: 600;
        }
      }
      div {
        display: flex;
        flex-direction: column;
        button {
          margin: 0 auto;
          width: 120px;
          background-color: #5b5cea;
        }
      }
      .shopify-divide {
        width: 500px;
        margin-left: -20px;
        border-bottom: 1px dashed #e4e7ed;
        position: relative;
        .shopify-or {
          display: inline-block;
          color: #c4c7cf;
          background-color: #fff;
          width: 50px;
          height: 10px;
          position: absolute;
          top: 0px;
          left: 50%;
          transform: translateX(-50%);
        }
      }
      .shopify-install-info {
        font-weight: 600;
        color: black;
        margin: 30px 0 25px;
      }
    }
  }
}
.shopify-logo {
  height: 28px;
  margin-left: 5px;
  vertical-align: middle;
}
.shopify-log-out {
  background-color: white !important;
  color: #909399 !important;
  margin-left: 20px;
  border: 1px solid #909399 !important;
  font-size: 14px !important;
  margin-right: 10px !important;
  padding: 7px 16px;
  border-radius: 5px;
  &:hover {
    background-color: #f6f6f7 !important;
  }
}
.shopify-login {
  margin: 20px auto !important;
}
</style>
