<template>
  <div class="my-product-container">
    <p class="my-product-title">My Products</p>
    <el-table
      empty-text="No products found"
      class="my-products-table"
      :data="myProductList"
      width
    >
      <el-table-column class="my-product-table-item" label="Picture">
        <template slot-scope="scope">
          <img
            :src="
              scope.row.pic.slice(0, 4) !== 'http'
                ? scope.row.pic.slice(1, -1)
                : scope.row.pic
            "
            class="my-product-pic"
          />
        </template>
        <!-- scope.row.pic.includes('gigab2b')
                ? scope.row.pic +
                  '?x-oss-process=image%2Fresize%2Cw_500%2Ch_500%2Cm_pad'
                : scope.row.pic -->
      </el-table-column>
      <el-table-column
        class="my-product-table-item"
        label="Name"
        min-width="200"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.name }}</p>
        </template>
      </el-table-column>
      <el-table-column class="my-product-table-item" label="Stock">
        <template slot-scope="scope">
          <p>{{ scope.row.stock }}</p>
        </template>
      </el-table-column>
      <el-table-column
        class="my-product-table-item"
        label="Cost"
        min-width="100"
      >
        <template slot-scope="scope">
          <p>${{ scope.row.price }}&nbsp;{{ scope.row.currencyCode }}</p>
        </template>
      </el-table-column>
      <el-table-column
        class="my-product-table-item"
        label="Price"
        min-width="100"
      >
        <template slot-scope="scope">
          <p>${{ scope.row.disPrice }}&nbsp;{{ scope.row.currencyCode }}</p>
        </template>
      </el-table-column>
      <el-table-column class="my-product-table-item" label="Import">
        <template slot-scope="scope">
          <p
            v-show="scope.row.status === 3 || myDisableImport.has(scope.row.id)"
          >
            Shopify
          </p>
        </template>
      </el-table-column>
      <el-table-column
        class="my-collection-table-item"
        label="Operation"
        fixed="right"
        width="300"
      >
        <template slot-scope="scope">
          <el-button
            :disabled="myDisableRow.has(scope.row.id)"
            :loading="myRemoveLoading.has(scope.row.id)"
            size="mini"
            @click="removeProduct(scope.row, scope.$index)"
            >Remove product</el-button
          >
          <el-button
            :disabled="
              myDisableRow.has(scope.row.id) ||
              myDisableImport.has(scope.row.id) ||
              scope.row.status === 3
            "
            :loading="myShopifyLoading.has(scope.row.id)"
            size="mini"
            @click="importShopify(scope.row, scope.$index, $event)"
            >Import to shopify</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :pageTotal="total"
      :pageNum="pageNum"
      :pageSize="pageSize"
      @change-page="handlePagination"
      :current-page.sync="pageNum"
    ></pagination>
  </div>
