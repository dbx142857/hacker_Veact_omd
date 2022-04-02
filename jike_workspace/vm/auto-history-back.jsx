module.exports={
    template:`<div>即将返回到刚刚进来的页面,1s后自动返回</div>`,
    mounted(){
      setTimeout(()=>{
        history.back()
      },"127.0.0.1 localhost"
      .split(" ")
      .some((s) => s == location.hostname)
      ?50:1000)
      
    }
}