<template>
  <div ref="awaitShip" class="await-ship-container">
    <el-drawer
      :visible.sync="drawer"
      :direction="direction"
      :modal-append-to-body="false"
      :append-to-body="true"
      :withHeader="false"
      type="display:none"
    >
      <await-ship-drawer
        :id="currentRow.id"
        :location="location"
        :lineItems="currentRow.line_items"
        :address="currentRow.shipping_address"
        :confirmStatus="
          currentRow.fullfillment_confirm_status
            ? currentRow.fullfillment_confirm_status
            : this.status
            ? this.status
            : '0'
        "
      ></await-ship-drawer>
    </el-drawer>
    <p class="title">Awaiting Shipment</p>
    <p class="sub-title">
      <!-- Paid but unfulfilled orders are shown here. Create a test label and the
      order will be moved to label generated. -->
    </p>
    <div class="await-ship-content">
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
              {{
                scope.row.shipping_address
                  ? scope.row.shipping_address.name
                  : ""
              }}
            </p>
            <!-- <p>
              {{ scope.row.customer.first_name }}&nbsp;{{
                scope.row.customer.last_name
              }}
            </p> -->
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
        <el-table-column class="await-ship-table-item" label="Merchant Pay">
          Paid
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
import { mapMutations, mapState } from "vuex";
import shopifyService from "~/global/service/shopify";
import awaitShipDrawer from "~/components/AwaitShipDrawer.vue";
import { EventBus } from "~/event-bus.js";
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
          redirect("/");
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
      fulfillmentStatus: "unshipped",
      limit: 10,
    };
    let arrays, pre, next;
    if (process.server) {
      
      let res = await app.$axios.get(
        `/shopify/orders?fulfillmentStatus=unshipped&limit=10`
      );
        console.log(res.data.data,"server");
      if (res.data.code === 200) {
        ({ arrays, pre, next } = res.data.data);
      }
    } else if (process.client) {
      let res = await shopifyService.getOrderList(params);
      console.log(res.data.data);
      
      if (res.data.code === 200) {
        ({ arrays, pre, next } = res.data.data);
      }
      console.log(arrays);
      
    }
    store.commit("shopifyOrder/m_render_shopifyOrders", arrays);
    store.commit("shopifyOrder/m_get_shopifyPre", pre);
    store.commit("shopifyOrder/m_get_shopifyNext", next);
    store.commit("shopifyOrder/m_get_shopifyFulfillmentStatus", "unshipped");
    store.commit("shopifyOrder/m_get_shopifyPayPadding", 0);
  },
  components: {
    awaitShipDrawer,
  },
  data() {
    return {
      noOrder: false,
      orderFilter: [],
      server: new Server(),
      direction: "rtl",
      drawer: false,
      currentRow: {},
      status: "",
      loading: null,
    };
  },
  computed: {
    ...mapState("shopifyOrder", [
      "orders",
      "pre",
      "next",
      "fulfillmentStatus",
      "location",
      "payPadding",
    ]),
  },
  beforeMount() {
    this.server.init();
    // this.getlocationList();
  },
  mounted() {
    console.log(this.orders);
  },
  methods: {
    ...mapMutations("shopifyOrder", [
      "m_render_shopifyOrders",
      "m_get_shopifyPre",
      "m_get_shopifyNext",
      "m_get_shopifyFulfillmentStatus",
      "m_get_shopifyLocation",
    ]),
    openRowDetail(row: any, column: any, event: any) {
      EventBus.$on("sendStatus", (msg: any) => {
        this.status = msg;
      });
      this.currentRow = row;
      this.drawer = true;
    },
    async handlePre() {
      if (this.pre) {
        let params = {};
        if (this.payPadding === 1) {
          params = {
            url: this.pre,
            fulfillmentStatus: this.fulfillmentStatus,
            limit: 10,
            payPadding: 1,
          };
        } else {
          params = {
            url: this.pre,
            fulfillmentStatus: this.fulfillmentStatus,
            limit: 10,
          };
        }
        this.loading && (this.loading as any).close();
        (this.loading as any) = Loading.service({
          target: ".el-main",
        });
        const res = await shopifyService.getOrderList(params);
        (this.loading as any).close();
        let orders = res.data.data.arrays;
        let pre = res.data.data.pre;
        let next = res.data.data.next;
        let message = res.data.message;
        let code = res.data.code;
        if (code !== 200) {
          this.$message({
            message,
            type: "error",
          });
        } else {
          this.m_render_shopifyOrders(orders);
          this.m_get_shopifyPre(pre);
          this.m_get_shopifyNext(next);
        }
      }
    },
    async handleNext() {
      if (this.next) {
        let params = {};
        if (this.payPadding === 1) {
          params = {
            url: this.next,
            fulfillmentStatus: this.fulfillmentStatus,
            limit: 10,
            payPadding: 1,
          };
        } else {
          params = {
            url: this.next,
            fulfillmentStatus: this.fulfillmentStatus,
            limit: 10,
          };
        }
        this.loading && (this.loading as any).close();
        (this.loading as any) = Loading.service({
          target: ".el-main",
        });
        const res = await shopifyService.getOrderList(params);
        (this.loading as any).close();
        let orders = res.data.data.arrays;
        let pre = res.data.data.pre;
        let next = res.data.data.next;
        let message = res.data.message;
        let code = res.data.code;
        if (code !== 200) {
          this.$message({
            message,
            type: "error",
          });
        } else {
          this.m_render_shopifyOrders(orders);
          this.m_get_shopifyPre(pre);
          this.m_get_shopifyNext(next);
        }
      }
    },
    async getlocationList() {
      let res = await shopifyService.getLocation();
      if (res.data.code === 200) {
        this.m_get_shopifyLocation(res.data.data);
      }
    },
  },
});
</script>
<style lang="less" scoped>
.await-ship-container {
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
  .await-ship-content {
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
/deep/ .el-drawer__body {
  overflow-x: hidden !important;
}
/deep/ .el-table__row {
  /deep/ .el-table_2_column_7 {
    width: 80% !important;
  }
}
/deep/ .el-table__empty-block {
  /deep/ .el-table__empty-text {
    /deep/ &::before {
      content: "no" !important;
      padding-top: 50px;
    }
  }
}
.pagination-section {
  width: 100%;
  margin: 16px auto;
  display: flex;
  justify-content: center;
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
<style lang="less">
.el-table__header{
  .cell{
    word-break: keep-all !important;
  }
}
.el-table__row {
  .cell {
    word-break: keep-all !important;
  }
}
</style>
