/*步步宝多账号
步骤:重写-添加
类型:script-request-header
url:填上https://bububao.duoshoutuan.com/user/login?
路径:https://github.com/gitehabu/YI-SHI-XIAO/blob/main/BBBDK.js*/



function randomn(n) {
  let res = ''
  for (; res.length < n; res += Math.random().toString(36).substr(2).toUpperCase()) {}
  return res.substr(0, n)
}
var modifiedHeaders = $request.headers;
//console.log(modifiedHeaders);

modifiedHeaders['imei'] =randomn(8)+'-'+randomn(4)+'-'+randomn(4)+'-'+randomn(4)+'-'+randomn(12);
console.log(modifiedHeaders);
console.log(JSON.stringify(modifiedHeaders));
$done({headers : modifiedHeaders});
