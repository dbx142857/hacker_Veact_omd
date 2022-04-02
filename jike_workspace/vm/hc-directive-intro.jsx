module.exports={
  template:Bue.html`
    
  <div>


  <el-alert>
    指令语法规则:指令需要以data-hacker-开头,属性值为一个以{开头且以}结尾的一个表达式,这个表达式必须是合法的javascript表达式
    <br>
    表达式内部引用的this指向组件的data对象
  </el-alert>


  目前hacker.js内置的指令和意义如下(关于指令单取值与详细解释,请参考每个指对应的章节,此章节不对每一个做详细介绍):
  




        <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="attr"
        label="属性"
        width="180">
      </el-table-column>
      <!-- <el-table-column
        prop="v"
        label="可取值""
        width="180">
      </el-table-column> -->
      <el-table-column
        prop="desc"
        label="释义">
      </el-table-column>
      <!-- <el-table-column
        prop="address"
        label="地址">
      </el-table-column> -->
    </el-table>



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
  data(){
    return {
      tableData: [
      {
        attr: 'data-hacker',
        v: 'true或者false(boolean类型)',
        desc: '一个对象集合,可以用来定义各种属性,通过对应dom元素的hackerdefine属性可以访问到该对象'
      },
      {
        attr: 'data-hacker-show',
        v: 'true或者false(boolean类型)',
        desc: '控制元素的显示和隐藏'
      },
      {
        attr: 'data-hacker-class-xxx',
        v: 'true或者false(boolean类型)',
        desc: 'xxx为一个合法的元素的classsname,该指令用于控制元素是否拥有该class name'
      },
      {
        attr: 'data-hacker-css',
        v: 'string类型的任意值',
        desc: '控制该元素的cssText'
      },
      {
        attr: 'data-hacker-teleport',
        v: 'string类型的任意值',
        desc: '传送门组件,用于将绑定的元素挂在到其他任意一个元素上'
      },
      {
        attr: 'data-hacker-model',
        v: 'string类型的任意值',
        desc: '用于表单input等元素的双向数据绑定指令'
      },

      ,{
        attr:'data-hacker-html',
        desc:'控制元素的innerHtml'
      }
      ,{
        attr:'data-hacker-text',
        desc:'控制元素的innerText'
      }
      ,{
        attr:'data-hacker-xxx',
        desc:'xxx为一个任意一个名字的属性,用于为对应的元素绑定xxx属性,例如在一个button组建上声明data-hacker-disabled则可以控制其是否disabled'
      }
    
    ]
    }
  }
}