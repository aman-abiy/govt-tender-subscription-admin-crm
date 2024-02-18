<template>
    <div>
        <div class="alert alert-info" role="alert">
            {{ message }}
        </div>
    </div>
</template>
<script>
export default {
    props: {
        message: String
    }
}
</script>