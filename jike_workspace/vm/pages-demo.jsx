module.exports = APP.listMixin({
  template: APP.listMixin.html`

    <t $="table-before">
      <el-button @click="showDialog('create')">创建demo</el-button>
      <el-input clearable v-model="orgName" style="width:200px;margin-left:200px;" placeholder="demo名称"></el-input>
      <el-button @click="fetchTableData">搜索</el-button>
    </t>
    
    
    
    <t $="table">
    
      <el-table-column prop="orgId" label="demoid" width="180">
      </el-table-column>
      <el-table-column prop="orgName" label="demo名称" width="180">
      </el-table-column>
      <el-table-column prop="orgDesc" label="描述" width="180">
      </el-table-column>
      <el-table-column prop="closeSwitch" label="状态" width="180">
        <t $$="scope">
          <el-switch @change="switchDisabledStatus(scope.row)" v-model="scope.row.closeSwitch"></el-switch>
        </t>
    
      </el-table-column>
    
    
    
    
    
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

  mounted() {},
  setup($props, context) {
    let test = VueCompositionAPI.ref(0);
    console.log("setup args and this and test--:", arguments, this, test);
    return {
      test,
    };
  },
  methods: {
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
      createFD: {
        orgName: "华南大区",
        orgDesc: "华南区",
      },
      orgName: "",
    };
  },
});
