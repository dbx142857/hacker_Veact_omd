module.exports = {
  template: Bue.html`
    <div>
      hacker的replace动态替换功能设计主要初衷是为了替换document.body里任意的已经存在或者还未存在的dom元素
      <br>
      现在,让我们测试一下该功能
      <br>
      首先,你点击增加规则并重新进入本页面
      <br>
      <!-- 然后点击重新进入本路由页面
      <br> -->
      然后你会发现该面包屑菜单被替换了

      <br>
      然而,这并没有结束,离开这个页面到其他页面(你可以点击进入到其他页面),你会发现被"替换"的元素又出来了(<span>这是因为本示例中演示的被替换的目标元素在webapp的一级路由容器之外,
      <br>也就是说它属于一个公共的部分(header),所以其他页面不需要这种被替换的效果就会恢复到初始的效果</span>)
      <br>
      所以,此"魔法"的使用场景在于你要更改某个页面的某一些局部功能,直接隐藏掉其他原油的元素,插入新的元素进行渲染
      <!-- <br>
      注意,该功能不支持手动移除规则,因为在实际开发场景中不需要使用手动移除已添加规则这种骚操作 -->


      <el-alert>本示例中,我们不使用组件替换目标内容,使用模板声明(如下方文本与中代码所示)</el-alert>


      <div>
        <!-- <el-button type="primary" @click="$router.push('/abcdef');">
          跳转到一个不存在的路由
        </el-button> -->
        <!-- <br>
        <br> -->
        <!-- <el-button type="primary" @click="$router.push('/single-jsx-test');$message.info('此时我们可以看到该路由触发了404,命中了vue路由系统的404组件;')">
          跳转到一个不存在的路由
        </el-button> -->
        <el-button type="primary" @click="rewriteAbcdefg();$router.push('/auto-history-back')">
          增加规则并重新进入本页面
        </el-button>
        <el-button type="primary" @click="$router.push('/homepage')">
          进入到其他页面
        </el-button>
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
        <el-button type="primary" @click="$router.push('/auto-history-back');
        HACKER.removeHackerRule('/hacker-replacer-example');">
          移除本页面动态渲染替换规则并重新进入
        </el-button>
        <!-- <el-button type="primary" @click="HACKER.removeHackerRule('/hacker-replacer-example');$router.push('/auto-history-back')">
          移除本页面动态渲染替换规则并进入其他页面
        </el-button> -->

      </div>


      <div>

      <br>
        <br>
              <div>
              重写不存在的路由渲染规则声明如下:
        </div>
        <br>
        <textarea style="
        display: block;
        width: 100%;
        height: 350px;
        " :value="textareaValue">

        </textarea>
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
      window.open('./static-files/hackService/hacker-component-example.jsx?r=2021-05-10')
    },
    rewriteAbcdefg(){
      

      HACKER({
          replacer: [
              {
                  target: 'nav',
                  render(){
                    return Bue.html`<div style="color:red;">新菜单1/新菜单1-1-看到效果了没亲</div>`
                  }
              }
          ],
          bindRoute: '/hacker-replacer-example',
      });




      Vue.prototype.$message.success('重写成功')
      this.rewrited=true;
      // this.$router.push('/hacker-route-example?writed=1')

    }
  },
  beforeRouteEnter(){
    alert('yes')
  },
  mounted(){
    
  }
};
