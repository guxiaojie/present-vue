import{a as $,_ as P,o as _,c as m,b as i,d as u,t as y,F as A,r as H,e as L,f as R,w as l,g as q,v as T,h as b,i as c,j as W,k as j,l as B,m as D,n as J,V as G}from"./vendor.78b9da4e.js";const O=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function s(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerpolicy&&(a.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?a.credentials="include":n.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(n){if(n.ep)return;n.ep=!0;const a=s(n);fetch(n.href,a)}};O();let V="";V="https://www.storiesmatter.cn";class M{constructor(e){this.storyId=1,this.config=e,this.config.baseURL=V+"/api",this.token()}token(){const e="Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ5MDc0MTEzLCJqdGkiOiJkZjI0MWY3NGUzMDA0NWQ5ODEyZTViZWQzYTk5NWIwYiIsInVzZXJfaWQiOjF9.BMA9VKU8ewI6V9Sr9DRTkZ3s3eJHQvSG72GvqhL-brA";this.axios=$.create({baseURL:this.config.baseURL}),this.axios.defaults.headers.common.Authorization=e}async roles(e){const s=await this.axios.get(`topics/${e}/roles/`);return console.log("response",s),s.data}async home(e){const s=await this.axios.get(`topics/${e}/home/`);return console.log("response",s),s.data}async pricing(){const e=await this.axios.get(`topics/${this.storyId}/pricing/`);return console.log("response",e),e.data}async login(){const e={avatar_url:"https://thirdwx.qlogo.cn/mmopen/vi_32/Q3auHgzwzM6pjAcqAwjE9l9Yc8bex4lrJ2PFE9rnJXvM0oSicxW8liadwT46J3pOMdHJ1scGR2jHiaEnVHWqcdYMA/132",city:"",country:"",gender:0,js_code:"091gvxGa1ypdMC0tOrJa1cOmJQ1gvxG3",language:"zh_CN",nick_name:"\u8C37\u6653\u6D01Sage",province:""};let s=[];const o="";if(o.length>0)for(let d of o)s.push(d.route);var n="",a={method:"POST",url:this.config.baseURL+"/simple-wechat-login/",headers:{Authorization:n,"Content-Type":"application/json"},data:e};return console.log("------options",a),(await $(a)).data}handleAxiosError(e){console.log("response err",e),console.log("response err",e.msg)}handleUnexpectedError(e){this.handleAxiosError(e)}async orders(e,s){try{const{data:o,statusCode:n,msg:a}=await this.axios.post(`topics/${e}/orders/`,{pricing_id:s});return console.log("response data",o),o}catch(o){console.log("response mserrorerrorg",o),$.isAxiosError(o)?this.handleAxiosError(o):this.handleUnexpectedError(o)}}}function I(){let t=document.documentElement.clientWidth||document.body.clientWidth;console.log("----------htmlWidth",t);let e=document.getElementsByTagName("html")[0];t>=450?e.style.fontSize=22+"px":e.style.fontSize=t/20+"px"}I();window.onresize=function(){I()};const N=async(t,e,s,o={},n)=>{if(o.cacheKey){const d=U();if(d)return d}let a=[];const r="";if(r.length>0)for(let d of r)a.push(d.route)},U=t=>{const e="";return(new Date().getTime()-Number.parseInt(e.createTime))/1e3>86400?!1:e.value};var g={doRequest:N};const K=2;let z="";z="https://www.storiesmatter.cn";var f={host:z,url:z+"/api",check_openid:z+"/api/check_openid",env:K,mapKey:""};const Y=async(t,e,s={})=>await g.doRequest(`${f.url}/${t}`,"GET",e,s),F=async(t,e,s={})=>await g.doRequest(`${f.url}/${t}`,"PUT",e,s),Q=async(t,e,s={})=>await g.doRequest(`${f.url}/${t}`,"Post",e,s),X=async(t,e,s={})=>await g.doRequest(`${f.url}/${t}`,"DELETE",e,s),Z=async(t,e={})=>await g.wxUpload(`${f.url}/upload`,t,e),ee=(t,e,s={},o)=>g.doRequest(`${f.url}/${t}`,"GET",e,s,o),te=(t,e,s={},o)=>g.doRequest(`${f.url}/${t}`,"Post",e,s,o),se=(t,e,s={},o)=>g.doRequest(t,"GET",e,s,o),oe=(t,e,s={},o)=>g.doRequest(t,"Post",e,s,o),ne=(t,e,s)=>{wx.request({url:`${f.host}/${t}`,success:o=>s(o)})};var C={Get:Y,Put:F,Post:Q,Destroy:X,PostBasic:te,GetBasic:ee,WX:ne,Upload:Z,GetWeixintBasic:se,PostWeixintBasic:oe};const ie={category:{statementExpendList:"@category_statement_expend@",statementIncomeList:"@category_statement_income@",expendList:"@category_expend_list@",incomeList:"@category_income_list@"},asset:{statementAssets:"@asset_statement@",list:"@asset_list@"},alreadyLogin:"@alreadyLogin@",login:"weapp_login_session",bgImageKey:"@user_index_bg@",errorKey:"@request_error@",localStatementKey:"@local_statement_cache@"};var S={key:ie,get:function(t){return null},set:function(t,e){}};class h{constructor(){this.isLoading=!1}static success(e,s=500){if(setTimeout(()=>{wx.showToast({title:e,icon:"success",mask:!0,duration:s})},300),s>0)return new Promise((o,n)=>{setTimeout(()=>{o()},s)})}static confirm(e,s={},o="\u63D0\u793A"){return new Promise((n,a)=>{wx.showModal({title:o,content:e,showCancel:!0,success:r=>{r.confirm?n(s):r.cancel&&a(s)},fail:r=>{a(s)}})})}static toast(e,s="success"){setTimeout(()=>{wx.showToast({title:e,icon:s,mask:!0,duration:1e3})},1e3)}static alert(e){wx.showToast({title:e,icon:"/public/images/error.png",mask:!0,duration:1500})}static error(e,s=1500){wx.showToast({title:e,icon:"none",mask:!1,duration:s})}static loading(e,s){if(h.isLoading)return;h.isLoading=!0;const o={message:"\u52A0\u8F7D\u4E2D...",type:"info",duration:1e4,dismissible:!1,queue:!1,position:"bottom-right",onClick:this.onClick,onDismiss:this.onDismiss};s.$toast.open(o)}static loaded(e){h.isLoading&&(h.isLoading=!1,e.$toast.clear())}static share(e,s,o){return{title:e,path:s,desc:o,success:function(n){h.toast("\u5206\u4EAB\u6210\u529F")}}}}h.isLoading=!1;var v=(t,e)=>{const s=t.__vccOpts||t;for(const[o,n]of e)s[o]=n;return s};const ae={components:{},data(){return{pickedId:"",list:[],currentid:"1",position:"left",checked:!1,disabled:!1,pictures:["https://assets.storiesmatter.cn/rewarded-video-ad.png"],imageSize:{},px2rpx:2,windowWidth:375,videoAd:null,form:{message:"This is a sample message",type:"info",duration:1e4,dismissible:!0,queue:!1,position:"bottom-right"}}},onLoad(t){t.type!=null&&(this.type=t.type)},mounted(){this.greet()},computed:{},methods:{greet:async function(t){h.loading(null,this);const s=await new M({}).pricing();s==null||(this.list=s.results,S.set("pricing",s.results)),h.loaded(this)},redirect_url(t){wx.navigateTo({url:`/pages/categories/child?id=${t}&type=${this.type}`})},handleFruitChange({detail:t={}}){this.current=t.value,this.$apply()},handleRadio(t,e){this.checked=e;var s=this.list[e];this.currentid=s.id,this.$apply()},radioChange({detail:t={}}){this.currentid=t.value,this.$apply()},async handlePay(){console.log("sssss"),h.loading(null,this),await new M({}).orders(1,1);const e=await C.Post("topics/1/orders/",{pricing_id:this.currentid});e==null||(console.log(e),e.status=="ok"&&wx.requestPayment({timeStamp:e.timeStamp,nonceStr:e.nonceStr,package:e.package,signType:"MD5",paySign:e.paySign,success:function(s){console.log("PAID!!"),wx.navigateBack({delta:1})},fail:function(s){console.log("\u652F\u4ED8\u5931\u6557")},complete:function(s){console.log("\u652F\u4ED8\u5B8C\u6210")}})),h.loaded()},async handlePay1(){console.log("handlePay1");const e=await new M({}).orders(1,1);if(!P.isEmpty(e)&&e.status==="ok"){let{appId:o="wx1f692d7b9b57066d",timeStamp:n,nonceStr:a,packageStr:r,paySign:d}=e;const p="MD5";a="hqEqDxfoEpAeIh4J",r="prepay_id=wx061248388601002553a63d85314bb90000",d="12E4095A399375A6999C79986FA86A13",n="1646542118",WeixinJSBridge.invoke("getBrandWCPayRequest",{appId:o,timeStamp:n,nonceStr:a,package:r,signType:p,paySign:d},function(k){k.err_msg=="get_brand_wcpay_request:ok"?s.$toast("\u652F\u4ED8\u6210\u529F"):s.$toast("\u652F\u4ED8\u5931\u8D25\uFF0C\u8BF7\u91CD\u65B0\u652F\u4ED8")})}let s=this;typeof WeixinJSBridge=="undefined"?(console.log("handlePay1"),document.addEventListener?(console.log("2"),document.addEventListener("WeixinJSBridgeReady",s.onBridgeReady,!1)):document.attachEvent&&(console.log("3"),document.attachEvent("WeixinJSBridgeReady",s.onBridgeReady),document.attachEvent("onWeixinJSBridgeReady",s.onBridgeReady))):this.onBridgeReady()},onBridgeReady(){console.log("3");let t="wx1f692d7b9b57066d";const e="MD5";let s="hqEqDxfoEpAeIh4J",o="prepay_id=wx061248388601002553a63d85314bb90000",n="12E4095A399375A6999C79986FA86A13",a="1646542118";WeixinJSBridge.invoke("getBrandWCPayRequest",{appId:t,timeStamp:a,nonceStr:s,package:o,signType:e,paySign:n},function(r){console.log("res",r),r.err_msg=="get_brand_wcpay_request:ok"?console.log("\u652F\u4ED8\u6210\u529F"):console.log("\u652F\u4ED8\u5931\u8D25\uFF0C\u8BF7\u91CD\u65B0\u652F\u4ED8")})},imageLoad(t){var e=t.detail.width*this.px2rpx,s=t.detail.height*this.px2rpx,o=e/s,n=750,a;e>=n?a=n/o:(n=e,a=s);var r=this.imageSize;r[t.target.dataset.index]={width:n,height:a},this.imageSize=r,this.$apply()},gotoMap(){let t=this.pictures[0]+"?"+Math.random()/9999;wx.previewImage({current:t,urls:[t],success:function(e){},fail:function(e){},complete:function(e){}})},loadAds(){this.videoAd?this.videoAd.show().catch(()=>{this.videoAd.load().then(()=>{this.videoAd.show()}).catch(t=>{console.log("\u6FC0\u52B1\u89C6\u9891 \u5E7F\u544A\u663E\u793A\u5931\u8D25")})}):wx.showModal({title:"\u8B66\u544A",content:"\u53EF\u89C2\u770B\u6FC0\u52B1\u5F0F\u89C6\u9891\u5E7F\u544A\u7684\u6B21\u6570\u5DF2\u7ECF\u8FBE\u5230\u4E0A\u9650\uFF0C \u8BF7\u7A0D\u540E\u91CD\u8BD5",showCancel:!1,success:function(t){}})}},async requestPricing(){h.loading("\u52A0\u8F7D\u4E2D...");const t=await C.Get("topics/1/pricing/");t==null||(this.list=t.results,S.set("pricing",t.results),this.$apply()),h.loaded()},async requestCredit(){const t=await C.Get("topics/1/ads-credit/");t!=null&&wx.showModal({title:"",content:t.added_credit+"\u6B21\u641C\u7D22\u6B21\u6570\u5DF2\u5230\u8D26",showCancel:!1,success:function(e){}})}},re={class:"container"},ce=i("article",null,null,-1),le=i("view",{class:"choose_character"},[i("view",{class:"column"},[i("text",{class:"title"},"\u8D2D\u4E70\u641C\u7D22\u6B21\u6570")]),i("view",{class:"img"},[i("image",{src:"https://assets.storiesmatter.cn/shortline.png",mode:"widthFix"})])],-1),de={class:"statement-list"},he={class:"cell"},ue=["value"],_e=i("p",null,null,-1),me=i("view",{class:"pay"},[i("text",{class:"svg-demo-text"},"\u5FAE\u4FE1\u652F\u4ED8")],-1),pe=[me];function ge(t,e,s,o,n,a){const r=L("toast"),d=L("repeat");return _(),m("view",re,[i("div",null,[ce,u(r,{position:"ne"})]),le,i("view",de,[i("div",null,"The Picked is: "+y(n.pickedId),1),(_(!0),m(A,null,H(n.list,p=>(_(),R(d,{key:t.index,index:"index",item:"item"},{default:l(()=>[i("view",he,[q(i("input",{class:"statement-list-radio",type:"radio",id:"{{item.credit}}",value:p.id,"onUpdate:modelValue":e[0]||(e[0]=k=>n.pickedId=k)},null,8,ue),[[T,n.pickedId]]),i("text",null,y(t.index)+" "+y(p.credit)+"\u6B21\u641C\u7D22 \xA5"+y(p.price),1),_e])]),_:2},1024))),128))]),i("view",{class:"pay-container",onClick:e[1]||(e[1]=(...p)=>a.handlePay1&&a.handlePay1(...p))},pe)])}var fe=v(ae,[["render",ge]]);const ve="modulepreload",E={},we="/present-vue/",ye=function(e,s){return!s||s.length===0?e():Promise.all(s.map(o=>{if(o=`${we}${o}`,o in E)return;E[o]=!0;const n=o.endsWith(".css"),a=n?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${o}"]${a}`))return;const r=document.createElement("link");if(r.rel=n?"stylesheet":ve,n||(r.as="script",r.crossOrigin=""),r.href=o,document.head.appendChild(r),n)return new Promise((d,p)=>{r.addEventListener("load",d),r.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${o}`)))})})).then(()=>e())};const ze={},xe={class:"item"},ke={class:"details"};function $e(t,e){return _(),m("div",xe,[i("i",null,[b(t.$slots,"icon",{},void 0,!0)]),i("div",ke,[i("h3",null,[b(t.$slots,"heading",{},void 0,!0)]),b(t.$slots,"default",{},void 0,!0)])])}var w=v(ze,[["render",$e],["__scopeId","data-v-977bb0b6"]]);const be={},Me={xmlns:"http://www.w3.org/2000/svg",width:"20",height:"17",fill:"currentColor"},Ce=i("path",{d:"M11 2.253a1 1 0 1 0-2 0h2zm-2 13a1 1 0 1 0 2 0H9zm.447-12.167a1 1 0 1 0 1.107-1.666L9.447 3.086zM1 2.253L.447 1.42A1 1 0 0 0 0 2.253h1zm0 13H0a1 1 0 0 0 1.553.833L1 15.253zm8.447.833a1 1 0 1 0 1.107-1.666l-1.107 1.666zm0-14.666a1 1 0 1 0 1.107 1.666L9.447 1.42zM19 2.253h1a1 1 0 0 0-.447-.833L19 2.253zm0 13l-.553.833A1 1 0 0 0 20 15.253h-1zm-9.553-.833a1 1 0 1 0 1.107 1.666L9.447 14.42zM9 2.253v13h2v-13H9zm1.553-.833C9.203.523 7.42 0 5.5 0v2c1.572 0 2.961.431 3.947 1.086l1.107-1.666zM5.5 0C3.58 0 1.797.523.447 1.42l1.107 1.666C2.539 2.431 3.928 2 5.5 2V0zM0 2.253v13h2v-13H0zm1.553 13.833C2.539 15.431 3.928 15 5.5 15v-2c-1.92 0-3.703.523-5.053 1.42l1.107 1.666zM5.5 15c1.572 0 2.961.431 3.947 1.086l1.107-1.666C9.203 13.523 7.42 13 5.5 13v2zm5.053-11.914C11.539 2.431 12.928 2 14.5 2V0c-1.92 0-3.703.523-5.053 1.42l1.107 1.666zM14.5 2c1.573 0 2.961.431 3.947 1.086l1.107-1.666C18.203.523 16.421 0 14.5 0v2zm3.5.253v13h2v-13h-2zm1.553 12.167C18.203 13.523 16.421 13 14.5 13v2c1.573 0 2.961.431 3.947 1.086l1.107-1.666zM14.5 13c-1.92 0-3.703.523-5.053 1.42l1.107 1.666C11.539 15.431 12.928 15 14.5 15v-2z"},null,-1),Le=[Ce];function Se(t,e){return _(),m("svg",Me,Le)}var Ee=v(be,[["render",Se]]);const Ae={},Ve={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","aria-hidden":"true",role:"img",class:"iconify iconify--mdi",width:"24",height:"24",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24"},Ie=i("path",{d:"M20 18v-4h-3v1h-2v-1H9v1H7v-1H4v4h16M6.33 8l-1.74 4H7v-1h2v1h6v-1h2v1h2.41l-1.74-4H6.33M9 5v1h6V5H9m12.84 7.61c.1.22.16.48.16.8V18c0 .53-.21 1-.6 1.41c-.4.4-.85.59-1.4.59H4c-.55 0-1-.19-1.4-.59C2.21 19 2 18.53 2 18v-4.59c0-.32.06-.58.16-.8L4.5 7.22C4.84 6.41 5.45 6 6.33 6H7V5c0-.55.18-1 .57-1.41C7.96 3.2 8.44 3 9 3h6c.56 0 1.04.2 1.43.59c.39.41.57.86.57 1.41v1h.67c.88 0 1.49.41 1.83 1.22l2.34 5.39z",fill:"currentColor"},null,-1),Pe=[Ie];function He(t,e){return _(),m("svg",Ve,Pe)}var Re=v(Ae,[["render",He]]);const qe={},Te={xmlns:"http://www.w3.org/2000/svg",width:"18",height:"20",fill:"currentColor"},We=i("path",{d:"M11.447 8.894a1 1 0 1 0-.894-1.789l.894 1.789zm-2.894-.789a1 1 0 1 0 .894 1.789l-.894-1.789zm0 1.789a1 1 0 1 0 .894-1.789l-.894 1.789zM7.447 7.106a1 1 0 1 0-.894 1.789l.894-1.789zM10 9a1 1 0 1 0-2 0h2zm-2 2.5a1 1 0 1 0 2 0H8zm9.447-5.606a1 1 0 1 0-.894-1.789l.894 1.789zm-2.894-.789a1 1 0 1 0 .894 1.789l-.894-1.789zm2 .789a1 1 0 1 0 .894-1.789l-.894 1.789zm-1.106-2.789a1 1 0 1 0-.894 1.789l.894-1.789zM18 5a1 1 0 1 0-2 0h2zm-2 2.5a1 1 0 1 0 2 0h-2zm-5.447-4.606a1 1 0 1 0 .894-1.789l-.894 1.789zM9 1l.447-.894a1 1 0 0 0-.894 0L9 1zm-2.447.106a1 1 0 1 0 .894 1.789l-.894-1.789zm-6 3a1 1 0 1 0 .894 1.789L.553 4.106zm2.894.789a1 1 0 1 0-.894-1.789l.894 1.789zm-2-.789a1 1 0 1 0-.894 1.789l.894-1.789zm1.106 2.789a1 1 0 1 0 .894-1.789l-.894 1.789zM2 5a1 1 0 1 0-2 0h2zM0 7.5a1 1 0 1 0 2 0H0zm8.553 12.394a1 1 0 1 0 .894-1.789l-.894 1.789zm-1.106-2.789a1 1 0 1 0-.894 1.789l.894-1.789zm1.106 1a1 1 0 1 0 .894 1.789l-.894-1.789zm2.894.789a1 1 0 1 0-.894-1.789l.894 1.789zM8 19a1 1 0 1 0 2 0H8zm2-2.5a1 1 0 1 0-2 0h2zm-7.447.394a1 1 0 1 0 .894-1.789l-.894 1.789zM1 15H0a1 1 0 0 0 .553.894L1 15zm1-2.5a1 1 0 1 0-2 0h2zm12.553 2.606a1 1 0 1 0 .894 1.789l-.894-1.789zM17 15l.447.894A1 1 0 0 0 18 15h-1zm1-2.5a1 1 0 1 0-2 0h2zm-7.447-5.394l-2 1 .894 1.789 2-1-.894-1.789zm-1.106 1l-2-1-.894 1.789 2 1 .894-1.789zM8 9v2.5h2V9H8zm8.553-4.894l-2 1 .894 1.789 2-1-.894-1.789zm.894 0l-2-1-.894 1.789 2 1 .894-1.789zM16 5v2.5h2V5h-2zm-4.553-3.894l-2-1-.894 1.789 2 1 .894-1.789zm-2.894-1l-2 1 .894 1.789 2-1L8.553.106zM1.447 5.894l2-1-.894-1.789-2 1 .894 1.789zm-.894 0l2 1 .894-1.789-2-1-.894 1.789zM0 5v2.5h2V5H0zm9.447 13.106l-2-1-.894 1.789 2 1 .894-1.789zm0 1.789l2-1-.894-1.789-2 1 .894 1.789zM10 19v-2.5H8V19h2zm-6.553-3.894l-2-1-.894 1.789 2 1 .894-1.789zM2 15v-2.5H0V15h2zm13.447 1.894l2-1-.894-1.789-2 1 .894 1.789zM18 15v-2.5h-2V15h2z"},null,-1),je=[We];function Be(t,e){return _(),m("svg",Te,je)}var De=v(qe,[["render",Be]]);const Je={},Ge={xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",fill:"currentColor"},Oe=i("path",{d:"M15 4a1 1 0 1 0 0 2V4zm0 11v-1a1 1 0 0 0-1 1h1zm0 4l-.707.707A1 1 0 0 0 16 19h-1zm-4-4l.707-.707A1 1 0 0 0 11 14v1zm-4.707-1.293a1 1 0 0 0-1.414 1.414l1.414-1.414zm-.707.707l-.707-.707.707.707zM9 11v-1a1 1 0 0 0-.707.293L9 11zm-4 0h1a1 1 0 0 0-1-1v1zm0 4H4a1 1 0 0 0 1.707.707L5 15zm10-9h2V4h-2v2zm2 0a1 1 0 0 1 1 1h2a3 3 0 0 0-3-3v2zm1 1v6h2V7h-2zm0 6a1 1 0 0 1-1 1v2a3 3 0 0 0 3-3h-2zm-1 1h-2v2h2v-2zm-3 1v4h2v-4h-2zm1.707 3.293l-4-4-1.414 1.414 4 4 1.414-1.414zM11 14H7v2h4v-2zm-4 0c-.276 0-.525-.111-.707-.293l-1.414 1.414C5.42 15.663 6.172 16 7 16v-2zm-.707 1.121l3.414-3.414-1.414-1.414-3.414 3.414 1.414 1.414zM9 12h4v-2H9v2zm4 0a3 3 0 0 0 3-3h-2a1 1 0 0 1-1 1v2zm3-3V3h-2v6h2zm0-6a3 3 0 0 0-3-3v2a1 1 0 0 1 1 1h2zm-3-3H3v2h10V0zM3 0a3 3 0 0 0-3 3h2a1 1 0 0 1 1-1V0zM0 3v6h2V3H0zm0 6a3 3 0 0 0 3 3v-2a1 1 0 0 1-1-1H0zm3 3h2v-2H3v2zm1-1v4h2v-4H4zm1.707 4.707l.586-.586-1.414-1.414-.586.586 1.414 1.414z"},null,-1),Ne=[Oe];function Ue(t,e){return _(),m("svg",Ge,Ne)}var Ke=v(Je,[["render",Ue]]);const Ye={},Fe={xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",fill:"currentColor"},Qe=i("path",{d:"M10 3.22l-.61-.6a5.5 5.5 0 0 0-7.666.105 5.5 5.5 0 0 0-.114 7.665L10 18.78l8.39-8.4a5.5 5.5 0 0 0-.114-7.665 5.5 5.5 0 0 0-7.666-.105l-.61.61z"},null,-1),Xe=[Qe];function Ze(t,e){return _(),m("svg",Fe,Xe)}var et=v(Ye,[["render",Ze]]);const tt=c("Documentation"),st=c(" Vue\u2019s "),ot=i("a",{target:"_blank",href:"https://vuejs.org/"},"official documentation",-1),nt=c(" provides you with all information you need to get started. "),it=c("Tooling"),at=c(" This project is served and bundled with "),rt=i("a",{href:"https://vitejs.dev/guide/features.html",target:"_blank"},"Vite",-1),ct=c(". The recommended IDE setup is "),lt=i("a",{href:"https://code.visualstudio.com/",target:"_blank"},"VSCode",-1),dt=c(" + "),ht=i("a",{href:"https://github.com/johnsoncodehk/volar",target:"_blank"},"Volar",-1),ut=c(". If you need to test your components and web pages, check out "),_t=i("a",{href:"https://www.cypress.io/",target:"_blank"},"Cypress",-1),mt=c(" and "),pt=i("a",{href:"https://docs.cypress.io/guides/component-testing/introduction",target:"_blank"},"Cypress Component Testing",-1),gt=c(". "),ft=i("br",null,null,-1),vt=c(" More instructions are available in "),wt=i("code",null,"README.md",-1),yt=c(". "),zt=c("Ecosystem"),xt=c(" Get official tools and libraries for your project: "),kt=i("a",{target:"_blank",href:"https://pinia.vuejs.org/"},"Pinia",-1),$t=c(", "),bt=i("a",{target:"_blank",href:"https://router.vuejs.org/"},"Vue Router",-1),Mt=c(", "),Ct=i("a",{target:"_blank",href:"https://test-utils.vuejs.org/"},"Vue Test Utils",-1),Lt=c(", and "),St=i("a",{target:"_blank",href:"https://github.com/vuejs/devtools"},"Vue Dev Tools",-1),Et=c(". If you need more resources, we suggest paying "),At=i("a",{target:"_blank",href:"https://github.com/vuejs/awesome-vue"},"Awesome Vue",-1),Vt=c(" a visit. "),It=c("Community"),Pt=c(" Got stuck? Ask your question on "),Ht=i("a",{target:"_blank",href:"https://chat.vuejs.org"},"Vue Land",-1),Rt=c(", our official Discord server, or "),qt=i("a",{target:"_blank",href:"https://stackoverflow.com/questions/tagged/vue.js"},"StackOverflow",-1),Tt=c(". You should also subscribe to "),Wt=i("a",{target:"_blank",href:"https://news.vuejs.org"},"our mailing list",-1),jt=c(" and follow the official "),Bt=i("a",{target:"_blank",href:"https://twitter.com/vuejs"},"@vuejs",-1),Dt=c(" twitter account for latest news in the Vue world. "),Jt=c("Support Vue"),Gt=c(" As an independent project, Vue relies on community backing for its sustainability. You can help us by "),Ot=i("a",{target:"_blank",href:"https://vuejs.org/sponsor/"},"becoming a sponsor",-1),Nt=c(". "),Ut={setup(t){return(e,s)=>(_(),m(A,null,[u(w,null,{icon:l(()=>[u(Ee)]),heading:l(()=>[tt]),default:l(()=>[st,ot,nt]),_:1}),u(w,null,{icon:l(()=>[u(Re)]),heading:l(()=>[it]),default:l(()=>[at,rt,ct,lt,dt,ht,ut,_t,mt,pt,gt,ft,vt,wt,yt]),_:1}),u(w,null,{icon:l(()=>[u(De)]),heading:l(()=>[zt]),default:l(()=>[xt,kt,$t,bt,Mt,Ct,Lt,St,Et,At,Vt]),_:1}),u(w,null,{icon:l(()=>[u(Ke)]),heading:l(()=>[It]),default:l(()=>[Pt,Ht,Rt,qt,Tt,Wt,jt,Bt,Dt]),_:1}),u(w,null,{icon:l(()=>[u(et)]),heading:l(()=>[Jt]),default:l(()=>[Gt,Ot,Nt]),_:1})],64))}},Kt={setup(t){return(e,s)=>(_(),m("main",null,[u(Ut)]))}},Yt=W({history:j("/present-vue/"),routes:[{path:"/member",name:"member",component:Kt},{path:"/about",name:"about",component:()=>ye(()=>import("./AboutView.522074a7.js"),["assets/AboutView.522074a7.js","assets/AboutView.ab071ea6.css","assets/vendor.78b9da4e.js"])}]});const Ft=B({state(){return{count:0}},mutations:{increment(t){t.count++}},modules:{toast:D({dismissInterval:8e3})}}),x=J(fe);x.use(Yt);x.use(Ft);x.use(G);x.mount("#app");export{v as _};