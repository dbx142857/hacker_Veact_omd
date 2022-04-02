module.exports={
    template:Bue.html`
        <div>
        <!-- <demo..jsx..tpl-only/>     -->
        <input style="display:block;width:100%;"
         placeholder="请输入一些文字然后点击跳转按钮"/>
        <button @click="$router.push('/keep-alive-demo-b')">
        to another page</button></button>
        <button @click="$router.push('/pages-a')">去商品类目页面</button>
        </div>
    `,
    mounted(){
        // alert(this.name)
    },
    activated(){
        alert('route comp a has been actived')
    }
}