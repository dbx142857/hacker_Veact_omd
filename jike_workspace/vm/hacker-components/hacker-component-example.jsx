
return {
    template: html`
    <div _ngcontent-krk-c36="" class="filter">
        
    
        this is jsx example for hacker
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
        console.log('setup was invoked')
        // let res = await window['$angularHttp'].call('get', [location.host + '/api/admin/config/secure'], '/'),
        //     body = res.body || {}
        // if (body.cookie_max_valid_minutes) {
        //     this._data.secureSetting.cookie_max_valid_minutes = body.cookie_max_valid_minutes - 0
        //     this._data.tempData.secureSetting_cookie_max_valid_minutes = body.cookie_max_valid_minutes - 0
        // }
        // if (body.page_max_quiet_minutes) {
        //     this._data.secureSetting.page_max_quiet_minutes = body.page_max_quiet_minutes - 0
        //     this._data.tempData.secureSetting_page_max_quiet_minutes = body.page_max_quiet_minutes - 0
        // }
        // // HACKER.doNothing('res---:',res)
    }
}