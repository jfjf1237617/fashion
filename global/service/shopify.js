import API from "~/global/request/api";
import axios from "~/global/request/axios";
const shopifyService = {
	shopifyAuthorizeUrl(params){
		return axios.get(API.shopify_authorize_url,params);
	},
	getShopifyFashionAuthorizeUrl(params){
		return axios.get(API.get_shopify_fashion_authorize_url,params);
	},
	getOrderList(params){
		return axios.get(API.get_order_list,params);
	},
	getLocation(){
		return axios.get(API.get_shopify_locations);
	},
	putShopifyOrder(orderId,bodyData){
		return axios.put(API.put_shopify_order(orderId),bodyData);
	},
	getShopifyConfig(){
		return axios.get(API.get_shopify_config);
	},
	putShopifyConfigPriceRate(rate){
		return axios.put(API.put_shopify_config_priceRate(rate));
	},
	putShopifyOrderConfirm(id){
		return axios.put(API.put_shopify_order_confirm(id));
	},
	postShopifyOrderPay(id){
		return axios.post(API.post_shopify_order_pay(id));
	},
	getShopifyOrderStatus(id){
		return axios.get(API.get_shopify_order_status(id));
	},
	updatePassword(params){
		return axios.post(API.update_password,params);
	},
	shopifyLogin(params){
		return axios.post(API.shopify_login,params);
	}
}
export default shopifyService;
