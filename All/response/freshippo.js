const url = $request.url;
const isResponse = typeof $response !== "undefined";

if(url.indexOf("queryindexpage")!=-1){
  try {
    let body = $response.body;
    let obj = JSON.parse(body);
    const sceneTemplateId = [
      "509",
      "738"
    ];
    if (obj?.data?.scenes?.length > 0) {
      let scenes = [];
      for (let scene of obj.data.scenes) {
        if (sceneTemplateId.includes(scene.sceneTemplateId)) {
          scenes.push(scene);
        }
      }
      obj.data.scenes = scenes;
      console.log("主页"+ scenes.length);
    }
    body = JSON.stringify(obj);
  } catch (error) {
    console.log(`盒马主页获取错误: ` + error);
  }
}else if(url.indexOf("querymypage")!=-1){
  try {
    let body = $response.body;
    let obj = JSON.parse(body);
    const sceneTemplateId = [
      "906",
      "907",
      "198",
      "286",
      "431",
      "185",
      "230",
      "978",
      "709",
      "432",
      "403",
      "350"
    ];
    if (obj?.data?.scenes?.length > 0) {
      let scenes = [];
      for (let scene of obj.data.scenes) {
        if (sceneTemplateId.includes(scene.sceneTemplateId)) {
          scenes.push(scene);
        }
      }
      obj.data.scenes = scenes;
      console.log("我的页"+ scenes.length);
    }
    body = JSON.stringify(obj);
  } catch (error) {
    console.log(`盒马我的页获取错误: ` + error);
  }
}
$done({});
