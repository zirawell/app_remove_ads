/********************************
CCBHome Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
^https?:\/\/opss\.qiye\.ccbhome\.cn\/ccbhome-open\/home\/common url script-response-body https://raw.githubusercontent.com/zirawell/Ad-Cleaner/main/Collection/js/ccbHome.js

Please note that the above rewrite link requires open KOP-XIAO's resource parser

*********************************
Surge4, Loon and Shadowrocket configuration:

[Script]
http-response ^https?:\/\/opss\.qiye\.ccbhome\.cn\/ccbhome-open\/home\/common script-path=https://raw.githubusercontent.com/zirawell/Ad-Cleaner/main/Collection/js/ccbHome.js

[MITM]
hostname = online.sptcc.com
********************************/

const url = $request.url;
const isResponse = typeof $response != "undefined";
let body = $response.body;

if(isResponse){
  let obj = JSON.parse(body);
  if(obj?.data?.curtains){
    obj.data.curtains=[];
  }
  if(obj?.data?.startAds){
    obj.data.startAds=[];
  }
  if(obj?.data?.customer){
    obj.data.customer=null;
  }
  body = JSON.stringify(obj);
  $done({ body });
}else{
  $done();
}
