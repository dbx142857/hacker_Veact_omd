module.exports = {
  resolve: {
    // WX_JS_MAP: Bue.s.loadJS('//map.qq.com/api/gljs?v=1.exp&key=ZGQBZ-SHZ3V-F7SPT-UFIUC-GJJMV-TEFWQ')
  },
  data() {
    return {
      ALL_RESOLVE: false,
      isLoadingList: false,
      PAGINATION: true,
      pageNum: 1,
      listHttpRes: null,
      pageSize: 10,
      OPERATE_BTN_CONFIG: {
        EDIT: true,
        DETAIL: true,
      },
      // isListPage: true,
      currentHandlingRow: null,
      SHOW_OPERATE_COLUMN: true,
      tableData: [],
      createDialogVisible: false,
      updateDialogVisible: false,
      openingDialogType: null,
      detailDialogVisible: false,
      isDialogSubmiting: false,
      createFD: {},
      updateFD: {},
      detailFD: {},

      createDialogTitle: "创建",
      updateDialogTitle: "编辑",
      detailDialogTitle: "详情",
    };
  },
  computed: {
    slotKeys() {
      try {
        return Object.keys(this.$children[0].$slots);
      } catch (e) {
        return [];
      }
    },
    isCreate() {
      return this.openingDialogType == "create";
    },
    isUpdate() {
      return this.openingDialogType == "update";
    },
    isDetail() {
      return this.openingDialogType == "detail";
    },
    dialogTitle() {
      return this[this.openingDialogType + "DialogTitle"];
    },
    dialogVisible() {
      return (
        this.createDialogVisible ||
        this.updateDialogVisible ||
        this.detailDialogVisible
      );
    },
    dialogModel() {
      return this[this.openingDialogType + "FD"] || {};
    },
  },
  // template: Bue.html``,
  methods: {
    detailDataTransformer() {
      return arguments[0];
    },
    getMethodByUrl(url) {
      return (
        (
          "get post put delete head options trace delete"
            .split(" ")
            .map((s) => " --" + s)
            .find((method) =>
              (url.startsWith("/") ? url : this.$options[url + "Url"])
                .toLowerCase()
                .includes(method)
            ) || ""
        ).split("--")[1] || "post"
      );
    },
    async fetchDetail(row) {
      this.currentHandlingRow = row;
      let res = await Bue.HTTP(this.transUrl(this.$options.detailUrl), {
        method: this.getMethodByUrl("detail"),
      });
      this[this.openingDialogType + "FD"] = this.detailDataTransformer(
        res,
        this.openingDialogType
      );
    },
    async httpOperateNotify(pro, successCb, errCb) {
      successCb = successCb || (() => { });
      errCb = errCb || (() => { });
      try {
        let res = await pro;

        successCb(res);

        window.APP.$message("操作成功", "success");
      } catch (e) {
        window.APP.$message("操作失败");
        errCb();
      }
    },

    submit() {
      this.callWithLoading(async function () {
        if (this.openingDialogType != "detail") {
          let res = await Bue.HTTP(
            this.$options[this.openingDialogType + "Url"].split(" ")[0],
            {
              method: this.getMethodByUrl(this.openingDialogType),
              // headers: {
              //   "Content-Type": "multipart/form-data",
              // },
              body: this[this.openingDialogType + "FD"],
            }
          );

          window.APP.$message("操作成功", "success");

          this.hideDialog();
          this.fetchTableData();
        }
      }, "isDialogSubmiting");
    },
    hideDialog() {
      this[this.openingDialogType + "DialogVisible"] = false;
      this.openingDialogType = null;
    },
    showDialog(type) {
      this[type + "DialogVisible"] = true;
      this.openingDialogType = type;
    },
    transUrl(url) {
      return new Function(
        'return "' + url.replace(/\{/gi, '"+').replace(/\}/gi, '+"') + '"'
      )
        .call(this)
        .split(" ")[0];
    },
    r(url, body) {
      return Bue.HTTP(this.transUrl(url), {
        method: this.getMethodByUrl(url),
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
        body: body || {},
      });
    },
    async fetchTableData() {
      if (!("listUrl" in this.$options)) {
        return this.tableData;
      }

      this.isLoadingList = true;

      let listUrl = this.transUrl(this.$options.listUrl);

      if (this.PAGINATION) {
        console.log("this.PAGINATION--", this.PAGINATION);
        listUrl += listUrl.includes("?") ? "&" : "?";
        listUrl += this.transUrl(
          "pageNum={this.pageNum}&pageSize={this.pageSize}"
        );
      }

      console.log("listUrl--:", listUrl);

      try {
        this.tableData = await Bue.HTTP(listUrl, {
          method: this.getMethodByUrl("list"),
        });
        if (!Array.isArray(this.tableData)) {
          this.listHttpRes = this.tableData;
          this.tableData = this.tableData.list;
        }
        Bue.doNothing("options in list page--:", this.$options);
      } catch (e) {
      } finally {
        this.isLoadingList = false;
      }
    },
  },
  async mounted() {
    // alert(3)

    if ("listUrl" in this.$options) {
      this.fetchTableData();
    }
    //  else {
    //   this.isListPage = false;
    // }
    // console.log("OPERATE_BTN_CONFIG--:", this.OPERATE_BTN_CONFIG);

    Bue.doNothing("$slots--:", this);
    if (Bue.debugMode) {
      window._self = this;
    }
  },
};
