const url = $request.url;
const isResponse = typeof $response !== "undefined";

switch (isResponse) {
  let body = $response.body;
  let obj = JSON.parse(body);

  case /^https?:\/\/acs\.m\.taobao\.com\/gw\/mtop\.wdk\.render\.queryindexpage/.test(url):
  try {
    const removeSceneTemplateId = [
      "358",
    ];
    if (obj?.data？.scenes?.length > 0) {
      let scenes = [];
      for (let scene of obj.data.scenes) {
        if (!removeSceneTemplateId?.includes(scene.sceneTemplateId)) {
          scenes.push(scene);
        }
      }
      obj.data.scenes = scenes;
    }
    body = JSON.stringify(obj);
  } catch (error) {
    console.log(`盒马主页获取错误: ` + error);
  }
  break;

  case /^https?:\/\/acs\.m\.taobao\.com\/gw\/mtop\.wdk\.sg\.querysinglescene/.test(url):
  try {
    if (obj?.data?.content !== "undefined") {
      obj.data.content=[];
    }
    body = JSON.stringify(obj);
  } catch (error) {
    console.log(`盒马悬浮doodle获取错误: ` + error);
  }
  break;

  default:
  $done({});
}