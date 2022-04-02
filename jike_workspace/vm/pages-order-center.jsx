module.exports = APP.listMixin({
  template: APP.listMixin.html`


    <t $="table-before">
      <div style="display:flex;width:100%">
        <el-form ref="tableData" style="flex:1;" :inline="true">
          <el-form-item label="订单编号" prop="orgId">
            <el-input size="small" v-model="orgId" placeholder="请输入" style="width:204px"></el-input>
          </el-form-item>
          <el-form-item label="订单类型" prop="orgType" style="margin-left:70px;">
            <!-- ----{{'typeOptions' in (resolves.dicts||{})}} -->
            <el-select size="small" v-model="orgType" placeholder="全部">
    
              <el-option v-for="item in useResolver('dicts.typeOptions',[])" :key="item.value" :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单来源" prop="orgSource" style="margin-left:70px;">
            <el-select size="small" v-model="orgSource" placeholder="全部">
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
          <el-form-item label="发货方式" prop="orgDeliver" style="margin-left:70px;">
            <el-select size="small" v-model="orgDeliver" placeholder="全部">
              <el-option v-for="item in useResolver('dicts.deliverOptions',[])" :key="item.value" :label="item.label"
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
            <el-date-picker size="small" type="date" placeholder="选择日期" v-model="tableData.orgTime"
              style="position:relative;left:-5px;bottom:-2px;"></el-date-picker>
          </el-form-item>
        </el-form>
        <div style="width:260px;display:flex;flex-direction: column;align-items:center;justify-content:center;">
          <el-button type="primary" style="width:100px;margin-left:10px;margin-bottom:30px;" size="small">检索</el-button>
          <el-button plain style="width:100px;" size="small">重置</el-button>
        </div>
      </div>
    </t>
    
    <t $=tabs>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="all"></el-tab-pane>
        <el-tab-pane label="待付款" name="obligation"></el-tab-pane>
        <el-tab-pane label="待发货" name="waitSend"></el-tab-pane>
        <el-tab-pane label="待收货" name="waitGet"></el-tab-pane>
        <el-tab-pane label="已完成" name="finished"></el-tab-pane>
        <el-tab-pane label="已关闭" name="closed"></el-tab-pane>
        <el-tab-pane label="已关闭已退款" name="FandC"></el-tab-pane>
      </el-tabs>
    </t>
    
    <t $="table" :data="tableData">
      <el-table-column prop="" label="商品信息" width="180">
      </el-table-column>
      <el-table-column prop="" label="付款" width="180">
      </el-table-column>
      <el-table-column prop="" label="类型/来源" width="180">
      </el-table-column>
      <el-table-column prop="" label="发货方式" width="180">
      </el-table-column>
      <el-table-column prop="" label="买家/收货人" width="180">
      </el-table-column>
      <el-table-column prop="" label="订单状态" width="180">
      </el-table-column>
    
    </t>
    
    <t $="table-after">
    
    </t>
    
    <t $="operate">
    <el-button type="text">zyx</el-button>
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
  // listUrl: "/biz-merchant/product/findByPage --get",
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

    handleClick(tab, event) {
      console.log(tab, event);
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
      orgId: "",
      orgType: "",
      orgSource: "",
      orgDeliver: "",
      orgUser: "",
      orgTime: "",
      tableData: [
        {
          orgId: "",
          orgType: "",
          orgSource: "",
          orgDeliver: "",
          orgUser: "",
          orgTime: "",
        },
      ],
    };
  },
});
