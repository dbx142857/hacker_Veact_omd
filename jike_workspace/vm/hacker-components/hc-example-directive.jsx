
return {
    template: html`
    <div></div>
    <!-- <div style="border:dashed 5px red;">
      
       本章节属于理论课,暂不提供交互性demo


       
    
    
    </div> -->
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