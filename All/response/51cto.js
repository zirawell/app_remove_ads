let body = $response.body;
const isResponse = typeof $response !== "undefined";
if(isResponse){
  try {
    let obj = JSON.parse(body);
    let result = obj.result;
    result.adv_summary={};
    result.hasAd="0";
    result.indexAd={};
    result.showThird="0";
    result.status="0";
    result.appVersion="3.5.0";
    result.ad=[];
    body = JSON.stringify(obj);
  } catch (error) {
    console.log(`51cto获取错误: ` + error);
  }
  $done({ body });
}