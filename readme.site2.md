1 一种web应用单文件组件解析器

2 一种支持加载vue组件的web应用单文件组件解析器

3 一种支持加载vue组件和react组件的web应用单文件组件解析器

4 一种支持加载vue组件，react组件和web components的web应用单文件组件解析器

5 一种允许在angular应用里通过指令加载vue组件的技术

6 一种允许在angular应用里通过指令加载vue组件和react组件的技术

7 一种允许在angular应用里通过指令加载vue组件，react组件和web components的技术

8 一种通过JavaScript对象描述在网页加载完成后动态替换目标元素的技术

9 一种通过浏览器端JavaScript实现对web应用程序进行构建的技术

10 一种通过Javascript对象描述实现对基于xmlhttprequest的http请求进行拦截的技术

11 一种通过Javascript对象描述实现对基于fetch api的http请求进行拦截的技术

12 一种利用html5的data属性实现的用于开发web应用程序的指令技术

13 一种通过json数据结构描述复杂表单构造与联动关系的手段

14 一种用于通过json描述动态生成支持复杂行为的vue组件的理论

15 基于filesaver和uglifyjs的纯浏览器端代码压缩合并导出机制

16 一种分布式web项目构建技术

17 一种不借助于任何构建工具实现的支持模糊匹配加载的vue约定式路由机制

18 一种不借助于任何构建工具在需要加载时自动加载的vue组件加载机制

19 一种不使用构建工具解析react jsx代码并允许react组件和vue组件互相调用的技术

20 一种基于nodejs技术和sftp协议实现命令行一键发布多个项目到多台目标服务器的技术

21 一种使用.jsx为文件扩展名的单文件vue组件定义规范与运行时动态解析技术

22 一种通过在检验ssh公钥私钥配对后动态监控生产环境web应用并上报的理论

23 一种通过公网服务器,frp技术,sim卡APN与whistle进行对局域网web应用随时随地抓包的理论

24 一种通过检测url变化与ssh公钥私钥配对动态为web应用程序安全地添加全局变量从而方便生产环境程序调试的技术

25 一种在react web应用运行时动态加载vue组件并支持自动销毁的技术

26 一种在vue web应用里动态加载react组件并支持自动销毁的技术

27 一种基于nodemon实现的web前端应用热更新的技术

28 一种在使用websocket实现热更新的web应用里随时开启于关闭热更新的手段

29 一种在使用websocket实现热更新的web应用里随时开启于关闭热更新的手段

30 一种在使用Server-sent Events实现热更新的web应用里随时开启于关闭热更新的手段

31 一种使用node-webkit与web socket实现的模拟windows命令行的没有图形化界面的方便在上班期间摸鱼的在线斗地主游戏










vue composition api:

github:
https://github.com/vuejs/composition-api

cdn:

https://cdn.jsdelivr.net/npm/@vue/composition-api@1.0.0-beta.20

official docs:
https://vue-composition-api-rfc.netlify.app/api.html


郝哥说的 raf？
https://github.com/huxiaoqi567/animation-util

page.js 路由库：
https://github.com/visionmedia/page.js

