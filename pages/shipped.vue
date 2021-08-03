<template>
  <div ref="shipped" class="shipped-container">
    <el-drawer
      :visible.sync="drawer"
      :direction="direction"
      :modal-append-to-body="false"
      :append-to-body="true"
      :withHeader="false"
      type="display:none"
    >
      <shipped-drawer
        :fulfillments="fulfillments"
        :address="currentRow.shipping_address"
        :discount="currentRow.total_discounts"
        :subtotal="currentRow.subtotal_price"
        :lineItems="currentRow.line_items"
        :shipping="currentRow.shipping_lines"
        :tax="currentRow.total_tax"
        :total="currentRow.total_price_usd"
        :orderStatus="orderStatus"
      ></shipped-drawer>
    </el-drawer>
    <div ref="shipped" class="shipped-container">
      <p class="title">Shipped</p>
      <p class="sub-title">
      </p>
    </div>
    <div class="shipped-content">
      <el-table
        empty-text="No orders found"
        class="await-ship-table"
        :data="orders"
        style="width: 100%"
        @row-click="openRowDetail"
      >
        <el-table-column class="await-ship-table-item" label="Order">
          <template slot-scope="scope">
            <p>{{ scope.row.name }}</p>
          </template>
        </el-table-column>
        <el-table-column class="await-ship-table-item" label="ID">
          <template slot-scope="scope">
            <p>{{ scope.row.id }}</p>
          </template>
        </el-table-column>
        <el-table-column class="await-ship-table-item" label="Date">
          <template slot-scope="scope">
            <p>{{ scope.row.created_at | dateFormat("YYYY-MM-DD HH:MM") }}</p>
          </template>
        </el-table-column>
        <el-table-column class="await-ship-table-item" label="Items">
          <template slot-scope="scope">
            <p>
              {{
                scope.row.line_items
                  .map((item) => {
                    return item.quantity;
                  })
                  .reduce((pre, cur) => {
                    return pre + cur;
                  })
              }}
            </p>
          </template>
        </el-table-column>
        <el-table-column class="await-ship-table-item" label="Recipient">
          <template slot-scope="scope">
            <p>
              {{ scope.row.shipping_address.name }}
            </p>
          </template>
        </el-table-column>
        <el-table-column class="await-ship-table-item" label="Order Total">
          <template slot-scope="scope">
            <p>
              ${{ scope.row.current_total_price }}&nbsp;{{ scope.row.currency }}
            </p>
          </template>
        </el-table-column>
        <el-table-column class="await-ship-table-item" label="Total Cost">
          <template slot-scope="scope">
            <p>${{ scope.row.totalCost }}&nbsp;{{ scope.row.currency }}</p>
          </template>
        </el-table-column>
        <el-table-column class="await-ship-table-item" label="Shipping Service">
          <template slot-scope="scope">
            <p>{{ scope.row.line_items[0].fulfillment_service }}</p>
          </template>
        </el-table-column>
        <el-table-column class="await-ship-table-item" label="Financial Status">
          <template slot-scope="scope">
            <p>{{ scope.row.financial_status }}</p>
          </template>
        </el-table-column>
        <el-table-column
          class="await-ship-table-item"
          label="Fulfillment Status"
        >
          <template slot-scope="scope">
            <p>{{ scope.row.fulfillment_status || "null" }}</p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-section">
      <div @click="handlePre" :class="pre ? 'pre' : 'pre cursor'">
        <span v-if="pre" class="el-icon-arrow-left orders-pre-icon"></span>
        <span v-else class="el-icon-arrow-left orders-pre-icon-invalid"></span>
      </div>
      <div @click="handleNext" :class="next ? 'next' : 'next cursor'">
        <span v-if="next" class="el-icon-arrow-right orders-next-icon"></span>
        <span
          v-else
          class="el-icon-arrow-right orders-next-icon-invalid"
        ></span>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import Vue from "vue";
