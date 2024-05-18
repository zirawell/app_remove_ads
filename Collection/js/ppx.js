/********************************
Pipix Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
^https?:\/\/.+\.pipix\.com\/bds\/feed\/channel_list\/ url script-response-body https://raw.githubusercontent.com/zirawell/app_remove_ads/main/All/js/ppx.js
^https?:\/\/.+\.pipix\.com\/bds\/user\/check_in\/ url script-response-body https://raw.githubusercontent.com/zirawell/app_remove_ads/main/All/js/ppx.js

Please note that the above rewrite link requires open KOP-XIAO's resource parser

*********************************
Surge4, Loon and Shadowrocket configuration:

[Script]
http-response ^https?:\/\/.+\.pipix\.com\/bds\/feed\/channel_list\/ script-path=https://raw.githubusercontent.com/zirawell/app_remove_ads/main/All/js/ppx.js
http-response ^https?:\/\/.+\.pipix\.com\/bds\/user\/check_in\/ script-path=https://raw.githubusercontent.com/zirawell/app_remove_ads/main/All/js/ppx.js

[MITM]
hostname = *.pipix.com
********************************/

const url = $request.url;
const scriptEnvironment = typeof $task != 'undefined' ? 'Surge' : (typeof $loon != 'undefined' ? 'Loon' : (typeof $httpClient != 'undefined' ? 'Qx' : 'Unknown'));

if (!$response.body || scriptEnvironment === 'Unknown') {
  $done({});
}

let obj = JSON.parse($response.body);

function filterProfileEntrances() {
  let profileEntrances = obj.data.profile_entrances;
  let titlesToFilter = ['放心借', '创作中心', '原创特权', '小黑屋', '我的订单'];
  obj.data.profile_entrances = profileEntrances.filter(entry => !titlesToFilter.includes(entry.title));
  fixPos(obj.data.profile_entrances);
}

function filterChannelModel() {
  if (obj.data.channel_model) {
    obj.data.channel_model = obj.data.channel_model.filter(item => ["feed", "image_text"].includes(item.event_name));
    fixPos(obj.data.channel_model);
  }
}

function fixPos(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].pos = i + 1;
  }
}

if (url.includes("/bds/user/check_in/")) {
  filterProfileEntrances();
} else if (url.includes("/bds/feed/channel_list/")) {
  filterChannelModel();
}

$done({ body: JSON.stringify(obj) });
