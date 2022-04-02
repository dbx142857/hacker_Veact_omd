import composition from './uos-composition-decorator.js';
import bus,{EventEmitter} from './uos-bus.js';

let classDeps=[composition,bus]


let utils={
    insertRule:(function () {

        let strCache = [],
            maxIndex = -1;
        function getStyleSheet(unique_title) {
            let sheetLen=document.styleSheets.length
            for (var i = 0; i < sheetLen; i++) {
                var sheet = document.styleSheets[i];
                if (sheet.title == unique_title) {
                    return sheet;
                }
            }
            if(!sheetLen){
                let sheet=document.createElement('style');
                document.head.appendChild(sheet);
                return document.styleSheets[0]
            }
        }

        return function (str) {
            
            if (strCache.includes(str)) {
                return
            }
            strCache.push(str)
            maxIndex++;
            let sheet = getStyleSheet()
            sheet.insertRule(str, maxIndex);

        }

    })(),
    guid() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
        },handleEs6Template(strings, restArgs) {
            if(strings.length>1000){
                throw '一个组件的模板里最多只允许使用1000个es6模板字符串定界符'
            }
        let res = ''
        for (let i = 0; i < 1000; i++) {
            res += (strings[i] || '') + (restArgs[i] || '')
            if (!strings[i] && !restArgs[i]) {
                break;
            }
        }
        return res
    }
}
export default function uos(classDefine){
// window.uos=function uos(classDefine){
    return new classDefine();
}

window.uos=uos;

// export default uos;

uos.load=uos;
uos.$bus=new EventEmitter()
let allRegisteredComponents={}
uos.getAllRegisteredComponents=()=>{
    return allRegisteredComponents
}

uos.use=(compClass)=>{
    if(!compClass.name){
        throw '组件必须拥有一个唯一的名字,才可以被注册为全局组件'
    }
    allRegisteredComponents[compClass.name]=compClass;
    return uos;
}
'html createGlobalStyle'.split(' ').forEach((k)=>{
    uos[k]=(strings, ...restArgs) =>utils.handleEs6Template(strings, restArgs)
})
uos.component=class{
    static mountC(thisInstance){
        let instance=new this();

        instance.thisInstance=thisInstance
        for(let i in instance.proto){
            let v=instance.proto[i]
            thisInstance[i]=typeof(v)=='function'?v():v;
        }
        delete instance.thisInstance
    }
    props(){ return {}}
    constructor($parent){
        classDeps.forEach((classDefine)=>uos.component.mountC.call(classDefine,this));
        
        this.$parent=$parent||null
        this.$refs={}
        this.uid='uos_comp_'+utils.guid()
        this.$options={
            name:this.constructor.name
        };
        [
            'styles',
            'beforeRender',
            'beforeDestroy',
            'destroyed',
            'rendered',
            'registerGlobalEvent',
            'props',
            'html',
        ].forEach((k)=>this.$options[k]=this[k]);

        

        setTimeout(()=>{
            this.$options.components=this.components
            this.$options.events=this.events
        })
        // alert(uos.component._initStyle)
        uos.component._initStyle.call(this)
        this.props=this.props.call(this)
        this.$slots={}
    }
    beforeRender(){}
    rendered(){}
    beforeDestroy(){}
    destroyed(){}
    components={}
    static _initStyle(){
        let styles = (function () {
            let styleStr=(this.$options.styles||function(){}).call(this)
            return !styleStr?'':styleStr.split('}').slice(0, -1).map((s) => s + '}');
        }).call(this);
        if (styles && styles.join('').trim() != '') {
            styles.forEach((sty) => {
                if(sty.includes('&')){
                    sty = '.' + this.uid+' '+sty.replace(/\&/gi,'')
                }else{
                    sty = '.' + this.uid+' '+sty
                }
                utils.insertRule(sty)
            })
        }
    }
    html(){return ''}
    static _handleRefAndEventsAndSlot(wrapper){
        for(let node of wrapper.querySelectorAll('*')){
            for (let attr of node.attributes) {
                if(attr.nodeName=='ref'){
                    this.$refs[attr.value]=node
                }else if(attr.nodeName.startsWith('@')){
                    node.addEventListener(attr.nodeName.substring(1),(e)=>{
                        if (/^[a-zA-Z\$_][a-zA-Z\d\$_]*$/.test(attr.value)) {
                            this.events[attr.value].call(this, e)
                        } else {
                            try {
                                new Function(attr.value).call(this)
                            } catch (e) {
                                console.warn('执行事件表达式:['+attr.value+']失败,错误信息为:');
                                throw e;
                            }
                        }
                    })
                }else if(attr.nodeName=='html' && node.nodeName.toUpperCase()=='SLOT'){
                    let htmlMethod=(attr.value)
                    if(!this[htmlMethod] && !this.$options.components[htmlMethod] && !uos.getAllRegisteredComponents()[htmlMethod]){
                        throw('组件不存在名称为'+htmlMethod+'的渲染方法,且也不存在名称为'+htmlMethod+'的子组件,且也不存在名称为'+htmlMethod+'的全局组件,渲染失败')
                    }
                    this.$slots[node.getAttribute('name')||'default']=node
                    let mountChild=($child)=>{
                        $child.$parent=this;
                        $child.$renderTo(node)

                        if(!this.$children){
                            this.$children=[]
                        }
                        this.$children.push($child)
                    }
                    node.__uos_updateContent=()=>{
                        if(this[htmlMethod]){
                            node.innerHTML=this[htmlMethod]()
                            uos.component._handleRefAndEventsAndSlot.call(this,node)
                        }else if(this.$options.components[htmlMethod]){

                            mountChild(uos.load(this.$options.components[htmlMethod]))
                        }else{

                            mountChild(uos.load(uos.getAllRegisteredComponents()[htmlMethod]))
                        }
                    }
                    if(node.getAttribute('lazy')==undefined){
                        node.__uos_updateContent()
                    }
                }
            }
        }
    }
    renderSlot(name){
        if(!name in this.$slots){
            throw '组件中不存在名称为'+name+'的插槽,更新内容失败'
        }
        this.$slots[name].__uos_updateContent()
    }
    static _destroy(){
        this.beforeDestroy.call(this)

        

        for(let i in uos.$bus.events){
            let arr=uos.$bus.events[i];
            arr=arr.filter((s)=>s.vmId!=this.uid)
            uos.$bus.events[i]=arr;
            if(arr.length==0){
                delete uos.$bus.events[i]
            }
        }


        this.destroyed.call(this)
    }
    registerGlobalEvent(key,fn){
        uos.$bus.on(key,fn,this)
    }
    async $renderTo(wrapper){
        await this.beforeRender.call(this)
        
        if(typeof(wrapper)=='string'){
            wrapper=document.querySelector(wrapper)
        }
        try{
            let htm=this.html();
            let oldInnerHTML=wrapper.innerHTML;
            wrapper.innerHTML=htm;
            if(wrapper.childNodes.length!=1){
                wrapper.innerHTML=oldInnerHTML
                throw 'html声明必须包含有且只有一个根元素'
            }
            this.$el=wrapper.childNodes[0];
            this.$el.classList.add(this.uid)
            uos.component._handleRefAndEventsAndSlot.call(this,wrapper)
            setTimeout(()=>{
                this.rendered.call(this)
            })

            this.$el.addEventListener("DOMNodeRemoved",(a,b)=>{
                if(a.target===this.$el){
                    uos.component._destroy.call(this)
                }
                
            })

        }catch(e){
            console.warn('组件挂载失败,原因是:')
            throw e;
        }
        
    }
}