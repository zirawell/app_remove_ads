const url = $request.url;
const isResponse = typeof $response !== "undefined";
let body = $response.body;

switch (isResponse) {
  case /^http:\/\/go\.babytree\.com\/go_pregnancy\/api\/app_index\/get_app_tab/.test(url):
	try {
	  let obj = JSON.parse(body);
	  console.log(obj);
	  if (obj?.data.selected_list?.length > 0) {
		let tabs = [];
		for (let tab of obj.data.selected_list) {
		  const items = [
			"首页",
			"消息",
			"我", 
		  ];
		  if (items?.includes(tab?.name)) {
			tabs.push(tab);
		  }
	  	}
		obj.data.selected_list = tabs;
	  }
	  body = JSON.stringify(obj);
	} catch (error) {
	  console.log(`宝宝树tab获取错误: ` + error);
	}
	break;
  case /^http:\/\/go\.babytree\.com\/go_pregnancy\/api\/cms_column/.test(url):
	try {
	  let obj = JSON.parse(body);
	  console.log(obj);
	  if (obj?.data.list?.length > 0) {
		obj.data.bucket_id = '';
		obj.data.test_id = '';
		obj.data.log_content = '';
		obj.data.list = [];
	  }
	  body = JSON.stringify(obj);
	} catch (error) {
	  console.log(`宝宝树cms获取错误: ` + error);
	}
	break;
  default:
	$done({});
}

$done({ body });