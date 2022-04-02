
return {
    template: html`
    <div style="border:dashed 5px red;">
      
       <div class="example-basic-info">
           show演示:
           <button data-hacker-show="{this.isShow}">show demo</button>
           <button data-hacker @click="this._data.isShow=!this._data.isShow">toggle 是否show</button>
       </div>


       
    
    
    </div>
    `,
    methods:{
        
    },
     styles(){
        return createGlobalStyle`
            .example-basic-info{
                color:red;
            }
            .example-basic-info-green{
                color:green;
            }
        `
    },
    data() {

        return {
            isShow:true           
        }
    }
}