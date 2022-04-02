(function () {
  return async function () {
    let module = {}; let require = Omd.ScriptLoader.require;

    ;; let s; s = (this || {})['s'] = new class extends Omd.ScriptLoader {
      child = require('./garbage-require-test1-child')
    }
    module.exports = {
      foo: 'bar-test111111',
      s: s.child
    }


    await Omd.ScriptLoader.require.nextMacroTick();




    (Omd.ScriptLoader.isPureObj(module.exports)) && (module.exports = await Omd.ScriptLoader.updateExportsValueByItself(module.exports));



    if (!Omd.ScriptLoader.checkExportValueType(module.exports)) { return false; }




    ; try {
      (Omd.LOADED_MODULE_INFO.MODULE_RESULT_CACHE_MAP["./garbage-require-test1.js?r=2021-08-10"].tempResolveForModuleResultCacheMap || (() => void 0))(module.exports);

      ; delete Omd.LOADED_MODULE_INFO.MODULE_RESULT_CACHE_MAP["./garbage-require-test1.js?r=2021-08-10"].tempResolveForModuleResultCacheMap;
    } catch (e) { };

    ; Omd.LOADED_MODULE_INFO.MODULE_RESULT_CACHE_MAP["./garbage-require-test1.js?r=2021-08-10"] = module.exports;

    return module.exports;
  }
})();