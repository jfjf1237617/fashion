export const state = () => ({
  productList: [],
  pageNum: 1,
  pageSize: 60,
  totalPage: 0,
  total: 1,
  message: "",
  code: 0,
  showNum: 0,
  searchProduct: "",
  productDetail: null,
  status: 0,
})
export const mutations = {
  m_update_productMsg(state, payload) {
    state.productList = payload.productList;
    state.pageNum = payload.pageNum;
    state.totalPage = payload.totalPage;
    state.total = payload.total;
    state.message = payload.message;
    state.code = payload.code;
    state.showNum = payload.showNum;
    state.pageSize = payload.pageSize
  },
  m_update_searchProduct(state, payload) {
    state.searchProduct = payload
  },
  m_update_pageNum(state, payload) {
    state.pageNum = payload;
  },
  m_get_productDetail(state, payload) {
    state.productDetail = payload;
  },
  m_update_status(state, payload) {
    state.status = payload;
  },
  m_sort_productLowToHigh(state) {
    let quickSort = (arr, left, right) => {
      var len = arr.length;
      var partitionIndex;
      var left = typeof left != 'number' ? 0 : left;
      var right = typeof right != 'number' ? len - 1 : right;
      if (left < right) {
        partitionIndex = partition(arr, left, right);
        quickSort(arr, left, partitionIndex - 1);
        quickSort(arr, partitionIndex + 1, right);
      }
      return arr;
    }
    function partition(arr, left, right) {
      var pivot = left;
      var index = pivot + 1;
      for (var i = index; i <= right; i++) {
        if (arr[i].price < arr[pivot].price) {
          swap(arr, i, index);
          index++;
        }
      }
      swap(arr, pivot, index - 1);
      return index - 1;
    }
    function swap(arr, i, j) {
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    function partition2(arr, low, high) {
      var pivot = arr[low].price;
      while (low < high) {
        while (low < high && arr[high].price > pivot) {
          --high
        }
        arr[low] = arr[high].price;
        while (low < high && arr[low].price <= pivot) {
          ++low;
        }
        arr[high].price = arr[low].price;
      }
      arr[low].price = pivot;
      return low;
    }
    function quickSort2(arr, low, high) {
      if (low < high) {
        var pivot = partition2(arr, low, high);
        quickSort2(arr, low, pivot - 1);
        quickSort2(arr, pivot + 1, high);
      }
      return arr;
    }
    state.productList = quickSort(state.productList)
  }
}

