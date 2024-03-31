/********************************
Pinduoduo Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
^https?:\/\/api\.pinduoduo\.com\/api\/alexa\/\w+\/hub url script-response-body https://raw.githubusercontent.com/zirawell/app_remove_ads/main/All/js/pdd.js

Please note that the above rewrite link requires open KOP-XIAO's resource parser

*********************************
Surge4, Loon and Shadowrocket configuration:

[Script]
http-response ^https?:\/\/api\.pinduoduo\.com\/api\/alexa\/\w+\/hub script-path=https://raw.githubusercontent.com/zirawell/app_remove_ads/main/All/js/pdd.js

[MITM]
hostname = api.pinduoduo.com
********************************/

let body = $response.body;
const isResponse = typeof $response !== "undefined";

if(isResponse){
  try {
  	let obj = JSON.parse(body);
    const bottomTabs = [
      "首页",
      "分类",
      "聊天",
      "个人中心",
    ];
  	if(obj?.result?.icon_set?.length > 0) {
		  obj.result.icon_set = [];
	  }
    if(obj?.result?.buffer_bottom_tabs?.length > 0) {
      let newBufferBottomTabs = [];
      for (let tab of obj.result.buffer_bottom_tabs) {
        if (bottomTabs.includes(tab?.title)) {
          newBufferBottomTabs.push(tab);
        }
      }
      obj.result.buffer_bottom_tabs = newBufferBottomTabs;
    }
    if(obj?.result?.bottom_tabs?.length > 0) {
      let newBottomTabs = [];
      for (let tab of obj.result.bottom_tabs) {
        if (bottomTabs?.includes(tab?.title)) {
          newBottomTabs.push(tab);
        }
      }
      obj.result.bottom_tabs = newBottomTabs;
    }
    body = JSON.stringify(obj);
  } catch (error) {
    console.log(`pdd 获取错误: ` + error);
  }
  $done({ body });
}else{
  $done();
}