<template>
    <div class="dashboard-body">
        <errorNav/>
        <div class="row">
            <sidenav class="col-2"/>
            <div class="col-10 content-section admin-dashboard-title">
                <nameNav :fname="user.fname" :lname="user.lname"/>
                <usersNav/>
                <ValidationObserver v-slot="{ handleSubmit }">
                    <form v-on:submit.prevent="handleSubmit(addSubscription)">
                        <div class="card title-card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="d-flex flex-wrap control-nav-btns">
                                        <button type="submit" class="btn btn-primary save" :disabled="subscriptionIsLoading ? true : false">
                                            <span v-if="subscriptionIsLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            <span v-if="!subscriptionIsLoading">Save</span>
                                        </button>
                                        <button v-on:click="navigateBack" type="button" class="btn btn-outline-secondary">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="subscriptionIsLoading" class="alert loading-alert" role="alert">
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
                                        Subscription Plan
                                    </div>
                                    <div class="card-body">
                                        <ValidationProvider name="subscriptionPlan" rules="required" v-slot="{ errors }">
                                            <label for="subscriptionPlan">Plan</label>
                                            <div class="input-group mb-3">
                                                <select v-model="subscriptionPlan" class="custom-select" id="subscriptionPlan">
                                                    <template v-for="(plan, index) in subscriptionPlans">
                                                        <option v-bind:key="index" :value="plan._id">{{ plan.name }}</option>
                                                    </template>
                                                </select>
                                            </div>
                                            <small class="form-text text-muted">{{ errors[0] }}</small>
                                        </ValidationProvider>
                                        <ValidationProvider v-if="!hasActiveSubscription" name="startDate" rules="required" v-slot="{ errors }">
                                            <label for="startDate">Start Date</label>
                                            <div class="input-group mb-3">
                                                <input v-model="startDate" class="datePicker form-control" type="date" name="startDate" id="paymentDate">
                                            </div>
                                            <small class="form-text text-muted">{{ errors[0] }}</small>
                                        </ValidationProvider>
                                    </div>
                                </div>
                            </div>
                            <div class="col-8">
                                <div class="card profile-card">
                                    <div class="card-header">
                                        Payment
                                    </div>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-6">
                                                <ValidationProvider name="paymentMethod" rules="required" v-slot="{ errors }">
                                                    <label for="paymentMethod">Method</label>
                                                    <div class="input-group mb-3">
                                                        <select v-model="paymentMethod" class="custom-select" id="paymentMethod">
                                                            <template v-for="(method, index) in paymentMethods">
                                                                <option v-bind:key="index" :value="method._id">{{ method.name }}</option>
                                                            </template>
                                                        </select>
                                                    </div>
                                                    <small class="form-text text-muted">{{ errors[0] }}</small>
                                                </ValidationProvider>
                                                <ValidationProvider name="currency" rules="required" v-slot="{ errors }">
                                                    <label for="currency">Currency</label>
                                                    <div class="input-group mb-3">
                                                        <select v-model="currency" class="custom-select" id="currency">
                                                            <template v-for="(currency, index) in currencies">
                                                                <option v-bind:key="index" :value="currency._id">{{ currency.iso3 | uppercase }}</option>
                                                            </template>
                                                        </select>
                                                    </div>
                                                    <small class="form-text text-muted">{{ errors[0] }}</small>
                                                </ValidationProvider>
                                                <ValidationProvider name="bank" rules="required" v-slot="{ errors }">
                                                    <label for="bank">Bank</label>
                                                    <div class="input-group mb-3">
                                                        <select v-model="bank" class="custom-select" id="bank">
                                                            <template v-for="(bank, index) in banks">
                                                                <option v-bind:key="index" :value="bank._id">{{ bank.name }}</option>
                                                            </template>
                                                        </select>
                                                    </div>
                                                    <small class="form-text text-muted">{{ errors[0] }}</small>
                                                </ValidationProvider>
                                            </div>
                                            <div class="col-6">
                                                <ValidationProvider name="transactionId" rules="required" v-slot="{ errors }">
                                                    <label for="transactionId">Transaction Ref</label>
                                                    <div class="input-group mb-3">
                                                        <input v-model="transactionRef" type="text" class="form-control" id="transactionId" placeholder="0000000000">
                                                    </div>
                                                    <small class="form-text text-muted">{{ errors[0] }}</small>
                                                </ValidationProvider>
                                                <ValidationProvider name="status" rules="required" v-slot="{ errors }">
                                                    <label for="status">Status</label>
                                                    <div class="input-group mb-3">
                                                        <select v-model="isPaid" class="custom-select" id="status">
                                                            <option :value="true">Paid</option>
                                                            <option :value="false">Pending</option>
                                                        </select>
                                                    </div>
                                                    <small class="form-text text-muted">{{ errors[0] }}</small>
                                                </ValidationProvider>
                                                <ValidationProvider name="paymentDate" rules="required" v-slot="{ errors }">
                                                    <label for="paymentDate">Payment Date</label>
                                                    <div class="input-group mb-3">
                                                        <input v-model="paymentDate" class="datePicker form-control" type="date" name="paymentDate" id="paymentDate">
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
import usersNav from '../../components/Users_Nav.vue'
import nameNav from '../../components/Name_Nav.vue'
import { GET_SUBSCRIPTION_PLANS, GET_BANK_ACCOUNTS, GET_PAYMENT_METHODS, GET_CURRENCIES, ADD_SUBSCRIPTION, ADD_PENDING_SUBSCRIPTION } from '../../store/action_types'

import { extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'

export default {
    components: {
        sidenav,
        errorNav,
        usersNav,
        nameNav
    },
    data() {
        return {
            subscriptionPlan: null,
            startDate: null,
            paymentMethod: null,
            transactionRef: null,
            currency: null,
            bank: null,
            paymentDate: null,
            isPaid: null
        }
    },
    computed: {
        user() {
            return this.$store.getters.user.data
        },
        userIsLoading() {
            return this.$store.getters.user.isLoading
        },
        subscriptionIsLoading() {
            return this.$store.getters.subscription.isLoading
        },
        subscriptionPlans() {
            return this.$store.getters.subscriptionPlans.data
        },
        subscriptionPlansIsLoading() {
            return this.$store.getters.subscriptionPlans.isLoading
        },
        banks() {
            return this.$store.getters.bankAccounts.data
        },
        bankAccountIsLoading() {
            return this.$store.getters.bankAccounts.isLoading
        },
        paymentMethods() {
            return this.$store.getters.paymentMethods.data
        },
        paymentMethodIsLoading() {
            return this.$store.getters.paymentMethods.isLoading
        },
        currencies() {
            return this.$store.getters.currency.data
        },
        currenciesIsLoading() {
            return this.$store.getters.currency.isLoading
        },
        hasActiveSubscription() {
            return (this.user.hasActiveSubscription && this.user.pendingSubscription == null)
        }
    },
    methods: {
        navigateBack() {
            this.$router.go(-1)
        },
        getSubscriptionPlans() {
            this.$store.dispatch(GET_SUBSCRIPTION_PLANS)
        },
        getBankAccounts() {
            this.$store.dispatch(GET_BANK_ACCOUNTS)
        },
        getPaymentMethodsAccounts() {
            this.$store.dispatch(GET_PAYMENT_METHODS)
        },
        getCurrencies() {
            this.$store.dispatch(GET_CURRENCIES)
        },
        convertDateToEpoch(dateString) {
            if(dateString != null) {
                const d = dateString.split('-');
                return new Date(d[0], d[1] - 1, d[2]).valueOf();
            }
        },
        addSubscription() {
            let payload = {
                account: this.user._id,
                isPaid: this.isPaid,
                paymentMethod: this.paymentMethod,
                currency: this.currency,
                paymentDate: this.convertDateToEpoch(this.paymentDate),
                bank: this.bank,
                transactionRef: this.transactionRef,
                subscriptionPlan: this.subscriptionPlan,
                startDate: this.convertDateToEpoch(this.startDate)
            }
            console.log('payload', payload)
            if(!this.user.hasActiveSubscription && this.pendingSubscription == null) {
                // add subscription
                this.$store.dispatch(ADD_SUBSCRIPTION, payload)
            } else if(this.user.hasActiveSubscription && this.user.pendingSubscription == null) {
                // add pending subscription
                delete payload.startDate
                this.$store.dispatch(ADD_PENDING_SUBSCRIPTION, payload)
            }
        }
    },
    mounted() {
        this.getSubscriptionPlans()
        this.getBankAccounts()
        this.getPaymentMethodsAccounts()
        this.getCurrencies()
    }
}

extend('required', {
  ...required,
  message: 'This field is required'
});
</script>