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
  let obj = JSON.parse(body);
  if(url.includes("mtop.fliggy.ssif.pattern.home")){
   if(typeof obj?.data?.hierarchy?.structure !== "undefined") {
      let designedRoot = [];
	    let root = obj.data.hierarchy.structure.root;
      if(root && root.length > 0){
        for (let r of root) {
          if (r.includes("s_vertical_homepage_search_btns")||
              r.includes("s_vertical_homepage_kingkong")||
              r.includes("s_vertical_homepage_topservice_layout")||
              r.includes("s_vertical_homepage_cheap")||
              r.includes("s_vertical_homepage_move")||
              r.includes("s_vertical_homepage_xingzhong_welcome")||
              r.includes("s_vertical_homepage_wonderful_journey_channel")||
            ) {
            designedRoot.push(r);
          }
        }
      }
      obj.data.hierarchy.structure.root = designedRoot;
	 }
  }
  body = JSON.stringify(obj);
  $done({ body });
}else{
  $done();
}
