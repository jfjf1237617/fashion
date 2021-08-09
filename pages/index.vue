<template>
  <div class="fe-products-container">
    <product-filter class="fe-product-filter"></product-filter>
    <div class="fe-products-card-section">
      <fe-card
        v-for="item in productList"
        :key="item.id"
        :price="item.price"
        :pic="item.pic"
        :name="item.name"
        :productId="item.id"
        :productInfo="item"
        :currencyCode="item.currencyCode"
      />
    </div>
    <pagination
      :pageTotal="total"
      :pageNum="pageNum"
      :pageSize="pageSize"
      @change-page="handlePagination"
      :current-page.sync="pageNum"
    ></pagination>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import ProductFilter from "~/components/ProductFilter.vue";
import Pagination from "~/components/Pagination.vue";
import FeCard from "~/components/FeCard.vue";
import { getProductList } from "~/utils/shopifyUtils/index";
import { tRenderImg } from "~/utils/shopifyUtils/index";
import { mapState, mapMutations } from "vuex";
export default Vue.extend({
  layout: "base",
  async middleware({ route, redirect, app, query, store }) {
    if (process.server) {
      if (route.fullPath.includes("myshopify")) {
        if (query.shop) {
          let index = query.shop.indexOf(".myshopify");
          let shopifyName = query.shop.slice(0, index);
          let shopifyEmail = query.shop;
          store.commit("shopifyInfo/m_update_shopify", {
            shopifyName,
            shopifyEmail,
          });
          const res = await app.$axios.get(
            `/shopify/fashion/authorize/url?shopName=${shopifyName}`
          );
          if (res.data.code === 200) {
            let authUrl = res.data.data;
            redirect(authUrl);
          }else{
            console.error('not 200')
            
          }
        }
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    let queryObj = {} as any;
    if (to.path === "/") {
      queryObj.cateId = 1122;
      if (to.query.page) {
        queryObj.pageNum = parseInt(to.query.page as string);
      }
      if (to.query.search) {
        queryObj.search = to.query.search;
      }
      next((vm) => {
        getProductList({ ...queryObj, store: vm.$store });
        vm.$store.commit("product/m_update_searchProduct", to.query.search);
      });
    }
    next();
  },
  beforeRouteUpdate(to, from, next) {
    let queryObj = {} as any;
    queryObj.store = this.$store;
    if (to.path === "/") {
      queryObj.cateId = 1122;
      if (to.query.page) {
        queryObj.pageNum = parseInt(to.query.page as string);
      }
      if (to.query.search) {
        queryObj.search = to.query.search;
      }
      getProductList(queryObj);
      this.$store.commit("product/m_update_searchProduct", to.query.search);
    }
    next();
  },
  components: {
    ProductFilter,
    Pagination,
    FeCard,
  },
  data() {
    return {
      tokenBoolean: true,
    };
  },
  computed: {
    ...mapState("adminUser", ["user"]),
    ...mapState("category", ["checkCategories", "categoryId", "categoriesMap"]),
    ...mapState("shippingFee", ["checkShippingFee"]),
    ...mapState("product", [
      "productList",
      "pageNum",
      "pageSize",
      "totalPage",
      "total",
      "message",
      "code",
      "searchProduct",
    ]),
    hidePageFilter(): boolean {
      return (this.$route as any).name.match(/detail/);
    },
  },
  mounted() {
    tRenderImg();
  },
  updated() {
    tRenderImg();
  },
  methods: {
    ...mapMutations("category", [
      "m_update_checkCategories",
      "m_update_categoryId",
      "m_get_checkCategories",
      "m_clear_checkCategories",
    ]),
    ...mapMutations("shippingFee", ["m_update_checkShippingFee"]),
    ...mapMutations("product", [
      "m_update_productMsg",
      "m_update_searchProduct",
    ]),
    haveToken(val: string) {
      console.log("token", val);

      if (val) {
        this.tokenBoolean = true;
      } else {
        this.tokenBoolean = false;
      }
    },
    handlePagination(current: number) {
      let obj = JSON.parse(JSON.stringify(this.$route.query));
      Object.assign(obj, { page: current });
      this.$router.push({ query: obj });
      document.getElementsByClassName("el-main")[0].scrollTop = 0;
    },
  },
});
</script>
<style lang="less" scoped>
.fe-products-container {
  display: flex;
  flex-direction: column;
  .fe-product-filter {
    background-color: #fff;
  }
  .fe-products-card-section {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
