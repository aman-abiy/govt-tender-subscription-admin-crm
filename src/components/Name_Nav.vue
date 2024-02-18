<template>
    <div class="card title-card">
        <div class="card-body">
            <div class="row">
                <h4 class="col-6">{{ fname | capitalize }} {{ lname | capitalize }}</h4>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        fname: String,
        lname: String
    }
}
</script>