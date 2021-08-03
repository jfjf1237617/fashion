export const state =()=> ({
  //状态变量
  targetMedia: "N/A",
  targetInfluencer: "Engagement",
  tier1: "0",
  tier2: "17",
  tier3: "33",
  tier4: "50",
})
export const mutations = {
  //对状态变量进行的操作
  CHANGE_TARGETMEDIA: (state, newTargetMedia) => {
    state.targetMedia = newTargetMedia;
  },
  CHANGE_TARGETINFLUENCER: (state, newTargetInfluencer) => {
    state.targetInfluencer = newTargetInfluencer;
  },
  CHANGE_TIER: (state, { newTier1, newTier2, newTier3, newTier4 }) => {
    state.tier1 = newTier1;
    state.tier2 = newTier2;
    state.tier3 = newTier3;
    state.tier4 = newTier4;
    // console.log("commit tier");
    // console.log(newTier1,newTier2,newTier3,newTier4);
  }
}
export const actions = {
  changeTargetMedia({ commit }, { newTargetMedia }) {
    commit("CHANGE_TARGETMEDIA", newTargetMedia);
  },
  changeTargetInfluencer({ commit }, { newTargetInfluencer }) {
    commit("CHANGE_TARGETINFLUENCER", newTargetInfluencer);
  },
  changeTier({ commit }, { newTier1, newTier2, newTier3, newTier4 }) {
    console.log(newTier1, newTier2, newTier3, newTier4);
    commit("CHANGE_TIER", { newTier1, newTier2, newTier3, newTier4 });
  },
}
// export default {
//   namespaced: true,
//   state,
//   mutations,
//   actions
// }