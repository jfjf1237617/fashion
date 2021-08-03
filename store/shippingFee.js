export const state = () => ({
  shippingFees: [
    "Free shipping",
    "$5 and less",
    "$10 and less",
    "$15 and less",
    "$20 and less",
  ],
  checkShippingFee: ''
})
export const mutations = {
  m_update_checkShippingFee(state, payload) {
    state.checkShippingFee = payload;
    this.$cookies.set("shippingFee", state.checkShippingFee);
  },
  m_update_clearShippingFee(state) {
    state.checkShippingFee = '';
    this.$cookies.set("shippingFee", state.checkShippingFee);
  },
}

