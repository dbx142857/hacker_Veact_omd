module.exports={
  template:Bue.html`
    
  <div>

  <!-- <el-alert>

    注意:show和if的区别:if表达式为false会直接销毁其绑定的元素,而show表达式为false时只是隐藏其绑定的元素
  </el-alert> -->



  <!-- <div class="example-basic-info-green">
           if演示:
           <button data-hacker-show="{this.ifLoad}">show demo</button>
           <button data-hacker @click="this._data.ifLoad=!this._data.ifLoad">toggle 是否show</button>
       </div> -->


  <el-alert>

data-hacker-model是一个真正的完全的双向绑定的指令,可以用在具备value属性的html标签上.
<br>
初始值的显示可以通过data-hacker-model指定的属性表达式的值进行显示,同时如果你在程序运行的任何时候更改了这个值,只要对应的dom元素还在body里,就会自动把自己的value更改为对应的值
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