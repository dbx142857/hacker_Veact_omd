
this.setAppRouter([
  "login",
  "home..jsx",
  "async-test",
  "react-in-vue-demo",
  "async-comp-demo",
  "single-jsx-test..jsx",
  "homepage..jsx..comp::hacker-demo..jsx??hacker-demo的目录页??hideThis",


  "hacker-get-started..jsx??什么是HACKER.js??",




  "process-of-hacker..jsx??HACKER.js工作流程图",

  // "xxxxxxxx..jsx??HACKER.js在应用里的引入方式与注意事项----not ready",

  // "xxxxxxxx..jsx??理解HACKER.webAppRootRouteWrapper的意义----not ready",
  // "xxxxxxxx..jsx??hacker.js在单页面应用与非单页面应用里的使用差异----not ready",
  // "xxxxxxxx..jsx??hacker脚本的模块化加载----not ready",
  // "xxxxxxxx..jsx??hacker.js的脚本加载器及其语法规范---not ready",
  // "xxxxxxxx..jsx??自定义网页url于hacker规则绑定url的映射关系---not ready",





  // //"xxxxxxxx..jsx??hacker.js的用户习惯配置介绍----not ready",
  // "xxxxxxxx..jsx??hacker.js的响应式数据介绍----not ready",




  "hacker-route-example..jsx??hacker的路由系统",
  "hacker-replacer-example..jsx??hacker的动态替换",

  "hacker-endless-rule-inserting..jsx??hacker规则是单例模式",


  // "xxxxxxxx..jsx??全局事件总线-HACKER.$bus介绍----not ready",
  "hc-store..jsx??全局数据仓库-HACKER.$store介绍",
  // "xxxxxxxx..jsx??全局ref引用-HACKER.$store.$refs介绍----not ready",
  // "xxxxxxxx..jsx??全部数据仓库的keep-alive机智----not ready",


  "hacker-component-basic..jsx??hacker组件-基本介绍与基本渲染",

  "hc-directive..jsx..comp::hacker-loader-with-btn..jsx??hacker组件-指令系统-简介",
  "hacker-component-ref..jsx??hacker组件-指令系统-ref的使用",
  "hacker-component-data-hacker..jsx??hacker组件-指令系统-data-hacker的使用",
  "hc-show-if..jsx..comp::hacker-loader-with-btn..jsx??hacker组件-指令系统-show的使用",


  "hc-class..jsx..comp::hacker-loader-with-btn..jsx??hacker组件-指令系统-class的使用",
  "hc-css..jsx..comp::hacker-loader-with-btn..jsx??hacker组件-指令系统-css的使用",
  "hc-html-text..jsx..comp::hacker-loader-with-btn..jsx??hacker组件-指令系统-html和text的使用",
  "hc-model..jsx..comp::hacker-loader-with-btn..jsx??hacker组件-指令系统-model",
  "hc-teleport..jsx..comp::hacker-loader-with-btn..jsx??hacker组件-指令系统-teleport",




  // "xxxxxxxx..jsx??hacker组件-指令系统-include的使用----not ready",
  // "xxxxxxxx..jsx??hacker组件-指令系统-if的使用----not ready",
  // "xxxxxxxx..jsx??hacker组件-指令系统-for的使用----not ready",
  // "xxxxxxxx..jsx??hacker组件-指令系统-插槽slot的使用----not ready",

  // "xxxxxxxx..jsx??hacker组件-指令系统-自定义指令----not ready",


  // "xxxxxxxx..jsx??hacker组件-指令系统-标准与非标准html属性的使用----not ready",
  // "xxxxxxxx..jsx??hacker组件-事件的使用----not ready",
  // "xxxxxxxx..jsx??hacker组件加载器的运行原理与时机----not ready",
  // "xxxxxxxx..jsx??hacker组件内置方法与属性----not ready",
  // "xxxxxxxx..jsx??hacker组件于vue组件的相似性于差异----not ready",
  // "xxxxxxxx..jsx??hacker组件的手动挂载----not ready",
  // "xxxxxxxx..jsx??hacker组件的手动销毁----not ready",

  // "xxxxxxxx..jsx??hacker规则详细介绍----not ready",
  // "xxxxxxxx..jsx??新旧元素的事件映射----not ready",
  // "xxxxxxxx..jsx??全局数据仓库与hacker规则里state的关系----not ready",
  // "xxxxxxxx..jsx??hacker运行的生命周期----not ready",
  // "xxxxxxxx..jsx??深入理解B_RE_PARSE事件----not ready",









  "req-interceptor..jsx??javasciprt语言底层级别的http请求拦截器基本介绍",
  "dynamic-req-interceptor..jsx??在请求拦截器中动态返回参数",
  "res-interceptor..jsx??javasciprt语言底层级别的http响应拦截器",





  // "xxxxxxxx..jsx??基于fetch api的http拦截器----not ready",
  // "xxxxxxxx..jsx??中大型应用里hacker查找范围的优化----not ready",
  // "xxxxxxxx..jsx??iframe组件加载器的使用场景及意义----not ready",
  // "xxxxxxxx..jsx??命令式的元素创建-HACKER.h----not ready",
  // "xxxxxxxx..jsx??reloadTrigger的作用-HACKER.h----not ready",
  // "xxxxxxxx..jsx??mouseClick的作用-HACKER.h----not ready",


  // "xxxxxxxx..jsx??hacker规则的预加载与懒加载---not ready",
  // "xxxxxxxx..jsx??hacker.js的debug模式与调试---not ready",
  // "xxxxxxxx..jsx??基于hacker.js应用的构建---not ready",


















  // "hacker-route-example..jsx..keep-alive",
  "mixin-test-outer..jsx",
  "auto-history-back..jsx",
  "keep-alive-demo-a..jsx..keep-alive",
  "keep-alive-demo-b..jsx..keep-alive",
  "./page-generator/pager",
  "demo..jsx",
  "pages-goods-manage..jsx..keep-alive",
  // "pages-organization-manage..jsx..keep-alive",
  // "pages-organization-manage..jsx..keep-alive",
  // "pages-employee-manage..jsx..keep-alive",
  // "pages-shop-manage..jsx..keep-alive",
  "pages-*..jsx..keep-alive",
  "pure-render",
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/500',
    component: {
      template: '<div>亲，系统出了重大故障，无法继续提供服务了哦。请稍后再试</div>'
    }
  },

  {
    path: '*',
    component: {

      template: `<div>
      <div>this is 404 page</div>
      <div>
       
      </div>
      </div>
      `

      // <button style='cursor:pointer;' onclick='history.back()'>回退到上一个页面</button>
      // template: '<div><iframe style="width: 100%;height: 1510px;border: none;" src="https://www.bilibili.com/404"/></div>'
    }
  }
]);



// Bue.eventEmitter.on('B_LOAD_FILE_404', () => {
//   if (Bue.s.getRoute().path != '/404') {
//     setTimeout(() => {
//       Bue.s.getRouter().push('/404')
//     }, 200)

//   }

// })