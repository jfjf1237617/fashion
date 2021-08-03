import Vue from "vue";
import moment from "moment";
Vue.filter('dateFormat',function(daraStr,pattern="DD/MM/YYYY"){
  return moment(daraStr).format(pattern)
})