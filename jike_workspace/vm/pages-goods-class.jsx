module.exports = APP.listMixin({
  template: APP.listMixin.html`

    <t $="table-before">
      <el-button type="primary" @click="Bue.vuePush('/pages-order-center')">新增一级商品类目+</el-button>
    
    </t>
    
    <t $="table" style="margin:0">
    
      <div borderstyle="width: 100%;" class="table22222">
        <el-table-column fixed prop="tableDate.className" label="类目名称" width="150">
        </el-table-column>
        <el-table-column prop="tableDate.sort" label="排序" width="120">
        </el-table-column>
        <el-table-column prop="tableDate.status" label="状态" width="120">
          <t $$="scope">
            <el-switch @change="switchStatus()" v-model="tableDate.value" active-value="100" inactive-value="0"></el-switch>
          </t>
        </el-table-column>
        <el-table-column prop="tableDate.operation" label="操作" width="120">
          <t $$="scope">
            <div>
              <el-button type="text" size="small" @click="addSame()">同级添加 |</el-button>
              <el-button @click="addChild()" type="text" size="small">子级添加 |
              </el-button>
              <el-button type="text" size="small" @click="editor()">编辑</el-button>
            </div>
          </t>
    
    
    
    
        </el-table-column>
      </div>
    
    
    
    
    
    
    
    
    </t>
    
    <t $="table-after">
    
    </t>
    
    <t $="operate">
    
    </t>
    
    
    <t $="create-update-detail-dialog-content">
    
    
      <el-form-item label="demo名称">
        <el-input v-model="dialogModel.orgName"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="dialogModel.orgDesc"></el-input>
      </el-form-item>
    
    
    </t>
    
    
    
    <t $="create-dialog-content">
    
    </t>
    <t $="update-dialog-content">
    
    </t>
    <t $="detail-dialog-content">
    
    </t>
  
  
  `,

  listUrl:
    "/biz-merchant/org/findOrganizationByParams?orgName={this.orgName} --get",
  createUrl: "/biz-merchant/org/add --post",
  updateUrl: "/biz-merchant/org/update",
  detailUrl: "/biz-merchant/org/findById/{this.currentHandlingRow.orgId} --get",

  mounted() { },
  setup($props, context) {
    let test = VueCompositionAPI.ref(0);
    console.log("setup args and this and test--:", arguments, this, test);
    return {
      test,
    };
  },
  methods: {
    addSame() {
      console.log("同级")
    },
    addChild() {
      console.log("子级")
    },
    editor() {
      console.log("编辑")
    },
    switchStatus() {
      this.tableDate.open = !this.tableDate.open
    },
    detailDataTransformer(res, type) {
      if (type == "update" || type == "detail") {
        return {
          orgId: res.orgId,
          orgName: res.orgName,
          orgDesc: res.orgDesc,
          closeSwitch: this.currentHandlingRow.closeSwitch,
        };
      }
    },

    async switchDisabledStatus(row) {
      this.httpOperateNotify(
        Bue.HTTP("/biz-merchant/org/switch", {
          method: "post",
          // headers: {
          //   "Content-Type": "multipart/form-data",
          // },
          body: {
            orgId: row.orgId,
            openFlag: row.closeSwitch,
          },
        }),
        null,
        () => {
          row.closeSwitch = !row.closeSwitch;
        }
      );
    },
  },
  data() {
    return {
      SHOW_OPERATE_COLUMN: false,
      createFD: {
        orgName: "华南大区",
        orgDesc: "华南区",
      },
      orgName: "",
      tableDate: {
        className: "",
        sort: "",
        status: "",
        operation: "",
        value: '100'
      }
    };
  },
});
