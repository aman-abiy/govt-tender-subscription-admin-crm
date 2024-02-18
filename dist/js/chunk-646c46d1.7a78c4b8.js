(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-646c46d1"],{3292:function(t,s,a){"use strict";a.r(s);var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"dashboard-body"},[a("errorNav"),a("div",{staticClass:"row"},[a("sidenav",{staticClass:"col-2"}),a("div",{staticClass:"col-10 content-section admin-dashboard-title"},[null!=t.user?a("nameNav",{attrs:{fname:t.user.fname,lname:t.user.lname}}):t._e(),a("usersNav"),t.userIsLoading?a("div",{staticClass:"alert loading-alert",attrs:{role:"alert"}},[t._m(0)]):t._e(),a("div",{staticClass:"row"},[a("div",{staticClass:"col-5"},[a("div",{staticClass:"card profile-card"},[a("div",{staticClass:"card-header"},[t._v("\n                            Account\n                        ")]),a("div",{staticClass:"card-body"},[a("div",{staticClass:"row"},[t._m(1),null!=t.user?a("div",{staticClass:"col-7"},[a("p",{staticClass:"value"},[t._v(t._s(t._f("capitalize")(t.user.fname)))]),a("hr"),a("p",{staticClass:"value"},[t._v(t._s(t._f("capitalize")(t.user.lname)))]),a("hr"),a("p",{staticClass:"value"},[a("a",{attrs:{href:"mailto:"+t.user.email}},[t._v(t._s(t.user.email))]),t.user.isVerified?a("span",{staticClass:"verified-badge text-success"},[a("font-awesome-icon",{attrs:{icon:"fa-solid fa-circle-check"}})],1):t._e()]),a("hr"),t.user.mobile?a("p",{staticClass:"value"},[a("a",{attrs:{href:"tel:"+t.user.mobile.e164}},[t._v(t._s(t.user.mobile.formatInternational))])]):t._e(),a("hr"),a("p",{staticClass:"value"},[t._l(t.user.roles,(function(s,e){return[a("span",{key:e,staticClass:"badge badge-secondary"},[t._v(t._s(t._f("capitalize")(s)))])]}))],2),a("hr"),a("p",{staticClass:"value"},[t.userIsLoading?a("span",{staticClass:"spinner-border spinner-border-sm",attrs:{role:"status","aria-hidden":"true"}}):a("span",{class:[t.user.isActive?" badge-success":" badge-danger","badge toggle-badge"],on:{click:function(s){return t.changeUserActiveStatus(t.user._id,t.user.isActive)}}},[t._v(t._s(t.user.isActive?"Enabled":"Disabled"))])])]):t._e()])])]),a("div",{staticClass:"card profile-card"},[a("div",{staticClass:"card-header"},[t._v("\n                            Activities\n                        ")]),a("div",{staticClass:"card-body"},[a("div",{staticClass:"row"},[t._m(2),null!=t.user?a("div",{staticClass:"col-7"},[a("p",{staticClass:"value"},[t._v(t._s(t._f("getDateAndTime")(t._f("formatDate")(t.user.createdAt))))]),a("hr"),a("p",{staticClass:"value"},[t._v("- "+t._s(null!=t.user&&t.user.sessionActivity.length>0?t.user.sessionActivity.at(-1).type:"-")+" -")]),a("hr"),a("p",{staticClass:"value"},[t._v(t._s(t.user.sessionActivity.length>0?t.user.sessionActivity[t.user.sessionActivity.length-1].timestamp:"-"))]),a("hr"),a("p",{staticClass:"value"},[t._v(t._s(t.user.sessionActivity.length>0&&null!=t.user.sessionActivity[t.user.sessionActivity.length-1].deviceInfo?t.user.sessionActivity[t.user.sessionActivity.length-1].deviceInfo.ip:"-"))]),a("hr"),a("p",{staticClass:"value"},[t._v(t._s(null!=t.user&&t.user.sessionActivity.length>0&&t.user.sessionActivity.map((function(t){if("login"==t.type)return t.timestamp})).at(-1)||"-")+"  ")]),a("hr"),a("p",{staticClass:"value"},[t._v(t._s(t._f("getDateAndTime")(t._f("formatDate")(t.user.lastUpdatedAt))))]),a("hr"),a("p",{staticClass:"value"},[t.user.lastUpdatedBy?a("router-link",{attrs:{to:{name:t.USERS_PROFILE_ROUTE,params:{id:t.user.lastUpdatedBy._id}}}},[t._v(t._s(t.user.lastUpdatedBy.fname))]):a("span",[t._v("-")])],1),a("hr"),a("p",{staticClass:"value"},[t.user.createdBy?a("router-link",{attrs:{to:{name:t.USERS_PROFILE_ROUTE,params:{id:t.user.createdBy._id}}}},[t._v(t._s(t.user.createdBy.fname))]):a("span",[t._v("Self")])],1)]):t._e()])])])]),a("div",{staticClass:"col-3"},[a("div",{staticClass:"card profile-card"},[a("div",{staticClass:"card-header"},[t._v("\n                            Subscription\n                        ")]),a("div",{staticClass:"card-body"},[null!=t.user?a("div",{staticClass:"row"},[t._m(3),t.user.lastActiveSubscription?a("div",{staticClass:"col-7"},[a("p",{staticClass:"value"},[a("span",{class:[t.getUserSubscriptionStatus(t.user.hasActiveSubscription,t.user.lastActiveSubscription)==t.USER_SUBSCRIPTION_ACTIVE?"badge-success":t.getUserSubscriptionStatus(t.user.hasActiveSubscription,t.user.lastActiveSubscription)==t.USER_SUBSCRIPTION_PENDING?"badge-secondary":"badge-danger","badge"]},[t._v(t._s(t.getUserSubscriptionStatus(t.user.hasActiveSubscription,t.user.lastActiveSubscription)))])]),a("hr"),a("p",{staticClass:"value"},[t._v(t._s(t._f("getDateOnly")(t.user.lastActiveSubscription.startDate)))]),a("hr"),a("p",{staticClass:"value"},[t._v(t._s(t._f("getDateOnly")(t.user.lastActiveSubscription.endDate)))]),a("hr"),a("p",{staticClass:"value"},[t._v(t._s(t.user.lastActiveSubscription.subscriptionPlan.name))])]):t._e()]):t._e()])])]),a("div",{staticClass:"col-4"},[a("div",{staticClass:"card profile-card"},[a("div",{staticClass:"card-header"},[t._v("\n                            Alert Settings\n                        ")]),null!=t.user?a("div",{staticClass:"card-body alert-settings-body"},[a("h6",[t._v("Alert Status")]),a("p",[t.user.alertStatus?a("span",{staticClass:"badge badge-success toggle-badge"},[t._v("ACTIVE")]):a("span",{staticClass:"badge badge-danger toggle-badge"},[t._v("DISABLED")])]),a("hr"),a("h6",[t._v("Selected Regions")]),t._l(t.user.alertRegions,(function(s,e){return[a("p",{key:e,staticClass:"value"},[t._v(t._s(e+1)+". "+t._s(s.name.en))])]})),a("hr"),a("h6",[t._v("Selected Categories")]),t._l(t.user.alertCategories,(function(s,e){return[a("p",{key:e,staticClass:"value"},[t._v(t._s(e+1)+". "+t._s(s.name.en))])]}))],2):t._e()])])])],1)],1)],1)},i=[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"row"},[a("div",{staticClass:"spinner-border",attrs:{role:"status"}},[a("span",{staticClass:"sr-only"},[t._v("Loading...")])]),a("div",{staticClass:"col-3"},[t._v("\n                        Loading...\n                    ")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"col-5"},[a("p",{staticClass:"title"},[t._v("First Name")]),a("hr"),a("p",{staticClass:"title"},[t._v("Last Name")]),a("hr"),a("p",{staticClass:"title"},[t._v("Email")]),a("hr"),a("p",{staticClass:"title"},[t._v("Mobile")]),a("hr"),a("p",{staticClass:"title"},[t._v("Roles")]),a("hr"),a("p",{staticClass:"title"},[t._v("Account Status")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"col-5"},[a("p",{staticClass:"title"},[t._v("Registered at")]),a("hr"),a("p",{staticClass:"title"},[t._v("Last activity")]),a("hr"),a("p",{staticClass:"title"},[t._v("Last activity at")]),a("hr"),a("p",{staticClass:"title"},[t._v("Last activity IP")]),a("hr"),a("p",{staticClass:"title"},[t._v("Last login at")]),a("hr"),a("p",{staticClass:"title"},[t._v("Last modified at")]),a("hr"),a("p",{staticClass:"title"},[t._v("Last modified by")]),a("hr"),a("p",{staticClass:"title"},[t._v("Created by")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"col-5"},[a("p",{staticClass:"title"},[t._v("Status")]),a("hr"),a("p",{staticClass:"title"},[t._v("Start Date")]),a("br"),a("hr"),a("p",{staticClass:"title"},[t._v("End Date")]),a("br"),a("hr"),a("p",{staticClass:"title"},[t._v("Plan")])])}],r=a("21e0"),l=a("c67e"),c=a("438f"),n=a("754f"),u=a("9f2e"),_=a("ede6"),o=a("37b6"),v=a("ecee"),d=a("c074");v["c"].add(d["d"]);var S={components:{sidenav:r["a"],errorNav:l["a"],usersNav:c["a"],nameNav:n["a"]},data:function(){return{USER_SUBSCRIPTION_ACTIVE:o["x"],USER_SUBSCRIPTION_PENDING:o["z"],USER_SUBSCRIPTION_EXPIRED:o["y"],USERS_PROFILE_ROUTE:u["z"]}},computed:{user:function(){return this.$store.getters.user.data},userIsLoading:function(){return this.$store.getters.user.isLoading}},methods:{changeUserActiveStatus:function(t){this.$store.dispatch(_["lb"],{_id:t})},getUser:function(){this.$store.dispatch(_["V"],{id:this.$route.params.id})},getUserSubscriptionStatus:function(t,s){return t?o["x"]:t||null!=s?t||null==s?void 0:o["y"]:o["z"]}},mounted:function(){this.getUser()}},p=S,C=a("2877"),E=Object(C["a"])(p,e,i,!1,null,null,null);s["default"]=E.exports},"438f":function(t,s,a){"use strict";var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"card users-nav"},[a("div",{staticClass:"card-body"},[a("div",{staticClass:"d-flex flex-wrap user-profile-btns"},[a("router-link",{class:[t.routeName==t.USERS_PROFILE_ROUTE?"active":null,"btn"],attrs:{to:{name:t.USERS_PROFILE_ROUTE}}},[t._v("Profile")]),a("router-link",{class:[[t.USERS_SUBSCRIPTIONS_ROUTE,t.USERS_ADD_SUBSCRIPTIONS_ROUTE,t.EDIT_USERS_SUBSCRIPTIONS_ROUTE].includes(t.routeName)?"active":null,"btn"],attrs:{to:{name:t.USERS_SUBSCRIPTIONS_ROUTE}}},[t._v("Subscriptions")]),a("router-link",{class:[t.routeName==t.USERS_BILLING_HISTORY_ROUTE?"active":null,"btn"],attrs:{to:{name:t.USERS_BILLING_HISTORY_ROUTE}}},[t._v("Billing History")]),a("router-link",{class:[t.routeName==t.USERS_ALERT_EMAILS_ROUTE?"active":null,"btn"],attrs:{to:{name:t.USERS_ALERT_EMAILS_ROUTE}}},[t._v("Alert Emails")]),a("router-link",{class:[t.routeName==t.USERS_BOOKMARKS_ROUTE?"active":null,"btn"],attrs:{to:{name:t.USERS_BOOKMARKS_ROUTE}}},[t._v("Bookmarks")]),a("router-link",{class:[t.routeName==t.USERS_ACTIVITIES_ROUTE?"active":null,"btn"],attrs:{to:{name:t.USERS_ACTIVITIES_ROUTE}}},[t._v("Activities")]),a("router-link",{class:[t.routeName==t.USERS_SETTINGS_ROUTE?"active":null,"btn"],attrs:{to:{name:t.USERS_SETTINGS_ROUTE}}},[t._v("Settings")])],1)])])},i=[],r=(a("7f7f"),a("9f2e")),l={data:function(){return{USERS_PROFILE_ROUTE:r["z"],USERS_SUBSCRIPTIONS_ROUTE:r["C"],USERS_BOOKMARKS_ROUTE:r["y"],USERS_ACTIVITIES_ROUTE:r["u"],USERS_BILLING_HISTORY_ROUTE:r["x"],USERS_ALERT_EMAILS_ROUTE:r["w"],USERS_ADD_SUBSCRIPTIONS_ROUTE:r["v"],USERS_SETTINGS_ROUTE:r["B"],EDIT_USERS_SUBSCRIPTIONS_ROUTE:r["l"]}},computed:{routeName:function(){return this.$route.name}}},c=l,n=a("2877"),u=Object(n["a"])(c,e,i,!1,null,null,null);s["a"]=u.exports},"754f":function(t,s,a){"use strict";var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"card title-card"},[a("div",{staticClass:"card-body"},[a("div",{staticClass:"row"},[a("h4",{staticClass:"col-6"},[t._v(t._s(t._f("capitalize")(t.fname))+" "+t._s(t._f("capitalize")(t.lname)))])])])])},i=[],r={props:{fname:String,lname:String}},l=r,c=a("2877"),n=Object(c["a"])(l,e,i,!1,null,null,null);s["a"]=n.exports}}]);
//# sourceMappingURL=chunk-646c46d1.7a78c4b8.js.map