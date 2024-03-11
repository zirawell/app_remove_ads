let body = $response.body;
const isResponse = typeof $response !== "undefined";
if(isResponse){
  try {
    let obj = JSON.parse(body);
    let result = obj.resultbody;
    result.adsTabFeeds=[];
    body = JSON.stringify(obj);
  } catch (error) {
    console.log(`51job获取错误: ` + error);
  }
  $done({ body });
}