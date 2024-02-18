<template>
    <div v-if="errorMessage != null" class="nav-error-status-bar">
        <div class="row justify-content-end">
            <div class="col-11">
                <p class="text-center errorMsg">{{ errorMessage }}</p>
            </div>
            <div class="col-1">
                <i v-on:click="clearErrorMessage()" class="far fa-times"></i>
            </div>
        </div>
    </div>
</template>
<script>
import{ CLEAR_ERRORMSG } from '../store/action_types'
export default {
    watch: {
        errorMessage: {
            handler(val) {
                if(val != null) {
                    // window.setInterval(() => {
                    //     this.$store.dispatch(CLEAR_ERRORMSG)
                    // }, 10000)
                }
            }
            
        }
    },
    computed: {
        errorMessage() {
            return this.$store.getters.errorMsg
        },
    },
    methods: {
        clearErrorMessage() {
            this.$store.dispatch(CLEAR_ERRORMSG)
        }
    },
}
</script>