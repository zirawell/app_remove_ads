/********************************
CCBLIFE Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
^https?:\/\/api\.alipan\.com\/apps\/v\d\/users\/home\/(news|widgets) url script-response-body https://raw.githubusercontent.com/zirawell/Ad-Cleaner/main/Collection/js/adrive.js
^https?:\/\/member\.alipan\.com\/v\d\/users\/onboard_list url script-response-body https://raw.githubusercontent.com/zirawell/Ad-Cleaner/main/Collection/js/adrive.js

Please note that the above rewrite link requires open KOP-XIAO's resource parser

*********************************
Surge4, Loon and Shadowrocket configuration:

[Script]
http-response ^https?:\/\/api\.alipan\.com\/apps\/v\d\/users\/home\/(news|widgets) script-path=https://raw.githubusercontent.com/zirawell/Ad-Cleaner/main/Collection/js/adrive.js
http-response ^https?:\/\/member\.alipan\.com\/v\d\/users\/onboard_list script-path=https://raw.githubusercontent.com/zirawell/Ad-Cleaner/main/Collection/js/adrive.js

[MITM]
hostname = member.alipan.com, api.alipan.com
********************************/

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes("/users/onboard_list")) {
  if (obj.result?.length > 0) {
    obj.result = obj.result.filter(
      (i) =>
        ![
          "backup_list_under_mydevice_banner",
          "backup_top_banner",
          "home_top_banner",
          "resource_top_banner"
        ].includes(i?.anchor)
    );
  }
} else if (url.includes("/users/home/news")) {
  if (obj.result?.length > 0) {
    obj.result = obj.result.filter((i) => !i?.code?.includes("productUpdate"));
  }
} else if (url.includes("/users/home/widgets")) {
  const item = [
    "banners", // 顶部奖励
    "coreFeatures", // 横版图标
    "mainBackup", // 手机备份
    "minorBackup", // 备份设备列表
    "signIn" // 签到
  ];
  item.forEach((i) => {
    delete obj[i];
  });
}

$done({ body: JSON.stringify(obj) });
