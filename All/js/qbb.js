/********************************
Qbb Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
^https?:\/\/webapi\.qbb6\.com\/h5\/api\/lib\/internal\/append\/get url script-response-body https://raw.githubusercontent.com/zirawell/app_remove_ads/main/All/js/qbb.js

Please note that the above rewrite link requires open KOP-XIAO's resource parser

*********************************
Surge4, Loon and Shadowrocket configuration:

[Script]
http-response ^https?:\/\/webapi\.qbb6\.com\/h5\/api\/lib\/internal\/append\/get script-path=https://raw.githubusercontent.com/zirawell/app_remove_ads/main/All/js/qbb.js

[MITM]
hostname = webapi.qbb6.com
********************************/

const url = $request.url;
const isResponse = typeof $response != "undefined";
let body = $response.body;

if(isResponse){
  let obj = JSON.parse(body);
  if(obj?.adBannerList){
    obj.adBannerList=[];
  }
  body = JSON.stringify(obj);
  $done({ body });
}else{
  $done();
}
