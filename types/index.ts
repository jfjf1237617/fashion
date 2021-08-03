export * from './product';
export * from './address';

export declare type BaseServerResponse = {
  code: 200 | 401 | 402 | 403 | 500;
  data: (Array<any> | Object);
  message: String;
}

export declare type ElementUiSelectOption = {
  value: string,
  label: string
}

export declare type CheckoutParams = {
  channel: 'stripe' | 'paypal' | 'gcash' | 'paysession',
  shareCode?: string, // 二者选其一
  skuBlindBoxCode?: string, // 二者选其一
  adminId?: number, 
  productId?: number, 
  price?: string, 
  skuId?: number,
  num?: number,
  payMethod?: string,
  addressId?: number,
}