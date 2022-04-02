module.exports={
  template:Bue.html`
    
  <div>



  



  <br>
  <el-alert type="error">
    红色区域内容为hacker组件渲染区域,其他的为vue组件,二者不可以互相调用
  </el-alert>


  <el-alert>
            data-hacker本身是一个内置指令,其语法要求声明一个可以被JavaScript读取的对象类型的值(表达式要以{开头且以为}结尾))
        </el-alert>
        <br>
        <el-alert>
            data-hacker的预置指令值参考下列表格,除了这些可以被框架解析生效的字段,您还可以添加任意多的字段,最终这个对象可以通过dom元素的hackerDefine属性访问到
        </el-alert>

        <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="attr"
        label="属性"
        width="180">
      </el-table-column>
      <el-table-column
        prop="v"
        label="可取值""
        width="180">
      </el-table-column>
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
        <el-alert>
        在这个对象定义中,值可以使用this.xx的形式访问对应的viewmodel的data里定义好的数据<br>
        例如,加入你声明了一个data-hacker="{foo:this.foo}",那么此处的this指向的就是对应hacker组件的data属性
        </el-alert>


        <br>
        <el-alert type="error">
        注意:data-hacker里定义的所有使用到了this.xx的属性,他们是不具备相应式的,也就是说即便this.xxx发生了变化,data-hacker里对应的属性也不会被再次解析
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
  data(){
    return {
      tableData: [
      {
        attr: 'cloak',
        v: 'true或者false(boolean类型)',
        desc: '若为false则无意义,为true,则在hacker组件编译解析阶段不可见,一直到hacker规则完全生肖后才可见'
      },
      {
        attr: 'hide',
        v: 'true或者false(boolean类型)',
        desc: '若为false则无意义,为true,则该指令绑定的元素始终属于display:none状态'
      },
      {
        attr: 'transparent',
        v: 'true或者false(boolean类型)',
        desc: '若为false则无意义,为true,则该指令绑定的元素始终属于opacity:0状态,即完全透明但是其对应的位置依然被它所占据'
      },
      {
        attr: 'group',
        v: 'string类型的任意值',
        desc: '服务于ref(请参考[hacker组件-指令系统-ref的使用])'
      },
      {
        attr: 'id',
        v: 'string类型的任意值',
        desc: '服务于ref(请参考[hacker组件-指令系统-ref的使用])'
      },
      {
        attr: 'ref',
        v: 'string类型的任意值',
        desc: '服务于ref(请参考[hacker组件-指令系统-ref的使用])'
      },
    
    ]
    }
  }
}