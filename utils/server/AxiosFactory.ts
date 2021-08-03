import axios, { AxiosInstance, AxiosResponse } from 'axios';
import CookieHelper from '~/utils/helper/CookieHelper';
import https from 'https'
import { config } from '@vue/test-utils';
const agent = new https.Agent({
  rejectUnauthorized: false
})
export const urlObj = {
  user7003: 'http://api.mixshop.world',
  adm7004: 'https://adm.mixshop.world',
}

export function Log(...args: any[]) {
  if (process.client) {
    let logStyle = 'padding: 1px 2px; border-radius: 4px; color: white; background: black; font-size: 14px;';
    Array.prototype.unshift.call(args, '%cSLog', logStyle);
  }
}

function handleResponseError(response: AxiosResponse<any>) {
  let { config, data, request, status } = response;
  let result: any = {
    status,
    requestURL: config.baseURL + '' + config.url,
    responseURL: request?.responseURL,
    method: config.method,
    authorization: config.headers.authorization
  }
  if (data && typeof data === 'object') {
    result.ResponseData = {
      code: data.code,
      message: data.message,
      dataType: Object.prototype.toString.call(data)
    }
    if (Array.isArray(data)) result.ResponseData.dataLength = data.length;
  }
  return result;
}

export function handleAxiosInstance(instance: AxiosInstance, logPrefix: string, tokenFiled?: string) {
  instance.interceptors.response.use((response) => {
    const res = response.data || {};
    let { code } = res;
    if (code !== 200) {
      Log(`[${logPrefix}] Error: `, handleResponseError(response));
    }
    if (process.client && code === 401) {
      if (tokenFiled) CookieHelper.removeItem(tokenFiled);
    }
    return res;
  }, (error) => {
    return Promise.reject(error);
  });
  //
  instance.interceptors.request.use((request) => {
    request.httpsAgent = agent
    let authorization = request.headers['authorization'];
    request.headers['req-time'] = Date.now();
    if (process.client && !authorization && tokenFiled) {
      let token = CookieHelper.getItem(tokenFiled) || '';
      if (token) {
        request.headers.Authorization = token;
      } 
      // else if(!token && localStorage.getItem("token")) {
      //   let localToken = localStorage.getItem("token");
      //   // let localToken = JSON.parse();
      //   if(localToken){
      //     let parseToken=JSON.parse(localToken);
      //     request.headers.Authorization = parseToken;
      //   }
      // }
    }
    
    return request;
  }, (error) => {
    return Promise.reject(error);
  });
}

export {
  axios,
  AxiosInstance
}

// 
export const BaseAxios: AxiosInstance = axios.create({});
handleAxiosInstance(BaseAxios, 'BaseAxios');

// 
export const Server7003: AxiosInstance = axios.create({
  baseURL: urlObj.user7003
});
handleAxiosInstance(Server7003, 'Server7003', 'userToken');

// 
export const UserAxios: AxiosInstance = axios.create({
  baseURL: urlObj.user7003
});
handleAxiosInstance(UserAxios, 'UserAxios', 'userToken');

// 
export const AdminAxios: AxiosInstance = axios.create({
  baseURL: urlObj.adm7004
});
handleAxiosInstance(AdminAxios, 'AdminAxios', 'token');
