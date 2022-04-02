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

data-hacker-class的使用需要在data-hacker-class后面拼接上一个中划线加上需要添加或者移除的class名字,然后data-hacker-class-后面的字符串会作为className
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