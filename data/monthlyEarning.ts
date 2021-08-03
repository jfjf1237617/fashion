import { ElementUiSelectOption } from "~/types";

export const monthlyEarningOptions: ElementUiSelectOption[] = (() => {
  let res = [];
  for (let i=0; i<10; i++) {
    res.push({
      value: String(i*1000),
      label: '$' + i*1000 + ' ~ ' + '$' + (i+1)*1000
    });
  }
  res.push({
    value: '10000',
    label: '> $10000'
  });
  return res;
})();