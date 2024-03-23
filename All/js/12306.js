/********************************
12306 Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
^https:\/\/mobile\.12306\.cn\/otsmobile\/app\/mgs\/mgw\.htm$ url script-request-header https://raw.githubusercontent.com/zirawell/app_remove_ads/main/All/js/12306.js

Please note that the above rewrite link requires open KOP-XIAO's resource parser

*********************************
Surge4, Loon and Shadowrocket configuration:

[Script]
http-request ^https:\/\/mobile\.12306\.cn\/otsmobile\/app\/mgs\/mgw\.htm$ script-path=https://raw.githubusercontent.com/zirawell/app_remove_ads/main/All/js/12306.js

[MITM]
hostname = mobile.12306.cn
********************************/

const url = $request.url;
const header = $request.headers;
const headopt = header["Operation-Type"] || header["operation-type"];
const ua = header["User-Agent"] || header["user-agent"];

const blockList = [
  // "com.cars.otsmobile.bangbangSafe.deciveInfo", // 设备序列号
  // "com.cars.otsmobile.checkLoginStatus", // 登录信息
  // "com.cars.otsmobile.city",
  // "com.cars.otsmobile.initCountry",
  // "com.cars.otsmobile.initNewSysCache",
  // "com.cars.otsmobile.initProvince",
  "com.cars.otsmobile.integration.activityBanner", // 活动横幅
  "com.cars.otsmobile.memberInfo.getMemberQa", // 铁路会员 常见问题
  // "com.cars.otsmobile.memberInfo.integrationHomeInit", // 铁路会员 会员信息
  // "com.cars.otsmobile.newHomePage.getWeatherByStationCode", // 天气信息
  "com.cars.otsmobile.newHomePage.initData", // 热门资讯
  "com.cars.otsmobile.newHomePageBussData" // 商品信息流
  // "com.cars.otsmobile.newHomePageRefresh",
  // "com.cars.otsmobile.travelPage.initData", // 出行服务
];

if (blockList?.includes(headopt)) {
  $done({ status: "HTTP/1.1 404 Not Found" });
} else {
  $done({});
}