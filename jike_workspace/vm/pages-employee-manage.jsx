module.exports = APP.listMixin({
    template: APP.listMixin.html`
  
      <t $="table-before">
        <div style="margin-bottom:20px;overflow:hidden;width:1000px;">
            <el-button type="primary" size="medium" @click="showDialog('create')">+ 新增店员</el-button>
            <el-button type="primary" plain size="medium" @click="showDialog('create')" style="background:#fff;color:#409eff;margin-left:20px;">批量导入</el-button>    
            <div style="float:right;position:relative;">
            <el-input clearable v-model="orgName" style="width:260px;" placeholder="
门店编号 / 门店名称" size="medium"> </el-input>
<el-button @click="fetchTableData" size="small" icon="el-icon-search" style="border:0;position:absolute;right:2px;padding:10px 12px;top:2px;"></el-button>

            </div>
           
        </div>
       
      </t>
      
      
      
      <t $="table">
            <el-table-column prop="orgId" label="员工工号" width="120"></el-table-column>
            <el-table-column prop="orgName" label="员工姓名" width="120"></el-table-column>
            <el-table-column prop="orgDesc" label="手机号码" width="120"></el-table-column>
            <el-table-column prop="merchantId" label="员工身份" width="120"></el-table-column>
            <el-table-column prop="orgStore" label="所属门店" width="120"></el-table-column>
            <el-table-column prop="orgRegion" label="门店大区" width="120"></el-table-column>
            <el-table-column prop="closeSwitch" label="状态" width="100" align="center">
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
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="addForm">
        <el-form-item label="员工工号：" prop="orgId">
          <el-input v-model="dialogModel.orgId"></el-input>
        </el-form-item>
        <el-form-item label="员工姓名：" prop="orgName">
          <el-input v-model="dialogModel.orgName"></el-input>
        </el-form-item>
        <el-form-item label="手机号码：" prop="orgDesc">
          <el-input v-model="dialogModel.orgDesc"></el-input>
        </el-form-item>
        <el-form-item label="所属门店：" prop="orgStore">
          <el-select v-model="dialogModel.orgStore" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="员工身份：" prop="merchantId">
          <el-radio-group v-model="dialogModel.merchantId">
            <el-radio-button label="店员"></el-radio-button>
            <el-radio-button label="店长"></el-radio-button>
          </el-radio-group>
        </el-form-item>

        
        <!-- <el-form-item label="门店大区：">
          <el-input v-model="dialogModel.orgRegion"></el-input>
        </el-form-item>  -->
        </el-form>
      </t>
      
      
      
      <t $="create-dialog-content">
      
      </t>
      <t $="update-dialog-content">
      
      </t>
      <t $="detail-dialog-content">
      
      </t>
    
    
    `,
  
    listUrl: "/biz-merchant/org/findOrganizationByParams?orgName={this.orgName} --get",
    createUrl: "/biz-merchant/org/add --post",
    updateUrl: "/biz-merchant/org/update",
    detailUrl: '/biz-merchant/org/findById/{this.currentHandlingRow.orgId} --get',
  
    methods: {
      detailDataTransformer(res, type) {
        console.log(res)
        if (type == 'update' || type == 'detail') {
          return {
            orgId: res.orgId,
            orgName: res.orgName,
            orgDesc: res.orgDesc,
            orgTel:17076775222,
            closeSwitch: this.currentHandlingRow.closeSwitch
          }
        }
      },
  
  
      async switchDisabledStatus(row) {
          console.log(row)
        this.httpOperateNotify(Bue.HTTP("/biz-merchant/org/switch", {
          method: "post",
          // headers: {
          //   "Content-Type": "multipart/form-data",
          // },
          // Bue.s.vmInstances['pages-store-clerk']
          body: {
            "orgId": row.orgId,
            "openFlag": row.closeSwitch
          },
        }), null, () => {
          row.closeSwitch = !row.closeSwitch
        })
  
  
      }
    },
    data() {
      return {
        createFD: {
          "orgName": "华南大区",
          "orgDesc": "华南区"
        },
        orgName: '',
        ruleForm: {
          orgId: '',
          orgName: '',
          orgDesc: '',
          orgStore: '',
          merchantId:''
        },
        rules: {
          orgId: [
            { required: true, message: '请输入员工工号', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          orgName: [
            { required: true, message: '请输入员工姓名', trigger: 'blur' }
          ],
          orgDesc: [
            { required: true, message: '请输入手机号码', trigger: 'blur'}
          ],
          orgStore: [
            { required: true, message: '请选择所属门店', trigger: 'blur' }
          ]
          // merchantId: [
          //   { required: true, message: '请选择员工身份', trigger: 'change' }
          // ],
     
        },
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      };
      
    }
  
  })