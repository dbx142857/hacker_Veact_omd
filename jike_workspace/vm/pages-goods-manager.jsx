module.exports = APP.listMixin({
    template: APP.listMixin.html`
  
    <t $="table-before">
        <el-button type="primary">新增一级商品类目+</el-button>
        <div style="display:flex;width:100%">
            <el-form :model="manager" ref="manager" style="flex:1;" :inline="true">
                <el-form-item label="商品">
                    <el-input size="small" v-model="manager.goodsName" class="input-with-select"
                        style="width:204px;margin-left:14px;vertical-align: initial;">
                        <el-select v-model="manager.goodsName" placeholder="商品名称"  slot="prepend" style="width:100px" >
                            <el-option v-for="item in goods" :key="item.productId" :label="item.productName"
                                    :value="item.productName">
                                </el-option>
                        </el-select>
                    </el-input>
                </el-form-item>
                <el-form-item label="类型" style="margin-left:60px;">
    
                    <el-select v-model="manager.goodsType" placeholder="全部" style="width:120px">
                        <el-option label="实物" value="实物"></el-option>
                        <el-option label="权益" value="权益"></el-option>
    
                    </el-select>
    
                </el-form-item>
    
                <el-form-item label="类目" style="margin-left:60px;">
                    <el-select v-model="manager.goodsClass" placeholder="全部" style="width:120px">
                        <el-option v-for="item in category" :key="item.categoryId" :label="item.categoryName"
                            :value="item.categoryName">
                        </el-option>
                    </el-select>
                </el-form-item>
    
                <el-form-item label="提审" style="margin-left:6px;">
                    <el-select v-model="manager.goodsCheck" placeholder="全部" style="width:120px">
                        <el-option label="未提审" value="未提审"></el-option>
                        <el-option label="审核通过" value="审核通过"></el-option>
                        <el-option label="审核中" value="审核中"></el-option>
                    </el-select>
    
                </el-form-item>
                <el-form-item label="上架状态" style="margin-left:140px;">
                    <el-select v-model="manager.goodsPutaway" placeholder="全部" style="width:120px">
                        <el-option label="上架" value="上架"></el-option>
                        <el-option label="下架"  value="下架"></el-option>

                    </el-select>
    
                </el-form-item>
    
    
            </el-form>
            <div style="width:260px;display:flex;flex-direction: column;align-items:center;justify-content:center;">
                <el-button type="primary" style="width:100px;margin-left:10px;margin-bottom:30px;" size="small"@click="search()">检索
                </el-button>
                <el-button plain style="width:100px;" size="small">重置</el-button>
            </div>
    
        </div>
    
    
    </t>
    
    <t $="table"   style="width: 100%">
            <el-table-column label="商品" property="productName" width="180">
            
                 <t $$="scope">
                    <div>
                    <img :src="scope.row.coverImage" :alt="scope.row.productName"/>
                    <p> {{scope.row.productNo}}</p>
           
                    <!-- {{"<img :src="coverImage" :alt="scope.row.productName"/> "+scope.row.productName+"productNo"}} -->
                    </div>
                </t>
            </el-table-column>
            <el-table-column property="categoryNames" label="类目" width="150">
            </el-table-column>
            <el-table-column property="check" label="直播商品提审" width="150">
            </el-table-column>
            <el-table-column prop="productStatus" label="商品上架状态" width="150">
            </el-table-column>
           
          
    </t>
    
    <t $="table-after">
    
    </t>
    
    
    
    
    
    
    
    
    <t $="create-dialog-content">
    
    </t>
    <t $="update-dialog-content">
    
    </t>
    <t $="detail-dialog-content">
    
    </t>
    
    `,

    listUrl:"/biz-merchant/product/findByPage --get ",
    createUrl: "/biz-merchant/org/add --post",
    updateUrl: "/biz-merchant/org/update",
    detailUrl: "/biz-merchant/org/findById/{this.currentHandlingRow.orgId} --get",

    mounted() {
        this.r("/biz-merchant/category/findCategoryTree --get").then(
            res => {
                console.log(res);
                this.category = res
            }
        )
    //     this.r("/biz-merchant/product/findByPage --get").then(
    //         res => {
    //             console.log(res.list);
    //             this.goods = res.list;
              
    //         }
    //     )
      
    },
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

        async switchDisabledStatus() {
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
            category: [],
            goods: [],
            manager: {
                goodsName: "",
                goodsType: "",
                goodsClass: "",
                goodsCheck: "",
                goodsPutaway: "",
            },
          
            
        };
    },
});
