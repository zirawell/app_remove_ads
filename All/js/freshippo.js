/********************************
Freshippo Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
^https?:\/\/acs(\.|-)m\.(taobao|freshippo)\.com\/gw\/mtop\.wdk\.render\.query(index|my)page url script-response-body https://raw.githubusercontent.com/zirawell/app_remove_ads/main/All/js/freshippo.js

Please note that the above rewrite link requires open KOP-XIAO's resource parser

*********************************
Surge4, Loon and Shadowrocket configuration:

[Script]
http-response ^https?:\/\/acs(\.|-)m\.(taobao|freshippo)\.com\/gw\/mtop\.wdk\.render\.query(index|my)page script-path=https://raw.githubusercontent.com/zirawell/app_remove_ads/main/All/js/freshippo.js

[MITM]
hostname = acs.m.taobao.com, acs-m.freshippo.com
********************************/

const url = $request.url;
let obj=JSON.parse($response.body);

if(url.indexOf("queryindexpage")!=-1){
  try {
    const sceneTemplateId = [
      "509",
      "738"
    ];
    if (obj?.data?.scenes?.length > 0) {
      let scenes = [];
      for (let scene of obj.data.scenes) {
        if (sceneTemplateId.includes(scene.sceneTemplateId)) {
          scenes.push(scene);
        }
      }
      obj.data.scenes = scenes;
    }
  } catch (error) {
    console.log(`盒马主页获取错误: ` + error);
  }
}else if(url.indexOf("querymypage")!=-1){
  try {
    const sceneTemplateId = [
      "906",
      "907",
      "198",
      "286",
      "431",
      "185",
      "230",
      "978",
      "709",
      "432",
      "403",
      "350"
    ];
    if (obj?.data?.scenes?.length > 0) {
      let scenes = [];
      for (let scene of obj.data.scenes) {
        if (sceneTemplateId.includes(scene.sceneTemplateId)) {
          scenes.push(scene);
        }
      }
      obj.data.scenes = scenes;
    }
  } catch (error) {
    console.log(`盒马我的页获取错误: ` + error);
  }
}else{
  $done({});
}
$done({body:JSON.stringify(obj)});

