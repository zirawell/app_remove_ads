/********************************
Flyert Remove Ads - Version 1.0
Please note that you may need to reinstall app for script to work.

QuantumultX rewrite link:
^https?:\/\/www\.flyert\.com\/.*plugin url script-response-body https://raw.githubusercontent.com/zirawell/Ad-Cleaner/main/Collection/js/flyert.js

Please note that the above rewrite link requires open KOP-XIAO's resource parser

*********************************
Surge4, Loon and Shadowrocket configuration:

[Script]
http-response ^https?:\/\/www\.flyert\.com\/.*plugin script-path=https://raw.githubusercontent.com/zirawell/Ad-Cleaner/main/Collection/js/flyert.js

[MITM]
hostname = www.flyert.com
********************************/

let body = $response.body;
let headers = $response.headers;
const isResponse = typeof $response !== "undefined";
const isJson = headers["Content-Type"] == "application/json";
if(isResponse && isJson){
  let obj = JSON.parse(body);
  if(obj?.Variables){
    let variables = obj.Variables;
    if(variables.data && variables.data.adv){
      variables.data.adv={};
    }
  }
  body = JSON.stringify(obj);
  $done({ body });
}else{
  $done();
}