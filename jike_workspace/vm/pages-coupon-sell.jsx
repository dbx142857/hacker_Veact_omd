module.exports = APP.listMixin({
  template: APP.listMixin.html`


    <t $="table-before">
      <div style="display:flex;width:100%">
        <el-form style="flex:1;" :inline="true" label-position="left">
          <el-form-item label="订单号" prop="orgOrderId">
            <el-input size="small" v-model="orgOrderId" placeholder="请输入" style="width:204px;margin-left:15px;"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="orgPhone" style="margin-left:55px;">
            <el-input size="small" v-model="orgPhone" placeholder="请输入" style="width:204px;margin-left:15px;"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="orgState" style="margin-left:70px;">
            <el-select size="small" v-model="orgState" placeholder="全部" style="width:204px">
              <el-option v-for="item in useResolver('dicts.couponStateOptions',[])" :key="item.value" :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="卡券" prop="orgCoupon">
            <el-input size="small" v-model="orgCoupon" placeholder="卡券名称" style="width:204px;margin-left:30px;"></el-input>
          </el-form-item>
          <el-form-item label="卡券类型" prop="orgCouponType" style="margin-left:55px;">
            <el-select size="small" v-model="orgCouponType" placeholder="全部" style="width:204px">
              <el-option v-for="item in useResolver('dicts.CouponTypeOptions',[])" :key="item.value" :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="场景" prop="orgScene" style="margin-left:70px;">
            <el-select size="small" v-model="orgScene" placeholder="全部" style="width:204px">
              <el-option v-for="item in useResolver('dicts.couponSceneOptions',[])" :key="item.value" :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="购买日期" prop="orgTime">
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
      <el-table-column prop="" label="用户昵称" width="100">
      </el-table-column>
      <el-table-column prop="" label="手机号" width="100">
      </el-table-column>
      <el-table-column prop="" label="卡券名称" width="100">
      </el-table-column>
      <el-table-column prop="" label="场景" width="100">
      </el-table-column>
      <el-table-column prop="" label="类型" width="100">
      </el-table-column>
      <el-table-column prop="" label="状态" width="100">
      </el-table-column>
      <el-table-column prop="" label="购买时间" width="100">
      </el-table-column>
      <el-table-column prop="" label="推荐人身份" width="100">
      </el-table-column>
      <el-table-column prop="" label="推荐人" width="100">
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
      orgPhone: "",
      orgState: "",
      orgCoupon: "",
      orgCouponType: "",
      orgScene: "",
      orgTime: "",
      tableData: [
        {
          orgOrderId: "",
          orgPhone: "",
          orgState: "",
          orgCoupon: "",
          orgCouponType: "",
          orgScene: "",
          orgTime: "",
        },
      ],
    };
  },
});
