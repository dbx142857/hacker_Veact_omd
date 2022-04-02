

function execFunctionOrOther(value, ...restArgs) {

    if (typeof (value) != 'function') {
        return value
    } else {
        return value.apply(this, restArgs)
    }

}
HACKER.componentInstance={

}
HACKER.getComponentInstanceByIndex=(index=0)=>{
    return HACKER.componentInstance[Object.keys(HACKER.componentInstance)[index]]
}
HACKER._lifeCycle_componentLoader = class {
    async _calculateTemplateByReplacerConfig(replacerConfig){
        if(!replacerConfig.component){
            return {
                template:replacerConfig.render.call(this),
                controller:replacerConfig.controller||{},
            }
        }else{

            let str=await HACKER.httpGet(replacerConfig.component),
            res=new Function('html','createGlobalStyle',str).call(this,HACKER.html,HACKER.createGlobalStyle);
            // HACKER.doNothing('str-------:',str,res)
            return {
                template:res.template||'<div>please add template string</div>',
                controller:res
            }
            
        }
    }
    _initStyle(){
        let styles = (function () {


            let styleStr=(execFunctionOrOther.call(this, this.$options.styles||''))
            if(!styleStr){
                return ''
            }
            let arr = styleStr.split('}').slice(0, -1).map((s) => s + '}')//

            return arr;
        }).call(this);
        if (styles && styles.join('').trim() != '') {
            styles.forEach((sty) => {
                // alert(sty)
                sty = '.' + this._uid+' '+sty
                // sty = '.' + 'HACKER_ROUTE_WRAPPER' + this._generateUniqueKeyByPathName.call(this)+sty
                // sty = sty.replaceAll('$$', '.' + 'HACKER_ROUTE_WRAPPER' + this._generateUniqueKeyByPathName.call(this))
                // debugger
                HACKER.insertRule(sty)
            })

        }
    }
    
    _initBueComp(thisClass){
        this._generateUniqueKeyByPathName=HACKER.generateUniqueKeyByPathName
        this.$options={}
        for(let i in this){
            this.$options[i]=this[i]
        }
        this._uid='bue_comp_'+HACKER.guid()
        this._gc=[]
        // if(!window.Bue){
        //     window.Bue=function(){}
        //     HACKER.componentInstance={}
        // }
        let name=this.name||this._uid

        setTimeout(()=>{
            this.$el.classList.add(this._uid)
        })

        if(HACKER.BX_MODE){
            
            // alert(name)
            if(!HACKER.componentInstance[name]){
                HACKER.componentInstance[name]=this
            }else{
                HACKER.componentInstance[name]=[HACKER.componentInstance[name]].concat(this)
            }

        }

        let data=(this.data||function(){return {}}).call(this),
        compositionKey='BUE_COMP_'+(this.name||'')+"_"+this._uid;
        this._gc.push(function(){
            for(let i in HACKER.observableObjectStore){
                if(i.startsWith(compositionKey)){
                    delete HACKER.observableObjectStore[i]
                }
            }
        })
        this.$window=window;
        


        if('$refs' in data){

            alert('不能添加$refs命名的属性在data里')
            delete data.$refs
        }

        let simpleData={},objectData={}
        for(let i in data){
            if(typeof(data[i])=='object' && data[i]!=null){
                objectData[i]=data[i]
            }else{
                simpleData[i]=data[i]
            }
        }

        
        this._data=HACKER.createObservableObject(simpleData, compositionKey, [])
        
        for(let i in objectData){
            this._data[i]=objectData[i]
        }
        this._data.$refs = HACKER.createObservableObject({}, compositionKey+'_REF', [], (v) => {
            if (!(v instanceof HTMLElement)) {
                throw '只能为ref设置HTMLElement类型的值'
            }
        })
        this._data.$store=HACKER.$store
        this.$refs=this._data.$refs
        // this.$store=this._data.$store
        this.$vm=this._data.$vm=this
        

        if(typeof(this.setup)=='function'){
            this.setup.call(this)
        }

        thisClass._initStyle.call(this)


    }
    _renderReplacer() {
        let renderWrapper = () => {
            let res = []
            this.$options.replacer.forEach(async (replacerConfig) => {
                // let controller=replacerConfig.controller||{};
                let isAsyncComp='component' in replacerConfig
                
                

                let {template,controller}=await this._calculateTemplateByReplacerConfig.call(this,replacerConfig);
                if(isAsyncComp){
                    this._initBueComp.call(controller,this)
                }
                let $obj = HACKER.parseDom(HACKER.getDomWrapperByContents(template),
                controller,
                !isAsyncComp?this:controller,
                !isAsyncComp?HACKER.$bus.$store:controller._data);
                // let $obj = HACKER.parseDom(HACKER.getDomWrapperByContents(replacerConfig.render.call(this)),controller,this);
                
                // if(controller && controller.refListeners){
                //     for (let i in controller.refListeners) {
                //         for(let j in controller.refListeners[i]){
                //             let obj=controller.refListeners[i][j];
                //             // HACKER.doNothing('obj--------:',obj)
                            
                //                 // HACKER.doNothing("k and obj[k--:",k,obj[k])
                //                 this.$refs[i].addEventListener(j, () => {
    
                //                     obj.call(controller)
                //                 })
                            
                //         }

                //     }
                // }
                if(isAsyncComp){
                    controller.$el=$obj;
                    setTimeout(()=>{
                        $obj.addEventListener("DOMNodeRemoved", ()=>{
                            if(HACKER.BX_MODE){
                                setTimeout(()=>{
                                    
    
                                    if(typeof(controller.beforeDestroy)=='function'){
                                        controller.beforeDestroy.call(this)
                                    }
                                    controller._gc.forEach((fn)=>{
                                        try{
                                            fn()
                                        }catch(e){}
                                    })
                                    controller._gc=[]
    
                                    let name=controller.name||controller._uid
                                    if(!Array.isArray(HACKER.componentInstance[name])){
                                        delete HACKER.componentInstance[name]
                                    }else{
                                        let uidIndexInInstanceArr=HACKER.componentInstance[name].findIndex((vm)=>vm._uid==controller._uid)
                                        HACKER.componentInstance[name].splice(uidIndexInInstanceArr,1)
                                    }
    
                                    if(typeof(controller.destroyed)=='function'){
                                        controller.destroyed.call(this)
                                    }
                                    
                                })
                            }
                        }, false);
                    })
                }
                
                

                res.push($obj)
                if (replacerConfig.newAlias) {
                    this.$doms[replacerConfig.newAlias] = $obj
                }
                // var target = HACKER.$.$('.m-subheader__breadcrumbs')//
                var target = typeof(replacerConfig.target)=='string'?(document.querySelector(replacerConfig.target)):(replacerConfig.target.call(this))

                if(!target){
                    return false
                }

                this._defaultExistingElementsDisplayMap = this._defaultExistingElementsDisplayMap || new Map()
                if (!this._defaultExistingElementsDisplayMap.has(target)) {
                    this._defaultExistingElementsDisplayMap.set(target, target.style.display)
                }





                // HACKER.doNothing('$obj--:', $obj)
                if (replacerConfig.oldAlias) {
                    this.$doms[replacerConfig.oldAlias] = target;
                }

                let shouldKeep = 1
                // let shouldKeep = target.closest('.HACKER-ROUTE-WRAPPER') ? 1 : 0

                if (shouldKeep == 1) {

                    // let defaultDisplay = target.style.display
                    this
                        ._offHook('beforeDestroy', 'RENDER_REPLACER')
                        ._regHook('beforeDestroy', () => {
                            // alert(this._defaultExistingElementsDisplayMap.get(target))
                            target.style.display = this._defaultExistingElementsDisplayMap.get(target)
                        }, 'RENDER_REPLACER')
                }

                target.dataset._keep = shouldKeep




                // this.$doms.$defaultMenu = jQuery('.m-subheader__breadcrumbs')
                
                
                HACKER.doNothing('fucku target--:',target)
               

                if(replacerConfig.preserveTarget==true){
                    target.innerHTML=''
                    target.appendChild($obj)
                }else{
                    target.style.cssText=replacerConfig.targetCssText||''
                    HACKER.insertAfter($obj, target)
                    target.style.display = replacerConfig.showTarget?target.style.display:'none'
                }

                
                // $obj.parentNode.insertBefore($obj, $obj.parentNode.childNodes[0])
                

                
               

                

                function removeObj() {
                    $obj.parentNode.removeChild($obj)
                }

                this
                    ._emitHook('againParsed', 'RENDER_REPLACER')
                    ._offHook('againParsed', 'RENDER_REPLACER')
                    ._regHook('againParsed', removeObj, 'RENDER_REPLACER')
                    // ._offHook('beforeDestroy', 'RENDER_REPLACER')
                    ._regHook('beforeDestroy', removeObj, 'RENDER_REPLACER')
                // this.$bus.once(['B_POP_STATE' + uniqueBueFlag], () => {


                //     HACKER.doNothing('$obj in pop state--:', $obj)


                //     $obj.parentNode.removeChild($obj)
                //     // this.$doms.menuWrapper.remove()

                //     // renderWrapper()
                // })

                // $obj = $($obj)
                // $obj.insertAfter(this.$doms.$defaultMenu.hide())
            })
            // this._domsCreatedByRenderReplacer = res;
            return res
        }




        renderWrapper()

    }
}