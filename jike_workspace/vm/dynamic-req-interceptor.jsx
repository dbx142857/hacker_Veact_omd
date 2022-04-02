module.exports={
  template:Bue.html`
    <div>
      如果是指添加特定的参数,自然难以满足复杂业务场景的需求;为了应对更多的可能,我们需要让请求拦截器支持以下特性:
      <ul>
        <li>
          支持以对象形式返回新的参数
        </li>
        <li>
          支持通过函数的方式去声明参数的值
        </li>
        <li>
          支持在函数中访问hacker规则对象
        </li>
        <li>
          支持在函数中访问请求拦截前的原始参数对象
        </li>
        <li>
          支持在函数中访问被拦截的xhr请求相关信息
        </li>
        <li>
          支持在函数中访问拦截规则配置
        </li>
      </ul>
      <br>
      在这一章节,我们还是实现上一章节完全一样的效果,不同之处在于,注意查看控制台输出的请求参数拦截函数的参数
  

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
        bindRoute: '/dynamic-req-interceptor',
        firstParsed(){
        },
        reqInterceptor: [
            {
                url: ['/static-files/req-interceptor-data.json'],
                params: {
                  foo:'bar2',
                  foo2:function(){
                    console.log('请求参数拦截函数的参数--:',arguments)
                    return 'bar2'
                  }
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
        bindRoute: '/dynamic-req-interceptor',
        firstParsed(){
        },
        reqInterceptor: [
            {
                url: ['/static-files/req-interceptor-data.json'],
                params: {
                  foo:'bar2',
                  foo2:function(){
                    console.log('请求参数拦截函数的参数--:',arguments)
                    return 'bar2'
                  }
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
      request.open('GET', "./static-files/req-interceptor-data.json?foo=bar");
      request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      request.send();
    },50);

    

  }
}