
return {
    template: html`
    <div style="border:dashed 5px red;">
      
       <div data-hacker-css="{this.cssText}">
           css的演示,此处使用的csstext字符串为color:red;font-size:2em;
           <!-- <button data-hacker @click="this._data.isRed=!this._data.isRed">toggle 红色</button> -->
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
            cssText:'color:red;font-size:2em;'         
        }
    }
}