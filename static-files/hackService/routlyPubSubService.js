; (function () {

    // let useHash = false
    let HACKER = window.HACKER,
        HK = HACKER;//////
    let useHash = HACKER.useHash


    var historyBackOrForwardFlag = 0;
    function toggleHistory(clearConsole=true) {
        if(clearConsole){
            console.clear();
        }
        
        historyBackOrForwardFlag = 1 - historyBackOrForwardFlag;
        if (historyBackOrForwardFlag == 1) {
            history.back()
        } else {
            history.forward()
        }
    }
    HACKER.toggleHistory=toggleHistory


    HACKER.updateRouteData=(obj,checkExist=false)=>{


        let updateValue=(i,obj)=>{
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
        }


        for (let i in obj) {
            if(checkExist){
                if((i.split('.')[0]) in HACKER.$bus.$store){
                    updateValue(i,obj)
                    // HACKER.setDataByModel(HACKER.$bus.$store,i,obj[i])
                }
            }else{
                updateValue(i,obj)
                // HACKER.setDataByModel(HACKER.$bus.$store,i,obj[i])
            }
            
            // HACKER.setDataByModel(this.state,i,obj[i])
        }
    }

    

    class EventEmitter {
        constructor() {
            this.events = {};

        }
        getTotalEventCount() {
            let res = 0
            for (let i in this.events) {
                res += this.events[i].length
            }
            return res;
        }
        on(event, callback) {


            if (Array.isArray(event)) {
                event.forEach((evt) => {
                    this.on(evt, callback)
                })
                return this;
            }

            // HACKER.doNothing('event---:',event)

            const callbacks = this.events[event] || [];
            if (Array.isArray(callbacks)) {
                callbacks.push(callback);
                this.events[event] = callbacks;
            }
            return this;
        }
        off(event, callback) {

            // HACKER.doNothing('event in off---:', event)

            if (Array.isArray(event)) {
                event.forEach((evt) => {
                    // HACKER.doNothing('evt---:', evt, this)
                    this.off(evt, callback)
                })
                // HACKER.doNothing('callback--:', callback)
                // callback()
                return this;
            }

            // HACKER.doNothing('callback of single--:', callback)
            // if (!callback) {
            //     this.events[event] = []
            //     return this;
            // }

            const callbacks = !callback ? [] : ((this.events[event] || []).filter(
                (cb) => cb !== callback
            ));
            // if (HACKER.BX_MODE) {
            //     console['log']('off event--:', event, callback)
            // }
            if (callbacks.length == 0) {
                delete this.events[event]
            } else {
                this.events[event] = callbacks;
            }

            return this;
        }
        once(event, callback) {
            if (Array.isArray(event)) {
                event.forEach((evt) => {
                    this.once(evt, callback)
                })
                return this;
            }
            const wrap = (...args) => {
                typeof callback === "function" && callback.apply(this, args);
                this.off(event, wrap);
            };
            // wrap.callbackString=callback.toString()
            this.on(event, wrap);
            return this;
        }
        emit(event, ...args) {
            if (HACKER.BX_MODE) {
                // console['lo' + 'g']('EMIT BUS---:', event, args)

            }
            const callbacks = this.events[event] || [];
            if (Array.isArray(callbacks)) {
                try {
                    // HACKER.doNothing('will emit--:', event)
                    callbacks.forEach((cb) => typeof cb === "function" && cb.apply(null, args.concat(event)));
                } catch (e) {
                    console['warn']('exec bus emit error--:', e)
                }

            }
            return this;
        }
    }

    let $bus = new EventEmitter()
    HACKER.$bus = $bus;



    HACKER.lastRouteFlag = null;

    function generateUniqueKeyByPathName(pathOrOldHash) {

        if (useHash) {
            if (pathOrOldHash && pathOrOldHash.startsWith('/')) {
                pathOrOldHash = '#' + pathOrOldHash
            }
            let res = '_' + ((pathOrOldHash || location.hash).split('#/')[1] || '').split('/').join('_').split('-').join('_').toUpperCase()

            return res
        }
        // 
        pathOrOldHash = pathOrOldHash || location.pathname

        if (HACKER.BUSINESS_CONFIG && 'routeUrlUniqueFlagGenerator' in HACKER.BUSINESS_CONFIG) {
            pathOrOldHash = HACKER.BUSINESS_CONFIG.routeUrlUniqueFlagGenerator(pathOrOldHash)
        }

        return pathOrOldHash.split('/').join('_').split('-').join('_').toUpperCase()
    }
    HACKER.generateUniqueKeyByPathName = generateUniqueKeyByPathName;
    HACKER.currentRouteFlag = HACKER.generateUniqueKeyByPathName();

    function emitEventWhenPushState() {
        HACKER.currentRouteFlag = HACKER.generateUniqueKeyByPathName();

        // HACKER.doNothing('emit event busName--:', busName)


        HACKER.doNothing('lastRouteFlag==currentRouteFlag',HACKER.currentRouteFlag==HACKER.lastRouteFlag)

        //先触发push state，再触发parse ok工作
        let busName = 'B_PUSH_STATE' + HACKER.currentRouteFlag
        HACKER.$bus.emit(busName)


        HACKER.$bus.emit("B_AFTER_ROUTE_CHANGE")



    }
    function offEventBeforePushState(oldHash = null) {
        // HACKER.lastPathName = (location.href)

        // HACKER.doNothing('off event busName--:', busName)



        HACKER.lastRouteFlag = HACKER.generateUniqueKeyByPathName(oldHash)



        let busName = 'B_POP_STATE' + HACKER.lastRouteFlag
        HACKER.$bus.emit(busName)
        HACKER.$bus.emit('B_BEFORE_ROUTE_CHANGE')

        // setTimeout(()=>{
        HACKER.xhookFetch.reset()
        xhook.clearHooks()
        // },5000)


        // HACKER.$bus.off(busName)
    }







    function handleRouteChange(state, oldHash,title,nextUrl) {
        offEventBeforePushState(oldHash)

        // alert('yy')

        // HACKER.toggleUniqueClassForRouteWrapper()

        // HACKER.doNothing('href before--:', location.href)
        if (!useHash && typeof history.onpushstate == "function") {
            history.onpushstate({ state: state });
        }

        let busName = 'B_BEFORE_ROUTE_ENETER' + HACKER.generateUniqueKeyByPathName(nextUrl)
        // alert(busName)
        HACKER.$bus.emit(busName)
        
        // alert(state.toString())
        // debugger

        // HACKER.webAppRootRouteWrapper.style.display='none'
        setTimeout(() => {
            emitEventWhenPushState()
            HACKER.toggleUniqueClassForRouteWrapper()
        })
        // }, 300)
    }



    if (useHash) {
        let hash = location.hash;
        setInterval(() => {
            let newHash = location.hash;
            if (newHash != hash) {
                HACKER.doNothing('hash changed')

                handleRouteChange(null, hash)
                hash = newHash
            }

        }, 50)
        // window.addEventListener('load', () => {

            // window.addEventListener('hashchange',function(e) { 
                
                
            //     handleRouteChange(null, hash)
            //     hash = newHash
            //     alert('yes')
            
            // },false);


            // window.onhashchange = function () {

            //     handleRouteChange(null, hash)
            //     hash = newHash

            //     alert('hash change')
            //     // handleRouteChange()
            // }
        // })



    } else {
        ; (function (history) {
            window.addEventListener('popstate', (state) => {
                // HACKER.doNothing('p1 and p2--:',p1,p2)
                handleRouteChange(state, HACKER.currentRouteFlag)

            });
            var pushState = history.pushState;
            // var popState=history.popState;
            history.pushState = function (state,title,nextUrl) {
                HACKER.doNothing('arguments in push state--:',arguments)
                handleRouteChange(state,null,title,nextUrl)
                // HACKER.doNothing('href after--:', location.href)

                // ... whatever else you want to do
                // maybe call onhashchange e.handler
                pushState.apply(history, arguments);
            };

        })(window.history);
    }






    //本bus on仅仅会在当前路由发生时期进行注册，切换后会自动注销注册的函数。注意：不适用于keepalive的路由组件
    let busOn = (function () {
        // let tempBusCollection = [];
        // if (HACKER.BX_MODE) {
        //     HACKER.tempBusCollection = tempBusCollection
        // }
        // function registerTempBusCollection(key) {
        //     if (Array.isArray(key)) {
        //         if (!key.length) {
        //             return
        //         }
        //         key.forEach((k) => {
        //             registerTempBusCollection(k)
        //         })
        //         return key;
        //     }
        //     if (!tempBusCollection.includes(key)) {
        //         tempBusCollection.push(key)
        //     }
        //     return key;
        // }



        return (key, fun,offWhenHackerRestart=false) => {
            // debugger;
            // return (key, fun, addToTemp = true) => {

            // HK.$bus.on(offWhenHackerRestart?['B_RE_PARSE','B_BEFORE_ROUTE_CHANGE']:'B_BEFORE_ROUTE_CHANGE', () => {
            HK.$bus.once(offWhenHackerRestart?['B_RE_PARSE','B_BEFORE_ROUTE_CHANGE']:'B_BEFORE_ROUTE_CHANGE', () => {
            // HK.$bus.busOn(offWhenHackerRestart?['B_RE_PARSE','B_BEFORE_ROUTE_CHANGE']:'B_BEFORE_ROUTE_CHANGE', () => {


                

                HK.$bus.off(key, fun)
            // HK.$bus.off(tempBusCollection, () => {
                //     alert(tempBusCollection.length)
                //     tempBusCollection = [];

                // })
            })

            HK.$bus.on(key, fun)
            // HK.$bus.on(addToTemp ? registerTempBusCollection(key) : key, fun)

        }
    })();

    HACKER.busOn = HACKER.$bus.busOn = busOn;


    $bus.$store = {
        
    }
    
    
    HACKER.$bus.once('B_HACKER_CORE_LOADED', () => {
        $bus.$store = HACKER.createObservableObject({
            ...(HACKER.BUSINESS_CONFIG.$store||{})
        }, 'ROUTE_DATA', ['$refs'])
        
        // debugger
        
        HACKER.$store=$bus.$store;
        // HACKER.$store=new Proxy($bus.$store,{
        //     get(target,key){
        //         return target[key]
        //     }
        // })
        
        // HACKER.$store=bus.$store
    })



    // setTimeout(emitEventWhenPushState, 5000)
    // emitEventWhenPushState()

    HACKER.$bus.once('B_ROUTE_WRAPPER_LOADED', () => {
        setTimeout(() => {
            emitEventWhenPushState()
        }, 300)
    })


    HACKER.setRouteData = (obj) => {
        for (let i in obj) {
            HK.$bus.$store[i] = obj[i]
        }
    }





})();