<template>
    <div class="dashboard-body">
        <errorNav/>
        <div class="row">
            <sidenav class="col-2"/>
            <div class="col-10 content-section admin-dashboard-title">
                <ValidationObserver v-slot="{ handleSubmit }">
                    <form v-on:submit.prevent="handleSubmit(addBankAccount)">
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
                        <div v-if="bankIsLoading" class="alert loading-alert" role="alert">
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
                                        Bank
                                    </div>
                                    <div class="card-body">
                                        <ValidationProvider name="name" rules="required" v-slot="{ errors }">
                                            <label for="name">Bank Name</label>
                                            <div class="input-group mb-3">
                                                <input v-model="name" type="text" class="form-control" id="name" placeholder="">
                                            </div>
                                            <small class="form-text text-muted">{{ errors[0] }}</small>
                                        </ValidationProvider>
                                        <ValidationProvider name="iso3" rules="required" v-slot="{ errors }">
                                            <label for="iso3">ISO3</label>
                                            <div class="input-group mb-3">
                                                <input v-model="iso3" type="text" class="form-control" id="iso3" placeholder="">
                                            </div>
                                            <small class="form-text text-muted">{{ errors[0] }}</small>
                                        </ValidationProvider>
                                    </div>
                                </div>
                            </div>
                            <div class="col-5">
                                <div class="card profile-card">
                                    <div class="card-header">
                                        Account
                                    </div>
                                    <div class="card-body">
                                        <ValidationProvider name="accountNumber" rules="required" v-slot="{ errors }">
                                            <label for="accountNumber">Account Number</label>
                                            <div class="input-group mb-3">
                                                <input v-model="accountNumber" type="number" class="form-control" id="accountNumber" placeholder="000000000000">
                                            </div>
                                            <small class="form-text text-muted">{{ errors[0] }}</small>
                                        </ValidationProvider>
                                        <ValidationProvider name="accountName" rules="required" v-slot="{ errors }">
                                            <label for="accountName">Account Holder Name</label>
                                            <div class="input-group mb-3">
                                                <input v-model="accountName" type="text" class="form-control" id="accountName" placeholder="">
                                            </div>
                                            <small class="form-text text-muted">{{ errors[0] }}</small>
                                        </ValidationProvider>
                                        <ValidationProvider name="swiftCode" rules="" v-slot="{ errors }">
                                            <label for="swiftCode">Swift Code</label>
                                            <div class="input-group mb-3">
                                                <input v-model="swiftCode" type="text" class="form-control" id="swiftCode" placeholder="">
                                            </div>
                                            <small class="form-text text-muted">{{ errors[0] }}</small>
                                        </ValidationProvider>
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
import { extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import { ADD_BANK_ACCOUNT } from '../../store/action_types'

export default {
    components: {
        sidenav,
        errorNav
    },
    data() {
        return {
            name: null,
            iso3: null,
            accountNumber: null,
            accountName: null,
            swiftCode: null
        }
    },
    computed: {
        bank() {
            return this.$store.getters.bankAccount.data
        },
        bankIsLoading() {
            return this.$store.getters.bankAccount.isLoading
        }
    },
    methods: {
        navigateBack() {
            this.$router.go(-1)
        },
        addBankAccount() {
            let payload = {
                name: this.name,
                iso3: this.iso3,
                accountNumber: this.accountNumber,
                accountName: this.accountName,
                swiftCode: this.swiftCode
            }
            this.$store.dispatch(ADD_BANK_ACCOUNT, payload)
        }
    },
    mounted() {}
}

extend('required', {
  ...required,
  message: 'This field is required'
});
</script>