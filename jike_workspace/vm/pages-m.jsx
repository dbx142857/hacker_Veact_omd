module.exports = APP.listMixin({
  template: APP.listMixin.html`

    <t $="table-before">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="库存变更流水" name="repertory">
          <el-table :data="repertoryInfo" stripe style="width: 100%">
            <el-table-column prop="date" label="时间" width="180">
            </el-table-column>
            <el-table-column prop="type" label="变更类型" width="180">
            </el-table-column>
            <el-table-column prop="person" label="业务单号/操作人">
            </el-table-column>
            <el-table-column prop="changeBefor" label="变更前">
            </el-table-column>
            <el-table-column prop="changing" label="本次变更">
            </el-table-column>
            <el-table-column prop="changeAfter" label="变更后">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="价格调整记录" name="price">配置管理
        <el-table :data="priceInfo" stripe style="width: 100%">
            <el-table-column prop="priceDate" label="时间" width="180">
            </el-table-column>
            <el-table-column prop="pricePerson" label="操作人" width="180">
            </el-table-column>
            <el-table-column prop="pricebefore" label="变更前(元)" width="180">
            <el-table-column prop="priceLimitBe" label="划线价" width="180">
            </el-table-column>
            <el-table-column prop="salePriceBe" label="销售价" width="180">
            </el-table-column>
            </el-table-column>
            <el-table-column prop="priceAfter" label="变更后(元)" width="180">
            <el-table-column prop="priceLimitAf" label="划线价" width="180">
            </el-table-column>
            <el-table-column prop="salePriceAf" label="销售价" width="180">
            </el-table-column>
            </el-table-column>
        </el-table>
        </el-tab-pane>
       
      </el-tabs>
    
    </t>
    
    <t $="table" style="margin:0">
    
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
    handleClick(tab, event) {
      console.log(tab, event);
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
      activeName: "repertory",
      repertoryInfo:{
        
      }
    };
  },
});
