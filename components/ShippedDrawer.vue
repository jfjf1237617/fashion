<template>
  <div class="shipped-drawer-container">
    <div class="shipped-info">
      <!-- <a :href="fulfillments[0].tracking_url" class="shipped-num">{{
        fulfillments[0].id
      }}</a> -->
      <p @click="checkShip(fulfillments[0].tracking_url)" class="shipped-num">
        {{ fulfillments[0].id }}
      </p>
      <p class="shipped-company">{{ fulfillments[0].tracking_company }}</p>
      <p class="shipped-address">{{ address ? address.city : "" }}</p>
      <p class="shipped-create">{{ fulfillments[0].created_at }}</p>
      <p class="order-status">
        Pay Status:
        {{ status }}
      </p>
    </div>
    <div class="item-info">
      <p class="item-title">Item({{ lineItems.length }})</p>
      <el-table :data="lineItems" style="width: 100%">
        <el-table-column width="180">
          <template slot-scope="scope">
            <p class="item-name">{{ scope.row.name }}</p>
            <!-- <p class="item-origin">
              {{ scope.row.destination_location.country_code }}
            </p> -->
          </template>
        </el-table-column>
        <el-table-column prop="address">
          <template slot-scope="scope">
            <p class="item-name">
              ${{ scope.row.price }}&nbsp;x &nbsp;{{ scope.row.quantity }}
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="recipient-section">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="Recipient/Buyer" name="1">
          <span class="side-icon" v-html="recipientHomeIcon"></span>
          <p class="recipient-name">
            {{ address ? address.first_name : ""
            }}{{ address ? address.last_name : "" }}
          </p>
          <p class="recipient-zip">{{ address ? address.zip : "" }}</p>
          <p class="recipient-address-one">
            {{ address ? address.address1 : "" }}
          </p>
          <p class="recipient-address-two">
            {{ address ? address.address2 : "" }}
          </p>
          <p class="recipient-phone">{{ address ? address.phone : "" }}</p>
        </el-collapse-item>
        <el-collapse-item title="Summary" name="2">
          <div class="summary-subtotal">
            <span class="subtotal-left">Subtotal</span>
            <span class="subtotal-right">${{ subtotal }}</span>
          </div>
          <div class="summary-discount">
            <span class="discount-left">Discount</span>
            <span class="discount-right"
              >-${{ lineItems[0].total_discount }}</span
            >
          </div>
          <div class="summary-shipping">
            <span class="shipping-left">Shipping</span>
            <span class="shipping-right"
              >${{ shipping[0] ? shipping[0].price : "0.00" }}</span
            >
          </div>
          <div class="summary-tax">
            <span class="tax-left">Tax</span>
            <span class="tax-right">${{ tax }}</span>
          </div>
          <div class="summary-total">
            <span class="total-left">Total</span>
            <span class="total-right">${{ total }}</span>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { recipientHome, recipientName } from "~/data/svg";
export default Vue.extend({
  props: {
    fulfillments: Array,
    address: Object,
    discount: String,
    subtotal: String,
    lineItems: Array,
    shipping: Array,
    tax: String,
    total: String,
    orderStatus: Number,
  },
  computed: {
    status() {
      if (this.orderStatus > 0) {
        return "Paid";
      } else if (this.orderStatus === -100) {
        return "Paying";
      } else {
        return "Unpaid";
      }
    },
  },
  data() {
    return {
      activeNames: ["1", "2"],
      recipientHomeIcon: "",
      recipientNameIcon: "",
    };
  },
  mounted() {
    this.getIcon();
  },
  methods: {
    checkShip(val) {
      window.open(val);
    },
    getIcon() {
      this.recipientHomeIcon = recipientHome;
      this.recipientNameIcon = recipientName;
    },
    handleChange(val) {
      console.log(val);
    },
  },
});
</script>
<style lang="less" scoped>
.shipped-drawer-container {
  padding: 18px;
  margin-bottom: 90px;
  font-size: 14px;
  line-height: 20px;
  .shipped-num {
  }
  .shipped-info {
    padding-left: 10px;
    .shipped-num,
    .shipped-company,
    .shipped-address,
    .shipped-create,
    .order-status {
      line-height: 30px;
      color: #606266;
    }
    .shipped-num {
      color: #006fbb;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
/deep/ .el-table__header-wrapper {
  display: none !important;
}
.item-title {
  margin-top: 20px;
  padding-top: 10px;
  padding-left: 10px;
  border-top: solid 1px #ebeef5;
  color: #202223;
  font-weight: 500;
  font-size: 15px;
}
.recipient-name,
.recipient-zip,
.recipient-address-one,
.recipient-address-two,
.recipient-phone,
.subtotal-left,
.subtotal-right,
.discount-left,
.discount-right,
.shipping-left,
.shipping-right,
.tax-left,
.tax-right,
.total-left,
.total-right {
  line-height: 30px;
  color: #606266;
}
.summary-subtotal,
.summary-discount,
.summary-shipping,
.summary-tax,
.summary-total {
  display: flex;
  justify-content: space-between;
}
</style>
