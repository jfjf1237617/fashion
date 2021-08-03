export const actions = {
  nuxtServerInit(store, { app: { $cookies } }) {
    let category = $cookies.get('category') ? $cookies.get('category') : [];
    let shippingFee = $cookies.get('shippingFee') ? $cookies.get('shippingFee') : '';
    let shopify = $cookies.get("shopify") ? $cookies.get('shopify') : '';
    store.commit('category/m_get_checkCategories', category);
    store.commit('shippingFee/m_update_checkShippingFee', shippingFee);
    store.commit('shopifyInfo/m_update_shopify', shopify);
  }
}

