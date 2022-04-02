
return {
    template: html`
    <div style="border:dashed 5px red;">
      
        <div data-hacker="{ref:'abc'}" class="example-basic-info">
           关于ref的使用此处不在演示,请参考[hacker组件-指令系统-ref的使用]
        </div>
        <br>


        <div data-hacker="{cloak:true}">
            这里声明了cloak:true,在本控件里你可能感受不到它的作用,因为加载很快<br>
            
            在一个大型的项目里,逻辑复杂,可能会看到闪烁<br>
            .在单页面应用里,路由切换过程中,如果你使用hacker.js配合其他框架一起用,<br>
            且只使用hacker的局部替换功能替换掉目标元素,如果你想在其他框架渲染完成之后hacker渲染完成之前,让和目标元素有关联的元素暂时不可见,
            那么可以使用cloak属性<br>
            请注意cloak声明的元素的作用时机仅限于:<b>其他框架渲染完成之后hacker渲染完成之前</b>
        </div>
        

        <div data-hacker="{id:'abcd'}" class="example-basic-info" style="border:dashed blue 2px;">
            在这个蓝色区域内包含了一个声明了transparent:true的元素,其内容为aaaa,由于只是透明化,所以依然会占据位置,可以看到bbb内容显示不是紧挨着这句话
            <div data-hacker="{transparent:true}">
                aaaaaaa
            </div>
            <div>
                bbbbbb
            </div>
        </div>
        <br>

        <div data-hacker="{id:'abcd'}" class="example-basic-info" style="border:dashed purple 2px;">
        在这个粉色区域内包含了一个声明了hide:true的元素,其内容为cccccccc,可以看到它完全被display:none了,所以dddd这个div是紧挨着这句话的
            <div data-hacker="{hide:true}">
                cccccccccccccc
            </div>
                <div>
                    dddddddd
                </div>
        </div>
        <br>


        <div id="abcde" class="example-basic-info">
            <button data-hacker="{foo:this.foo}" @click="handleBtnClick" 
            style="transform:scale(1.3);margin-left:20%;cursor:pointer;">一个演示data-hacker
            里可以自定义任意属性且可<br>以使用this关键字访问viewmodel的按钮,请点击我查看控制台</button>
        </div>
        <br>


        

       
        

        
    
    
    </div>
    `,
    methods:{
        handleBtnClick(){
            console.log('这里触发了一个点击事件,有一个唯一的参数:event,打印出来是',arguments[0]);
            console.log('--------------------')
            console.log('使用event.target获取到绑定元素后打印其hackerDefine属性',event.target.hackerDefine)
            console.log('----------')
            console.log('打印出viewmodel的data属性',this.data)
            console.log('-----------')
            console.log('打印出完整的viewmodel--:',this)
        }
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
            foo:'i am foo',
            world:'word string',
            
        }
    }
}