/********************************
Flyert Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
^https?:\/\/www\.flyert\.com\/plugin\.php url script-response-body https://raw.githubusercontent.com/zirawell/app_remove_ads/main/All/js/flyert.js

Please note that the above rewrite link requires open KOP-XIAO's resource parser

*********************************
Surge4, Loon and Shadowrocket configuration:

[Script]
http-response ^https?:\/\/www\.flyert\.com\/plugin\.php script-path=https://raw.githubusercontent.com/zirawell/app_remove_ads/main/All/js/flyert.js

[MITM]
hostname = www.flyert.com
********************************/

let body = $response.body;
const isResponse = typeof $response !== "undefined";
if(isResponse){
  try {
    let obj = JSON.parse(body);
    let variables = obj.Variables;
    if(variables.data && variables.data.adv){
      variables.data.adv={};
    }
    body = JSON.stringify(obj);
  } catch (error) {
    console.log(`flyert获取错误: ` + error);
  }
  $done({ body });
}