/**
 * 
 * require apis:
 * require(string)
 * require(string array)
 * require(string).dealy
 * require(striing array).eq(Integer)
 * 
 * 
 * 
 * 最佳实践:
 * 1
 * let [a,b]=await require(['./import-test','./import-test1'])
 * 
 * also can do like this:
 * 'map slice splice sort reverse concat filter'
 * require(['xxxx','xxxx','xxxx','xxxx','xxxx','xxxx']).slice()
 * require(['xxxx','xxxx','xxxx','xxxx','xxxx','xxxx']).map()
 * require(['xxxx','xxxx','xxxx','xxxx','xxxx','xxxx']).splice()
 * require(['xxxx','xxxx','xxxx','xxxx','xxxx','xxxx']).sort()
 * require(['xxxx','xxxx','xxxx','xxxx','xxxx','xxxx']).reverse()
 * require(['xxxx','xxxx','xxxx','xxxx','xxxx','xxxx']).concat()
 * require(['xxxx','xxxx','xxxx','xxxx','xxxx','xxxx']).filter()
 * 
 * 2
 * let [a,b,c]=Promise.all([
                            require('./c-in-a-a'),
                            require('./c-in-a-b'),
                            require('./c-in-a-c')
                        ])
 * 
 * 
 * 
 * 
 * 
 * 语法和钩子函数
 * 1 @Import(变量名字)
 * 2 bootstrap in class
 * 3 loadStart(totalNum, allPaths) {  }
            beforeEachLoad(path){}
            eachLoaded(path, responseObj) { }
            loadFinished() { }
            loadError(err) { }

    4 @import() class inner @imoort() class

    5 ready method in class instance

    


 */


console.log('thisssssss-------:',this)


console.log('hello world in import test')
@Import(a)
class {

    abcdefg='abcdefggggggggg'
    g = require('./garbage-require-test1')
    bootstrap  () {
        @Import(b)
        class {
            bootstrap() {
                @Import(c)
                class {
                    cInA = require('./c-in-a').dealy(1000).eq(0)
                    
                    async bootstrap() {
                        this.cInA1=require('./c-in-a-1').eq(0)


                        this.cInA2=require([
                            './c-in-a-1',
                            './c-in-a-1',
                            './c-in-a-1',
                            './c-in-a-1',
                            './c-in-a-1'
                        ]).slice(1,3)

                        this.cInA3=[
                            require('./c-in-a-1'),
                            require('./c-in-a-1'),
                            require('./c-in-a-1'),
                            require('./c-in-a-1'),
                            require('./c-in-a-1')
                        ]

                        this.cInA4=require('./c-in-a-1')

                                     
                    }
                    
                }
            }
            g1 = require('./garbage-require-test')
            g2 = require('./garbage-require-test')
            loadStart(totalNum, allPaths) {  }
            beforeEachLoad(path){}
            eachLoaded(path, responseObj) { }
            loadFinished() { }
            loadError(err) { }
        }
        
    }
    
}
// Object.getPrototypeOf(dd).constructor===Object



// module.exports={
//     a:a,
//     g:a.g
// }



a.b.c.ready().then(()=>{
    console.log('a.b.c ready ')
})






module.exports ={
    g:a.g,
   promiseTest:new Promise((resolve)=>{
       setTimeout(()=>{
        resolve('promise timeout  test ')
       },3000)
   }),
    f:{
        foo:'bar',
        foo1:'bar1',
        foo2:'bar2',
    },
    cInA3:a.b.c.cInA3,
    cInA4:a.b.c.cInA4,
    cInA1:a.b.c.cInA1,
    inner1:{
        abcdefg: a.abcdefg,
        inner2:{
            cInAaaaaaaa: a.b.c.cInA,
            cInA1:a.b.c.cInA1,
        },
        g1FromB: a.b.g1,
        
    },
    
    cInA2:a.b.c.cInA2,
    self: 'yes',
    a:a
}