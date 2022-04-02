/**
 * for solve bug:https://pms.uniontech.com/zentao/bug-view-61451.html
 * 
 * 配置详情如果以blob:开头则置为空字符串
 * 
 */





// this.state.$refs['__LIST^CALENDER_CONTROL_BTN']
// alert(3)

// let WITH_NEXT_FEATURE = Boolean(sessionStorage.getItem('WITH_NEXT_FEATURE')) || Boolean(localStorage.getItem('WITH_NEXT_FEATURE'));
// WITH_NEXT_FEATURE=true;
// HACKER({
//     domContext: () => document.querySelector('m-default-permission'),
//     bindRoute: '/zone/detail',
//     styles() {
//         // return createGlobalStyle`
//         //     .abcdefghi{
//         //         color:red !important;
//         //     }
//         // `
//         // abcdefghi
//     },
//     // captureHttpBeforeReady:true,
//     state() {
//         return {
//             WITH_NEXT_FEATURE: WITH_NEXT_FEATURE,
//             disableMode: true,
//             clockModel: {
//                 abcde: {
//                     aa: 11
//                 },
//                 checked_period: 1,
//                 fooBar: 'aa',
//                 checked_period_unit: 'd'
//             }
//         }
//     },
//     mouseClick: {
//         // B_TARGET_CLICK_BTN_MR_3_NG_STAR_INSERTED_BTN_PRIMARY_ZONE_DETAIL_基础配置 
//         'B_TARGET_CLICK_BTN_MR_3_NG_STAR_INSERTED_BTN_PRIMARY_ZONE_DETAIL_基础配置': function () {
//             this.setState({
//                 disableMode: true
//             })
//             this.restartHacker(false)
//         },
//         'B_TARGET_CLICK_BTN_BTN_PRIMARY_NG_STAR_INSERTED_ZONE_DETAIL_编辑配置': function () {
//             this.setState({
//                 disableMode: false
//             })
//         },
//         'B_TARGET_CLICK_BTN_BTN_SECONDARY_MR_3_ZONE_DETAIL_取消': function () {
//             this.setState({
//                 disableMode: true
//             })
//         }
//     },
//     // reqInterceptor: [
//     //     {
//     //         url: ['/api/admin/scene_config/'],
//     //         method: 'patch',
//     //         formData: {
//     //             ...(function () {
//     //                 function foo(v) {
//     //                     // debugger;

//     //                     if (this.state.WITH_NEXT_FEATURE) {

//     //                         // alert(this.state.clockModel.checked_period)
//     //                         // if(HACKER.BX_MODE){
//     //                         v.checked_period = this.state.clockModel.checked_period
//     //                         v.checked_period_unit = this.state.clockModel.checked_period_unit
//     //                     }



//     //                     v.ntp_server = v.ntp_server.trim() == '' ? location.hostname : v.ntp_server
//     //                     HACKER.doNothing('vvvvvvvvvv--:', v)
//     //                     return v;
//     //                 }
//     //                 return {
//     //                     // 'pc_config.clock_sync_config': foo,
//     //                     'clock_sync_config': foo,
//     //                 }
//     //             })(),
//     //             // ['random_test_'+Math.random()]:'test',
//     //             // 'foo':'bar',
//     //             // 'pc_config.ntp_server': (v) => v.trim() == '' ? location.hostname : v,

//     //             // 'checked_period'
//     //             // 'clock_sync_config.ntp_server': function(v){

//     //             //     return v.trim() == '' ? location.hostname : v
//     //             // },
//     //             // 'clock_sync_config.checked_period':(v,vm)=>vm.state.clockModel.checked_period
//     //         }
//     //     }

//     // ],
//     resInterceptor: [
//         {
//             url: ['/api/admin/scene_config/'],
//             hook(res) {
//                 this.setState({
//                     disableMode: true,
//                     // 'clockModel.checked_period':5
//                 });

//                 let msgs = (res.message || []), config = msgs[0] || {}, clock_sync_config = config.clock_sync_config


//                 if (clock_sync_config) {
//                     // alert('shit')
//                     let checked_period = JSON.parse(clock_sync_config).checked_period
//                     // alert(checked_period)
//                     // this.state.clockModel.checked_period=checked_period
//                     this.setState({
//                         // disableMode:true,
//                         'clockModel.checked_period': checked_period
//                     });
//                 }

//                 // alert('hook')

//                 // debugger;
//                 // alert(1)
//                 // msgs.forEach((row)=>{
//                 //     let pc_config=JSON.parse(row.pc_config);
//                 //     let s=pc_config.script.content;
//                 //     if(typeof(s)=='string' && s.trim().startsWith('blob:')){
//                 //         // alert('fuck')
//                 //         pc_config.script.content=''
//                 //     }

