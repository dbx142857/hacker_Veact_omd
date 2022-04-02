module.exports={
  template:Bue.html`
    
  <div>


  <br>
  <el-alert type="error">
    红色区域内容为hacker组件渲染区域,其他的为vue组件,二者不可以互相调用
  </el-alert>

  <br>

  <el-button onclick="window.open('./jike_workspace/vm/hacker-components/hacker-component-example-basic.jsx')">
        查看本组件代码</el-button>

    <br>
    
    <br>
        <div class="example-basic-info-green">
        所有data-hacker-开头的为hacker.js的内置指令,一个mvvm框架离不开一些常用的合理的内置指令
        </div>


        <br>
        <div class="example-basic-info-green">
        代码中开头的return关键字的意义在于,在return之前你可以定义任意逻辑,最终整个一个文件会被框架当成一个方法,通过hacker的组件加载器生成一个组件
        </div>
    
    <br>

        <div class="example-basic-info">
            示例代码中的html关键字的意义仅仅是为了让装了对应高亮插件的vscode这种ide识别,插件名字:lit-html
        </div>
        <br>
        <div class="example-basic-info-green">
        示例代码中的createGlobalStyle关键字的意义仅仅是为了让装了对应高亮插件的vscode这种ide识别,插件名字:Styled Components Snippets
        </div>

        <br>
        <div class="example-basic-info-green">
        样式里面的字符串仅仅支持javascript的api-CSSStyleSheet.prototype.addRule可以支持的字符串,若无法被该方法解析则会报错
        </div>

        <br>
        <div class="example-basic-info-green">
        暂不支持类似vue一样的{{}}表达式,如果需要为某个元素通过数据渲染内容,使用 data-hacker-html="{this.world}" 之类的代码描述
        </div>
        

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