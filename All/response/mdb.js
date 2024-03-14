const resp = {};

if (typeof $response !== "undefined") {
  try{
  var parser = new DOMParser();
  var doc = parser.parseFromString($response.body, "text/html");
  var element = doc.getElementById("banner");
  element.parentNode.removeChild(element);
  resp.body = doc.documentElement.outerHTML;
  } catch (error) {
    console.log(`【买单吧-充值页面】获取错误: ` + error);
  }
} 

$done(resp);