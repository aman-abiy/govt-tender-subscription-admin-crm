<template>
    <div class="dashboard-body">
        <errorNav/>
        <div class="row">
            <sidenav class="col-2"/>
            <div class="col-10 content-section admin-dashboard-title">
                <ValidationObserver v-slot="{ handleSubmit }">
                    <form v-on:submit.prevent="handleSubmit(addSubscriptionPlan)">
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
                        <div v-if="subscriptionPlanIsLoading" class="alert loading-alert" role="alert">
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
                                        Plan
                                    </div>
                                    <div class="card-body">
                                        <ValidationProvider name="name" rules="required" v-slot="{ errors }">
                                            <label for="name">Name</label>
                                            <div class="input-group mb-3">
                                                <input v-model="name" type="text" class="form-control" id="name" placeholder="">
                                            </div>
                                            <small class="form-text text-muted">{{ errors[0] }}</small>
                                        </ValidationProvider>
                                        <ValidationProvider name="totalPrice" rules="required" v-slot="{ errors }">
                                            <label for="totalPrice">Total Price (ETB)</label>
                                            <div class="input-group mb-3">
                                                <input v-model="totalPrice" type="number" class="form-control" id="totalPrice" placeholder="0.00">
                                            </div>
                                            <small class="form-text text-muted">{{ errors[0] }}</small>
                                        </ValidationProvider>
                                        <ValidationProvider name="duration" rules="required" v-slot="{ errors }">
                                            <label for="duration">Duration (ms)</label>
                                            <div class="input-group mb-3">
                                                <input v-model="duration" type="number" class="form-control" id="duration" placeholder="000000000000">
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
import { ADD_SUBSCRIPTION_PLAN } from '../../store/action_types'

export default {
    components: {
        sidenav,
        errorNav
    },
    data() {
        return {
            name: null,
            totalPrice: null,
            duration: null
        }
    },
    computed: {
        subscriptionPlan() {
            return this.$store.getters.subscriptionPlan.data
        },
        subscriptionPlanIsLoading() {
            return this.$store.getters.subscriptionPlan.isLoading
        }
    },
    methods: {
        navigateBack() {
            this.$router.go(-1)
        },
        addSubscriptionPlan() {
            let payload = {
                name: this.name,
                totalPrice: this.totalPrice,
                duration: this.duration
            }
            this.$store.dispatch(ADD_SUBSCRIPTION_PLAN, payload)
        }
    },
    mounted() {}
}

extend('required', {
  ...required,
  message: 'This field is required'
});
</script>