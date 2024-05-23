/********************************
51JOB Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
^https?:\/\/cupid\.51job(app)?\.com\/open\/noauth\/recommend\/job-tab-dynamic url script-response-body https://raw.githubusercontent.com/zirawell/Ad-Cleaner/main/Collection/js/51job.js


Please note that the above rewrite link requires open KOP-XIAO's resource parser

*********************************
Surge4, Loon and Shadowrocket configuration:

[Script]
http-response ^https?:\/\/cupid\.51job(app)?\.com\/open\/noauth\/recommend\/job-tab-dynamic script-path=https://raw.githubusercontent.com/zirawell/Ad-Cleaner/main/Collection/js/51job.js

[MITM]
hostname = cupid.51job*.com
********************************/

let body = $response.body;
const isResponse = typeof $response !== "undefined";
if(isResponse){
  let obj = JSON.parse(body);
  obj.resultbody.adsTabFeeds=[];
  body = JSON.stringify(obj);
  $done({ body });
}