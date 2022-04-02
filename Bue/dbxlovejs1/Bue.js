(function (BueRootWin) {
  let isRootWinLoaded = false;
  let bueLoadingDivs = document.querySelectorAll("[data-role=bue-loading]");
  function removeBueLoading() {
    bueLoadingDivs.forEach((node) => node.parentNode.removeChild(node));
  }
  class EventEmitter {
    constructor() {
      this.events = {};
    }
    on(event, callback) {
      const callbacks = this.events[event] || [];
      if (Array.isArray(callbacks)) {
        callbacks.push(callback);
        this.events[event] = callbacks;
      }
      return this;
    }
    off(event, callback) {
      const callbacks = (this.events[event] || []).filter(
        (cb) => cb !== callback
      );
      this.events[event] = callbacks;
      return this;
    }
    once(event, callback) {
      const wrap = (...args) => {
        typeof callback === "function" && callback.apply(this, args);
        this.off(event, wrap);
      };
      this.on(event, wrap);
      return this;
    }
    emit(event, ...args) {
      const callbacks = this.events[event] || [];
      if (Array.isArray(callbacks)) {
        callbacks.forEach((cb) => typeof cb === "function" && cb.apply(null, args));
      }
      return this;
    }
  }
  let u = {
    baseUrl(s) {
      return s.split('/').reverse().slice(1).reverse().join('/') + '/'
    },
    formatTime(date, hmdOnly = false) {
      date = date || new Date();
      let t = date.getTime();
      if (typeof t == "number" && window.isNaN(t)) {
        return "";
      }

      let d = new Date(date);

      var yyyy = d.getFullYear().toString();
      var mm = (d.getMonth() + 1).toString(); // getMonth() is zero-based
      var dd = d.getDate().toString();
      var hh = d.getHours().toString();
      var ii = d.getMinutes().toString();
      var ss = d.getSeconds().toString();
      // return '20180211'+hh+ii+ss;

      let res =
        yyyy +
        "-" +
        (mm[1] ? mm : "0" + mm[0]) +
        "-" +
        (dd[1] ? dd : "0" + dd[0]);
      if (!hmdOnly) {
        res +=
          " " +
          (hh[1] ? hh : "0" + hh[0]) +
          ":" +
          (ii[1] ? ii : "0" + ii[0]) +
          ":" +
          (ss[1] ? ss : "0" + ss[0]);
      }

      return res;
      // return yyyy+'/' + (mm[1]?mm:"0"+mm[0])+'/' + (dd[1]?dd:"0"+dd[0])+' '+ (hh[1]?hh:"0"+hh[0])+':'+ (ii[1]?ii:"0"+ii[0])+':'+ (ss[1]?ss:"0"+ss[0])

      // return yyyy+'-' + (mm[1]?mm:"0"+mm[0])+'-' + (dd[1]?dd:"0"+dd[0]);
    },
  };
  let s = {
    loadJS: null,
    httpGet(url, errorCb) {

      let randomStr = "jsx html css less sass scss js json"
        .split(" ")
        .find((s) => url.endsWith("." + s))
        ? u.formatTime(null, true)
        : Math.random();
      errorCb =
        errorCb ||
        function () {
          Bue.throwExcepAlert("加载" + url + "错误");
        };
      return new Promise((resolve, reject) => {
        var httpRequest = new XMLHttpRequest(); //第一步：建立所需的对象
        httpRequest.open(
          "GET",
          url + "?r=" + (Bue.debugMode ? Math.random() : randomStr),
          true
        ); //第二步：打开连接  将请求参数写在url中  ps:"./Ptest.php?name=test&nameone=testone"
        httpRequest.send(); //第三步：发送请求  将请求参数写在URL中
        /**
         * 获取数据后的处理程序
         */
        httpRequest.onreadystatechange = function () {
          if (httpRequest.status != 200) {
            if (httpRequest.readyState == 4) {
              reject({
                httpRequest: httpRequest,
                message: "加载" + url + "错误",
              });

              if (404 == httpRequest.status) {



                // alert('emit 404')
                Bue.eventEmitter.emit('B_LOAD_FILE_404', (url))
                // Bue.eventEmitter.emit('B_LOAD_FILE_404', Bue.s.generateVmNameFlagByPathForBus(url))
              }
            }


          } else {
            if (httpRequest.readyState == 4) {
              resolve(httpRequest.responseText);
            }
          }
          // if (httpRequest.readyState == 4 && httpRequest.status == 200) {
          //   resolve(httpRequest.responseText);
          // } else {
          //   errorCb();
          //   // reject("加载" + url + "错误");
          // }
        };
      });
    },
    modules: {
      __Bue: {},
    },
  };
  let _loadJS = (function () {

    let cacheedScriptUrls = []
    return function (url, wrapperInIIFE = false, win, cache = true) {
      return new Promise(async (resolve) => {

        if (cacheedScriptUrls.includes(url)) {
          resolve();
          return
        }


        let doc = win ? win.document : document;
        let targetNode = doc.body;
        // Bue.rootWindow.Bue.doNothing("targetNode--:", targetNode, url, wrapperInIIFE);
        // targetNode = targetNode || (win ? win.document.body : document.body);
        //url is URL of external file, implementationCode is the code
        //to be called from the file, location is the location to
        //insert the <script> element

        var scriptTag = doc.createElement("script");

        if (!wrapperInIIFE) {
          scriptTag.src = url;
          scriptTag.type = "text/javascript";

          scriptTag.onload = () => {
            cache && cacheedScriptUrls.push(url)
            resolve();
          };

          targetNode.appendChild(scriptTag);
        } else {
          let res = await s.httpGet(url);

          scriptTag.type = "text/javascript";
          scriptTag.innerHTML = `
          (function(){
  
            ${res}
          }).call(Bue);
          `;
          targetNode.appendChild(scriptTag);
          setTimeout(() => {
            cache && cacheedScriptUrls.push(url)
            resolve();
          });

          // new Function(`return (function(){
          //     ${res}
          //     })`)().call(Bue);
          // setTimeout(() => {
          //   resolve();
          // });
        }
      });
    };
  })();

  BueRootWin.addEventListener("load", () => {
    isRootWinLoaded = true;
  });
  let Bue = function () {
    if (arguments.length == 0) {
      return new EventEmitter();
    }
  };
  Bue.userConfig = {
    // appReady(){},
    globalMixins:{},
    bueReady() { },
    BueFrameworkFolderLocation: "./Bue",
    defaultIframeOverflowY: "scroll",
    // xhook: false,
    setStore() {
      return {};
    },
    onAlwaysCannotLogin() {
      window["aler" + "t"]("登录失败");
    },
    loadAppAfterLogin: false, //只有登录之后才加载app
    shouldCheckLogin: () => false,
    checkLogin: () => true,
    loginStatusDetectTimeout: 500,
    jquery: false,

    ajaxConfig: {},
    react: true,
    axios: false,
    babel: true,
    reloadWhenVisibilitychange: false,
    // debugMode: typeof _BUE_PRODUCTION_MODE == "undefined",
    // entry: "app.app-entry",
    workspaceDir: "./workspace",
    iframeLoadingTimeout: 30000,
    userScripts: [],
    frames: {},
  };
  let engineSettings,
    defaultVmCache = {
      bue: `
          module.exports    =
          {
            async: {
              props: ["vm", "comp"],
              data(){
                return {
                  hasChildMounted:false
                }
              },
              beforeDestroy(){
                this.$children.forEach((node)=>{
                  node.$destroy()
                  Bue.s.destroyVMInstance(node)
                })
                
              },
              async mounted() {
                let obj=await window.Bue.s.vm(this.comp, true)
                // let obj=await window.Bue.s.vm(this.comp, this.bueOptions._uid, true)
                obj.$parent=this;
                this.$children.push(obj)
                obj.$mount(this.$refs.main);
                this.hasChildMounted=true;
              }
            }
          }
        `,
    },
    defaultTplCache = {
      bue: {
        async: `<div :class="{'bue-async-loading':!hasChildMounted,'bue-async-loaded':hasChildMounted}"><div ref='main'></div></div>`,

        // async: "<div><div></div></div>"
      },
    };

  // Bue.rootWindow.cdnVue.directive("remote-comp", {
  //   inserted() {
  //     Bue.rootWindow.Bue.doNothing("inserted args--:", arguments);
  //   }
  // });

  function addUserConfig(config) {
    Bue.userConfig = {
      ...Bue.userConfig,
      ...config,
    };
    // Bue.NODE_ENV = Bue.userConfig.NODE_ENV;
    return Bue;
  }
  BueRootWin.Bue = Bue;
  Bue.doNothing = () => { }

  Bue.registerModule = (key, v) => {
    s.modules[key] = v;
    return v;
  };
  Bue.registerBueModule = (key, v) => {
    v = typeof v == "function" ? v() : v;
    v.__BUE_MODULE_NAME = key;
    s.modules.__Bue[key] = v;
  };
  Bue.destroyModule = (key) => {
    delete s[key];
  };

  Bue.useModule = (key, isBueModule = false) => {
    let arrRes = [];
    if (typeof key == "string") {
      key = key.split(",");
    }
    if (Array.isArray(key)) {
      key.forEach((k) => {
        arrRes.push(isBueModule ? s.modules.__Bue[k] : s.modules[k]);
      });
    }

    let res = arrRes.length == 1 ? arrRes[0] : arrRes;

    return res;
  };
  Bue.useBueModuleSync = function (keys) {
    return Bue.useModule(keys, true);
    // Bue.s.modules.__Bue.util
  };
  Bue.useBueModule = function (keys) {
    if (typeof keys == "string") {
      keys = keys.split(",");
    }

    return new Promise(async (resolve) => {
      if (Bue.userConfig.BUE_DEVELOPER == true) {
        await Promise.all(
          keys
            .filter((key) => !!!Bue.useModule(key, true))
            .map((key) =>
              _loadJS(
                Bue.userConfig.BueFrameworkFolderLocation +
                "/dbxlovejs1/" +
                key +
                ".js",
                true
              )
            )
        );
      }
      // else {
      //   Bue.useBueModuleSync(keys).forEach((instance, index) => {
      //     if (!instance) {
      //       Bue.throwExcepAlert(
      //         "读取bue内置模块" +
      //           keys[index] +
      //           "失败，请务必确保使用您加载的是生产版本的Bue库文件"
      //       );
      //     }
      //   });
      // }

      resolve(Bue.useModule(keys, true));
    });
  };

  Bue.eventEmitter = new EventEmitter();
  Bue.bootstrap = function (userConfig = null) {
    let isBueBootstraped = false;
    let returnPromise = new Promise(async (resolve) => {
      Bue.throwExcepAlert = (str) => {
        window["aler" + "t"](str);
      };
      if (userConfig) {
        addUserConfig(userConfig);
      }

      Bue.debugMode =
        typeof _BUE_PRODUCTION_MODE == "undefined" ||
        userConfig.debugMode == true ||
        userConfig.BUE_DEVELOPER == true;
      "iframeLoadingTimeout".split(" ").forEach((configKey) => {
        if (typeof Bue.userConfig[configKey] == "function") {
          Bue.userConfig[configKey] = Bue.userConfig[configKey](
            Bue.userConfig,
            Bue
          );
        }
      });
      s.loadJS = _loadJS;

      u = {
        ...u,
        ...(await Bue.useBueModule("util,global-mixin,fetch,vue-router-adapter"))[0],
      };

      // await Bue.useBueModule("global-mixin");
      let service = await Bue.useBueModule("service");
      service = {
        ...service,
        ...Bue.useBueModuleSync('vue-router-adapter')
      }
      // let [service] = [await Bue.useBueModule("service")];
      // let [service] = await Bue.useBueModule("service,global-mixin");
      // Bue.doNothing("service--:", service);

      engineSettings = {
        tplDirPath:
          (Bue.userConfig.tplDirPath || Bue.userConfig.workspaceDir) + "/",
        vmDirPath:
          (Bue.userConfig.vmDirPath || Bue.userConfig.workspaceDir) + "/",
        jsxDefineSplitStr: "module.exports",
        babelMethodsDefineMatchReg: /defineBabel\(\{([\s\S]*)\}\)\(\)/,
        vueTemplateDefineMatchReg: /vueTemplate: \(([\s\S]*)\),/,
      };
      Bue.engineSettings = engineSettings;
      s = {
        ...s,
        ...service,
      };

      s.globalMixins = Bue.useBueModuleSync("global-mixin");

      Bue.reacMixinComposer = s.reacMixinComposer;

      Bue.vuePush = (path) => {
        Bue.setHiddenStore('WILL_PUSH_PATH', path)
        Bue.eventEmitter.emit('B_WILL_PUSH_PATH', path)
        Bue.s.getRouter().push(path)
      }

      Bue.getRInstanceState = function (name) {
        try {
          return Bue.rootWindow.Bue.s.vmInstances[name].rInstance.state;
        } catch (e) {
          return null;
        }
        // return Bue.rootWindow.Bue.s.vmInstances['left-panel'].rInstance.state
      };

      Bue.u = u;
      Bue.s = s;
      Bue.html = (strings) => strings[0];
      Bue.vm = {};

      Bue.rmAlert = () => { };

      // Bue.defineBabel = () => {};
      // Bue.defineVueTemplate = () => {};

      Bue.NODE_ENV = "production";

      Bue.rmConsole = {
        log() { },
      };

      BueRootWin.Bue = Bue;

      if (Bue.debugMode) {
        Bue.NODE_ENV = "local";
      }

      Bue.vueLibPath =
        Bue.userConfig.BueFrameworkFolderLocation +
        "/deps/" +
        (!Bue.debugMode ? "vue.min.js" : "vue.common.dev.js");

      let buildInLibsMap = {
        vueRouter: "vue-router.js",
        vueCompositionApi: "vue-composition-api.js",
        xhook: "xhook/xhook.min.js",
        react: "react/react.development.js",
        reactDom: "react/react-dom.development.js",
        babel: "babel.min.js",
        jquery: "jquery.min.js",
        axios: "axios.min.js",
      },
        jss = [
          Bue.userConfig.BueFrameworkFolderLocation +
          "/deps/" +
          "lodash.min.js",
        ];
      // let vueDeps = "vueRouter".split(" ");
      let vueDeps = "vueRouter vueCompositionApi".split(" ");
      Bue.buildInLibs = buildInLibsMap;
      for (let i in buildInLibsMap) {
        buildInLibsMap[i] =
          Bue.userConfig.BueFrameworkFolderLocation +
          "/deps/" +
          buildInLibsMap[i];
        if (Bue.userConfig[i] && !vueDeps.includes(i)) {
          jss.push(buildInLibsMap[i]);
        }
      }

      await Promise.all(
        jss.concat([Bue.vueLibPath]).map((path) => s.loadJS(path))
      );
      await Promise.all(
        vueDeps.map((pathKey) => s.loadJS(buildInLibsMap[pathKey]))
      );

      // if ('vueCompositionApi' in buildInLibsMap) {
      //   await s.loadJS(buildInLibsMap['vueCompositionApi'])
      // }

      let lodash = _;
      s.tplCache = lodash.cloneDeep(defaultTplCache);
      s.vmCache = lodash.cloneDeep(defaultVmCache);

      Bue.frameScope = {};
      Bue.vm = s.vm;
      Bue.rootWindow = BueRootWin;
      Bue.rootWindow.lodash = Bue.rootWindow._;
      // Vue.component("bue.async", await s.vm("bue.async"));
      // Vue.component("bue.async", await s.vm("bue.async"));

      Bue.iframeDoms = {};
      Bue.activeIframe = (key) => {
        console.warn("activeIframe was invoked");
        for (var i in Bue.iframeDoms) {
          Bue.iframeDoms[i].style.zIndex = key == i ? 2 : 1;
          if (key == i) {
            Bue.iframeDoms[i].style.display = "block";
          } else {
            Bue.iframeDoms[i].style.display = "none";
          }
        }
      };
      Bue.toggleIframeVisible = (function () {
        let index = 0;

        return function () {
          let keys = Object.keys(Bue.iframeDoms);
          index++;
          if (index == keys.length) {
            index = 0;
          }

          Bue.activeIframe(keys[index]);
        };
      })();

      let tempGlobalVar = {},
        taskQueueAfterMount = [],
        tempProtosVar = {};
      let appWin = BueRootWin,
        frameLoadPromise = [];
      let thirdPartLibs = Bue.userConfig.thirdPartLibs || {};

      for (let i in thirdPartLibs) {
        let { jsPath, cssPath } = thirdPartLibs[i] || {};

        if (cssPath) {
          let cssStr = await s.httpGet(cssPath);
          // Bue.rootWindow.Bue.doNothing("------", 0);
          taskQueueAfterMount.push(() => {
            u.appendCssStr(cssStr, u.baseUrl(cssPath));
          });
        }
        if (jsPath) {
          await Bue.s.loadJS(jsPath);
        }
      }

      frameLoadPromise = frameLoadPromise.concat(
        Object.keys(Bue.userConfig.frames).map((key) =>
          Bue.s.createIframe(Bue.userConfig.frames[key], key).then((res) => {
            if (
              typeof Bue.userConfig.frames[key].injectVariable == "function"
            ) {
              tempGlobalVar = Bue.userConfig.frames[key].injectVariable(
                res[key].win
              );
            }
            if (
              typeof Bue.userConfig.frames[key].componentProtos == "function"
            ) {
              tempProtosVar = Bue.userConfig.frames[key].componentProtos(
                res[key].win
              );
            }

            return res;
          })
        )
      );

      let iframeRes = await Promise.all(frameLoadPromise);

      Bue.injectedVariables = {};
      function setGlobalVariables(varMap) {
        // setTimeout(() => {
        // Bue.rootWindow.Bue.doNothing("varMap[i]--:", varMap[i]);
        for (let i in varMap) {
          let varValue = varMap[i];
          if (!varValue) {
            console.error(
              "设定变量:" +
              i +
              "失败，请确认你加载了正确的frame且可以正确读取到对应的值"
            );
          }
          Bue.rootWindow.Bue.doNothing(
            "varValue--：",
            varValue,
            appWin == undefined
          );
          // setTimeout(() => {
          BueRootWin[i] = varValue;
          Bue.injectedVariables[i] = varValue;
          Bue.rootWindow.Bue.doNothing("appWin.foo--:", appWin.foo);
          appWin[i] = varValue;
          // });
        }
      }

      Bue.injectJsFile2Frame = async function (
        frameName,
        jsPath,
        cb,
        wrapperInIIFE
      ) {
        await Bue.s.loadJS(jsPath, wrapperInIIFE, Bue.frameScope[frameName]);
        if (typeof cb == "function") {
          cb();
        }
      };
      iframeRes.forEach((res) => {
        for (var i in res) {
          Bue.frameScope[i] = res[i].win;
        }
      });

      appWin.Bue = Bue;
      setGlobalVariables(tempGlobalVar);
      // appWin.cdnVue = appWin.Vue;

      // try {
      // appWin.Vue.prototype.win = appWin;
      // appWin.Vue.prototype.mixedGlobalVariables = {
      //   a: 1
      // };
      for (let i in tempProtosVar) {
        appWin.Vue.prototype[i] = tempProtosVar[i];
      }

      window.Vue && (Bue.$rootBus = new Vue());

      if (Bue.userConfig.userScripts.length == 0) {
        mountApp();
      } else {
        let handleMount = () => {
          let count = 0;
          Bue.userConfig.userScripts.forEach(async (path) => {
            if (typeof path == "function") {
              path.call(Bue);
            } else {
              await Bue.s.loadJS(path, true);
            }

            count++;
            if (count == Bue.userConfig.userScripts.length) {
              mountApp();
            }
          });
        };
        if (isRootWinLoaded) {
          // alert("dd");
          handleMount();
        } else {
          addEventListener("load", () => {
            handleMount();
          });
        }
      }

      // addEventListener("load", () => {});
      Bue.HTTP = Bue.useBueModuleSync("fetch");
      async function mountApp() {
        // Bue.rootWindow.Bue.doNothing("------", 1);
        let entry = Bue.userConfig.entry;
        if (!entry) {
          removeBueLoading();
          return false;
        }
        async function doMountFromEntry() {
          if (typeof entry == "function") {
            let entryRes = entry();
            if (!entryRes instanceof Promise) {
              Bue.throwExcepAlert(
                "函数类型的entry配置必须返回一个promise，且resolve一个字符串类型的entry配置"
              );
            } else {
              entry = await entryRes;
            }
          }
          if (
            typeof entry != "string" ||
            (typeof entry == "string" && entry.length == 0)
          ) {
            Bue.throwExcepAlert(
              "entry必须配置为一个字符串，或者返回一个resolve字符串的promise"
            );
            return false;
          }
          Bue.userConfig.entry = entry;
          let appMain = appWin.Bue.vm(entry),
            mountedDiv;

          let div = document.createElement("div");
          div.classList.add("bue-app-container");
          // s.setIframeStyle(div);
          div.style.zIndex = 2;
          // div.style.background = "red";
          div.style.overflow = "hidden";

          BueRootWin.document.body.appendChild(div);
          let innerDiv = document.createElement("div");
          div.appendChild(innerDiv);
          mountedDiv = div;
          // await appMain.$$mount(div);
          await appMain.$$mount(mountedDiv.querySelector("div"));
          if (Bue.debugMode) {
            Bue.mountedDiv = mountedDiv;
            // Bue.appDomNode = mountedDiv.parentNode;
            Bue.reload = () => {
              Bue.doNothing("mountedDiv--:", mountedDiv);
              for (let i in Bue.s.vmInstances) {
                Bue.s.vmInstances[i].$destroy();
              }
              mountedDiv.innerHTML = "<div>reloading...</div>";
              setTimeout(() => {
                Bue.rootWindow.Bue.s.tplCache = u.copyObj(defaultTplCache);
                Bue.rootWindow.Bue.s.vmCache = {};
                Bue.rootWindow.Bue.s.vmInstances = {};
                // setTimeout(() => {
                appWin.Bue.vm(Bue.userConfig.entry).$$mount(
                  mountedDiv.querySelector("div")
                );
                // });
              }, 300);
            };
          }
          removeBueLoading();
        }

        if (!Bue.userConfig.loadAppAfterLogin) {
          doMountFromEntry();
        } else {
          Bue.eventEmitter.on("B_BUE_LOGIN_DETECTED", doMountFromEntry);
        }

        if (typeof userConfig.entryMounted == "function") {
          userConfig.entryMounted(appWin);
        }
        setTimeout(() => {
          // alert(22)
          Bue.eventEmitter.emit("BUE_READY");
          Bue.userConfig.bueReady.call(Bue);

          if('HACKER' in window){
            Vue.prototype.HACKER=window.HACKER;
          }

          resolve(Bue);
        });

        // poll(fn, callback, errback, timeout, interval)
        u.poll(
          () => {
            if (!Bue.userConfig.shouldCheckLogin()) {
              return true;
            } else {
              return Bue.userConfig.checkLogin();
            }
          },
          () => {
            if (
              Bue.userConfig.loadAppAfterLogin &&
              Bue.userConfig.shouldCheckLogin()
            ) {
              Bue.eventEmitter.emit("B_BUE_LOGIN_DETECTED");
            }
          },
          Bue.userConfig.onAlwaysCannotLogin,
          Bue.userConfig.loginStatusDetectTimeout,
          50
        );
      }

      taskQueueAfterMount.forEach((fun) => {
        // Bue.rootWindow.Bue.doNothing("------", 2);
        fun();
      });

      if (Bue.debugMode && userConfig.reloadWhenVisibilitychange) {
        let debounceLoad = Bue.rootWindow.lodash.debounce(function () {
          Bue.reload();
        }, 2000);
        BueRootWin.document.addEventListener("visibilitychange", debounceLoad);
      }
    });

    returnPromise.loadComponent = Bue.loadComponent = function (componentName) {
      let res = new Promise((resolve) => {
        if (!componentName) {
          resolve({});
        } else {
          if (isBueBootstraped) {
            resolve(Bue.vm(componentName));
          } else {
            Bue.eventEmitter.on("BUE_READY", () => {
              resolve(Bue.vm(componentName));
            });
          }
        }
      });
      if (!componentName) {
        res.$$mount = () => { };
      } else {
        res.$$mount = async function (targetNode) {
          Bue.s.mountVMInstance2DomNode(targetNode, await this);
        };
      }
      return res;
    };
    returnPromise.then((res) => {
      isBueBootstraped = true;

      return res;
    });

    return returnPromise;
  };
})(window);
