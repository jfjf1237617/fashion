export const state = () => ({
  campaignList: [],
})
export const mutations = {
  m_get_campaignList(state, payload) {
    state.campaignList = payload;
  }
}
export const actions = {
  a_get_campaignList({ commit }, { campaignList }) {
    commit('m_get_campaignList', campaignList);
  },
}