export const state = () => ({
  homeObj: {},
  homePage: {},
  myObj: {},
  orderObj: {},
  hotObj: {},
});

function setPageList(pageObj, { list, pageNum, pageSize, total }, funName) {
  // console.log((funName || 'setPageList'), ': ', { list, pageNum, pageSize, total });
  if (Array.isArray(list)) pageObj[pageNum] = list;
  if (typeof pageNum === 'number') pageObj.pageNum = pageNum;
  if (typeof pageSize === 'number') pageObj.pageSize = pageSize;
  if (typeof total === 'number') pageObj.total = total;
}

export const mutations = {
  setHomeList(state, { list, pageNum, pageSize, total }) {
    setPageList(state.homeObj, { list, pageNum, pageSize, total }, 'setHomeList');
  },
  setMyList(state, { list, pageNum, pageSize, total }) {
    setPageList(state.myObj, { list, pageNum, pageSize, total }, 'setMyList');
  },
  setOrderList(state, { list, pageNum, pageSize, total }) {
    setPageList(state.orderObj, { list, pageNum, pageSize, total }, 'setOrderList');
  },
  setHotList(state, { list, pageNum, pageSize, total }) {
    setPageList(state.hotObj, { list, pageNum, pageSize, total },'setHotList');
  },
  // 
  deleteHomeItem(state, { pageNum, index }) {
    if (Array.isArray(state.homeObj[pageNum])) {
      state.homeObj[pageNum].splice(index, 1);
    }
  }
};