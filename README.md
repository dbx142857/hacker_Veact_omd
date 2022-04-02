omd：
1 微信收藏里的
2 防缓存机制优化(现在以天为单位，跨天可能有问题--可以动态更改r=?测试 模块中闭包测试)
3 veact-app添加omd支持
4 module-loader剥离对veact的依赖


5 是否要添加钩子函数 所有非延迟加载模块加载成功

6 修复require为数组时候的监控失败的bug
7 通过设置虚拟模块处理超时问题,同时可以对所有require的进行监控

8 fetch更改为xmlhttprequest从而监控加载进度


require 数组添加onTimout等方法并测试

出错的模块:删除对应的cache
测试Omd闭包






veact:
1 通过加载一个文件来加载一个vue组件//xx.vue--.veact
2 通过加载两个文件来加载一个vue组件//---xxx.html---xx.veact---
3 通过加载一个文件来加载一个react组件--xxx.veact
4 通过加载一个文件来加载一个拥有任意多个react子组件和vue子组件的vue组件
5 通过加载两个文件来加载一个拥有任意多个react子组件和vue子组件的vue组件
6 通过加载一个只有模板的html文件来加载一个只有静态视图的vue组件



已经注册的vue组件也可以在react组件里使用
有父子关系的react组件和vue组件可以互相访问和调用对方的属性和方法
声明式veact应用程序api驱动的程序入口组件加载策略
通过内置组件veact.comp实现连声明都是惰性声明的真正的懒加载组件

组件修饰符----修饰服不能组合

特定条件下无需引入组件可以直接使用---------!!!!!!!!!!!!重大bug:直接写组件名,不写..jsx会加载html然后报错







1 @React修饰服和module.exports---@React类中无法使用static静态属性
2 组件加载方法
3 react中加载veact组件---veact-comp属性
4 vue组件中加载veact组件----1 veact.comp组件加comp属性----2直接使用组件名
5 修饰符--..multi  ..react  ..tpl-only 无修饰符
6 使用veact.comp加载子组件,子组建可以使用$parent访问到父组件的实例
7 react组件和vue组件可以通过$parent和$children互相访问
8 @React修饰服必须修饰一个class,class里必须要有bootstrap方法(可以是异步的)//可以
 return一个react组件描述,也可以return一个react组件描述数组;要有一个$el和一个vm,vm可以是一个class组件,也可以是一个函数组件;可以没有$el,没有$el的话会被挂在到vue的根元素

 9 callBabel$----在vue组件中调用react声明中定义的任何方法

 10 allReactChilds$--用于在vue组件中获取到所有react子组件


 11 查看所有组件实例  Veact.service.vmInstances

 12 babelMethods---vue组件里可以通过this.babelMethods获取到@React定义的所有非静态属性和方法


13 veact.comp组件是一个内置的vue组建,可以通过和v-if配合来模拟一个懒加载组件--veact-async-loading---veact-async-loaded

14 vscode插件:lit-html

15 .veact后缀的文件,要修改语言模式为javascrtipt react,.html后缀的文件,修改语言模式为vue html(如果编辑器有的话)








判断组件是否是多文件组件
  是:加载组件模板文件?
    ->是否已经加载过或者正在加载中?(加载中就等待加载完毕后解析,加载后就从缓存中取)
      ->根据组件模板分析是否包含自定义的vue组件
                          是:递归收集所有子组件的描述,设置到父组件的options.components里
                          否:设定父组件的options.components为空
    加载组件控制器文件
      ->是否已经加载过或者正在加载中?(加载中就等待加载完毕后解析,加载后就从缓存中取)
        ->根据控制器文件module.exports导出的描述生成vue组件并注入vue全局mixin(全局mixin包含调用子react组件声明类中方法以及获取所有react子组件的方法这两个关键防范,且会在vue组件mounted之后自动挂在同一文件中的react组件(如果有的话)),在vue组建销毁后自动销毁react组件
          ->判断控制器文件是否包含@React声明
            ->是:创建react组件,设定其父组件为上面的vue组件,然后设定vue组件的$children属性
              ->注入全局react类组件的mixin:为react组件添加$parent属性以便访问到父vue组件,在当前react组件销毁时自动销毁所有vue子组件

    通过组件模板和控制器拼装生成一个vue组件

  否:是否为纯react组件?
    是:自动创建一个和文件名同名的vue组件,然后挂在这个react组件为子组件,并建立父子组建互相访问机制
    
    
    否:该组件是否为无状态纯视图组件?
      是:加载对应的html组件,然后直接对其进行渲染到目标节点上
      
      否:该组件是否包含@React声明?---------------
        是:加载对应的vue组件控制器文件,模板使用对外导出对象的template属性,并解析@React生命创建react组件并挂在到vue组件目标节点上
        
        否:加载对应的vue组件控制器文件,模板使用对外导出对象的template属性














