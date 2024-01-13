let body = $response.body;
try {
  let obj = JSON.parse(body);
  let result = obj.resultbody;
  result.adsTabFeeds=[];
  body = JSON.stringify(obj);
} catch (error) {
  console.log(`51job获取错误: ` + error);
}
$done({ body });