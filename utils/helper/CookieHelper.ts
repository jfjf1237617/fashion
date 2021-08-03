/*\
|*|
|*|  :: cookies.js ::
|*|
|*|  A complete cookies reader/writer framework with full unicode support.
|*|
|*|  https://developer.mozilla.org/en-US/docs/DOM/document.cookie
|*|
|*|  This framework is released under the GNU Public License, version 3 or later.
|*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
|*|
|*|  Syntaxes:
|*|
|*|  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
|*|  * docCookies.getItem(name)
|*|  * docCookies.removeItem(name[, path], domain)
|*|  * docCookies.hasItem(name)
|*|  * docCookies.keys()
|*|
\*/

const CookieHelper = {
  getItem: function (sKey: string) {
    let result = decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    return result;
  },
  setItem: function (sKey: string, sValue: any, vEnd?: any, sPath?: any, sDomain?: any, bSecure?: any) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    } else sExpires = ("; expires=Fri, 31 Dec 9999 23:59:59 GMT" + vEnd);
    let cookie: string = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + ("; path=" + (sPath || "/")) + (bSecure ? "; secure" : "");
    
    document.cookie = cookie;
    return true;
  },
  removeItem: function (sKey: string, sPath?: any, sDomain?: any) {
    if (!sKey || !this.hasItem(sKey)) { return false; }
    let cookie:string = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ("; path=" + (sPath || "/"));
    document.cookie = cookie;
    return true;
  },
  hasItem: function (sKey: string) {
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  },
  keys: /* optional method: you can safely remove it! */ function (): string[] {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
  },
  clear: function(from?: string){
    let keys: string[] = this.keys();
    keys.forEach(key => {
      this.removeItem(key);
    });
  },
  getAll: function(): any {
    let keys: string[] = this.keys();
    let result: any = {};
    keys.forEach(key => {
      result[key] = this.getItem(key);
    });
    return result;
  }
};

export default CookieHelper;