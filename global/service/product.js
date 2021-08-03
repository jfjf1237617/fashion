import API from "~/global/request/api";
import axios from "~/global/request/axios";
const productService = {
	allList(params) {
		return axios.get(API.get_distributor_product_list, params);
	},
	searchList(params) {
		return axios.get(API.search_product_list, params);
	},
	squareAuthorize() {
		return axios.get(API.square_authorize);
	},
	squareImportProduct(productId) {
		return axios.post(API.square_import_product(productId))
	},
	shopifyAuthorizeBack() {
		return axios.get(API.shopify_authorize_back)
	},
	shopifyAuthorizeUrl(params) {
		return axios.get(API.shopify_authorize_url, params)
	},
	shopifyImportProduct(params) {
		return axios.post(API.shopify_import_product(params))
	},
	getCountryList() {
		return axios.get(API.get_country_list)
	},
	getProductCategory() {
		return axios.get(API.get_product_category);
	},
	getProductAwsCategory() {
		return axios.get(API.get_product_category_aws_list);
	}
}
export default productService;