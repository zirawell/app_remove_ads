# Ad-Cleaner
For a clean environment without advertisements for iOS Apps.

本项目旨在建立一个没有广告环境的清爽iOS环境;

**目前，该项目中所有规则仅适用于QuanX**

将来会集成其他环境，将使用Surgio生成相应规则

本项目最初是我自己对于blackmatrix的规则的一些补充，增加了自己常用的App去广告规则。

最初项目中大部分规则由我自己抓包获取;

目前本项目也正在借鉴一些其他优秀的开源项目进行完善;

希望能够对每一个App有自己的去广告规则，可以自己有选择的进行导入;

目前我写了一个程序可以自动生成所有App的规则汇总;

按对应格式创建分流和重写规则即可，拿买单吧App为例：

- 分流规则：买单吧/filter/creditCardBankComm.list

- 重写规则：买单吧/rewrite/creditCardBankComm.conf


## 项目结构

- Adblock 下 App 是对于各 App 的规则，Applet 是对于小程序的规则，名称以拼音或英文首字母进行分组
- Collection 下是所有规则和脚本的合集，分为了总合集，App合集，微信小程序合集，支付宝小程序合集，按文件名字可知

## 特别鸣谢

- [@app2smile](https://github.com/app2smile)
- [@blackmatrix7](https://github.com/blackmatrix7)
- [@DivineEngine](https://github.com/DivineEngine)
- [@KOP-XIAO](https://github.com/KOP-XIAO)
- [@NobyDa](https://github.com/NobyDa)
- [@Orz-3](https://github.com/Orz-3)
- [@fmz200](https://github.com/fmz200)
- [@RuCu6](https://github.com/RuCu6)
- [@Sliverkiss](https://github.com/Sliverkiss)

### 访问量统计

![Visitor Count](https://profile-counter.glitch.me/zirawell/count.svg)

