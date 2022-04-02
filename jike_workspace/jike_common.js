;(function(){
  let debugMode = "127.0.0.1 localhost"
  .split(" ")
  .some((s) => s == location.hostname);

let BUE_DEVELOPER = debugMode || "172.21.81.18" == location.hostname;


debugMode=true;
BUE_DEVELOPER=true;


let currentShowingLevelOneRouteComp=null


//仅演示用
BUE_DEVELOPER = true;
debugMode = true;

window.Bue.bootstrap({
  globalMixins:{
    methods:{
      loadHackerComp(){
      

        HACKER({
            replacer: [
                {
                    target:  '.bue-app-router-view',
                    preserveTarget:true,
                    component:'./jike_workspace/vm/hacker-components/'+(this.getHCFileName())
                    // component:'./jike_workspace/vm/hacker-components/'+((this.$route.path.substring(1).split('component-').join('component-example-')+'.jsx'))
                    // component:'./jike_workspace/vm/hacker-components/hc-example-show-if.jsx'
                    // render(){
                    //   return Bue.html`<div style="color:red;">新菜单1/新菜单1-1-看到效果了没亲</div>`
                    // }
                }
            ],
            bindRoute: this.$route.path,
        });
  
  
  
  
        Vue.prototype.$message.success('重写成功')
        this.rewrited=true;
        // this.$router.push('/hacker-route-example?writed=1')
  
      },
      isRouteCompForHacker(){
        // if('/'+this.bueOptions.name==this.$route.path){
          if(this.$route.path.startsWith('/hacker-component-') || this.$route.path.startsWith('/hc-')){
            return true;
          }
        // }
        return false;
      },
      getHCFileName(){
        // (this.$route.path.substring(1).split('component-').join('component-example-')+'.jsx')
        let path=this.$route.path.substring(1);
        if(path.startsWith('hacker-component')){
          return path.split('component-').join('component-example-')+'.jsx'
        }else{
          return path.split('hc-').join('hc-example-')+'.jsx'
        }
      },
      viewCode(){
        // alert('view code invoked')
        // alert(this.isRouteCompForHacker())

        let path='./jike_workspace/vm/hacker-components/'+this.getHCFileName()
        sessionStorage.setItem('jsx_file_path',path)

        if(this.isRouteCompForHacker()){
          // alert(
          //   // (this.$route.path.substring(1).split('component-').join('component-example-')+'.jsx')
          // )


          window.open('./jsx-content-viewer.html')
          // window.open('./jike_workspace/vm/hacker-components/'+(this.$route.path.substring(1).split('component-').join('component-example-')+'.jsx'))
          
        }
        
      }
    },
    watch:{
      isHackerCompLoaded(nv){

        try{
          if(nv){
            if(currentShowingLevelOneRouteComp){
              currentShowingLevelOneRouteComp.$destroy();
              
            }

            setTimeout(()=>{
              // alert(this.bueOptions.bueRouteDefinedPath)
              Bue.vm(this.bueOptions.bueRouteDefinedPath+'-intro..jsx',true,{
              // Bue.vm(this.bueOptions.name+'-intro..jsx',true,{
                bueFlagForHacker:this.$route.path
              })
              .$$mount(document.getElementById('hacker-introduction-info').childNodes[0])
              currentShowingLevelOneRouteComp=this
            })

            
          }
        }catch(e){

        }

        
      },
      'bueStore.hackerEvents':{
        deep:true,
        handler(nv){

          // debugger
          // alert('ye')
          try{
            // console.log('route--:',this.bueOptions)
            // bueRouteDefinedPath
            if(('/'+this.bueOptions.name==this.$route.path) || ('/'+this.bueOptions.bueRouteDefinedPath==this.$route.path)){
              if(this.$route.path.startsWith('/hacker-component-') || this.$route.path.startsWith('/hc-')){
      
                
  
                // alert(this.bueOptions.name)
                // alert(this.$route.path)
                let bool=nv.hasOwnProperty('B_PUSH_STATE'+HACKER.generateUniqueKeyByPathName(this.$route.path))
                // alert(bool)
                // let bool=nv.hasOwnProperty('B_PUSH_STATE'+HACKER.generateUniqueKeyByPathName('/'+this.bueOptions.name))
                if(bool){
                  // alert("aa")
                  this.isHackerCompLoaded=true
                }
  
                
                
              }
            }
          }catch(e){

          }

          
        }
      }
    },
    data(){
      return {
        rewrited:false,
        isHackerCompLoaded:false
      }
    },
    
    mounted(){
      
    }
  },
  react: false,
  babel: false,
  reactDom: false,
  jquery: false,

  vueRouter: true,
  BUE_DEVELOPER: BUE_DEVELOPER,
  BueFrameworkFolderLocation: "./Bue",
  // BueFrameworkFolderLocation: "http://localhost:8088/bue/Bue",
  ajaxConfig: {
    timeout: 15000,
    baseUrl: "http://47.100.22.135:8081",
    // baseUrl: "http://127.0.0.1:8081",
    // baseUrl: "http://127.0.0.1",
    // baseUrl: "http://dev-gateway.juliangtiaodong.com",
    // baseUrl: function () {
    //   return !debugMode
    //     ? location.host == "dubaixing.qicp.vip"
    //       ? "http://dubaixing.qicp.vip:28438/jike"
    //       : "http://api.tool.bitedaka.com"
    //     : "http://api.tool.bitedaka.com";
    //   // : "http://127.0.0.1:8088/jike";
    // },
    reqInterceptor(req) {

      if (Bue.bueStore.userInfo.token) {
        req.settings.headers['Authorization'] = Bue.bueStore.userInfo.token
      }


      return req;
    },
    onTimeout(res) {
      window.ELEMENT.Notification({
        type: "error",
        message: "请求" + res.url + "超时",
      });
    },
    handleRequestError(e) {
      window.ELEMENT.Notification({
        type: "error",
        message: e.toString(),
      });
    },
    resInterceptor(res) {
      return res;
      // alert('yes')
      Bue.doNothing("reseeeeeeeeee---:", res);
      if (res.jsonData.code != 200) {
        if (res.jsonData.code == 401) {
          Bue.bueStore.redirectUrlAfterLogin = Bue.s.getRoute().fullPath
          Bue.useModule('BUE_ROUTER_INSTANCE').push('/login')
          // setTimeout(()=>{


          // },2000)

        }
        // alert(res.statusText)
        this.handleRequestError(res.jsonData.message || res.response.statusText);
        // if (res.response.status != 200) {

        throw "";
      } else {
        let result = res.jsonData.result || {};
        if (result.code == 200) {
          return result
        } else {


          if (Array.isArray(result)) {
            return result;
          }


          if (result.code == 500) {
            let currentPath = Bue.s.getRoute().path
            if (currentPath != '/demo' && currentPath != '/500') {
              Bue.s.getRouter().push('/500')
            }

            window.ELEMENT.Notification({
              type: "error",
              message: result.message || '',
            });
            throw "";

          } else {
            return result
          }

        }


      }
    },
  },
  // debugMode: debugMode,
  reloadWhenVisibilitychange: false,
  // workspaceDir: "./jike_workspace",
  tplDirPath: "./jike_workspace/tpl",
  vmDirPath: "./jike_workspace/vm",
  entry: "app_jk.app-entry",
  thirdPartLibs: {
    // test2: {
    //   jsPath: "./test2.js",
    // },
    appCss: {
      cssPath: "./jike_workspace/app.css",
    },
    footerCss: {
      cssPath: "./jike_workspace/footer.css",
    },
    iframeLoadingTimeout: 30000,
    // happyScroll: {
    //   jsPath:
    //     "https://unpkg.com/vue-happy-scroll/docs/happy-scroll.min.js",
    //   cssPath: "https://unpkg.com/vue-happy-scroll/docs/happy-scroll.css"
    // },
    elementUI: {
      jsPath: "./element/element.min.js",
      cssPath: "./element/element.min.css",
    },
  },
  frames: {},
  // vueRoute
  userScripts: [
    // function () {
    //   Bue.doNothing("ttttttttttttttttttttttttttttttttttttaaaaaaaaaaaaa");
    // },
    "./router.js",
    function () {
      function addCookie(objName, objValue, objHours) {
        //添加cookie

        var str = objName + "=" + escape(objValue);

        if (objHours > 0) {
          //为时不设定过期时间，浏览器关闭时cookie自动消失

          var date = new Date();

          var ms = objHours * 3600 * 1000;

          date.setTime(date.getTime() + ms);

          str += "; expires=" + date.toGMTString();
        }

        document.cookie = str;
      }

      function setCookie(name, value, Days = 30) {
        //两个参数，一个是cookie的名子，一个是值

        var exp = new Date(); //new Date("December 31, 9998");

        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);

        document.cookie =
          name + "=" + escape(value) + ";expires=" + exp.toGMTString();
      }

      function getCookie(name) {
        //取cookies函数

        var arr = document.cookie.match(
          new RegExp("(^| )" + name + "=([^;]*)(;|$)")
        );

        if (arr != null) return unescape(arr[2]);
        return null;
      }

      function delCookie(name) {
        //删除cookie
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = getCookie(name);
        if (cval != null) {
          document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
        }
      }
      (function ($) {
        "use strict";

        /*
         * Add integers, wrapping at 2^32. This uses 16-bit operations internally
         * to work around bugs in some JS interpreters.
         */
        function safeAdd(x, y) {
          var lsw = (x & 0xffff) + (y & 0xffff);
          var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
          return (msw << 16) | (lsw & 0xffff);
        }

        /*
         * Bitwise rotate a 32-bit number to the left.
         */
        function bitRotateLeft(num, cnt) {
          return (num << cnt) | (num >>> (32 - cnt));
        }

        /*
         * These functions implement the four basic operations the algorithm uses.
         */
        function md5cmn(q, a, b, x, s, t) {
          return safeAdd(
            bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s),
            b
          );
        }
        function md5ff(a, b, c, d, x, s, t) {
          return md5cmn((b & c) | (~b & d), a, b, x, s, t);
        }
        function md5gg(a, b, c, d, x, s, t) {
          return md5cmn((b & d) | (c & ~d), a, b, x, s, t);
        }
        function md5hh(a, b, c, d, x, s, t) {
          return md5cmn(b ^ c ^ d, a, b, x, s, t);
        }
        function md5ii(a, b, c, d, x, s, t) {
          return md5cmn(c ^ (b | ~d), a, b, x, s, t);
        }

        /*
         * Calculate the MD5 of an array of little-endian words, and a bit length.
         */
        function binlMD5(x, len) {
          /* append padding */
          x[len >> 5] |= 0x80 << len % 32;
          x[(((len + 64) >>> 9) << 4) + 14] = len;

          var i;
          var olda;
          var oldb;
          var oldc;
          var oldd;
          var a = 1732584193;
          var b = -271733879;
          var c = -1732584194;
          var d = 271733878;

          for (i = 0; i < x.length; i += 16) {
            olda = a;
            oldb = b;
            oldc = c;
            oldd = d;

            a = md5ff(a, b, c, d, x[i], 7, -680876936);
            d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
            c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
            b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
            a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
            d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
            c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
            b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
            a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
            d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
            c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
            b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
            a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
            d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
            c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
            b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);

            a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
            d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
            c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
            b = md5gg(b, c, d, a, x[i], 20, -373897302);
            a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
            d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
            c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
            b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
            a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
            d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
            c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
            b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
            a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
            d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
            c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
            b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);

            a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
            d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
            c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
            b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
            a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
            d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
            c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
            b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
            a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
            d = md5hh(d, a, b, c, x[i], 11, -358537222);
            c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
            b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
            a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
            d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
            c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
            b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);

            a = md5ii(a, b, c, d, x[i], 6, -198630844);
            d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
            c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
            b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
            a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
            d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
            c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
            b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
            a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
            d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
            c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
            b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
            a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
            d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
            c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
            b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);

            a = safeAdd(a, olda);
            b = safeAdd(b, oldb);
            c = safeAdd(c, oldc);
            d = safeAdd(d, oldd);
          }
          return [a, b, c, d];
        }

        /*
         * Convert an array of little-endian words to a string
         */
        function binl2rstr(input) {
          var i;
          var output = "";
          var length32 = input.length * 32;
          for (i = 0; i < length32; i += 8) {
            output += String.fromCharCode((input[i >> 5] >>> i % 32) & 0xff);
          }
          return output;
        }

        /*
         * Convert a raw string to an array of little-endian words
         * Characters >255 have their high-byte silently ignored.
         */
        function rstr2binl(input) {
          var i;
          var output = [];
          output[(input.length >> 2) - 1] = undefined;
          for (i = 0; i < output.length; i += 1) {
            output[i] = 0;
          }
          var length8 = input.length * 8;
          for (i = 0; i < length8; i += 8) {
            output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << i % 32;
          }
          return output;
        }

        /*
         * Calculate the MD5 of a raw string
         */
        function rstrMD5(s) {
          return binl2rstr(binlMD5(rstr2binl(s), s.length * 8));
        }

        /*
         * Calculate the HMAC-MD5, of a key and some data (raw strings)
         */
        function rstrHMACMD5(key, data) {
          var i;
          var bkey = rstr2binl(key);
          var ipad = [];
          var opad = [];
          var hash;
          ipad[15] = opad[15] = undefined;
          if (bkey.length > 16) {
            bkey = binlMD5(bkey, key.length * 8);
          }
          for (i = 0; i < 16; i += 1) {
            ipad[i] = bkey[i] ^ 0x36363636;
            opad[i] = bkey[i] ^ 0x5c5c5c5c;
          }
          hash = binlMD5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
          return binl2rstr(binlMD5(opad.concat(hash), 512 + 128));
        }

        /*
         * Convert a raw string to a hex string
         */
        function rstr2hex(input) {
          var hexTab = "0123456789abcdef";
          var output = "";
          var x;
          var i;
          for (i = 0; i < input.length; i += 1) {
            x = input.charCodeAt(i);
            output += hexTab.charAt((x >>> 4) & 0x0f) + hexTab.charAt(x & 0x0f);
          }
          return output;
        }

        /*
         * Encode a string as utf-8
         */
        function str2rstrUTF8(input) {
          return unescape(encodeURIComponent(input));
        }

        /*
         * Take string arguments and return either raw or hex encoded strings
         */
        function rawMD5(s) {
          return rstrMD5(str2rstrUTF8(s));
        }
        function hexMD5(s) {
          return rstr2hex(rawMD5(s));
        }
        function rawHMACMD5(k, d) {
          return rstrHMACMD5(str2rstrUTF8(k), str2rstrUTF8(d));
        }
        function hexHMACMD5(k, d) {
          return rstr2hex(rawHMACMD5(k, d));
        }

        function md5(string, key, raw) {
          if (!key) {
            if (!raw) {
              return hexMD5(string);
            }
            return rawMD5(string);
          }
          if (!raw) {
            return hexHMACMD5(key, string);
          }
          return rawHMACMD5(key, string);
        }

        if (typeof define === "function" && define.amd) {
          define(function () {
            return md5;
          });
        } else if (typeof module === "object" && module.exports) {
          module.exports = md5;
        } else {
          $.md5 = md5;
        }
      })(this);
      this.registerModule("cookieUtil", {
        delCookie,
        getCookie,
        setCookie,
        addCookie,
      });
    },
  ],
  setStore() {

    return {
      MENUS: [],
      hackerEvents:window.HACKER?window.HACKER.$bus.events:null,
      redirectUrlAfterLogin: '/',
      asideMenuShowExceptPages: '/login /404 /demo'.split(" "),
      userInfo: Bue.registerModule('getuserInfoByLocal', () => {
        try {
          let userInfo =
            JSON.parse(localStorage.getItem("userInfo")) || {};
          // JSON.parse(Bue.s.modules.cookieUtil.getCookie("userInfo")) || {};
          return userInfo;
        } catch (e) {
          return {};
        }
      })()
    };
  },
  bueReady(frameWindow) {
    // alert()

    // alert(location.hash.split('?')[0].trim())
    if(location.hash.split('?')[0].trim()=='#/home' || location.hash.split('?')[0].trim()=='#/'){
      location.hash='#/homepage'
    }

    // location.hash='#/hacker-demo'
    // let userInfoStr = Bue.useModule("cookieUtil").getCookie("userInfo");
    // try {
    //   Bue.bueStore.userInfo = JSON.parse(userInfoStr);
    //   Bue.bueStore.isLogin = true;
    // } catch (e) {}
    // Bue.bueStore.userInfo = {
    //   head_img: "http://tool.bitedaka.com/head_img.jpg",
    //   name: "176****3725",
    //   user_token: "affe1e7cba6e6b27ff9e5a2222aca409",
    // };
    // Bue.bueStore.isLogin = true;
    // alert(2);
  },
});


window.APP = {
  $message(msg, type = 'error') {
    Vue.prototype.$message({
      type: type,
      message: msg,
    })
  },
  listMixin(str) {


    // Bue.doNothing('strrrrrrrrrr---:', str)

    if (typeof (str) == 'object' && !Array.isArray(str)) {

      return {
        ...str,
        mixins: ['list-page'],
      }
    }

    str = '<list-page..tpl-only :vm="_self">' + str + '</list-page..tpl-only>'
    // str = '<list-page..jsx..tpl-only :vm="_self">' + str + '</list-page..jsx..tpl-only>'

    str = str
      .replace(/t(\s+)\$/gi, 'template slot')
      .replace(/template slot\$/gi, 'template slot-scope')
      .replace(/<\/t>/gi, '</template>');
    Bue.doNothing('str--:', str)

    return str;
  }
}
window.APP.listMixin.html = (s) => window.APP.listMixin(s);
// window.html = Bue.html;
})();