export const state = () => ({
  shopify: {
    shopifyName: "",
    shopifyEmail: "",
    ranks: Number,
    pbLikes: Number,
    sales: Number,
    affiliates: Number,
    photo:'',
  }
});
export const mutations = {
  m_update_shopify(state, payload) {
    state.shopify = payload;
    this.$cookies.set("shopify", state.shopify);
  }
};
// export const actions = {
//   async a_get_self({ commit }, token) {
//     let { code, data } = await server.getSelfInfo(token);
//     if (code !== 200) return;
//     commit('updateUser', data);
//   }
// };
