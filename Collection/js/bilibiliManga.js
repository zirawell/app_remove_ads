/********************************
Bilibili Manga Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
^https?:\/\/manga\.bilibili\.com\/twirp\/user\.v\d\.User\/UCenterConf url script-response-body https://raw.githubusercontent.com/zirawell/Ad-Cleaner/main/Collection/js/bilibiliManga.js
^https?:\/\/manga\.bilibili\.com\/twirp\/user\.v\d\.User\/GetInitInfo url script-response-body https://raw.githubusercontent.com/zirawell/Ad-Cleaner/main/Collection/js/bilibiliManga.js
^https?:\/\/manga\.bilibili\.com\/twirp\/comic\.v\d\.Home\/HomeFeed url script-response-body https://raw.githubusercontent.com/zirawell/Ad-Cleaner/main/Collection/js/bilibiliManga.js

Please note that the above rewrite link requires open KOP-XIAO's resource parser

*********************************
Surge4, Loon and Shadowrocket configuration:

[Script]
http-response ^https?:\/\/manga\.bilibili\.com\/twirp\/user\.v\d\.User\/UCenterConf script-path=https://raw.githubusercontent.com/zirawell/Ad-Cleaner/main/Collection/js/bilibiliManga.js
http-response ^https?:\/\/manga\.bilibili\.com\/twirp\/user\.v\d\.User\/GetInitInfo script-path=https://raw.githubusercontent.com/zirawell/Ad-Cleaner/main/Collection/js/bilibiliManga.js
http-response ^https?:\/\/manga\.bilibili\.com\/twirp\/comic\.v\d\.Home\/HomeFeed script-path=https://raw.githubusercontent.com/zirawell/Ad-Cleaner/main/Collection/js/bilibiliManga.js

[MITM]
hostname = manga.bilibili.com
********************************/

const url = $request.url;
const obj = JSON.parse(typeof $response != "undefined" && $response.body || null);
let body = $response.body;

if(obj && obj.data){
  //我的页按钮展示
  if (url.includes("/UCenterConf")){
    const showPattern = [
      "活动中心",
      "个性装扮",
      "我的已购",
      "超漫俱乐部",
    ];
    if(obj.data.confs?.length > 0) {
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
  //我的页底部关注官方号提示去除
  }else if(url.includes("/GetInitInfo")){
    if(obj?.data){
      obj.data.had_follow_offcial=true;
    }
  //首页去除商品推荐
  }else if(url.includes("/HomeFeed")){
    if(obj?.data?.feeds?.length > 0){
      obj.data.feeds = obj.data.feeds.filter(function(feed) {
         if(!feed.image.includes("/mall/")){
          return feed;
        }
      });
    }
  }
  body = JSON.stringify(obj);
  $done({ body });
}else{
  $done();
}