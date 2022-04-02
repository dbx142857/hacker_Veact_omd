module.exports = {
  template: Bue.html`
    <div>
      这个页面用来测试基于hacker.js的路由
      <br>
      请老铁先点击跳转到一个不存在的路由,然后再回来
      <br>
      然后点击重写不存在的路由渲染规则
      <br>
      然后再点击跳转到一个不存在的路由,然后你会发现router-view区域加载了你指定的hacker组件
      <br>
      然后可以移除/abcdef动态路由渲染规则,然后点击跳转到一个不存在的路由,你会发现动态渲染的路由效果就没了


      <div>
        <el-button type="primary" @click="$router.push('/abcdef');">
          跳转到一个不存在的路由
        </el-button>
        <!-- <br>
        <br> -->
        <!-- <el-button type="primary" @click="$router.push('/single-jsx-test');$message.info('此时我们可以看到该路由触发了404,命中了vue路由系统的404组件;')">
          跳转到一个不存在的路由
        </el-button> -->
        <el-button type="primary" @click="rewriteAbcdefg()">
          重写一个不存在的路由渲染规则:/abcdef
        </el-button>
        <br>
        <br>
        <el-button type="primary" @click="viewJsxFileContent()">
          查看hacker-component-example.jsx文件的内容
        </el-button>
        <!-- <br>
        <br> -->
        <el-button type="primary" @click="HACKER.removeHackerRule('/abcdef')">
          移除/abcdef动态路由渲染规则
        </el-button>

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
              //指定任意一个可以被找到的dom目标进行替换或重绘,在模拟路由库效果时,此处的target要指定项目负责渲染路由的dom元素
                target: '.bue-app-router-view',
                //保留目标,这样会将目标dom里的内容替换为组件解析后的内容
                preserveTarget:true,
                //要加载的组件
                component: './jike_workspace/vm/hacker-components/hacker-component-example.jsx'
            }
        ],
        //指定对哪一个路由起作用
        bindRoute: '/abcdef',
    });
      `
    };
  },
  methods:{
    viewJsxFileContent(){
      window.open('./jike_workspace/vm/hacker-components/hacker-component-example.jsx?r=2021-05-10')
    },
    rewriteAbcdefg(){
      

      HACKER({
          replacer: [
              {
                  target: '.bue-app-router-view',
                  preserveTarget:true,
                  component: './jike_workspace/vm/hacker-components/hacker-component-example.jsx'
              }
          ],
          bindRoute: '/abcdef',
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
