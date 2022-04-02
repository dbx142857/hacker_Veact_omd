module.exports = APP.listMixin({
  template: APP.listMixin.html`

    <t $="table-before">
      <el-button style="color:#409Eff;border:1px solid #409Eff">确认变更</el-button>
      <el-table :data="repertoryInfo" align="center"  stripe style="width: 100%">
        <el-table-column prop="specification" label="商品规格" width="180">
          <t $$="scope">
            <div>
              <span>{{this.specificationColor+this.specificationSize}}</span>
            </div>
          </t>
        </el-table-column>
      
        </el-table-column>
        <el-table-column prop="listpricing" label="划线价（元）">
          <t $$="scope">
            <div>
              <el-input v-model="repertoryInfo.Pricing"
                style="width:150px;border:1px solid #eeeeee; border-radius:5px;margin:8px">
              </el-input>
            </div>
          </t>
        </el-table-column>
        <el-table-column prop="salePricing" label="销售（元）">
          <t $$="scope">
            <div>
              <el-input v-model="repertoryInfo.salePricing"
                style="width:150px;border:1px solid #eeeeee; border-radius:5px;margin:8px">
              </el-input>
            </div>
          </t>
        </el-table-column>
      
        <el-table-column prop="repertory" label="库存">
          <t $$="scope">
            <div>
              <el-input v-model="repertoryInfo.repertory"
                style="width:150px;border:1px solid #eeeeee; border-radius:5px;margin:8px">
              </el-input>
            </div>
          </t>
        </el-table-column>
        <el-table-column prop="occupy" label="占用库存"></el-table-column>
        <el-table-column prop="sale" label="可售库存">
        </el-table-column>
       
      </el-table>
    </t>
    
    <t $="table" style="margin:0">
      
    
    
    
    
    
    
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
      repertoryInfo: {

      }
    };
  },
});