import { Server } from "~/utils/server";
import { EventBus } from "~/event-bus";
import { mapMutations, mapState } from "vuex";
import ShippedDrawer from "~/components/ShippedDrawer.vue";
import shopifyService from "~/global/service/shopify.js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe("pk_test_kKiIIn5jbIixQ96SV4NpPZyf00hulVQYuC");
import { Loading } from "element-ui";
export default Vue.extend({
  layout: "base",
  async middleware({ route, store, app, redirect }) {
    let fullPath = route.path;
    var pageRedirect = (token?: any, id?: any) => {
      let result = false;
      let toRep = [/\/slogin.*/, /\/ssignup.*/];
      let flag = toRep.filter((reg) => {
        return reg.test(fullPath);
      });
      if (!token && !id) {
        if (fullPath !== "/" && flag.length < 1) {
          redirect("/slogin?from=fe");
          result = true;
        }
        result = true;
      } else if (id) {
        if (flag.length > 0) {
          redirect("/products");
          result = true;
        }
      }
      return result;
    };
    let token = app.$cookies.get("token");
    if (pageRedirect(token)) return;
    if (store.state.adminUser.user.id === null) {
      await store.dispatch("adminUser/getUser", token);
    }
    if (pageRedirect(undefined, store.state.adminUser.user.id)) return;
  },
  async fetch({ app, store }) {
    let params = {
      fulfillmentStatus: "shipped",
      limit: 10,
    };
    let arrays, pre, next;
    if (process.server) {
      let res = await app.$axios.get(
        `/shopify/orders?fulfillmentStatus=shipped&limit=10`
      );
      if (res.data.code === 200) {
        ({ arrays, pre, next } = res.data.data);
      }
    } else if (process.client) {
      let res = await shopifyService.getOrderList(params);
      if (res.data.code === 200) {
        ({ arrays, pre, next } = res.data.data);
      }
    }
    store.commit("shopifyOrder/m_render_shopifyOrders", arrays);
    store.commit("shopifyOrder/m_get_shopifyPre", pre);
    store.commit("shopifyOrder/m_get_shopifyNext", next);
    store.commit("shopifyOrder/m_get_shopifyFulfillmentStatus", "shipped");
    store.commit("shopifyOrder/m_get_shopifyPayPadding", 0);
  },
  components: {
    ShippedDrawer,
  },
  data() {
    return {
      noOrder: false,
      server: new Server(),
      currentRow: {},
      fulfillments: [],
      drawer: false,
      direction: "rtl",
      orderStatus: 0,
    };
  },
  computed: {
    ...mapState("shopifyOrder", ["orders", "pre", "next", "fulfillmentStatus"]),
  },
  beforeMount() {
    this.server.init();
  },
  methods: {
     ...mapMutations("shopifyOrder", [
      "m_render_shopifyOrders",
      "m_get_shopifyPre",
      "m_get_shopifyNext",
      "m_get_shopifyFulfillmentStatus",
    ]),
    payStatus(val:number) {
      if (val > 0) {
        return "Paid";
      } else if (val === -100) {
        return "Paying";
      } else {
        return "Unpaid";
      }
    },
    async openRowDetail(row:any, column:any, event:any) {
      if (
        event.target.className.indexOf("shipped-checkout") == -1 &&
        event.target.parentNode.className.indexOf("shipped-checkout") == -1
      ) {
        this.orderStatus = row.payStatus;
        this.currentRow = row;
        this.fulfillments = (this.currentRow as any).fulfillments;
        this.drawer = true;
      }
    },
  },
});
</script>
<style lang="less" scoped>
.shipped-container {
  .title {
    width: 100%;
    font-size: 2rem;
    font-weight: 600;
  }
  .sub-title {
    width: 100%;
    font-size: 1.2rem;
    color: rgba(109, 113, 117, 1);
  }
  .shipped-content {
    width: 100%;
    background-color: #fff;
    border-radius: 10px;
    margin-top: 10px;
    margin-bottom: 20px;
    padding: 0 20px;
    box-shadow: 0px 0px 5px rgba(23, 24, 24, 0.05);
    border: solid 1px rgba(23, 24, 24, 0.05);
    /deep/ .el-table__row {
      &:hover {
        cursor: pointer;
      }
    }
  }
}
/deep/ .el-table__row {
  /deep/ .el-table_2_column_7 {
    width: 80% !important;
  }
}
.shipped-checkout {
  width: 86px;
}
.pagination-section {
  width: 100%;
  margin: 16px auto;
  .pre {
    width: 38px;
    height: 36px;
    border: solid 1px #d2d5d8;
    border-radius: 5px 0 0 5px;
    margin: 0 5px;
    cursor: pointer;
    &.cursor {
      cursor: not-allowed;
    }
    .el-icon-arrow-left {
      &.orders-pre-icon {
        &:before {
          line-height: 36px;
          margin: 0 12px;
          font-size: 14px;
          color: #000;
        }
      }
    }
    .el-icon-arrow-left {
      &.orders-pre-icon-invalid {
        &:before {
          line-height: 36px;
          margin: 0 12px;
          font-size: 14px;
          color: #d2d5d8;
        }
      }
    }
  }
  .next {
    width: 38px;
    height: 36px;
    border: solid 1px #d2d5d8;
    border-radius: 0 5px 5px 0;
    margin: 0 5px;
    cursor: pointer;
    &.cursor {
      cursor: not-allowed;
    }
    .el-icon-arrow-right {
      &.orders-next-icon {
        &:before {
          line-height: 36px;
          margin: 0 12px;
          font-size: 14px;
          color: #000;
        }
      }
    }
    .el-icon-arrow-right {
      &.orders-next-icon-invalid {
        &:before {
          line-height: 36px;
          margin: 0 12px;
          font-size: 14px;
          color: #d2d5d8;
        }
      }
    }
  }
}
</style>

