
return {
    template: html`
    <div style="border:dashed 5px red;">
      
       <div data-hacker-class-example-basic-info="{this.isRed}">
           红色的演示
           <button data-hacker @click="this._data.isRed=!this._data.isRed">toggle 红色</button>
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
        `
    },
    data() {

        return {
            isRed:false           
        }
    }
}