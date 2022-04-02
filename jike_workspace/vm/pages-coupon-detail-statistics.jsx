module.exports = APP.listMixin({
  template: APP.listMixin.html`


    <t $="table-before">
      <div style="display:flex;width:100%">
        <el-form style="flex:1;" :inline="true" label-position="left">
          <el-form-item label="订单编号" prop="orgOrderId">
            <el-input size="small" v-model="orgOrderId" placeholder="请输入" style="width:204px;"></el-input>
          </el-form-item>
          <el-form-item label="订单类型" prop="orgOrderType" style="margin-left:55px;">
            <el-select size="small" v-model="orgOrderType" placeholder="全部" style="width:204px">
              <el-option v-for="item in useResolver('dicts.typeOptions',[])" :key="item.value" :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单来源" prop="orgOrderSource" style="margin-left:70px;">
            <el-select size="small" v-model="orgOrderSource" placeholder="全部" style="width:204px">
              <el-option v-for="item in useResolver('dicts.sourceOptions',[])" :key="item.value" :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="收货人">
            <el-input size="small" v-model="orgUser" class="input-with-select"
              style="width:204px;margin-left:14px;vertical-align: initial;">
              <el-select v-model="orgUser" slot="prepend" placeholder="收货人">
                <el-option v-for="item in useResolver('dicts.userOptions',[])" :key="item.value" :label="item.label"
                  :value="item.label">
                </el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item label="发货方式" prop="orgSendType" style="margin-left:55px;">
            <el-select size="small" v-model="orgSendType" placeholder="全部" style="width:204px">
              <el-option v-for="item in useResolver('dicts.SendTypeOptions',[])" :key="item.value" :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="关联活动" prop="orgActivity" style="margin-left:70px;">
            <el-select size="small" v-model="orgActivity" placeholder="全部" style="width:204px">
              <el-option v-for="item in useResolver('dicts.orgActivityOptions',[])" :key="item.value" :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
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
        <div style="width:300px;display:flex;flex-direction: column;align-items:center;justify-content:center;padding-right:50px;">
          <el-button type="primary" style="width:100px;margin-left:10px;margin-bottom:30px;" size="small">检索</el-button>
          <el-button plain style="width:100px;margin-bottom:35px;" size="small">重置</el-button>
          <el-button plain style="width:100px;" size="small">导出</el-button>
        </div>
      </div>
    </t>
    
    <t $="table" :data="tableData">
      <el-table-column prop="" label="订单号" width="100">
      </el-table-column>
      <el-table-column prop="" label="订单类型" width="100">
      </el-table-column>
      <el-table-column prop="" label="订单来源" width="100">
      </el-table-column>
      <el-table-column prop="" label="订单状态" width="100">
      </el-table-column>
      <el-table-column prop="" label="下单时间" width="100">
      </el-table-column>
      <el-table-column prop="" label="买家" width="75">
      </el-table-column>
      <el-table-column prop="" label="买家手机号" width="110">
      </el-table-column>
      <el-table-column prop="" label="收货人" width="80">
      </el-table-column>
      <el-table-column prop="" label="所在地" width="80">
      </el-table-column>
      <el-table-column prop="" label="详细地址" width="100">
      </el-table-column>
      <el-table-column prop="" label="商品名称" width="100">
      </el-table-column>
      <el-table-column prop="" label="商品规格" width="100">
      </el-table-column>
      <el-table-column prop="" label="数量" width="80">
      </el-table-column>
      <el-table-column prop="" label="单价(元)" width="80">
      </el-table-column>
      <el-table-column prop="" label="卡券抵扣(元)" width="120">
      </el-table-column>
      <el-table-column prop="" label="关联活动" width="100">
      </el-table-column>
      <el-table-column prop="" label="活动优惠(元)" width="120">
      </el-table-column>
      <el-table-column prop="" label="运费(元)" width="80">
      </el-table-column>
      <el-table-column prop="" label="支付金额(元)" width="120">
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
  resolves: {
    dicts: Bue.s.useCompData("service-dicts..jsx"),
  },
  data() {
    // let asyncData = await Bue.s.useCompData('service-dicts..jsx');
    // console.log('asyncData--:', asyncData)
    return {
      // ...asyncData,
      activeName: "all",
      createFD: {
        orgName: "华南大区",
        orgDesc: "华南区",
      },
      orgOrderId: "",
      orgOrderType: "",
      orgOrderSource: "",
      orgUser: "",
      orgSendType: "",
      orgActivity: "",
      orgTime: "",
      tableData: [
        {
          orgOrderId: "",
          orgOrderType: "",
          orgOrderSource: "",
          orgUser: "",
          orgSendType: "",
          orgActivity: "",
          orgTime: "",
        },
      ],
    };
  },
});
