module.exports={
  template:Bue.html`
    <div>
  <el-row>
    <el-col :span="16">
    <div>
    <ol>
      <li v-for="item in hackerRoutes">
        <router-link :to="item.path">
        {{item.rowPathParams[0].trim().endsWith('-not ready')?'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;':''}}{{item.rowPathParams[0]}}
        </router-link>
      </li>
      
    </ol>
  </div>
    </el-col>
    <el-col :span="8">
    注意:本教程的难度从入门到高级,请读者按照从上到下的顺序一次阅读,否则乱序看可能造成理解困难
    <br>
    <el-alert type="error">
      重要说明:本教程属于一个基于vue框架进行演示hacker框架于vue框架结合使用的例子,hacker的核心功能之一-动态替换,总是后于其他框架的路由变更执行
      <br>,
      这是由于hacker框架的设计理念就是如此,正是因为这样,才能保证最终使用hcaker渲染出正确的效果而不去关心其他框架干了什么事儿.
      <br>
      但是,每一个hacker的规则都是可以添加和移除的,hacker框架本身不会在任何时候自动移除任何已经添加的规则;
      <br>
      本教程里,个别章节提供了移除hacker规则的示例,其他绝大部分的章节在第一次进入介绍页之后并不会立即加载hacker规则,均需要读者自助的点击加载hacker组件去查看效果,敬请知晓!
    </el-alert>
    </el-col>
  </el-row>


    
  
  </div>
  `,
  data(){
    return {
      hackerRoutes:Bue.routeConfigs.filter(s=>s.rowPathParams!=null && !Bue.s.hasParamInRouteConfig(s,'hideThis'))
    }
  },
  mounted(){
  }
}