1 不推荐在 viewmodel 里声明 template，请到对应的 html 文件里写模板
2 样式无法在 html 文件里使用<style></style>书写，且仅仅支持原生 css 的写法，不用考虑命名覆盖的问题，已做了 css scoped;如果要声明样式请在对应的 viewmodel 的 js 文件里使用 styles 声明
3 新建组件在 public 目录下的 tpl 和 vm 目录里新建对应的文件，命名必须完全一致，格式采用全部小写加中划线分割的形式
4 viewmodel 对应的 js 文件里无需声明任何 components，声明了也不管用，引擎会自动解析 html 里的内容并注入进去；写法采用 window.Bue.vm["my-test"]的形式注册 viewmodel 声明
5 系统模板入口位于 app.html 里 script 部分 id 为 app-entry 的模板内，该部分模板和其它任何由网络加载而来的 html 文件内都可以调用 app.html 内其它 script 定义的模板
6 如果把类似 app.xxx 组件写成了 xxx，即少了一个 app.，会白屏，错误解决以后有时间了再处理
7 由于在浏览器端进行模板编译和解析，消耗性能高，可能页面载入会有轻微卡顿，请灵活使用第 10 条所说的异步去进行懒加载
8 s.vm 是一个非常关键的方法，用于传递一个和对应的模板文件和 viewmodel 文件同名的组件名称，异步创建一个组件，返回一个带有$$mount方法的promise实例，因此可以通过调用返回值的$$mount 方法将生成的 viewmodel 实例挂载到目标 dom 元素上
9 有时候给一个类似 el-button 的东西绑定点击等事件，触发时控制台会报错，但是不影响正常运行
10 支持异步组件，调用格式：<bue.async :vm="\_self" comp="async-comp" v-if="loadAsyncComp"></bue.async> ,:vm="\_self"表示把当前 bue.async 所在的组件的 viewmodel 实力注入进去，被远程加载的组件可以通过 this.\$\$vm 去访问，comp 为远程组件的名称
11 务必使用 chrome 浏览器进行开发，不保证对任何 chrome 之外的浏览器进行支持
12 vm 里的 styles 配置可以使用&作为 key，表示当前 vm 本身的视图容器
13 vm 里的 styles 配置可以声明为 function 且可以使用 this 关键词，this 指代的是 vm 配置
14 可以再模板文件里再次自定义子模板

16 babelMethods 可以定义 bootstrap 方法，在 vue 组件 mounted 的时候会自动调用

下一个阶段的目标：
4 修改 react element 为 cdn 引入

特性：
1 全程无需编译，各种 babel 转换都在浏览器端发生，节省部署时间
2 全程无需注册组件，所有组件加载自动找寻，组件源文件加载也不会重复网络请求
3 同时支持 vue 和 react,确保应用层组件的开发在两大框架中选择一个最灵活的进行开发
4 以一种高效简洁的方式支持分包加载异步组件，完美的按需加载且异步组件可无限层嵌套异步组件
5 可以和使用 webpack 脚手架的系统完美集成，访问和使用里面的 redux 或者 vuex 等状态管理库
6 支持将多个 vue 实例对应的文件写在同一个文件里
15 可以在 html 里 include 子模板

<left-panel..jsx>

特殊说明：
1 组件名称可以使用..jsx 结尾，表示把对应的 jsx 文件作为像 vue 一样的单文件组件去解析，需要配合 defineVueTemplate 在文件头部定义模板，但是 app..jsx 里无法使用 defineVueTemplate，使用了也没用，因为该文件里包含多个 viewmodel

3 左右两个兄弟节点的数据传递不使用 store，直接使用同步 api 同步

bugs:
1 当前 react 和 element 分开引入了，react 里的 pop up 组件会添加到 old app 里面
2 是否登录不是响应式的，因为第 4 条
3 单文件 jsx vueTemplate 定义失败
4 store 不能实时变更
5 Bue.getRInstanceState('left-panel')无法工作--因为 react mixin 不生效了--貌似只有 class 写法才生效
6 module.exports 之前无法进行定义变量等操作
7 伪元素无法出来
8 happy scroll,element css 等加载 2 次
9 判断一个组件是否已经被 vue 注册了，是的话就不用加载对应 html 文件了
10 header 里的 script 出现了很多次重复的--因为 babel 的问题，每 eval 一个 script 就产生一次 script 插入到 head 里
11 styles 不支持嵌套,不支持响应式 css
12 new frame adapter 里的样式都移动到 frame.html 里---------必须先解决 debug 模式
13 测试 302 问题
14 研究只重新加载某一个组件-现在发现带有 props 的不行，可以尝试重新 new vm 之前转移 props 数据并实例化进去或者改用 store
15 研究骨架屏
16 优化 reload 方法占用的内存
17 整合 lodash 到 Bue 里面
19 开发悬浮调试工具--
19.1 对 bue bootstrap 的根元素增加一个重载图标
19.2 悬浮调试工具：包含 vm 示例访问，内置的重要属性查看
19.3 性能分析
20 引入 redux-saga
21 研究去除 ide 自行 import 问题---parking-pay
22 垃圾清理工作 ，记得清理 Bue.vm 上的东西
23 汇集所有框架错误信息到一个结构里
24 将 v-if="$store.state.user.user.username"解析替换为v-if="$store && getDataByModel(\$store,'state.user.user.username')"
25 module.exports 前面写一些 function 就会报错
26 Bue 内置 fetch 无法传输 multipart/formdata 和 url-encoded 数据
27 使用内网穿透等情况速度很慢的时候会白屏很久
28 bue 增加使用 define 的模块加载机制
29 测试 vue proto 上挂载一个方法，获取 old app 里的 store 可不可用，为了解决 old app 里的仓库数据无法在 new app 里的视图里响应
30 change react state from outside:https://mtm.dev/update-component-state-outside-react/
31 测试 entry 改为只有 app，看看能不能正常载入页面
32 查找 html 里这么写失败的原因：{{codeTimeoutRemain<codeTimeoutTotal?(codeTimeoutRemain+'秒'):'获取验证码'}}
33 删除 getHttpPathByRelativePath 因为没啥乱用
34 写 Bue 加载流程文档
35 super 里使用 vue 的 data 作为 props
36 user config 里支持声明 el 而不是直接挂载整个 body 的 div 里
37 解决 Bue babel use state 报错问题,并深入研究 react useState

