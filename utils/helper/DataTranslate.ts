import { ProductDetail, ProductItem, ProductSku } from '~/types';

export function translateProductDetailOld(originData: any): ProductDetail {
  let { product, sku, skuStockList } = originData;
  if (sku.disPrice) sku.price = sku.disPrice;

  const images: string[] = [product.pic];
  (product.albumPics as string || '').split(',').forEach(url => {
    if (/http/.test(url)) images.push(url);
  });

  // const skuMap: Map<number, ProductSku> = new Map();
  // (skuStockList as Array<ProductSku>).forEach((skuObj) => {
  //   if(skuObj.spData) skuObj.attrArray = JSON.parse(skuObj.spData);
  //   if (skuObj.disPrice) skuObj.price = skuObj.disPrice;
  //   skuMap.set(skuObj.id, skuObj);
  // });
  return {
    product: product as ProductItem,
    images: images,
    skuList: [sku]
    // skuMap: skuMap,
    // skuList: skuStockList
  };
}

export function translateProductDetail(originData: any): any {
  let skuList = originData.skuList;
  let images: string[] = [originData.pic];
  (originData.albumPics as string || '').split(',').forEach(url => {
    if (/http/.test(url)) images.push(url);
  });
  const skuMap = new Map();
  if(skuList) (skuList as any[]).forEach(curSku => {
    if (curSku.spData) {
      let strArr: any[] = [];
      let attr: any[] = JSON.parse(curSku.spData);
      attr.forEach(obj => {
        let key = obj.key;
        if ('颜色' === key) key = 'Color';
        strArr.push(`${key}: ${obj.value}`);
      });
      curSku.attrStr = strArr.join(' + ');
    }
    if (curSku.disPrice) curSku.price = curSku.disPrice;
    skuMap.set(curSku.id, curSku);
  });
  return {
    product: originData,
    skuMap,
    skuList,
    images
  }
}