/********************************
51JOB Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
^https?:\/\/cupid\.51job\.com\/open\/noauth\/recommend\/job-tab-dynamic url script-response-body https://raw.githubusercontent.com/zirawell/app_remove_ads/main/All/js/51job.js


Please note that the above rewrite link requires open KOP-XIAO's resource parser

*********************************
Surge4, Loon and Shadowrocket configuration:

[Script]
http-response ^https?:\/\/cupid\.51job\.com\/open\/noauth\/recommend\/job-tab-dynamic script-path=https://raw.githubusercontent.com/zirawell/app_remove_ads/main/All/js/51job.js

[MITM]
hostname = cupid.51job.com
********************************/

let body = $response.body;
const isResponse = typeof $response !== "undefined";
if(isResponse){
  try {
    let obj = JSON.parse(body);
    let result = obj.resultbody;
    result.adsTabFeeds=[];
    body = JSON.stringify(obj);
  } catch (error) {
    console.log(`51job获取错误: ` + error);
  }
  $done({ body });
}