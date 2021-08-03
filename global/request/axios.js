import axios from 'axios';
import CookieHelper from '~/utils/helper/CookieHelper';
import Cookies from "js-cookie";
import store from "vuex";
const CancelToken = axios.CancelToken;
let requestQueue = [];
function handleRequest({ config }) {
	const { url, method, data = {}, params = {} } = config;
	const jData = JSON.stringify(data);
	const jParams = JSON.stringify(params);
	const pending = requestQueue.filter(item => {
		return item.url === url && item.method === method && item.data === jData && item.params === jParams;
	})
	if (pending.length) {
		config.cancelToken = new CancelToken(c => c(`重复请求被主动拦截:${url}+${jData}+${jParams}`));
	} else {
		requestQueue.push({
			url,
			data: jData,
			params: jParams,
			method,
		})
	}
};
function handleResponse({ config }) {
	const { url, data = JSON.stringify({}), params = JSON.stringify({}) } = config;
	let reqQueue = requestQueue.filter(item => {
		return item.url !== url && item.data !== data && item.params !== params
	})
	requestQueue = reqQueue;
}
// import Vue from 'vue'
// import router from './router'
const axiosInstance = axios.create({
	baseURL: 'https://adm.mixshop.world',
	// timeout: 10000,
});
axiosInstance.interceptors.request.use(config => {
	handleRequest({ config });
	if (location.search.includes('token')) {
		Cookies.remove('token')
		let token = `Bearer ${location.search.slice(7)}`
		Cookies.set('token', token);
		config.headers.Authorization = token;
	} else if (document.cookie.match('token')) {
		let token = CookieHelper.getItem('token');
		config.headers.Authorization = token;
	}
	// start
	// if (document.cookie.match('token')) {
	// 	let token = CookieHelper.getItem('token');
	// 	config.headers.Authorization = token;
	// }else if (location.search.includes('token')) {
	// 	let token = `Bearer ${location.search.slice(7)}`
	// 	localStorage.setItem('token', JSON.stringify(token));
	// 	// await this.$store.dispatch("adminUser/getUser", token);
	// 	document.cookie = `token=${token}`;
	// 	config.headers.Authorization = token;
	// } else if (localStorage.getItem('token')) {
	// 	let token = JSON.parse(localStorage.getItem('token'));
	// 	config.headers.Authorization = token;
	// }
	// end
	// else if(localStorage.getItem('token')){
	// 	let token = JSON.parse(localStorage.getItem('token'));
	// 	config.headers.Authorization = token;
	// }
	// else if (location.search.includes('token')) {
	// 	config.headers.Authorization = token;
	// 	let token = `Bearer ${location.search.slice(7)}`
	// 	Cookies.set('token', token);
	// 	config.headers.Authorization = token;
	// }
	return config;
}, error => {
	return Promise.reject(error);
});
axiosInstance.interceptors.response.use(function (response) {
	handleResponse({ config: response.config });
	return response;
})
// axiosInstance.interceptors.response.use(response => {
//   return response;
// }, error => {
//   if (error.response.data.message) {
//     Vue.prototype.$message({ type: 'error', message: error.response.data.message })
//   }
//   if (error.response.status === 401) {
//     router.push('/login')
//   }
//   return Promise.reject(error);
// });
export default {
	post(url = "", data = {}, config = {}) {
		return axiosInstance.post(url, data, config);
	},
	put(url = "", data = {}, config = {}) {
		return axiosInstance.put(url, data, config);
	},
	patch(url = "", data = {}, config = {}) {
		return axiosInstance.patch(url, data, config);
	},
	get(url = "", params = {}, config = {}) {
		const OPTIONS = { params, ...config };
		return axiosInstance.get(url, OPTIONS);
	},
	delete(url = "", params = {}, config = {}) {
		const OPTIONS = { params, ...config };
		return axiosInstance.delete(url, OPTIONS);
	}
};
