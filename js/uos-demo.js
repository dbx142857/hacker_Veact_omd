import uos from './uos.js'

class test1 extends uos.component{
    rendered(){
        window.test1=this
    }
    html(){
        return `<span style="color:blue;"><br> i am a test1 comp instance,value 
          of the key-foo of the $parent component is:<br> ${this.$parent.props.foo}</span>`
    }
}

let {createGlobalStyle,html}=uos,
    
compDefine=class demo1 extends uos.component{
    components={
        test1
    }
    props(){
        return {
            json:[
                {name:'name1',childs:[
                    {
                        name:'name1-childs',childs:[
                            {
                                name:'name1-childs-childs'
                            }
                        ]
                    }
                ]},
                {name:'name2'},
                {name:'name3'},
            ],
            foo:'world',
            bar:'this is a bar'
        }
    }
    test1(data){
        data=data||this.props.json;
        return uos.html`
            <ul>
                ${data.map((v,k)=>uos.html`

                <li ref="li-${v.name}-${k+1}" @click="handleBtnClick">
                
                ${v.name}

                ${
                    v.childs?this.test1(v.childs):''
                }
                
                </li>`

                ).join('<br>')}

            </ul>
        `
    }
    test2(){
        return '<span>hello world</span>'
    }
    html(){
        return html`<div>
            <span ref="redSpan" class="red">hello ${this.props.foo}
            <br>
            <button @click="handleBtnClick">i am a button</button>

            <button ref="myBtn" @click="console.log(this.$refs)">打印$refs</button>

<br>
下面是一个懒加载的插槽
            <slot lazy name="slot1" html="test1"></slot>

            <button @click="this.renderSlot('slot1')">update slot content</button>

<br>
下面是一个立即加载的使用其他组件进行渲染的插槽:
            <slot name="renderTest1" html="test2"></slot>
        </span>
        <button @click="this.$el.parentNode.removeChild(this.$el)">销毁组件</button>
            </div>`
    }
    async beforeRender(){
        console.log('i am beforeRender',1)
        return new Promise((resolve)=>{
            setTimeout(()=>{

                this.props.foo='this world'

        
                resolve();
            },100);
        })
    }
    events={
        updateSlotContent(){
            this.renderSlot('slot1')
            
        },
        handleBtnClick(e){
            console.log('e-:',e)
            alert('123')
        }
    }
    rendered(){
        window.abc=this;
        console.log('i am rendered',2)
        this.registerGlobalEvent('B_TEST',()=>{
            alert('B_TEST')
        })
    }
    beforeDestroy(){
        console.log('will unmont')
    }
    destroyed(){
        console.log('destroyed')
    }
    styles(){
        return createGlobalStyle`
            &{
                border:solid 1px green;

                margin-top:200px;
            }
            &:hover{
                /* border:solid 1px green; */
                color:pink;
            }
            .red{
                color:red;
            }
        `
    }
};


window.setTimeout(()=>{
    uos.use(compDefine)
    .load(compDefine).$renderTo('#app');
},300)


// uos(compDefine).$renderTo('#app');




    // features:

    // 允许在一段连续的代码块中同时对组件的结构,样式和行为进行定义
    // 包含beforeRender和rendered的生命周期机制
    // 可以使用es6模板字符串语法实现对模板的渲染
    // 支持scoped style
    // 支持通过ref快捷的访问目标元素
    // 支持在html中直接定义可以访问到组件js实例的事件声明或者事件表达式
    // 支持在渲染模板之前使用异步方法更改数据
    // 支持用于加载html代码片段的立即加载的插槽和懒加载的插槽

    // 支持用于加载子组件的插槽机制并建立父子关系

    // 1 为什么html=一个类就可以加载出来一个子组件
    // 2 html="test1",而test1和html代码不在一个作用域里,为何能访问的到----桥梁-全局组件机制
    //3 为什么html可以等于两种不同的东西/两种不同的东西优先级问题/


    // 1 一种组件加载机制
    // 2 父子组件的实现以及互相访问
    // 3 ref机制
    // 4 ref属于内置指令,那么支持多少个内置指令,内置指令的解析方式
    // 5 scoped style实现原理
    // 6 声明周期的原理

    // 流程:
        // 1 定义组件
        // 2 加载组件
        //     2.1 解析组件
        //         2.1.1解析指令
        //         2.1.3 解析事件
        //     2.2 实例化
        //     解析生命周期机制
        // 3 渲染组件:挂在组建到目标元素里



    // lazy->slot
    // html->slot
    // ref->任意元素
    // @xxx->事件->任意元素



    
    

    

    // 典型应用场景:
    // 在原生js项目里使用

    


    // 为什么使用static声明/软件设计六大原则之最少知识原则
    
    // 模拟多重继承
    // 自动回收垃圾
    // 无限级嵌套列表渲染
    // 父组件中声明需要用的子组件


    // 好习惯之容易变化的代码放在一块儿写
    // 使用es6module