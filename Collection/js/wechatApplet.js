/********************************
WechatApplet Remove Ads - Version 1.0

Please note that you may need to reinstall app for script to work.

Please note that the above rewrite link requires open KOP-XIAO's resource parser

********************************/

const url = $request.url;
const obj = JSON.parse(typeof $response != "undefined" && $response.body || null);
let body = $response.body;

if(obj && obj.data){
  //EMS中国邮政物流速递
  if (url.includes("ump.ems.com.cn")){
    obj.info.moduleJson = JSON.stringify(JSON.parse(obj.info.moduleJson).filter(item => !item.moduleName.includes("广告")));
  //小兔充充
  }else if(url.includes("mapi.xiaotucc.com")){
    if(url.includes("main_page/index/getActivity")){
      delete obj.data.p3;
    }else if(url.includes("mall/main")){
      delete obj.data;
    }
  //全家微会员
  }else if(url.includes("minifm.maxxipoint.com")){
    delete obj.data.topBanner;
  //罗森点点
  }else if(url.includes("lawsonapi.yorentown.com")){
    delete obj.data.homeButtonList;
    delete obj.data.dysmorphismPictureList;
  //茶颜悦色
  }else if(url.includes("miniapp.sexytea2013.com")){
    delete obj.data.INDEX_SLOT_01;
    delete obj.data.INDEX_SLOT_02;
    obj.data?.INDEX_TOP_BANNER?.contents?.forEach(item => {
      delete item.bubble; 
      delete item.figure; 
    });
  //CoCo点单+
  }else if(url.includes("coco-com.e.verystar.net")){
    delete obj.data.top_background_url;
    delete obj.data.bottom_banner_list;
  }

  body = JSON.stringify(obj);
  $done({ body });
}else{
  $done();
}