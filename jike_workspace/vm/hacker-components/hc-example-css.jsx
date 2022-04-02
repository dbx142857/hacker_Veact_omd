
return {
    template: html`
    <div style="border:dashed 5px red;">
      
       <div class="example-basic-info">
            <span data-hacker-html="{this.htmlStr}">
            </span>
            <br>
            这里演示为上面的span元素设定html
       </div>
       <div class="example-basic-info">
            
            
            这里演示为下面的span元素设定text
            <br>
            <span data-hacker-text="{this.textStr}">
            </span>
       </div>


       
    
    
    </div>
    `,
    methods:{
        
    },
     styles(){
        return createGlobalStyle`
            .example-basic-info{
                color:red;
                border:dashed 2px blue;
            }
        `
    },
    data() {

        return {
            htmlStr:'<button>你是我的小丫小苹果-html</button>',    
            textStr:'<button>你是我的小丫小苹果-text</button>',    
        }
    }
}