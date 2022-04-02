
return {
    template: html`
    <div style="border:dashed 5px red;">
      



       <div data-hacker-html="{this.$store.foo||'no foo'}">

       </div>


       <button data-hacker-show="{this.notModified}" @click="modify">
            更改$store的内容为小苹果
       </button>


       
    
    
    </div>
    `,
    methods:{
        modify(){
            this._data.$store.foo='小苹果';
            this._data.notModified=false;
        }
    },
    data() {

        return {
            notModified:true
        }
    }
}