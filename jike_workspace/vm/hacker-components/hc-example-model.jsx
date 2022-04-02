
return {
    template: html`
    <div style="border:dashed 5px red;">
      
      <div class="example-basic-info">
        普通input演示-绑定了的normalTextValue
        <input data-hacker-model="{this.normalTextValue}"/>
        <button data-hacker @click="modifyNormalTextValue">
            更改normalTextValue属性的值
        </button>
      </div>


      <div class="example-basic-info">
        textarea演示-绑定了的textareaValue
        <textarea data-hacker-model="{this.textareaValue}"></textarea>
        <button data-hacker @click="modifyTextareaValue">
            更改绑定了的textareaValue属性的值
        </button>
      </div>


      <div class="example-basic-info">
        select演示-绑定了的selectValue
        <select data-hacker-html="{this.selectHTML}" data-hacker-model="{this.selectValue}"></select>
        <button data-hacker @click="modifySelectValue">
            更改绑定了的selectValue属性的值
        </button>
      </div>
       


      <div class="example-basic-info">
        number类型的input演示-绑定了的numberTextValue
        <input type="number" data-hacker-model="{this.numberTextValue}"/>
        <button data-hacker @click="modifyNumberTextValue">
            随机更改numberTextValue属性的值
        </button>
      </div>


      <button data-hacker @click="handleBtnClick">打印查看data</button>

       
    
    
    </div>
    `,
    methods:{
        modifyNormalTextValue(){
            this._data.normalTextValue='使用math.random更改为:'+Math.random()
        },
        modifySelectValue(){
            this._data.selectValue=''+Math.floor(Math.random()*100)
        },
        modifyTextareaValue(){
            this._data.textareaValue='使用math.random更改为:'+Math.random()
        },
        modifyNumberTextValue(){
            this._data.numberTextValue=Math.floor(Math.random()*10000)
        },
        handleBtnClick(){
            console.log('this._data--:',this._data.__LIST);
            Vue.prototype.$message.success('打印成功,请查看控制台')
        }
    },
     styles(){
        return createGlobalStyle`
            .example-basic-info{
               border:dashed 2px blue;
               margin-top:50px;
            }
        `
    },
    data() {

        return {
            normalTextValue:'我是普通的input',
            textareaValue:'我是textarea的value',
            selectValue:'1',
            numberTextValue:'30',
            selectHTML:new Array(100).fill(1).map((s,index)=>'<option value="'+index+'">'+index+'</option>')
        }
    }
}