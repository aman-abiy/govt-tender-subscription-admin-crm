<template>
    <div class="dashboard-body">
        <errorNav/>
        <div class="row">
            <sidenav class="col-2"/>
            <div class="col-10 content-section admin-dashboard-title">
                <div class="card title-card">
                    <div class="card-body">
                        <div class="row">
                            <h4 class="col-12">{{ user.fname | capitalize }} {{ user.lname | capitalize }}</h4>
                        </div>
                    </div>
                </div>
                <usersNav/>
                <div v-if="userIsLoading" class="alert loading-alert" role="alert">
                    <div class="row">
                        <div class="spinner-border" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                        <div class="col-3">
                            Loading...
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-5">
                        <div class="card profile-card">
                            <div class="card-header">
                                Alert Status
                            </div>
                            <div class="card-body">
                                <div class="switch-field">
                                    <input v-model="alertStatus" type="radio" class="active" id="radio-one" name="switch-one" :value="true" :checked="alertStatus == true"/>
                                    <label for="radio-one"><span v-if="userIsLoading && alertStatus == true" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span v-else>Active</span></label>
                                    <input v-model="alertStatus" type="radio" class="inactive" id="radio-two" name="switch-one" :value="false" :checked="alertStatus == false"/>
                                    <label for="radio-two"><span v-if="userIsLoading && alertStatus == false" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span v-else>Inactive</span></label>
                                </div>
                            </div>
                        </div>
                        <div class="card profile-card">
                            <div class="card-header">
                                Alert Regions
                            </div>
                            <div class="card-body">
                                <template v-for="(region, index) in regions">
                                    <div v-bind:key="index" class="region-checkbox custom-control custom-checkbox">
                                        <input v-model="alertRegions" :value="region._id" type="checkbox" class="custom-control-input" :id="`region${index+1}`" :checked="checkIfRegionIsAlert(region._id)">
                                        <label class="custom-control-label" :for="`region${index+1}`">{{ region.name.en }}</label>
                                    </div>
                                </template>
                                <br>
                                <button v-on:click="setAlertSettings(SETTING_TYPE_REGIONS)" class="btn save-settings-btn col-2 offset-10" :disabled="userIsLoading ? true : false">
                                    <span v-if="userIsLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    <span v-if="!userIsLoading">Save</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-7">
                        <div class="card profile-card">
                            <div class="card-header">
                                Alert Categories
                            </div>
                            <div class="card-body">
                                <div class="vue-root">
                                    <smart-tree id="tree" has-three-states selection-mode="checkBox">
                                        <template v-for="(category, index) in categories">
                                            <smart-tree-items-group v-if="category.isParent" v-bind:key="index" :expanded="checkIfCategoryIsAlert(category.children.map((e) => e._id))">
                                                <strong class="parent" v-on:click="selectCategory(category.children.map((e) => e._id), CATEGORY_SELECTION_MULTIPLE)">{{ category.name.en }}</strong>
                                                <template v-for="(subCategory, subIndex) in category.children">
                                                    <smart-tree-item v-bind:key="subIndex" v-on:click="selectCategory([subCategory._id], CATEGORY_SELECTION_SINGLE)"  :selected="checkIfCategoryIsAlert([subCategory._id])">{{ subCategory.name.en }}</smart-tree-item>
                                                </template>
                                            </smart-tree-items-group>
                                            <smart-tree-item v-if="!category.isParent" v-bind:key="index" v-on:click="selectCategory([category._id], CATEGORY_SELECTION_SINGLE)" :selected="checkIfCategoryIsAlert([category._id])">{{ category.name.en }}</smart-tree-item>
                                        </template>
                                    </smart-tree>
                                </div>
                                <br>
                                <button v-on:click="setAlertSettings(SETTING_TYPE_CATEGORIES)" class="btn save-settings-btn col-1 offset-11" :disabled="userIsLoading ? true : false">
                                    <span v-if="userIsLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    <span v-if="!userIsLoading">Save</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import sidenav from '../../components/Sidenav.vue'
