module.exports = APP.listMixin({
  template: APP.listMixin.html`

    <!-- <t $="table-before"> -->
      <div style="display:flex;flex-direction:column;width:100%;">
        <div style="height:50px;margin-bottom:20px;">
          <span>订单详情</span>
          <div style="float:right;">
            <el-button style="width:80px;" size="small">返回</el-button>
            <el-button style="width:80px;" type="primary" size="small">确认发货</el-button>
            <el-button style="width:80px;" type="danger" size="small">订单关闭</el-button>
          </div>
        </div>
        <div style="flex:1;display:flex;min-height:500px;height:auto;">
          <div style="width:280px;border-right:1px dashed #999;padding-left:10px;">
            <h2>已取消 | 超时未支付取消</h2>
            <el-button type="primary" plain style="width:220px;height:40px;">订单日志</el-button>
            <div>
              <strong style="display:block; margin:20px 0;">基本信息</strong>
              <ul style="padding:0;">
                <li style="list-style:none;margin-bottom:10px;" v-for="item in useResolver('orders.basicInfo',[])" :key='item.id'>
                  <span style="color:#999;display:inline-block;width:110px;font-size:10px;">{{item.label}}</span>
                  <!-- <span style="font-size:13px;">{{item.value}}</span> -->
                  <span v-if="item.label=='卡券抵扣'||item.label=='活动优惠'" style="font-size:13px;color:red;">{{item.value}}</span>
                  <span v-else style="font-size:13px;">{{item.value}}</span>
                </li>
              </ul>
            </div>
            <div>
              <strong style="display:block; margin:20px 0;">买家信息</strong>
              <ul style="padding:0;">
                <li style="list-style:none;margin-bottom:10px;" v-for="item in useResolver('orders.buyerInfo',[])" :key='item.id'>
                  <span style="color:#999;display:inline-block;width:110px;font-size:10px;">{{item.label}}</span>
                  <span style="font-size:13px;">{{item.value}}</span>
                  <!-- <span v-if="item.label=='卡券抵扣'||item.label=='活动优惠'" style="font-size:13px;color:red;">{{item.value}}</span>
                  <span v-else style="font-size:13px;">{{item.value}}</span> -->
                </li>
              </ul>
            </div>
            <div>
              <strong style="display:block; margin:20px 0;">分销返佣</strong>
              <ul style="padding:0;">
                <li style="list-style:none;margin-bottom:10px;" v-for="item in useResolver('orders.rebate',[])" :key='item.id'>
                  <span style="color:#999;display:inline-block;width:110px;font-size:10px;">{{item.label}}</span>
                  <span style="font-size:13px;">{{item.user+" | "+item.price}}</span>
                </li>
              </ul>
            </div>
          </div>
          <div style="flex:1;padding-left:20px;">
            <div>
              <div style="margin-bottom:30px;">
                <strong style="display:block; margin:20px 0;display:inline;">收货人信息</strong>
                <el-button type="text" style="float:right;margin-right:100px;font-size:10px;">修改</el-button>
              </div>
              <ul style="margin-left:40px;display:flex;flex-wrap:wrap;width:70%;">
                <li style="list-style:none;margin-bottom:20px;width:50%;" v-for="item in useResolver('orders.consigneeInfo',[])" :key='item.id'>
                  <span style="color:#999;display:inline-block;width:110px;font-size:10px;">{{item.label}}</span>
                  <span style="font-size:13px;">{{item.value}}</span>
                </li>
              </ul>
            </div>
            <div>
              <strong style="display:block; margin:20px 0;">付款信息</strong>
                <el-table :data="tableData" style="width:900px;" :header-cell-style="{background:'#eee'}">
                  <el-table-column align="center" prop="payType" label="支付方式" width="180">
                  </el-table-column>
                  <el-table-column align="center" prop="payState" label="支付状态" width="180">
                  </el-table-column>
                  <el-table-column align="center" prop="payTime" label="支付时间" width="180">
                  </el-table-column>
                  <el-table-column align="center" prop="payPrice" label="支付金额(元)" width="180">
                  </el-table-column>
                  <el-table-column align="center" prop="payId" label="支付流水号" width="180">
                  </el-table-column>180
                </el-table>
            </div>
            <div>
              <strong style="display:block; margin:20px 0;">订单明细</strong>
              <el-table :data="orderDetailData" style="width:902px;border:1px solid #eee;overflow-x:hidden;" :header-cell-style="{background:'#eee'}">
                <el-table-column align="center" prop="productName" label="商品" width="280">
                </el-table-column>
                <el-table-column align="center" prop="price" label="售价(元)" width="130">
                </el-table-column>
                <el-table-column align="center" prop="number" label="数量" width="100">
                </el-table-column>
                <el-table-column align="center" prop="deduction" label="卡券抵扣(元)" width="130">
                </el-table-column>
                <el-table-column align="center" prop="discounts" label="活动优惠(元)" width="130">
                </el-table-column>
                <el-table-column align="center" prop="activity" label="关联活动" width="130">
                </el-table-column>
              </el-table>
            </div>
            <div style="width:300px;float:right;padding-right:100px;">
              <ul style="padding:0;margin-top:15px;">
                <li style="list-style:none;margin-bottom:10px;" v-for="item in useResolver('orders.priceInfo',[])" :key='item.id'>
                  <span style="color:#999;display:inline-block;width:110px;font-size:10px;">{{item.label}}</span>
                  <span v-if="item.label=='优惠(卡券+活动)'" style="font-size:13px;color:red;">{{item.price}}</span>
                  <span v-else style="font-size:13px;">{{item.price}}</span>
                </li>
              </ul>
              <div style="border-top:1px solid #eee;padding-top:10px;">
                <span style="display:inline-block;width:110px;font-size:16px;">实收款:</span>
                <span style="font-size:16px;">￥3909.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    <!-- </t> -->
    <t $="create-update-detail-dialog-content"></t>
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
  },
  resolves: {
    orders: Bue.s.useCompData("service-orders..jsx"),
  },
  data() {
    return {
      SHOW_OPERATE_COLUMN: false,
      tableData: [
        {
          xinId: 1,
          payType: "微信支付",
          payState: "已支付",
          payTime: "2020-12-5 14:30:00",
          payPrice: "3809.00",
          payId: "123454321",
        },
      ],
      orderDetailData: [
        {
          xinId: 1,
          productName: "荣耀100",
          price: "￥3999.00",
          number: 1,
          deduction: "100.00",
          discounts: "0.00",
          activity: "-",
        },
      ],
    };
  },
});
