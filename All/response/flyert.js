let body = $response.body;
try {
  let obj = JSON.parse(body);
  let variables = obj.Variables;
  if(variables.data && variables.data.adv){
    variables.data.adv={};
  }
  body = JSON.stringify(obj);
} catch (error) {
  console.log(`flyert获取错误: ` + error);
}
$done({ body });