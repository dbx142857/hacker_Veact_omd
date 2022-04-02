module.exports = {
  template: Bue.html`
    <div>
      


      <div>

      <el-alert type="error">
          hacker组件是一种类似于vue的组件,符合目前主流的mvvm框架的组建化开发的组件设计思想,遵守view=f(data)的公式以及支持scopeed style
      </el-alert>
        
      <br>


      <el-alert type="error">
          它的设计初衷是为了在一些开发体验比较糟糕的项目里使用,比如老旧的使用原生js或者jquery的项目,以及其它非主流mvvm框架的项目里可以使用hacker组件于其他框架协作使用.甚至在任意一个项目里都可以和hacker组件协作使用
      </el-alert>
        
      <br>

        <el-button type="primary" @click="rewriteAbcdefg();$router.push('/auto-history-back')">
          加载hacker组件并查看代码
        </el-button>

        <br>
        <br>

      <!-- <el-alert type="error">
          请注意,在接下来的几个教程里,你只需要关心每一个教程表达的核心意思,查看代码时不需要对每一行做出十分精确的理解.对于代码中出现的一些关键字或者没有提到的方法
          ,会在hacker组件-总结里展开讨论
      </el-alert> -->

        <!-- <el-button type="primary" @click="$router.push('/homepage')">
          进入到其他页面
        </el-button> -->
        <br>
        <br>
        <!-- <el-button type="primary" @click="viewJsxFileContent()">
          查看hacker-component-example.jsx文件的内容
        </el-button> -->
        <!-- <br>
        <br> -->
        <!-- <el-button type="primary" @click="$router.push('/auto-history-back')">
          重新进入本路由页面
        </el-button> -->
        <!-- <el-button type="primary" @click="HACKER.removeHackerRule('/hacker-replacer-example')">
          移除本页面动态渲染替换规则
        </el-button> -->

      </div>


      <div>

      <br>
        <br>
              <div>
              <!-- 重写不存在的路由渲染规则声明如下: -->
        </div>
        <br>
        <!-- <textarea style="
        display: block;
        width: 100%;
        height: 350px;
        " :value="textareaValue">

        </textarea> -->
      </div>

      


    </div>
  `,
  data() {
    return {
      rewrited:false,
      textareaValue:`


      HACKER({
        replacer: [
            {
              //指定任意一个可以被找到的dom目标进行替换或重绘
                target: 'nav',
                //这次不加载组件了,使用模板函数声明返回dom元素
                render(){
                  return '<div style="color:red;">新菜单1/新菜单1-1-看到效果了没亲</div>'
                }
            }
        ],
        //指定对哪一个路由起作用
        bindRoute: '/hacker-replacer-example',
    });
      `
    };
  },
  methods:{
    viewJsxFileContent(){
      window.open('./jike_workspace/vm/hacker-components/hacker-component-example-ref.jsx?r='+Math.random())
    },
    rewriteAbcdefg(){
      

      HACKER({
          replacer: [
              {
                  target:  '.bue-app-router-view',
                  preserveTarget:true,
                  component:'./jike_workspace/vm/hacker-components/hacker-component-example-ref.jsx'
                  // render(){
                  //   return Bue.html`<div style="color:red;">新菜单1/新菜单1-1-看到效果了没亲</div>`
                  // }
              }
          ],
          bindRoute: '/hacker-component-ref',
      });




      Vue.prototype.$message.success('重写成功')
      this.rewrited=true;
      // this.$router.push('/hacker-route-example?writed=1')

    }
  },
  
  // computed:{
  //   isHackerLoaded(){
  //     alert('yes')
  //     return this.bueStore.hackerEvents.hasOwnProperty('B_PUSH_STATE'+HACKER.generateUniqueKeyByPathName('/'+this.bueOptions.name))
  //   }
  // }, 
  mounted(){
    
  }
};
