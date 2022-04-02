module.exports = APP.listMixin({
	template: APP.listMixin.html`

	<!-- <t $="table-before"> -->
	<!-- <div> -->
	<el-tabs v-model="activeName" @tab-click="outerHandleClick">
		<el-tab-pane label="基础信息" name="basic">
			<!-- <h3>基本信息</h3> -->
	
			<el-form :model="basicInfo" :rules="rules" ref="basicInfo" label-width="100px" class="demo-ruleForm">
				<el-form-item label="商品类型">
					<el-radio-group v-model="labelPosition" size="small">
						<el-radio-button label="left">实物</el-radio-button>
						<el-radio-button label="right" @click="Bue.vuePush('/pages-m')替代即可
">权益</el-radio-button>
	
					</el-radio-group>
				</el-form-item>
				<el-form-item label="商品名称" prop="name">
					<el-input v-model="basicInfo.name" style="width:300px"></el-input>
				</el-form-item>
				<el-form-item label="商品描述" prop="description">
					<el-input v-model="basicInfo.description" style="width:400px"></el-input>
				</el-form-item>
				<el-form-item label="商品编码" prop="encoding">
					<el-input v-model="basicInfo.encoding" style="width:300px"></el-input>
				</el-form-item>
				<el-form-item label="商品类目" prop="class">
					<el-select v-model="basicInfo.class" placeholder="请选择">
						<el-option label="商品1" value="shanghai"></el-option>
						<el-option label="商品2" value="beijing"></el-option>
					</el-select>
					<el-button
						style="text-align:center;color:#409Eff; border-radius: 50%;width: 5px;border:1px solid #409Eff">+
					</el-button>
				</el-form-item>
	
				<el-form-item label="商品缩略图" prop="thumbnail">
					<el-upload action="#" list-type="picture-card" :auto-upload="false">
						<i slot="default" class="el-icon-plus"></i>
						<div slot="file" slot-scope="{file}">
							<img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
							<span class="el-upload-list__item-actions">
								<span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
									<i class="el-icon-zoom-in"></i>
								</span>
								<span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
									<i class="el-icon-download"></i>
								</span>
								<span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
									<i class="el-icon-delete"></i>
								</span>
							</span>
						</div>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
						<img width="100%" :src="dialogImageUrl" alt="">
					</el-dialog>
				</el-form-item>
				<el-form-item label="商品详情图" prop="detail">
					<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
						:show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
						<img v-if="imageUrl" :src="imageUrl" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
	
				</el-form-item>
				<h3>库存与规格</h3>
				<div>
					<el-button style="color:#409Eff;border:1px solid #409Eff">+添加规格</el-button>如有颜色、尺码多种规格，请添加商品规格
					<div>
	
						<div style="backgroundColor:#eeeeee;height:80px;padding:20px;margin:12px 0">
							<el-input v-model="specificationSize" placeholder="请输入,如：颜色" style="width:200px"></el-input>
							<el-checkbox v-model="specificationImg">添加规格图片</el-checkbox>
						</div>
						<div style="backgroundColor:white; border:1px solid #eeeeee;padding:20px; margin:12px 50px 12px 0">
							<el-input v-model="specificationColor" placeholder="请输入,如：红色"
								style="width:200px; margin:0 12px;"></el-input>
							<el-button style="color:primary">+添加规格值</el-button>
							<el-form-item prop="thumbnail">
								<el-upload action="#" list-type="picture-card" :auto-upload="false">
									<i slot="default" class="el-icon-plus"></i>
									<div slot="file" slot-scope="{file}">
										<img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
										<span class="el-upload-list__item-actions">
											<span class="el-upload-list__item-preview"
												@click="handlePictureCardPreview(file)">
												<i class="el-icon-zoom-in"></i>
											</span>
											<span v-if="!disabled" class="el-upload-list__item-delete"
												@click="handleDownload(file)">
												<i class="el-icon-download"></i>
											</span>
											<span v-if="!disabled" class="el-upload-list__item-delete"
												@click="handleRemove(file)">
												<i class="el-icon-delete"></i>
											</span>
										</span>
									</div>
								</el-upload>
								<el-dialog :visible.sync="dialogVisible">
									<img width="100%" :src="dialogImageUrl" alt="">
								</el-dialog>
							</el-form-item>
						</div>
	
					</div>
					<div>
						<el-table :data="specificationInfo" align="center" border stripe style="width: 100%">
							<el-table-column prop="specification" label="商品规格" width="180">
								<t $$="scope">
									<div>
										<span>{{this.specificationColor+this.specificationSize}}</span>
									</div>
								</t>
							</el-table-column>
							<el-table-column prop="code" label="规格编码" width="180">
								<t $$="scope">
									<div>
										<el-input v-model="specificationCoding"
											style="width:150px;border:1px solid #eeeeee; border-radius:5px;margin:8px">
										</el-input>
									</div>
								</t>
							</el-table-column>
							<el-table-column prop="listpricing" label="划线价（元）">
								<t $$="scope">
									<div>
										<el-input v-model="listPricing"
											style="width:150px;border:1px solid #eeeeee; border-radius:5px;margin:8px">
										</el-input>
									</div>
								</t>
							</el-table-column>
							<el-table-column prop="salePricing" label="销售（元）">
								<t $$="scope">
									<div>
										<el-input v-model="salePricing"
											style="width:150px;border:1px solid #eeeeee; border-radius:5px;margin:8px">
										</el-input>
									</div>
								</t>
							</el-table-column>
							<el-table-column prop="repertory" label="库存">
								<t $$="scope">
									<div>
										<el-input v-model="repertory"
											style="width:150px;border:1px solid #eeeeee; border-radius:5px;margin:8px">
										</el-input>
									</div>
								</t>
							</el-table-column>
						</el-table>
	
					</div>
				</div>
	
	
				<h3>限购规则</h3>
				<template>
					<el-radio v-model="purchaselimit" label="2">不限购</el-radio>
					<el-radio v-model="purchaselimit" label="1">限购</el-radio>
	
				</template>
				<div v-show='purchaselimit==1' style="display:inline-block">
					每人最多购买
					<el-input v-model="purchase" style="width:200px"></el-input>件
				</div>
	
				<h3>配送设置</h3>
				<el-form-item label="配送方式:" prop="dispatching">
					物流/快递
				</el-form-item>
				<el-form-item label="统一运费:" prop="carriage">
					<el-input v-model="carriage" placeholder="请输入" style="width:200px"></el-input>元
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
					<el-button @click="resetForm('ruleForm')">取消</el-button>
				</el-form-item>
			</el-form>
			<!-- </el-tab-pane> -->
	
	</el-tabs>
	</el-tab-pane>
	<el-tab-pane label="商品详情" name="detail">商品详情</el-tab-pane>
	</el-tabs>
	<!-- </div>	  -->
	<!-- </t> -->
	
	
	
	<t $="table">
	
	
	
	
	
	
	
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
		outerHandleClick(tab, event) {
			console.log(tab, event);
		},
		innerHandleClick(tab, event) {
			console.log(tab, event);
		},
		handleRemove(file) {
			console.log(file);
		},
		handlePictureCardPreview(file) {
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		},
		handleDownload(file) {
			console.log(file);
		},
		handleAvatarSuccess(res, file) {
			this.imageUrl = URL.createObjectURL(file.raw);
		},
		beforeAvatarUpload(file) {
			const isJPG = file.type === 'image/jpeg';
			const isLt2M = file.size / 1024 / 1024 < 2;

			if (!isJPG) {
				this.$message.error('上传头像图片只能是 JPG 格式!');
			}
			if (!isLt2M) {
				this.$message.error('上传头像图片大小不能超过 2MB!');
			}
			return isJPG && isLt2M;
		},
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
			activeName: 'basic',
			labelPosition: 'left',
			dialogImageUrl: '',
			specificationCoding: "",

			SHOW_OPERATE_COLUMN: false,
			imageUrl: '',
			specificationSize: "",
			specificationColor: "",
			specificationImg: true,
			disabled: false,
			purchaselimit: 1,
			purchase: 1,
			specificationInfo: {
				specificationCoding: "",
				 listpricing: "", 
				 salePricing: "",
				  repertory: ""
			},
			basicInfo: {
				name: "",
				description: "",
				encoding: "",
				class: "",
				thumbnail: "",
				detail: ""


			},
			rules: {
				name: [{
					required: true,
					message: '请输入商品名称',
					trigger: 'blur'
				},
				{
					min: 8,
					max: 20,
					message: '长度在 8 到 20 个字符',
					trigger: 'blur'
				}
				],

				description: [{
					required: true,
					message: '请输入商品描述',
					trigger: 'blur'
				},
				{
					min: 8,
					max: 40,
					message: '长度在 8 到 40 个字符',
					trigger: 'blur'
				}
				],
				class: [{
					required: true,
					message: '请输入商品描述',
					trigger: 'blur'
				}],
				thumbnail: [{
					required: true,
					message: '请输入商品描述',
					trigger: 'blur'
				}],
				detail: [{
					required: true,
					message: '请输入商品描述',
					trigger: 'blur'
				}],
			},
			createFD: {
				orgName: "华南大区",
				orgDesc: "华南区",
			},
			orgName: "",
		};
	},
});
