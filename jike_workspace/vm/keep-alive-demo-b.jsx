module.exports={
    template:Bue.html`
        <div><input style="display:block;width:100%;"
         placeholder="请输入一些文字然后点击跳转按钮"/>
        <button @click="$router.push('/keep-alive-demo-a')">
        to another page</button></button>
        </div>
    `
}