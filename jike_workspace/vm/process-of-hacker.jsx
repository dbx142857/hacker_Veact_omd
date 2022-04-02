module.exports={
    template:Bue.html`
    
        <div>
            <img style="display:block;width:100%;cursor:pointer;"
            title="点击在新窗口中查看图片" 
            onclick="window.open(this.src)" src="./static-files/hacker-process.png"/>
        </div>
    `
}