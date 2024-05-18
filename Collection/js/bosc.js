/********************************
BOSC Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
^https:\/\/mgs1\.bosc\.cn:3601\/mgw url script-response-header https://raw.githubusercontent.com/zirawell/Ad-Cleaner/main/Collection/js/bosc.js

Please note that the above rewrite link requires open KOP-XIAO's resource parser

*********************************
Surge4, Loon and Shadowrocket configuration:

[Script]
http-request ^https:\/\/mgs1\.bosc\.cn:3601\/mgw script-path=https://raw.githubusercontent.com/zirawell/Ad-Cleaner/main/Collection/js/bosc.js

[MITM]
hostname = cupid.51job.com
********************************/
const url = $request.url;
const header = $request.headers;
const headopt = header["Operation-Type"] || header["operation-type"];

const blockList = [
  "com.GLMobile.Market.PopupListQry",
  "com.GLMobile.Customer.QryGreeting",
  "alipay.client.updateVersion",
  "alipay.client.getUnionResource",
  "com.GLMobile.Market.SecondFloorResourcesQry",
  "com.GLMobile.NewOnlineService.HomeData",
  "com.GLMobile.Customer.HomePageInfoQry"

];
  
blockList.includes(headopt)?$done({ status: "HTTP/1.1 404 Not Found" }):$done({});