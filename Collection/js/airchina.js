/********************************
AirChina Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
^https:\/\/m\.airchina\.com\.cn\/airchina\/gateway\/v\d(\.\d)*\/api\/services url script-response-header https://raw.githubusercontent.com/zirawell/Ad-Cleaner/main/Collection/js/airchina.js

Please note that the above rewrite link requires open KOP-XIAO's resource parser

*********************************
Surge4, Loon and Shadowrocket configuration:

[Script]
http-request ^https:\/\/m\.airchina\.com\.cn\/airchina\/gateway\/v\d(\.\d)*\/api\/services script-path=https://raw.githubusercontent.com/zirawell/Ad-Cleaner/main/Collection/js/airchina.js

[MITM]
hostname = m.airchina.com.cn
********************************/
const url = $request.url;
const resp = {};
const header = $request.headers;
const proc = header["procedure"];

const blockList = [
  "queryOpenScreenAd",
  "hasUpgrade",
  "getLocalHomePage",
  "getExternalHomePage",
  "queryImportantList",
];

if(blockList.includes(proc)){
  resp.headers = $request.headers;
  $done(resp);
}else{
  $done({});
}