<!-- 介绍hacker的html -->

1 介绍hacker.js以及webapproutewrapper
2 修改replacer演示的demo对于webaprouterwrappr之外的隐藏和重写-查看对应的源码实现

ref的使用补充:循环里使用ref









ref的使用


hacker-bue组件和vue的区别：

只有setup beforeDestroy destroyed三个生命周期
不能为根元素设定ref,添加事件，指令
ref的替代方案： id="abcdefg" data-hacker
除了声明id必须加data-hacker和id，或者加data-hacker="{id:'xx'}" 其他内置指令可以直接data-hacker-xxx
指令以data-hacker-开头
不能添加以$refs命名的属性在data里
指令里的this直接指向数据，事件里的this指向控制器，若访问数据需要用this._data
不支持else和for指令
事件除了要加@声明，还需要加data-hacker声明
指令里的表达式不支持非this.开头
@xx="xxx"里可以写表达式去执行，也可以写methods里方法的名字，但是写方法名字时不支持加括号








平台后台预览：
http://dbx142857.gitee.io/business-manage/pc-web/index.html

商户后台预览：
http://dbx142857.gitee.io/business-manage

postman gateway url:
http://dev-gateway.juliangtiaodong.com


腾讯地图:
https://lbs.qq.com/webApi/javascriptGL/glGuide/glOverview

tencent.map.key=ZGQBZ-SHZ3V-F7SPT-UFIUC-GJJMV-TEFWQ
tencent.map.securyKey=YjedA5NVxmYUWSwjZL8Gedjw2MBIQr





# business-manage

#### 介绍
商户管理

#### 软件架构
软件架构说明


#### 安装教程

1.  xxxx
2.  xxxx
3.  xxxx

#### 使用说明

1.  xxxx
2.  xxxx
3.  xxxx

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request


#### 特技

1.  使用 Readme\_XXX.md 来支持不同的语言，例如 Readme\_en.md, Readme\_zh.md
2.  Gitee 官方博客 [blog.gitee.com](https://blog.gitee.com)
3.  你可以 [https://gitee.com/explore](https://gitee.com/explore) 这个地址来了解 Gitee 上的优秀开源项目
4.  [GVP](https://gitee.com/gvp) 全称是 Gitee 最有价值开源项目，是综合评定出的优秀开源项目
5.  Gitee 官方提供的使用手册 [https://gitee.com/help](https://gitee.com/help)
6.  Gitee 封面人物是一档用来展示 Gitee 会员风采的栏目 [https://gitee.com/gitee-stars/](https://gitee.com/gitee-stars/)



styles示例：

styles(vm) {
      let self = this;
      return {
        ".custom-tree-node": {
          flex: 1,
          display: "flex",
          "align-items": "center",
          "justify-content": "space-between",
          "font-size": "14px",
          "padding-right": "8px"
        },
        "&": {
          clear: "left"
        },
        ".right-panel-new": {
          float: "right",
          "padding-top": "24px",
          "padding-left": "60px",
          height: "calc(100vh - 64px)",
          overflow: "auto"
        },
        ".left-panel": {
          float: "left",
          height: "calc(100vh - 64px)",
          overflow: "auto"
        }
      };
    },