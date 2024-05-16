/********************************
51CTO Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
^https?:\/\/edu\.51cto\.com\/app\.php\?$ url script-response-body https://raw.githubusercontent.com/zirawell/app_remove_ads/main/All/js/51cto.js

Please note that the above rewrite link requires open KOP-XIAO's resource parser

*********************************
Surge4, Loon and Shadowrocket configuration:

[Script]
http-response ^https?:\/\/edu\.51cto\.com\/app\.php\?$ script-path=https://raw.githubusercontent.com/zirawell/app_remove_ads/main/All/js/51cto.js

[MITM]
hostname = edu.51cto.com
********************************/

let body = $response.body;
let headers = $response.headers;
const isResponse = typeof $response !== "undefined";
const isJson = headers["Content-Type"] == "application/json";

if(isResponse && isJson){
  let obj = JSON.parse(body);
  let result = obj.result;
  if(result.adv_summary){
    result.adv_summary={};
  }
  if(result.hasAd){
    result.hasAd="0";
  }
  if(result.indexAd){
    result.indexAd={};
  }
  if(result.showThird){
    result.showThird="0";
  }
  if(result.status){
    result.status="0";
  }
  if(result.appVersion){
    result.appVersion="3.5.0";
  }
  if(result.ad){
    result.ad={};
  }
  if(result.isExist){
    result.isExist="0";
  }
  body = JSON.stringify(obj);
  $done({ body });
}