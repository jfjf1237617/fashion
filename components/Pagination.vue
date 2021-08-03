<template>
  <div class="pagination-section">
    <el-pagination
      background
      :total="pageTotal"
      :num="pageNum"
      :page-size="pageSize"
      layout="prev, pager, next"
      @current-change="handleChangePage"
      :current-page.sync="current"
    >
    </el-pagination>
  </div>
</template>
<script>
import Vue from "vue";
export default Vue.extend({
  props: {
    pageTotal: { type: Number, default: 1 },
    pageNum: { type: Number, default: 1 },
    pageSize: { type: Number, default: 1 },
    currentPage: { type: Number, default: 1 },
  },
  data() {
    return {
      current: this.currentPage,
    };
  },
  methods: {
    handleChangePage(current) {
      this.$emit("change-page", current);
    },
  },
  watch: {
    currentPage(nVal) {
      this.current = nVal;
    },
  },
});
</script>
<style lang="less">
.pagination-section {
  width: 100%;
  display: flex;
  justify-content: center;
  .el-pagination {
    margin: 16px auto;
  }
  .btn-prev {
    border: solid 1px #d2d5d8 !important;
    border-radius: 5px 0 0 5px !important;
  }
  .btn-next {
    border: solid 1px #d2d5d8 !important;
    border-radius: 0 5px 5px 0 !important;
  }
  .el-pager {
    .number {
      width: 38px;
      height: 36px;
      line-height: 36px;
      &.active {
        background-color: #d2d5d8 !important;
        color: #606266 !important;
      }
    }
  }
}
</style>