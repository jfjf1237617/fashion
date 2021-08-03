import API from "~/global/request/api";
import axios from "~/global/request/axios";
const cloudbreakrService = {
  getInterestsCategory() {
    return axios.get(API.get_cloudbreakr_interests_category);
  },
  stepOne(params) {
    return axios.post(API.post_cloudbreakr_step_one, params);
  },
  stepTwo(params) {
    return axios.post(API.post_cloudbreakr_step_two, params);
  },
  stepThree(params) {
    return axios.post(API.post_cloudbreakr_step_three, params);
  },
  stepFour(params) {
    return axios.post(API.post_cloudbreakr_step_four, params);
  },
  stepFive(params) {
    return axios.post(API.post_cloudbreakr_step_five, params);
  },
  stepSix(params) {
    return axios.post(API.post_cloudbreakr_step_six, params);
  },
  stepSeven(params) {
    return axios.post(API.post_cloudbreakr_step_seven, params);
  },
  saveCampaign(params) {
    return axios.post(API.post_cloudbreakr_save_campaign, params);
  },
  getCloudbreakrList(){
    return axios.get(API.get_cloudbreakr_list)
  },
}
export default cloudbreakrService;