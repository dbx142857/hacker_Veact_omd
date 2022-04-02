module.exports = APP.listMixin({
  template: APP.listMixin.html`

<t $="table-before">

  <el-button @click="showDialog('create')">创建demo</el-button>
  <el-input clearable v-model="shopName" style="width:200px;margin-left:200px;" placeholder="demo名称"></el-input>
  <el-button @click="fetchTableData">搜索</el-button>
</t>



<t $="table">

  <el-table-column prop="shopId" label="demoid" width="180">
  </el-table-column>
  <el-table-column prop="shopName" label="demo名称" width="180">
  </el-table-column>
  <el-table-column prop="shopDesc" label="描述" width="180">
  </el-table-column>
  <el-table-column prop="closeSwitch" label="状态" width="180">
    <template slot-scope="scope">
      <el-switch @change="switchDisabledStatus(scope.row)" v-model="scope.row.closeSwitch"></el-switch>
    </template>

  </el-table-column>





</t>

<t $="table-after">

</t>

<t $="operate">

</t>


<t $="create-update-detail-dialog-content">


  <el-form-item label="demo名称">
    <el-input v-model="dialogModel.shopName"></el-input>
  </el-form-item>
  <el-form-item label="描述">
    <el-input type="textarea" v-model="dialogModel.shopDesc"></el-input>
  </el-form-item>
  <el-form-item label="位置">
    <basic-map..jsx @change="dialogModel.latitude=arguments[0].lat;dialogModel.longitude=arguments[0].lng;"
      :value="{lat:dialogModel.latitude,lng:dialogModel.longitude}" ref="basicMap">
    </basic-map..jsx>
  </el-form-item>


</t>



<t $="create-dialog-content">

</t>
<t $="update-dialog-content">

</t>
<t $="detail-dialog-content">

</t>
  
  
  `,

  listUrl: "/biz-merchant/shop/findByPage?allMatcher={this.allMatcher}&p=2 --get",
  createUrl: "/biz-merchant/shop/add --post",
  updateUrl: "/biz-merchant/shop/update",
  detailUrl: '/biz-merchant/shop/findById/{this.currentHandlingRow.shopId} --get',

  resolves: {
    orgList() {
      return this.r('/biz-merchant/org/findOrganizationByParams --get')
    }
  },

  methods: {
    detailDataTransformer(res, type) {
      if (type == 'update' || type == 'detail') {
        return {
          shopId: res.shopId,
          shopName: res.shopName,
          shopDesc: res.shopDesc,
          closeSwitch: this.currentHandlingRow.closeSwitch
        }
      }
    },


    async switchDisabledStatus(row) {

      this.httpOperateNotify(Bue.HTTP("/biz-merchant/shop/switch", {
        method: "post",
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
        body: {
          "shopId": row.shopId,
          "openFlag": row.closeSwitch
        },
      }), null, () => {
        row.closeSwitch = !row.closeSwitch
      })


    }
  },

  data() {
    return {
      OPERATE_BTN_CONFIG: {
        DETAIL: false
      },
      createFD: {
        "shopName": "巨量跳动上海店",
        "shopNo": "0002",
        "province": "上海市",
        "area": "上海市",
        "city": "浦东新区",
        "address": "东方路800号",
        "longitude": 116.307484,
        "latitude": 39.984120,
        "openDaily": "08:00",
        "closeDaily": "22:00",
        "orgId": 22,
        "contactsNumber": "18502139208"
      },
      shopName: '',
      allMatcher: '0001'
    }
  }

})