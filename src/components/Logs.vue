<template>
    <div class="scope">
        <div class="info">
            <div class="events">
                <div class="header">
                    <h5>Events</h5>
                </div>
                <table>
                    <tr>
                        <td>ID</td>
                        <td>Description</td>
                        <td>Date</td>
                    </tr>
                    <tbody>
                    <tr :key="event.id" s v-for="event in events">
                        <td><span>ID: {{event.id}}</span></td>
                        <td><span>{{event.event}}</span></td>
                        <td><span>{{event.date}}</span></td>
                    </tr>
                    </tbody>
                </table>

            </div>

            <div class="scope-chart">
                <div class="header">
                    <h6>Statistic</h6>
                </div>
                <DougnutChart />
            </div>
        </div>

        <div class="log">
            <div class="items-all">
                <div class="finished">
                    <div class="header">
                        <h6>Finish soon</h6>
                        <ul v-if="finishSoonItems.length">
                            <li :key="product.data.idx" class="product" v-for="product in finishSoonItems">
                                <ItemCard :product="product"/>
                            </li>
                        </ul>
                        <div class="message" v-else>
                            <i class="material-icons">mood</i>
                            Not have any items that's finish soon
                        </div>
                    </div>
                </div>
                <div class="finished">
                    <div class="header">
                        <h6>Finished items</h6>
                        <ul v-if="finishedItems.length">
                            <li :key="product.data.idx" class="product" v-for="product in finishedItems">
                                <ItemCard :product="product"/>
                            </li>
                        </ul>
                        <div class="message" v-else>
                            <i class="material-icons">mood</i>
                            Not have any finished items
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ItemCard from "@/components/ItemCard.vue"
    import DougnutChart from "./DougnutChart";


    export default {
        name: "Logs.vue",
          data(){
            return{
            }
        },
        components: {
            DougnutChart,
            ItemCard,

        },

        computed: {
            events(){
              return this.$store.getters.GetAllEvents
            },
            finishSoonItems() {
                return this.$store.getters.GetFinishSoonItems
            },

            finishedItems() {
              return this.$store.getters.GetFinishedItems
            },

        },
        methods: {},



    }
</script>

<style scoped>
    .scope {
        animation: fadein 1s ease-in-out;
    }

    .header {
        text-align: center;
    }

    .events {
        background-color: white;
        margin-right: 15px;
        width: 70%;
        border-radius: 5px;
        border: 1px solid grey;
        padding: 15px;
        max-height: 300px;
        overflow: scroll;
    }

    .event {
        display: flex;
        justify-content: space-between;
        border: 1px solid #cdd820;
    }

    .event span {
        margin-left: 15px;
    }

    .info {
        display: flex;
        margin-bottom: 25px;
        flex-direction: row;
    }

    .items-all {
        margin-right: 15px;

    }

    .scope-chart {
        background-color: white;
        width: 30%;
        border-radius: 5px;
        border: 1px solid grey;
    }

    .finished {
        margin-bottom: 15px;
        padding: 5px;
        background-color: white;
    }


    .log {
        margin: 15px 0px;
        max-height: 500px;
        overflow: scroll;
        border-radius: 5px;
        border: 1px solid grey;

    }

    .message {
        justify-content: flex-start;
        display: flex;
        margin-left: 15px;
    }

    @media (max-width: 1500px) {
        .info {
            display: flex;
            margin-bottom: 25px;
            flex-direction: column;
        }

        .events {
            width: 100%;
            margin-bottom: 25px;
        }

        .scope-chart {
            width: 100%;
            justify-content: center;
            height: auto;
        }
    }
</style>