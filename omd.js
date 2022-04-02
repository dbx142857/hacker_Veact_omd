


; (async function () {

    let DEBUG_MODE=location.hostname==='localhost';
    let GLOBAL_TIMEOUT=60*1000*1000
    // let GLOBAL_TIMEOUT=60*60*1000
    // // 60*60*1000
    // timeoutPromise(200),
    class EventEmitter {
        constructor() {
          this.events = {};
        }
        on(event, callback) {
          const callbacks = this.events[event] || [];
          if (Array.isArray(callbacks)) {
            callbacks.push(callback);
            this.events[event] = callbacks;
          }
          return this;
        }
        off(event, callback) {
          const callbacks = (this.events[event] || []).filter(
            (cb) => cb !== callback
          );
          this.events[event] = callbacks;
          return this;
        }
        once(event, callback) {
          const wrap = (...args) => {
            typeof callback === "function" && callback.apply(this, args);
            this.off(event, wrap);
          };
          this.on(event, wrap);
          return this;
        }
        emit(event, ...args) {
          const callbacks = this.events[event] || [];
          if (Array.isArray(callbacks)) {
            callbacks.forEach((cb) => typeof cb === "function" && cb.apply(null, args));
          }
          return this;
        }
      }


    let $bus=new EventEmitter()

    if(DEBUG_MODE){{
        window.$bus=$bus;
    }}

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
  let Omd={
    GLOBAL_TIMEOUT:GLOBAL_TIMEOUT,
    
    util:{
      getAllCustomPropsFromClassInstance:getAllCustomPropsFromClassInstance,
      guid() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
          c
        ) {
          var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });
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
  }

  window.Omd=Omd;
    
  if(Omd.ScriptLoader && Omd.ScriptLoader.require){{
      return false;
  }}




  // let DEBUG_MODE = location.hostname == 'localhost'

  // if (DEBUG_MODE) {
      
  Omd.LOADED_MODULE_INFO = {
      MODULE_STRING_CACHE_MAP: {},
      MODULE_RESULT_CACHE_MAP: {},
      // MODULE_FUNCTION_CACHE_MAP: {},
      LOADED_MODULE_PATHS: []
  }

  Omd.ScriptLoader = class {
      static isPureObj(obj){
          try{
              return Object.getPrototypeOf(obj).constructor===Object
          }catch(e){
              return false;
          }
          
      }
      static updateExportsValueByItself=async function(obj){
          for(let i in obj){
              if(obj[i] instanceof Promise && obj[i]._tag==Omd.ScriptLoader._tag){
                  let v=await obj[i];
                  obj[i]=v
              } else if(Array.isArray(obj[i]) && obj[i].every(row=>(row instanceof Promise && row._tag==Omd.ScriptLoader._tag))){
                  
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
    //   static _count = 0;



      static _tag = Omd.util.guid();
      static tempVar = null;
      // static _lastBindedClass = null
    //   static tempClass = null;
      // static pureRequire2ClassStr

      static EvalModule = async (path,currentFilePath=null) => {////////core
          // alert(3)



          if(!path.startsWith('http://') && !path.startsWith('https://')){
            if(currentFilePath){
                let currentFileBasePath=currentFilePath.split('/').reverse().slice(1).join('/')
                path=currentFileBasePath+'/'+path
            }
    
            if (!path.endsWith('.js')) {
                path += '.js'
            }
          }

          



          let keyInMODULE_RESULT_CACHE_MAP = path + Omd.ScriptLoader.generateHashForPath()
  
          let MODULE_RESULT_CACHE_MAP=   Omd.LOADED_MODULE_INFO.MODULE_RESULT_CACHE_MAP
          
          let tempResolveForModuleResultCacheMap;
          
          if (!MODULE_RESULT_CACHE_MAP[keyInMODULE_RESULT_CACHE_MAP] && !Omd.LOADED_MODULE_INFO.LOADED_MODULE_PATHS.includes(path)) {
              Omd.LOADED_MODULE_INFO.LOADED_MODULE_PATHS.push(path)
              
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
  
          let rowString;
          
          
            rowString= await Omd.ScriptLoader.fetchModuleContent(path)
            
          
          
          let str = rowString.split('\n').filter(s => !s.startsWith('return ') && !s.trim().startsWith('//')).join('\n')
  
          let resStrArr = [
              '(function(){\nreturn async function(){',
              // 'let currentModulePath="' + keyInMODULE_RESULT_CACHE_MAP + '"',
              'let module={};let require= Omd.ScriptLoader.require;\n'
          ]
          let prefixStr = 'new class extends Omd.ScriptLoader'
          resStrArr = resStrArr.concat(
              str.replace(/@Import([\s\S]*?)class/g, function () {
                  // console.log('arggs in reaplaceeeeee---------:',arguments)
                  let varName = arguments[1].trim().replace(/\n/g, '')
                  var reg = /^[a-zA-Z_]{1,}$/g;
                  let innerVarName = varName.substring(1, varName.length - 1).trim();
                  let res;
                  if (varName.startsWith('(') && varName.endsWith(')') && reg.test(innerVarName)) {
                      // let tempVarNameForDeleteInnerVarInThis='$'+Omd.util.guid().split('-').join('_')
                      res=';'+(innerVarName ? 
                      // res=';let tempObj=null,isInstance=this instanceof Omd.ScriptLoader;;'+(innerVarName ? 
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
              
              await Omd.ScriptLoader.require.nextMacroTick();
              
              
             
             
              (Omd.ScriptLoader.isPureObj(module.exports)) && (module.exports=await Omd.ScriptLoader.updateExportsValueByItself(module.exports));
              
              
  
              if(!Omd.ScriptLoader.checkExportValueType(module.exports)){return false;}
  
              
          `)

          // resStrArr.push('\n;alert("'+keyInMODULE_RESULT_CACHE_MAP+'");\n');
          // resStrArr.push('\n ;try{alert(Omd.LOADED_MODULE_INFO.MODULE_FUNCTION_CACHE_MAP["' + keyInMODULE_RESULT_CACHE_MAP + '"]);'             )
          resStrArr.push('\n ;try{(Omd.LOADED_MODULE_INFO.MODULE_RESULT_CACHE_MAP["' + keyInMODULE_RESULT_CACHE_MAP + '"].tempResolveForModuleResultCacheMap||(()=>void 0))(module.exports);'             )
          resStrArr.push('\n ;delete Omd.LOADED_MODULE_INFO.MODULE_RESULT_CACHE_MAP["' + keyInMODULE_RESULT_CACHE_MAP + '"].tempResolveForModuleResultCacheMap;}catch(e){};'             )
  

          resStrArr.push('\n ;Omd.LOADED_MODULE_INFO.MODULE_RESULT_CACHE_MAP["' + keyInMODULE_RESULT_CACHE_MAP + '"]=module.exports;')
          // resStrArr.push('\n ;Omd.LOADED_MODULE_INFO.MODULE_FUNCTION_CACHE_MAP["' + keyInMODULE_RESULT_CACHE_MAP + '"]=' +
          //     `function(){
  
          //     return Omd.LOADED_MODULE_INFO.MODULE_RESULT_CACHE_MAP["${ keyInMODULE_RESULT_CACHE_MAP}"]
          // }`
          // )

          resStrArr.push('\n return module.exports;}})()')
          let evalStrObj = {
              str: resStrArr.join('\n')
          }
          let MODULE_STRING_CACHE_MAP= Omd.LOADED_MODULE_INFO.MODULE_STRING_CACHE_MAP
          MODULE_STRING_CACHE_MAP[keyInMODULE_RESULT_CACHE_MAP] = evalStrObj.str
          // console.log("evalStrObj--:", evalStrObj)
          let evalResult = eval(evalStrObj.str)
          // console.log('typeof eval result--:', typeof (evalResult))
          // MODULE_RESULT_CACHE_MAP[keyInMODULE_RESULT_CACHE_MAP] = evalResult
          // MODULE_RESULT_CACHE_MAP[keyInMODULE_RESULT_CACHE_MAP] = await (await evalResult)()
          evalResult._tag = Omd.ScriptLoader._tag
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
          Omd.ScriptLoader.tempVar=module.exports||null;
          `)
          let returnObj = Omd.ScriptLoader.tempVar

          setTimeout(() => {
              Omd.ScriptLoader.tempVar = null;
          })
          return returnObj;

      }
      static generateHashForPath() {
          return '?r=' + Omd.util.formatTime(null, true)
      }
      static fetchModuleContent = (function () {////////core


          return function (path, returnString = true) {
              let promiseRes = new Promise(async (resolve,reject) => {
                  path += Omd.ScriptLoader.generateHashForPath()

                  let MODULE_STRING_CACHE_MAP= Omd.LOADED_MODULE_INFO.MODULE_STRING_CACHE_MAP
                  let cachedValue = MODULE_STRING_CACHE_MAP[path]

                  if (!cachedValue) {
                      MODULE_STRING_CACHE_MAP[path] = new Promise((resolve,reject) => {


                        let controller = new AbortController();
                        let signal = controller.signal;

                        let generateTimeoutRes = () => {
                            return new Response("timeout", {
                            status: 504,
                            statusText: "timeout",
                            });
                        };

                        let timeoutPromise = (timeout) => {
                            return new Promise((resolve, reject) => {
                            setTimeout(() => {
                                reject(generateTimeoutRes());
                                // reject(new Error(''请求超时))
                                controller.abort();
                            }, timeout);
                            });
                        };

                        let requestPromise = (path) => {
                            return fetch(path, {
                                signal: signal
                            });
                        };


                        Promise.race([
                            // 60*60*1000
                            timeoutPromise(Omd.GLOBAL_TIMEOUT),
                            // timeoutPromise(60*60*1000),
                            requestPromise(path),
                          ])
                        //   fetch(path)
                          .then(async (res) => {
                            //   console.log('res-----------:',res)

                            if(res.status!=200){

                                $bus.emit('B_OMD_ERROR_'+path.split('?')[0],res,path.split('?')[0])


                                return false;
                            }



                            // if (res.statusText.toLowerCase().includes("timeout")) {
                                
                                
                            //     reject(generateTimeoutRes());

                                

                            //     return false;
                            // }

                              let txt = await res.text()

                              MODULE_STRING_CACHE_MAP[path] = returnString ? txt : (await Omd.ScriptLoader.EvalModule(path)).rowString;
                              // MODULE_STRING_CACHE_MAP[path] = returnString ? txt : Omd.ScriptLoader.getExportObjectByContent(txt);
                              resolve(MODULE_STRING_CACHE_MAP[path])
                          }).catch((e)=>{

                            // console.log('e--------:',e)
                            setTimeout(()=>{
                                if(e instanceof Response){

                                    if(e.status==504){
                                        $bus.emit('B_OMD_TIMEOUT_'+path.split('?')[0],path.split('?')[0])
                                    }else{

                                    }

                                    
                                }
                              reject(e)
                            })

                              
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
                      
                      res = await (await Omd.ScriptLoader.EvalModule(path))()
                      resolve(res)
                      resolveCb(res)
                  } else {
                      setTimeout(async () => {
                          res = await (await Omd.ScriptLoader.EvalModule(path))()
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
              _tag: Omd.ScriptLoader._tag
          };

          for(let i in wrapperedObj){
              prom[i]=wrapperedObj[i]
          }
          prom.wrapperedObj=wrapperedObj
          return prom
      }
      // static arrayMethodKeys=Object.keys(Omd.util.getAllCustomPropsFromClassInstance(Array.prototype))
      static require=(function(){////////core

          let result= function (path) {



              if(Array.isArray(path)){
                  let res=[]
                  path.forEach((row)=>{
  
                      res.push(Omd.ScriptLoader.require(row))
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
                          //     _tag: Omd.ScriptLoader._tag
                          // };

                          // for(let i in wrapperedObj){
                          //     prom[i]=wrapperedObj[i]
                          // }

                          return Omd.ScriptLoader.wrapPromise(prom);
                          
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
  
              // if (this !== Omd.ScriptLoader._lastBindedClass) {
  
              //     Omd.ScriptLoader._count = 0;
              //     setTimeout(() => {
              //         Omd.ScriptLoader._lastBindedClass = null;
              //     })
              // }
              // let _tag = Omd.ScriptLoader._tag;
  
              // Omd.ScriptLoader._lastBindedClass = this;
  
            //   Omd.ScriptLoader._count++
              // let res = {
              //     foo: Math.random()
              // }
  
              let prom; 
              
              
              prom = new Promise(async function (resolve, reject) {
                  
                  try {
                      Promise.resolve().then(()=>{
                        Omd.ScriptLoader.dealyRequire(0, prom, resolve, path)
                      })
                      // setTimeout(() => {
                      
                      
  
                  } catch (e) {
                      console.warn('e---:', e)
  
                  }
              })
              

              let timeoutFn,errorFn;

              Promise.resolve().then(()=>{
                timeoutFn=prom.onTimeout
                errorFn=prom.onError
                $bus.once('B_OMD_TIMEOUT_'+path.split('?')[0],timeoutFn)
                $bus.once('B_OMD_ERROR_'+path.split('?')[0],errorFn)
              })


              
              

              
              prom.finally(()=>{
                  setTimeout(()=>{
                    $bus.off('B_OMD_TIMEOUT_'+path.split('?')[0],timeoutFn)
                    $bus.off('B_OMD_ERROR_'+path.split('?')[0],errorFn)
                  })
                
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

              prom=Omd.ScriptLoader.wrapPromise(prom,path);
              
              
              prom.dealy=Omd.ScriptLoader.requireResWrapper(prom.wrapperedObj,(subResolve,[timeout])=>{
                  clearTimeout(prom.dealyClock)
                  prom.dealyClock = prom.makeTimeout(timeout, (resolveRes) => {
                      subResolve(resolveRes)
                  })
              })

              

            
  
              prom.eq=()=>{
                  return prom;
              }

              
  
  
              
              
  
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
                  await Omd.ScriptLoader.require.nextTick()
                  
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
              // console.log('this.bootstrap-------:',this.bootstrap)
              // if(typeof(this.bootstrap)=='function'){
                  
              //         await this.bootstrap.call(this)
              // }
              
              let obj = Omd.util.getAllCustomPropsFromClassInstance(this, (v, k) => {
                  // alert(k)
                  if (v.prom instanceof Promise && v._tag == Omd.ScriptLoader._tag) {

                      return true;
                  }
                  else if(Array.isArray(v) ){

                      if(v.every((row)=>( row.prom instanceof Promise && row._tag == Omd.ScriptLoader._tag  ))){
                          return true;
                      }
                      
                  }

              })
              let allPaths = Object.values(obj).map(s => s.path);
              let promiseCount = allPaths.length;
              allPaths = [...new Set(allPaths)]
              this.onLoadStart(allPaths.length, allPaths)
              let loadedCount = 0;
              
              for (let k in obj) {
                  
                  let v = obj[k]
                  
                  
                  this.onBeforeEachLoad(v.path)
                  if(Array.isArray(v)){
                      this[k] = await Promise.all(v);
                  }else{
                      try{
                        this[k] = await v.prom;
                      }catch(e){
                        throw e;
                      }
                      
                  }
                  
                  // console.log('v.path-----:',v.path)

                  loadedCount++;
                  // if (!LOADED_MODULE_PATHS.includes(v.path)) {
                  //     alert('h')
                  //     this.onEachLoaded(v.path, this[k])
                  //     LOADED_MODULE_PATHS.push(v.path)
                  // }

                  this.onEachLoaded(v.path, this[k],loadedCount,promiseCount)

                  if (loadedCount == promiseCount) {
                      this.onLoadFinished()
                      if(typeof(this._waitForReadyResolver)=='function'){
                          this._waitForReadyResolver()
                      }
                      delete this._waitForReadyResolver
                      
                  }

              }
          })
          
          // this.bootstrap.call(this)
          



      }
      onLoadStart(totalNum, allPaths) {

          // console.log('load start in super--:',totalNum,allPaths)


      }
      onEachLoaded(path, responseObj) {
          // console.log('each loaded in path of super--:',path)

      }
      onBeforeEachLoad(path){
          // console.log('before each load in super--:',path)
      }
      onLoadFinished() {
        // console.log('all module loaded end')

      }
      onLoadError(err) {

      }
  }

  


 


  if(typeof(window)!='undefined' && typeof(window.require)=='undefined'){
      window.require = Omd.ScriptLoader.require;
  }

  let script=(document.currentScript)
  if(script.getAttribute('init')!=undefined){
      let fun=new Function('return '+(script.getAttribute('entry')||'null')),
      funRes=fun()
      if(funRes){
          let res=await Omd.ScriptLoader.require(funRes)
          console.log('res--------:',res)
          if(DEBUG_MODE){
              window.OMD_ENTRY_RES=res;
          }
      }
  }
  


  

})();