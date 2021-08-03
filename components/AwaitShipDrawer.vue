<template>
  <div class="await-ship-drawer-container">
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
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="Recipient/Buyer" name="1">
        <span class="side-icon" v-html="recipientHomeIcon"></span>
        <p class="recipient-name">
          {{ address.first_name }}{{ address.last_name }}
        </p>
        <p class="recipient-zip">{{ address.zip }}</p>
        <p class="recipient-address-one">{{ address.address1 }}</p>
        <p class="recipient-address-two">{{ address.address2 }}</p>
        <p class="recipient-phone">{{ address.phone }}</p>
      </el-collapse-item>
    </el-collapse>
    <!-- <p class="shipping-method">Shipping method:First Class Package</p> -->
    <!-- <div class="ship-from-section">
      <label class="label">Ship from</label>
      <el-select v-model="shipFromValue" placeholder="Ship from">
        <el-option
          v-for="item in location"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <span class="required" v-if="NullShipFromValue">requierd</span>
    </div>
    <div class="service-company-section">
      <label class="label">Service company</label>
      <el-input v-model="serviceValue" placeholder="Service company"></el-input>
      <span class="required" v-if="NullServiceValue">requierd</span>
    </div>
    <div class="tracking-url-section">
      <label class="label">Tracking url</label>
      <el-input v-model="trackingUrl" placeholder="Tracking url"></el-input>
      <span class="required" v-if="NullTrackingUrl">requierd</span>
    </div>
    <div
      v-for="(item, i) of trackingUrlObj"
      :key="'info-' + i"
      class="tracking-other-section"
    >
      <div class="tracking-url-section">
        <label class="label">Tracking url</label>
        <el-input v-model="item.str" placeholder="Tracking url"></el-input>
        <el-button
          class="delete"
          size="mini"
          type="danger"
          @click="deleteUrlRule(i)"
        >
          Delete
        </el-button>
      </div>
    </div>
    <div class="tracking-number-section">
      <label class="label">Tracking number</label>
      <el-input
        v-model="trackingNumber"
        placeholder="Tracking number"
      ></el-input>
      <span class="required" v-if="NullTrackingNumber">requierd</span>
    </div>
    <div
      v-for="(item, index) of trackingNumObj"
      :key="index"
      class="tracking-other-section"
    >
      <label class="label">Tracking number</label>
      <el-input v-model="item.str" placeholder="Tracking number"></el-input>
      <el-button
        class="delete"
        size="mini"
        type="danger"
        @click="deleteNumberRule(index)"
      >
        Delete
      </el-button>
    </div> -->
    <!-- <label class="label">Service company</label>
    <el-input v-model="serviceValue" placeholder="Service company"></el-input>
    <label class="label">Service company</label>
    <el-input v-model="serviceValue" placeholder="Service company"></el-input> -->

    <!-- <el-select v-model="serviceValue" placeholder="Service">
      <el-option
        v-for="item in service"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
        <span style="float: left">{{ item.label }}</span>
        <span style="float: right; color: #8492a6; font-size: 13px">{{
          item.value
        }}</span>
      </el-option>
    </el-select> -->
    <!-- <label class="label">Package</label>
    <el-select v-model="serviceValue" placeholder="Package">
      <el-option
        v-for="item in service"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
        <span style="float: left">{{ item.label }}</span>
        <span style="float: right; color: #8492a6; font-size: 13px">{{
          item.value
        }}</span>
      </el-option>
    </el-select> -->
    <!-- <label class="label">Weight</label>
    <el-input-number
      v-model="weightNum"
      controls-position="right"
      @change="handleChange"
      :min="1"
    ></el-input-number>
    <label class="label">Lenght</label>
    <el-input-number
      v-model="lenghtNum"
      controls-position="right"
      @change="handleChange"
      :min="1"
    ></el-input-number>
    <label class="label">Width</label>
    <el-input-number
      v-model="widthNum"
      controls-position="right"
      @change="handleChange"
      :min="1"
    ></el-input-number>
    <label class="label">Height</label>
    <el-input-number
      v-model="heightNum"
      controls-position="right"
      @change="handleChange"
      :min="1"
    ></el-input-number>
    <label class="label">Shipping price</label>
    <el-input-number
      v-model="shippingPriceNum"
      controls-position="right"
      @change="handleChange"
      :min="0"
    ></el-input-number>
    <label class="label">Delivery time</label>
    <el-date-picker
      v-model="deliveryTime"
      type="date"
      placeholder="Delivery time"
    >
    </el-date-picker> -->
    <!-- <div class="service-option-section">
      <p class="service-options-title">Service options</p>
      <p class="service-options-subtitel">
        Additional services may induce extra charges
      </p>
      <el-checkbox-group v-model="checkService">
        <el-checkbox label="Signature"></el-checkbox>
        <el-checkbox label="Courier insurance"></el-checkbox>
      </el-checkbox-group>
    </div> -->
    <!-- <div class="item-edit-section">
      <div class="item-edit-head">
        <span class="item-num">Item{{ item.quantity }}</span>
        <span class="itemEdit" @click="eidtItem">Edit</span>
      </div>
      <el-table :data="item" style="width: 100%">
        <el-table-column width="180">
          <template slot-scope="scope">
            <p class="item-name">${{ scope.row.name }}</p>
            <p class="item-origin">
              {{ scope.row.origin_location.country_code }}
            </p>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <p class="item-name">
              {{ scope.row.price }})&nbsp;x &nbsp;{{ scope.row.quantity }}
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="collapse-section">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="Recipient/Buyer" name="1">
          <span class="side-icon" v-html="recipientHomeIcon"></span>
          <p class="recipient-name">
            {{ address.first_name }}{{ address.last_name }}
          </p>
          <p class="recipient-zip">{{ address.zip }}</p>
          <p class="recipient-address-one">{{ address.address1 }}</p>
          <p class="recipient-address-two">{{ address.address2 }}</p>
          <p class="recipient-phone">{{ address.phone }}</p>
          <span class="recipient-edit" @click="recipietnEdit">{{ Edit }}</span>
        </el-collapse-item>
        <el-collapse-item title="Summary" name="2">
          <div class="summary-subtotal">
            <span class="subtotal-left">Subtotal</span>
            <span class="subtotal-right">{{ subtotal }}</span>
          </div>
          <div class="summary-discount">
            <span class="discount-left">Discount</span>
            <span class="discount-right">{{ discount }}</span>
          </div>
          <div class="summary-shipping">
            <span class="shipping-left">Shipping</span>
            <span class="shipping-right">{{ shipping.price }}</span>
          </div>
          <div class="summary-tax">
            <span class="tax-left">Tax</span>
            <span class="tax-right">{{ tax }}</span>
          </div>
          <div class="summary-total">
            <span class="total-left">Total</span>
            <span class="total-right">{{ total }}</span>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div> -->
    <!-- <div class="summary-sectio">
        <el-collapse v-model="activeNames">

        </el-collapse>
      </div> -->
    <!-- <el-button @click="save">Save</el-button> -->

    <div class="btn-section">
      <!-- <div class="btn-add-section">
        <el-button class="add-tracking-url-btn" @click="addRule" size="mini">
          Add tracking url
        </el-button>
        <el-button
          size="mini"
          class="add-tracking-num-btn"
          @click="addNumberRule"
        >
          Add tracking number</el-button
        >
      </div> -->
      <el-button
        v-if="confirmStatus === '0'"
        :loading="loading"
        class="mark-shipped-btn"
        @click="markShipped()"
        type="primary"
        >{{ loading ? "Confirming" : "Confirm to Ship" }}</el-button
      >
      <el-button
        v-if="confirmStatus === '1'"
        :loading="loading"
        class="mark-shipped-btn-invalid"
        type="primary"
        >Confirmed</el-button
      >
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { recipientHome, recipientName } from "~/data/svg";
import shopifyService from "~/global/service/shopify";
import { Loading } from "element-ui";
import { EventBus } from "~/event-bus.js";
export default Vue.extend({
  props: {
    location: Array,
    id: Number,
    lineItems: Array,
    address: Object,
    confirmStatus: String,
  },
  // { item: Object },
  // { id: Number },
  // { address: Object },
  // { subtotal: Number },
  // { discount: Number },
  // { shipping: Object },
  // { tax: Number },
  // { total: Number },
  data() {
    return {
      activeNames: ["1"],
      recipientHomeIcon: "",
      recipientNameIcon: "",
      direction: "rtl",
      shipFromValue: "",
      serviceValue: "",
      trackingUrls: [],
      trackingUrl: "",
      trackingUrlObj: [],
      trackingNumbers: [],
      trackingNumber: "",
      trackingNumObj: [],
      awaitshipForm: {
        location_id: Number,
        tracking_numbers: Array,
        tracking_urls: Array,
        tracking_company: String,
      },
      NullTrackingUrl: false,
      NullTrackingNumber: false,
      NullShipFromValue: false,
      NullServiceValue: false,
      loading: false,
      check:false,
      // rules: {
      //   trackingUrl: [{ required: true, message: "required" }],
      //   trackingNumber: [{ required: true, message: "required" }],
      //   shipFromValue: [{ required: true, message: "required" }],
      //   serviceValue: [{ required: true, message: "required" }],
      // },

      // i: 1,
      // weightNum: 1,
      // lenghtNum: 1,
      // widthNum: 1,
      // heightNum: 1,
      // deliveryTime: "",
      // checkService: [],
      // activeNames: ["1"],
    };
  },
  watch: {
    trackingUrlObj: {
      immediate: true,
      deep: true,
      handler(nVal) {
        if (nVal.length) {
          let filterArr = nVal.filter((item) => {
            return item.str !== "";
          });
          let arr = [];
          filterArr.map((item) => {
            arr.push(item.str);
          });
          this.trackingUrls = [this.trackingUrl, ...arr];
        }
      },
    },
    trackingNumObj: {
      immediate: true,
      deep: true,
      handler(nVal) {
        if (nVal.length) {
          let filterArr = nVal.filter((item) => {
            return item.str !== "";
          });
          let arr = [];
          filterArr.map((item) => {
            arr.push(item.str);
          });
          this.trackingNumbers = [this.trackingNumber, ...arr];
        }
      },
    },
  },
  mounted() {
    this.getIcon();
  },
  // computed:{
  //   check(){
  //     return this.confirmStatus=''
  //   }
  // },
  methods: {
    getIcon() {
      this.recipientHomeIcon = recipientHome;
      this.recipientNameIcon = recipientName;
    },
    handleChange(val) {
      console.log(val);
    },
    eidtItem() {},
    recipietnEdit() {},
    deleteUrlRule(index) {
      this.trackingUrlObj.splice(index, 1);
    },
    deleteNumberRule(index) {
      this.trackingNumObj.splice(index, 1);
    },
    addRule() {
      var obj = {
        str: "",
      };
      this.trackingUrlObj.push(obj);
    },
    addNumberRule() {
      var obj = {
        str: "",
      };
      this.trackingNumObj.push(obj);
    },
    // save() {},
    async markShipped() {
      if (this.confirmStatus === "0") {
        this.loading = true;
        let res = await shopifyService.putShopifyOrderConfirm(this.id);
        if (res.data.code === 200) {
          this.$message({
            type: "success",
            message: "Confirm success!",
          });
          // this.check=true;
          // this.confirmStatus='1';
          // EventBus.$emit('sendStatus','1');
          this.loading = false;
          location.reload();
        }
      }
      // if (!this.trackingUrl) {
      //   this.NullTrackingUrl = true;
      // } else {
      //   this.NullTrackingUrl = false;
      // }
      // if (!this.trackingNumber) {
      //   this.NullTrackingNumber = true;
      // } else {
      //   this.NullTrackingNumber = false;
      // }
      // if (!this.shipFromValue) {
      //   this.NullShipFromValue = true;
      // } else {
      //   this.NullShipFromValue = false;
      // }
      // if (!this.serviceValue) {
      //   this.NullServiceValue = true;
      // } else {
      //   this.NullServiceValue = false;
      // }
      // if (
      //   !this.NullTrackingUrl &&
      //   !this.NullTrackingNumber &&
      //   !this.NullShipFromValue &&
      //   !this.NullServiceValue
      // ) {
      //   this.awaitshipForm.location_id = this.shipFromValue;
      //   this.awaitshipForm.tracking_company = this.serviceValue;
      //   this.awaitshipForm.tracking_urls =
      //     this.trackingUrls.length > 0
      //       ? this.trackingUrls
      //       : [this.trackingNumber];
      //   this.awaitshipForm.tracking_numbers =
      //     this.trackingNumbers.length > 0
      //       ? this.trackingNumbers
      //       : [this.trackingUrl];
      //   let fulfillment = this.awaitshipForm;
      //   let res = await shopifyService.putShopifyOrder(this.id, {
      //     fulfillment
      //   });
      //   if (res.data.code === 200) {
      //     this.$message({
      //       type: "success",
      //       message: "Mark shipped success!",
      //     });
      //     this.loading = false;
      //     location.reload();
      //   } else {
      //     this.$message({
      //       type: "error",
      //       message: "Mark shipped error!",
      //     });
      //     this.loading = false;
      //   }
      //  this.loading && this.loading.close();
      // this.loading = Loading.service({
      //   target: ".mark-shipped-btn",
      //   background: "rgba(255,255,255,0.5)",
      // });
      // await shopifyService.putShopifyOrder
      // }

      // console.log(
      //   this.awaitshipForm,
      //   this.NullTrackingUrl,
      //   this.NullTrackingNumber,
      //   this.NullShipFromValue,
      //   this.NullServiceValue
      // );

      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     console.log("valid success");
      //   } else {
      //     console.log("valid error");
      //     return false;
      //   }
      // });
    },
  },
});
</script>
<style lang="less" scoped>
.await-ship-drawer-container {
  padding: 18px;
  margin-bottom: 90px;
  .ship-from-section {
    width: 100%;
    margin-bottom: 10px;
  }
  .service-company-section {
    width: 100%;
    margin-bottom: 10px;
  }
  .tracking-url-section {
    width: 100%;
    margin-bottom: 10px;
  }
  .tracking-number-section {
    width: 100%;
    margin-bottom: 10px;
  }
  .btn-section {
    background-color: #fff;
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // border-top: solid 1px #dcdfe6;
    position: absolute;
    bottom: 0;
    .btn-add-section {
      .add-tracking-url-btn {
        margin-bottom: 8px;
      }
      .add-tracking-num-btn {
        margin: 0;
      }
    }
    // .mark-shipped-btn {
    //   width: 128px;
    //   height: 36px;
    // }
    .mark-shipped-btn-invalid {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}
.label {
  display: inline-block;
  width: 100%;
  // margin-bottom: 3px;
  font-size: 14px;
}
.delete {
  position: absolute;
  bottom: 0;
  right: 0;
}
.tracking-other-section {
  height: 100px;
  margin-bottom: 10px;
  position: relative;
}
.item-title {
  // margin-top: 20px;
  // padding-top: 10px;
  padding-left: 10px;
  // border-top: solid 1px #ebeef5;
  color: #202223;
  font-weight: 500;
  font-size: 15px;
}
/deep/ .el-table__header-wrapper {
  display: none !important;
}
.recipient-name,
.recipient-zip,
.recipient-address-one,
.recipient-address-two,
.recipient-phone {
  line-height: 30px;
  color: #606266;
}
.required {
  color: red;
}
</style>
