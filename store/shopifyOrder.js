// import {server} from '~/utils/server'
export const state = () => ({
  orders: [],
  pre:'',
  next:'',
  fulfillmentStatus:'',
  location:[],
  payPadding:0,
})
export const mutations = {
  m_render_shopifyOrders(state, payload) {
    state.orders = payload;
  },
  m_get_shopifyPre(state, payload) {
    state.pre = payload;
  },
  m_get_shopifyNext(state, payload) {
    state.next = payload;
  },
  m_get_shopifyFulfillmentStatus(state,payload){
    state.fulfillmentStatus=payload;
  },
  m_get_shopifyLocation(state,payload){
    state.location=payload;
  },
  m_get_shopifyPayPadding(state,payload){
    state.payPadding=payload;
  }
}
// export const actions={
//   a_get_shopifyOrders({commit},params,token){
//     let {code,data}=await server.getShopifyOrders(params,token);
//     if ( code !== 200) return;
//     commit('m_get_shopifyOrders', data);
//   }
// }
