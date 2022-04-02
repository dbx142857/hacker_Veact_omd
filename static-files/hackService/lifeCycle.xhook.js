

HACKER._lifeCycle_Xhook = {
    _initInterceptor() {
        
        let self=this

        function isMatchedUrl(hookConfig, requestOrResponse) {


            
            if(!self.$options.captureHttpBeforeReady && HACKER.generateUniqueKeyByPathName()!=HACKER.generateUniqueKeyByPathName(self.$options.bindRoute)){
                return false;
            }

            // alert(requestOrResponse.url)

            // alert([].concat(hookConfig.url).find((u) => requestOrResponse.url.includes(u)))
            if (hookConfig.url instanceof RegExp && hookConfig.url.test(requestOrResponse.url)) {
                return true;
            }
            else if ((('string' == typeof (hookConfig.url) || Array.isArray(hookConfig.url)) && [].concat(hookConfig.url).find((u) => requestOrResponse.url.includes(u)))) {
                
                return true;
            }
            return false;
        }

        // let self = this
        let reqXhookArr = this.$options.reqInterceptor || [],
            resXhookArr = this.$options.resInterceptor || [];

        function handleParamsAndDataWhenGet(hookConfig, request, isFetch) {
            // alert(isMatchedUrl(hookConfig,request))
            if (isMatchedUrl(hookConfig, request)) {
                // HACKER.doNothing('request in xhook--:', request)

                let params = hookConfig.params || {};
                let urlObj = HACKER.urlToObj(request.url)
                // alert(request.url)
                for (let i in params) {
                    let fun = params[i];
                    if (typeof fun == 'function') {
                        fun = fun(self, urlObj,request,hookConfig, isFetch)
                    }
                    // HACKER.doNothing('fun and urlObj--:',fun,urlObj,i,isFetch)
                    HACKER.setDataByModel(urlObj, i, fun)
                }
                

                


                let resUrl = request.url.split('?')[0] + '?' + HACKER.formateObjToParamStr(urlObj)
                if (!isFetch && !HACKER.isFetchRequest(request)) {
                    request.url = resUrl
                    // request.url = resUrl+'&foooooooooo=barrrrrrrr'
                }



                return resUrl;
                // HACKER.doNothing('formateObjToParamStr result--:',HACKER.formateObjToParamStr(urlObj))
            } else {
                return request.url
            }
        }

        function checkIfUrlExist(hookConfig) {
            if (!'url' in hookConfig) {
                throw 'url in Interceptor is required';
                // return false;
            }


        }


        xhook.after((request, response) => {
            
            HACKER.doNothing('response in xhook--:', response, request)
            // if(request.url.match(/example\.txt$/))
            //   response.text = response.text.replace(/[aeiou]/g,'z');



            resXhookArr.forEach((hookConfig) => {
                // alert(44)
                checkIfUrlExist(hookConfig)
                HACKER.doNothing('hookConfig and request---:', hookConfig, request)
                if (isMatchedUrl(hookConfig, request)) {
                    // alert(44)

                    let isJSON = false, obj;
                    // HACKER.doNothing('response.text--:',response.text)
                    try {
                        obj = JSON.parse(response.text);
                        isJSON = true
                    } catch (e) {

                    }

                    if (isJSON && typeof (hookConfig.hook) == 'function') {
                        try {
                            // alert(1)
                            hookConfig.hook.call(this, obj,request,hookConfig);
                            HACKER.doNothing('response.text--:',response.text)
                            // response.text = 'abcdefg'
                            // alert('jj')
                            response.text = JSON.stringify(obj)
                        } catch (e) {

                        }

                    }

                }
            });


        })




        reqXhookArr.forEach((hookConfig) => {

            checkIfUrlExist(hookConfig)

            hookConfig.isFetch = 'isFetch' in hookConfig ? (hookConfig.isFetch) : false;


            if (hookConfig.isFetch == false || hookConfig.isFetch == 'BOTH') {
                
                let fun;

                xhook.before(fun=function (request, cb) {

                    // debugger
                    if(isMatchedUrl(hookConfig, request)){
                        try {





                            if ('GET' == request.method.toUpperCase()) {
                                if ('hook' in hookConfig){
                                // if ('hook' in hookConfig && (isMatchedUrl(hookConfig, request))){
                                    try {
                                        hookConfig.hook.call(self, request,hookConfig,cb)
                                    } catch (e) {
        
                                    }
                                }else{
                                    handleParamsAndDataWhenGet(hookConfig, request, false)
                                }
                                
                            } else if ('hook' in hookConfig) {
                                try {
                                    hookConfig.hook.call(self, request,hookConfig,cb)
                                } catch (e) {
    
                                }
    
                                // HACKER.doNothing('not a get request in hook--:', request)
                            } else if (request.body instanceof FormData && 'formData' in hookConfig) {
                                let formData = request.body, mergedFd = hookConfig.formData
    
                                let formDataKeys=formData.keys(),formDataKeysArr=[...formDataKeys];
                                // debugger
                                let newInsertedKeysInMergedFd=Object.keys(mergedFd).filter((i)=>!formDataKeysArr.includes(i.split('.')[0]))
    
    
                                newInsertedKeysInMergedFd.forEach((k)=>{
                                    formData.append(k,mergedFd[k])
                                    // delete mergedFd[k]
                                })
                                for (let i=0;i<formDataKeysArr.length;i++) {
                                    let key=formDataKeysArr[i]
                                // for (var key of formDataKeys) {
                                    // debugger
                                    // alert(key+'\n'+newInsertedKeysInMergedFd.find((s)=>s.split('.')[0].trim()==key.split('.')[0].trim()))
                                    if(newInsertedKeysInMergedFd.find((s)=>s.split('.')[0].trim()==key.split('.')[0].trim())){
                                        void 0;
                                    }else{
                                        // alert('shit')
                                        let v = formData.get(key)
    
                                        // HACKER.doNothing('v instance of file--:',key,v,v instanceof File,v instanceof Blob)
        
        
                                        if (!(v instanceof File) && !(v instanceof Blob)) {
                                            let isJSON = false;
                                            try {
                                                v = JSON.parse(v);
                                                isJSON = true;
                                            } catch (e) {
        
                                            }
        
        
                                            // if(!)
        
                                            // HACKER.doNothing('key and v----:',key,v)
                                            // alert(1)
        
                                            // if (typeof (v) == 'object' && v != null) {
                                            // alert(2)
                                            HACKER.doNothing('key and v---:', key, v)
        
                                            
        
        
                                            for (let i in mergedFd) {
                                               
                                                if (i == key) {
                                                    v = mergedFd[i].call(self, v, self)//
                                                    void 0;
                                                    // alert(i+'\n'+key)
                                                    // formData.set(key, v)
                                                } else if (isJSON && i.startsWith(key + '.')) {
                                                    // alert(i+'\n'+key)
                                                    // alert(i)
                                                    let initialI=i;
                                                    i=i.split(key+'.')[1]
                                                    let arr = i.split('.');
                                                    if (arr.length == 1) {
                                                        v[i] = mergedFd[initialI].call(self, v[i], self)//
        
                                                    }
                                                    if (arr.length > 1) {
                                                        let firstKey = arr[0], otherKey = arr.slice(1).join('.')
                                                        // if (firstKey in v) {
                                                            // alert(otherKey)
                                                            let val = HACKER.getDataByModel(v[firstKey], otherKey, -1);
                                                            if (val != -1) {
                                                                // alert(val)
                                                                HACKER.setDataByModel(v[firstKey], otherKey, mergedFd[initialI].call(self, val, self))
                                                            }
                                                        // }
                                                    }
                                                    // debugger;
                                                } 
                                                // else {
                                                //     formData.append(i, v)
                                                // }
        
        
        
        
                                            }
        
        
        
                                            // if('ntp_server' in v && v.ntp_server.trim()==''){
                                            //     v.ntp_server=location.hostname
                                            // }
                                            // if(v.clock_sync_config && v.clock_sync_config.ntp_server && v.clock_sync_config.ntp_server.trim()==''){
                                            //     v.clock_sync_config.ntp_server=location.hostname
                                            // }
        
                                            // debugger
                                            if (isJSON) {
                                                v = JSON.stringify(v)
                                            }
    
    
                                            formData.set(key, v)
        
        
                                            // }
                                            // debugger;
        
        
        
                                            HACKER.doNothing('value of ' + key + ':', v, typeof (v), v instanceof FormData)
                                            // HACKER.doNothing("key:" + key + " value:" + formData.get(key));
                                        }
                                    }
                                    
    
    
                                }
                            }
    
    
    
                            if (typeof (hookConfig.transformUrl) == 'function') {
                                request.url = hookConfig.transformUrl.call(self, request.url)
                            }
    
    
    
    
                        } catch (e) {
                            console.error('eeeeeeee--------:', e)
    
                        } finally {
    
                            // alert(hookConfig.continueAfterHook!=false)
                            // if(hookConfig.continueAfterHook!=false){
    
    
    
                                if ((hookConfig.dealy || 0) - 0 > 0) {
                                    // alert(hookConfig.url+'\n1')
    
                                    setTimeout(cb, hookConfig.dealy)
                                } else {
                                    if(hookConfig.clearAfterUse!==true){
                                        cb()
                                    }
                                    // alert(hookConfig.url+'\n2')
                                    
                                }
                            // }
                            if(hookConfig.clearAfterUse===true){
                                // alert(1)
                                hookConfig._aborted=true;
                                setTimeout(()=>{
                                    hookConfig._aborted=false;
                                        window.xhook.removeHookByEffectUrl(hookConfig.url)
                                    
                                    cb()
                                },300)
                            }
                            
                            
                            
    
    
                        }
                    }else{
                        // alert(1)
                        cb()
                    }

                    


                });
                fun.effectUrl=hookConfig.url
            }

            if (hookConfig.isFetch == true || hookConfig.isFetch == 'BOTH') {
                HACKER.xhookFetch.before.splice(0, 0, (url) => {
                    // debugger
                    // if ('GET' == request.method.toUpperCase()) {
                        return handleParamsAndDataWhenGet(hookConfig, { url: url }, true)
                    // }


                })
            }



        })
    }
}