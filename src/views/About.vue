<template>
    <div class="container center-align">
        <h4>My Storage</h4>
        <h5>On: Vue3, VueRouter, Vuex, Firebase</h5>
        <h5>By IPFgr</h5>
        <br/>
        <router-link class="btn" to="/">Back home</router-link>
    </div>
</template>

<script>
    export default {
        name: "About.vue"
    }
</script>

<style scoped>
    .container {
        justify-content: center;
        align-items: center;
        border: 1px solid #cdd820;
        padding: 10px;
        margin-top: 10px;
        margin-bottom: 10px;
    }
</style>