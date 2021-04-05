<template>
    <footer class="page-footer blue-grey darken-4 center-align">
        <div class="container center-align">
            © 2021 Copyright ipfgr
        </div>
        <div class="about"><router-link to="/about">About</router-link></div>
    </footer>

</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped>
    .about a{

        color: white !important;
    }
</style>