export declare type ProductSku = {
  id: number;
  productId: number;
  skuCode: string;
  price: number;
  stock: number;
  lockStock: number;
  spData: string; //'[{"key":"颜色","value":"金色"},{"key":"容量","value":"16G"}]'
  attrArray: Array<{
    key: string,
    value: string
  }>,
  disPrice?: number
}

export declare type ProductItem = {
  id: number;
  brandId: number;
  productCategoryId: 19;
  name: string;
  pic: string; //"http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180607/5ac1bf58Ndefaac16.jpg"
  price: number; //3788.0
  giftGrowth: number; //3788
  giftPoint: number; //3788
  subTitle: string; //"AI智慧全面屏 6GB +64GB 亮黑色 全网通版 移动联通电信4G手机 双卡双待手机 双卡双待"
  originalPrice: number; //4288.0
  stock: number; //1000
  lowStock: number; //0
  unit: string; //"件"
  albumPics: string; //图片url拼接，http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180607/5ab46a3cN616bdc41.jpg,http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180607/5ac1bf5fN2522b9dc.jpg"
  detailTitle: string; //""
  brandName: string; //"华为"
  productCategoryName: string; //"手机通讯"
  description: string; //""
}

export declare type ProductDetail = {
  product: ProductItem,
  skuMap?: Map<number, ProductSku>,
  images: string[],
  skuList: ProductSku[]
};
