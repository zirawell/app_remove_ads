/********************************
Umetrip Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
^https?:\/\/(bkclient|umerp|home)\.umetrip\.com(\.cn){0,1}\/gateway\/api\/umetrip\/native url script-request-header https://raw.githubusercontent.com/zirawell/app_remove_ads/main/All/js/umetrip.js

Please note that the above rewrite link requires open KOP-XIAO's resource parser

*********************************
Surge4, Loon and Shadowrocket configuration:

[Script]
http-request ^https?:\/\/(bkclient|umerp|home)\.umetrip\.com(\.cn){0,1}\/gateway\/api\/umetrip\/native script-path=https://raw.githubusercontent.com/zirawell/app_remove_ads/main/All/js/umetrip.js

[MITM]
hostname = umerp.umetrip.com, umerp.umetrip.com.cn, home.umetrip.com, bkclient.umetrip.com.cn
********************************/

const url = $request.url;
const header = $request.headers;
const ua = $request.headers.rpid||$request.headers.Rpid;
const blockIds = [
	"1000002",
	"1000019",
];

if(blockIds.includes(ua)){
	$done({status:"HTTP/1.1 404 Not Found"});
}else{
	$done();
}