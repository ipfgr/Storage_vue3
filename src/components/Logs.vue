<template>
    <div class="scope">
         <div class="info">
                <div  class="events">
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
                        <tr v-for="event in eventsArr" :key="event.id" s>
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
                   <DougnutChart :dataScope="dataScope"/>
                </div>
            </div>

        <div class="log">
                <div class="items-all">
                    <div class="finished">
                        <div class="header">
                            <h6>Finish soon</h6>
                             <ul v-if="finishSoonItems.length">
                                  <li class="product" v-for="product in finishSoonItems" :key="product.data.idx">
                                      <ItemCard :product="product" />
                                  </li>
                              </ul>
                            <div v-else class="message">
                                <i class="material-icons">mood</i>
                                    Not have any items that's finish soon
                            </div>
                        </div>
                    </div>
                    <div class="finished">
                        <div class="header">
                            <h6>Finished items</h6>
                            <ul v-if="finishedItems.length">
                                  <li class="product" v-for="product in finishedItems" :key="product.data.idx">
                                      <ItemCard :product="product" />
                                  </li>
                              </ul>
                            <div v-else class="message">
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
        props: {
          allItems: Array,
          eventsArr: Array
        },
        components: {
            DougnutChart,
            ItemCard,

        },

        computed: {
            dataScope(){
                return [this.finishedItems.length, this.allItems.length]
            },
            finishSoonItems(){
                 const finishSoon = []
                this.allItems.forEach(item => {
                    if(parseInt(item.quantity) < 10 && parseInt(item.quantity) >= 1 ){
                        finishSoon.push(item)
                    }
                })
                return finishSoon
            },

            finishedItems(){
                const finished = []
                this.allItems.forEach(item => {
                    if(parseInt(item.quantity) === 0){
                        finished.push(item)
                    }
                })
                return finished
            },

        },
        methods: {

        },


    }
</script>

<style scoped>
    .scope{
        animation:fadein 1s ease-in-out;
    }
   .header {
        text-align: center;
    }
    .events{
        background-color: white;
        margin-right: 15px;
        width: 80%;
        border-radius: 5px;
        border: 1px solid grey;
        padding: 15px;
        max-height: 300px;
        overflow: scroll;
    }

    .event{
        display:flex;
        justify-content: space-between;
        border: 1px solid #cdd820;
    }
    .event span{
        margin-left:15px;
    }
    .info {
        display: flex;
        margin-bottom: 25px;

    }

    .items-all {
        margin-right: 15px;

    }

    .scope-chart {
        background-color: white;
        width: 20%;
        border-radius: 5px;
        border: 1px solid grey;
    }

    .finished {
        margin: 15px 0px;
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

    .message{
        justify-content: flex-start;
    display: flex;
    margin-left: 15px;
    }
</style>