export const fetchProduct = (res, store) => {
  if (res.data.data) {
    let productList = res.data.data.list;
    let { message, code } = res.data;
    let { pageNum, totalPage, pageSize, total } = res.data.data;
    let showNum;
    console.log(res.data.data);
    if (totalPage === 0) {
      showNum = totalPage;
    } else if (totalPage === 1) {
      showNum = total;
    } else if (pageNum !== totalPage) {
      showNum = pageSize;
    } else {
      showNum = total % pageSize;
    }
    if (code !== 200) {
      this.$message({
        message,
        type: error,
      });
    } else {
      store.commit("product/m_update_productMsg", {
        productList,
        pageNum,
        totalPage,
        total,
        message,
        code,
        showNum,
        pageSize,
      });
    }
    console.log(store.state.product.pageNum);
  } else {
    let productList = [];
    let { message, code } = res.data;
    let [pageNum, totalPage, pageSize, total, showNum] = [0, 0, 60, 0, 0];
    store.commit("product/m_update_productMsg", {
      productList,
      pageNum,
      totalPage,
      total,
      message,
      code,
      showNum,
    });
  }
}