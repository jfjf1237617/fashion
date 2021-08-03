export function toMap(objArr: any[], byFiled: string): Map<any, any>{
  const result = new Map();
  if (!Array.isArray(objArr)) return result;
  objArr.forEach(obj => {
    result.set(obj[byFiled], obj);
  });
  return result;
}