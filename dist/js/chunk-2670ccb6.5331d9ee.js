(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2670ccb6"],{1285:function(t,s,e){"use strict";var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("div",{staticClass:"alert alert-info",attrs:{role:"alert"}},[t._v("\n        "+t._s(t.message)+"\n    ")])])},i=[],r={props:{message:String}},n=r,l=e("2877"),c=Object(l["a"])(n,a,i,!1,null,null,null);s["a"]=c.exports},"438f":function(t,s,e){"use strict";var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"card users-nav"},[e("div",{staticClass:"card-body"},[e("div",{staticClass:"d-flex flex-wrap user-profile-btns"},[e("router-link",{class:[t.routeName==t.USERS_PROFILE_ROUTE?"active":null,"btn"],attrs:{to:{name:t.USERS_PROFILE_ROUTE}}},[t._v("Profile")]),e("router-link",{class:[[t.USERS_SUBSCRIPTIONS_ROUTE,t.USERS_ADD_SUBSCRIPTIONS_ROUTE,t.EDIT_USERS_SUBSCRIPTIONS_ROUTE].includes(t.routeName)?"active":null,"btn"],attrs:{to:{name:t.USERS_SUBSCRIPTIONS_ROUTE}}},[t._v("Subscriptions")]),e("router-link",{class:[t.routeName==t.USERS_BILLING_HISTORY_ROUTE?"active":null,"btn"],attrs:{to:{name:t.USERS_BILLING_HISTORY_ROUTE}}},[t._v("Billing History")]),e("router-link",{class:[t.routeName==t.USERS_ALERT_EMAILS_ROUTE?"active":null,"btn"],attrs:{to:{name:t.USERS_ALERT_EMAILS_ROUTE}}},[t._v("Alert Emails")]),e("router-link",{class:[t.routeName==t.USERS_BOOKMARKS_ROUTE?"active":null,"btn"],attrs:{to:{name:t.USERS_BOOKMARKS_ROUTE}}},[t._v("Bookmarks")]),e("router-link",{class:[t.routeName==t.USERS_ACTIVITIES_ROUTE?"active":null,"btn"],attrs:{to:{name:t.USERS_ACTIVITIES_ROUTE}}},[t._v("Activities")]),e("router-link",{class:[t.routeName==t.USERS_SETTINGS_ROUTE?"active":null,"btn"],attrs:{to:{name:t.USERS_SETTINGS_ROUTE}}},[t._v("Settings")])],1)])])},i=[],r=(e("7f7f"),e("9f2e")),n={data:function(){return{USERS_PROFILE_ROUTE:r["z"],USERS_SUBSCRIPTIONS_ROUTE:r["C"],USERS_BOOKMARKS_ROUTE:r["y"],USERS_ACTIVITIES_ROUTE:r["u"],USERS_BILLING_HISTORY_ROUTE:r["x"],USERS_ALERT_EMAILS_ROUTE:r["w"],USERS_ADD_SUBSCRIPTIONS_ROUTE:r["v"],USERS_SETTINGS_ROUTE:r["B"],EDIT_USERS_SUBSCRIPTIONS_ROUTE:r["l"]}},computed:{routeName:function(){return this.$route.name}}},l=n,c=e("2877"),_=Object(c["a"])(l,a,i,!1,null,null,null);s["a"]=_.exports},e43b:function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"dashboard-body"},[e("errorNav"),e("div",{staticClass:"row"},[e("sidenav",{staticClass:"col-2"}),e("div",{staticClass:"col-10 content-section admin-dashboard-title"},[e("div",{staticClass:"card title-card"},[e("div",{staticClass:"card-body"},[e("div",{staticClass:"row"},[e("h4",{staticClass:"col-12"},[t._v(t._s(t._f("capitalize")(t.user.fname))+" "+t._s(t._f("capitalize")(t.user.lname)))])])])]),e("usersNav"),e("div",{staticClass:"card"},[e("div",{staticClass:"card-body"},[t.userIsLoading?e("div",{staticClass:"alert loading-alert",attrs:{role:"alert"}},[t._m(0)]):t._e(),t.user.hasActiveSubscription&&null==t.user.pendingSubscription?e("router-link",{staticClass:"btn btn-outline-secondary add-subscription-btn",attrs:{to:{name:t.USERS_ADD_SUBSCRIPTIONS_ROUTE}}},[t._v("Add Pending Subscription")]):t._e(),t.user.hasActiveSubscription||null!=t.user.pendingSubscription?t._e():e("router-link",{staticClass:"btn btn-outline-primary add-subscription-btn",attrs:{to:{name:t.USERS_ADD_SUBSCRIPTIONS_ROUTE}}},[t._v("Add Subscription")]),e("br"),e("hr"),t.user.subscriptions.length>0?e("table",{staticClass:"table table-bordered table-hover"},[t._m(1),e("tbody",[t._l(t.user.subscriptions,(function(s,a){return[e("tr",{key:a},[e("th",{attrs:{scope:"row"}},[t._v(t._s(a+1))]),e("td",[e("a",{attrs:{href:t.SERVER_URL+"/"+t.SERVER_INVOICE_DIR+"/"+s.invoicePDF,target:"_blank"}},[t._v(t._s(s.invoiceId))])]),e("td",[e("router-link",{staticClass:"edit-btn",attrs:{to:{name:t.EDIT_USERS_SUBSCRIPTIONS_ROUTE,params:{userId:t.user._id,subscriptionId:s._id}},href:""}},[t._v("Edit")])],1),e("td",[t._v(t._s(s.payment.paymentMethod.name))]),e("td",[s.payment.isPaid?e("span",{staticClass:"badge badge-success"},[t._v("Paid")]):e("span",{staticClass:"badge badge-info"},[t._v("Pending")])]),e("td",[t._v(t._s(null!=s.payment.bank?s.payment.bank.iso3:"-"))]),e("td",[e("span",{class:[s.isActive?"badge-success":s.isPending?"badge-secondary":s.isActive||s.isPending?null:"badge-danger","badge"]},[t._v(t._s(t.getUserSubscriptionStatus(s.isActive,s.isPending)))])]),e("td",[t._v(t._s(s.subscriptionPlan.name))]),e("td",[t._v(t._s(t._f("getDateOnly")(t._f("formatDate")(s.startDate))))]),e("td",[t._v(t._s(t._f("getDateOnly")(t._f("formatDate")(s.endDate))))])])]}))],2)]):e("emptyList",{attrs:{message:"User has no subscription"}})],1)])],1)],1)],1)},i=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"row"},[e("div",{staticClass:"spinner-border",attrs:{role:"status"}},[e("span",{staticClass:"sr-only"},[t._v("Loading...")])]),e("div",{staticClass:"col-3"},[t._v("\n                                Loading...\n                            ")])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("thead",[e("tr",[e("th",{staticClass:"title",attrs:{scope:"col"}},[t._v("#")]),e("th",{staticClass:"title",attrs:{scope:"col"}},[t._v("Invoice Id")]),e("th",{staticClass:"title",attrs:{scope:"col"}}),e("th",{staticClass:"title",attrs:{scope:"col"}},[t._v("Payment Method")]),e("th",{staticClass:"title",attrs:{scope:"col"}},[t._v("Paid")]),e("th",{staticClass:"title",attrs:{scope:"col"}},[t._v("Bank")]),e("th",{staticClass:"title",attrs:{scope:"col"}},[t._v("Status")]),e("th",{staticClass:"title",attrs:{scope:"col"}},[t._v("Plan")]),e("th",{staticClass:"title",attrs:{scope:"col"}},[t._v("Start Date")]),e("th",{staticClass:"title",attrs:{scope:"col"}},[t._v("End Date")])])])}],r=e("21e0"),n=e("c67e"),l=e("438f"),c=e("1285"),_=e("9f2e"),o=e("ede6"),S=e("37b6"),u={components:{sidenav:r["a"],errorNav:n["a"],usersNav:l["a"],emptyList:c["a"]},data:function(){return{USER_SUBSCRIPTION_ACTIVE:S["x"],USER_SUBSCRIPTION_PENDING:S["z"],USER_SUBSCRIPTION_EXPIRED:S["y"],USERS_ADD_SUBSCRIPTIONS_ROUTE:_["v"],EDIT_USERS_SUBSCRIPTIONS_ROUTE:_["l"],SERVER_URL:S["r"],SERVER_INVOICE_DIR:S["q"]}},computed:{user:function(){return this.$store.getters.user.data},userIsLoading:function(){return this.$store.getters.user.isLoading}},methods:{changeUserActiveStatus:function(t){this.$store.dispatch(o["lb"],{_id:t})},getUser:function(){this.$store.dispatch(o["V"],{id:this.$route.params.id})},getUserSubscriptionStatus:function(t,s){return t?S["x"]:s?S["z"]:t||s?void 0:S["y"]}},mounted:function(){this.getUser()}},d=u,E=e("2877"),R=Object(E["a"])(d,a,i,!1,null,null,null);s["default"]=R.exports}}]);
//# sourceMappingURL=chunk-2670ccb6.5331d9ee.js.map