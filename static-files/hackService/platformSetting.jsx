
return {
    template: html`
    <div _ngcontent-krk-c36="" class="filter">
        <!-- <div data-hacker-html="{this.foo}"></div> -->
    
        <div id="abcdefg" data-hacker style="font-size: 1.2rem;
        
                border-radius: 4px;
                color: #555557;
                background-color: #ebedf2;
                display: flex;
                min-height: 3rem;
                align-items: center;
                justify-content: space-between;
                padding: 0 1rem;
                margin-bottom: 1rem;padding:5px 15px;" _ngcontent-kqo-c9="" class="title">
    
            <span _ngcontent-kqo-c9="">平台配置</span>
            <div _ngcontent-kqo-c9="" data-hacker-show="{this.isEditing}">
    
    
    
                <div _ngcontent-rjm-c35="" class="ng-star-inserted">
                    <button data-hacker @click="handleCancelbtnClick"
                        _ngcontent-rjm-c35="" class="btn btn-secondary mr-3">取消</button>
                        <button data-hacker @click="saveSecurtySetting" _ngcontent-rjm-c35=""
                        class="btn btn-primary abcdefghi">保存</button>
                </div>
    
    
    
            </div>
    
            <div _ngcontent-kqo-c9="" data-hacker-show="{this.isEditing?false:true}">
                <div _ngcontent-rjm-c35="" class="ng-star-inserted">
                    <!-- <button data-hacker @click="HACKER.doNothing(this);this._data.isEditing=!this._data.isEditing" _ngcontent-rjm-c35=""
                            class="btn btn-secondary mr-3">取消</button> -->
                    <button data-hacker @click="HACKER.doNothing(this);this._data.isEditing=!this._data.isEditing"
                        _ngcontent-rjm-c35="" class="btn btn-primary">编辑</button>
                </div>
            </div>
    
        </div>
    
    
        <div>
            <!----><button _ngcontent-krk-c36="" class="btn ml-3 ng-star-inserted btn-primary"
                routerlinkactive="btn-primary" tabindex="0"> 安全配置 </button>
            <!-- <button _ngcontent-krk-c36="" 
                            class="btn ml-3 ng-star-inserted btn-secondary"
                            routerlinkactive="btn-primary" tabindex="0"> 软件使用日志 </button> -->
        </div>
    
    
    
    
    
    
    
    
    
    
        <div style="padding-left:30px;margin-top:20px;" _ngcontent-tkd-c18="" class="enterprise-body ng-star-inserted">
    
            <div _ngcontent-tkd-c18="" class="row">
                <div _ngcontent-tkd-c18="" class="subject mt-3">cookie有效期：</div>
                <!-- -->
                <!-- <button data-hacker-html="{this.secureSetting.cookie_max_valid_minutes}"></button> -->
                <div _ngcontent-tkd-c18="" class="detail">
                    <input
                    style="width:260px"
                    @input="handleInputInput"
                    id="abcdefghi"
                    data-hacker-disabled="{this.isEditing?false:true}"
                        data-hacker-model="{this.secureSetting.cookie_max_valid_minutes}" type="text" min="1" max="44640"
                        _ngcontent-tkd-c18="" class="form-control ng-pristine ng-touched"
                        data-hacker-class-ng-invalid="{this.$vm.isInvalidNum(this.secureSetting.cookie_max_valid_minutes)}"
                        ng-reflect-maxlength="20" ng-reflect-form="[object Object]" />

                        <div
                        data-hacker-show="{this.$vm.isInvalidNum(this.secureSetting.cookie_max_valid_minutes)}"
                        
                        _ngcontent-sly-c37="" class="invalid-feedback ng-star-inserted">
                            <span _ngcontent-sly-c37="" class="ng-star-inserted"> 
                                请输入1-44640之间的正整数 </span></div>
                        
                    <!-- <div _ngcontent-tkd-c18="" class="comment">网站标题, 显示在浏览器 Tab 中</div> -->
                </div>
                <span style="line-height: 43px;
    margin-left: 20px;">分钟</span>

<div style="display: inline;padding-top:11px;
               " _ngcontent-max-c37="" class="ml-3 ng-star-inserted"><i _ngcontent-max-c37=""
        class="material-icons" title="管理员通过浏览器访问控制台时，生成的cookie最长有效期，失效后需要重新登录；可输入1-44640之间的正整数">error_outline</i>
</div>

                <!--bindings={
          "ng-reflect-ng-if": "false"
        }-->
            </div>
    
            <div _ngcontent-tkd-c18="" class="row">
                <div _ngcontent-tkd-c18="" class="subject mt-3">页面最长静止时间：</div>
                <div _ngcontent-tkd-c18="" class="detail">
                    <input
                    style="width:260px"
                    data-hacker-disabled="{this.isEditing?false:true}"
                    type="text" min="1" max="44640"
                    data-hacker-class-ng-invalid="{this.$vm.isInvalidNum(this.secureSetting.page_max_quiet_minutes)}"
                        
                        data-hacker-model="{this.secureSetting.page_max_quiet_minutes}" _ngcontent-tkd-c18=""
                        class="form-control ng-pristine ng-valid ng-touched" ng-reflect-maxlength="20"
                        ng-reflect-form="[object Object]" />


                        <div
                        data-hacker-show="{this.$vm.isInvalidNum(this.secureSetting.page_max_quiet_minutes,1440)}"
                        
                        _ngcontent-sly-c37="" class="invalid-feedback ng-star-inserted">
                            <span _ngcontent-sly-c37="" class="ng-star-inserted"> 
                                请输入1-1440之间的正整数 </span></div>

                    <!-- <div _ngcontent-tkd-c18="" class="comment">网站标题, 显示在浏览器 Tab 中</div> -->
                </div>
                <span style="line-height: 43px;
    margin-left: 20px;">分钟</span>

<div style="display: inline;padding-top:11px;
               " _ngcontent-max-c37="" class="ml-3 ng-star-inserted"><i _ngcontent-max-c37=""
        class="material-icons" title="管理员登录控制台后,超过一定时长(最长静止时间)未操作页面，再次操作时需要重新登录;可输人1-1440之间的正整数。">error_outline</i>
</div>

                <!--bindings={
          "ng-reflect-ng-if": "false"
        }-->
            </div>
    
        </div>
    
    
    
    
    
    
    </div>
    `,
    // name: 'platformSetting',
    data() {

        return {
            secureSetting: {
                cookie_max_valid_minutes: 5,
                page_max_quiet_minutes: 30
            },
            tempData:{
                secureSetting_cookie_max_valid_minutes:'',
                secureSetting_page_max_quiet_minutes:''
            },
            isEditing: false,
        }
    },

    styles(){
        return createGlobalStyle`
            .mt-3{
                width:150px;
            }
            .row{
                margin-top:15px;
            }
        `
    },
    isInvalidNum(v,max=44640){
        v=v-0
        return !(Number.isInteger(v) && v>=1 & v<=max)
    },
    methods:{
        
        handleInputInput(){
            HACKER.doNothing('args--:',arguments)
            // HACKER.doNothing(1);this.value=this.value.replace(/[^\d]/g,'');
        },
        handleCancelbtnClick(){
            HACKER.doNothing(this);
            this._data.isEditing=!this._data.isEditing

            this._data.secureSetting.cookie_max_valid_minutes=this._data.tempData.secureSetting_cookie_max_valid_minutes 
            this._data.secureSetting.page_max_quiet_minutes=this._data.tempData.secureSetting_page_max_quiet_minutes 
        },
        async saveSecurtySetting(){

            if(this.isInvalidNum(this.$vm._data.secureSetting.cookie_max_valid_minutes) || this.isInvalidNum(this.$vm._data.secureSetting.page_max_quiet_minutes,1440)){
                return false;
            }

            let fd=new FormData();
            for(let i in this._data.secureSetting){
                fd.append(i,this._data.secureSetting[i])
            }

            // this.http.patch(`/api/admin/scene_config/${zid}`, formData).toPromise();
            let res = await window['$angularHttp'].client.patch(  '/api/admin/config/secure',fd).toPromise();
            this._data.isEditing=false
            HACKER.doNothing('res--:',res)
            window['$angularToast'].success('操作成功')

            this._data.tempData.secureSetting_cookie_max_valid_minutes = this._data.secureSetting.cookie_max_valid_minutes
            this._data.tempData.secureSetting_page_max_quiet_minutes = this._data.secureSetting.page_max_quiet_minutes
        },
    },
    
    async setup() {
        let res = await window['$angularHttp'].call('get', [location.host + '/api/admin/config/secure'], '/'),
            body = res.body || {}
        if (body.cookie_max_valid_minutes) {
            this._data.secureSetting.cookie_max_valid_minutes = body.cookie_max_valid_minutes - 0
            this._data.tempData.secureSetting_cookie_max_valid_minutes = body.cookie_max_valid_minutes - 0
        }
        if (body.page_max_quiet_minutes) {
            this._data.secureSetting.page_max_quiet_minutes = body.page_max_quiet_minutes - 0
            this._data.tempData.secureSetting_page_max_quiet_minutes = body.page_max_quiet_minutes - 0
        }
        // HACKER.doNothing('res---:',res)
    }
}