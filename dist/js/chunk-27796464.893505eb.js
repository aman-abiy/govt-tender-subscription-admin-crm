(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-27796464"],{2883:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"dashboard-body"},[a("errorNav"),a("div",{staticClass:"row"},[a("sidenav",{staticClass:"col-2"}),a("div",{staticClass:"col-10 content-section admin-dashboard-title"},[a("nameNav",{attrs:{fname:t.user.fname,lname:t.user.lname}}),a("ValidationObserver",{scopedSlots:t._u([{key:"default",fn:function(e){var s=e.handleSubmit;return[a("form",{on:{submit:function(e){return e.preventDefault(),s(t.editUser)}}},[a("div",{staticClass:"card title-card"},[a("div",{staticClass:"card-body"},[a("div",{staticClass:"row"},[a("div",{staticClass:"d-flex flex-wrap control-nav-btns"},[a("button",{staticClass:"btn btn-primary save",attrs:{type:"submit"}},[t._v("Save")]),a("button",{staticClass:"btn btn-outline-secondary",attrs:{type:"button"},on:{click:t.navigateBack}},[t._v("Close")])])])])]),t.userIsLoading?a("div",{staticClass:"alert loading-alert",attrs:{role:"alert"}},[a("div",{staticClass:"row"},[a("div",{staticClass:"spinner-border",attrs:{role:"status"}},[a("span",{staticClass:"sr-only"},[t._v("Loading...")])]),a("div",{staticClass:"col-3"},[t._v("\n                                Loading...\n                            ")])])]):t._e(),a("div",{staticClass:"row"},[a("div",{staticClass:"col-4"},[a("div",{staticClass:"card profile-card"},[a("div",{staticClass:"card-header"},[t._v("\n                                    Account\n                                ")]),a("div",{staticClass:"card-body"},[a("ValidationProvider",{attrs:{name:"fname",rules:"required"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors;return[a("label",{attrs:{for:"fname"}},[t._v("First Name")]),a("div",{staticClass:"input-group mb-3"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.fname,expression:"fname"}],staticClass:"form-control",attrs:{type:"text",id:"fname",placeholder:""},domProps:{value:t.fname},on:{input:function(e){e.target.composing||(t.fname=e.target.value)}}})]),a("small",{staticClass:"form-text text-muted"},[t._v(t._s(s[0]))])]}}],null,!0)}),a("ValidationProvider",{attrs:{name:"lname",rules:"required"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors;return[a("label",{attrs:{for:"lname"}},[t._v("Last Name")]),a("div",{staticClass:"input-group mb-3"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.lname,expression:"lname"}],staticClass:"form-control",attrs:{type:"text",id:"lname",placeholder:""},domProps:{value:t.lname},on:{input:function(e){e.target.composing||(t.lname=e.target.value)}}})]),a("small",{staticClass:"form-text text-muted"},[t._v(t._s(s[0]))])]}}],null,!0)})],1)]),a("div",{staticClass:"card profile-card"},[a("div",{staticClass:"card-header"},[t._v("\n                                    Roles\n                                ")]),a("div",{staticClass:"card-body"},[a("ValidationProvider",{attrs:{name:"role",rules:"required"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors;return[t._l(t.ROLES,(function(e,s){return[a("div",{key:s,staticClass:"input-group"},[a("div",{staticClass:"role-checkbox custom-control custom-checkbox"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.roles,expression:"roles"}],staticClass:"custom-control-input",attrs:{type:"checkbox",id:"role"+(s+1)},domProps:{value:e,checked:t.roles.includes(e),checked:Array.isArray(t.roles)?t._i(t.roles,e)>-1:t.roles},on:{change:function(a){var s=t.roles,r=a.target,i=!!r.checked;if(Array.isArray(s)){var n=e,o=t._i(s,n);r.checked?o<0&&(t.roles=s.concat([n])):o>-1&&(t.roles=s.slice(0,o).concat(s.slice(o+1)))}else t.roles=i}}}),a("label",{staticClass:"custom-control-label",attrs:{for:"role"+(s+1)}},[t._v(t._s(t._f("uppercase")(e)))])])])]})),a("small",{staticClass:"form-text text-muted"},[t._v(t._s(s[0]))])]}}],null,!0)})],1)])]),a("div",{staticClass:"col-4"},[a("div",{staticClass:"card profile-card"},[a("div",{staticClass:"card-header"},[t._v("\n                                    Auth\n                                ")]),a("div",{staticClass:"card-body"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-12"},[a("ValidationProvider",{attrs:{name:"email",rules:"required"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors;return[a("label",{attrs:{for:"email"}},[t._v("Email")]),a("div",{staticClass:"input-group mb-3"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"form-control",attrs:{type:"email",id:"email",placeholder:""},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}})]),a("small",{staticClass:"form-text text-muted"},[t._v(t._s(s[0]))])]}}],null,!0)}),a("ValidationProvider",{attrs:{name:"mobile",rules:""},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors;return[a("label",{attrs:{for:"mobile"}},[t._v("Phone Number")]),a("MazPhoneNumberInput",{staticClass:"auth-input",attrs:{"default-phone-number":t.mobile.nationalNumber,id:"mobile","default-country-code":"ET","preferred-countries":["ET","US","GB"]},on:{update:function(e){t.mobile=e}}}),a("small",{staticClass:"form-text text-muted"},[t._v(t._s(s[0]))])]}}],null,!0)}),a("br"),a("ValidationProvider",{attrs:{name:"password",rules:""},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors;return[a("label",{attrs:{for:"password"}},[t._v("Password "),a("font-awesome-icon",{staticClass:"fa",attrs:{icon:"fa-solid fa-chart-simple"},on:{click:function(e){return t.generatePassword()}}})],1),a("div",{staticClass:"input-group mb-3"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],ref:"passwordInput",staticClass:"form-control",attrs:{type:"password",id:"password",placeholder:"******"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}}),a("div",{staticClass:"input-group-append show-password-toggle",on:{click:function(e){return t.showPassword()}}},[a("span",{staticClass:"input-group-text"},[a("font-awesome-icon",{attrs:{icon:"fa-solid fa-eye"}})],1)])]),a("small",{staticClass:"form-text text-muted"},[t._v(t._s(s[0]))])]}}],null,!0)})],1)])])])])])])]}}])})],1)],1)],1)},r=[],i=(a("8e6e"),a("ac6a"),a("456d"),a("ade3")),n=a("21e0"),o=a("c67e"),l=a("754f"),c=a("ffd9"),u=a("7bb1"),d=a("4c93"),m=a("ede6"),p=a("37b6"),f=a("ecee"),v=a("c074");function b(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,s)}return a}function h(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?b(Object(a),!0).forEach((function(e){Object(i["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):b(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}f["c"].add(v["c"],v["i"]);var w={components:{sidenav:n["a"],errorNav:o["a"],nameNav:l["a"],MazPhoneNumberInput:c["MazPhoneNumberInput"]},data:function(){return{ROLES:p["o"],fname:null,lname:null,email:null,mobile:{},password:null,roles:["user"],phoneNumber:null}},watch:{userIsLoading:{handler:function(t){0==t&&this.setValues()}}},computed:{user:function(){return this.$store.getters.user.data},userIsLoading:function(){return this.$store.getters.user.isLoading}},methods:{navigateBack:function(){this.$router.go(-1)},generatePassword:function(){this.password=Math.floor(1e6*Math.random())},showPassword:function(){var t=this.$refs.passwordInput;t&&("password"===t.type?t.type="text":t.type="password")},editUser:function(){var t=h(h({_id:this.user._id,fname:this.fname,lname:this.lname,email:this.email,mobile:this.mobile},null!=this.password?{password:this.password}:{}),{},{roles:this.roles});this.$store.dispatch(m["B"],t)},setValues:function(){this.fname=this.user.fname,this.lname=this.user.lname,this.email=this.user.email,this.mobile=this.user.mobile,this.roles=this.user.roles,this.phoneNumber=this.user.mobile.nationalNumber},getUser:function(){this.$store.dispatch(m["V"],{id:this.$route.params.id})}},mounted:function(){this.getUser(),this.setValues()}};Object(u["c"])("required",h(h({},d["b"]),{},{message:"This field is required"}));var C=w,g=a("2877"),y=Object(g["a"])(C,s,r,!1,null,null,null);e["default"]=y.exports},"4c93":function(t,e,a){"use strict";a.d(e,"a",(function(){return i})),a.d(e,"b",(function(){return d}));
/**
  * vee-validate v3.4.11
  * (c) 2021 Abdelrahman Awad
  * @license MIT
  */
var s=function(t,e){var a=(void 0===e?{}:e).multiple,s=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return a&&!Array.isArray(t)&&(t=String(t).split(",").map((function(t){return t.trim()}))),Array.isArray(t)?t.every((function(t){return s.test(String(t))})):s.test(String(t))},r=[{name:"multiple",default:!1}],i={validate:s,params:r};function n(t){return null===t||void 0===t}function o(t){return Array.isArray(t)&&0===t.length}var l=function(t,e){var a=(void 0===e?{allowFalse:!0}:e).allowFalse,s={valid:!1,required:!0};return n(t)||o(t)?s:!1!==t||a?(s.valid=!!String(t).trim().length,s):s},c=!0,u=[{name:"allowFalse",default:!0}],d={validate:l,params:u,computesRequired:c}},"754f":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"card title-card"},[a("div",{staticClass:"card-body"},[a("div",{staticClass:"row"},[a("h4",{staticClass:"col-6"},[t._v(t._s(t._f("capitalize")(t.fname))+" "+t._s(t._f("capitalize")(t.lname)))])])])])},r=[],i={props:{fname:String,lname:String}},n=i,o=a("2877"),l=Object(o["a"])(n,s,r,!1,null,null,null);e["a"]=l.exports}}]);
//# sourceMappingURL=chunk-27796464.893505eb.js.map