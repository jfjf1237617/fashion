export const state = () => ({
  picturePath: [],
})
export const mutations = {
  m_update_picturePath(state, payload) {
    state.picturePath = payload;
    // this.$cookies.set("picturePath", state.picturePath);
  },
}
// export const actions={
//   a_update_picturePath({commit},payload) {
//     commit('m_update_picturePath', payload);
//   }
// }