export const state =()=> ({
  region:"Hong Kong",
  currency:"HKD",
  campaignTitle:"",
  headCount:1,
  brandName:"",
  publishingDateEnd:"",
  publishingDateStart:""
})

export const mutations = {
  CHANGE_REGION:(state,newRegion) => {
      state.region = newRegion;
  },
  CHANGE_CURRENCY:(state,newCurrency) => {
      state.currency = newCurrency;
  },
  CHANGE_CAMPAIGNTITLE:(state,newCampaignTitle) => {
      state.campaignTitle  = newCampaignTitle;
  },
  CHANGE_HEADCOUNT:(state,newHeadCount) => {
      state.headCount = newHeadCount;
  },
  CHANGE_BRANDNAME:(state,newBrandName) => {
      state.brandName = newBrandName;
  },
  CHANGE_PUBLISHINGDATESTART:(state,newPublishingDateStart) => {
      state.publishingDateStart = newPublishingDateStart;
  },
  CHANGE_PUBLISHINGDATEEND:(state,newPublishingDateEnd)=>{
      state.publishingDateEnd = newPublishingDateEnd;
  }
}
export const actions = {
  changeRegion({commit},{newRegion}){
      commit('CHANGE_REGION',newRegion);
  },
  changeCurrency({commit},{newCurrency}){
      commit('CHANGE_CURRENCY',newCurrency)
  },
  changeCampaignTitle({commit},{newCampaignTitle}){
     commit("CHANGE_CAMPAIGNTITLE",newCampaignTitle);
  },
  changeHeadCount({commit},{newHeadCount}){
      commit("CHANGE_HEADCOUNT",newHeadCount);
  },
  changeBrandName({commit},{newBrandName}){
      commit("CHANGE_BRANDNAME",newBrandName);
  },
  changePublishingDateStart({commit},{newPublishingDateStart}){
      commit("CHANGE_PUBLISHINGDATESTART",newPublishingDateStart);
  },
  changePublishingDateEnd({commit},{newPublishingDateEnd}){
      commit("CHANGE_PUBLISHINGDATEEND",newPublishingDateEnd);
  }

}

// export default {
//   namespaced:true,
//   state,
//   mutations,
//   actions
// }