import errorNav from '../../components/Error_Nav.vue'
import usersNav from '../../components/Users_Nav.vue'
import { GET_USER } from '../../store/action_types'
import { GET_CATEGORIES, GET_REGIONS, SET_USER_ALERT_SETTINGS } from '../../store/action_types'
import  { 
    SETTING_TYPE_STATUS, 
    SETTING_TYPE_REGIONS, 
    SETTING_TYPE_CATEGORIES, 
    CATEGORY_SELECTION_SINGLE, 
    CATEGORY_SELECTION_MULTIPLE, 
    ALERT_SETTING_SUCCESSFUL_MSG, 
    ALERT_SETTING_UNSUCCESSFUL_MSG, 
    TOAST_GLOBAL_CONFIG 
} from '../../utils/const'

import "smart-webcomponents/source/styles/smart.default.css";
import "smart-webcomponents/source/modules/smart.tree.js";

export default {
    components: {
        sidenav,
        errorNav,
        usersNav
    },
    data() {
        return {
            alertStatus: null,
            alertRegions: [],
            alertCategories: [],
            SETTING_TYPE_STATUS: SETTING_TYPE_STATUS,
            SETTING_TYPE_REGIONS: SETTING_TYPE_REGIONS,
            SETTING_TYPE_CATEGORIES: SETTING_TYPE_CATEGORIES,
            CATEGORY_SELECTION_SINGLE: CATEGORY_SELECTION_SINGLE,
            CATEGORY_SELECTION_MULTIPLE: CATEGORY_SELECTION_MULTIPLE
        }
    },
    watch: {
        alertStatus: {
            handler(val) {
                if(val != this.user.alertStatus) {
                    this.setAlertSettings(SETTING_TYPE_STATUS)
                }
            }
        },
        status: {
            handler(value) {
                if(value === true) {
                    this.$toast.success(ALERT_SETTING_SUCCESSFUL_MSG, { ...TOAST_GLOBAL_CONFIG })
                } else if (value === false) {
                    this.$toast.error(this.errorMessage || ALERT_SETTING_UNSUCCESSFUL_MSG, { ...TOAST_GLOBAL_CONFIG })
                }
            }
        }
    },
    computed: {
        user() {
            return this.$store.getters.user.data
        },
        userIsLoading() {
            return this.$store.getters.user.isLoading
        },
        categories() {
            return this.$store.getters.category.data
        },
        regions() {
            return this.$store.getters.region.data
        }
    },
    methods: {
        getCategories() {
            this.$store.dispatch(GET_CATEGORIES)
        },
        getRegions() {
            this.$store.dispatch(GET_REGIONS)
        },
        getUser() {
            this.$store.dispatch(GET_USER, { id: this.$route.params.id })
        },
        checkIfRegionIsAlert(region) {
            return this.user.alertRegions.includes(region)
        },
        checkIfCategoryIsAlert(categories) {
            return categories.some((category) => {
                return this.alertCategories.includes(category);
            });
        },
        setValues() {
            this.alertStatus = this.user.alertStatus
            this.alertRegions = this.user.alertRegions.map((e) => e._id)
            this.alertCategories = this.user.alertCategories.map((e) => e._id)
        },
        setAlertSettings(type) {
            var alertSetting = {
                _id: this.user._id
            }
            if(type === SETTING_TYPE_STATUS) {
                alertSetting.alertStatus = this.alertStatus
            } else if (type === SETTING_TYPE_REGIONS) {
                alertSetting.alertRegions = this.alertRegions
            } else if (type === SETTING_TYPE_CATEGORIES) {
                alertSetting.alertCategories = this.alertCategories
            }

            this.$store.dispatch(SET_USER_ALERT_SETTINGS, { alertSetting })
        },
        selectCategory(ids, type) {
            if(type === CATEGORY_SELECTION_MULTIPLE) {
                ids.forEach((id) => {
                    if(this.alertCategories.includes(id)) {
                        this.alertCategories.splice(this.alertCategories.indexOf(id), 1)
                    } else {
                        this.alertCategories.push(id)
                    }
                });
            } else if (type === CATEGORY_SELECTION_SINGLE) {
                if(this.alertCategories.includes(ids[0])) {
                    this.alertCategories.splice(this.alertCategories.indexOf(ids[0]), 1)
                } else {
                    this.alertCategories.push(ids[0])
                }
            }
        }
    },
    mounted() {
        this.getCategories()
        this.getRegions()
        this.getUser()
        this.setValues()
    }
}
</script>
<style scoped>
#tree {
    --smart-tree-default-height: 500px;
}
</style>