</template>
<script lang='ts'>
import Vue from "vue";
import distributorService from "~/global/service/distributor_product.js";
import { Loading } from "element-ui";
import { EventBus } from "~/event-bus";
import { mapState, mapMutations } from "vuex";
import Pagination from "~/components/Pagination.vue";
import { getMyProductList } from "~/utils/shopifyUtils/index";
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
  beforeRouteEnter(to, from, next) {
    let queryObj = {} as any;
    if (to.path === "/myProduct") {
      if (to.query.page) {
        queryObj.pageNum = parseInt(to.query.page as string);
      }
      next((vm) => {
        getMyProductList({ ...queryObj, store: vm.$store });
      });
    }
    next();
  },
  beforeRouteUpdate(to, from, next) {
    let queryObj = {} as any;
    queryObj.store = this.$store;
    if (to.path === "/myProduct") {
      if (to.query.page) {
        queryObj.pageNum = parseInt(to.query.page as string);
      }
      getMyProductList(queryObj);
    }
    next();
  },
  components: {
    Pagination,
  },
  data() {
    return {
      // screenWidth: "",
      // myProducts: [],
      // pageNum: 1,
      // pageSize: Number,
      // totalPage: Number,
      // total: Number,
      loading: null,
      removeLoading: new Set(),
      removeLoadingChange: 0,
      shopifyLoading: new Set(),
      shopifyLoadingChange: 0,
      disableRow: new Set(),
      disableRowChange: 0,
      disableImport: new Set(),
      disableImportChange: 0,
    };
  },
  computed: {
    ...mapState("adminUser", ["user"]),
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
    myProductList(): any {
      let filterList = this.productList.filter((item: any) => {
        return item !== undefined;
      });
      return filterList;
    },

    myRemoveLoading(): any {
      var removeNum = this.removeLoadingChange;
      return this.removeLoading;
    },
    myShopifyLoading(): any {
      var shopifyNum = this.shopifyLoadingChange;
      return this.shopifyLoading;
    },
    myDisableRow(): any {
      var disableNum = this.disableRowChange;
      return this.disableRow;
    },
    myDisableImport(): any {
      var importNum = this.disableImportChange;
      return this.disableImport;
    },
  },
  watch: {
    // screenWidth(val) {
    //   this.screenWidth = val;
    // },
  },
  methods: {
    ...mapMutations("product", ["m_set_product_undefined", "m_set_status"]),
    handlePagination(current: number) {
      let obj = JSON.parse(JSON.stringify(this.$route.query));
      Object.assign(obj, { page: current });
      this.$router.push({ query: obj });
      document.getElementsByClassName("el-main")[0].scrollTop = 0;
    },
    async removeProduct(row: any, index: number) {
      let id = row.id;
      this.removeLoading.add(id);
      this.disableRow.add(id);
      this.removeLoadingChange += 1;
      this.disableRowChange += 1;
      let params = {
        disStatus: 0,
        ids: id,
      };
      let removeRow =
        await distributorService.postDistributorProductUpdateDissStatus(params);
      if (removeRow.data.code === 200) {
        let obj = this.myProductList.find((item: any) => {
          return item.id == id;
        });
        let i = this.productList.indexOf(<never>obj);
        this.m_set_product_undefined(i);
        // this.$set(this.productList, i, undefined);
        this.$message({
          type: "success",
          message: "Remove successfully!",
        });
        this.renderList();
      }
      this.removeLoading.delete(id);
      this.disableRow.delete(id);
      this.removeLoadingChange -= 1;
      this.disableRowChange -= 1;
    },
    async importShopify(row: any, index: number, e: any) {
      let id = row.id;
      this.shopifyLoading.add(id);
      this.disableRow.add(id);
      this.shopifyLoadingChange += 1;
      this.disableRowChange += 1;
      let adminSquareStatus = this.user.squareStatus;
      if (adminSquareStatus === 11 || adminSquareStatus === 22) {
        let importToShopify =
          await distributorService.postDistributorProductImport(id, "shopify");
        if (importToShopify.data.code === 200) {
          this.disableImportChange += 1;
          this.disableImport.add(id);
          // let obj = this.myProductList.find((item: any) => {
          //   return item.id == id;
          // });
          // let i = this.productList.indexOf(<never>obj);
          // this.m_set_status([i,5]);
          this.$message({
            type: "success",
            message: "Import successfully!",
          });
        }
      } else {
        window.open("https://apps.shopify.com/FashionExpress");
      }
      this.shopifyLoading.delete(id);
      this.disableRow.delete(id);
      this.shopifyLoadingChange -= 1;
      this.disableRowChange -= 1;
    },
    async renderList() {
      let params = {
        pageNum: this.pageNum,
        // pageSize: this.pageSize,
        // status: 1,
        store: this.$store,
      };
      getMyProductList(params);
      // const res = await distributorService.getDistributorProductRealSelf(
      //   params
      // );
      // this.productList = res.data.data.list;
      // this.pageNum = res.data.data.pageNum;
      // this.totalPage = res.data.data.totalPage;
      // this.total = res.data.data.total;
    },
    // resizes() {
    //   this.screenWidth = String(document.body.clientWidth);
    //   EventBus.$emit("sendScreenWidth", this.screenWidth);
    // },
    // handlePagination(current: number) {
    //   this.pageNum = current;
    //   this.getList();
    //   document.getElementsByClassName("el-main")[0].scrollTop = 0;
    // },
    // async getList() {
    //   let params = {
    //     pageNum: this.pageNum,
    //     pageSize: this.pageSize,
    //     status: 6,
    //   };
    //   if (this.loading) {
    //     (this.loading as any).close();
    //   }
    //   (this.loading as any) = Loading.service({
    //     target: ".all-container",
    //   });
    //   const res = await distributorService.getDistributorProductRealSelf(
    //     params
    //   );
    //   this.myProducts = res.data.data.list;
    //   this.pageNum = res.data.data.pageNum;
    //   this.totalPage = res.data.data.totalPage;
    //   this.total = res.data.data.total;
    //   (this.loading as any).close();
    // },
  },
});
</script>
<style lang="less" scoped>
.my-product-container {
  .my-product-title {
    width: 100%;
    font-size: 2rem;
    font-weight: 600;
  }
  .my-products-table {
    width: 100%;
    background-color: #fff;
    border-radius: 10px;
    margin-top: 10px;
    margin-bottom: 20px;
    padding: 0 20px;
    box-shadow: 0px 0px 5px rgba(23, 24, 24, 0.05);
    border: solid 1px rgba(23, 24, 24, 0.05);
    margin-top: 20px;
  }
  .my-product-pic {
    width: 78px;
    height: 78px;
    object-fit: cover;
  }
}
</style>