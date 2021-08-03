<template>
  <div class="main-header-container">
    <div class="filter-container">
      <div class="filter-tool">
        <div class="search-icon-section" v-html="searchIcon"></div>
        <input
          class="border filter-input"
          type="text"
          placeholder="Search products"
          :value="searchProduct"
          @keyup.enter="handleSearch($event)"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { EventBus } from "../event-bus";
import { omit, search, clear } from "~/data/svg";
import debounce from "../utils/debounce.js";
import productService from "~/global/service/product.js";
import { mapState, mapMutations } from "vuex";
import { Loading } from "element-ui";
export default Vue.extend({
  data() {
    return {
      sortBy: ["none", "Cost (low to high)", "Cost (high to low)"],
      sort: "",
      num: "",
      rtlDrawer: false,
      activeNames: [],
      loading: null,
      screenWidth: "",
      activeName: "",
      omitIcon: "",
      searchIcon: "",
      clearIcon: "",
      searchInput: "",
    };
  },
  methods: {
    handleCollapse() {},
    handleClick(tab:any, event:any) {},
    clearRadio() {
      this.m_update_clearShippingFee();
      Array.from(document.getElementsByName("check-ship")).map((item) => {
        (item as any).checked = false;
      });
    },
    handleSort(command:any) {
      this.sort = command;
      EventBus.$emit("sendSort", this.sort);
      if (this.sort === "Cost (low to high)") {
        this.m_sort_productLowToHigh();
        console.log(this.productList);
      }
    },
    getIcon() {
      this.omitIcon = omit;
      this.searchIcon = search;
      this.clearIcon = clear;
    },
    resize() {
      this.screenWidth = String(document.body.clientWidth);
    },
    async handleSearch(e:any) {
      this.m_update_searchProduct(e.target.value);
      let obj = JSON.parse(JSON.stringify(this.$route.query));
      if (e.target.value) {
        Object.assign(obj, { search: e.target.value, page: 1 });
        this.$router.push({ query: obj });
      } else {
        obj['search']=undefined;
        Object.assign(obj, { page: 1 });
        this.$router.push({ query: obj });
      }
    },
    ...mapMutations("category", [
      "m_clear_checkCategories",
      "m_update_checkCategories",
      "m_get_checkCategories",
    ]),
    ...mapMutations("shippingFee", [
      "m_update_clearShippingFee",
      "m_update_checkShippingFee",
    ]),
    ...mapMutations("product", [
      "m_update_productMsg",
      "m_update_searchProduct",
      "m_sort_productLowToHigh",
    ]),
    ...mapMutations("route", ["m_change_routeOption_query_search"]),
  },
  computed: {
    ...mapState("category", ["categories", "checkCategories", "categoryId"]),
    ...mapState("shippingFee", ["shippingFees", "checkShippingFee"]),
    ...mapState("product", [
      "productList",
      "pageNum",
      "pageSize",
      "totalPage",
      "total",
      "message",
      "code",
      "showNum",
      "searchProduct",
    ]),
  },
  mounted() {
    this.resize();
    window.addEventListener("resize", () => {
      debounce(this.resize);
    });
    this.getIcon();
  },
  watch: {
    screenWidth(val) {
      this.screenWidth = val;
    },
  },
});
</script>
<style lang="less" scoped>
.main-header-container {
  // min-width: 700px;
  background-color: #f6f6f7;
  color: #333;
  line-height: 2.5rem;
  margin-top: -32px;
  .title {
    font-size: 2rem;
    font-weight: 600;
  }
  .sub-title {
    font-size: 1.2rem;
    color: rgba(109, 113, 117, 1);
  }
  .filter-container {
    background-color: #fff;
    // border-radius: 10px 10px 0px 0px;
    margin-top: 10px;
    margin-bottom: 20px;
    padding: 0 20px;
    box-shadow: 0px 0px 5px rgba(23, 24, 24, 0.05);
    border: solid 1px rgba(23, 24, 24, 0.05);
    .filter-tool {
      position: relative;
      display: flex;
      align-items: center;
      margin: 30px 0;
      .search-icon-section {
        position: absolute;
        height: 38px;
        margin: 0 10px;
        display: flex;
        align-items: center;
        width: 22px;
        .search-icon {
          line-height: 38px;
        }
      }
      .filter-input {
        flex: 1;
        line-height: 200%;
        padding: 5px 12px 5px 35px;
        border-radius: 19px;
      }
      .filter-option {
        min-width: 358px;
        margin-left: 20px;
        display: flex;
        align-items: center;
        height: 38px;
        .el-dropdown-link,
        .filter-more {
          padding: 9px 16px;
          font-size: 14px;
          color: #202223;
          font-weight: 600;
          cursor: pointer;
        }
      }
    }
    .filter-tag {
      width: 100%;
      line-height: 0;
    }
    .filter-sort {
      height: 60px;
      padding: 10px 0;
      display: flex;
      align-items: center;
      .show-num {
        font-size: 14px;
        flex: 1;
      }
    }
  }
}
.clear {
  cursor: pointer;
}
.el-checkbox {
  padding: 0;
}
.dropdown-category {
  padding: 4px 0 !important;
}
@import "~/assets/mobileStyles/appMainHeader.less";
</style>
