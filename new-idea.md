super big:


专利:基于filesaver的代码压缩机制
bue.js
分布式代码构建




big:

实现data-hacker-if指令
实现data-hacker-for指令
实现vm中this.$store的变化监听
修复第一次更改组件的$store之后comp instance丢失问题-------普通data也一样--因为DOMNodeRemoved被意外触发了  尤其可见-html和-txt
模拟实现hacker的路由系统

增加命令式手动动态替换



middle:


ref的使用补充:循环里使用ref

消除index.js里B_BEFORE_ROUTE_CHANGE与响应式创建中心的耦合
hacker规则声明和全局的key相同时候报错

实现hacker组件的手动销毁
多重if

原创文章分享:使用whistle和xhook实现项目运行时随意更换调用局域网api服务



small

hacker的BX_MODE改为debugMode

_data更改为data





bug fix:
keep-alive的玩意儿返回时候出发404



重大bug:
不支持超过2级的响应式数据---------------------!!!!!!!!!!!!!!!!!!
指令里的表达式不支持非this.开头，比如那个isEditing前面加！就报错
input框change就触发了一大堆log，性能低下
区域中心详情编辑保存几次之后卡顿

优化：
parser里add bus时候加上node节点特征，检测节点销毁时候根据特征匹配出所有相关的bus，干掉




修复请求拦截器clear hook的问题-解决加不加captureHttpBeforeReady都得mounted里写50s之后再请求的问题













about bue

big:

使用创建link和script的方式优化http请求,尽可能多命中缓存





7 快速集成第三方示例组件：一个成熟的第三方组件提供的示例组件，通常都是一个可以运行的网页。如果你的应用程序需要集成这个第三方组件，通常都方式都是将这个第三方网页里的各个部分拆解出对应代码放到现有的程序里，这个过程非常容易出错，尤其涉及一些复杂点儿的第三方组件，也非常容易产生代码冲突和样式冲突。本框架通过iframe的形式进行第三方组件的加载，且提供合理的通讯机制，让使用者达到快速集成示例组件的目的。