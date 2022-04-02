
HACKER.viewmodel = class extends HACKER._lifeCycle_componentLoader{
    _initInterceptor(){
        return HACKER._lifeCycle_Xhook._initInterceptor.apply(this,arguments)
    }
    useWaitResult(initialValue) {


        return {
            value: initialValue,
            __HACKER_STATE_UPDATE_TYPE: 'USE_POLL_RESULT'
        }
    }
    setState(obj) {
        // alert('will set state')
        for (let i in obj) {

            // alert(i+'\n'+obj[i])

            if(i.split('.').length==1){
                HACKER.observableObjectStore.ROUTE_DATA[i]=this.state.__LIST[i]=obj[i]
                // HACKER.setDataByModel(HACKER.$bus.$store,i,obj[i])
                // HACKER.setDataByModel(this.state,i,obj[i])
            }else{
                // alert('1')
                let k=HACKER.observableObjectStore['ROUTE_DATA_'+i.split('.')[0]],
                k1=i.split('.').slice(1).join('.');
                HACKER.doNothing('k and k1--:',k,k1)
                // debugger;
                // alert('k:'+k+'\n-----k1:'+k1)
                HACKER.setDataByModel(k,k1,obj[i])
            }


            

            
            let busName = ('ROUTE_DATA_' + (i.split('.').join('_')) + '_UPDATE').toUpperCase();
            let busNameTotal = ('ROUTE_DATA_' + (i.split('.')[0]) + '_UPDATE').toUpperCase();
                        
            
            HACKER.$bus.emit(busName, obj[i])
            HACKER.$bus.emit(busNameTotal, obj[i])

            
        }
    }
    $nextTick(fun) {
        setTimeout(fun)
    }
    _updateSmartState() {
        if (!this.smartStateDef) {
            this.smartStateDef = { ...this.$options.smartState }
            this.smartState = this.$options.smartState

        }
        this._funObj2NormalObj(this.smartState, this.smartStateDef)
    }
    _clearHooks(){
        // if(!$options.captureHttpBeforeReady){
            xhook.clearHooks()
        // }
        
    }
    _funObj2NormalObj(obj, objFun) {
        HACKER.doNothing('objFun in _funObj2NormalObj--:', objFun)
        for (let i in obj) {
            obj[i] = objFun[i].call(this)
        }
    }
    
    _regHook(hookName, fn, flag) {
        this._registeredHookActions = this._registeredHookActions || {}
        this._registeredHookActions[hookName] = this._registeredHookActions[hookName] || []
        this._registeredHookActions[hookName].push(fn)
        fn[flag] = true;
        // if (hookName == 'beforeDestroy' || hookName == 'firstParsed') {
        //     HACKER.$bus.on('B_POP_STATE' + uniqueBusName, () => {
        //         this.$nextTick(() => {
        //             delete this._registeredHookActions[hookName]
        //         })
        //     })
        // }else if (hookName == 'againParsed') {
        //     HACKER.$bus.on('B_RE_PARSE', () => {
        //         this.$nextTick(() => {
        //             delete this._registeredHookActions[hookName]
        //         })
        //     })
        // }
        return this
    }
    _offHook(hookName, flag) {
        if (!flag) {
            this._registeredHookActions[hookName].length = 0
        } else if (this._registeredHookActions && Array.isArray(this._registeredHookActions[hookName])) {
            this._registeredHookActions[hookName] = this._registeredHookActions[hookName].filter((fn) => (!(flag in fn)))
        }
        return this
    }
    _emitHook(hookName, flag) {
        if (!this._registeredHookActions || !this._registeredHookActions[hookName]) {
            return this;
        }
        this._registeredHookActions[hookName].filter((fn) => {
            return !flag ? true : (flag in fn)
        }).forEach((fun) => {
            fun.call(this)
        })

        return this;
    }
    
    async restartHacker(parseDomImmediately=false) {

        if(parseDomImmediately){
            HACKER.parseDom();
            this.restartHacker()
            return false;
        }

        await HACKER.dealyExec();
        this.pollResult=await HACKER.poll(this.$options.waitUntil);

        this._pollResultForState.forEach((key) => {
            HACKER.setRouteData({
                [key]: this.pollResult
            })
        })
        // await HACKER.poll(() => HACKER.$.$('.mat-datepicker-toggle-default-icon'));

        HACKER.xhookFetch.reset()
        this._clearHooks()
        HACKER.$bus.emit('B_RE_PARSE')
        HACKER.parseDom(this.domContext)


        this._updateSmartState.call(this)
        this.$options.againParsed.call(this)
        this._initInterceptor.call(this)
        // this.$options.xhook.call(this)

        this.$nextTick(()=>{
            this._renderReplacer.call(this)
        })
        

    }

    _generateUniqueKeyByPathName(){
        return HACKER.generateUniqueKeyByPathName(this.$options.bindRoute)

    }
    constructor($options) {
        

        super()
        let uniqueBusName = this._generateUniqueKeyByPathName.call({$options:$options})
        if(('B_POP_STATE' + uniqueBusName) in HACKER.$bus.events){
            console.warn('你已经增加了一条针对'+uniqueBusName+'的规则,无法再继续增加了哦')
            return void 0;
        }
        this.pollResult=null;

        let directiveSuper = new HACKER.directiveSuper()
        
        if (!$options.bindRoute) {
            alert('bineRoute config is required')
            return false;
        }
        
        this._uniqueBusName = uniqueBusName
        this._elements = []
        this.h = directiveSuper.h.bind(this)
        this.popup = directiveSuper.popup.bind(this)
        this.$doms = {

        }
        this.HACKER=HACKER;

        HACKER.$bus.on('B_POP_STATE' + uniqueBusName, () => {

            this._emitHook.call(this, 'beforeDestroy')
            this.$options['beforeDestroy'].call(this)
            setTimeout(() => {
                delete this._registeredHookActions
            })


            for (let i in this.$doms) {
                let isKeep = false, isJqueryEle = this.$doms[i] instanceof window.jQuery
                if (isJqueryEle) {
                    isKeep = this.$doms[i].get(0).dataset._keep
                } else {
                    isKeep = this.$doms[i].dataset._keep
                }


                if (isKeep != '1') {
                    if (this.$doms[i] instanceof window.jQuery) {
                        this.$doms[i].remove()
                    } else {
                        this.$doms[i].parentNode.removeChild(this.$doms[i])
                    }
                }

                // delete this.$doms[i]


            }
            this.$doms = {

            }
        })




        let defaultOptions = {
            reqInterceptor: [],//请求拦截器
            resInterceptor: [],//响应拦截器
            replacer: [],//额外视图渲染控制
            againParsed() { },//第二次以及更多次的触发到了视图解析
            xhook() { },//手动拦截控制
            beforeDestroy() { },//绑定的路由即将跳转前的事件
            styles: '',//样式控制
            bindRoute: null,//声明在某个路由控制的页面内运行hacker脚本
            domContext: () => document.body,//缩小dom查找的范围以提升响应速度
            state() { return {} },//响应式状态
            captureHttpBeforeReady:false,//是否在页面载入但hacker解析尚未运行之前进行请求拦截
            methods: {},//自定义的方法
            mouseClick:{},//根据鼠标点击的target以及其父节点和爷爷节点及元素内容生成的唯一的特殊标识响应点击
            reloadTrigger: null,//根据和mouseclick中相同的规则声明会出发hacker进行重新parse的元素
            waitUntil: () => true,//在bind route对应的页面加载后若不想立即开始解析可配置改poll声明
            firstParsed: () => { },//第一次parse完成后触发点回调函数
            onReady: () => { },//constructor执行完毕之后的回掉函数
            mappingEvents: () => [],//在新元素和旧有元素之间设定事件映射
            h: []//手动控制额外视图的加载与行为
        }

        this.$options = {
            ...defaultOptions,
            ...$options
        }
        
        if('abortRequest' in $options){
            this.$options.captureHttpBeforeReady=true;
            this.$options.reqInterceptor=this.$options.reqInterceptor.concat({
                url:$options.abortRequest,
                clearAfterUse:true,
                hook(request,hookConfig){
                    if(!hookConfig._aborted){
                        request.xhr.abort();
                    }
                }
            })
        }

        $options = this.$options
        for (let i in this.$options.methods) {
            this[i] = this.$options.methods[i].bind(this)
        }


        if (typeof (this.$options.bindRoute) == 'string') {
            if (HACKER.useHash) {
                this.$options.bindRoute = '#' + this.$options.bindRoute
            }

        } else {
            throw 'bindRoute只能是string类型'
        }










        let busOn = HACKER.busOn;
        let pollResultForState = []
        this._pollResultForState=pollResultForState;

        for (let i in HACKER.props.v) {
            this[i] = HACKER.props.v[i]
        }
        for (let i in HACKER.functions.v) {
            this[i] = HACKER.functions.v[i].bind(HACKER)
        }

        this.$ = HACKER.$.$;
        this.$$ = HACKER.$.$$;

        // HACKER.$bus.once('B_POP_STATE' + uniqueBusName, () => {
        //     this.beforeDestroy()
        // })
        if($options.captureHttpBeforeReady){
            this._initInterceptor.call(this)
        }
        

        HACKER.doNothing('compare with EMIT BUS---','B_BEFORE_ROUTE_ENETER' + uniqueBusName)
        HACKER.$bus.on('B_BEFORE_ROUTE_ENETER' + uniqueBusName, () => {
            // alert('a')

            
            this._clearHooks();
                // if(!$options.captureHttpBeforeReady){
                    this._initInterceptor.call(this)
        })

        HACKER.$bus.on('B_PUSH_STATE' + uniqueBusName, () => {

            for(let i in $options.mouseClick){
                busOn(i,$options.mouseClick[i].bind(this))
            }


            busOn([].concat($options.reloadTrigger).filter((o) => !!o).map((o) => 'B_TARGET_CLICK_' + o.split('-').join('_').toUpperCase()),
            this.restartHacker.bind(this)
                );



        //         let busName = 'B_BEFORE_ROUTE_ENETER' + HACKER.currentRouteFlag
        // HACKER.$bus.emit(busName)


        if (HACKER.BX_MODE) {
            window.HACKER['HACKER' + this._generateUniqueKeyByPathName.call(this)] = this
        }

            busOn('B_HACKER_READY' + uniqueBusName, async () => {

                this.busOn = HACKER.busOn;



                if (typeof (this.$options.firstParsed) == 'function') {
                    
                    this._updateSmartState.call(this)

                    let pollResult = await HACKER.poll($options.waitUntil.bind(this));
                    // alert(pollResult)
                    this.pollResult=pollResult
                    // debugger
                    HACKER.doNothing('shit this---:', this)

                    pollResultForState.forEach((key) => {
                        HACKER.setRouteData({
                            [key]: pollResult
                        })
                    })

                    this.domContext=$options.domContext(pollResult)
                    HACKER.$.update(this.domContext)

                    this.$refs = HACKER.$bus.$store.$refs;

                    // $options.render.call(this, HACKER.h)




                    HACKER.mappingEvents($options.mappingEvents.call(this),
                        HACKER.$.context,
                        0
                    )
                    

                    


                    this._initStyle.call(this)

                    this.$nextTick(() => {
                        this._renderReplacer.call(this)
                    })

                    this.$options.firstParsed.call(this, pollResult)
                }
                this._clearHooks();
                // if(!$options.captureHttpBeforeReady){
                    this._initInterceptor.call(this)
                // }
                
                // this.$options.xhook.call(this)
            }, false)


            let state = $options.state.call(this);
            this.state = HACKER.$bus.$store
            // this.$nextTick(()=>{
            //     this.setState(HACKER.$bus.$store)
            // })
            // alert(Object.keys(this))
            

            for (let i in state) {
                if (typeof(state[i])=='object' && state[i]!=null && '__HACKER_STATE_UPDATE_TYPE' in state[i]) {


                    let updateType = state[i]['__HACKER_STATE_UPDATE_TYPE']
                    if (updateType == 'USE_POLL_RESULT') {
                        HACKER.uniqullyPush2Arr(pollResultForState,i)
                        // pollResultForState.push(i)
                    }


                    this
                    ._offHook('againParsed', 'UPDATE_POLL_RESULT_'+i)
                    ._regHook('againParsed', ()=>{
                        state[i] = this.pollResult;
                    }, 'UPDATE_POLL_RESULT_'+i)

                    state[i] = state[i].value;

                }
            }
            
            //this.state原始值为HACKER.$bus.$store,已经存在,所以此处只需要吧当前的state放入route state即可
            HACKER.setRouteData(state)
            
        });





        ($options.onReady||(()=>{}))();






    }

}