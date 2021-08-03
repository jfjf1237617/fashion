import API from "~/global/request/api";
import axios from "~/global/request/axios";
const adminService = {
	loginAdminInfo() {
		return axios.get(API.login_admin_info);
	},
	postAdminAttachment(data) {
		return axios.post(API.post_admin_attachment, data);
	},
	getAdminAttachment() {
		return axios.get(API.get_admin_attachment);
	},
	getAdminShare(param) {
		return axios.get(API.get_admin_share(param));
	},
	getAdminRef() {
		return axios.get(API.get_admin_ref);
	}
}
export default adminService;