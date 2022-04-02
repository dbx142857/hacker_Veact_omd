module.exports = {
  template: Bue.html`
    <div>
      多次点击增加规则并重新进入页面会发现,规则应用成功的通知只提示了一次,由此可见,针对同一个路由的规则连续声明只有第一次有效.这样做到目的是为了避免引起混乱,让程序的开发更加可控


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
        HACKER.removeHackerRule('/hacker-endless-rule-inserting');">
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
        onReady(){
          Vue.prototype.$message.success('这是新规则第一次被应用成功的提示')
        },
        bindRoute: '/hacker-endless-rule-inserting',
        
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
          
          onReady(){
            Vue.prototype.$message.success('这是新规则第一次被应用成功的提示')
          },
          bindRoute: '/hacker-endless-rule-inserting',
      });




      // Vue.prototype.$message.success('重写成功')
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
