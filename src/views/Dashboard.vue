<template>
    <div class="container">
        <div class="header">
            <h5>Dashboard</h5>
        </div>
        <Loader v-if="state == 1"/>
        <Logs v-if="state == 3 "/>
    </div>
</template>

<script>
    import Loader from "@/components/Loader.vue"
    import Logs from "@/components/Logs.vue"

    export default {
        name: "Dashboard.vue",
        components: {
            Loader,
            Logs
        },
        methods:{},
        computed:{
            state(){
                return this.$store.getters.GetApiState
            }
        },
        mounted() {
            //Get all items from DB
            this.$store.dispatch("getAndSetAllItems")
            //Get all events from DB
            this.$store.dispatch("getAllEvents")
        }
    }
</script>

<style scoped>


</style>