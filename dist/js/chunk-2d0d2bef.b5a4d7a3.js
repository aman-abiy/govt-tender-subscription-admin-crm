(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d2bef"],{"5a8e":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"dashboard-body"},[a("errorNav"),a("div",{staticClass:"row"},[a("sidenav",{staticClass:"col-2"}),a("div",{staticClass:"col-10 content-section admin-dashboard-title"},[a("nameNav",{attrs:{fname:t.user.fname,lname:t.user.lname}}),a("usersNav"),a("ValidationObserver",{scopedSlots:t._u([{key:"default",fn:function(e){var s=e.handleSubmit;return[a("form",{on:{submit:function(e){return e.preventDefault(),s(t.addSubscription)}}},[a("div",{staticClass:"card title-card"},[a("div",{staticClass:"card-body"},[a("div",{staticClass:"row"},[a("div",{staticClass:"d-flex flex-wrap control-nav-btns"},[a("button",{staticClass:"btn btn-primary save",attrs:{type:"submit",disabled:!!t.subscriptionIsLoading}},[t.subscriptionIsLoading?a("span",{staticClass:"spinner-border spinner-border-sm",attrs:{role:"status","aria-hidden":"true"}}):t._e(),t.subscriptionIsLoading?t._e():a("span",[t._v("Save")])]),a("button",{staticClass:"btn btn-outline-secondary",attrs:{type:"button"},on:{click:t.navigateBack}},[t._v("Close")])])])])]),t.subscriptionIsLoading?a("div",{staticClass:"alert loading-alert",attrs:{role:"alert"}},[a("div",{staticClass:"row"},[a("div",{staticClass:"spinner-border",attrs:{role:"status"}},[a("span",{staticClass:"sr-only"},[t._v("Loading...")])]),a("div",{staticClass:"col-3"},[t._v("\n                                Loading...\n                            ")])])]):t._e(),a("div",{staticClass:"row"},[a("div",{staticClass:"col-4"},[a("div",{staticClass:"card profile-card"},[a("div",{staticClass:"card-header"},[t._v("\n                                    Subscription Plan\n                                ")]),a("div",{staticClass:"card-body"},[a("ValidationProvider",{attrs:{name:"subscriptionPlan",rules:"required"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors;return[a("label",{attrs:{for:"subscriptionPlan"}},[t._v("Plan")]),a("div",{staticClass:"input-group mb-3"},[a("select",{directives:[{name:"model",rawName:"v-model",value:t.subscriptionPlan,expression:"subscriptionPlan"}],staticClass:"custom-select",attrs:{id:"subscriptionPlan"},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.subscriptionPlan=e.target.multiple?a:a[0]}}},[t._l(t.subscriptionPlans,(function(e,s){return[a("option",{key:s,domProps:{value:e._id}},[t._v(t._s(e.name))])]}))],2)]),a("small",{staticClass:"form-text text-muted"},[t._v(t._s(s[0]))])]}}],null,!0)}),t.hasActiveSubscription?t._e():a("ValidationProvider",{attrs:{name:"startDate",rules:"required"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors;return[a("label",{attrs:{for:"startDate"}},[t._v("Start Date")]),a("div",{staticClass:"input-group mb-3"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.startDate,expression:"startDate"}],staticClass:"datePicker form-control",attrs:{type:"date",name:"startDate",id:"paymentDate"},domProps:{value:t.startDate},on:{input:function(e){e.target.composing||(t.startDate=e.target.value)}}})]),a("small",{staticClass:"form-text text-muted"},[t._v(t._s(s[0]))])]}}],null,!0)})],1)])]),a("div",{staticClass:"col-8"},[a("div",{staticClass:"card profile-card"},[a("div",{staticClass:"card-header"},[t._v("\n                                    Payment\n                                ")]),a("div",{staticClass:"card-body"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-6"},[a("ValidationProvider",{attrs:{name:"paymentMethod",rules:"required"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors;return[a("label",{attrs:{for:"paymentMethod"}},[t._v("Method")]),a("div",{staticClass:"input-group mb-3"},[a("select",{directives:[{name:"model",rawName:"v-model",value:t.paymentMethod,expression:"paymentMethod"}],staticClass:"custom-select",attrs:{id:"paymentMethod"},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.paymentMethod=e.target.multiple?a:a[0]}}},[t._l(t.paymentMethods,(function(e,s){return[a("option",{key:s,domProps:{value:e._id}},[t._v(t._s(e.name))])]}))],2)]),a("small",{staticClass:"form-text text-muted"},[t._v(t._s(s[0]))])]}}],null,!0)}),a("ValidationProvider",{attrs:{name:"currency",rules:"required"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors;return[a("label",{attrs:{for:"currency"}},[t._v("Currency")]),a("div",{staticClass:"input-group mb-3"},[a("select",{directives:[{name:"model",rawName:"v-model",value:t.currency,expression:"currency"}],staticClass:"custom-select",attrs:{id:"currency"},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.currency=e.target.multiple?a:a[0]}}},[t._l(t.currencies,(function(e,s){return[a("option",{key:s,domProps:{value:e._id}},[t._v(t._s(t._f("uppercase")(e.iso3)))])]}))],2)]),a("small",{staticClass:"form-text text-muted"},[t._v(t._s(s[0]))])]}}],null,!0)}),a("ValidationProvider",{attrs:{name:"bank",rules:"required"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors;return[a("label",{attrs:{for:"bank"}},[t._v("Bank")]),a("div",{staticClass:"input-group mb-3"},[a("select",{directives:[{name:"model",rawName:"v-model",value:t.bank,expression:"bank"}],staticClass:"custom-select",attrs:{id:"bank"},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.bank=e.target.multiple?a:a[0]}}},[t._l(t.banks,(function(e,s){return[a("option",{key:s,domProps:{value:e._id}},[t._v(t._s(e.name))])]}))],2)]),a("small",{staticClass:"form-text text-muted"},[t._v(t._s(s[0]))])]}}],null,!0)})],1),a("div",{staticClass:"col-6"},[a("ValidationProvider",{attrs:{name:"transactionId",rules:"required"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors;return[a("label",{attrs:{for:"transactionId"}},[t._v("Transaction Ref")]),a("div",{staticClass:"input-group mb-3"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.transactionRef,expression:"transactionRef"}],staticClass:"form-control",attrs:{type:"text",id:"transactionId",placeholder:"0000000000"},domProps:{value:t.transactionRef},on:{input:function(e){e.target.composing||(t.transactionRef=e.target.value)}}})]),a("small",{staticClass:"form-text text-muted"},[t._v(t._s(s[0]))])]}}],null,!0)}),a("ValidationProvider",{attrs:{name:"status",rules:"required"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors;return[a("label",{attrs:{for:"status"}},[t._v("Status")]),a("div",{staticClass:"input-group mb-3"},[a("select",{directives:[{name:"model",rawName:"v-model",value:t.isPaid,expression:"isPaid"}],staticClass:"custom-select",attrs:{id:"status"},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.isPaid=e.target.multiple?a:a[0]}}},[a("option",{domProps:{value:!0}},[t._v("Paid")]),a("option",{domProps:{value:!1}},[t._v("Pending")])])]),a("small",{staticClass:"form-text text-muted"},[t._v(t._s(s[0]))])]}}],null,!0)}),a("ValidationProvider",{attrs:{name:"paymentDate",rules:"required"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors;return[a("label",{attrs:{for:"paymentDate"}},[t._v("Payment Date")]),a("div",{staticClass:"input-group mb-3"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.paymentDate,expression:"paymentDate"}],staticClass:"datePicker form-control",attrs:{type:"date",name:"paymentDate",id:"paymentDate"},domProps:{value:t.paymentDate},on:{input:function(e){e.target.composing||(t.paymentDate=e.target.value)}}})]),a("small",{staticClass:"form-text text-muted"},[t._v(t._s(s[0]))])]}}],null,!0)})],1)])])])])])])]}}])})],1)],1)],1)},r=[],n=(a("8e6e"),a("ac6a"),a("456d"),a("ade3")),i=(a("28a5"),a("21e0")),o=a("c67e"),c=a("438f"),u=a("754f"),l=a("ede6"),d=a("7bb1"),p=a("4c93");function v(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,s)}return a}function m(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?v(Object(a),!0).forEach((function(e){Object(n["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):v(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var f={components:{sidenav:i["a"],errorNav:o["a"],usersNav:c["a"],nameNav:u["a"]},data:function(){return{subscriptionPlan:null,startDate:null,paymentMethod:null,transactionRef:null,currency:null,bank:null,paymentDate:null,isPaid:null}},computed:{user:function(){return this.$store.getters.user.data},userIsLoading:function(){return this.$store.getters.user.isLoading},subscriptionIsLoading:function(){return this.$store.getters.subscription.isLoading},subscriptionPlans:function(){return this.$store.getters.subscriptionPlans.data},subscriptionPlansIsLoading:function(){return this.$store.getters.subscriptionPlans.isLoading},banks:function(){return this.$store.getters.bankAccounts.data},bankAccountIsLoading:function(){return this.$store.getters.bankAccounts.isLoading},paymentMethods:function(){return this.$store.getters.paymentMethods.data},paymentMethodIsLoading:function(){return this.$store.getters.paymentMethods.isLoading},currencies:function(){return this.$store.getters.currency.data},currenciesIsLoading:function(){return this.$store.getters.currency.isLoading},hasActiveSubscription:function(){return this.user.hasActiveSubscription&&null==this.user.pendingSubscription}},methods:{navigateBack:function(){this.$router.go(-1)},getSubscriptionPlans:function(){this.$store.dispatch(l["S"])},getBankAccounts:function(){this.$store.dispatch(l["E"])},getPaymentMethodsAccounts:function(){this.$store.dispatch(l["M"])},getCurrencies:function(){this.$store.dispatch(l["H"])},convertDateToEpoch:function(t){if(null!=t){var e=t.split("-");return new Date(e[0],e[1]-1,e[2]).valueOf()}},addSubscription:function(){var t={account:this.user._id,isPaid:this.isPaid,paymentMethod:this.paymentMethod,currency:this.currency,paymentDate:this.convertDateToEpoch(this.paymentDate),bank:this.bank,transactionRef:this.transactionRef,subscriptionPlan:this.subscriptionPlan,startDate:this.convertDateToEpoch(this.startDate)};console.log("payload",t),this.user.hasActiveSubscription||null!=this.pendingSubscription?this.user.hasActiveSubscription&&null==this.user.pendingSubscription&&(delete t.startDate,this.$store.dispatch(l["c"],t)):this.$store.dispatch(l["d"],t)}},mounted:function(){this.getSubscriptionPlans(),this.getBankAccounts(),this.getPaymentMethodsAccounts(),this.getCurrencies()}};Object(d["c"])("required",m(m({},p["b"]),{},{message:"This field is required"}));var b=f,h=a("2877"),y=Object(h["a"])(b,s,r,!1,null,null,null);e["default"]=y.exports}}]);
//# sourceMappingURL=chunk-2d0d2bef.b5a4d7a3.js.map