module.exports={
  template:Bue.html`
    <div>
      同样的,有请求的拦截,就必然有响应的拦截,同样,也需要满足:
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
      在这一章节,我们还是实现上一章节完全一样的效果,不同之处在于,注意查看控制台输出的响应拦截器拦截函数参数
  

      <br>
      
      在本示例中,可以看到添加hacker规则后js获取到的请求返回参数中多了一个自定义的参数.
      <br>
      请注意,在浏览器的控制台无法看到修改后的参数,因为浏览器端的js语言没有这种能力

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
        bindRoute: '/res-interceptor',
        firstParsed(){
        },
        resInterceptor: [
            {
                url: ['/static-files/req-interceptor-data.json'],
                hook(res){
                  console.log('this--:',this)
                  console.log('响应拦截器拦截函数参数---:',arguments)
                  res.foo='bar'
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
        bindRoute: '/res-interceptor',
        firstParsed(){
        },
        resInterceptor: [
            {
                url: ['/static-files/req-interceptor-data.json'],
                hook(res){
                  console.log('this--:',this)
                  res.foo='bar'
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

      request.onreadystatechange=function state_Change()
      {
      if (request.readyState==4)
        {// 4 = "loaded"
        if (request.status==200)
          {// 200 = OK
            console.log('request--:',request.responseText)
          // ...our code here...
          }
        else
          {
          alert("Problem retrieving XML data");
          }
        }
      }
    },50);

    

  }
}