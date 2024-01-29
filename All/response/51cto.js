let body = $response.body;
try {
  let obj = JSON.parse(body);
  let result = obj.result;
  result.adv_summary={};
  body = JSON.stringify(obj);
} catch (error) {
  console.log(`51cto获取错误: ` + error);
}
$done({ body });