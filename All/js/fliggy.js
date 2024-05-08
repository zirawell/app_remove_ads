/********************************
Feizhu Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
^https?:\/\/acs\.m\.taobao\.com\/gw\/mtop\.fliggy\.ssif\.pattern\.home url script-response-body https://raw.githubusercontent.com/zirawell/app_remove_ads/main/All/js/fliggy.js

Please note that the above rewrite link requires open KOP-XIAO's resource parser

*********************************
Surge4, Loon and Shadowrocket configuration:

[Script]
http-response ^https?:\/\/acs\.m\.taobao\.com\/gw\/mtop\.fliggy\.ssif\.pattern\.home script-path=https://raw.githubusercontent.com/zirawell/app_remove_ads/main/All/js/fliggy.js

[MITM]
hostname = acs.m.taobao.com
********************************/

const url = $request.url;
const isResponse = typeof $response !== "undefined";
let body = $response.body;

if(isResponse){
  try {
    let obj = JSON.parse(body);
    if(url.includes("mtop.fliggy.ssif.pattern.home")){
      const designedStructure = {
        "root" : [
          "s_vertical_homepage_tab_container",
          "home_guess_single_tab_content_1439446"
        ],
        "home_guess_single_tab_content_1439446" : [
          
        ]
      };
  	 if(typeof obj?.data?.hierarchy?.structure !== "undefined") {
		    obj.data.hierarchy.structure = designedStructure;
	   }
    }
    body = JSON.stringify(obj);
  } catch (error) {
    console.log(`fliggy 获取错误: ` + error);
  }
  $done({ body });
}else{
  $done();
}
