/********************************
163News Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
^https?:\/\/gw\.m\.163\.com\/nc\/api\/v\d\/feed\/dynamic\/headline-list\? url script-response-body https://raw.githubusercontent.com/zirawell/Ad-Cleaner/main/Collection/js/163news.js
^https?:\/\/gw\.m\.163\.com\/nc\/api\/v\d\/search\/hot-word url script-response-body https://raw.githubusercontent.com/zirawell/Ad-Cleaner/main/Collection/js/163news.js
^https?:\/\/nex\.163\.com\/q url script-response-body https://raw.githubusercontent.com/zirawell/Ad-Cleaner/main/Collection/js/163news.js

Please note that the above rewrite link requires open KOP-XIAO's resource parser

*********************************
Surge4, Loon and Shadowrocket configuration:

[Script]
http-response ^https?:\/\/gw\.m\.163\.com\/nc\/api\/v\d\/feed\/dynamic\/headline-list\? script-path=https://raw.githubusercontent.com/zirawell/Ad-Cleaner/main/Collection/js/163news.js
http-response ^https?:\/\/gw\.m\.163\.com\/nc\/api\/v\d\/search\/hot-word script-path=https://raw.githubusercontent.com/zirawell/Ad-Cleaner/main/Collection/js/163news.js
http-response ^https?:\/\/nex\.163\.com\/q script-path=https://raw.githubusercontent.com/zirawell/Ad-Cleaner/main/Collection/js/163news.js

[MITM]
hostname = gw.m.163.com, nex.163.com
********************************/

const url = $request.url;
const obj = JSON.parse(typeof $response != "undefined" && $response.body || null);
let body = $response.body;
if(obj && obj.data){
  if (url.includes("/feed/dynamic/headline-list")) {
    // 信息流
    if (obj?.data?.items?.length > 0) {
      // 移除置顶新闻
      obj.data.items = obj.data.items.filter((i) => !(i?.tagList?.length > 0));
    }
  } else if (url.includes("/nex.163.com/q")) {
    // 开屏广告
    if (obj?.ads?.length > 0) {
      obj.ads = [];
    }
  } else if (url.includes("/search/hot-word")) {
    // 搜索框
    if (obj?.data?.special?.length > 0) {
      // 猜你想搜
      obj.data.special = [];
    }
    // if (obj?.data?.hotWordList?.length > 0) {
    //     热搜列表
    //   obj.data.hotWordList = [];
    // }
    if (obj?.data?.RollhotWordList?.length > 0) {
      // 搜索框填充词
      obj.data.RollhotWordList = [];
    }
  }
  body = JSON.stringify(obj);
  $done({ body });
}else{
  $done();
}