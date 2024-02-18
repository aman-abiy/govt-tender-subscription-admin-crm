<template>
    <div class="dashboard-body">
        <errorNav/>
        <div class="row">
            <sidenav class="col-2"/>
            <div class="col-10 content-section admin-dashboard-title">
                <div class="card title-card">
                    <div class="card-body">
                        <div class="row">
                            <div class="d-flex flex-wrap control-nav-btns">
                                <button type="submit" class="btn btn-primary save">Save</button>
                                <button v-on:click="navigateBack" type="button" class="btn btn-outline-secondary">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="tendersIsLoading" class="alert loading-alert" role="alert">
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
                    <div class="col-7">
                        <div class="card profile-card">
                            <div class="card-header">
                                Content
                            </div>
                            <div class="card-body">
                                <ValidationProvider name="name" rules="required" v-slot="{ errors }">
                                    <label for="title">Title</label>
                                    <div class="input-group mb-3">
                                        <textarea v-model="title" class="form-control" id="title" rows="3"></textarea>
                                    </div>
                                    <small class="form-text text-muted">{{ errors[0] }}</small>
                                </ValidationProvider>
                                <ValidationProvider name="totalPrice" rules="required" v-slot="{ errors }">
                                    <label for="totalPrice">Body</label>
                                    <div class="input-group mb-3">
                                        <ejs-richtexteditor ref="rteObj" :height="600" :iframeSettings="iframeData">
                                                {{ tender.description }}
                                        </ejs-richtexteditor>
                                    </div>
                                    <small class="form-text text-muted">{{ errors[0] }}</small>
                                </ValidationProvider>
                                <br>
                                <div class="row">
                                    <div class="col">
                                        <label for="title">Status</label>
                                         <td><span v-if="tenderIsLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span v-else v-on:click="changeTenderActiveStatus(tender._id)" :class="[tender.isActive ? 'badge-success' : 'badge-secondary', 'badge']">{{ tender.isActive ? 'ACTIVE' :  'DISABLED' }}</span></td>
                                    </div>
                                    <div class="col">
                                        <label for="title">Featured</label>
                                         <td><span v-if="tenderIsLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span v-else v-on:click="changeTenderActiveStatus(tender._id)" :class="[tender.isFeatured ? 'badge-success' : 'badge-secondary', 'badge']">{{ tender.isFeatured ? 'YES' :  'NO' }}</span></td>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-5">
                        <div class="card profile-card">
                            <div class="card-header">
                                Classification
                            </div>
                            <div class="card-body">
                                <label for="categories">Category</label>
                                <div class="vue-root">
                                    <smart-tree id="tree" has-three-states selection-mode="checkBox" class="categories">
                                        <template v-for="(category, index) in categoryList">
                                            <smart-tree-items-group v-if="category.isParent" v-bind:key="index" :expanded="checkIfCategoryIsSelected(category.children.map((e) => e._id))">
                                                <strong class="parent" v-on:click="selectCategory(category.children.map((e) => e._id), CATEGORY_SELECTION_MULTIPLE)">{{ category.name.en }}</strong>
                                                <template v-for="(subCategory, subIndex) in category.children">
                                                    <smart-tree-item v-bind:key="subIndex" v-on:click="selectCategory([subCategory._id], CATEGORY_SELECTION_SINGLE)"  :selected="checkIfCategoryIsSelected([subCategory._id])">{{ subCategory.name.en }}</smart-tree-item>
                                                </template>
                                            </smart-tree-items-group>
                                            <smart-tree-item v-if="!category.isParent" v-bind:key="index" v-on:click="selectCategory([category._id], CATEGORY_SELECTION_SINGLE)" :selected="checkIfCategoryIsSelected([category._id])">{{ category.name.en }}</smart-tree-item>
                                        </template>
                                    </smart-tree>
                                </div>
                                <br>
                                <hr>
                                <br>
                                <label for="regions">Regions</label>
                                <template v-for="(region, index) in regions">
                                    <div v-bind:key="index" class="region-checkbox custom-control custom-checkbox regions">
                                        <input v-model="tenderRegions" :value="region._id" type="checkbox" class="custom-control-input" :id="`region${index+1}`" :checked="true">
                                        <label class="custom-control-label" :for="`region${index+1}`">{{ region.name.en }} | {{ checkIfRegionIsSelected(region._id) }}</label>
                                    </div>
                                </template>
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
import { GET_TENDER, GET_REGIONS, GET_CATEGORIES, TOGGLE_TENDER_PUBLISHED_STATUS, TOGGLE_TENDER_ACTIVE_STATUS, CLEAR_TENDER } from '../../store/action_types'
import { EDIT_TENDERS_ROUTE } from '../../utils/routes'
import { CATEGORY_SELECTION_SINGLE, CATEGORY_SELECTION_MULTIPLE } from '../../utils/const'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye } from '@fortawesome/free-solid-svg-icons'
library.add(faEye)

import { Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar } from "@syncfusion/ej2-vue-richtexteditor";

import "smart-webcomponents/source/styles/smart.default.css";
import "smart-webcomponents/source/modules/smart.tree.js";

export default {
    components: {
        sidenav,
        errorNav
    },
    provide: {
        richtexteditor:[Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar]
    },    
    data() {
        return {
            EDIT_TENDERS_ROUTE: EDIT_TENDERS_ROUTE,
            iframeData: {
                enable: true
            },
            title: null,
            description: null,
            tenderCategories: [],
            tenderRegions: []
        }
    },
    watch: {
        tenderIsLoading: {
            handler(val) {
                if(val == false) {
                    this.setValues()
                }
            }
        }
    },
    computed: {
        tender() {
            return this.$store.getters.tender.data
        },
        tenderIsLoading() {
            return this.$store.getters.tender.isLoading
        },
        categoryList() {
            return this.$store.getters.category.data
        },
        regions() {
            return this.$store.getters.region.data
        }
    },
    methods: {
        navigateBack() {
            this.$router.go(-1)
        },
        changeTenderActiveStatus(id) {
            this.$store.dispatch(TOGGLE_TENDER_PUBLISHED_STATUS, { _id: id })
        },
        changeTenderFeaturedStatus(id) {
            this.$store.dispatch(TOGGLE_TENDER_ACTIVE_STATUS, { _id: id })
        }, 
        setValues() {
            this.title = this.tender.title
            this.description = this.tender.description
            this.tenderCategories = this.tender.categories
        },
        checkIfRegionIsSelected(region) {
            return this.tender.region._id == region
        },
        checkIfCategoryIsSelected(categories) {
            return categories.some((category) => {
                return this.tenderCategories.map((e) => e._id).includes(category);
            });
        },
        selectCategory(ids, type) {
            if(type === CATEGORY_SELECTION_MULTIPLE) {
                ids.forEach((id) => {
                    if(this.tenderCategories.includes(id)) {
                        this.tenderCategories.splice(this.tenderCategories.indexOf(id), 1)
                    } else {
                        this.tenderCategories.push(id)
                    }
                });
            } else if (type === CATEGORY_SELECTION_SINGLE) {
                if(this.tenderCategories.includes(ids[0])) {
                    this.tenderCategories.splice(this.tenderCategories.indexOf(ids[0]), 1)
                } else {
                    this.tenderCategories.push(ids[0])
                }
            }
        },
        getRegions() {
            this.$store.dispatch(GET_REGIONS)
        },
        getCategories() {
            this.$store.dispatch(GET_CATEGORIES)
        },
        getTender() {
            this.$store.dispatch(GET_TENDER, { id: this.$route.params.id })
        },
        clearTender() {
            this.$store.dispatch(CLEAR_TENDER)
        }
    },
    mounted() {
        this.getTender()
        this.getCategories()
        this.getRegions()
        this.setValues()
    },
    beforeDestroy() {
        this.clearTender()
    }
}
</script>
<style scoped>
#tree {
    --smart-tree-default-height: 79vh;
}

@import "../../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-lists/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-vue-richtexteditor/styles/material.css";
</style>