module.exports = {
  template: Bue.html`
    <div>
      <!-- this is hacker loader with btn -->



      
        <el-button type="primary" @click="loadHackerComp();$router.push('/auto-history-back')">
          加载hacker组件并查看代码
        </el-button>

       


    </div>
  `,
  
 
};
