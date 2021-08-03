export const state = () => ({
    influencers: "0 influencer(s) has been chosen",
})


export const mutations = {
    CHANGE_INFLUENCERS: (state, newInfluencers) => {
        state.influencers = newInfluencers;
    },
}
export const actions = {
    changeInfluencers({ commit }, { newInfluencers }) {
        commit("CHANGE_INFLUENCERS", newInfluencers);
    }
}

//  export default {
//      namespaced:true,
//      state,
//      mutations,
//      actions
//  }