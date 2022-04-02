
return {
    template: html`
    <div style="border:dashed 5px red;">
        这是一个基本的hacker组件
        <br>
        hello,<span data-hacker-html="{this.world}"></span>

        <div class="example-basic-info">
            红颜色测试
        </div>
        <br>
        <div class="example-basic-info-green">
        绿颜色测试
        </div>

    
    
    </div>
    `,
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
            world:'word string',
            
        }
    }
}