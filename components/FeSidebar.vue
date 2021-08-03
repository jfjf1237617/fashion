<template>
  <el-aside>
    <div class="sidebar-container">
      <div v-if="token" class="sidebar-private">
        <div class="part-section">
          <span
            :class="
              $route.path==='/'
                ? 't-side-title gold'
                : 't-side-title'
            "
            @click="toPage('/')"
          >
            Products
          </span>
          <span
            :class="
              $route.path.includes('myProduct')
                ? 't-side-title gold'
                : 't-side-title'
            "
            @click="toPage('/myProduct')"
          >
            My Products</span
          >
        </div>
        <div class="divide-line"></div>
        <div class="part-section">
          <span
            :class="
              $route.path.includes('payPending')
                ? 't-side-title gold'
                : 't-side-title'
            "
            @click="toPage('/payPending')"
            >Pay Pending</span
          >
          <span
            :class="
              $route.path.includes('awaitingShipment')
                ? 't-side-title gold'
                : 't-side-title'
            "
            @click="toPage('/awaitingShipment')"
            >Awaiting Shipment</span
          >
          <span
            :class="
              $route.path.includes('shipped')
                ? 't-side-title gold'
                : 't-side-title'
            "
            @click="toPage('/shipped')"
            >Shipped</span
          >
        </div>
        <div class="divide-line"></div>
        <div class="part-section">
          <span
            :class="
              $route.path.includes('settings')
                ? 't-side-title gold'
                : 't-side-title'
            "
            @click="toPage('/settings')"
            >Settings
          </span>
        </div>
      </div>
    </div>
  </el-aside>
</template>
<script>
import Vue from "vue";
import { mapState, mapMutations } from "vuex";
import CookieHelper from "~/utils/helper/CookieHelper";
import productService from "~/global/service/product.js";
export default Vue.extend({
  data() {
    return {
      screenWidth: "",
      token: "",
      active: Number,
      sortArr: [],
      activeCategory: [],
    };
  },
  computed: {
    ...mapState("category", ["categories", "checkCategories", "categoriesMap"]),
    ...mapState("product", ["pageNum", "searchProduct"]),
    categoryList() {
      return [...this.categoriesMap];
    },
  },
  beforeMount() {
    this.getToken();
    this.sortCategory();
    this.getCategories();
    this.$emit('have-token',this.token);
  },
  mounted() {
    if (this.$route.query.cateId) {
      if (this.categoryList.length > 0) {
        this.categoryList.forEach((item, index) => {
          item[1].forEach((childItem, childIndex) => {
            if (childItem == this.$route.query.cateId) {
              this.activeCategory.push(index);
            }
          });
        });
      } else {
        setTimeout(() => {
          this.categoryList.forEach((item, index) => {
            item[1].forEach((childItem, childIndex) => {
              if (childItem == this.$route.query.cateId) {
                this.activeCategory.push(index);
              }
            });
          });
        }, 500);
      }
    }
  },
  methods: {
    ...mapMutations("category", [
      "m_get_checkCategories",
      "m_clear_checkCategories",
      "m_update_categoryId",
      "m_get_categoriesMap",
    ]),
    ...mapMutations("product", ["m_update_pageNum", "m_update_searchProduct"]),
    ...mapMutations("route", [
      "m_change_routeOption_query",
      "m_change_routeOption_path",
    ]),
    sortCategory() {
      let other = [];
      for (let i = 0; i < this.categories.length; i++) {
        if (this.categories[i].charCodeAt(0) < 65) {
          other.push(this.categories[i]);
        } else {
          this.sortArr.push(this.categories[i]);
        }
      }
      other.sort(this.compare);
      this.sortArr.sort(this.compare);
      this.sortArr = [...this.sortArr, ...other];
    },
    compare(val1, val2) {
      if (val2 > val1) {
        return -1;
      } else if (val1 > val2) {
        return 1;
      } else {
        return 0;
      }
    },
    async getCategories() {
      if (this.categoriesMap.size === 0) {
        let res = await productService.getProductAwsCategory();
        let dataList = res.data.data;
        let parentMap = new Map();
        dataList.map((item) => {
          let childrenMap = new Map();
          item.children.map((child) => {
            childrenMap.set(child.nameEn, child.id);
          });
          parentMap.set([item.nameEn, item.id], childrenMap);
        });
        this.m_get_categoriesMap(parentMap);
      }
    },
    getToken() {
      this.token = CookieHelper.getItem("token");
    },
    toPage(val) {
      this.$router.push(val);
      this.m_clear_checkCategories();
      this.m_change_routeOption_path(val);
      document.getElementsByClassName("el-main")[0].scrollTop = 0;
    },
    changeCategory(val) {
      this.m_update_categoryId(val);
      this.$router.push({
        path: "/products/categories",
        query: { cateId: val },
      });
      this.m_get_checkCategories([val]);
      this.m_update_searchProduct("");
      document.getElementsByClassName("el-main")[0].scrollTop = 0;
    },
  },
});
</script>
<style lang="less" scoped>
.el-aside {
  width: 280px !important;
  background-color: #fff;
  color: #333;
  margin-top: 67px;
  overflow: hidden;
  .sidebar-container {
    height: 100vh;
    .sidebar-private {
      overflow-y: scroll;
      padding-bottom: 70px;
      height: 100vh;
      padding-top: 24px;
      &::-webkit-scrollbar {
        width: 5px;
        background-color: #f1f1f1;
      }
      &::-webkit-scrollbar-track {
        background-color: #fff;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: #c1c1c1;
      }
      .part-section {
        .t-side-title {
          display: block;
          position: relative;
          margin: 0 0 24px 56px;
          font-weight: 700;
          font-size: 20px;
          line-height: 20px;
          color: rgb(51 51 51);
          width: 100%;
          cursor: pointer;
          &:hover {
            color: rgb(102 102 102);
          }
          &.gold {
            color: rgb(199 152 24);
          }
        }
      }
      .divide-line {
        width: 135px;
        height: 0;
        border: 1px solid rgb(238 238 238);
        margin: 0 0 24px 56px;
      }
    }
  }
}
</style>

