/********************************
Bilibili Manga Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
^https?:\/\/manga\.bilibili\.com\/twirp\/user\.v\d\.User\/UCenterConf url script-response-body https://raw.githubusercontent.com/zirawell/app_remove_ads/main/All/js/bilibiliManga.js
^https?:\/\/manga\.bilibili\.com\/twirp\/user\.v\d\.User\/FollowOffcial url script-request-header https://raw.githubusercontent.com/zirawell/app_remove_ads/main/All/js/bilibiliManga.js

Please note that the above rewrite link requires open KOP-XIAO's resource parser

*********************************
Surge4, Loon and Shadowrocket configuration:

[Script]
http-response ^https?:\/\/manga\.bilibili\.com\/twirp\/user\.v\d\.User\/UCenterConf script-path=https://raw.githubusercontent.com/zirawell/app_remove_ads/main/All/js/bilibiliManga.js
http-request ^https?:\/\/manga\.bilibili\.com\/twirp\/user\.v\d\.User\/FollowOffcial script-path=https://raw.githubusercontent.com/zirawell/app_remove_ads/main/All/js/bilibiliManga.js

[MITM]
hostname = manga.bilibili.com
********************************/

let body = $response.body;
const isResponse = typeof $response !== "undefined";

if(isResponse){
  try {
  	let obj = JSON.parse(body);
    const showPattern = [
      "活动中心",
      "个性装扮",
      "我的已购",
      "超漫俱乐部",
    ];
    if(obj?.data?.confs?.length > 0) {
      let newConfs = [];
      for (let conf of obj.data.confs) {
        if (showPattern.includes(conf?.title)) {
          newConfs.push(conf);
        }
      }
      obj.data.confs = newConfs;
    }
    obj.data.show_welfare = false;
    obj.data.show_all_welfare = false;
    body = JSON.stringify(obj);
  } catch (error) {
    console.log(`bilibili manga 获取错误: ` + error);
  }
  $done({ body });
}else{
  delete $request.headers["session_id"];
  $done();
}