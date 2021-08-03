export function isEmail(val: string) {
  var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,20})$/;
  // var domains= ["qq.com","163.com","vip.163.com","263.net","yeah.net","sohu.com","sina.cn","sina.com","eyou.com","gmail.com","hotmail.com","42du.cn"];
  if(pattern.test(val)) {
      // var domain = val.substring(val.indexOf("@")+1);
      // for(var i = 0; i< domains.length; i++) {
      //     if(domain == domains[i]) {
      //         return true;
      //     }
      // }
      return true;
  }
  return false;
}