import ElementUI, { Loading } from "element-ui";
import productService from "~/global/service/product";
import distributorService from "~/global/service/distributor_product";
import { fetchProduct } from "~/utils/fetchProduct";
interface getProductListParams {
  pageNum?: number,
  cateId?: number,
  search?: string,
  status?: number,
  newStatus?: number,
  store: any
}
interface getMyProductListParams{
  pageNum?: number,
  store: any
}
var loading: any = null;
export async function getProductList({ pageNum = 1, cateId, search, status, newStatus, store }: getProductListParams) {
  if (loading) {
    loading.close()
  }
  loading = Loading.service({
    target: ".all-container",
  });
  let res = await productService.allList({
    pageSize: 60,
    productCategoryId: cateId,
    pageNum: pageNum,
    keyword: search,
    status: status,
    newStatus: newStatus,
  });
  loading.close();
  // that.$store.commit("category/m_update_categoryId", categoryId);
  // that.$store.commit("route/m_change_routeOption_query", { page: pageNum, category, search, status });
  // that.$store.commit('route/m_change_routeOption_path', that.$route.path);
  fetchProduct(res, store);
}
export async function getPromotionList(that: any, status?: number, newStatus?: number) {
  let params;
  if (status) {
    params = {
      status: status,
      pageSize: 10,
    };
  } else if (newStatus) {
    params = {
      newStatus: newStatus,
      pageSize: 10,
    };
  }
  let res = await distributorService.getDistributorProductList(params);
  if (res.data.code === 200) {
    if (status === 2) {
      that.bestSellList = res.data.data.list;
    }
    if (status === 4) {
      that.lowerPriceList = res.data.data.list;
    }
    if (newStatus === 1) {
      that.newArrivalList = res.data.data.list;
    }
    renderImg();
  }
}
export function renderImg() {
  let observer = new IntersectionObserver(function (changes) {
    changes.forEach(function (element: any, index: Number) {
      if (element.intersectionRatio > 0) {
        observer.unobserve(element.target);
        element.target.style.background = '#fff' +
          ` url(${element.target.dataset.background})` +
          ' no-repeat' +
          ' center/100%';
      }
    });
  });
  (function initObserver() {
    let listItems = document.querySelectorAll(".card-img-section");
    listItems.forEach(function (item) {
      observer.observe(item);
    });
  })();
}
export function tRenderImg() {
  let observer = new IntersectionObserver(function (changes) {
    changes.forEach(function (element: any, index: Number) {
      if (element.intersectionRatio > 0) {
        observer.unobserve(element.target);
        element.target.style.background = '#fff' +
          ` url(${element.target.dataset.background})` +
          ' no-repeat' +
          ' center/300px';
      }
    });
  });
  (function initObserver() {
    let listItems = document.querySelectorAll(".fe-card-img-section");
    listItems.forEach(function (item) {
      observer.observe(item);
    });
  })();
}
// export function renderImg() {
//   console.log("outhere");

//   document.addEventListener('load', function () {
//     console.log("here");
//     const imgs = document.querySelectorAll('.card-img-section')
//     console.log(imgs);

//     function lazyLoad() {
//       console.log("haaaa");

//       const windowHeight = document.documentElement.clientHeight
//       imgs.forEach(($img: any, i) => {
//         if ($img.dataset.background && $img.getBoundingClientRect().bottom >= 0 && windowHeight > $img.getBoundingClientRect().top) {
//           console.log($img.style);

//           $img.style.background = '#fff' +
//             ` url(${$img.dataset.background})` +
//             ' no-repeat' +
//             ' center/100%';
//         }

//         delete $img.dataset.background
//       }
//       )
//     }
//     lazyLoad()
//     document.addEventListener('scroll', debounce(lazyLoad, 200))
//   })
//   function debounce(func:any, wait:any) {
//     console.log("debounce");

//     let timer:any = null
//     return function (...args:any) {
//       if (timer) clearTimeout(timer)
//       timer = setTimeout(() => {
//         func(...args)
//       }, wait)
//     }
//   }
// }
export async function getMyProductList({ pageNum = 1, store }: getMyProductListParams) {
  if (loading) {
    loading.close()
  }
  loading = Loading.service({
    target: ".fe-container",
  });
  let res = await distributorService.getDistributorProductRealSelf({
    pageSize: 10,
    pageNum: pageNum,
  });
  loading.close();
  fetchProduct(res, store);
}