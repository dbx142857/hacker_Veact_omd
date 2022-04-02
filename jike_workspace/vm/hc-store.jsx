module.exports={
    template:Bue.html`
      
    <div>



    <el-alert type="error">
        关于$store的介绍如下,请君鉴赏:
    </el-alert>

    <iframe
    style="display:block;height:400px;width:100%;border:none;box-sizing:border-box;"
    
    
    src="https://www.yuque.com/docs/share/1d94409a-262e-4c7a-ad3a-269bc55704f8?# 《全局数据仓库-HACKER.$store介绍》"></iframe>
  
    <!-- <el-alert>
  
      注意:show和if的区别:if表达式为false会直接销毁其绑定的元素,而show表达式为false时只是隐藏其绑定的元素
    </el-alert> -->
  
  
  
    <!-- <div class="example-basic-info-green">
             if演示:
             <button data-hacker-show="{this.ifLoad}">show demo</button>
             <button data-hacker @click="this._data.ifLoad=!this._data.ifLoad">toggle 是否show</button>
         </div> -->
  
  
    <!-- <el-alert>
  
  data-hacker-show指令接收一个以{开头且以}结尾的表达式,若表达式里饮用了组件定义的data里的属性,则在该1个或多个属性发生变化的时候会重新触发表达式计算;
  <br>
  若表达式计算结果为true,则该元素可见;否则该元素不可见
  </el-alert> -->
  
    <br>





    <el-button type="primary" @click="loadHackerComp();$router.push('/auto-history-back')">
          加载hacker组件并查看代码
        </el-button>
  
    <!-- <el-button @click="viewCode">
          查看本组件代码</el-button>
  
      <br> -->
      
      
  
         
          
  
    </div>
    `,
    
  }