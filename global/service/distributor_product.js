import API from "~/global/request/api";
import axios from "~/global/request/axios";
const distributorService = {
	getDistributorProductList(params) {
		return axios.get(API.get_distributor_product_list, params);
	},
	getDistributorProductSelf() {
		return axios.get(API.get_distributor_product_self);
	},
	getDistributorProductRealSelf(params) {
		return axios.get(API.get_distributor_product_realSelf,params);
	},
	postDistributorProductUpdateDissStatus(data) {
		return axios.post(API.post_distributor_product_update_dissStatus(data));
	},
	postDistributorProductImport(data,param){
		return axios.post(API.post_distributor_product_import(data,param))
	}
}
export default distributorService;