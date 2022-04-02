Bue.registerBueModule('vue-router-adapter', {

  hasParamInRouteConfig(routeConfig,paramStr){

    return routeConfig.rowPathParams.includes(paramStr)

  },
  setAppRouter: (function () {
    function res(routeConfig, mode = 'hash') {

      let config = {
        mode,
        routes: routeConfig.map((path) => {
          // console.log('path--:', path)
          if (typeof (path) == 'string') {
            // return Bue.s.defineRouteComponent(path)
            let arr = path.split('/');
            return Bue.s.defineRouteComponent.apply(null,
              []
              .concat(arr.reverse()[0])
              .concat(arr.length > 1 ? (arr.reverse().slice(0, arr.length - 1).join('/') + '/') : [null])
              .concat(path
                
              )
            )
          } else {
            return path
          }
        })
      }
      // console.log('config---:', config)

      Bue.routeConfigs = config.routes
      Bue.registerModule(
        "BUE_ROUTER_INSTANCE",
        new VueRouter(config)
      );
    }
    Bue.setAppRouter = res;
    return res;
  })(),
  defineRouteComponent(fileName, path,rowPath) {
    // console.log('path in define route component--:', path)
    let useSingleFileVm = fileName.split('..comp::')[0].includes('..jsx')
    let shouldKeepAlive = fileName.includes('..keep-alive')

    let isEndsWithDotAny = fileName.split('..')[0].endsWith('-*');


    if (isEndsWithDotAny && fileName.includes('..keep-alive')) {
      let prefix = fileName.split('..')[0].split('-*')[0] + '-'
      let bueStoreHidden = Bue.bueStore.__HIDDEN
      if (!bueStoreHidden.shouldKeepAlivePrefixs.includes(prefix)) {
        bueStoreHidden.shouldKeepAlivePrefixs.push(prefix)
      }
    }

    // alert()
    let tempVar;
    let defineRouteComponentResult= {
      rowPathParams:(tempVar=rowPath.split('??').slice(1).filter(s=>s.trim()!=''),(tempVar.length>0?tempVar:null)),
      path: "/" + (fileName).split('..')[0],
      meta: {
        keepAlive: fileName.includes('..keep-alive') // 需要被缓存
      },
      name: (fileName).split('..')[0],

      component: async function (resolve) {




        async function loadChild(vmName) {
          vmName = vmName || Bue.getHiddenStore('WILL_PUSH_PATH') || Bue.s.getVueRoutePathByUrl()
          vmName = vmName.split('/')[1]
          if (useSingleFileVm) {
            vmName += '..jsx'
          }
          Bue.removeHiddenStore('WILL_PUSH_PATH')

          // console.log('vmName--:', vmName, path)


          
          let previousVmName=vmName;
          if(fileName.includes('..comp::')){
            vmName=fileName.split('..comp::')[1].split('..')[0].split('??')[0]
            if(fileName.split('..comp::')[1].split('??')[0].includes('..jsx')){
              vmName+='..jsx'
            }
          }

          let child = await Bue.vm((path || '') + vmName,true)

          // if(fileName.includes('..comp::')){
          //   child.$options.name=previousVmName.split('..')[0]
          //   child.bueOptions.name=previousVmName.split('..')[0]
          // }
          child.$options.bueOptions.rowPathParams=defineRouteComponentResult.rowPathParams;
          child.$options.bueOptions.bueRouteDefineRowPath=rowPath;
          child.$options.bueOptions.bueRouteDefinedPath=previousVmName.split('..')[0];
          child.$options.bueOptions.bueComponentFileName=vmName.split('..')[0];
          child.$options.bueOptions.isSingleFileComponent=vmName.includes('..jsx')
          // console.log('child--:', child)

          return child.$options;

        }
        // let childCompDefine = await loadChild()


        let compWrapperOptions = {
          
          template: Bue.html`
            <div>
              <!-- <button>currentComp is--:{{currentComp}}</button> -->
              <component :is="shouldKeepAlive?'keep-alive':'div'">
                <component v-if="!is404" :is="currentComp">aa</component>
              </component>
            
              <iframe style="width: 100%;height: 1510px;border: none;" v-if="is404" :src="notFoundSrc" />
            </div>
          `,
          data() {
            return {
              notFoundSrc: Bue.s.getRouter().mode == 'hash' ? ('/#/404?content_only=1') : ('/404?content_only=1'),
              is404: false,
              currentComp: 'default',
              shouldKeepAlive: shouldKeepAlive,
              // childComps: [],
              // currentComp: 'pages-goods-manage'
            }
          },
          components: {
            default: {
              template: '<span></span>'
            }
            // abc: childCompDefine
          },
          computed: {

          },
          watch: {
            '$route': async function (to, from) {
              let compName = to.path.substring(1),
                compPath = compName + (useSingleFileVm ? '..jsx' : ''),
                comp = await Bue.vm(compPath)
              // console.log('compName--:', compName)
              if (!this.$options.components[compName]) {
                
                this.$options.components[compName] = comp.$options
              }

              this.currentComp = compName
            }
          },
          methods: {
            handle404() {
              this.is404 = true;
            },
            async handleWillPushPath(path) {
              this.is404 = false
              path = path.split('/')[1]
              if (!(path in this.$options.components)) {
                this.$options.components[path] = await loadChild()
              }

              this.currentComp = path;
            },
            // test() {
            //   let elBtnKey = 'ElButton'
            //   // let elBtnKey = 'ElButton'
            //   this.currentComp = this.currentComp != elBtnKey ? elBtnKey : 'pages-organization-manage'
            // },
            addComponent(key) {

            }

          },
          beforeDestroy() {
            Bue.eventEmitter.off('B_WILL_PUSH_PATH', this.handleWillPushPath)
            Bue.eventEmitter.off('B_LOAD_FILE_404', this.handleWillPushPath)
          },

          async mounted() {
            this.handleWillPushPath(Bue.s.getVueRoutePathByUrl())
            Bue.eventEmitter.on('B_WILL_PUSH_PATH', this.handleWillPushPath)
            Bue.eventEmitter.on('B_LOAD_FILE_404', this.handle404)
            // setTimeout(() => {
            //   this.$options.components['btnn'] = Object.getPrototypeOf(this.$options.components)['ElButton']

            // }, 2000)
            // alert(Object.keys(Object.getPrototypeOf(this.$options.components)))
            // console.log('this--:', this, this.$options.components)
            // this.loadChild()

          }
        }
        resolve(compWrapperOptions)


        // resolve((await Bue.vm(vmName)).$options);


      }
    };
    return defineRouteComponentResult;
  },
  getRoute() {
    return new Vue({
      router: Bue.useModule("BUE_ROUTER_INSTANCE"),
      template: '<div></div>'
    }).$route
  },
  getRouter() {
    return new Vue({
      router: Bue.useModule("BUE_ROUTER_INSTANCE"),
      template: '<div></div>'
    }).$router
  },

})