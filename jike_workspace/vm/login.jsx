module.exports = {
  data() {
    return {
      isSubmiting: false,
      form: {
        password: "",
        userName: "",
      },
    };
  },
  methods: {
    async onSubmit() {
      let res = await Bue.HTTP("/biz-merchant/login", {
        method: "post",
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
        body: {
          ...this.form,
          merchantId: 1012,
        },
      });
      Bue.doNothing("ressssssssssss---:", res);
      let token = res.token;
      // this.$message("token is--:" + token);
      window.ELEMENT.Notification({
        type: "success",
        message: "token is--:" + token,
      });
      Bue.bueStore.userInfo = res;
      localStorage.setItem('userInfo', JSON.stringify(res))
      Bue.s.getRouter().push(Bue.bueStore.redirectUrlAfterLogin)
      Bue.useModule('FETCH_MENU')()
      this.$router.push('/pages-organization-manage')
    },
  },
  beforeDestroy() {
    Bue.doNothing("login before destroy");
  },
  destroyed() {
    Bue.doNothing("login destroyed");
  },
  mounted() {
    Bue.doNothing("i am login");
  },
};
