import{_ as l,a as S,o as a,c as P,u as R,R as F,b as d,d as t,t as h,e as b,r as v,f,F as y,g as k,m as u,w as V,v as T,i as q,h as _,j as x,k as U,n as B,l as O,p as W,q as A,s as M,V as H,x as J,A as j}from"./vendor.dc04f490.js";const z=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function s(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerpolicy&&(r.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?r.credentials="include":i.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=s(i);fetch(i.href,r)}};z();let E="";E="https://www.storiesmatter.cn";class g{constructor(e){this.storyId=1,console.log("localStorage.storyId",localStorage.storyId),!l.isEmpty(localStorage.storyId)&&localStorage.storyId!=="null"&&(this.storyId=localStorage.storyId),this.config=e,this.config.baseURL=E+"/api",this.token()}token(){var e="Bearer "+localStorage.token;this.axios=S.create({baseURL:this.config.baseURL}),this.axios.defaults.headers.common.Authorization=e}async roles(){const e=await this.axios.get(`topics/${this.storyId}/roles/`);return console.log("roles response",e),e.data}async home(){try{const e=await this.axios.get(`topics/${this.storyId}/home/`);return console.log("home response",e),e.data}catch(e){return console.log("home error: ",e.response.data),e}}async initGame(e){try{const s=await this.axios.post(`topics/${this.storyId}/init-game/`,{role_id:e});return console.log("initGame response",s),s.data}catch(s){return console.log("initGame error: ",s),console.log("initGame error: ",s.response.data),s}}async fragments(e){const s=await this.axios.get(`fragments/${e}/`);return console.log("response",s),s.data}async search(e){try{const s=await this.axios.get(`topics/${this.storyId}/fragments/?q=${e}`);return console.log("response",s),s.data}catch(s){return console.log("response mserrorerrorg",s),null}}async unlock(e){const s=await this.axios.post(`topics/${this.storyId}/fragments/${e}/unlock/`);return console.log("response",s),s.data}async pricing(){const e=await this.axios.get(`topics/${this.storyId}/pricing/`);return console.log("response",e),e.data}async orders(e,s){try{const n=await this.axios.post(`topics/${this.storyId}/orders/`,{pricing_id:e,js_code:s});return console.log("response orders",n),n.data}catch(n){console.log("response orders err",n.response.data)}}async getCode(e){try{const s=await this.axios.post("phoneno-get-code/",{phone_no:e});return console.log("response",s),s.data}catch(s){console.log("response mserrorerrorg",s),console.log(s.response.data);const n=l.get(s.response.data,"phone_no");if(!l.isEmpty(n))return s.message=n[0],s}}async phonenoLogin(e,s){try{const n=await this.axios.post("phoneno-login/",{phone_no:e,user_input_code:s});return console.log("response",n),localStorage.token=l.get(n.data,"access"),localStorage.refresh=l.get(n.data,"refresh"),n.data}catch(n){console.log("response mserrorerrorg",n),console.log(n.response.data);const i=l.get(n.response.data,"non_field_errors"),r=l.get(n.response.data,"user_input_code");if(l.isEmpty(i)){if(!l.isEmpty(r))return n.message=r[0],n}else return n.message=i[0],n;return n}}async tokenVerify(){try{const e=await this.axios.post("token/verify/",{token:localStorage.token});return console.log("verify token response",e),!0}catch(e){if(console.log("response mserrorerrorg",e),l.isEmpty(localStorage.refresh))return!1;{const n=await new g({}).tokenRefresh();return console.log("tokenRefresh",n),n}}}async tokenRefresh(){try{const e=await this.axios.post("token/refresh/",{refresh:localStorage.refresh});return console.log("refresh response",e),l.isEmpty(e.data)?!1:(localStorage.token=l.get(e.data,"access"),!0)}catch(e){return console.log("tokenRefresh",e),!1}}async login(){const e={avatar_url:"https://thirdwx.qlogo.cn/mmopen/vi_32/Q3auHgzwzM6pjAcqAwjE9l9Yc8bex4lrJ2PFE9rnJXvM0oSicxW8liadwT46J3pOMdHJ1scGR2jHiaEnVHWqcdYMA/132",city:"",country:"",gender:0,js_code:"091gvxGa1ypdMC0tOrJa1cOmJQ1gvxG3",language:"zh_CN",nick_name:"\u8C37\u6653\u6D01Sage",province:""},s=[],n="";if(n.length>0)for(const p of n)s.push(p.route);const i="",r={method:"POST",url:this.config.baseURL+"/simple-wechat-login/",headers:{Authorization:i,"Content-Type":"application/json"},data:e};return console.log("------options",r),(await S(r)).data}}var m={get:function(o){return console.log("---set get",o,localStorage.getItem(o)),localStorage.getItem(o)||null},set:function(o,e){localStorage.setItem(o,e)},gotoHomeOrRole:function(o){const e=JSON.parse(localStorage.getItem("storyCharacters"));console.log("---gotoHomeOrRole",e,e[localStorage.storyId]),l.isEmpty(e)||l.isEmpty(e[localStorage.storyId])||e[localStorage.storyId]==0?o.$router.push("/character"):o.$router.push("/home")},setRole:function(o){const e="storyCharacters",s=JSON.parse(localStorage.getItem(e))||{};s[localStorage.storyId]=o,localStorage.setItem(e,JSON.stringify(s))},getVersion:function(){return"v2.0.5"}};const N={computed:{username(){return this.$route.params.username}},async mounted(){const o=new URL(location.href).searchParams.get("storyId");l.isEmpty(o)||(localStorage.storyId=o),l.isEmpty(localStorage.storyId)&&(localStorage.storyId=1),this.goToDashboard()},methods:{goToDashboard:async function(){if(l.isEmpty(localStorage.token))this.$router.push("/login");else{const e=await new g({}).tokenVerify();console.log("tokenVerify",e),e||this.$router.push("/login"),console.log("------app")}}}},G=Object.assign(N,{setup(o){return(e,s)=>(a(),P(R(F)))}});var $=(o,e)=>{const s=o.__vccOpts||o;for(const[n,i]of e)s[n]=i;return s};const D={props:{statement:Object},methods:{statementEvent:function(o,e){console.log("----------",o,e),this.$emit("submit",o,e)}}},Z={class:"information"},K={class:"icon"},Q=["src"],Y={class:"st-title"},X={class:"title"},ee=b(),te=t("span",null,"\xA0\xA0\xA0 ",-1),se={class:"time"};function oe(o,e,s,n,i,r){return a(),d("view",{class:"charactercell",onClick:e[0]||(e[0]=c=>r.statementEvent(s.statement.id))},[t("view",Z,[t("view",K,[t("img",{class:"icon-img",src:s.statement.avatar},null,8,Q)]),t("view",Y,[t("view",X,h(s.statement.name),1),ee,te,t("view",se,h(s.statement.brief_text),1)])])])}var ie=$(D,[["render",oe]]);const ne={class:"container"},re={class:"spin"},ae=t("view",{style:{height:"20px"}},null,-1),le={class:"choose_character"},ce=t("view",{class:"column"},[t("text",{class:"title2"},"\u9009\u62E9\u4F60\u7684\u8EAB\u4EFD")],-1),de={class:"img-top-shortline"},he=["src"],ue={class:"character-statement-list"},pe=["onClick"],ge=["value"],_e=t("view",{style:{height:"30px"}},null,-1),me={class:"character-bottom"},fe=t("text",{style:{"font-size":"20px",color:"white"}},"\u5F00\u59CB\u8C03\u67E5",-1),ve=[fe],ye=t("view",null,[t("text",{style:{float:"right","margin-right":"10px","font-size":"12px",color:"#757575"}},"*\u63A2\u5458\u8EAB\u4EFD\u4E00\u65E6\u786E\u5B9A\uFF0C\u4E0D\u53EF\u66F4\u6539")],-1),we=t("view",{style:{height:"50px"}},null,-1),ke={components:{},data(){return{spinning:!1,pickedId:1,roleId:1,imgs:{shortline:"https://assets.storiesmatter.cn/shortline.png"},list:[]}},async mounted(){const e=await new g({}).roles();this.list=e.results},methods:{submit:function(o,e){console.log("---sumit in parent",o,e)},handleInquiry:async function(){this.spinning=!0;const e=await new g({}).initGame(this.roleId);this.spinning=!1,l.isEmpty(e)||(e.code=="e160"?u.success("\u53D1\u73B0\u5377\u5B97\uFF0C\u7EE7\u7EED\u8C03\u67E5"):m.setRoles(this.roleId),this.$router.push("/home"))},handleRadio(o,e){console.log("index",o,e),this.roleId=e,this.pickedId=o+1}}},$e=Object.assign(ke,{setup(o){return(e,s)=>{const n=v("a-spin");return a(),d(y,null,[t("view",ne,[t("div",re,[f(n,{spinning:e.spinning},null,8,["spinning"])]),ae,t("view",le,[ce,t("view",de,[t("img",{src:e.imgs.shortline,mode:"widthFix"},null,8,he)])]),t("view",ue,[(a(!0),d(y,null,k(e.list,(i,r)=>(a(),d("view",{key:r,index:"index",item:"item"},[t("view",{class:"character-cell",onClick:c=>e.handleRadio(r,i.id)},[V(t("input",{class:"character-cell-radio",type:"radio",value:i.id,"onUpdate:modelValue":s[0]||(s[0]=c=>q(pickedId)?pickedId.value=c:null)},null,8,ge),[[T,e.pickedId]]),f(ie,{class:"cell-text",statement:i,onSubmit:e.submit},null,8,["statement","onSubmit"])],8,pe)]))),128))])]),_e,t("view",me,[t("view",{class:"character-btn",onClick:s[1]||(s[1]=(...i)=>e.handleInquiry&&e.handleInquiry(...i))},ve)]),ye,we],64)}}});const xe={class:"container"},be={class:"spin"},Ie={key:0},Ce=["title"],Se=t("text",null,[t("span",null,"\xA0\xA0\xA0"),b(" \u5BA2\u670D\u5FAE\u4FE1\u8BF7\u6DFB\u52A015711067100 ")],-1),Le=t("text",{class:"copy"},[b(" \u4E00\u952E\u590D\u5236\u8D26\u53F7 "),t("span",null,"\xA0\xA0\xA0")],-1),Ve=[Se,Le],Te={style:{"margin-left":"40rpx","margin-right":"40rpx","text-align":"left"}},Ee=t("view",{style:{"margin-left":"40rpx","margin-right":"40rpx","text-align":"left"}},[t("view",null,"\u641C\u7D22\u6B21\u6570\u4E0D\u8DB3\uFF0C\u65E0\u6CD5\u89E3\u9501\u8BB0\u5FC6\u788E\u7247")],-1),Pe=t("view",{style:{"margin-left":"40rpx","margin-right":"40rpx","text-align":"left"}},[t("view",null,"\u641C\u7D22\u6B21\u6570\u5DF2\u7ECF\u7528\u5B8C\uFF0C\u8BF7\u5148\u5145\u503C\uFF01")],-1),Re={class:"header"},Fe={class:"level-1"},qe={key:0,class:"top-btns"},Ue={class:"column1"},Be={class:"btn1"},Oe={class:"btn1"},We={class:"btn1"},Ae={key:1,class:"dotline"},Me=["src"],He={key:2,class:"userinfo"},Je={class:"icon"},je=["src"],ze={class:"st-title"},Ne={class:"first-line"},Ge={class:"time"},De={key:3,class:"dotline"},Ze=["src"],Ke={key:1,class:"searchcell",id:"searchit"},Qe=t("view",{class:"recordcell"},[t("view",null,[t("text",{class:"btn1"},"\u8C03\u67E5\u8BB0\u5F55")])],-1),Ye={class:"searchbar"},Xe={class:"search"},et={class:"search-block",action:"javascript:void 0"},tt=["value"],st=t("text",null,"\u641C\u7D22",-1),ot=[st],it={class:"paycell"},nt={class:"paycell-title"},rt={class:"btn1"},at=["src"],lt={class:"btn1"},ct={class:"search-longline"},dt=["src"],ht={class:"fragment-content",id:"fragmentContent","wx:key":"index"},ut={class:"fragment-title"},pt={class:"container-box"},gt=["id"],_t={key:0},mt=["onClick"],ft={key:1},vt=["onClick"],yt={class:"longline"},wt=["src"],kt=t("view",{style:{height:"60px"}},null,-1),$t={data(){return{book:"\u6545\u610F\u4E8B\u52A1\u6240\u63A2\u5458\u7CFB\u7EDF",payTitle:"\u8D2D\u4E70\u6B21\u6570",emptyTitle:"",role_stats:[],topic_links:[],my_role:{id:"4",name:"",crew:"",icon_path:"",avatar:""},remain_credit:0,userInfo:!0,dataLoaded:!1,currentTotal:"",submiting:!1,inputValue:"",showAuthorise:!1,isAuthorised:!1,characterId:0,focusSearchInput:!1,justFound:-1,searchScrollTop:286,searching:!1,visible1:!1,isUnlocakModalVisible:!1,gotoTopupVisible:!1,gotoTopupVisible2:!1,isIntroVisible:!1,unlockCredit:0,unlockFragmentId:0,animate:[],windowHeight:750,discoveredList:[],onboard:!1,inWechatBrowser:!1,imageSize:{},px2rpx:2,windowWidth:375,count:1,imgs:{help:"https://assets.storiesmatter.cn/help.png?1",eye:"https://assets.storiesmatter.cn/eye-top.png?2",tick:"https://assets.storiesmatter.cn/tick.png?1",crew:"https://assets.storiesmatter.cn/icon-crew.png",hospital:"https://assets.storiesmatter.cn/icon-hospital.png",delegate:"https://assets.storiesmatter.cn/icon-delegate.png",dot:"https://assets.storiesmatter.cn/dotline.png",search:"https://assets.storiesmatter.cn/search-button.png",pay:"https://assets.storiesmatter.cn/icon-pay.png",line:"https://assets.storiesmatter.cn/longline.png",intromodal:"https://assets.storiesmatter.cn/intromodal.png"},api:null,spinning:!1}},computed:{username(){return this.$route.params.username}},async mounted(){this.spinning=!0,this.api=new g({});const o=await this.api.home();if(this.spinning=!1,o instanceof Error){const r=l.get(o.response.data,"code");r=="e110"?this.$router.push("/character"):r=="token_not_valid"&&this.$router.push({path:"/login"})}else if(!l.isEmpty(o)){m.set("home",JSON.stringify(o)),this.updateUI(o),this.discoveredList=[];for(var e=0;e<o.role_stats.length;e++){let r=o.role_stats[e];for(var s=0;s<r.fragments.length;s++){let c=r.fragments[s];c.has_discovered==!0&&this.discoveredList.push(c.id)}}}var n=window.navigator.userAgent.toLowerCase();n.match(/MicroMessenger/i)=="micromessenger"?this.inWechatBrowser=!0:this.inWechatBrowser=!1,this.inWechatBrowser=!0;const i="width=device-width, initial-scale=1.0, user-scalable=no";document.querySelector('meta[name="viewport"]').content=i},methods:{handlePieceTap:function(o){let e=this.discoveredList.indexOf(o);e!=null&&(console.log("--- this.discoveredList",this.discoveredList),this.$router.push({path:"/piece",query:{id:o,index:e,discoveredList:this.discoveredList}}))},handleUnlockedPieceTap:function(o,e){console.log("---fragmentId",o,e),this.unlockFragmentId=o,this.isUnlocakModalVisible=!0,this.unlockCredit=e},onClick:function(){this.requestUnlockedPiece()},onDismiss:function(){this.$toast.clear()},creditZero:function(){this.inWechatBrowser?this.gotoTopupVisible2=!0:u.warning("\u641C\u7D22\u6B21\u6570\u5DF2\u7528\u5B8C\uFF0C\u8BF7\u5148\u8054\u7CFB\u5BA2\u670D\u54E6\uFF01")},async requestUnlockedPiece(){this.spinning=!0;const o=await this.api.unlock(this.unlockFragmentId);this.spinning=!1,o!=null?o.code=="e190"||o.code=="e120"?this.inWechatBrowser?this.gotoTopupVisible=!0:this.copy():o.code==null&&(this.justFound=o.id,this.requestHomeAfter()):u.error("\u89E3\u9501\u8BB0\u5FC6\u788E\u7247\u5931\u8D25")},handleGotoTopup:function(){this.gotoTopupVisible=!1,this.$router.push({path:"/topup"})},handleCancelTopup:function(){this.gotoTopupVisible=!1,this.gotoTopupVisible2=!1},async requestSearch(){if(console.log("---requestSearch",this.inputValue,this.remain_credit),this.remain_credit<=0){this.creditZero();return}if(this.inputValue.length==0){u.warning("\u8BF7\u8F93\u5165\u5173\u952E\u8BCD");return}if(this.inputValue.length>7){u.warning("\u5173\u952E\u8BCD\u6700\u957F\u4E0D\u8D85\u8FC77\u4E2A\u5B57");return}var o=new RegExp("[\u4E00-\u9FA5A-Za-z0-9]+$","g");if(!o.test(this.inputValue)){u.warning("\u5173\u952E\u8BCD\u90FD\u4E0D\u542B\u6807\u70B9\u54E6");return}if(this.searching==!0)return;this.searching=!0,this.spinning=!0;let e=await this.api.search(this.inputValue);if(this.spinning=!1,this.searching=!1,!l.isEmpty(e))if(l.isEmpty(e.code))m.set("searchedCount",0),this.justFound=e.id,this.requestHomeAfter();else{this.focusSearchInput=!0,this.focusSearchInput=!1;let s=null;if(e.code=="e120")this.creditZero(),this.focusSearchInput=!1;else if(e.code=="e110")s="\u8BA2\u5355\u4E0D\u5B58\u5728",this.$router.push("/character");else if(e.code=="e100")s="\u6E38\u620F\u4E3B\u9898\u4E0D\u5B58\u5728";else if(e.code=="e130"){s="\u6C92\u627E\u5230\u76F8\u5173\u788E\u7247\uFF0C\u8BF7\u91CD\u65B0\u641C\u7D22";let n=m.get("searchedCount");n==null&&(n=0),n++,m.set("searchedCount",n),n>=5&&(s="\u5361\u4F4F\u4E86\uFF1F\u8054\u7CFB\u5BA2\u670D\u8981\u4E2A\u63D0\u793A\u5427\uFF01",m.set("searchedCount",0))}s&&u.warning(s),this.remain_credit==0||(this.remain_credit=this.remain_credit-1)}this.inputValue=""},updateUI:function(o){this.my_role.name=o.my_role.name,this.my_role.avatar=o.my_role.avatar;let e=o.other_roles,s="";for(var n=e.length-1;n>=0;n--)s=s+e[n].name+(n==0?"":"\uFF0C");this.my_role.crew=s,this.role_stats=o.role_stats,this.remain_credit=o.remain_credit,this.topic_links=o.topic_links,this.topic_links.length<3&&(this.topic_links.push({title:"",link_url:""}),this.topic_links.push({title:"",link_url:""})),m.setRole(this.my_role.id),this.dataLoaded=!0,this.isAuthorised=!0,this.justFound>0&&(document.getElementById(`cv${this.justFound}`).scrollIntoView(),u.warning("\u6210\u529F\u627E\u5230\u788E\u7247"),this.justFound=-1)},handleHelp:function(o){window.location.href=this.topic_links[o].link_url},handleTopup:function(o){this.$router.push({path:"/topup"})},copy:function(o){this.$copyText("15711067100").then(function(e){alert("Copied"),console.log(e)},function(e){alert("Can not copy"),console.log(e)})},handleOk:function(){this.visible1=!1},handleCancel:function(){this.visible1=!0},handleUnlockOk(){this.isUnlocakModalVisible=!1,this.requestUnlockedPiece()},handleUnlockCancel(){this.isUnlocakModalVisible=!1},async requestHomeAfter(){const o=await this.api.home();if(!(o instanceof Error)&&!l.isEmpty(o)){this.updateUI(o),this.discoveredList=[];for(var e=0;e<o.role_stats.length;e++){let n=o.role_stats[e];for(var s=0;s<n.fragments.length;s++){let i=n.fragments[s];i.has_discovered==!0&&this.discoveredList.push(i.id)}}}}}},L=Object.assign($t,{setup(o){return(e,s)=>{const n=v("a-spin"),i=v("a-modal");return a(),d("view",xe,[t("div",be,[f(n,{spinning:e.spinning},null,8,["spinning"])]),e.isAuthorised?_("",!0):(a(),d("view",Ie,[t("text",{title:e.emptyTitle},null,8,Ce)])),t("view",{class:"systemprompt",onClick:s[0]||(s[0]=(...r)=>e.copy&&e.copy(...r))},Ve),f(i,{title:"",visible:e.isUnlocakModalVisible,onOk:e.handleUnlockOk,onCancel:e.handleUnlockCancel,"show-cancel":"{{ true }}",okText:"\u7ACB\u5373\u89E3\u9501",cancelText:"\u7EE7\u7EED\u8C03\u67E5"},{default:x(()=>[t("view",Te,[t("view",null,"\u8BE5\u8BB0\u5FC6\u788E\u7247\u5C1A\u672A\u89E3\u9501\uFF0C\u8981\u6D88\u8017"+h(e.unlockCredit)+"\u6B21\u641C\u7D22\u673A\u4F1A\u89E3\u9501\u5417\uFF1F",1)])]),_:1},8,["visible","onOk","onCancel"]),f(i,{title:"",visible:e.gotoTopupVisible,onOk:e.handleGotoTopup,onCancel:e.handleCancelTopup,"show-cancel":"{{ true }}",okText:"\u7ACB\u5373\u5145\u503C",cancelText:"\u7EE7\u7EED\u8C03\u67E5"},{default:x(()=>[Ee]),_:1},8,["visible","onOk","onCancel"]),f(i,{title:"",visible:e.gotoTopupVisible2,onOk:e.handleGotoTopup,onCancel:e.handleCancelTopup,"show-cancel":"{{ true }}",okText:"\u7ACB\u5373\u5145\u503C",cancelText:"\u7EE7\u7EED\u8C03\u67E5"},{default:x(()=>[Pe]),_:1},8,["visible","onOk","onCancel"]),t("view",Re,[t("view",Fe,[t("text",null,h(e.book),1)]),e.dataLoaded?(a(),d("view",qe,[t("view",Ue,[t("view",{class:"btns",onClick:s[1]||(s[1]=r=>e.handleHelp(0))},[t("text",Be,h(e.topic_links[0].title),1)]),t("view",{class:"btns",onClick:s[2]||(s[2]=r=>e.handleHelp(1))},[t("text",Oe,h(e.topic_links[1].title),1)]),t("view",{class:"btns",onClick:s[3]||(s[3]=r=>e.handleHelp(2))},[t("text",We,h(e.topic_links[2].title),1)])])])):_("",!0),e.dataLoaded?(a(),d("view",Ae,[t("img",{src:e.imgs.dot},null,8,Me)])):_("",!0),e.dataLoaded?(a(),d("view",He,[t("view",Je,[t("img",{src:e.my_role.avatar},null,8,je)]),t("view",ze,[t("view",Ne,"\u63A2\u5458\uFF1A"+h(e.my_role.name),1),t("view",Ge,"\u7EC4\u5458\uFF1A"+h(e.my_role.crew),1)])])):_("",!0),e.dataLoaded?(a(),d("view",De,[t("img",{src:e.imgs.dot},null,8,Ze)])):_("",!0)]),e.dataLoaded?(a(),d("view",Ke,[Qe,t("view",Ye,[t("view",Xe,[t("form",et,[t("input",{class:"search-input",type:"text",placeholder:"\u8F93\u5165\u4F60\u60F3\u8981\u7684\u5185\u5BB9",value:e.inputValue,onInput:s[4]||(s[4]=r=>e.inputValue=r.target.value),onKeyup:s[5]||(s[5]=U((...r)=>e.requestSearch&&e.requestSearch(...r),["13"]))},null,40,tt)])]),t("view",{class:"search-btn",onClick:s[6]||(s[6]=r=>e.requestSearch())},ot)]),t("view",it,[t("view",nt,[t("text",rt,"\u641C\u7D22\u5269\u4F59\u6B21\u6570\uFF1A"+h(e.remain_credit),1)]),t("view",{class:"topup",onClick:s[7]||(s[7]=(...r)=>e.handleTopup&&e.handleTopup(...r))},[t("img",{src:e.imgs.pay},null,8,at),t("text",lt,h(e.payTitle),1)])]),t("view",ct,[t("img",{src:e.imgs.line,mode:"widthFix"},null,8,dt)])])):_("",!0),(a(!0),d(y,null,k(e.role_stats,r=>(a(),d("view",ht,[t("view",ut,[t("text",null,h(r.role),1)]),t("view",pt,[(a(!0),d(y,null,k(r.fragments,c=>(a(),d("view",{class:B(c.has_discovered?"item-box discovered":"item-box"),id:`cv${c.id}`},[c.has_discovered==!0?(a(),d("view",_t,[t("text",{animation:"{{animate[item.id]}}",onClick:p=>e.handlePieceTap(c.id),"data-cid":"item.id"},h(c.display_label),9,mt)])):(a(),d("view",ft,[t("text",{onClick:p=>e.handleUnlockedPieceTap(c.id,c.credit_to_unlock)},h(c.display_label),9,vt)]))],10,gt))),256))]),t("view",yt,[t("img",{src:e.imgs.line,mode:"widthFix"},null,8,wt)])]))),256)),kt])}}});const xt={class:"container"},bt={class:"spin"},It=t("view",{style:{height:"40px"}},null,-1),Ct={class:"choose_character"},St=t("view",{class:"column"},[t("text",{class:"title2"},"\u767B\u5F55")],-1),Lt={class:"img-top-shortline"},Vt=["src"],Tt={class:"login"},Et=t("view",{class:"recordcell"},[t("view")],-1),Pt={class:"login-bar"},Rt={class:"login-search"},Ft={class:"search-block",action:"javascript:void 0"},qt=["value"],Ut={class:"login-row"},Bt={class:"login-search login-search1"},Ot={class:"search-block",action:"javascript:void 0"},Wt=["value"],At=t("text",null,"\u83B7\u53D6\u9A8C\u8BC1\u7801",-1),Mt=[At],Ht=t("text",{class:"login-sure-btn"},"\u786E\u5B9A",-1),Jt=[Ht],jt={class:"login-version"},zt={data(){return{inputValue:"",inputCode:"",phoneNumber:"",imgs:{shortLine:"https://assets.storiesmatter.cn/shortline.png"},spinning:!1,version:"v1.0.0"}},async mounted(){this.version=m.getVersion()},methods:{compositionUpdate:function(o){this.phoneNumber=o.data},getCode:async function(){if(this.inputValue.length==0){u.warning("\u8BF7\u8F93\u5165\u624B\u673A\u53F7");return}this.spinning=!0;const e=await new g({}).getCode(this.inputValue);this.spinning=!1,e instanceof Error?u.error(e.message):l.isEmpty(e)||l.get(e,"status")=="ok"&&u.success("\u53D1\u9001\u6210\u529F")},phonenoLogin:async function(){if(this.inputCode.length==0){u.warning("\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801");return}this.spinning=!0;const e=await new g({}).phonenoLogin(this.inputValue,this.inputCode);this.spinning=!1,l.isEmpty(e)||(l.get(e,"status")=="ok"?(u.success("\u767B\u5F55\u6210\u529F"),this.gotoHomePage()):u.error(e.message))},gotoHomePage:function(){this.$router.push("/home")}}},Nt=Object.assign(zt,{setup(o){return(e,s)=>{const n=v("a-spin");return a(),d("view",xt,[t("div",bt,[f(n,{spinning:e.spinning},null,8,["spinning"])]),It,t("view",Ct,[St,t("view",Lt,[t("img",{src:e.imgs.shortLine,mode:"widthFix"},null,8,Vt)])]),t("view",Tt,[Et,t("view",Pt,[t("view",Rt,[t("form",Ft,[t("input",{class:"search-input",type:"text",placeholder:"\u8F93\u5165\u4F60\u7684\u624B\u673A\u53F7",value:e.inputValue,onInput:s[0]||(s[0]=i=>e.inputValue=i.target.value)},null,40,qt)])]),t("view",Ut,[t("view",Bt,[t("form",Ot,[t("input",{class:"search-input",type:"text",placeholder:"\u8F93\u5165\u624B\u673A\u9A8C\u8BC1\u7801",value:e.inputCode,onInput:s[1]||(s[1]=i=>e.inputCode=i.target.value)},null,40,Wt)])]),t("view",{class:"get-code-text",onClick:s[2]||(s[2]=(...i)=>e.getCode&&e.getCode(...i))},Mt)])])]),t("view",{class:"login-sure",onClick:s[3]||(s[3]=(...i)=>e.phonenoLogin&&e.phonenoLogin(...i))},Jt),t("div",jt,[t("text",null,h(e.version),1)])])}}});const Gt={data(){return{search_text:"",content_type:1,display_id:"",role:"",comment:"",text:"",image:"",pictures:[""],imageSize:{},px2px:2,windowWidth:375,src:"",curTime:"00:00",endTime:"00:00",reCurTime:"",reEndTime:"",playurl:"",status:"",cdCls:"pause",currentDot:0,isplay:!1,timer:"",currentFragmentId:87,discoveredList:[],currentPieceIndex:0,last:!1,imgs:{shortLine:"https://assets.storiesmatter.cn/shortline.png",eye:"https://assets.storiesmatter.cn/eye.png",play:"https://assets.storiesmatter.cn/play1.png",pause:"https://assets.storiesmatter.cn/pause1.png"},imgWidth:375}},async mounted(){this.imgWidth=document.documentElement.clientWidth||document.body.clientWidth,l.isEmpty(this.$route.query)||(this.discoveredList=this.$route.query.discoveredList,this.currentPieceIndex=this.$route.query.index),this.gotoPiece();const o="width=device-width, initial-scale=1.0, user-scalable=yes";document.querySelector('meta[name="viewport"]').content=o},methods:{gotoMap(){},async requestFragment(){this.$toast.open({message:"\u6B63\u5728\u52A0\u8F7D...",duration:2e3,dismissible:!1});const e=await new g({}).fragments(this.currentFragmentId);e!=null&&(this.search_text=e.search_text,this.content_type=e.content_type,this.role=e.role_name,this.display_id=e.display_id,this.comment=e.comment,this.text=e.text,this.playurl=e.audio,this.image=e.image,this.pictures.push(e.image),this.playurl!=null&&this.content_type==3),this.$toast.clear()},gotoPiece(){this.onUnloadAudio(),this.currentFragmentId=this.discoveredList[this.currentPieceIndex],parseInt(this.currentPieceIndex)+1==this.discoveredList.length?this.last=!0:this.last=!1,console.log("this.currentFragmentId",this.currentFragmentId),this.currentFragmentId!=null&&(this.pictures=[],this.imageSize=[],this.requestFragment())},previous(){this.currentPieceIndex<=0||(this.currentPieceIndex--,this.gotoPiece())},next(){parseInt(this.currentPieceIndex)+1>=this.discoveredList.length||(this.currentPieceIndex++,this.gotoPiece())},onUnloadAudio(){clearInterval(this.timer)},onUnload(){this.onUnloadAudio()}}},Dt={class:"container"},Zt=t("view",{style:{height:"40px"}},null,-1),Kt={class:"choose_character"},Qt={class:"column"},Yt=["src"],Xt=t("view",{style:{width:"10px"}},null,-1),es={style:{"font-size":"18px"}},ts={class:"img-top-shortline"},ss=["src"],os={class:"userinfobtns"},is={class:"column"},ns={class:"btn"},rs={class:"btn"},as={class:"btn"},ls=["src"],cs={key:1,class:"sliderCont"},ds=["src"],hs={key:2,class:"message"},us=t("view",{style:{height:"100px"}},null,-1),ps={class:"bottom1"},gs={class:"column1"},_s={key:0},ms={key:1},fs=t("text",{decode:"{{true}}"},"\u4E0A\u4E00\u6761\u53EF\u7528\u788E\u7247",-1),vs=[fs],ys={key:2},ws={key:3},ks=t("text",{decode:"{{true}}"},"\u4E0B\u4E00\u6761\u53EF\u7528\u788E\u7247",-1),$s=[ks];function xs(o,e,s,n,i,r){return a(),d("view",Dt,[Zt,t("view",Kt,[t("view",Qt,[t("img",{style:{width:"30px",height:"15px","margin-top":"7px"},src:i.imgs.eye},null,8,Yt),Xt,t("text",es,h(i.search_text),1)]),t("view",ts,[t("img",{src:i.imgs.shortLine,mode:"widthFix"},null,8,ss)])]),t("view",os,[t("view",is,[t("view",ns,[t("text",null,h(i.display_id),1)]),t("view",rs,[t("text",null,h(i.role),1)]),t("view",as,[t("text",null,h(i.comment),1)])])]),i.content_type==2?(a(),d("view",{key:0,class:"fragment-img",onClick:e[0]||(e[0]=(...c)=>r.gotoMap&&r.gotoMap(...c))},[t("view",null,[t("img",{src:i.pictures[0],style:O({width:i.imgWidth+"px"}),mode:"scaleToFill"},null,12,ls)])])):_("",!0),i.content_type==3?(a(),d("view",cs,[t("audio",{src:i.playurl,controls:"controls",class:"aaudio"},null,8,ds)])):_("",!0),i.content_type==1?(a(),d("text",hs,h(i.text),1)):_("",!0),us,t("view",ps,[t("view",gs,[i.currentPieceIndex==0?(a(),d("view",_s)):(a(),d("view",ms,[t("view",{class:"btn1",onClick:e[1]||(e[1]=(...c)=>r.previous&&r.previous(...c))},vs)])),i.last==!0?(a(),d("view",ys)):(a(),d("view",ws,[t("view",{class:"btn1",onClick:e[2]||(e[2]=(...c)=>r.next&&r.next(...c))},$s)]))])])])}var bs=$(Gt,[["render",xs]]);const Is={components:{},data(){return{pickedId:1,list:[],position:"left",disabled:!1,imgs:{shortLine:"https://assets.storiesmatter.cn/shortline.png"},imageSize:{},px2rpx:2,windowWidth:375,videoAd:null,inWechatBrowser:!1,api:null,spinning:!1,appId:"wx4cbaf7126c634959",uri:"",wcode:"",openid:"openid",version:"v1.0.0"}},onLoad(o){o.type!=null&&(this.type=o.type)},async mounted(){this.version=m.getVersion();var o=window.navigator.userAgent.toLowerCase();o.match(/MicroMessenger/i)=="micromessenger"?this.inWechatBrowser=!0:this.inWechatBrowser=!1,this.greet();const e=new URL(location.href).searchParams.get("code");if(!l.isEmpty(e))this.wcode=e,this.handlePay();else{let s=encodeURIComponent(window.location.href);this.uri=`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appId}&redirect_uri=`+s+"&response_type=code&scope=snsapi_base&state=STATE&connect_redirect=1#wechat_redirect"}},computed:{},methods:{greet:async function(o){this.spinning=!0,this.api=new g({});const e=await this.api.pricing();this.spinning=!1,e==null||(this.list=e.results)},handleRadio(o,e){console.log("pricingId is",e),localStorage.pricingId=e,this.pickedId=o+1},async handlePayGetCode(){window.location.href=this.uri},async handlePay(){this.inWechatBrowser||u.warning("\u8BF7\u5728\u5FAE\u4FE1\u91CC\u6253\u5F00\u5145\u503C\u9875\u9762\uFF0C\u6216\u8054\u7CFB\u5BA2\u670D\u54E6\uFF01"),this.spinning=!0;const o=this;typeof WeixinJSBridge=="undefined"?(console.log("WeixinJSBridge undefined"),document.addEventListener?(console.log("2"),document.addEventListener("WeixinJSBridgeReady",o.onBridgeReady,!1)):document.attachEvent&&(console.log("3"),document.attachEvent("WeixinJSBridgeReady",o.onBridgeReady),document.attachEvent("onWeixinJSBridgeReady",o.onBridgeReady))):(console.log("WeixinJSBridge is defined"),this.onBridgeReady())},onBridgeReady(){console.log("------onBridgeReady this.wcode",this.wcode),l.isEmpty(localStorage.pricingId)&&(localStorage.pricingId=1),this.api.orders(localStorage.pricingId,this.wcode).then(o=>{if(this.spinning=!1,!l.isEmpty(o)&&o.status==="ok"){const{appId:e=this.appId,timeStamp:s,nonceStr:n,paySign:i}=o,r="MD5",c=o.package;console.log("nonceStr",n),WeixinJSBridge.invoke("getBrandWCPayRequest",{appId:e,timeStamp:s,nonceStr:n,package:c,signType:r,paySign:i},function(p){console.log("res",p),p.err_msg=="get_brand_wcpay_request:ok"?console.log("\u652F\u4ED8\u6210\u529F"):console.log("\u652F\u4ED8\u5931\u8D25\uFF0C\u8BF7\u91CD\u65B0\u652F\u4ED8")})}})}}},Cs={class:"container"},Ss={class:"spin"},Ls=t("view",{style:{height:"40px"}},null,-1),Vs={class:"choose_character"},Ts=t("view",{class:"column"},[t("text",{class:"title2"},"\u8D2D\u4E70\u641C\u7D22\u6B21\u6570")],-1),Es={class:"img-top-shortline"},Ps=["src"],Rs={class:"statement-list"},Fs=["onClick"],qs=["value"],Us={class:"cell-text"},Bs=t("p",null,null,-1),Os=t("p",null,null,-1),Ws=t("text",{class:"svg-demo-text"},"\u5FAE\u4FE1\u652F\u4ED8",-1),As=[Ws],Ms={class:"login-version"};function Hs(o,e,s,n,i,r){const c=v("a-spin");return a(),d("view",Cs,[t("div",Ss,[f(c,{spinning:i.spinning},null,8,["spinning"])]),Ls,t("view",Vs,[Ts,t("view",Es,[t("img",{src:i.imgs.shortLine,mode:"widthFix"},null,8,Ps)])]),t("view",Rs,[(a(!0),d(y,null,k(i.list,(p,I)=>(a(),d("view",{key:I,index:"index",item:"item"},[t("view",{class:"cell",onClick:C=>r.handleRadio(I,p.id)},[V(t("input",{class:"cell-radio",type:"radio",value:p.id,"onUpdate:modelValue":e[0]||(e[0]=C=>i.pickedId=C)},null,8,qs),[[T,i.pickedId]]),t("text",Us,h(p.credit)+"\u6B21\u641C\u7D22 \xA5"+h(p.price),1),Bs],8,Fs)]))),128))]),Os,t("view",{class:"pay",onClick:e[1]||(e[1]=(...p)=>r.handlePayGetCode&&r.handlePayGetCode(...p))},As),t("div",Ms,[t("text",null,h(i.version),1)])])}var Js=$(Is,[["render",Hs]]);const js={},zs={class:"container"},Ns=t("text",{class:"svg-demo-text"}," not found ",-1),Gs=[Ns];function Ds(o,e,s,n,i,r){return a(),d("view",zs,Gs)}var Zs=$(js,[["render",Ds]]);const Ks=W({history:A("/"),routes:[{path:"/home",name:"home",component:L},{path:"/character",name:"character",component:$e},{path:"/piece",component:bs},{path:"/login",component:Nt},{path:"/topup",component:Js},{path:"/",component:L},{path:"/:pathMatch(.*)*",component:Zs}]});const w=M(G);w.use(Ks);w.use(H,{position:"top"});w.use(J);w.use(j);w.mount("#app");
