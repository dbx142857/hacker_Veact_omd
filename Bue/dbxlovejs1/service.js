let loadedComponents = [];
let pendingVMFileLoaders = {

}

Bue.registerBueModule("service", {
  reacMixinComposer: (ComposedComponent, Mixin) =>
    class extends React.Component {
      constructor(props) {
        // Bue.rootWindow.Bue.doNothing("ComposedComponent--:", ComposedComponent);
        super(props);
        Object.getOwnPropertyNames(Mixin.prototype).forEach((func) => {
          if (func != "constructor")
            ComposedComponent.prototype[func] = Mixin.prototype[func];
        });
        Bue.rootWindow.Bue.s.tempVar = ComposedComponent;
        this.composed = Bue.s.babelEval(
          `<Bue.rootWindow.Bue.s.tempVar {...Bue.rootWindow.Bue.s.tempVar.props} {...Bue.rootWindow.Bue.s.tempVar.state} />`
        );
      }
      render() {
        return this.composed;
      }
    },
  generateVmNameFlagByPathForBus(url) {
    url = url.split('?')[0].split('..')[0].split('/').reverse()[0].split('.')
      .reverse()

    if (url.length > 1) {
      url = url.slice(1).join('.')
    }
    url = [].concat(url)
    return '_' + url.join('').split('-').join('_').toUpperCase()
  },
  createIframe(config, flag) {
    let _self = this;
    let path = config.path;
    // Bue.rootWindow.Bue.doNothing('------',useSrcDoc);
    // Bue.rootWindow.Bue.doNothing('------',path);
    return new Promise(async (resolve) => {
      let ifr = document.createElement("iframe");
      document.body.appendChild(ifr);
      ifr.src = path + "?r=" + Bue.u.formatTime(null, true);

      ifr.setAttribute("frameborder", "no");
      ifr.style.background = "#fff";
      ifr.style.display = config.display || "none";

      _self.setIframeStyle(ifr);

      Bue.iframeDoms[flag] = ifr;
      let isLoaded = false;
      setTimeout(() => {
        if (!isLoaded) {
          Bue.throwExcepAlert("加载应用:" + path + "失败");
        }
      }, Bue.userConfig.iframeLoadingTimeout);
      ifr.onload = () => {
        isLoaded = true;
        // Bue.rootWindow.Bue.doNothing('------',path + "--" + ifr.contentWindow.cdnVue);
        resolve({
          [flag]: {
            win: ifr.contentWindow,
            instance: ifr,
          },
        });
      };
    });
  },
  hasModifierInTagName(name, modifier) {
    return (
      name.endsWith(".." + modifier) || name.includes(".." + modifier + "..")
    );
  },
  // isTargetDataLoadFromDefaultCache(cacheMap, cacheKey, data) {
  //   return (
  //     Object.keys(data || {}).join("") ==
  //     Object.keys(cacheMap[cacheKey] || {}).join("")
  //   );
  // },
  isReactVM(vm) {
    return "_reactInternalFiber" in vm;
  },
  isVueVM(vm) {
    return vm["_isVue"] == true;
  },
  vmTypesJudgeArr: "isReactVM isVueVM".split(" "),
  calculateVMTypeJudgeMethodName: (vm) =>
    Bue.s.vmTypesJudgeArr.find((key) => Bue.s[key](vm)),
  destroyVMInstance(vm) {
    delete vm.rInstance;
    let shouldDestroyedVMName = vm.bueOptions.name;
    // Bue.doNothing("shouldDestroyedVMName--:", shouldDestroyedVMName);
    // if (isVueVM(vm)) {
    Bue.s.vmTypesJudgeArr
      .filter((m) => m != Bue.s.calculateVMTypeJudgeMethodName(vm))
      .forEach((methodName) => {
        (vm.$children || [])
          .filter((node) => Bue.s[methodName](node))
          .forEach((node) => {
            if (Bue.s.isReactVM(node)) {
              ReactDOM.unmountComponentAtNode(node.bueOptions.$el);
            }
            Bue.s.destroyVMInstance(node);
          });
      });

    if (!Array.isArray(window.Bue.s.vmInstances[shouldDestroyedVMName])) {
      delete window.Bue.s.vmInstances[shouldDestroyedVMName];
    } else {
      window.Bue.s.vmInstances[shouldDestroyedVMName].forEach((vm) => {
        let uid = vm.bueOptions._uid,
          index = window.Bue.s.vmInstances[shouldDestroyedVMName].findIndex(
            (item) => item.bueOptions._uid == uid
          );
        if (index > -1) {
          window.Bue.s.vmInstances[shouldDestroyedVMName].splice(index, 1);
        }
      });
      if (window.Bue.s.vmInstances[shouldDestroyedVMName].length == 0) {
        delete window.Bue.s.vmInstances[shouldDestroyedVMName];
      }
    }
    // } else if (isReactVM(vm)) {
    //   Bue.doNothing("i am react vm--:", vm);
    // }
  },
  setIframeStyle(ifr) {
    ifr.style.width = "100%";
    ifr.style.height = document.documentElement.clientHeight + "px";
    window.addEventListener("resize", () => {
      ifr.style.height = document.documentElement.clientHeight + "px";
    });
    ifr.style.overflowY = Bue.userConfig.defaultIframeOverflowY || "scroll";

    ifr.style.position = "fixed";
    ifr.style.left = "0";
    ifr.style.top = "0";
  },
  // globalMixins: Bue.useBueModuleSync("global-mixin"),

  collectCompByTpl(tpl, tplName) {

    let collectCompKeysResult = [];
    let div = document.createElement("div");
    div.innerHTML = tpl;
    // if ('pages-shop-manage..jsx' === tplName) {
    //   console.log('tpl--:', tpl)
    // }
    div.querySelectorAll("*").forEach((node) => {
      window.Bue.doNothing("node--:", node.tagName.toLowerCase());
      let nodeName = node.tagName.toLowerCase();
      // if ('pages-shop-manage..jsx' === tplName) {
      //   console.log('nodeName--:', nodeName)
      // }
      if (Bue.u.isCustomComp(nodeName)) {
        collectCompKeysResult.push({
          node: node,
          nodeName,
        });
      }
      if (nodeName == 'template') {
        collectCompKeysResult = collectCompKeysResult.concat(Bue.s.collectCompByTpl(node.innerHTML))
      }
    });
    collectCompKeysResult = [...new Set(collectCompKeysResult)];
    window.Bue.doNothing("loadTplFun tpl--:", tpl, collectCompKeysResult);
    return collectCompKeysResult;
  },

  // getShouldDestroyedCompNameByViewModel(vm) {
  //   let name = window.Bue.s.vmInstances[vm.bueOptions.name];
  //   alert(name);
  //   return name;
  // },
  babelEval(jsxStr, useBabel = true) {
    jsxStr = `(window.Bue.s.tempVar=${jsxStr})`;

    if (useBabel) {
      var scri = document.createElement("script");
      scri.type = "text/babel";
      scri.innerHTML = jsxStr;
      var div = document.createElement("div");
      div.appendChild(scri);
      window.babelTransform(div.querySelectorAll("script"));
    } else {
      window.eval(jsxStr);
    }

    return window.Bue.s.tempVar;
  },

  getVueRoutePathByUrl() {
    let router = Bue.s.getRouter();
    if (router.mode == 'hash') {
      return location.hash.split('#')[1].split('?')[0]
    } else {
      return location.pathname;
    }
  },
  executeJsx(fun) {
    window.Bue.doNothing(fun.toString());
  },
  vm(tplName, returnInstance = true,) {
    let tplNameArr = tplName.split('/'), path = null;
    if (tplNameArr.length > 1) {
      tplName = tplNameArr[tplNameArr.length - 1]
      path = tplNameArr.slice(0, tplNameArr.length - 1).join('/') + '/'
    }
    // console.log('path in vm--:', path, tplNameArr)
    // vm(tplName, injectedVM = {}, returnInstance = true) {
    let result = new Promise(async (resolve, reject) => {
      let loadTplFun = Bue.s.loadTpl(tplName, path),
        loadTplPromises = [loadTplFun],
        loadVmPromises = [Bue.s.loadVM(tplName, false, path)],
        comps = {},
        arr = tplName.split("."),
        collectedMixins = [],
        [vmConfig] = await Promise.all(loadVmPromises);

      await loadTplFun.then((res) => {
        // Bue.doNothing('load tpl fun res--:',res)
        vmConfig.components = Bue.s
          .collectCompByTpl(res, tplName)
          .map((item) => item.nodeName);
        return res;
      });

      // window.Bue.rmAlert(vmConfig.components);
      if (
        Array.isArray(vmConfig.components) &&
        vmConfig.components.length > 0
      ) {
        // window.Bue.rmAlert(11);
        loadTplPromises = loadTplPromises.concat(
          vmConfig.components.map((key) => Bue.s.loadTpl(key))
        );

        loadVmPromises = loadVmPromises.concat(
          vmConfig.components.map((key) => Bue.s.loadVM(key, false))
        );
      }
      window.Bue.doNothing("arr--:", arr, vmConfig);
      loadTplPromises.slice(1).forEach((prom) => {
        prom.then((tplRes) => {
          window.Bue.doNothing("tpl--res--:", tplRes);
          return tplRes;
        });
      });

      window.Bue.doNothing("loadTplPromises--:", loadTplPromises);
      let loadTplPromisesRes = await Promise.all(loadTplPromises);
      let [tpl, ...restTplReqs] = loadTplPromisesRes;
      // vmConfig.bueOptions = {
      //   loadVmPromises: loadVmPromises
      // };
      loadVmPromises.forEach((prom, index) => {
        prom.then(async (vmConfigRes) => {
          let _uid = Bue.useBueModuleSync("util").guid();
          // if (index > 0) {
          //   let parent = await Promise.resolve(loadVmPromises[0]);

          //   if (!parent.bueOptions.$children) {
          //     parent.bueOptions.$children = [];
          //     parent.bueOptions._children_uids = [];
          //   }
          //   parent.bueOptions._children_uids.push(_uid);
          // }
          vmConfigRes.mixins = vmConfigRes.mixins || [];
          vmConfigRes.bueOptions = {
            ...(vmConfigRes.bueOptions || {}),
            loadVmPromises: loadVmPromises,
            loadedComponents: loadedComponents,
            _uid: _uid,
            vmDefine: Bue.u.copyObj(vmConfigRes),
            name: vmConfigRes.name,
            defaultTpl: loadTplPromisesRes[index],
            components: Bue.s
              .collectCompByTpl(loadTplPromisesRes[index])
              .map((item) => item.nodeName)
          };
          vmConfigRes.mixins = [
            Bue.s.globalMixins,
            Bue.userConfig.globalMixins,
            {
              data() {
                return {
                  // gv: mixedGlobalVariables,
                  bueOptions: vmConfigRes.bueOptions,
                  // $$vm: injectedVM,
                };
              },
            },
          ].concat(vmConfigRes.mixins);
          return vmConfigRes;
        });
      });
      let restVMReqs = (await Promise.all(loadVmPromises)).slice(1);
      window.Bue.doNothing("tpl--:", tpl, restTplReqs, restVMReqs);

      if (Array.isArray(vmConfig.components)) {
        vmConfig.components.forEach((compName, idx) => {
          comps[compName] = {
            // comps[compName.split(".").reverse()[0]] = {
            template: restTplReqs[idx] || '<div></div>',
            ...restVMReqs[idx],
          };
          Bue.doNothing("comps[compName]--:", comps[compName], compName, tplName);
        });
      }

      // Bue.doNothing("comps--:", comps);

      window.Bue.doNothing("tpl--:", tpl);
      let router = Bue.useModule("BUE_ROUTER_INSTANCE") || null;
      let obj = {
        // router: window.Bue.BUE_ROUTER_INSTANCE,
        // template: "<div>eeeeeeeeee</div>",
        // el: ".site2",
        // el: targetDomNode,
        // mounted() {
        //   window.Bue.rmAlert("mounted");
        // }
        ...vmConfig,
        // name: vmConfig.name,
        // store: window.$store,
        template: vmConfig.template || tpl || '<div></div>',
        components: comps,
      };

      if (router) {
        obj.router = router;
      }
      if (window.$store) {
        obj.store = window.$store;
      }

      // if ("template" in vmConfig) {
      //   // alert(vmConfig.template);
      //   obj.template = tpl;
      // }

      // Bue.doNothing("-----------:", Object.keys(obj.components).length);

      for (let k in obj.components) {
        Bue.doNothing("k---:", k);
        obj.components[k].components =
          (await Bue.s.vm(k, false)).components || {};
        // (await Bue.s.vm(k, obj.bueOptions._uid, false)).components || {};
      }
      // Bue.doNothing(obj.components.map(item => item.bueOptions._uid).join(","));

      resolve(returnInstance ? new (Vue.extend(obj))() : obj);
      // window.Bue.doNothing("instance--:", instance);
      // return instance;
    });
    result.$$mount = function (targetNode) {
      return new Promise(async (resolve) => {
        let instance = await this;

        let fun = Bue.s.mountVMInstance2DomNode;

        fun(targetNode, instance);

        resolve(fun);
      });
      // window.Bue.doNothing("result--:", result.$$mount, this, this === result);
    };
    return result;
  },




  mountVMInstance2DomNode(targetNode, instance) {
    if (!(targetNode instanceof HTMLElement)) {
      window.Bue.doNothing("targetNode--:", targetNode);
      try {
        targetNode = document.querySelector(targetNode);
      } catch { }
    }
    instance.$mount(targetNode);
  },
  tplCache: {},
  vmCache: {},
  vmInstances: {},
  tempVar: null,
  async useCompData(compName, ...filteredKeys) {
    await Bue.s.vm(compName, false)
    let res = Bue.vm[compName.split('..')[0]].data.call(window)
    if (filteredKeys.length === 0) {
      return res;
    } else {
      let result = {},
        arr = [].concat(filteredKeys).flat();
      arr.forEach((key) => {
        if (!(key instanceof RegExp)) {
          result[key] = Bue.u.copyObj(res[key])
        }

      })
      arr.filter((s) => s instanceof RegExp).forEach((reg) => {
        for (let i in res) {
          if (reg.test(i)) {
            result[i] = Bue.u.copyObj(res[i])
          }
        }
      })
      return result;
    }
  },
  loadVMJsFile(fileName, vmName, useSingleFileVM = false, vmFilePath) {
    let tempVMName = vmName;
    window.Bue.doNothing("vmName--:", vmName);
    // window.Bue.doNothing('------',"file name in load vm js file:" + fileName);
    let isCommon = fileName != vmName;
    vmName = vmName.split(".").reverse()[0];
    return new Promise(async (resolve, reject) => {

      let res = window.Bue.s.vmCache[fileName] || null;


      if (!res) {
        let path = (vmFilePath || Bue.engineSettings.vmDirPath) + fileName + ".jsx";


        if (!(path in pendingVMFileLoaders)) {
          pendingVMFileLoaders[path] = Bue.s.httpGet(path)
        } else {

          setTimeout(() => {
            delete pendingVMFileLoaders[path]
          })

        }

        res = await pendingVMFileLoaders[path];


        // res = await Bue.s.httpGet(u.getHttpPathByRelativePath(path));
      }
      // b.replace(/module.exports/gi,'---------')
      // /module.exports/gi;
      let reg = new RegExp(`${Bue.engineSettings.jsxDefineSplitStr}`, "gi");

      let resArr = res.split(Bue.engineSettings.jsxDefineSplitStr);
      // window.Bue.rmAlert(resArr.length);
      if (resArr.length == 1) {
        window.Bue.throwExcepAlert(fileName + "未对外导出东西，请检查代码");
      }

      // res = res.replace(reg, "window.Bue['" + fileName + "']");
      // window.Bue.doNothing(
      //   "reg--:",
      //   reg,
      //   typeof reg,
      //   reg instanceof RegExp,
      //   res,
      //   resArr
      // );
      let evalStr =
        `let s` +
        resArr.slice(1).join(Bue.engineSettings.jsxDefineSplitStr) +
        ";window.Bue.vm['" +
        fileName +
        `']=s;`;

      // window.Bue.doNothing("evalStr--:", evalStr);
      try {
        eval(evalStr);
      } catch (e) {
        console.error("eval error--:", e, evalStr);
        console.trace();
      }

      window.Bue.doNothing(
        "resArr--:",
        resArr,
        resArr[0].match(Bue.engineSettings.babelMethodsDefineMatchReg)
      );
      let jsxStr =
        (resArr[0].match(Bue.engineSettings.babelMethodsDefineMatchReg) ||
          [])[1] || null;

      if (jsxStr) {
        let tplInSingleFileVM =
          (jsxStr.match(Bue.engineSettings.vueTemplateDefineMatchReg) ||
            [])[1] || null;
        if (tplInSingleFileVM) {
          jsxStr = jsxStr.replace(
            Bue.engineSettings.vueTemplateDefineMatchReg,
            ""
          );
        }
        window.Bue.doNothing("jsxStr--:", jsxStr);
        window.Bue.doNothing("tplInSingleFileVM--:", tplInSingleFileVM);

        let tempVar = Bue.s.babelEval("{" + jsxStr + "}");
        let isMultipleVMJsxDefine = Object.keys(tempVar).every(
          (key) => "object" == typeof window.Bue.s.tempVar[key]
        ),
          injectJsxMethodsForVm = (obj, vmK) => {
            vmK = vmK || vmName;

            if (isCommon) {
              console.warn("isCommon--:", tempVMName.split(".")[0] + "." + vmK);
            }
            // let vmKey = isCommon ? "app." + vmK : vmName;
            let vmKey = isCommon
              ? tempVMName.split(".")[0] + "." + vmK
              : vmName;
            Bue.u.setDataByModel(
              window.Bue.vm,
              vmKey + ".babelMethods",
              Bue.u.getDataByModel(window.Bue.vm, vmKey + ".babelMethods") || {}
            );
            for (var i in obj) {
              let newFun = Bue.s.babelEval(obj[i]);
              // if (!i.toLowerCase().startsWith("react")) {
              //   newFun = eval(
              //     `(function(){return ${newFun
              //       .toString()
              //       .replace(/React.createElement/gi, "h")}})();`
              //   );
              //   // window.Bue.doNothing("a---:", typeof a, a);
              //   // newFun = newFun.replace(/React.createElement/gi, "h");
              //   window.Bue.doNothing("newFun---:", newFun.toString());
              // }

              Bue.u.setDataByModel(
                window.Bue.vm,
                vmKey + ".babelMethods." + i,
                newFun
              );

              // window.Bue.vm[vmKey].babelMethods =
              //   window.Bue.vm[vmKey].babelMethods || {};
              // window.Bue.vm[vmKey].babelMethods[i] = newFun;
            }
          };

        setTimeout(() => {
          //不是app.开头的且在文件头部使用defineVueTemplate的
          if (!isCommon && tplInSingleFileVM && useSingleFileVM) {
            Bue.u.setDataByModel(
              window.Bue.vm,
              vmName + ".template",
              tplInSingleFileVM
                .replace(/\$\$\$/gi, "@")
                .replace(/\$\$/gi, ":")
                .replace(/\{\/\*/gi, "<!--")
                .replace(/\*\/\}/gi, "-->")
            );
          }
          if (isMultipleVMJsxDefine) {
            for (var i in tempVar) {
              injectJsxMethodsForVm(tempVar[i], i);
            }
          } else {
            injectJsxMethodsForVm(tempVar);
          }
        });
      }

      window.Bue.s.vmCache[fileName] = res;



      setTimeout(() => {
        resolve(res);
      });
    });
  },
  // parseInitialTpl(tpl) {
  //   return tpl.replace(/(<([^>]+)><\/)/gi, function() {
  //     window.Bue.doNothing("arguments--:", arguments);
  //     let compName = arguments[2].split(" ")[0],
  //       arg2Arr = arguments[2].split(" ");
  //     if (Bue.s.isCustomComp(compName)) {
  //       return (
  //         "<" +
  //         compName +
  //         " ref='bx-custom:" +
  //         compName +
  //         "'" +
  //         (arg2Arr ? " " + arg2Arr.slice(1).join(" ") : "") +
  //         "></"
  //       );
  //     } else {
  //       return arguments[0];
  //     }
  //     // window.Bue.doNothing("args--:", arguments, arguments[2]);
  //   });
  // },
  handleRootElWithVIf(node) {
    // window.Bue.doNothing("str--:", node, node.innerHTML);
    let nodeName = node.nodeName.toLowerCase(),
      nodeInnerStr = node.innerHTML,
      firstEl = node;
    if (nodeName == "script") {
      var firstTagHalfStr =
        node.innerText
          .replace(/<!--[\w\W\r\n]*?-->/gim, "")
          .replace(/(\n+)|(\r+)/g, "")
          .trim()
          .split(">")[0] + "/>";
      var div = document.createElement("div");
      div.innerHTML = firstTagHalfStr;
      firstEl = div.querySelector("*");
    }
    // window.Bue.doNothing("firstEl--:", firstEl);
    if (firstEl.getAttribute("v-if") != null) {
      nodeInnerStr =
        "<" +
        firstEl.nodeName +
        ">" +
        nodeInnerStr +
        "</" +
        firstEl.nodeName +
        ">";
    }
    return nodeInnerStr;
  },
  getTplByCache(tplFileName, isEndsWithDotJsx, tplFilePath = null) {
    // alert(tplFileName)
    // alert(tplFileName)
    return new Promise(async (resolve, reject) => {
      // window.Bue.rmAlert(tplFileName);

      window.Bue.doNothing(
        "window.Bue.s.tplCache--:",
        window.Bue.s.tplCache
      );
      let res = window.Bue.s.tplCache[tplFileName] || null;

      //类似bue.async这样的组件，app这个key本身就存在于cache里，app.html却没有加载
      if (
        !res
        // ||
        // Bue.s.isTargetDataLoadFromDefaultCache(defaultTplCache, tplFileName, res)
      ) {
        let path = (tplFilePath || Bue.engineSettings.tplDirPath) + tplFileName + ".html";
        window.Bue.doNothing("path--:", path);
        // Bue.engineSettings.tplDirPath + tplFileName + ".html?r=" + Math.random();

        if (isEndsWithDotJsx) {
          let vmRes = await Bue.s.loadVM(tplFileName + '..jsx', false)
          Bue.doNothing('vm res--:', vmRes)
          resolve({
            [tplFileName]: vmRes.template || '<div></div>'
            // [tplFileName]: "<div data-jsx-only='true'></div>",
          });
        } else {
          try {
            res = await Bue.s.httpGet(path);
            // .catch(() => {
            //   window.Bue.doNothing('------',"error");
            // });

            // res = await Bue.s.httpGet(u.getHttpPathByRelativePath(path));

            let div = document.createElement("div");
            div.innerHTML = res;
            let tplMap = {},
              // jsxMap = {},
              allScrs = div.querySelectorAll("script");
            window.Bue.doNothing("div childs--:", div.childNodes);

            if (allScrs.length == 0) {
              tplMap[tplFileName] = Bue.s.handleRootElWithVIf(div);
              // collectJsx(res);
            } else {
              allScrs.forEach((item) => {
                if ((item.type = "text/template")) {
                  tplMap[item.id] = Bue.s.handleRootElWithVIf(item);
                }
              });
            }
            window.Bue.s.tplCache[tplFileName] = window.lodash.mergeWith(
              {},
              window.Bue.s.tplCache[tplFileName] || {},
              tplMap
            );
            resolve(window.Bue.s.tplCache[tplFileName]);
          } catch (e) {
            // alert(isEndsWithDotJsx);
            console.warn("e--:", e);
            window.Bue.throwExcepAlert("加载" + path + "失败!");
          }
        }

        // res = Bue.s.parseInitialTpl(res);

        //   window.Bue.doNothing("res--:", res);
      } else {
        resolve(res);
      }
    });
  },
  loadTpl(tplName, path = null) {
    let isEndsWithDotJsx = Bue.s.hasModifierInTagName(
      tplName.toLowerCase(),
      "jsx"
    );
    tplName = tplName.split("..")[0];

    return new Promise(async (resolve, reject) => {
      let fileName = Bue.s.getFileNameByExpr(tplName);
      let resolveTpl =
        (Bue.u.getDataByModel(window.Bue.s.tplCache, fileName) || {})[
        tplName.split(".").reverse()[0]
        ] || null;
      if (resolveTpl) {
        resolve(resolveTpl);
      } else {
        window.Bue.doNothing(
          "resolveTpl and tplName:",
          resolveTpl,
          tplName
        );
        // let tpl=

        let map = await window.Bue.s.getTplByCache(fileName, isEndsWithDotJsx, path),
          n = tplName.split(".").slice(-1);

        window.Bue.doNothing("map---:", map, Object.keys(map));
        window.Bue.doNothing("map---:", map);
        // window.Bue.rmAlert(Object.keys(map));
        // window.Bue.rmAlert(n + "---\n" + map[n]);

        // window.Bue.rmAlert(tplName);
        // let resolveTpl;
        try {
          resolveTpl = map[n];
        } catch (e) {
          window.Bue.throwExcepAlert("加载组件" + n + "失败");
          // throw ("e--:", e);

          resolveTpl = null;
        }
        // window.Bue.rmAlert(resolveTpl);
        // window.Bue.doNothing('------',resolveTpl);
        resolve(resolveTpl);

        // resolve(map[n] || map.app[n]);
      }
    });
  },
  getFileNameByExpr(expr) {
    let fileName = expr.split(".").slice(0, -1).join(".");
    if (expr.split(".").filter((str) => str.trim() != "").length < 2) {
      fileName = expr;
    }
    return fileName;
  },
  transformStyles(styleObj, vmName) {
    let result = {};

    for (let j in styleObj) {
      let initialPrefix = vmName.split(".").join("--") + " " + j;
      result[initialPrefix] = styleObj[j];
    }

    return result;
  },
  loadVM(vmName, isMixin = false, path = null) {
    // Bue.doNothing("vmName---:", vmName);
    let isEndsWithDotJsx = Bue.s.hasModifierInTagName(
      vmName.toLowerCase(),
      "jsx"
    );


    // alert(compName)

    // window.Bue.doNothing("vmName--:", vmName);

    let outerKeyInVmName = vmName.split(".")[0];
    // alert(vmName);

    if (
      outerKeyInVmName in window.Bue.vm &&
      Bue.s.hasModifierInTagName(vmName, "tpl-only")
    ) {
      return new Promise((resolve) => {
        let res = {
          name: (vmName.split("..")[0]),

          props: ["vm"],
        };
        if (!isMixin) {
          window.Bue.vm[outerKeyInVmName][
            vmName.split("..")[0].split(".").slice(1).join(".")
          ] = res;
        }

        resolve(res);
      });
    }

    vmName = vmName.split("..")[0];

    return new Promise(async (resolve, reject) => {
      let result = window.lodash.cloneDeep(
        Bue.u.getDataByModel(window.Bue.vm, vmName)
      );
      if (result) {
        // result.name = vmName;
        // resolve(result);
      } else {
        let fileName = Bue.s.getFileNameByExpr(vmName);

        await window.Bue.s.loadVMJsFile(fileName, vmName, isEndsWithDotJsx, path);

        window.Bue.doNothing("vmNameeeeeeeee---:", vmName);
        let vmConfig = window.lodash.cloneDeep(
          Bue.u.getDataByModel(window.Bue.vm, vmName)
        );

        // window.Bue.rmAlert(Object.keys(window.Bue.vm));
        // window.Bue.rmAlert(vmName + "--" + vmConfig);

        result = vmConfig;
        // resolve(map[vmName.split(".").slice(-1)]);
      }

      if (!result) {
        Bue.throwExcepAlert(
          "加载" +
          vmName +
          "失败，请检查文件名或者html文件中对应的模板id是否正确"
        );
        return false;
      }
      result.name = vmName;
      // result.name = result.name || vmName;
      window.window.Bue.doNothing("vmConfig------:", result, vmName);

      window.Bue.doNothing("result--:", result, vmName);

      let mixins = []
        .concat(result.mixins)
        .flat()
        .filter((s) => typeof s == "string");
      if (mixins.length > 0) {
        result.mixins = await Promise.all(
          mixins.map((s) => Bue.s.loadVM(s, true))
        );
      }

      resolve(result);
    });
  },
});
