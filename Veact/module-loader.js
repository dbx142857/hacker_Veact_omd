

; (async function () {


    
    if(Veact.ScriptLoader && Veact.ScriptLoader.require){{
        return false;
    }}
  



    // let DEBUG_MODE = location.hostname == 'localhost'

    // if (DEBUG_MODE) {
        
    Veact.LOADED_MODULE_INFO = {
        MODULE_STRING_CACHE_MAP: {},
        MODULE_RESULT_CACHE_MAP: {},
        // MODULE_FUNCTION_CACHE_MAP: {},
        LOADED_MODULE_PATHS: []
    }

    Veact.ScriptLoader = class {
        static isPureObj(obj){
            try{
                return Object.getPrototypeOf(obj).constructor===Object
            }catch(e){
                return false;
            }
            
        }
        static updateExportsValueByItself=async function(obj){
            for(let i in obj){
                if(obj[i] instanceof Promise && obj[i]._tag==Veact.ScriptLoader._tag){
                    let v=await obj[i];
                    obj[i]=v
                } else if(Array.isArray(obj[i]) && obj[i].every(row=>(row instanceof Promise && row._tag==Veact.ScriptLoader._tag))){
                    
                    obj[i].forEach(async (row,index)=>{
                        let v=await row;
                        obj[i][index]=v;
                    })
                }
                else if(this.isPureObj(obj[i])){
                    obj[i]=await this.updateExportsValueByItself(obj[i])
                }
            }
            return obj;
        }
        static _count = 0;



        static _tag = Veact.util.guid();
        static tempVar = null;
        // static _lastBindedClass = null
        static tempClass = null;
        // static pureRequire2ClassStr

        static EvalModule = async (path,currentFilePath=null) => {
            // alert(3)

            if(currentFilePath){
                let currentFileBasePath=currentFilePath.split('/').reverse().slice(1).join('/')
                path=currentFileBasePath+'/'+path
            }
    
            if (!path.endsWith('.js')) {
                path += '.js'
            }
            let keyInMODULE_RESULT_CACHE_MAP = path + Veact.ScriptLoader.generateHashForPath()
    
            let MODULE_RESULT_CACHE_MAP=   Veact.LOADED_MODULE_INFO.MODULE_RESULT_CACHE_MAP
            
            let tempResolveForModuleResultCacheMap;
            
            if (!MODULE_RESULT_CACHE_MAP[keyInMODULE_RESULT_CACHE_MAP] && !Veact.LOADED_MODULE_INFO.LOADED_MODULE_PATHS.includes(path)) {
                Veact.LOADED_MODULE_INFO.LOADED_MODULE_PATHS.push(path)
                
                MODULE_RESULT_CACHE_MAP[keyInMODULE_RESULT_CACHE_MAP]=new Promise((resolve)=>{
                    tempResolveForModuleResultCacheMap=resolve;
                })
                MODULE_RESULT_CACHE_MAP[keyInMODULE_RESULT_CACHE_MAP].tempResolveForModuleResultCacheMap=tempResolveForModuleResultCacheMap
            }
            else {
                // alert('haha')
                // alert(keyInMODULE_RESULT_CACHE_MAP)
                let v = MODULE_RESULT_CACHE_MAP[keyInMODULE_RESULT_CACHE_MAP];
                
               
                if (v instanceof Promise) {
                    v=await v;
                    return async function () {
                        return v;
                    }
                    // debugger
                    
                    // // alert(keyInMODULE_RESULT_CACHE_MAP)
                    // return await ((await v))();
                } else {
                    return async function () {
                        return v;
                    }
                }
            }
    
            // alert(2)
    
            let rowString = await Veact.ScriptLoader.fetchModuleContent(path)
            let str = rowString.split('\n').filter(s => !s.startsWith('return ') && !s.trim().startsWith('//')).join('\n')
    
            let resStrArr = [
                '(function(){\nreturn async function(){',
                // 'let currentModulePath="' + keyInMODULE_RESULT_CACHE_MAP + '"',
                'let module={};let require= Veact.ScriptLoader.require;\n'
            ]
            let prefixStr = 'new class extends Veact.ScriptLoader'
            resStrArr = resStrArr.concat(
                str.replace(/@Import([\s\S]*?)class/g, function () {
                    console.log('arggs in reaplaceeeeee---------:',arguments)
                    let varName = arguments[1].trim().replace(/\n/g, '')
                    var reg = /^[a-zA-Z_]{1,}$/g;
                    let innerVarName = varName.substring(1, varName.length - 1).trim();
                    let res;
                    if (varName.startsWith('(') && varName.endsWith(')') && reg.test(innerVarName)) {
                        // let tempVarNameForDeleteInnerVarInThis='$'+Veact.util.guid().split('-').join('_')
                        res=';'+(innerVarName ? 
                        // res=';let tempObj=null,isInstance=this instanceof Veact.ScriptLoader;;'+(innerVarName ? 
                        (';let ' + innerVarName + ';'
                        // (';let ' + innerVarName + ';'+(`;let ${tempVarNameForDeleteInnerVarInThis}=this.${innerVarName};`)
                        // +(`;if(${tempVarNameForDeleteInnerVarInThis}!==undefined){
                        //     Promise.resolve()
                        //         .then(()=>{
                        //             this.${innerVarName}=${tempVarNameForDeleteInnerVarInThis};
                                    
                        //         })
                        // }
                        // ;`)
                         + innerVarName + `=(this||{})['${innerVarName}']=`) 
                        // (';let ' + innerVarName + ';' + innerVarName + `=(isInstance?this.${innerVarName}:tempObj)=`) 
                        : '') + prefixStr
                    }else{
                        res=';'+prefixStr
                    }
                    
                    return res
                })
            )
            
            
            
    
    
            // 原先设想剪头函数自动计算，现在暂时去除这个特性了
            // (typeof(module.exports)=='function') && (!Boolean(module.exports.prototype)) && (module.exports=module.exports());
                
    
    
            resStrArr.push(`
                
                await Veact.ScriptLoader.require.nextMacroTick();
                
                
               
               
                (Veact.ScriptLoader.isPureObj(module.exports)) && (module.exports=await Veact.ScriptLoader.updateExportsValueByItself(module.exports));
                
                
    
                if(!Veact.ScriptLoader.checkExportValueType(module.exports)){return false;}
    
                
            `)

            // resStrArr.push('\n;alert("'+keyInMODULE_RESULT_CACHE_MAP+'");\n');
            // resStrArr.push('\n ;try{alert(Veact.LOADED_MODULE_INFO.MODULE_FUNCTION_CACHE_MAP["' + keyInMODULE_RESULT_CACHE_MAP + '"]);'             )
            resStrArr.push('\n ;try{(Veact.LOADED_MODULE_INFO.MODULE_RESULT_CACHE_MAP["' + keyInMODULE_RESULT_CACHE_MAP + '"].tempResolveForModuleResultCacheMap||(()=>void 0))(module.exports);'             )
            resStrArr.push('\n ;delete Veact.LOADED_MODULE_INFO.MODULE_RESULT_CACHE_MAP["' + keyInMODULE_RESULT_CACHE_MAP + '"].tempResolveForModuleResultCacheMap;}catch(e){};'             )
    

            resStrArr.push('\n ;Veact.LOADED_MODULE_INFO.MODULE_RESULT_CACHE_MAP["' + keyInMODULE_RESULT_CACHE_MAP + '"]=module.exports;')
            // resStrArr.push('\n ;Veact.LOADED_MODULE_INFO.MODULE_FUNCTION_CACHE_MAP["' + keyInMODULE_RESULT_CACHE_MAP + '"]=' +
            //     `function(){
    
            //     return Veact.LOADED_MODULE_INFO.MODULE_RESULT_CACHE_MAP["${ keyInMODULE_RESULT_CACHE_MAP}"]
            // }`
            // )

            resStrArr.push('\n return module.exports;}})()')
            let evalStrObj = {
                str: resStrArr.join('\n')
            }
            let MODULE_STRING_CACHE_MAP= Veact.LOADED_MODULE_INFO.MODULE_STRING_CACHE_MAP
            MODULE_STRING_CACHE_MAP[keyInMODULE_RESULT_CACHE_MAP] = evalStrObj.str
            // console.log("evalStrObj--:", evalStrObj)
            let evalResult = eval(evalStrObj.str)
            // console.log('typeof eval result--:', typeof (evalResult))
            // MODULE_RESULT_CACHE_MAP[keyInMODULE_RESULT_CACHE_MAP] = evalResult
            // MODULE_RESULT_CACHE_MAP[keyInMODULE_RESULT_CACHE_MAP] = await (await evalResult)()
            evalResult._tag = Veact.ScriptLoader._tag
            evalResult.rowString = rowString;
            // console.log('evalResult--:', evalResult, typeof (evalResult))
    
    
    
            return evalResult;
            // return {
            //     prom: evalResult,
            //     string: evalStrObj.str
            // };
        }
        static getExportObjectByContent(content) {
            eval(`
            let module={};
            ${content}
            Veact.ScriptLoader.tempVar=module.exports||null;
            `)
            let returnObj = Veact.ScriptLoader.tempVar

            setTimeout(() => {
                Veact.ScriptLoader.tempVar = null;
            })
            return returnObj;

        }
        static generateHashForPath() {
            return '?r=' + Veact.util.formatTime(null, true)
        }
        static fetchModuleContent = (function () {


            return function (path, returnString = true) {
                let promiseRes = new Promise(async (resolve) => {
                    path += Veact.ScriptLoader.generateHashForPath()

                    let MODULE_STRING_CACHE_MAP= Veact.LOADED_MODULE_INFO.MODULE_STRING_CACHE_MAP
                    let cachedValue = MODULE_STRING_CACHE_MAP[path]

                    if (!cachedValue) {
                        MODULE_STRING_CACHE_MAP[path] = new Promise((resolve) => {
                            fetch(path).then(async (res) => {
                                let txt = await res.text()

                                MODULE_STRING_CACHE_MAP[path] = returnString ? txt : (await Veact.ScriptLoader.EvalModule(path)).rowString;
                                // MODULE_STRING_CACHE_MAP[path] = returnString ? txt : Veact.ScriptLoader.getExportObjectByContent(txt);
                                resolve(MODULE_STRING_CACHE_MAP[path])
                            })
                        })
                        // resolve(cachedValue)

                    }
                    if (cachedValue instanceof Promise) {
                        MODULE_STRING_CACHE_MAP[path] = await MODULE_STRING_CACHE_MAP[path]
                    }
                    resolve(MODULE_STRING_CACHE_MAP[path])
                })

                return promiseRes;

            }
        })();
        static checkExportValueType(obj){
            let hasError=false;
            if('number string boolean undefined symbol'.split(' ').find(s=>typeof(obj)==s)){
                hasError=true
            }
            if(obj===null){
                hasError=true;
            }
            

            let result= !hasError
            setTimeout(()=>{
                if(hasError){
                    throw 'the value of the module.exports can not be one of these:number,string,boolean,undefined,null,symbol'
                }
            })
            return result;

        }
        static dealyRequire(dealy, prom, resolve, path) {

            let res;
            let makeTimeout = function (timeout = 20, resolveCb = () => { }) {
                return setTimeout(async () => {
                    if (dealy == 0) {
                        
                        res = await (await Veact.ScriptLoader.EvalModule(path))()
                        resolve(res)
                        resolveCb(res)
                    } else {
                        setTimeout(async () => {
                            res = await (await Veact.ScriptLoader.EvalModule(path))()
                            resolve(res)
                            resolveCb(res)
                        }, dealy)
                    }
                }, timeout)
            }


            prom.dealyClock = makeTimeout()
            prom.makeTimeout = makeTimeout;







        }
        static wrapPromise(prom,path){
            let wrapperedObj = {
                prom: prom,
                path: path,
                _tag: Veact.ScriptLoader._tag
            };

            for(let i in wrapperedObj){
                prom[i]=wrapperedObj[i]
            }
            prom.wrapperedObj=wrapperedObj
            return prom
        }
        // static arrayMethodKeys=Object.keys(Veact.util.getAllCustomPropsFromClassInstance(Array.prototype))
        static require=(function(){

            let result= function (path) {


                console.log('path and script src---:',path,document.currentScript)

                if(Array.isArray(path)){
                    let res=[]
                    path.forEach((row)=>{
    
                        res.push(Veact.ScriptLoader.require(row))
                    })
                    let result= Promise.all(res)
    
                    'map slice splice sort reverse concat filter'.split(' ').forEach((key)=>{
                        result[key]=function(){

                            

                            let prom=new Promise(async (resolve)=>{
                                let resu=await Promise.all(Array.prototype[key].apply(res,arguments))
                                resolve(resu)
                            })
                            // let wrapperedObj = {
                            //     prom: prom,
                            //     path: path,
                            //     _tag: Veact.ScriptLoader._tag
                            // };

                            // for(let i in wrapperedObj){
                            //     prom[i]=wrapperedObj[i]
                            // }

                            return Veact.ScriptLoader.wrapPromise(prom);
                            
                        }
                    })
    
                    result.eq=async (index)=>{
                        let res=await result;
    
                        return res[index]
                    }
    
                    return result;
                }
                if (!path.endsWith('.js')) {
                    path += '.js'
                }
    
                // if (this !== Veact.ScriptLoader._lastBindedClass) {
    
                //     Veact.ScriptLoader._count = 0;
                //     setTimeout(() => {
                //         Veact.ScriptLoader._lastBindedClass = null;
                //     })
                // }
                // let _tag = Veact.ScriptLoader._tag;
    
                // Veact.ScriptLoader._lastBindedClass = this;
    
                Veact.ScriptLoader._count++
                // let res = {
                //     foo: Math.random()
                // }
    
                let prom; prom = new Promise(async function (resolve, reject) {
                    try {
                        await Promise.resolve()
                        // setTimeout(() => {
                        Veact.ScriptLoader.dealyRequire(0, prom, resolve, path)
                        
    
                    } catch (e) {
                        console.warn('e---:', e)
    
                    }
                })
                setTimeout(() => {
                    // alert(prom.dealy)
                })
    
                // prom._tag = _tag;
                // let wrapperedObj = {
                //     prom: prom,
                //     path: path,
                //     _tag: _tag
                // };
                // for (let k in wrapperedObj) {
                //     prom[k] = wrapperedObj[k]
                // }

                prom=Veact.ScriptLoader.wrapPromise(prom,path);
                
                
                prom.dealy=Veact.ScriptLoader.requireResWrapper(prom.wrapperedObj,(subResolve,[timeout])=>{
                    clearTimeout(prom.dealyClock)
                    prom.dealyClock = prom.makeTimeout(timeout, (resolveRes) => {
                        subResolve(resolveRes)
                    })
                })
    
                prom.eq=()=>prom
    
    
                
                
    
                return prom;
            }

            result.nextTick = function (fn=()=>void 0) {
                return new Promise(async (resolve) => {
                    await Promise.resolve()
                    let res=fn()
                    resolve(res)
                })
            }
            result.nextMacroTick = function (fn=()=>void 0) {
                return new Promise((resolve) => {
                    setTimeout(()=>{
                        // await Promise.resolve()
                        let res=fn()
                        resolve(res)
                    })
                    
                })
            }


            return result;
        })();
        static requireResWrapper(wrapperedObj,subPromiseCb){
            
           return function () {
                let subProm = new Promise(async (resolve) => {
                    await Veact.ScriptLoader.require.nextTick()
                    
                    subPromiseCb(resolve,arguments)

                })
                for (let k in wrapperedObj) {
                    subProm[k] = wrapperedObj[k]
                }

                subProm.eq=()=>subProm

                return subProm;
            }
        }
        constructor() {
           this.ready=()=>{
               return new Promise((resolve)=>{
                   this._waitForReadyResolver=resolve;
               })
           } 


           if(typeof(this.bootstrap)=='function'){
                    
                    this.bootstrap.call(this)
            }

            Promise.resolve().then(async ()=>{
                console.log('this.bootstrap-------:',this.bootstrap)
                // if(typeof(this.bootstrap)=='function'){
                    
                //         await this.bootstrap.call(this)
                // }
                
                let obj = Veact.util.getAllCustomPropsFromClassInstance(this, (v, k) => {
                    // alert(k)
                    if (v.prom instanceof Promise && v._tag == Veact.ScriptLoader._tag) {

                        return true;
                    }
                    else if(Array.isArray(v) ){

                        if(v.every((row)=>( row.prom instanceof Promise && row._tag == Veact.ScriptLoader._tag  ))){
                            return true;
                        }
                        
                    }

                })
                let allPaths = Object.values(obj).map(s => s.path);
                let promiseCount = allPaths.length;
                allPaths = [...new Set(allPaths)]
                this.loadStart(allPaths.length, allPaths)
                let loadedCount = 0;
                for (let k in obj) {
                    let v = obj[k]
                    // alert(k)
                    this.beforeEachLoad(v.path)
                    if(Array.isArray(v)){
                        this[k] = await Promise.all(v);
                    }else{
                        this[k] = await v.prom;
                    }
                    
                    console.log('v.path-----:',v.path)

                    loadedCount++;
                    // if (!LOADED_MODULE_PATHS.includes(v.path)) {
                    //     alert('h')
                    //     this.eachLoaded(v.path, this[k])
                    //     LOADED_MODULE_PATHS.push(v.path)
                    // }

                    this.eachLoaded(v.path, this[k])

                    if (loadedCount == promiseCount) {
                        this.loadFinished()
                        if(typeof(this._waitForReadyResolver)=='function'){
                            this._waitForReadyResolver()
                        }
                        delete this._waitForReadyResolver
                        
                    }

                }
            })
            
            // this.bootstrap.call(this)
            



        }
        loadStart(totalNum, allPaths) {

            console.log('load start in super--:',totalNum,allPaths)


        }
        eachLoaded(path, responseObj) {
            console.log('each loaded in path of super--:',path)

        }
        beforeEachLoad(path){
            console.log('before each load in super--:',path)
        }
        loadFinished() {

        }
        loadError(err) {

        }
    }

    


   


    if(typeof(window)!='undefined' && typeof(window.require)=='undefined'){
        window.require = Veact.ScriptLoader.require;
    }

    let script=(document.currentScript)
    if(script.getAttribute('init')!=undefined){
        let fun=new Function('return '+(script.getAttribute('entry')||'null')),
        funRes=fun()
        if(funRes){
            let res=await Veact.ScriptLoader.require(funRes)
            console.log('res--------:',res)
            if(location.hostname==='localhost'){
                window.OMD_ENTRY_RES=res;
            }
        }
    }
    


})();