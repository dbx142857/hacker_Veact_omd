module.exports={
  template:Bue.html`
    <div>
      本页面在不加载hacker规则的情况下会发起一个get类型的xhr请求,传递foo=bar这个参数
      <br>
      添加hacker规则后重新进入页面该请求参数中foo的值会被改写为bar1,且增加新的参数foo2=bar2
  

      <br><br>

      <button @click="addRule();">添加请求拦截规则并重新进入本页面</button>
      <br>
      本页面规则如下:
      <br>
      <textarea v-model="hackRule" style="border:none;width:100%;display:block;height:400px;">

      </textarea>
  
  </div>
  `,
  methods:{
    addRule(){



      HACKER({
        bindRoute: '/req-interceptor',
        firstParsed(){
        },
        reqInterceptor: [
            {
                url: ['/static-files/req-interceptor-data.json'],
                params: {
                  foo:'bar2',
                  foo2:'bar2'
                }
            }
    
        ]
      })



    // setTimeout(()=>{
      this.$router.push('/auto-history-back');
    // },200)

    }
  },
  data(){
    return {
      hackRule:`
      HACKER({
        bindRoute: '/req-interceptor',
        firstParsed(){
        },
        reqInterceptor: [
            {
                url: ['/static-files/req-interceptor-data.json'],
                params: {
                  foo:'bar2',
                  foo2:'bar2'
                }
            }
    
        ]
      })
      `
    }
  },
  mounted(){

    setTimeout(()=>{
      var request = new XMLHttpRequest();
      request.open('GET', "/static-files/req-interceptor-data.json?foo=bar");
      request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      request.send();
    },50);

    

  }
}