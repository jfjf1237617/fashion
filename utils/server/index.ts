import { axios, Server7003, urlObj, Log, AxiosInstance, BaseAxios, handleAxiosInstance } from './AxiosFactory';
import { BaseServerResponse, CheckoutParams, Address } from '~/types';
import { UserInfo } from '~/types/UserInfo';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import CookieHelper from '~/utils/helper/CookieHelper';
import Cookies from "js-cookie";
// export function getProductDetail(shareCode: string ): Promise<BaseServerResponse>{
//   let url = '/product/getProductDetail/' + shareCode;
//   return Server7003.get(url);
// }
export function getProductDetail(shareCode: string): Promise<BaseServerResponse> {
  let url = '/product/shareCode/' + shareCode;
  return Server7003.get(url);
}
export function getCountryList() {
  return BaseAxios.get(urlObj.adm7004 + '/config/country/list');
}

export class UserServer {
  instance: AxiosInstance;
  tokenField = 'userToken';
  constructor() {
    this.instance = axios.create({
      baseURL: urlObj.user7003
    });
    handleAxiosInstance(this.instance, 'UserServer', this.tokenField);
  }

  init() {
    if (process.server) {
      console.error('###Warn: UserServer Init In SSR. ###');
      return;
    }
    let token = CookieHelper.getItem(this.tokenField);
    if (!token) return;
    this.instance.defaults.headers.authorization = token;
  }

  async autoRetry(url: string, params: any, methods = 'POST'): Promise<any> {
    let res: any = await (methods !== 'GET' ? this.instance.post(url, params) : this.instance.get(url));
    let { code } = res;
    if (code === 200) return res;
    if (process.client && code === 401) {
      let usp = new URLSearchParams(location.search);
      await this.anonymouseLogin(usp.get('p') || '');
      let newRes: any = await (methods === 'POST' ? this.instance.post(url, params) : this.instance.get(url));
      return newRes;
    }
    return res;
  }

  async anonymouseLogin(shareCode: string) {
    let token = CookieHelper.getItem(this.tokenField);
    if (token) return;
    const fpPromise = FingerprintJS.load();
    const fp = await fpPromise
    const result = await fp.get();
    const visitorId = result.visitorId
    Log('visitorId: ', visitorId);
    let { code, data } = await this.instance.post('/sso/login2', {
      username: visitorId,
      password: '123456',
      type: 2,
      shareCode
    }) as any;
    if (code === 200) {
      let token = 'Bearer ' + data.token;
      CookieHelper.setItem(this.tokenField, token);
      return true;
    }
    return false;
  }

  getCheckout(params: CheckoutParams, num = 1) {
    if (!params.num) params.num = num;
    // let url = (params.channel === 'paypal') ? '/pay/paypal/order' : '/pay/stripe/session';
    if (params.channel === 'gcash') {
      params.payMethod = 'gcash_ph';
      params.channel = 'paysession';
    }
    let url = '/pay/create/order';
    return this.autoRetry(url, params);
  }

  getAddressList() {
    return this.instance.get('/member/address/list');
  }
  addAddress(address: Address) {
    return this.autoRetry('/member/address/add', address);
  }

  recordOperate(code: 'checkOut' | string, productId: string, skuId: string, adminId: number) {
    let params = {
      code, val: productId, remark: skuId, adminUid: adminId
    }
    return this.instance.post('/config/record', params);
  }
  copyDescript(name: string,
    subTitle: string,
    price: number,
    stock: number) {

  }
  blindBoxAssist(code: string) {
    return this.autoRetry('/blindBox/assist?code=' + code, undefined, 'GET');
  }
}

export class Server {
  instance: AxiosInstance;
  tokenField = 'token';

  constructor() {
    this.instance = axios.create({
      baseURL: urlObj.adm7004
    });
    handleAxiosInstance(this.instance, 'AdminServer', this.tokenField);
  }

  init() {
    if (process.server) {
      console.error('###Warn: AdminServer Init In SSR. ###');
      return;
    }
    let token = CookieHelper.getItem(this.tokenField);
    if (!token) return;
    this.instance.defaults.headers.authorization = token;
  }

  async login(username: string, password: string) {
    let params: any = { username, password }
    let res: any = await this.instance.post('/admin/login', params);
    if (res.code === 200) {
      let token = res.data.tokenHead + res.data.token;
      CookieHelper.setItem(this.tokenField, token);
      Cookies.set(this.tokenField, token, { sameSite: 'Lax' });
    }
    return res;
  }

  logout() {
    CookieHelper.clear('logout');
    return this.instance.post('/admin/logout');
  }

  async getSelfInfo(token?: string) {
    // if (process.client && !CookieHelper.getItem(this.tokenField)) return {};
    // console.log(token);
    let config: any = {};
    if (token) {
      config['headers'] = {
        Authorization: token
      }
    }
    let res: any = await this.instance.get('/admin/0', token ? config : undefined);
    if (process.client) {
      if (res.code !== 200) CookieHelper.clear();
    }
    return res;
  }

  updateSelfInfo(userInfo: UserInfo) {
    return this.instance.post('/admin/update/0', userInfo);
  }

  register(params: any) {
    return this.instance.post('/admin/register', params);
  }

  // page-rep
  getProductList(pageNum = 1, pageSize = 10) {
    return this.instance.get('/distributor/product/list?pageNum=' + pageNum + '&pageSize=' + pageSize);
  }

  getSelfProductList(pageNum = 1, pageSize = 5) {
    return this.instance.get('/distributor/product/self?pageNum=' + pageNum + '&pageSize=' + pageSize);
  }
  getHotProductList(pageNum = 1, pageSize = 4, recommandStatus = 1) {
    return this.instance.get('/product/list?pageNum=' + pageNum + '&pageSize=' + pageSize + '&recommandStatus=' + recommandStatus)
  }
  getOrderList(pageNum = 1, pageSize = 5) {
    return this.instance.post('/order/list?pageNum=' + pageNum + '&pageSize=' + pageSize, {});
  }

  addProducts(ids: number[]) {
    return this.instance.post(`/distributor/product/update/publishStatus?ids=${ids.join(",")}&publishStatus=1`);
  }
  removeProducts(ids: number[]) {
    return this.instance.post(`/distributor/product/update/publishStatus?ids=${ids.join(",")}&publishStatus=0`);
  }

  deleteProducts(ids: number[]) {
    return this.instance.post(`/distributor/product/update/publishStatus?ids=${ids.join(",")}&publishStatus=0`);
  }

  // shareProducts( id: number ) {
  //   return this.instance.get('/distributor/product/share/' + id);
  // }

  shareProduct(productId: number, skuId: number) {
    return this.instance.post('/distributor/product/v2/share/', { productId, skuId });
  }

  getOrderDetail(id: string) {
    return this.instance.get('/order/new/' + id);
  }
  withdrawIncome(params: any) {
    return this.instance.post('/distributor/withdraw', params);
  }
  // end page-rep

  updateProductSku(productId: number, skuId: number, disPrice: number, currencyCode?: string) {
    let url = '/distributor/product/sku/update/' + productId;
    let params = {
      id: skuId,
      currencyCode: currencyCode,
      disPrice: disPrice
    }
    return this.instance.post(url, [params]);
  }

  recordOperate(code: 'adminShare' | string, productId: string, skuId: string) {
    let params = {
      code, val: productId, remark: skuId
    }
    return this.instance.post('/config/record', params);
  }
  getShopifyOrder(params?:object) {
    return this.instance.get('/shopify/orders', {params});
  }
}

export default Server;
