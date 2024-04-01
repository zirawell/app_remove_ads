/********************************
Feizhu Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
^https?:\/\/acs\.m\.taobao\.com\/gw\/mtop\.fliggy\.ssif\.pattern\.home url script-response-body https://raw.githubusercontent.com/zirawell/app_remove_ads/main/All/js/fliggy.js

Please note that the above rewrite link requires open KOP-XIAO's resource parser

*********************************
Surge4, Loon and Shadowrocket configuration:

[Script]
^https?:\/\/acs\.m\.taobao\.com\/gw\/mtop\.fliggy\.ssif\.pattern\.home script-path=https://raw.githubusercontent.com/zirawell/app_remove_ads/main/All/js/fliggy.js

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
        "s_vertical_homepage_topservice_layout": [
          "s_vertical_homepage_topservice_title",
          "s_vertical_homepage_topservice_content_i_0",
          "s_vertical_homepage_topservice_content_i_1"
        ],
        "s_share_guessyoulike_home_gul_tab_layout": [
          "s_share_guessyoulike_home_gul_tab_2021"
        ],
        "root": [
          "s_vertical_homepage_inner_scroll_layout",
          "s_vertical_homepage_cheap_2021_5",
          "s_vertical_homepage_wonderful_journey_channel",
          "s_vertical_homepage_cheap_bottom_gap",
          "s_vertical_homepage_topservice_layout"
        ],
        "s_vertical_homepage_inner_scroll_layout": [
          "s_vertical_homepage_search_btns_2022",
          "s_vertical_homepage_kingkong_2022"
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