38 研究\$\$vm 的用处，没有用就删除
39 增加 script template,必须增加对应的 vm 声明的 bug
40 增加 global:true 防止被 gc
41 优化登录，保证登录成功侯不强行刷新网页
42 这个支持 scss:https://codepen.io/sdras/pen/YZBGNp
43 运行时利用 webpack 的能力解析.vue 后缀文件----------------配合 node-server--webpack
44 bue 增加加载而不实例化 mount 模式，支持手动给多个 dom 结构 mount 东西
45 解决不使用 vuex 等封装全局 state 的问题
46 研究 vue 配合 redux 使用
47 测试 bueStore 的响应度
48 解决 bue reload 的内存泄露
49 设计静态组件机制，只可以获取 props 渲染数据，没有其它 mixin 行为，也不能访问 store 等
50 用迷你的 react jsx transform 替换 babel--from react 官网
51 所有的 min.js 文件看哪个大小不正常的，替换成正常的
52 为 bue 找寻合适的 cdn 库，官网里进行说明
53 为 vm define 里增加第三方 script 定义机制
54 多个 iframe 集成测试
55 内置 http 为文件上传提供支持---同时研究所有类型的 post 提交能否正确使用
56 Bue 开发的网站无法被 winhtttrack 捕获
57 创建一种缓存机制，检测 bue 本地 vm 文件没有改变，则直接读取，否则才发起网络请求
58 内置 http 添加一种超时使用缓存的策略，达到离线的策略

60 同步子 vuex 到父窗口
)

61 使用 proxy，解决跨 window 的 state 响应问题------------------------superWatchId
研究跨 window 的 vuex 响应问题

62 让 bue 支持在 bootstrap 之后手动挂载多个组件到多个 div
63 dbx lovejs1 换成难以识别计算出来的东西
64 设计牛逼的 Bue 中间件
65 思考一种所有请求都 resolve 才 show 页面的 loading 机制

66 !!!测试 u.xxx 在 Bue.min.js 里报 undefined 的问题

开发基于 electron 开发的跨平台调试工具，里面要包含：
1 热更新
2 性能测试模块
3 编译 Bue
4 悬浮窗调试代码放到 exe 里启动的 node server 加载
5 集成微信调试工具，支持远程调试

xss 等漏洞测试

使用牛逼路由组件，对主流前端库进行支持

支持线上调试,让线上代码直接加载本地的 tpl 等等文件

user config 里弄 observable:Vue.observable(Bue.frameScope.oldApp.fanvilObj)
destroy--：相关联的下属的.xxx 也都销毁

测试 bootstrap 全部走默认配置的情况

让 bue 不强行依赖于 vue,支持只使用 react- 几个月后尝试

工厂模式的 http 服务公用了一个拦截器

测试新建一个 http 并独立配置拦截器

Bue 为移动端添加支持,测试移动端支持情况
增加 vuex 和 route 的可选配置

登录的都放到 authconfig 里
Userconfig 改为深度扩展
增加 global true 防止被 gc---所有非公共组件，在非 debug 模式下也放到某个 cache 里

Bue 改造 entry 可以配置多个
只有一个才加载到自定义的 div
且只有一个也可以自定义 mount div

