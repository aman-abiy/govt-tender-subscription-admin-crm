<template>
    <div class="dashboard-body">
        <errorNav/>
        <div class="row">
            <sidenav class="col-2"/>
            <div class="col-10 content-section admin-dashboard-title">
                <nameNav :fname="user.fname" :lname="user.lname"/>
                <ValidationObserver v-slot="{ handleSubmit }">
                    <form v-on:submit.prevent="handleSubmit(editUser)">
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
                            <div class="col-4">
                                <div class="card profile-card">
                                    <div class="card-header">
                                        Account
                                    </div>
                                    <div class="card-body">
                                        <ValidationProvider name="fname" rules="required" v-slot="{ errors }">
                                            <label for="fname">First Name</label>
                                            <div class="input-group mb-3">
                                                <input v-model="fname" type="text" class="form-control" id="fname" placeholder="">
                                            </div>
                                            <small class="form-text text-muted">{{ errors[0] }}</small>
                                        </ValidationProvider>
                                        <ValidationProvider name="lname" rules="required" v-slot="{ errors }">
                                            <label for="lname">Last Name</label>
                                            <div class="input-group mb-3">
                                                <input v-model="lname" type="text" class="form-control" id="lname" placeholder="">
                                            </div>
                                            <small class="form-text text-muted">{{ errors[0] }}</small>
                                        </ValidationProvider>
                                    </div>
                                </div>
                                <div class="card profile-card">
                                    <div class="card-header">
                                        Roles
                                    </div>
                                    <div class="card-body">
                                        <ValidationProvider name="role" rules="required" v-slot="{ errors }">
                                            <template v-for="(role, index) in ROLES">
                                                <div v-bind:key="index" class="input-group">
                                                    <div class="role-checkbox custom-control custom-checkbox">
                                                        <input v-model="roles" :value="role" type="checkbox" class="custom-control-input" :id="`role${index+1}`" :checked="roles.includes(role)">
                                                        <label class="custom-control-label" :for="`role${index+1}`">{{ role | uppercase }}</label>
                                                    </div>
                                                </div>
                                            </template>
                                            <small class="form-text text-muted">{{ errors[0] }}</small>
                                        </ValidationProvider>
                                    </div>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="card profile-card">
                                    <div class="card-header">
                                        Auth
                                    </div>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-12">
                                                <ValidationProvider name="email" rules="required" v-slot="{ errors }">
                                                    <label for="email">Email</label>
                                                    <div class="input-group mb-3">
                                                        <input v-model="email" type="email" class="form-control" id="email" placeholder="">
                                                    </div>
                                                    <small class="form-text text-muted">{{ errors[0] }}</small>
                                                </ValidationProvider>
                                                <ValidationProvider name="mobile" rules="" v-slot="{ errors }">
                                                    <label for="mobile">Phone Number</label>
                                                    <MazPhoneNumberInput :default-phone-number="mobile.nationalNumber" class="auth-input" id="mobile" @update="mobile = $event" default-country-code="ET" :preferred-countries="['ET', 'US', 'GB']"/>
                                                    <small class="form-text text-muted">{{ errors[0] }}</small>
                                                </ValidationProvider>
                                                <br>
                                                <ValidationProvider name="password" rules="" v-slot="{ errors }">
                                                    <label for="password">Password <font-awesome-icon v-on:click="generatePassword()" icon="fa-solid fa-chart-simple" class="fa"/></label>
                                                    <div class="input-group mb-3">
                                                        <input ref="passwordInput" v-model="password" type="password" class="form-control" id="password" placeholder="******">
                                                        <div v-on:click="showPassword()" class="input-group-append show-password-toggle">
                                                            <span class="input-group-text">
                                                                <font-awesome-icon icon="fa-solid fa-eye"/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <small class="form-text text-muted">{{ errors[0] }}</small>
                                                </ValidationProvider>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </ValidationObserver>
            </div>
        </div>
    </div>
</template>
<script>
import sidenav from '../../components/Sidenav.vue'
import errorNav from '../../components/Error_Nav.vue'
import nameNav from '../../components/Name_Nav.vue'
import { MazPhoneNumberInput } from 'maz-ui'
import { extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import { GET_USER, EDIT_USER } from '../../store/action_types'
import { ROLES } from '../../utils/const'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faChartSimple, faEye } from '@fortawesome/free-solid-svg-icons'
library.add(faChartSimple, faEye)

export default {
    components: {
        sidenav,
        errorNav,
        nameNav,
        MazPhoneNumberInput
    },
    data() {
        return {
            ROLES: ROLES,
            fname: null,
            lname: null,
            email: null,
            mobile: {},
            password: null,
            roles: ['user'],
            phoneNumber: null
        }
    },
    watch: {
        userIsLoading: {
            handler(val) {
                if(val == false) {
                    this.setValues()
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
        }
    },
    methods: {
        navigateBack() {
            this.$router.go(-1)
        },
        generatePassword() {
            this.password = Math.floor(Math.random() * 1000000)
        },
        showPassword() {
            const passwordInput = this.$refs.passwordInput;
            if(passwordInput) {
                if (passwordInput.type === "password") {
                    passwordInput.type = "text";
                } else {
                    passwordInput.type = "password";
                }
            }
        },
        editUser() {
            let payload = {
                _id: this.user._id,
                fname: this.fname,
                lname: this.lname,
                email: this.email,
                mobile: this.mobile,
                ...(this.password != null ? { password: this.password } : {}),
                roles: this.roles,
            }

            this.$store.dispatch(EDIT_USER, payload)
        },
        setValues() {
            this.fname = this.user.fname
            this.lname = this.user.lname
            this.email = this.user.email
            this.mobile = this.user.mobile
            this.roles = this.user.roles,
            this.phoneNumber = this.user.mobile.nationalNumber
        },
        getUser() {
            this.$store.dispatch(GET_USER, { id: this.$route.params.id })
        }
    },
    mounted() {
        this.getUser()
        this.setValues()
    }
}

extend('required', {
  ...required,
  message: 'This field is required'
});
</script>