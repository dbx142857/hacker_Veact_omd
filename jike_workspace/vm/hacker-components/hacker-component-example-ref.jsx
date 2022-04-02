
return {
    template: html`
    <div style="border:dashed 5px red;">
        
        <br>
        hello,<span data-hacker-html="{this.world}"></span>

        <div data-hacker="{ref:'abc'}" class="example-basic-info">
            ref写法1: data-hacker="{ref:'abc'}",访问this.$refs.abc可以得到这个div元素
            <div style="color:green;">
                同时,通过访问this.$refs.abc.hackerDefine可以得到
            </div>
        </div>
        <br>
        

        <div data-hacker="{id:'abcd'}" class="example-basic-info">
            ref写法2:  data-hacker="{id:'abcd'}",访问this.$refs.abcd可以得到这个div元素
        </div>
        <br>


        <div data-hacker id="abcde" class="example-basic-info">
            ref写法3:  data-hacker id="abcde",访问this.$refs.abcde可以得到这个div元素
        </div>
        <br>

        <div data-hacker="{group:'group1',ref:'abcdef'}" class="example-basic-info">
            ref写法4:   data-hacker="{group:'group1'}" id="abcdef",访问this.$refs['__LIST^group1']
            可以得到所有group为group1的元素,前提是对应元素有id这个属性或者data-hacker里有ref属性,<br>
            使用this.$refs.group1_abcde可以得到当前这个div元素
        </div>
        <br>
        

        
    
    
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