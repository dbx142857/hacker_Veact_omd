



// 

// 实现require






// vue第一个元素attributes丢失











; (async function () {
  let loadedComponents = [];
  let pendingVMFileLoaders = {

  }

  function getAllFuncs(toCheck, filterFun = (v) => typeof (v) == 'function') {
    const props = [];
    let obj = toCheck;
    do {
      props.push(...Object.getOwnPropertyNames(obj));
    } while (obj = Object.getPrototypeOf(obj));

    return props.sort().filter((e, i, arr) => {
      if (e != arr[i + 1] && filterFun(toCheck[e], e)) return true;
      // if (e != arr[i + 1] && typeof toCheck[e] == 'function') return true;
    });
  }
  let defaultClassMethodsArr = getAllFuncs(new class { });
  let getAllCustomPropsFromClassInstance = (tempVar, filterFun) => {
    let obj = {};
    let allFuns = getAllFuncs(tempVar, filterFun)
    for (let i in allFuns) {
      if (!defaultClassMethodsArr.includes(allFuns[i])) {
        obj[allFuns[i]] = tempVar[allFuns[i]]
      }
    }
    // for (let j in tempVar) {
    //   obj[j] = tempVar[j]
    // }
    return obj;
  }
  // getAllFuncs

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

        var scriptTag = doc.createElement("script");


        scriptTag.src = url;
        scriptTag.type = "text/javascript";

        scriptTag.onload = function () {
          cache && cacheedScriptUrls.push(url)
          resolve();
        };

        targetNode.appendChild(scriptTag);

      });
    };
  })();





  function setVeactOptionForReact(vm, obj) {
    vm.VeactOptions = {
      _uid: Veact.util.guid(),
      name: Object.getPrototypeOf(vm).constructor.name,
      ...obj
    };
  }
  function addVM2VMInstance(vm) {
    if (vm.VeactOptions.name in window.Veact.service.vmInstances) {
      window.Veact.service.vmInstances[vm.VeactOptions.name] = [
        window.Veact.service.vmInstances[vm.VeactOptions.name]
      ].concat([]).flat();
      window.Veact.service.vmInstances[vm.VeactOptions.name].push(vm);
    } else {
      window.Veact.service.vmInstances[vm.VeactOptions.name] = vm;
    }
  }
  function createReactComponentFromVMDefine(res) {
    window.Veact.service.tempVar = res;

    return Veact.service.babelEval(`<window.Veact.service.tempVar />`);
  }
  function mountReactInstance2Vue(res, el, vueVM) {

    if (!('$el' in res)) {

      if (!('vm' in res)) {
        res = {
          vm: res
        }
      }
      res.$el = null;
    }

    let $el = vueVM ? vueVM.$refs[el] || vueVM.$el : el;
    res = "$el" in (res || {}) ? res.vm : res;

    if (!res) {
      Veact.throwExcepAlert("非法的react挂载对象");
      return false;
    }

    res = window.Veact.service.reacMixinComposer(
      res,
      class {
        componentWillUnmount() {
          Veact.service.destroyVMInstance(this);
        }
        componentDidMount() {
          if (vueVM) {
            vueVM.$children.push(this);
            this.$parent = vueVM;
            if (!("rInstance" in vueVM)) {
              vueVM.rInstance = this;
            } else {
              vueVM.rInstance = [].concat(vueVM.rInstance).concat(this);
            }

            if (typeof vueVM.bootstrapFinished == "function") {
              vueVM.bootstrapFinished();
            }
            vueVM.isReactMounted = true;
            vueVM.$emit("ReactMounted");
          }
          setVeactOptionForReact(this, {
            $el: $el
          });
          addVM2VMInstance(this);
          Veact.renderByScanDom(ReactDOM.findDOMNode(this), this)
        }
      }
    );

    ReactDOM.render(createReactComponentFromVMDefine(res), $el);
  }
  function findVMInstanceById(id) {
    let result = null;
    for (let i in Veact.service.vmInstances) {
      let obj = []
        .concat(Veact.service.vmInstances[i])
        .find(item => item.VeactOptions._uid == id);
      if (obj) {
        result = obj;
      }
    }
    return result;
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
      var mm = (d.getMonth() + 1).toString();
      var dd = d.getDate().toString();
      var hh = d.getHours().toString();
      var ii = d.getMinutes().toString();
      var ss = d.getSeconds().toString();

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
    }
  }





  let _httpGet = function (url, useCache = false) {


    return new Promise((resolve, reject) => {


      let nowTime = u.formatTime(null, true)

      let randomStr = "jsx html css less sass scss js json veact"
        .split(" ")
        .find((s) => url.endsWith("." + s))
        ? nowTime
        : Math.random();

      var httpRequest = new XMLHttpRequest();
      httpRequest.open(
        "GET",
        url + "?r=" + (randomStr),
        true
      );
      httpRequest.send();
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


          }


        } else {
          if (httpRequest.readyState == 4) {
            resolve(httpRequest.responseText);
          }
        }
      };
    });
  }




  function handleEs6Template(strings, restArgs) {
    if (strings.length > 1000) {
      throw '一个组件的模板里最多只允许使用1000个es6模板字符串定界符'
    }
    let res = ''
    for (let i = 0; i < 1000; i++) {
      res += (strings[i] || '') + (restArgs[i] || '')
      if (!strings[i] && !restArgs[i]) {
        break;
      }
    }
    return res
  }




  function Veact(p) {
    window.Veact.__lastParam = p;
    setTimeout(() => {
      delete window.Veact.__lastParam
    })
    return window.Veact;
  }

  let VeactStaticProps = {
    throwExcepAlert: (str) => {
      window["aler" + "t"](str);
    },
    engineSettings: {
      jsxDefineSplitStr: "module.exports",
      tplDirPath: '',
      vmDirPath: '',
      babelMethodsDefineMatchReg: /\@React([\s\S]*)\}/,
      babelMethodsDefineSpliterStr: '@React',
      // babelMethodsDefineMatchReg: /\@Veact\.defineReact\(\{([\s\S]*)\}\)\(\)/,
      vueTemplateDefineMatchReg: /vueTemplate: \(([\s\S]*)\),/,
    },
    util: {
      getAllCustomPropsFromClassInstance: getAllCustomPropsFromClassInstance,
      loadJs: _loadJS,
      ...u,
      isCustomComp(name) {
        let browserBuiltInTags = (
          "html,body,base,head,link,meta,style,title," +
          "address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section," +
          "div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul," +
          "a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby," +
          "s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video," +
          "embed,object,param,source,canvas,script,noscript,del,ins," +
          "caption,col,colgroup,table,thead,tbody,td,th,tr," +
          "button,datalist,fieldset,form,input,label,legend,meter,optgroup,option," +
          "output,progress,select,textarea," +
          "details,dialog,menu,menuitem,summary," +
          "content,element,shadow,template,blockquote,iframe,tfoot"
        )
          .split(",")
          .concat(
            `svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face," +
          "foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern," +
          "polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view`.split(
              ","
            )
          );
        let vueBuiltInTags = "router-link router-view slot component transition keep-alive transition-group".split(
          " "
        );
        return (
          !browserBuiltInTags.includes(name) &&
          !vueBuiltInTags.includes(name) &&
          !Boolean(
            (name =>
              new RegExp(
                "^[a-zA-Z][\\-\\.0-9_" +
                /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/
                  .source +
                "]*$"
              ).test(name) &&
              !name.includes("--") &&
              Object.keys(
                Object.getPrototypeOf(new Vue().$options.components)
              ).find(key =>
                [key, name]
                  .map(key => key.replace(/-/gi, "").toLowerCase())
                  .every((k, i, a) => a[0] == k)
              ))(name)
          )
        );
      },

      copyObj(obj) {
        var cloneObj;
        //当输入数据为简单数据类型时直接复制
        if (obj && typeof obj !== "object") {
          cloneObj = obj;
        }
        //当输入数据为对象或数组时
        else if (obj && typeof obj === "object") {
          //检测输入数据是数组还是对象
          cloneObj = Array.isArray(obj) ? [] : {};
          for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
              if (obj[key] && typeof obj[key] === "object") {
                //若当前元素类型为对象时，递归调用
                cloneObj[key] = Veact.util.copyObj(obj[key]);
              }
              //若当前元素类型为基本数据类型
              else {
                cloneObj[key] = obj[key];
              }
            }
          }
        }
        return cloneObj;
      },


      guid() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
          c
        ) {
          var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });
      },

      setDataByModel: function ($scope, modelStr, val) {
        var arr = modelStr.split("."),
          len = arr.length;
        if (len === 1) {
          $scope[arr[0]] = val;
        } else if (len > 1) {
          var ns = arr,
            obj = $scope;
          for (var i = 0; i < len - 1; i++) {
            var key = ns[i];
            obj = obj[key];
          }


          obj[ns[len - 1]] = val;
        }
      },
      getDataByModel($scope, modelStr, otherWiseVal) {
        otherWiseVal = otherWiseVal || null;

        if (!$scope) {
          return otherWiseVal;
        }

        var arr = modelStr.split("."),
          len = arr.length,
          result = $scope;
        if (len === 1) {

          return $scope.hasOwnProperty(arr[0]) ? $scope[arr[0]] : otherWiseVal;
        } else if (len > 1) {
          var isError = false;
          for (var i in arr) {
            if (typeof result[arr[i]] === "undefined") {
              isError = true;
              break;
            } else {
              result = result[arr[i]];
            }
          }
          if (isError) {
            return otherWiseVal;
          } else {
            return result;
          }
        } else if (len === 0) {
          return otherWiseVal;
        }
      }
    },
    service: {
      httpGet: _httpGet,
      globalMixins: {

        data() {

          return {

            isReactMounted: false
          };
        },
        props: {
          vm: {
            type: Object,
            default: null
          }
        },
        methods: {
          allReactChilds$() {
            return this.$children.filter(s => Veact.service.isReactVM(s))
          },



          callBabel$(funName, ...restArgs) {
            let babelMethods = this.babelMethods;
            if (babelMethods && babelMethods[funName]) {
              return babelMethods[funName].apply(this, [
                this.VeactOptions.name,
                ...restArgs
              ]);
            } else {
              console.warn(
                this.VeactOptions.name + "的babelMethods的" + funName + "不存在"
              );
              return null;
            }
          }
        },
        created() {
          this.babelMethods = Veact.util.getDataByModel(
            window.Veact.vm,
            this.VeactOptions.name
          ).babelMethods;


        },
        beforeDestroy() {
          Veact.service.destroyVMInstance(this);
          //删除自身的vm实例
        },
        async mounted() {



          addVM2VMInstance(this);

          if ("bootstrap" in (this.babelMethods || {})) {
            let res;
            if (
              Object.prototype.toString
                .call(this.babelMethods.bootstrap)
                .toLocaleLowerCase()
                .includes("async")
            ) {
              res = await this.callBabel$("bootstrap");
            } else {
              res = this.callBabel$("bootstrap");
            }
            let vueVM = this;
            if (res != null) {

              if (!Array.isArray(res)) {
                res = [res]
              }
              res.forEach((row) => {
                mountReactInstance2Vue(row, row.$el, vueVM);
              })

            }

          }


          let targetElClassName = this.VeactOptions.name.split(".").join("--");

          this.$el.classList.add(targetElClassName);

          if (!this.VeactOptions.loadedComponents.includes(this.VeactOptions.name)) {
            this.VeactOptions.loadedComponents.push(this.VeactOptions.name);
          }







        }
      },
      reacMixinComposer: (ComposedComponent, Mixin) =>
        class extends React.Component {
          constructor(props) {
            super(props);
            Object.getOwnPropertyNames(Mixin.prototype).forEach((func) => {
              if (func != "constructor")
                ComposedComponent.prototype[func] = Mixin.prototype[func];
            });
            Veact.service.tempVar = ComposedComponent;
            this.composed = Veact.service.babelEval(
              `<Veact.service.tempVar {...Veact.service.tempVar.props} {...Veact.service.tempVar.state} />`
            );
          }
          render() {
            return this.composed;
          }
        },
      hasModifierInTagName(name, modifier) {
        return (
          name.endsWith(".." + modifier) || name.includes(".." + modifier + "..")
        );
      },
      isReactVM(vm) {
        return "_reactInternalFiber" in vm;
      },
      isVueVM(vm) {
        return vm["_isVue"] == true;
      },
      vmTypesJudgeArr: "isReactVM isVueVM".split(" "),
      calculateVMTypeJudgeMethodName: (vm) =>
        Veact.service.vmTypesJudgeArr.find((key) => Veact.service[key](vm)),
      destroyVMInstance(vm) {
        delete vm.rInstance;
        let shouldDestroyedVMName = vm.VeactOptions.name;
        Veact.service.vmTypesJudgeArr
          .filter((m) => m != Veact.service.calculateVMTypeJudgeMethodName(vm))
          .forEach((methodName) => {
            (vm.$children || [])
              .filter((node) => Veact.service[methodName](node))
              .forEach((node) => {
                if (Veact.service.isReactVM(node)) {
                  ReactDOM.unmountComponentAtNode(node.VeactOptions.$el);
                }
                Veact.service.destroyVMInstance(node);
              });
          });

        if (!Array.isArray(window.Veact.service.vmInstances[shouldDestroyedVMName])) {
          delete window.Veact.service.vmInstances[shouldDestroyedVMName];
        } else {
          let uid = vm.VeactOptions._uid;
          let index = window.Veact.service.vmInstances[shouldDestroyedVMName].findIndex(
            (item) => item.VeactOptions._uid == uid
          );
          if (index > -1) {
            window.Veact.service.vmInstances[shouldDestroyedVMName].splice(index, 1);
          }
          if (window.Veact.service.vmInstances[shouldDestroyedVMName].length == 0) {
            delete window.Veact.service.vmInstances[shouldDestroyedVMName];
          }
        }
      },
      collectCompByTpl(tpl, tplName) {

        let collectCompKeysResult = [];
        let div = document.createElement("div");
        div.innerHTML = tpl;
        div.querySelectorAll("*").forEach((node) => {
          let nodeName = node.tagName.toLowerCase();
          if (Veact.util.isCustomComp(nodeName)) {

            // if (!['veact.comp'].includes(nodeName) & !nodeName.includes('..tpl-only') && !nodeName.includes('..jsx') && !nodeName.includes('..multi')) {
              
            //   nodeName += '..jsx'
            // }
            // nodeName = nodeName.replace(/\.\.multi/gi, '')
            


            collectCompKeysResult.push({
              node: node,
              nodeName,
            });
          }
          if (nodeName == 'template') {
            collectCompKeysResult = collectCompKeysResult.concat(Veact.service.collectCompByTpl(node.innerHTML))
          }
        });
        collectCompKeysResult = [...new Set(collectCompKeysResult)];
        return collectCompKeysResult;
      },
      babelEval(jsxStr, useBabel = false, prefixStr = "", useTempVar = true, filePath = '') {

        useBabel=false;
        jsxStr = prefixStr + `${useTempVar ? `;window.Veact.service.tempVar=${jsxStr};` : `${jsxStr}`}`;

        if (useBabel) {
          var scri = document.createElement("script");
          scri.type = "text/babel";

          scri.innerHTML = (filePath ? ('//' + filePath + '\n') : '') + jsxStr;
          var div = document.createElement("div");
          div.appendChild(scri);
          window.babelTransform(div.querySelectorAll("script"));
        } else {
          window.eval(jsxStr);
        }

        return window.Veact.service.tempVar;
      },
      vm(tplName, returnInstance = true) {
        tplName = Veact.COMPONENT_BASE_URL + '/' + tplName;

        if (!tplName.includes('..tpl-only') && !tplName.includes('..jsx') && !tplName.includes('..multi')) {
          tplName += '..jsx'
        }
        let hasMultiIdentify=tplName.includes('..multi')
        tplName = tplName.replace(/\.\.multi/gi, '')
        let tplNameArr = tplName.split('/'), path = null;
        if (tplNameArr.length > 1) {
          tplName = tplNameArr[tplNameArr.length - 1]
          path = tplNameArr.slice(0, tplNameArr.length - 1).join('/') + '/'
        }
        let result = new Promise(async (resolve, reject) => {
          let loadTplFun = Veact.service.loadTpl(tplName, path,hasMultiIdentify),
            loadTplPromises = [loadTplFun],
            loadVmPromises = [Veact.service.loadVM(tplName, false, path)],
            comps = {},
            arr = tplName.split("."),
            collectedMixins = [],
            [vmConfig] = await Promise.all(loadVmPromises);

          await loadTplFun.then((res) => {
            vmConfig.components = Veact.service
              .collectCompByTpl(res, tplName)
              .map((item) => item.nodeName);
            return res;
          });

          if (
            Array.isArray(vmConfig.components) &&
            vmConfig.components.length > 0
          ) {
            loadTplPromises = loadTplPromises.concat(
              vmConfig.components.map((key) => {
                
                return Veact.service.loadTpl(key)
              })
            );

            loadVmPromises = loadVmPromises.concat(
              vmConfig.components.map((key) => Veact.service.loadVM(key, false))
            );
          }
          loadTplPromises.slice(1).forEach((prom) => {
            prom.then((tplRes) => {
              return tplRes;
            });
          });

          let loadTplPromisesRes = await Promise.all(loadTplPromises);
          let [tpl, ...restTplReqs] = loadTplPromisesRes;
          loadVmPromises.forEach((prom, index) => {
            prom.then(async (vmConfigRes) => {
              let _uid = Veact.util.guid();
              vmConfigRes.mixins = vmConfigRes.mixins || [];
              vmConfigRes.VeactOptions = {
                ...(vmConfigRes.VeactOptions || {}),
                loadVmPromises: loadVmPromises,
                loadedComponents: loadedComponents,
                _uid: _uid,
                vmDefine: Veact.util.copyObj(vmConfigRes),
                name: vmConfigRes.name,
                defaultTpl: loadTplPromisesRes[index],
                components: Veact.service
                  .collectCompByTpl(loadTplPromisesRes[index])
                  .map((item) => item.nodeName),
              };
              vmConfigRes.mixins = [
                Veact.service.globalMixins,
                {
                  data() {
                    return {
                      VeactOptions: vmConfigRes.VeactOptions,
                    };
                  },
                },
              ].concat(vmConfigRes.mixins);
              return vmConfigRes;
            });
          });
          let restVMReqs = (await Promise.all(loadVmPromises)).slice(1);

          if (Array.isArray(vmConfig.components)) {
            vmConfig.components.forEach((compName, idx) => {
              comps[compName] = {
                template: restTplReqs[idx] || '<div></div>',
                ...restVMReqs[idx],
              };
            });
          }




          // debugger;
          let obj = {

            ...vmConfig,
            template: vmConfig.template || tpl || '<div></div>',
            components: comps,
          };


          if (window.$store) {
            obj.store = window.$store;
          }


          for (let k in obj.components) {

            obj.components[k].components =
              (await Veact.service.vm(k, false)).components || {};
              // (await Veact.service.vm(prefix+k, false)).components || {};

          }

          resolve(returnInstance ? new (Vue.extend(obj))() : obj);
          setTimeout(() => {
            delete Veact.service.tempVar;
          })
        });
        result.$$mount = function (targetNode, $parent) {


          return new Promise(async (resolve) => {
            let instance = await this;

            let fun = Veact.service.mountVMInstance2DomNode;

            fun(targetNode, instance, $parent);
            fun.instance = instance;
            resolve(fun);
          });
        };
        return result;
      },
      mountVMInstance2DomNode(targetNode, instance, $parent) {
        if (!(targetNode instanceof HTMLElement)) {

          try {
            targetNode = document.querySelector(targetNode);
          } catch { }
        }

        instance.$mount(targetNode);
        if ($parent) {
          instance.$parent = $parent
        }
      },
      tplCache: {},
      vmCache: {},
      vmInstances: {},
      tempVar: null,

      loadVMJsFile(fileName, vmName, useSingleFileVM = false, vmFilePath, isPureReact) {
        let tempVMName = vmName;
        let isCommon = fileName != vmName;
        vmName = vmName.split(".").reverse()[0];
        return new Promise(async (resolve, reject) => {

          var res = window.Veact.service.vmCache[fileName] || null;
          let path = (vmFilePath || Veact.engineSettings.vmDirPath) + fileName + ".veact";

          if (!res) {




            if (!(path in pendingVMFileLoaders)) {
              if(!path.startsWith('./vue-hacker-components')){
                path='./vue-hacker-components/'+path
              }
              pendingVMFileLoaders[path] = Veact.service.httpGet(path)
            } else {

              setTimeout(() => {
                delete pendingVMFileLoaders[path]
              })

            }

            res = await pendingVMFileLoaders[path];

          }

          if (isPureReact) {
            let contentArr = res.split('\n'), classIndex = contentArr.findIndex(s => s.trim().startsWith('class '))
            res = `
              ${contentArr.slice(0, classIndex).join('\n')}
              ${Veact.engineSettings.babelMethodsDefineSpliterStr}
              class{
              
              
               
                async bootstrap() {
              
              
                  return `+ res.trim() + `
                 
  }
}

              `;
          }

          if (window.Veact.service.vmCache[fileName] && fileName != 'veact') {
            setTimeout(() => {
              resolve(window.Veact.service.vmCache[fileName]);
            });
            return false;
          }







          let reg = new RegExp(`${Veact.engineSettings.jsxDefineSplitStr}`, "gi");

          let resArr = res.split(Veact.engineSettings.jsxDefineSplitStr);
          if (resArr.length == 1) {
            resArr.push('={};')
            // window.Veact.throwExcepAlert(fileName + "未对外导出东西，请检查代码");
          }
          // alert(resArr[1])
          let closureStr = resArr[0].split(Veact.engineSettings.babelMethodsDefineSpliterStr)[0] || '';


          let jsxStr =
            (resArr[0].match(Veact.engineSettings.babelMethodsDefineMatchReg) ||
              [])[1] || null;


          // if (jsxStr && resArr[0].trim().startsWith('//')){
          //   jsxStr=null;

          // }

          let evalStr = resArr.slice(1).join(Veact.engineSettings.jsxDefineSplitStr)
            .split(Veact.engineSettings.babelMethodsDefineSpliterStr)[0]
          //   +
          // ";window.Veact.vm['" +
          // fileName +
          // `']=Veact.service.tempVar;`;




          evalStr = ";window.Veact.vm['" +
            fileName +
            `']${evalStr};`;

          let tplInSingleFileVM = null



          if (jsxStr) {

            jsxStr += '}'


            tplInSingleFileVM =
              (jsxStr.match(Veact.engineSettings.vueTemplateDefineMatchReg) ||
                [])[1] || null;
            if (tplInSingleFileVM) {
              jsxStr = jsxStr.replace(
                Veact.engineSettings.vueTemplateDefineMatchReg,
                ""
              );
            }
            evalStr = "new (" + jsxStr + ")" + evalStr;
          } else {

          }


          // Veact.service.babelEval("new (" + jsxStr + ")",true,';let require=Veact.require;'+closureStr+';');

          // alert(path)
          try {
            Veact.service.babelEval(evalStr, true, 'let require=Veact.require;' + closureStr + ';', jsxStr, path);
            // eval(evalStr);
          } catch (e) {
            // console.error("eval error--:", e, evalStr);
            console.trace();
          }







          if (jsxStr) {
            // jsxStr+='}'


            // let tplInSingleFileVM =
            //   (jsxStr.match(Veact.engineSettings.vueTemplateDefineMatchReg) ||
            //     [])[1] || null;
            // if (tplInSingleFileVM) {
            //   jsxStr = jsxStr.replace(
            //     Veact.engineSettings.vueTemplateDefineMatchReg,
            //     ""
            //   );
            // }



            // Veact.service.babelEval("new (" + jsxStr + ")",true,';let require=Veact.require;'+closureStr+';');
            let tempVar = Veact.service.tempVar;

            try{
              tempVar = getAllCustomPropsFromClassInstance(tempVar, () => true)
            }catch(e){
              tempVar=null;
            }
            


            if(tempVar){

              let injectJsxMethodsForVm = (obj, vmK) => {
                vmK = vmK || vmName;
  
                if (isCommon) {
                  console.warn("isCommon--:", tempVMName.split(".")[0] + "." + vmK);
                }
                let vmKey = isCommon
                  ? tempVMName.split(".")[0] + "." + vmK
                  : vmName;
  
                // Veact.util.setDataByModel(
                //   window.Veact.vm,
                //   vmKey + ".babelMethods",
                //   Veact.util.getDataByModel(window.Veact.vm, vmKey + ".babelMethods") || {}
                // );
  
  
  
                Veact.util.setDataByModel(
                  window.Veact.vm,
                  vmKey + ".babelMethods",
                  tempVar
                );
  
  
                // for (var i in obj) {
                //   let newFun = Veact.service.babelEval(obj[i]);
  
                //   Veact.util.setDataByModel(
                //     window.Veact.vm,
                //     vmKey + ".babelMethods." + i,
                //     newFun
                //   );
  
  
                // }
              };
  
              setTimeout(() => {
                //不是app.开头的且在文件头部使用defineVueTemplate的
                if (!isCommon && tplInSingleFileVM && useSingleFileVM) {
                  Veact.util.setDataByModel(
                    window.Veact.vm,
                    vmName + ".template",
                    tplInSingleFileVM
                      .replace(/\$\$\$/gi, "@")
                      .replace(/\$\$/gi, ":")
                      .replace(/\{\/\*/gi, "<!--")
                      .replace(/\*\/\}/gi, "-->")
                  );
                }
  
  
                injectJsxMethodsForVm(tempVar);
  
              });
            }
            }





            

          window.Veact.service.vmCache[fileName] = res;



          setTimeout(() => {
            resolve(res);

          });
        });
      },
      handleRootElWithVIf(node) {
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
      getTplByCache(tplFileName, shouldLoadSingleFileVm, tplFilePath = null) {
        let previousTplFileName = tplFileName;
        tplFileName = tplFileName.split('..')[0]
        return new Promise(async (resolve, reject) => {

          let res = window.Veact.service.tplCache[tplFileName] || null;

          //类似Veact.async这样的组件，app这个key本身就存在于cache里，app.html却没有加载
          if (
            !res
          ) {
            let path = (tplFilePath || Veact.engineSettings.tplDirPath) + tplFileName + ".html";

            if (shouldLoadSingleFileVm) {
              let vmRes = await Veact.service.loadVM(previousTplFileName, false, tplFilePath || Veact.engineSettings.tplDirPath)

              resolve({
                [tplFileName]: vmRes.template || '<div></div>'
              });
            } else {
              try {
                res = await Veact.service.httpGet(path);


                let div = document.createElement("div");
                div.innerHTML = res;
                let tplMap = {},
                  allScrs = div.querySelectorAll("script");


                if (allScrs.length == 0) {
                  tplMap[tplFileName] = Veact.service.handleRootElWithVIf(div);
                } else {
                  allScrs.forEach((item) => {
                    if ((item.type = "text/template")) {
                      tplMap[item.id] = Veact.service.handleRootElWithVIf(item);
                    }
                  });
                }
                window.Veact.service.tplCache[tplFileName] = window.lodash.mergeWith(
                  {},
                  window.Veact.service.tplCache[tplFileName] || {},
                  tplMap
                );
                resolve(window.Veact.service.tplCache[tplFileName]);
              } catch (e) {
                console.warn("e--:", e);
                window.Veact.throwExcepAlert("加载" + path + "失败!");
              }
            }


          } else {
            resolve(res);
          }
        });
      },
      loadTpl(tplName, path = null,hasMultiIdentify=false) {
        let shouldLoadSingleFileVm = Veact.service.hasModifierInTagName(
          tplName.toLowerCase(),
          "jsx"
        );
        
        if(!shouldLoadSingleFileVm && !['veact.comp'].includes(tplName) && !tplName.includes('..multi')&& !tplName.includes('..tpl-only')){
          // alert(tplName)
          shouldLoadSingleFileVm=true;
        }
        if(hasMultiIdentify){
          shouldLoadSingleFileVm=false
        }
        
        let previousTplName = tplName;
        tplName = tplName.split("..")[0];

        return new Promise(async (resolve, reject) => {
          let fileName = Veact.service.getFileNameByExpr(tplName);
          let resolveTpl =
            (Veact.util.getDataByModel(window.Veact.service.tplCache, fileName) || {})[
            tplName.split(".").reverse()[0]
            ] || null;
          if (resolveTpl) {
            resolve(resolveTpl);
          } else {

            let map = await window.Veact.service.getTplByCache(previousTplName, shouldLoadSingleFileVm, path),
              n = tplName.split(".").slice(-1);

            try {
              resolveTpl = map[n];

            } catch (e) {
              window.Veact.throwExcepAlert("加载组件" + n + "失败");

              resolveTpl = null;
            }
            resolve(resolveTpl);

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
      loadVM(vmName, isMixin = false, path = null) {
        let isPureReact = vmName.includes('..react')

        let shouldLoadSingleFileVm = Veact.service.hasModifierInTagName(
          vmName.toLowerCase(),
          "jsx"
        );


        let outerKeyInVmName = vmName.split(".")[0];
        // alert(vmName)
        // alert(outerKeyInVmName)

        if (
          // outerKeyInVmName in window.Veact.vm &&
          Veact.service.hasModifierInTagName(vmName, "tpl-only")
        ) {
          // alert('yes')
          return new Promise((resolve) => {
            let res = {
              name: vmName.split("..")[0],

              props: ["vm"],
            };
            if (!isMixin) {
              window.Veact.vm[outerKeyInVmName] = res;
              // alert(outerKeyInVmName)
              // window.Veact.vm[outerKeyInVmName][
              //   vmName.split("..")[0].split(".").slice(1).join(".")
              // ] = res;
            }

            resolve(res);
          });
        }

        vmName = vmName.split("..")[0];

        return new Promise(async (resolve, reject) => {
          let result = window.lodash.cloneDeep(
            Veact.util.getDataByModel(window.Veact.vm, vmName)
          );
          if (result) {
          } else {
            let fileName = Veact.service.getFileNameByExpr(vmName);


            await window.Veact.service.loadVMJsFile(fileName, vmName, shouldLoadSingleFileVm, path, isPureReact);

            let vmConfig = window.lodash.cloneDeep(
              Veact.util.getDataByModel(window.Veact.vm, vmName)
            );

            result = vmConfig;

          }

          if (!result) {
            Veact.throwExcepAlert(
              "加载" +
              vmName +
              "失败，请检查文件名或者html文件中对应的模板id是否正确"
            );
            return false;
          }
          result.name = vmName;

          let mixins = []
            .concat(result.mixins)
            .flat()
            .filter((s) => typeof s == "string");
          if (mixins.length > 0) {
            result.mixins = await Promise.all(
              mixins.map((s) => Veact.service.loadVM(s, true))
            );
          }

          resolve(result);
        });
      },
    }
  }
  for (let i in VeactStaticProps) {
    Veact[i] = VeactStaticProps[i]
  }

  window.Veact = Veact;
  Veact.vm = Veact.service.vm;



  'html'.split(' ').forEach((k) => {
    Veact[k] = (strings, ...restArgs) => handleEs6Template(strings, restArgs)
  });



  let framePath = (document.currentScript.src).split('?')[0].split('/').slice(0, -1).join('/')


  await Promise.all([
    _loadJS(framePath + '/deps/vue.min.js'),
    // _loadJS(framePath + '/deps/react.development.js'),
    // _loadJS(framePath + '/deps/babel.min.js'),
    _loadJS(framePath + '/deps/lodash.min.js'),
    // _loadJS(framePath + '/deps/react-dom.development.js'),
    // _loadJS(framePath + '/module-loader.js'),
  ])


  await Promise.all([
    _loadJS(framePath + '/deps/element/element.min.js')
  ])

  

  // <script src="vue-hacker/deps/element/element.min.js"></script>


  window.lodash = window._;

  


  let veactBuiltInCompDefines=Veact.html`<script>
  module.exports    =
  {
    comp: {
      props: ["vm", "comp"],
      data(){
        return {
          hasChildMounted:false
        }
      },
      beforeDestroy(){
        this.$children.forEach((node)=>{
          node.$destroy()
          Veact.service.destroyVMInstance(node)
        })
        
      },
      async mounted() {
        let obj=await window.Veact.service.vm(this.comp, true)
        
        // let obj=await window.Veact.service.vm(this.comp, this.VeactOptions._uid, true)
        obj.$parent=this.$parent;
        // this.$children.push(obj)
        obj.vm=this.vm;
        obj.comp=this.comp;
        obj.$mount(this.$refs.main);
        
        console.log('obj-------:',obj)
        
        this.hasChildMounted=true;
        this.$nextTick(()=>{
          this.$destroy()
        })
        
      }
    }
  }</script>
`;


  let defaultVmCache = {
    veact: (veactBuiltInCompDefines).replace('<script>','').replace('</script>',''),
  },
    defaultTplCache = {
      veact: {
        comp: Veact.html`<div :class="{'veact-async-loading':!hasChildMounted,'veact-async-loaded':hasChildMounted}">
  <div ref='main'></div>
</div>`,

        // async: "<div><div></div></div>"
      },
    };

  let lodash = window._;

  Veact.service.tplCache = lodash.cloneDeep(defaultTplCache);
  Veact.service.vmCache = lodash.cloneDeep(defaultVmCache);



  Veact.COMPONENT_BASE_URL ='./vue-hacker-components/'

  Veact.renderByScanDom = (target = window.document, $parent) => {
    let targetNodes = target.querySelectorAll('[veact-comp]');
    targetNodes.forEach(async (node) => {
      let baseUrl = node.getAttribute('veact-base-url')
      if (node.nodeName.toUpperCase() == 'VEACT-APP' && baseUrl) {
        Veact.COMPONENT_BASE_URL = baseUrl

        if (Veact.engineSettings.tplDirPath == '') {
          Veact.engineSettings.tplDirPath = baseUrl + '/'
        }
        if (Veact.engineSettings.vmDirPath == '') {
          Veact.engineSettings.vmDirPath = baseUrl + '/'
        }

      }
      let path = node.getAttribute('veact-comp');
      let tmp = await Veact.service.vm(path + '..jsx').$$mount(node, $parent)
      if ($parent) {
        if (!$parent.$children) {
          $parent.$children = []
        }
        $parent.$children.push(tmp.instance)

      }


    })
  }







  Veact.renderByScanDom()





})();