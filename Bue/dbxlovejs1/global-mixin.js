let hasSetBueStore = false;
let bueStore = {},
  hiddenBueStore = {
    registeredKeepAlivePages: [],
    shouldKeepAlivePrefixs: [],
    notFoundsPages: []
  };

Bue.setHiddenStore = (key, value) => {
  hiddenBueStore[key] = value
};
Bue.getHiddenStore = (key) => {
  return hiddenBueStore[key];
}
Bue.removeHiddenStore = (key) => {
  // alert('will remvoe')
  delete hiddenBueStore[key];
}

Bue.bueStore = new Proxy(bueStore, {
  get(target, key) {
    if (key == '__LIST') {
      return bueStore
    } else if (key == "__HIDDEN") {
      return hiddenBueStore
    } else {
      return bueStore[key]
    }
  },
  set(target, key, value, receiver) {
    if (key.startsWith('__HIDDEN')) {
      hiddenBueStore[key] = value;
    }
    else {
      bueStore[key] = value;
    }
    // Reflect.set(target, key, value, receiver);
    return true;
  }
});

function setBueOptionForReact(vm, obj) {
  vm.bueOptions = {
    _uid: Bue.useBueModuleSync("util").guid(),
    name: Object.getPrototypeOf(vm).constructor.name,
    ...obj
  };
  //
}
function addVM2VMInstance(vm) {
  if (vm.bueOptions.name in window.Bue.s.vmInstances) {
    window.Bue.s.vmInstances[vm.bueOptions.name] = [
      window.Bue.s.vmInstances[vm.bueOptions.name]
    ];
    window.Bue.s.vmInstances[vm.bueOptions.name].push(vm);
  } else {
    window.Bue.s.vmInstances[vm.bueOptions.name] = vm;
  }
}
function createReactComponentFromVMDefine(res) {
  window.Bue.s.tempVar = res;

  return Bue.s.babelEval(`<window.Bue.s.tempVar />`);
}
function mountReactInstance2Vue(res, el, vueVM) {
  let $el = vueVM ? vueVM.$refs[el] || vueVM.$el : el;
  res = "$el" in (res || {}) ? res.vm : res;

  if (!res) {
    Bue.throwExcepAlert("非法的react挂载对象");
    return false;
  }

  window.Bue.doNothing("res haha --:", res);
  res = window.Bue.reacMixinComposer(
    res,
    class {
      componentWillUnmount() {
        Bue.s.destroyVMInstance(this);
      }
      componentDidMount() {
        if (vueVM) {
          vueVM.$children.push(this);
          this.$parent = vueVM;
          // window.Bue.doNothing('------',"did mount");
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
        setBueOptionForReact(this, {
          $el: $el
        });
        addVM2VMInstance(this);
      }
    }
  );

  ReactDOM.render(createReactComponentFromVMDefine(res), $el);
}
function findVMInstanceById(id) {
  let result = null;
  for (let i in Bue.s.vmInstances) {
    let obj = []
      .concat(Bue.s.vmInstances[i])
      .find(item => item.bueOptions._uid == id);
    if (obj) {
      result = obj;
    }
  }
  return result;
}
Bue.registerBueModule("global-mixin", {

  data() {
    if (!hasSetBueStore) {
      let store = Bue.userConfig.setStore(Bue.userConfig);
      for (let i in store) {
        bueStore[i] = store[i];
      }

      hasSetBueStore = true;
    }
    return {
      bueStore: bueStore,
      resolves: {

      },
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
    useResolver(key, defaultValue) {
      return Bue.u.getDataByModel(this.resolves, key, defaultValue)
    },
    async callWithLoading(method, loadingKey, args = []) {
      // Bue.doNothing("loadingKey--:", loadingKey);
      this[loadingKey] = true;
      try {
        await method.apply(this, args);
      } catch (e) {
      } finally {
        this[loadingKey] = false;
      }
    },
    getSelfTpl(tplId) {
      let res = Bue.s.tplCache[this.bueOptions.name][tplId];
      if (!res) {
        Bue.throwExcepAlert("模板" + tplId + "不存在");
      }
      return res;
    },
    callBabel(funName, ...restArgs) {
      let babelMethods = this.babelMethods;
      if (babelMethods && babelMethods[funName]) {
        return babelMethods[funName].apply(this, [
          this.bueOptions.name,
          ...restArgs
        ]);
      } else {
        console.warn(
          this.bueOptions.name + "的babelMethods的" + funName + "不存在"
        );
        return null;
      }
    }
  },
  created() {
    this.babelMethods = Bue.useBueModuleSync("util").getDataByModel(
      window.Bue.vm,
      this.bueOptions.name
    ).babelMethods;

    let result = this.bueOptions.vmDefine;

    if ("styles" in result) {
      if (typeof result.styles == "function") {
        this.cv = this.cv || {};
        result.styles = result.styles.call(result, this);
      }
      let newStyleObj = Bue.s.transformStyles(
        result.styles,
        this.bueOptions.name
      );

      window.Bue.doNothing("newStyleObj--:", newStyleObj);

      let cssStr = "";
      for (var i in newStyleObj) {
        cssStr +=
          "." + (i.endsWith("&") ? i.substring(0, i.length - 1) : i) + "{";

        for (var j in newStyleObj[i]) {
          cssStr += j + ":" + newStyleObj[i][j] + ";";
        }

        cssStr += "}";
      }
      window.Bue.doNothing("cssStr---:", cssStr);

      Bue.useBueModuleSync("util").appendCssStr(cssStr);
    }
  },
  beforeDestroy() {
    // Bue.doNothing("before destroy---:", this.bueOptions.name);
    Bue.s.destroyVMInstance(this);
    // let shouldDestroyedVMName=Bue.useBueModuleSync('service').getShouldDestroyedCompNameByViewModel(this)
    //删除自身的vm实例
  },
  async mounted() {

    // await Bue.u.dealyExec(undefined, 200)


    // await this.bueOptions.loadVmPromises;
    // setTimeout(() => {
    //   let _children_uids = this.bueOptions._children_uids || [];
    //   _children_uids.forEach(async uid => {
    //     alert(findVMInstanceById(uid).bueOptions._uid);
    //   });
    // });

    if (this.bueOptions.name == Bue.userConfig.entry) {
      Bue.$rootVM = this;
    }

    addVM2VMInstance(this);

    if ("bootstrap" in (this.babelMethods || {})) {
      let res;
      if (
        Object.prototype.toString
          .call(this.babelMethods.bootstrap)
          .toLocaleLowerCase()
          .includes("async")
      ) {
        res = await this.callBabel("bootstrap");
      } else {
        res = this.callBabel("bootstrap");
      }
      // let
      window.abcde = res;
      let vueVM = this;
      // window.Bue.doNothing("res---:", res.prototype);
      if (res != null) {
        // let $el="mountRef" in res?this.$refs[res.mountRef]:this.$el

        mountReactInstance2Vue(res, res.$el, vueVM);
      }
      // if (res && "$$typeof" in res) {
      // window.Bue.s.tempVar = res;
      // res = Bue.s.babelEval(`<window.Bue.s.tempVar />`);

      // // this.rInstance = res;
      // ReactDOM.render(res, this.$el);
      // }

      // window.Bue.doNothing("resssssssss--:", res, res.constructor);
    }
    window.Bue.doNothing("refs in mounted--:", this.$refs);
    // let customRefKeys = Object.keys(this.$refs)
    //   .filter(item => item.startsWith("bx-custom:"))
    //   .map(item => item.split("bx-custom:").reverse()[0]);
    // customRefKeys.forEach(key => {
    //   //如果初始化时候已经加载了，则绕过重新加载
    //   if (!(this.$refs["bx-custom:" + key] instanceof window.cdnVue)) {
    //     // window.Bue.rmAlert("1");
    //     window.Bue.s.vm(key).$$mount(this.$refs["bx-custom:" + key]);
    //   }
    // });
    // window.Bue.doNothing(
    //   "mounted in mixin ref--:",
    //   customRefKeys,
    //   this.$refs,
    //   this.bueOptions
    // );

    let targetElClassName = this.bueOptions.name.split(".").join("--");
    // window.Bue.rmAlert(targetElClassName);
    // window.Bue.doNothing(
    //   "el and name--:",
    //   this.$el,
    //   this.name,
    //   this,
    //   targetElClassName
    // );
    window.Bue.doNothing("this.$el--:", this.$el, this);
    this.$el.classList.add(targetElClassName);
    // this.$el.classList.add(this.bueOptions.name);
    // window.Bue.rmAlert(1);
    // window.Bue.doNothing("this.bueOptions.name--:", this.bueOptions.name);
    if (!this.bueOptions.loadedComponents.includes(this.bueOptions.name)) {
      this.bueOptions.loadedComponents.push(this.bueOptions.name);
    }




    let resolve = this.$options.resolves || {},
      promises = [],
      resolveKeys = [];
    for (let i in resolve) {
      let v = resolve[i];
      resolveKeys.push(i)
      if (v instanceof Promise) {
        promises.push(v)
      } else {

        if (typeof (v) == 'function') {
          promises.push(new Promise((resolve) => {
            resolve(v.call(this))
          }))
        } else {
          promises.push(new Promise((resolve) => {
            resolve(v)
          }))
        }


      }
    }
    this.ALL_RESOLVE = false;
    let resolveValues = await Promise.all(promises)

    resolveValues.forEach((v, k) => {
      this.$set(this.resolves, resolveKeys[k], v)
      // this.resolves[resolveKeys[k]] = v;
    })
    this.$nextTick(() => {
      // alert(Object.keys(this.resolves) + '---' + this.bueOptions.name)
      this.ALL_RESOLVE = true;
    })


  }
});
