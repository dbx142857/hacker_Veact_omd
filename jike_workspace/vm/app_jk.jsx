const vueRouter = require("../../Bue/deps/vue-router");

module.exports = {
  "app-entry": {
    mixins: [],

    computed:{
      hackerIntroDesc(){
        try{

          return Bue.routeConfigs.find(s=>s.path==this.$route.path).rowPathParams[0]

        }catch(e){
          return ''
        }
      }
    },
    data() {
      return {
        tplonlyTestValue: "i am tplonlyTestValue",
        selectedMenuInfo: {
          fundesc_link: "md5网页介绍",
          fundesc_str: "md5功能介绍",
          name: "MD5加密/解密",
          url: null,
        },
        isReg: false,
        isLogin: false,
        isRequestCode: false,
        codeTimeoutTotal: 60,
        codeTimeoutRemain: 60,
        menuRes: [],
        codeClock: null,
        loginModel: {
          type: "密码登录",
          mobile: "",
          password: "",
          code: "",
        },
        regModel: {
          mobile: "",
          password: "",
          code: "",
        },
        activeIndex: "1",
        activeIndex2: "1",
      };
    },
    methods: {
      logout() {
        Bue.bueStore.userInfo = {}

        localStorage.removeItem('userInfo');
        Bue.bueStore.redirectUrlAfterLogin = Bue.s.getRoute().fullPath
        this.$router.push('/login')
      },
      showRoute() {
        Bue.doNothing('route--::', this.$route)
      },
      toViewByMenuClick(outerRow, innerRow) {

        if (Bue.s.getRoute().path == '/' + innerRow.menuUrl) {
          return
        }

        Bue.vuePush('/' + (innerRow.menuUrl || '404'))

        // Bue.s.getRouter().push('/' + innerRow.menuUrl || '404')
        Bue.doNothing('outer and inner--:', outerRow, innerRow)
      },
      handleOpen(key, keyPath) {
        Bue.doNothing(key, keyPath);
      },
      handleClose(key, keyPath) {
        Bue.doNothing(key, keyPath);
      },
      // logout() {
      //   Bue.s.modules.cookieUtil.delCookie("userInfo");
      //   Bue.bueStore.userInfo = {};
      // },
      async handleLogin() {
        let d = {
          mobile: this.loginModel.mobile,
        };
        if (this.loginModel.type == "密码登录") {
          d.type = 1;
          d.password = this.loginModel.password;
        } else {
          d.code = this.loginModel.code;
          d.type = 2;
        }
        Bue.doNothing("d--:", d);
        let res = await Bue.HTTP({
          method: "get",
          // headers: {
          //   "Content-Type": "multipart/form-data"
          // },
          body: {
            method: "web.passport.login",
            ...d,
          },
        });
        this.handleLoginSuccess(res);
      },
      async handleReg() {
        let errorMsg = null;

        if (this.regModel.mobile.length != 11) {
          errorMsg = "请输入正确的手机号";
        } else if (this.regModel.password.length < 6) {
          errorMsg = "密码长度至少6位";
        } else if (!this.regModel.code) {
          errorMsg = "请输入验证码";
        }
        if (!errorMsg) {
          window.ELEMENT.Notification({
            type: "error",
            message: errorMsg,
          });
          return false;
        }
        let res = await Bue.HTTP({
          method: "get",
          // headers: {
          //   "Content-Type": "multipart/form-data"
          // },
          body: {
            method: "web.passport.register",
            ...this.regModel,
          },
        });
        this.handleLoginSuccess(res);
      },
      handleLoginSuccess(res) {
        window.ELEMENT.Notification({
          type: "success",
          message: "登录成功",
        });

        Bue.bueStore.userInfo = res;
        Bue.useModule("cookieUtil").setCookie(
          "userInfo",
          JSON.stringify(res),
          7
        );
        Bue.bueStore.isLogin = true;
      },
      async getValidateCodeOfRegOrLogin(modelKey = "regModel") {
        let time = "" + Date.now(),
          powerTime = Math.pow(
            time.substring(time.length - 4, time.length) - 0,
            2
          ),
          mobile = this[modelKey].mobile,
          // mobile = this.regModel.mobile,
          token = Bue.md5("" + powerTime + "JiKeGongJu8888" + mobile);
        this.isRequestCode = true;
        try {
          let res = await Bue.HTTP({
            method: "get",
            // headers: {
            //   "Content-Type": "multipart/form-data"
            // },
            body: {
              method: "web.passport.sendsms",
              token,
              mobile,
              time,
            },
          });
          Bue.doNothing("res--:", res);
          let decrease = () => {
            this.codeTimeoutRemain -= 1;
            if (this.codeTimeoutRemain < 0) {
              this.codeTimeoutRemain = this.codeTimeoutTotal;
              clearInterval(this.codeClock);
            }
          };
          this.codeClock = setInterval(decrease, 1000);
          decrease();
        } catch (e) {
        } finally {
          this.isRequestCode = false;
        }
      },
      handleIframeLoad() {
        let obj = this.$refs.iframe;
        obj.style.height =
          obj.contentWindow.document.documentElement.scrollHeight + "px";
      },
      handleSelect(key, keyPath) {
        let outerRow = this.menuRes[key.split("-")[0] - 0],
          innerRow = outerRow.children[key.split("-")[1] - 0];
        Bue.doNothing(key, keyPath, outerRow, innerRow);
        // if (Bue.NODE_ENV == "production") {
        this.selectedMenuInfo = innerRow;
        // this.$refs.iframe.src = innerRow.url;
        // }
      },
    },
    beforeCreated() { },
    async mounted() {
      

      window.addEventListener('hashchange',function(e) { 
        
        document.getElementById('hacker-introduction-info').innerHTML='<div></div>'
        
      });

      // if (location.hash != '#/demo') {
      //   Bue.registerModule('FETCH_MENU', async () => {
      //     let res = await Bue.HTTP('/biz-merchant/menu/getUserMenu');
      //     Bue.bueStore.MENUS = res.result
      //   })

      //   let fetchResourceWhiteSpace = 'login'.split(' ').map((s) => ('/' + s))
      //   if (!fetchResourceWhiteSpace.find((s) => this.$route.path.startsWith(s))) {
      //     Bue.useModule('FETCH_MENU')()

      //   }
      // }


      // Bue.eventEmitter.on("BUE_READY", () => {
      // });

      // Bue.doNothing("menuRes--:", menuRes);
    },
  },
};
