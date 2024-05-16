/********************************
BabyTree Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
^https?:\/\/go\.babytree\.com\/go_pregnancy\/api\/(app_index|cms_column) url script-response-body https://raw.githubusercontent.com/zirawell/app_remove_ads/main/All/js/babytree.js

Please note that the above rewrite link requires open KOP-XIAO's resource parser

*********************************
Surge4, Loon and Shadowrocket configuration:

[Script]
http-response ^https?:\/\/go\.babytree\.com\/go_pregnancy\/api\/(app_index|cms_column) script-path=https://raw.githubusercontent.com/zirawell/app_remove_ads/main/All/js/babytree.js

[MITM]
hostname = go.babytree.com, api.babytree.com, plough.babytree.com
********************************/
const url = $request.url;
let body = $response.body;
let headers = $response.headers;
const isResponse = typeof $response !== "undefined";
const isJson = headers["Content-Type"] == "application/json";

if(isResponse && isJson){
  let obj = JSON.parse(body);
  if(url.includes("/api/app_index/get_app_tab")){
    if (obj?.data.selected_list?.length > 0) {
			let tabs = [];
			const items = [
				"首页",
				"消息",
				"我",
			];
			for (let tab of obj.data.selected_list) {
				if (items?.includes(tab?.name)) {
					tabs.push(tab);
				}
			}
			obj.data.selected_list = tabs;
		}
	}else if(url.includes("/api/cms_column")){
		if (obj?.data.list?.length > 0) {
			obj.data.bucket_id = '';
			obj.data.test_id = '';
			obj.data.log_content = '';
			obj.data.list = [];
		}
	}
  body = JSON.stringify(obj);
  $done({ body });
}else{
  $done();
}