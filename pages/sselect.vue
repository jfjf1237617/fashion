<template>
  <div class="shopify-select-page">
    <div class="shopify-select-title">
      <h1 class="title">Connect Fashion Express with Shopify</h1>
      <!-- <h1 class="title" v-if="$route.query.channel==='square'">Connect Fashion Express with Square</h1>
      <span v-if="$route.query.channel==='shopify'" v-html="shopifyLogoIcon"></span> -->
    </div>
    <h3 class="shopify-select-subtitle">
      Choose which account to connect with {{ name }}
    </h3>
    <div class="shopify-select-btn">
      <div @click="$router.push(`/slogin?name=${name}&channel=${channel}&bindOld=true`)" class="log-in-account">
        Log in with Fashion Express account<span
          class="iconfont icon-arrowRight"
        ></span>
      </div>
      <div @click="$router.push(`/ssignup?name=${name}&channel=${channel}`)" class="creat-in-account">    
        Create new Fashion Express account<span class="iconfont icon-arrowRight"></span>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { shopifyLogo } from "~/data/svg";
export default Vue.extend({
  async validate({ query, redirect }) {
    if (query.status && query.status === "false") {
      return true;
    } else if (query.status && query.status === "true") {
      redirect(`/slogin?name=${query.name}&channel=${query.channel}`);
      return false;
    }
  },
  async asyncData({ query }) {
    if (query.name && query.channel) {
      return {
        name: query.name,
        channel:query.channel,
      };
    }
  },
  layout: "public",
  data() {
    return {
      shopifyLogoIcon: "",
      name: "",
      channel:"",
    };
  },
  mounted() {
    this.getIcon();
  },
  methods: {
    getIcon() {
      this.shopifyLogoIcon = shopifyLogo;
    },
  },
});
</script>
<style lang="less" scoped>
.shopify-select-page {
  width: 100%;
  max-width: 600px;
  height: 100vh;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .shopify-select-title {
    display: flex;
    align-items: center;
  }
  .shopify-select-subtitle {
    margin-top: 5px;
    margin-bottom: 70px;
  }
  .shopify-select-btn {
    .log-in-account,.creat-in-account {
      width: 434px;
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 15px;
      background-color: #f6f6f9;
      margin-bottom: 10px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      &:hover{
        opacity: 0.8;
      }
    }
  }
}
</style>
<style lang="less">
.shopify-select-title {
  span {
    display: inline-block;
    height: 28px;
    margin-left: 5px;
    svg {
      height: 28px;
    }
  }
}
.log-in-account {
  .icon-arrowRight {
  }
}
.creat-in-account {
  .icon-arrowRight {
  }
}
</style>