下列代码替换到配置里：
Bue.injectJsFile2Frame(
"oldApp",
"../public" + Bue.buildInLibs.xhook

BU BOOTSTRAP FINISHED setTimeout 500 改为一种非常靠谱的方式处理

测试名字里带.是否能正常工作
frams 禁止使用 newApp 作为 key
模板里无法使用{{}}
增加 Bue.setModule,getModule 方法
增加生产调试模式
debug 模式下 buildInLibsMap 里的东西都加载到了 rootWindow 里了
userScripts 里直接 var 定义的变量不会挂载到 window 上
userScripts 必须是数组，数组项可以是 function，每一个 function 的 this 都指向 Bue

39 debug 模式下加载第三方库位置有问题，挂载到了 rootwindow 下
await Promise.all(
jss
.concat(Bue.runAppInIframe ? [] : [Bue.vueLibPath])
.map(path => u.loadJS(path))
);

bug 优先级：
1 处理 name 问题以及一个组件被实例化多次的 s.vmInstance 问题
2
3 增加 node serve 处理代理

非调试模式 not login,无法 toggole iframe visible

业务 bug 优先级：
登录系统手动问题，还没有引入 store

小优化：
bue.js 加载多个 old app 的命名
thirdPartLibs 命名
测试同时 await bue 所有部件
研究动态添加 vue 路由声明并应用到 bue
tpl 和 vm 把物理模块隔绝了，更改此方式，改为 html 和 js 放在同一个文件夹下

以下代码封装到 Bue 里面：
Bue.iframeDoms.oldApp.style.display = "block";
Bue.iframeDoms.oldApp.style.zIndex = 3;
if (Bue.debugMode) {
Bue.iframeDoms.newApp.style.display = "none";
}

实现对 tpl-only 所有：开头的属性的自动 prop 解析

Js 等文件 content type 处理
异步组件添加不同的样式类
利用``解决 vue jsx 问题
测试重载异步组件
所有东西记录到语雀里

增加其它 bue 内置组件总是报错

找 react16+ script demo 替换 babel

测试 global mixin beforeDestroy uid 机制正确与否---$parent和$children 机制还没弄

销毁之前判断是路由组件且没有使用了 keep-alive(估计不用判断，vue 本身应该会有缓存) 则清楚对应的 vm 各种缓存
登录相关拆分到 Bue.bisiness 模块中

官网文档：
1 生命周期，是否默认挂载
2 所有配置项，包含多态的
3 关于对非登录模式下不加载 Bue 初始 vm 的声明
4 关于响应式数据的
5 bue 模板修饰符
6 加载系统与全自动组件找寻
7 可选插件支持，xhook,fetch 等
8 文档里已实现的
9 调试模式，调试工具
10 react，lit-html 相关
11 路由，动画等
12 bue option 等
13 业务模块支持说明
14 vue react lit-html 组件互相嵌套调用

测试 bootstrap 里定义多个 react 组件
测试 vue react 互相嵌套，循环嵌套---------全部通过 ref 方式声明

弄几个内置组件，互相挂载
vue 挂载 react
vue 挂载 lit-html
lit-html 挂载 vue
lit-html 挂载 react
react 挂载 vue
react 挂载 lit-html

\$\$mount 挂载对象要支持 viewmodel 实例挂载---记得测试销毁是否都能成功销毁--不能的话手动 on:hooks:beforeDestroy
增加 bue 版本，所有的随机数都读取版本配置

巨量重大 bug 修复：
1 测试路由组件销毁时垃圾回收工作
2 修复路由组件的\$parent
3 让路由支持无限级路由嵌套
4 优化 vue 路由让支持以特殊前缀或者特殊后缀匹配，不用一个个手动声明,并取消 BUE_ROUTER_INSTANCE 声明
5 拦截器或者其他机制在开发模式下为路由组件注入\_self


7 解决使用了pages---*解决手动书写路由地址，且保证加载之后keep alive正常工作的问题!!!!
修复 通过浏览器前进后腿按钮无法正常切换路由的bug

7 single jsx file 模板声明增强 ，参考 lit html
8 某些路由 instanc 没有挂载到 Bue.s.vmInstance
9 研究解决根元素加入  v-if="bueStore.MENUS.length>0" 之后报错的问题
10 处理404问题以及加载了一个失败的路由产生的404问题


