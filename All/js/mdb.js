/********************************
Maidanba Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
^https?:\/\/creditcardapp\.bankcomm\.com\/rcg\/index\.html\?callbackurl=rcg\/index\.html&orclogin=1& url script-response-body https://raw.githubusercontent.com/zirawell/app_remove_ads/main/All/js/mdb.js


Please note that the above rewrite link requires open KOP-XIAO's resource parser

*********************************
Surge4, Loon and Shadowrocket configuration:

[Script]
http-response ^https?:\/\/creditcardapp\.bankcomm\.com\/rcg\/index\.html\?callbackurl=rcg\/index\.html&orclogin=1& script-path=https://raw.githubusercontent.com/zirawell/app_remove_ads/main/All/js/mdb.js

[MITM]
hostname = *.bankcomm.com, *.bankcomm.cn
********************************/
const resp = {};

if (typeof $response !== "undefined") {
  try{
  var parser = new DOMParser();
  var doc = parser.parseFromString($response.body, "text/html");
  var element = doc.getElementById("banner");
  element.parentNode.removeChild(element);
  resp.body = doc.documentElement.outerHTML;
  } catch (error) {
    console.log(`【买单吧-充值页面】获取错误: ` + error);
  }
} 

$done(resp);