const DollarRate = new Map([
  ['usd', { rate: 1, insignia: '$'}],
  ['php', { rate: 48.31, insignia: '₱'}],
  ['cny', { rate: 6.5, insignia: '￥'}],
]);

function isNumber(num: any) {
  if (typeof num !== 'number') return false;
  if (num === NaN) return false;
  return true;
}

function transformCheck(originCurrency: string, originMoney: number, targetCurrency: string) {
  if (!DollarRate.has(originCurrency) || !DollarRate.has(targetCurrency)) return 'Invalid Currency';
  if (!isNumber(originMoney)) return 'Invalid Money';
  return "Ok";
}
  
function result(success: boolean, message: string, money: number, insignia = '') {
  let result =  {
    success, message, money, insignia
  }
  return result;
}

export function transformMoney(originCurrency: string, originMoney: number, targetCurrency: string) {
  originCurrency = originCurrency.toLowerCase();
  targetCurrency = targetCurrency.toLowerCase();
  let checkResult = transformCheck(originCurrency, originMoney, targetCurrency);
  if (checkResult !== 'Ok') return result(false, checkResult, originMoney);

  let origin = DollarRate.get(originCurrency);
  let target = DollarRate.get(targetCurrency);
  if (originCurrency === targetCurrency) return result(true, '', originMoney, origin?.insignia);

  let originToDollar = originMoney / (origin as any).rate;
  let originToTarget = originToDollar * (target as any).rate;
  return result(true, '', Number(originToTarget.toFixed(2)), target?.insignia); 
}