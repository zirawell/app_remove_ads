/********************************
Alicdn Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
^https?:\/\/g\.alicdn\.com\/.*o2o-ad url script-response-body https://raw.githubusercontent.com/zirawell/Ad-Cleaner/main/Collection/js/alicdn.js

Please note that the above rewrite link requires open KOP-XIAO's resource parser

*********************************
Surge4, Loon and Shadowrocket configuration:

[Script]
http-response ^https?:\/\/g\.alicdn\.com\/.*o2o-ad script-path=https://raw.githubusercontent.com/zirawell/Ad-Cleaner/main/Collection/js/alicdn.js

[MITM]
hostname = g.alicdn.com
********************************/

const url = $request.url;
const isResponse = typeof $response != "undefined";
let body = $response.body;

if(isResponse){
  body = body.replace(/!function (e, t)/g,'!function0 (e, t)')
  $done({ body });
}else{
  $done();
}