//                 //     row.pc_config=JSON.stringify(pc_config)
//                 //     HACKER.doNothing('row--:',row)
//                 // })
//                 // alert(2)

//                 // HACKER.doNothing('res in hook--:',res,this)
//             }
//         }

//     ]

// })


/**
 * 【Web端】【搜索功能优化】终端异常日志按关键字搜索时带空格,无法搜索到匹配内容
 * https://pms.uniontech.com/zentao/bug-view-61932.html
 */

// HACKER({//拦截/api/admin/logs/pc/exception请求并修改其入参
//     bindRoute: '/logs/pc/exception',
//     captureHttpBeforeReady: true,
//     reqInterceptor: [
//         {
//             url: ['/api/admin/logs/pc/exception'],
//             params: {
//                 keywords: (vm, row, isFetch) => {
//                     let res = (row.keywords || '').trim();
//                     HACKER.doNothing('res--:', res)
//                     return res;
//                 }
//             }
//         }

//     ]

// })


/**
 * 解决消息管理下发消息，点击选择区域按钮，弹出的树组件，选择节点后右侧的table查询出来为空的问题（更换id为area_id）
 */

// HACKER({
//     bindRoute: '/message/client/send',
//     mouseClick: {
//         'B_TARGET_CLICK_BTN_BTN_PRIMARY_MESSAGE_CLIENT_SEND_选择': function () {
//             try {

//                 var id = JSON.parse(document.querySelector('.cdk-overlay-pane .mat-radio-checked').getAttribute('dir')).area_id;
//                 this.setState({
//                     idForQueryReceivePeopleList: id
//                 })
//             } catch (e) {

//             } finally {

//             }
//             HACKER.doNothing('this---:', this)
//         }
//     },
//     reqInterceptor: [
//         {
//             url: /^\/api\/admin\/area\/\d/,
//             transformUrl(url) {
//                 let id = this.state.idForQueryReceivePeopleList;
//                 let urlArr = url.split('?')
//                 if (id) {
//                     url = urlArr[0].split('/').map(o => (Number.isInteger(o - 0) ? id : o)).join('/') + '?' + urlArr[1]
//                 }


//                 HACKER.doNothing('url and this--:', url, this)
//                 this.$nextTick(() => {
//                     this.setState({
//                         idForQueryReceivePeopleList: null
//                     })
//                 })
//                 return url;
//             }

//         }

//     ]

// })

// HACKER({
//     bindRoute:'/message/web/all',
//     firstParsed(){
//         Object.values(this.state.$refs['__LIST^detailNavigator']).forEach((obj)=>{
//             HACKER.doNothing('obj--:',obj)
//         })
//     }
// })

// /message/web/all


/**
 * 新增平台配置-安全配置
 * 
 * 
 * 
 */
// HACKER({
//     replacer: [
//         {
//             target: 'm-client-update',
//             component: '/assets/hackService/platformSetting.jsx'
//         }
//     ],
//     bindRoute: '/settings/platform_setting',
//     // abortRequest: '/api/admin/client_update'
// });

/**
 * 
 * 【Web端】【任务管理员】选终端为空时未报错，与区域详情添加终端效果不一致
 * 
 * https://pms.uniontech.com/zentao/bug-view-63749.html
 */
// HACKER({//
    
//     bindRoute: '/task/add',
//     mouseClick:{
//         'B_TARGET_CLICK_BTN_BTN_PRIMARY_TASK_ADD_保存':function(){
//             let table=HACKER.$.$('table'),
//             tr=table[table.length-1].querySelectorAll('tr')
//             if(tr.length==1){
//                 window['$angularToast'].t.error('no pc_id')
//             }
//         }
//     }
// });








// let canToast401=true;
// function foo(request, response) {
//     // HACKER.doNothing('response--:',response)
//     if(!location.pathname.startsWith('/login') && response.status==401 && !request.url.endsWith('islogin')&& !request.url.endsWith('logout')){

//         // debugger
        // let message;
        // try{
        //     message=JSON.parse(response.text).message
        // }catch(e){
        //     message='登陆已过期，请重新登录'
        // }

        // if(canToast401){
        //     window['$angularToast'].t.error(message)
        // }
        // canToast401=false;
        // setTimeout(()=>{
        //     canToast401=true;
        //     location.href=location.origin;
        // },1000)
        
//         // response.text = response.text
//     }
        
//   }


// foo.effectUrl='*'
// xhook.after(foo);


// xhook.after((function () {

//     function foo(request, response) {

        // alert(response.code)
        // response.text = response.text
//     }

//     foo.effectUrl = '*'
//     return foo;
// }));


