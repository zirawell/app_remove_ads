/********************************
ABC Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
^https?:\/\/mobilepaas\.abchina\.com\.cn:\d+\/mgw\.htm$ url script-response-header https://raw.githubusercontent.com/zirawell/Ad-Cleaner/main/Collection/js/abc.js

Please note that the above rewrite link requires open KOP-XIAO's resource parser

*********************************
Surge4, Loon and Shadowrocket configuration:

[Script]
http-request ^https?:\/\/mobilepaas\.abchina\.com\.cn:\d+\/mgw\.htm$ script-path=https://raw.githubusercontent.com/zirawell/Ad-Cleaner/main/Collection/js/abc.js

[MITM]
hostname = mobilepaas.abchina.com.cn
********************************/

const url = $request.url;
const header = $request.headers;
const headopt = header["Operation-Type"] || header["operation-type"];

const blockList = [
    "com.bankabc.recommendcenter.homepage.gethpadverinfo",
    "com.abchina.mbank.common.homepage.getStartParam"
];

if (blockList?.includes(headopt)) {
  $done({ status: "HTTP/1.1 404 Not Found" });
} else {
  $done({});
}