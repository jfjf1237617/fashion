import { getProductDetail } from '~/utils/server';
import Vue from "vue"
const DollarCurrencyRate = new Map([
  ['php', { rate: 48.31, insignia: '₱' }],
  ['cny', { rate: 7, insignia: '￥' }],
]);
export function translateDollar(dollar: number, currency?: string, toString = false): any {
  if (!currency || !DollarCurrencyRate.has(currency)) currency = 'php';
  let cur: any = DollarCurrencyRate.get(currency);
  if (toString) {
    return cur.insignia + (cur.rate * dollar).toFixed(2);
  }
  return {
    insignia: cur.insignia,
    money: (cur.rate * dollar).toFixed(2)
  }
}

export function getNavigatorObject() {
  let res: any = {};
  for (let key in navigator) {
    let val = (navigator as any)[key];
    if (typeof val === 'function') continue;
    res[key] = val;
  }
  return res;
}

export function firstUppercase(word: string) {
  if (!word || typeof word !== "string") return word;
  word = word.trim();
  if (word.length <= 1) return word;
  return word[0].toUpperCase() + word.substr(1);
}

export function copyToClip(content: string) {
  var aux = document.createElement("input");
  aux.setAttribute("value", content);
  document.body.appendChild(aux);
  aux.select();
  document.execCommand("copy");
  document.body.removeChild(aux);
}
export async function copyDescribe(shareCode: any) {
  let res = await getProductDetail(String(shareCode));
  if (res.code === 200) {
    let data: any = res.data;
    let name = data.name;
    let des = data.description;
    let price = (48.31 * data.price).toFixed(2);
    // let copyPre = document.createElement('input');
    // copyPre.value = `${name}\r\n${des}\r\n₱ ${price}`
    let copyPre = document.createElement("pre");
    copyPre.innerText = `${name}\r\n${des}\r\n₱ ${price}`;
    let range: any = document.createRange();
    let selection: any = window.getSelection();
    document.body.appendChild(copyPre);
    // copyPre.select();
    // copyPre.setSelectionRange(0,copyPre.value.length);
    range.selectNodeContents(copyPre);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("copy");
    document.body.removeChild(copyPre)
  }
}
export function formatDate(formatStr: string, type: string, dateObj: Date) {
  if (!type && !formatStr) formatStr = "yyyy-MM-dd HH:mm:ss:ms";
  else if ("date" === type) formatStr = "yyyy-MM-dd";
  else if ("time" === type) formatStr = "HH:mm:ss";
  if (!dateObj) dateObj = new Date();
  let month = dateObj.getMonth() + 1;
  let day = dateObj.getDate();
  let hours = dateObj.getHours();
  let minutes = dateObj.getMinutes();
  let seconds = dateObj.getSeconds();
  formatStr = formatStr.replace("yyyy", dateObj.getFullYear() + '');
  formatStr = formatStr.replace("MM", `${month > 9 ? "" : 0}${month}`);
  formatStr = formatStr.replace("dd", `${day > 9 ? "" : 0}${day}`);
  formatStr = formatStr.replace("HH", `${hours > 9 ? "" : 0}${hours}`);
  formatStr = formatStr.replace("mm", `${minutes > 9 ? "" : 0}${minutes}`);
  formatStr = formatStr.replace("ss", `${seconds > 9 ? "" : 0}${seconds}`);
  formatStr = formatStr.replace("ms", dateObj.getMilliseconds() + '');
  return formatStr;
}

export function deduplication(arr: any[], field: string, filterEmpty?: Boolean) {
  let set = new Set();
  return arr.filter(obj => {
    let val = obj[field];
    if (filterEmpty && !val) return false;
    if (set.has(val)) return false;
    set.add(val);
    return true;
  });
}

export function getType(param: any): string {
  let arr = Object.prototype.toString.call(param).substr(8).toLowerCase().split('');
  arr.pop();
  return arr.join('');
}
export function isType(param: any, typeStr: string) {
  return getType(param) === typeStr.toLowerCase();
}
