<template>
  <div class="spaystatus-container">
    <div class="spaysuccess-container">
      <div v-if="orderStatus > 0" class="spaysuccess-header">
        <span class="iconfont icon-success"></span>
        <span class="pay-success">Payment Success!</span>
      </div>
      <div v-else-if="orderStatus === -100" class="spaypaying-header">
        <span class="iconfont icon-jinxingzhong"></span>
        <p class="pay-paying">Paying <span class="ani_dot">...</span></p>
      </div>
      <div v-else class="spayfail-header">
        <span class="iconfont icon-zhifushibai"></span>
        <span class="pay-fail">Payment Failure!</span>
      </div>
      <div class="spaysuccess-body">
        <el-row :gutter="20">
          <el-col :span="6"
            ><div class="grid-content left">Order number:</div></el-col
          >
          <el-col :span="18"
            ><div class="grid-content">{{ OrderInfo[0].id }}</div></el-col
          >
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6"
            ><div class="grid-content left">Payment amount:</div></el-col
          >
          <el-col :span="18"
            ><div class="grid-content">
              ${{ OrderInfo[0].totalCost }}
              <!-- ${{ OrderInfo[0].line_items[0].cost }} -->
            </div></el-col
          >
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6"
            ><div class="grid-content left">Product:</div></el-col
          >
          <el-col :span="18"
            ><div
              v-for="(item, index) of productInfo"
              :key="'product' + index"
              class="grid-content"
            >
              <p>
                {{ item.name }}&nbsp;&nbsp;&nbsp;{{
                  item.quantity
                }}&nbsp;&nbsp;&nbsp;${{ item.price }}
              </p>
            </div></el-col
          >
        </el-row>
        <el-row v-if="orderStatus > 0" :gutter="20">
          <el-col :span="6"
            ><div class="grid-content left">Pattern of payment:</div></el-col
          >
          <el-col :span="18"><div class="grid-content">Stripe</div></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6"
            ><el-button
              @click="$router.push('/payPending')"
              class="grid-content left"
              >Back</el-button
            ></el-col
          >
          <el-col v-if="orderStatus < 0 || !orderStatus" :span="18"
            ><el-button @click="payAgain" class="grid-content left"
              >Pay Again</el-button
            ></el-col
          >
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import shopifyService from "~/global/service/shopify.js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe("pk_test_kKiIIn5jbIixQ96SV4NpPZyf00hulVQYuC");
import { Loading } from "element-ui";
export default Vue.extend({
  async asyncData({ $axios, params }) {
    if (process.server) {
      let resOrder = await $axios.get(`/shopify/orders?ids=${params.id}`);
      let res = await $axios.get(`/shopify/order/${params.id}/status`);
      return {
        OrderInfo: resOrder.data.data.arrays,
        orderStatus: res.data.data,
      };
    } else if (process.client) {
      let param = {
        ids: params.id,
      };
      let resOrder = await shopifyService.getOrderList(param);
      let res = await shopifyService.getShopifyOrderStatus(params.id);
      return {
        orderStatus: res.data.data,
        OrderInfo: resOrder.data.data.arrays,
      };
    }
  },
  layout: "public",
  beforeMount() {
    this.getProductInfo();
    this.getStatusInterval();
  },
  mounted() {
    console.log(this.orderStatus);
  },
  data() {
    return {
      OrderInfo: [{ id: "", cost: "" }],
      orderStatus: 0,
      productInfo: [],
      loading: null,
    };
  },
  methods: {
    getProductInfo() {
      this.OrderInfo[0].line_items.map((item, index) => {
        this.productInfo.push({
          name: item.name,
          price: item.cost,
          quantity: item.quantity,
        });
      });
    },
    getStatusInterval() {
      let id = this.$route.params.id;
      if (this.orderStatus === -100) {
        var num = 0;
        var max = 10;
        (async function increment() {
          num++;
          let res = await shopifyService.getShopifyOrderStatus(id);
          let status = res.data.data;
          console.log(status);
          if (num < max && status === -100) {
            setTimeout(increment, 2000);
          } else {
            this.orderStatus = status;
          }
        })();
      }
    },
    async payAgain() {
      this.loading && this.loading.close();
      this.loading = Loading.service({
        target: "body",
      });
      try {
        let id = parseInt(this.OrderInfo[0].id);
        let res = await shopifyService.postShopifyOrderPay(id);
        let { code, message, data } = res.data;
        if (code !== 200) throw new Error(message);
        let stripe = await stripePromise;
        stripe?.redirectToCheckout({ sessionId: data.token });
      } catch (error) {
        this.$message({
          message: "Payment Failed",
          type: "error",
          duration: 5000,
          showClose: true,
        });
      }
      this.loading.close();
    },
  },
});
</script>
<style lang="less" scoped>
.spaystatus-container {
  width: 800px;
  // height: 450px;
  margin: 100px auto;
  border-radius: 5px;
  box-shadow: 0 0 5px 0 #e6e6e6;
  .spaysuccess-container {
    .spaysuccess-header {
      width: 100%;
      padding: 50px 50px;
      background-color: #e6fde0;
      display: flex;
      align-items: center;
      .pay-success {
        font-weight: 600;
        font-size: 16px;
      }
    }
    .spaypaying-header {
      width: 100%;
      padding: 50px 50px;
      background-color: #e0f7fd;
      display: flex;
      align-items: center;
      .pay-paying {
        font-weight: 600;
        font-size: 16px;
      }
    }
    .spayfail-header {
      width: 100%;
      padding: 50px 50px;
      background-color: #fde0e0;
      display: flex;
      align-items: center;
      .pay-fail {
        font-weight: 600;
        font-size: 16px;
      }
    }
    .spaysuccess-body {
      padding: 20px 50px;
    }
  }
}
.grid-content {
  line-height: 30px;
  font-size: 16px;
  &.left {
    // text-align: right;
  }
}
.el-col {
  button {
    width: 120px;
    background-color: #5b5cea;
    color: white;
    font-size: 16px;
    height: 50px;
    line-height: 25px;
    margin-top: 40px;
    &:hover {
      opacity: 0.8;
    }
  }
}
.icon-success {
  margin-right: 10px;
  &::before {
    font-size: 32px;
    color: #28da46;
  }
}
.icon-jinxingzhong {
  margin-right: 10px;
  &::before {
    font-size: 32px;
    color: #28b0da;
  }
}
.icon-zhifushibai {
  margin-right: 10px;
  &::before {
    font-size: 32px;
    color: #da2828;
  }
}

:root .ani_dot {
  font-family: simsun;
  display: inline-block;
  width: 1.5em;
  vertical-align: bottom;
  overflow: hidden;
  animation: dot 3s infinite step-start;
}
@keyframes dot {
  0% {
    width: 0;
    /* margin-right: 1.5em; */
  }

  33% {
    width: 0.5em;
    /* margin-right: 1em; */
  }

  66% {
    width: 1em;
    /* margin-right: .5em; */
  }

  100% {
    width: 1.5em;
    /* margin-right: 0; */
  }
}
</style>
