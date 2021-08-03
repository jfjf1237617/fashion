import API from "~/global/request/api";
import axios from "~/global/request/axios";
const resellerService = {
  postResellerAddress(data) {
    return axios.post(API.post_reseller_address, data);
  },
  modifyResellerAddress(addressId, data) {
    return axios.post(API.modify_reseller_address(addressId), data);
  },
  getResellerAddressList() {
    return axios.get(API.get_reseller_address_list);
  },
  getResellerOrders() {
    return axios.get(API.get_reseller_orders);
  },
  putResellerOrders(orderId, data) {
    return axios.put(API.put_reseller_orders(orderId), data);
  },
  getResellerOrdersCode(code) {
    return axios.get(API.get_reseller_orders_code(code));
  },
  postResellerRequest(data) {
    return axios.post(API.post_reseller_request, data);
  },
  getResellerRequestList(params) {
    return axios.get(API.get_reseller_request_list, params);
  },
  getResellerTotal(params) {
    return axios.get(API.get_reseller_total, params);
  }
}
export default resellerService;