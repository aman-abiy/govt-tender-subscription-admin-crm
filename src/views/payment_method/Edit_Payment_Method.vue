<template>
    <div class="dashboard-body">
        <errorNav/>
        <div class="row">
            <sidenav class="col-2"/>
            <div class="col-10 content-section admin-dashboard-title">
                <ValidationObserver v-slot="{ handleSubmit }">
                    <form v-on:submit.prevent="handleSubmit(editPaymentMethod)">
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
                        <div v-if="paymentMethodIsLoading" class="alert loading-alert" role="alert">
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
                                        Payment Method
                                    </div>
                                    <div class="card-body">
                                        <ValidationProvider name="name" rules="required" v-slot="{ errors }">
                                            <label for="name">Method Name</label>
                                            <div class="input-group mb-3">
                                                <input v-model="name" type="text" class="form-control" id="name" placeholder="">
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
import { GET_PAYMENT_METHOD, EDIT_PAYMENT_METHOD } from '../../store/action_types'

export default {
    components: {
        sidenav,
        errorNav
    },
    data() {
        return {
            name: null
        }
    },
    watch: {
        paymentMethodIsLoading: {
            handler(val) {
                if(val == false) {
                    this.setValues()
                }
            }
        }
    },
    computed: {
        paymentMethod() {
            return this.$store.getters.paymentMethod.data
        },
        paymentMethodIsLoading() {
            return this.$store.getters.paymentMethod.isLoading
        }  
    },
    methods: {
        navigateBack() {
            this.$router.go(-1)
        },
        setValues() {
            this.name = this.paymentMethod.name
        },
        getPaymentMethod() {
            this.$store.dispatch(GET_PAYMENT_METHOD, { id: this.$route.params.id })
        },  
        editPaymentMethod() {
            let payload = {
                _id: this.$route.params.id,
                name: this.name
            }
            this.$store.dispatch(EDIT_PAYMENT_METHOD, payload)
        }
    },
    mounted() {
        this.getPaymentMethod()
        this.setValues()
    }
}

extend('required', {
  ...required,
  message: 'This field is required'
});
</script>