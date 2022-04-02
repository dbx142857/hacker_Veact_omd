module.exports = APP.listMixin({
  template: APP.listMixin.html`

    <t $="table-before">
        <div style="display:flex;width:100%">
          <el-form style="width:65%;">
            <el-form-item label="下单时间" prop="orgTime">
              <el-radio-group v-model="orgTime" size="small">
                <el-radio-button label="今天"></el-radio-button>
                <el-radio-button label="昨天"></el-radio-button>
                <el-radio-button label="近7天"></el-radio-button>
                <el-radio-button label="近30天"></el-radio-button>
              </el-radio-group>
              <el-date-picker size="small" type="date" placeholder="选择日期" v-model="orgTime"
                style="position:relative;left:-5px;bottom:-2px;"></el-date-picker>
            </el-form-item>
          </el-form>
          <div style="width:35%;display:flex;align-items:center;justify-content:space-around;padding-right:50px;">
              <el-button plain style="width:100px;" size="small">导出</el-button>
              <el-button type="primary" style="width:100px;" size="small">检索</el-button>
              <el-button plain style="width:100px;" size="small">重置</el-button>
            </div>
        </div>
    </t>
    
    
    
    <t $="table" :data="tableData">
    
      <el-table-column prop="orgTime" label="日期" width="130">
      </el-table-column>
      <el-table-column prop="orgAllNumber" label="总订单数" width="140">
      </el-table-column>
      <el-table-column prop="orgAllMoney" label="总订单支付总金额(元)" width="180">
      </el-table-column>
      <el-table-column prop="orgKindNumber" label="实物订单数" width="140">
      </el-table-column>
      <el-table-column prop="orgKindMoney" label="实物订单支付总额(元)" width="180">
      </el-table-column>
      <el-table-column prop="orgEquityNumber" label="权益订单数" width="140">
      </el-table-column>
      <el-table-column prop="orgEquityMoney" label="权益订单支付总额(元)" width="180">
      </el-table-column>
    
    
    
    </t>
    
    <t $="table-after">
    
    </t>
    
    <t $="operate">
    
    </t>
    
    
    <t $="create-update-detail-dialog-content">
    
    
    </t>
    
    
    
    <t $="create-dialog-content">
    
    </t>
    <t $="update-dialog-content">
    
    </t>
    <t $="detail-dialog-content">
    
    </t>
  
  
  `,

  // listUrl:
  //   "/biz-merchant/org/findOrganizationByParams?orgName={this.orgName} --get",
  // createUrl: "/biz-merchant/org/add --post",
  // updateUrl: "/biz-merchant/org/update",
  // detailUrl: "/biz-merchant/org/findById/{this.currentHandlingRow.orgId} --get",

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
      orgTime: "",
      tableData: [
        {
          orgTime: "",
          orgAllNumber: "",
          orgAllMoney: "",
          orgKindNumber: "",
          orgKindMoney: "",
          orgEquityNumber: "",
          orgEquityMoney: "",
        },
      ],
    };
  },
});
