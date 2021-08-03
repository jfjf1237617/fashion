export const state = () => ({
  routeOption: {
    query: {
      category: '',
      search: '',
      page: 1,
      status: undefined,
    },
    path: ''
  },
})
export const mutations = {
  m_change_routeOption_query(state, payload) {
    state.routeOption.query = payload;
  },
  m_change_routeOption_path(state, payload) {
    state.routeOption.path = payload;
  }
}