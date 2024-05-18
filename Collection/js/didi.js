/********************************
Sptcc Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
^https?:\/\/ct\.xiaojukeji\.com\/agent\/v\d\/feeds url script-response-body https://raw.githubusercontent.com/zirawell/Ad-Cleaner/main/Collection/js/didi.js
^https?:\/\/freight\.xiaojukeji\.com\/gateway url script-response-body https://raw.githubusercontent.com/zirawell/Ad-Cleaner/main/Collection/js/didi.js
^https?:\/\/res\.xiaojukeji\.com\/resapi\/activity\/(m|xp)get url script-response-body https://raw.githubusercontent.com/zirawell/Ad-Cleaner/main/Collection/js/didi.js
^https?:\/\/conf\.diditaxi\.com\.cn\/homepage\/v\d\/(other\/fast|core) url script-response-body https://raw.githubusercontent.com/zirawell/Ad-Cleaner/main/Collection/js/didi.js
^https?:\/\/conf\.diditaxi\.com\.cn\/dynamic\/conf url script-response-body https://raw.githubusercontent.com/zirawell/Ad-Cleaner/main/Collection/js/didi.js
^https?:\/\/common\.diditaxi\.com\.cn\/common\/v\d\/usercenter\/me url script-response-body https://raw.githubusercontent.com/zirawell/Ad-Cleaner/main/Collection/js/didi.js

Please note that the above rewrite link requires open KOP-XIAO's resource parser

*********************************
Surge4, Loon and Shadowrocket configuration:

[Script]
http-response ^https?:\/\/ct\.xiaojukeji\.com\/agent\/v\d\/feeds script-path=https://raw.githubusercontent.com/zirawell/Ad-Cleaner/main/Collection/js/didi.js
http-response ^https?:\/\/freight\.xiaojukeji\.com\/gateway  script-path=https://raw.githubusercontent.com/zirawell/Ad-Cleaner/main/Collection/js/didi.js
http-response ^https?:\/\/res\.xiaojukeji\.com\/resapi\/activity\/(m|xp)get script-path=https://raw.githubusercontent.com/zirawell/Ad-Cleaner/main/Collection/js/didi.js
http-response ^https?:\/\/conf\.diditaxi\.com\.cn\/homepage\/v\d\/(other\/fast|core) script-path=https://raw.githubusercontent.com/zirawell/Ad-Cleaner/main/Collection/js/didi.js
http-response ^https?:\/\/conf\.diditaxi\.com\.cn\/dynamic\/conf script-path=https://raw.githubusercontent.com/zirawell/Ad-Cleaner/main/Collection/js/didi.js
http-response ^https?:\/\/common\.diditaxi\.com\.cn\/common\/v\d\/usercenter\/me script-path=https://raw.githubusercontent.com/zirawell/Ad-Cleaner/main/Collection/js/didi.js

[MITM]
hostname = ct.xiaojukeji.com, freight.xiaojukeji.com, res.xiaojukeji.com, conf.diditaxi.com.cn, common.diditaxi.com.cn
********************************/

const url = $request.url;
if (!$response.body) $done({});

let obj = JSON.parse($response.body);

if (url.includes("/other/pGetSceneList")) {
  if (obj && obj.data && obj.data.scene_list instanceof Array) {
    obj.data.scene_list = obj.data.scene_list.filter(item => item.text !== "优惠商城");
  }
  if (obj && obj.data && obj.data.show_data instanceof Array) {
    obj.data.show_data.forEach((block) => {
      if (block.scene_ids instanceof Array) {
        block.scene_ids = block.scene_ids.filter(id => id !== "scene_coupon_mall");
      }
    });
  }
}

if (url.includes("/homepage/v") && url.includes("/core")) {
  // 保留打车、代驾、青桔骑行
  const keepNavIds = ['dache_anycar', 'driverservice', 'bike' ];
  if (obj.data && obj.data.order_cards && obj.data.order_cards.nav_list_card && obj.data.order_cards.nav_list_card.data) {
    obj.data.order_cards.nav_list_card.data = obj.data.order_cards.nav_list_card.data.filter(item => keepNavIds.includes(item.nav_id));
  }
  // 保留底部tap首页、我的
  const keepBottomNavIds = ['v6x_home', 'user_center' ];
  if (obj.data && obj.data.disorder_cards && obj.data.disorder_cards.bottom_nav_list && obj.data.disorder_cards.bottom_nav_list.data) {
    obj.data.disorder_cards.bottom_nav_list.data = obj.data.disorder_cards.bottom_nav_list.data.filter(item => keepBottomNavIds.includes(item.id));
  }
}

if (url.includes("/ota/na/yuantu/infoList")) {
if (obj.data && obj.data.disorder_cards && obj.data.disorder_cards.top_banner_card && obj.data.disorder_cards.top_banner_card.data && obj.data.disorder_cards.top_banner_card.data[0] && obj.data.disorder_cards.top_banner_card.data[0].T === "yuentu_top_banner") {
    // 移除顶部卡片
    obj.data.disorder_cards.top_banner_card.data.splice(0, 1);
 }
}

if (url.includes("/usercenter/me")) {
  const excludedTitles = ['天天领福利', '金融服务', '更多服务', '企业服务', '安全中心'];

  if (obj.data && obj.data.cards) {
    obj.data.cards = obj.data.cards.filter(card => !excludedTitles.includes(card.title));

    obj.data.cards.forEach(card => {
      if (card.tag === "wallet") {
        if (card.items) {
          card.items = card.items.filter(item => item.title === "优惠券");
        }
        if (card.card_type === 4 && card.bottom_items) {
          card.bottom_items = card.bottom_items.filter(item => 
            item.title === "省钱套餐" || item.title === "天天神券"
          );
        }
      }
    });
  }
}

if (url.includes("/resapi/activity") || url.includes("/dynamic/conf") || url.includes("/other/fast") || url.includes("/agent/v")) {
  delete obj.data;
}

$done({ body: JSON.stringify(obj) });
