<template>
    <div class="container">
        <div class="header">
            <h5>Dashboard</h5>
        </div>
        <Loader v-if="state == 1"/>
        <Logs :allItems="allItems" :eventsArr="eventsArr" v-if="state == 3 "/>
    </div>
</template>

<script>
    import Loader from "@/components/Loader.vue"
    import Logs from "@/components/Logs.vue"
    import ENUM from "@/enums"
    //Import firebase
    const firebase = require('../firebaseCfg.js')

    export default {
        name: "Dashboard.vue",
        data() {
            return {
                state: ENUM.LOADING,
                allItems: [],
                eventsArr: [],
            }
        },
        components: {
            Loader,
            Logs
        },

        async mounted() {
            //Get all events from DB
            await firebase.logCollection.orderBy("date").limit(3)
                .onSnapshot((querySnapshot) => {
                this.eventsArr = []
                querySnapshot.forEach(event => {
                    this.eventsArr.push(event.data())
                })
            })
            //Get all items from DB
            await firebase.productsCollection
                .onSnapshot((querySnapshot) => {
                    this.allItems = []
                    querySnapshot.forEach((doc) => {
                        this.allItems.push(doc.data())
                    });
                    //Set state to LOADED for remove loader and show content
                    this.state = ENUM.LOADED
                });
        }
    }
</script>

<style scoped>


</style>