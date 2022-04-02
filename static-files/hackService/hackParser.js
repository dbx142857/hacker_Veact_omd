// const { request } = require("express");


; (async function () {

    let HK = window.HACKER,
        cloakElements = [],
        inputNumberSet=new Set(),
        $ = HACKER.$.$;

        if(HACKER.BX_MODE){
            HACKER.inputNumberSet=inputNumberSet
        }


        let lastEvent;



    // HTMLElement.prototype.getHackerDefine=function(){
    //     // return JSON.parse(this.dataset.hacker||null)
    //     // console.log(this.dataset.hacker)
    // }

    window.addEventListener('keyup',function(e){
        lastEvent=e;
        let tar=e.target,canLog=false,keyCode=e['key'+'Code'];
        // if(HACKER.formatTime(null,true))
        if(HACKER.BX_MODE){
            HACKER.LAST_EVENT=lastEvent
            if(HACKER.formatTime(null,true).split('-').reverse()[0]-0<20){
                canLog=true;
            }
            
        }
        if(canLog){
            HACKER.doNothing('key code--:',e['key'+'Code'])
        }
        // HACKER.doNothing('key code--:',e['key'+'Code'])


        if(e['key'+'Code']==19){
            return false;
        }

        try{
            if(tar.nodeName.toUpperCase()=='INPUT' && tar.type=='number' && e['key'+'Code']!=8){
                let strFromCode=String.fromCharCode(e['key'+'Code'])
                HACKER.doNothing('aaaaaa',keyCode,strFromCode)
            
                let v=tar.value,
                isInt=/[\d]/.test( strFromCode) || (keyCode>95 && keyCode<106) || (keyCode==8);
                
                
                
                if(!isInt){
                    
                    tar.value=tar.dataset.hackerLastCorrectValue;
                }else{
                    tar.dataset.hackerLastCorrectValue=v
                }
            }
        }catch(e){
            if(canLog){
                throw e;
            }
        }
        
    })

    function getBusNameByDepKey(v,changeHandlerBinder){
        let busName = (changeHandlerBinder.__UPDATE_FLAG+'_' + (v.split('.').join('_')) + '_UPDATE').toUpperCase();
                        
        // alert(busName)
        return busName
    }


    let showDefaultElements = false;

    let directiveCollections = {

    }
    HACKER.directiveSuper = class {
        h() {
            let res = HACKER.h.apply(this, arguments)
            this._elements.push(res)
            return res;
        }
        popup() {
            let res = HACKER.popup.apply(this, arguments)
            this._elements.push(res)
            return res;
        }
        beforeDestroy() {

        }
        destroyed() {

        }
        _inserted(directiveName) {//

            HACKER.addInstanceCache('directive', directiveName, this)
            let self = this
            function fun() {
                // HACKER.doNothing('fun args--:', arguments)
                HACKER.removeInstanceCache('directive', directiveName, self);
                this.beforeDestroy()
                this._elements.forEach((node) => {
                    node.destroy()
                })
                this._elements.length = 0
                HACKER.$bus.off('B_AFTER_ROUTE_CHANGE', fun)
                HACKER.$bus.off('B_RE_PARSE', fun)

                this.destroyed()
            }

            HACKER.$bus.on("B_AFTER_ROUTE_CHANGE B_RE_PARSE".split(" "), fun)
        }
        constructor() {

            this._elements = [];

        }
    }

    HACKER.directive = (key, configClass) => {
        directiveCollections[key] = new configClass
    }


    // 最新支持了data-hacker-css



    // new Function('return `'+     ('$'+'{this.$refs.a}')     +'`')      .call({$refs:{a:11111111}})

    //移除一个被双引号包裹的字符串里除了单引号引用里面之外的所有空格
    // function removeSpacesOutsideSingleQuot(s) {
    //     let inside = 0;
    //     return s.replace(/ +|'/g, m => m === "'" ? (inside ^= 1, "'") : inside ? m : "");
    // }


    //表达式如果需要在依赖的属性变更时重新计算，则必须满足类似格式：
    /** 
     * 1 每一个{}里必须只能引用一个响应式数据
     * 2 每一个{}对响应式数据的访问必须通过this.xxx.xx的形式，且被访问的属性之后必须得有至少一个.去访问其自身的属性
    */

    // "{this.$refs.startTime.value}   
    //  ~    {this.$refs.endTime.value}  list length:{this.list.length}  props:{Object.keys(HACKER.props.v).join('----')}"


    //匹配一个字符串中两个字符串中间的所有内容
    function matchStringsBetween(text) {
        // const text = "This is a test string {more or less}, {more} and {less}";
        const regex = /\{(.*?)\}/gi;
        // const regex = new RegExp('[(.*?)]', 'gi')
        const resultMatchGroup = text.match(regex); // [ '[more or less]', '[more]', '[less]' ]
        const desiredRes = resultMatchGroup.map(match => match.replace(regex, "$1"))
        return desiredRes
    }
    HACKER.matchStringsBetween = matchStringsBetween


    //根据表达式解析，收集依赖
    function collectDepsByExpression(expr,changeHandlerBinder) {
        // async function collectDepsByExpression(expr) {
        let previousExpr = expr;
        expr = expr.replace(/\{/g, '\${')
        // expr=removeSpacesOutsideSingleQuot(expr);
        let computedFun = new Function('HACKER.doNothing("this in new function",this);return `' + expr + '`'),
            changeDesc = null,
            changeHandler = computedFun.bind(changeHandlerBinder);
            // changeHandler = computedFun.bind(HACKER.$bus.$store);

        if (!expr.includes('{this.')) {
            return {
                changeHandler: changeHandler,
                deps: null
                // result: result
            }
        }

        let deps = []

        let everyExprs = matchStringsBetween(previousExpr)
        // debugger



        // await HACKER.dealyExec(() => {
        everyExprs.forEach((expr) => {
            Object.keys(changeHandlerBinder.__LIST).forEach((observableKey) => {
                // alert(observableKey)
            // Object.keys(HACKER.$bus.$store.__LIST).forEach((observableKey) => {
                let prefixKey = 'this.' + observableKey
                // let prefixKey = 'this.' + observableKey + '.'
                //为bue组件进行特殊处理
                if (expr.includes(prefixKey) && prefixKey!='this.$refs' && prefixKey!='this.$vm') {
                    let visitedKey = expr.split(prefixKey)[1].split('.')[0]
                    deps.push({
                        observableKey,
                        visitedKey
                    })
                    // HACKER.doNothing('expr--:', visitedKey, expr, 'LOG')
                }
            })
        })
        // }, 50)
        // setTimeout(() => {

        // }, 50)



        // for (let observableKey in HACKER.$bus.$store.__LIST) {
        //     // if ('$refs' == key) {
        //     //     //观测属性变动
        //     //     changeDesc = {
        //     //         type: 'MUTATION_OBSERVER_ATTRIBUTES',
        //     //     }
        //     // } else {
        //     //     changeDesc = null
        //     // }
        // }

        return {
            // result: result,
            deps: deps,
            // changeHandler: function(){},
            changeHandler: changeHandler,
            // changeHandler() {
            //     return computedFun.call(HACKER.$bus.$store)
            // }
        }
    }

    function applyValue(deps, node, initialKey, addBus, expr,changeHandlerBinder) {
        // debugger
        // HACKER.doNothing('changeHandlerBinder in apply value--:',changeHandlerBinder,expr,node)
        let key = initialKey.split('hacker')[1].toLowerCase()
        HACKER.doNothing('key in apply value--:', key, deps.changeHandler())
        let specialSituations = {
            html: 'innerHTML',
            text: 'innerText'
        }

        // alert(initialKey)

        var v;
        try {
            
            
            setTimeout(()=>{
                v = deps.changeHandler();
                doit();
            })
            
        } catch (e) {
            HACKER.doNothing('catch one error--:', e)
            // setTimeout(()=>{
            //     v = deps.changeHandler();
            //     doit();
            // },300)
        }


        function toggleNodeExistable(evtName,exist=true){
            let domBackStrategyMap = {
                insertAfter: node.previousSibling,
                insertBefore: node.nextSibling,
                insertToParent: node.parentNode
            },
                strategy = null,
                target = null;
            for (let i in domBackStrategyMap) {
                if (domBackStrategyMap[i] && !strategy) {
                    strategy = i
                    target = domBackStrategyMap[i]
                }
            }
            HACKER.busOn(evtName, (existInBus=true) => {

                if(existInBus||exist){
                    HACKER[strategy](node, target)
                }else{
                    node.parentNode.removeChild(node)
                }
                
            }, true)
        }



        function doit() {
            // alert(key)
            if (initialKey.startsWith('hackerClass')) {
                console.log('deps in class---:',deps)
                let className = HACKER.toMiddleLine(initialKey.split('hackerClass')[1])
                if (node.dataset.hackerTo) {
                    let hackerTo = node.dataset.hackerTo
                    node = node.parentNode;

                    if (node.nodeName.toUpperCase() == 'TEMPLATE') {
                        node = node.parentNode
                    }
                    // alert
                    // debugger;
                    node = node.querySelector('.' + hackerTo)

                }
                node.classList[v == 'true' ? 'add' : 'remove'](className)
            }
            else if (key == 'to') {
                void 0
            }
            else if (key == 'css') {
                node.style.cssText += deps.changeHandler()
            } else if (key == 'teleport') {
                toggleNodeExistable('B_RE_PARSE')

                

                // let 

                // HACKER.doNothing('after and before',node,node.previousSibling,node.nextSibling,node.parentNode)

                setTimeout(() => {
                    // alert(node.dataset.hackerExist)
                    if (!node.dataset.hackerExist) {
                        // alert(v)
                        let target = changeHandlerBinder.$refs[v]
                        // alert(target)
                        // let target = HACKER.$bus.$store.$refs[v]
                        if (target) {
                            HACKER.doNothing('target--:', target)
                            target.appendChild(node)
                        }
                    }

                })

            }
            else if (key == 'model') {
                HACKER.doNothing('node in parser model--:',node)
                // inputNumberSet
                let nodeName = node.nodeName.toUpperCase();
                // if(nodeName == 'INPUT' && node.type.toLowerCase() == 'number'){
                //     inputNumberSet.add(node)
                // }
                // node.addEventListener('DOMNodeRemoved',function(){

                //     alert('yes')
                //     HACKER.doNothing('node and args--:',node,arguments)
                // })
                let setValue = () => {
                    // alert(v)
                    // let val = v
                    // let val = HACKER.getDataByModel(HACKER.$bus.$store, v);
                    


                    if (nodeName == 'INPUT' || nodeName == 'TEXTAREA' || nodeName == 'SELECT') {
                        
                        let fun = (valu) => {
                            // alert(expr)
                            HACKER.doNothing('onchange invoked',valu)
                            let value = valu || node.value;
                            if (nodeName == 'INPUT' && node.type.toLowerCase() == 'number') {
                                value=value-0
                                // alert(node.max)
                                if (node.max && value - 0 > node.max - 0) {
                                    value = node.max - 0
                                }
                                if (node.min && value - 0 < node.min - 0) {
                                    value = node.min - 0
                                }
                                
                            }
                            node.value = value;

                            // if(!node.dataset.hackerLastCorrectValue){
                                node.dataset.hackerLastCorrectValue=value
                            // }


                            return value;
                            // alert(value+'--'+typeof(value))
                            // HACKER.doNothing()
                            // HACKER.setDataByModel(HACKER.$bus.$store, expr.split('this.')[1].replace(/\s/,'').replace(/}/,''), value)
                        }
                        // node.addEventListener('propertychange', fun.bind(null,null))
                        // node.addEventListener('input', fun.bind(null,null))
                        // setTimeout(()=>{
                            node.onchange=node.oninput=function(){
                                var value=fun.call(null,null)
                                let modelStr=expr.split('this.')[1].replace(/\s/,'').replace(/}/,'')
                                HACKER.doNothing('changeHandlerBinder--:',changeHandlerBinder)
                                let funReturnStr='this.'+modelStr+'=v;'
                                new Function('v',funReturnStr).call(changeHandlerBinder,value)
                                // alert(modelStr)
                                // HACKER.updateRouteData({
                                //     [modelStr]:value
                                // })
                            }
                        // })
                        

                        fun(v)

                        // let busName = (changeHandlerBinder.__UPDATE_FLAG+'_' + (v.split('.').join('_')) + '_UPDATE').toUpperCase();
                        
                        // alert(busName)
                        // alert(v)
                        // HACKER.doNothing('busName---------:',busName)
                        // HACKER.$bus.busOn(getBusNameByDepKey(v,changeHandlerBinder), fun)

                    }

                    // setTimeout(() => {
                    //     // alert('hah')
                    //     if (val) {
                    //         if (nodeName == 'INPUT') {
                    //             if (node.type.toLowerCase() == 'number') {
                    //                 node.value = val - 0
                    //             } else {
                    //                 node.value = val
                    //             }

                    //         }
                    //     }
                    // })


                }
                setValue()

            }
            else if (key == 'show') {
                // alert(v+'\n'+typeof(v)+'\n'+expr)

                    HACKER.doNothing('deps in if--:',deps)
                    // alert(initialKey)
    
                    if (v == 'false') {
                        node.style.display='none';
                        // node.style.pointerEvents='none'
                        // node.parentNode.removeChild(node)
                        // node.dataset.hackerExist = '0'
                    }else{
                        node.style.display='initial';
                        // node.style.pointerEvents='initial'
                    }
    
                    // toggleNodeExistable(getBusNameByDepKey(v,changeHandlerBinder),v=='true'?true:false)
    
                } 
            // else if (key == 'if') {

            //     HACKER.doNothing('deps in if--:',deps)
            //     // alert(initialKey)

            //     if (v == 'false') {
            //         node.parentNode.removeChild(node)
            //         node.dataset.hackerExist = '0'
            //     }

            //     // toggleNodeExistable(getBusNameByDepKey(v,changeHandlerBinder),v=='true'?true:false)

            // } 
            // else if (key == 'class') {
            //     alert(v)
            // }
            else {
                if (key in specialSituations) {
                    node[specialSituations[key]] = v
                    // node[specialSituations[key]] = deps.changeHandler()
                }
                else if (key in directiveCollections) {

                    directiveCollections[key]._inserted(key, node, v)
                    directiveCollections[key].inserted(node, v)
                    // directiveCollections[key]._inserted(key, node, deps.changeHandler())
                    // directiveCollections[key].inserted(node, deps.changeHandler())
                }
                else {
                    if (v == 'false') {
                        node.removeAttribute(key)
                    } else {
                        node.setAttribute(key, v)
                        // node.setAttribute(key, deps.changeHandler())
                    }


                }
            }
        }






    }

    function exprObservableHandler(deps, node, initialKey, addBus = true, expr,changeHandlerBinder) {
        
        // HACKER.doNothing('exprObservableHandler invoked--:',expr)
        // 

        let key = initialKey.split('hacker')[1].toLowerCase()


        // HACKER.doNothing('deps and node--:', deps, node,expr, "LOG")

        // alert(addBus+changeHandlerBinder.__UPDATE_FLAG)
        if (addBus) {
            HACKER.doNothing('exprObservableHandler of add bus---:',expr,deps)
            ; (deps.deps || []).forEach((dep) => {
                // alert(changeHandlerBinder.__UPDATE_FLAG)
                // alert(dep.observableKey)
                // let busName = (changeHandlerBinder.__UPDATE_FLAG+'_' + dep.observableKey + '_UPDATE').toUpperCase();
                // alert(busName)
                // let busName = ('ROUTE_DATA_' + dep.observableKey + '_UPDATE').toUpperCase();
            //    HACKER.doNothing('busName in exprObservableHandler--------:', busName)

            // alert(dep.observableKey)

                HACKER.$bus.busOn(getBusNameByDepKey(dep.observableKey,changeHandlerBinder), ()=>{
                    HACKER.doNothing('bus on invoked--:',expr)
                    //这块不能直接apply arguments，第4个参数为false表示不处理bug
                    exprObservableHandler.call(null, deps, node, initialKey, false, expr,changeHandlerBinder)
                }, true)
                // alert(dep.observableKey)

            });
        }else{
            HACKER.doNothing('exprObservableHandler without add bus---:',expr,deps)
        }


        if (null == deps.deps) {
            applyValue.apply(null, arguments)
            // await HACKER.dealyExec(applyValue.bind(null, ...arguments), 30);
        } else {
            applyValue.apply(null, arguments)
            // await HACKER.dealyExec(applyValue.bind(null, ...arguments), 300);
            deps.deps.forEach((dep) => {
                HACKER.doNothing('log single dep--:', dep, 'LOG')

                if (dep.observableKey == '$refs') {
                    new MutationObserver(HACKER.dealyExec(applyValue.bind(null, ...arguments), 0, false))
                        .observe(HK.$bus.$store.$refs[dep.visitedKey], { attributes: true, childList: false, subtree: false })
                } else {

                }

            })
        }

    }


    //主解析引擎
    function parseNodeByDataHacker(node) {
        // if(node.nodeName.toUpperCase()=='BUTTON'){
        //     console.trace()
        // }
        
        // async function parseNodeByDataHacker(node) {
        // HACKER.doNothing('nodeeeeeeeeee--:', node)
        let { methodContext, controller,changeHandlerBinder } = this
        let vmConfig = controller == window ? null : controller;
        HACKER.doNothing('vmConfig--:', vmConfig, node, node.attributes)

        if (vmConfig) {
            let methods = vmConfig.methods || {}
            for (let i in node.attributes) {
                if (typeof (node.attributes[i]) == 'object') {
                    let row = node.attributes[i]
                    // HACKER.doNothing('iii----------:',row,row.value,row.name,Object.keys(row),Object.values(row),Reflect.getPrototypeOf(row))
                    if (row.name.startsWith('@')) {
                        // alert(row.value)
                        // alert(row.name)
                        node.addEventListener(row.name.substring(1), (e) => {

                            // alert(row.value)
                            if (/^[a-zA-Z\$_][a-zA-Z\d\$_]*$/.test(row.value)) {
                                methods[row.value].call(methodContext, e)
                            } else {
                                try {
                                    new Function(row.value).call(methodContext)
                                } catch (e) {
                                    HACKER.doNothing('got one error--:', e)
                                    // setTimeout(() => {
                                    //     new Function(row.value).call(methodContext)
                                    // }, 300)
                                }

                            }


                        })

                    }
                }

            }
        }


        let hackerDefine = {};
        try {
            // let 
            // HACKER.doNothing('node.dataset.hacker--:', node.dataset.hacker)
            //like data-hacker="{ref:'abcd'}"
            hackerDefine = node.dataset.hacker ? (new Function('return ' + (node.dataset.hacker)).call(changeHandlerBinder)) : {}
        } catch (e) {
            alert('data-hacker声明有误，无法转换为合法的js对象,请查看控制台error信息');
            throw e;

        }

        node.hackerDefine=hackerDefine

        for (let i in node.dataset) {
            
            // HACKER.doNothing('i---:',node.dataset[i],i)
            // alert(i)
            if (i != 'hacker' && i.startsWith('hacker')) {
                
                // let key = i.split('hacker')[1].toLowerCase(),
                //     val = node.dataset[i];

                // alert(key)

                // alert(node.dataset[i])
                exprObservableHandler(collectDepsByExpression(node.dataset[i],changeHandlerBinder), 
                node,
                 i, 
                 true, 
                 node.dataset[i],
                 changeHandlerBinder
                 )

            }
        }


        // console.log('hackerDefine--:',hackerDefine)

        let id = hackerDefine.ref||hackerDefine.id || node.getAttribute('id')

        if (!showDefaultElements) {
            if (hackerDefine.hide) {
                node.style.display = 'none'
            } else if (hackerDefine.transparent) {
                node.style.opacity = '0'
            }
        }

        if (hackerDefine.cloak == true) {
            cloakElements.push(node)
        }


        if (!id) {
            return false;
        }

        // debugger
        changeHandlerBinder.$refs[(hackerDefine.group ? (hackerDefine.group + '_') : '') + HACKER.toHump(id)]=node
        // HK.$bus.$store.$refs[(hackerDefine.group ? (hackerDefine.group + '_') : '') + HACKER.toHump(id)]=node
            // = node

        // if (hackerDefine.group) {
        //     if (!HK.$bus.$store.$refs[hackerDefine.group]) {
        //         HK.$bus.$store.$refs[hackerDefine.group] = {}
        //     }

        //     HK.$bus.$store.$refs[hackerDefine.group][HACKER.toHump(id)] = node
        // } else {
        //     HK.$bus.$store.$refs[HACKER.toHump(id)] = node
        // }






        // console.timeEnd()

    }


    

    HACKER.$bus.once('B_HACKER_CORE_LOADED', () => {

        HK.$bus.$store.$refs = HACKER.createObservableObject({}, 'HK.$bus.$store_REF', [], (v) => {
            if (!(v instanceof HTMLElement)) {
                throw '只能为ref设置HTMLElement类型的值'
            }
        })
    })


    //route data被改变触发点事件
    // HACKER.$bus.busOn('HK.$bus.$store_REF_UPDATE', ($refs, key, value) => {
    //     HACKER.doNothing('log-ref-setter:', $refs, key, value, 'LOG')
    // })

    // HACKER.doNothing('mmpppppppppp')
    HACKER.parseDom = (container, controller = null, methodContext = null,changeHandlerBinder=HACKER.$bus.$store) => {
        HACKER.doNothing('container in parseDom---:', container)
        // let isJQueryObj = container instanceof jQuery
        // if (isJQueryObj) {
        //     container = container.get(0)
        // }
        // HK.$bus.$store.$refs = {}
        // HACKER.$.$('[data-hacker]').forEach(await parseNodeByDataHacker)

        // await Promise.all([].map.call(HACKER.$.$('[data-hacker]') || [], parseNodeByDataHacker))
        Promise.all([].map.call((function () {
            // console.time()
            try {
                container = container || HACKER.webAppRootRouteWrapper
                let result = [],
                    objs;

                objs = container ? container.querySelectorAll('*') : HACKER.$.$('*');
                // objs = HACKER.$.$('*');
                for (let i in objs) {
                    if (Object.keys(objs[i].dataset || {}).find((s) => s.startsWith('hacker'))) {
                        result.push(objs[i])
                    }
                }

                // debugger
                // HACKER.doNothing('shit length--:',result)
                // HACKER.doNothing('shit result--:',result)

                return result
            } catch (e) {
                console['log']('error---------:', e)

                return []
            }



        })(), parseNodeByDataHacker.bind({
            controller,
            methodContext,
            changeHandlerBinder
        })))
        // })(), function(node){
        //     setTimeout(()=>{
        //         parseNodeByDataHacker.call({
        //             controller,
        //             methodContext
        //         },node)
        //     },500)
        // }))



        return container;
        // return isJQueryObj ? jQuery(container) : container;

    }

    HACKER.$bus.on("B_AFTER_ROUTE_CHANGE", () => {

        // return false;


        setTimeout(() => {
            HACKER.parseDom(document.body)
            // await HACKER.parseDom()

            HK.$bus.emit('B_HACKER_READY' + HACKER.generateUniqueKeyByPathName())
            cloakElements.forEach((node) => node.style.opacity = '1')
        })







    })
})();