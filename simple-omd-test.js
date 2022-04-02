Omd.GLOBAL_TIMEOUT=100

@Import(abc)
class {
    g = require('./garbage-require-test1')
    cInA = require('./c-in-a').dealy(1000)
    g2 = require('./garbage-require-test')
}
@Import(def)
class {
    p = require('http://unpkg.com/vconsole@3.9.1/dist/vconsole.min.js')
    q=require('./你是我的小丫小苹果')
}

def.p.onTimeout = (path) => {
    console.error('def.p timeout,path is--:',path)
}

def.q.onError=(e,path)=>{
    console.error('def.q error',e,path)
}

abc.g.onTimeout = () => {
    console.log('abc.g timeout')
}

abc.onLoadStart = function (totalNum, allPaths) {
    console.log('load start in superrrrrrrr--:', totalNum, allPaths)
}

abc.onEachLoaded = function (path, responseObj, loadedCount, totalcount) {
    console.log('each loaded in path of super--:', path, responseObj, loadedCount, totalcount)

}
abc.onBeforeEachLoad = function (path) {
    console.log('before each load in super--:', path)
}
abc.onLoadFinished = function () {
    console.log('all module loaded end')

}
module.exports = {
    abc: abc
}
