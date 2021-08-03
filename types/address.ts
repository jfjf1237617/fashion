export declare type Address = {
  name: string,
  regionCode: string,
  province: string,
  city: string,
  postCode: number,
  region: string,
  addressLine: string,
  detailAddress: string,
  phoneNumber: number,
  id?: number,
  memberId?: number,
  adminId?: number,
  channel?: 'gcash' | 'stripe' | 'paypal',
  createdTime?: string,
  customerId?: string,
  defaultStatus?: number, // 是否默认地址
  status?: number, // >0有效
  updatedTime?: string
}