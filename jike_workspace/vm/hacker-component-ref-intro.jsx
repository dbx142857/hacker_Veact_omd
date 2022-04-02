module.exports={
  template:Bue.html`
    
  <div>


  <br>
  <el-alert type="error">
    红色区域内容为hacker组件渲染区域,其他的为vue组件,二者不可以互相调用
  </el-alert>


  <el-alert>
            data-hacker本身是一个内置指令,关于它的介绍,请参考下一篇
        </el-alert>
        <br>
        <el-alert>
            为组件的根元素(root元素)添加ref无效,因为跟元素可以直接通过this.$el访问
        </el-alert>


        <br>
        <el-alert>
        说明:重复定义,后者会覆盖前者,若想访问到某几个ref集合的对象,请使用'__LIST^' + group的值
        </el-alert>

  <br>

  <el-button @click="viewCode">
        查看本组件代码</el-button>

    <br>
    
    

       
        

  </div>
  `,
  styles() {
    return {
      ".example-basic-info-green": {
          'font-size':'1.5em',
          color:'purple'
      },
      "&": {
        color: "blue"
      }
    };
  },
}