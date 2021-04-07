<template>
    <div class="container">
        <div class="header">
            <h5>Dashboard</h5>
        </div>

        <div class="log">


            <div class="items-all">
                <div class="finished">
                    <div class="header">
                        <h6>Finish soon</h6>
                         <ul v-if="finisSoonItems.length">
                              <li class="product" v-for="product in finisSoonItems" :key="product.data.idx">
                                  <ItemCard :product="product" />
                              </li>
                          </ul>
                        <div v-else class="message">
                            <i class="material-icons">mood</i>
                                Not have any items that's finish soon
                        </div>
                    </div>
                </div>
                <div class="pre-finish">
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
        <div class="info">
            <div  class="events">
                <div class="header">
                <h5>Log</h5>
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
                        <td><span>Label</span></td>
                    </tr>
                    </tbody>
                </table>

            </div>

            <div class="scope-chart">
                <div class="header">
                        <h6>Statistic</h6>
                    </div>
                <vue3-chart-js
                        :data="doughnutChart.data"
                        :id="doughnutChart.id"
                        :type="doughnutChart.type"
                ></vue3-chart-js>
            </div>
        </div>
    </div>
</template>

<script>

    import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'
    import ItemCard from "@/components/ItemCard.vue"
    const firebase = require('../firebaseCfg.js');

    export default {
        name: "Dashboard.vue",
        components: {
            Vue3ChartJs,
            ItemCard
          },

        data(){
            return{
                finisSoonItems: [],
                finishedItems:[],
                eventsArr: [],
                doughnutChart: {
                  id: 'doughnut',
                  type: 'doughnut',
                  data: {
                    labels: ['Finished items', 'Existing items'],
                    datasets: [
                      {
                        backgroundColor: [
                          '#E46651',
                            '#41B883',
                        ],
                        data: [40, 60]
                      }
                    ]
                  }
                }
            }
        },
        created(){
          firebase.productsCollection
            .onSnapshot((querySnapshot) => {
                this.finisSoonItems = []
                querySnapshot.forEach((doc) => {
                    if(parseInt(doc.data().quantity) < 10 && parseInt(doc.data().quantity) >1 ){
                        this.finisSoonItems.push(doc.data())
                    }
                    if(parseInt(doc.data().quantity) === 0){
                        this.finishedItems.push(doc.data())
                    }
                });
            });
        },
        mounted(){
            firebase.logCollection.onSnapshot((querySnapshot) => {
                querySnapshot.forEach(event => {
                    this.eventsArr.push(event.data())
                })
            })
        }

    }
</script>

<style scoped>

    .header {
        text-align: center;
    }
    .events{
        background-color: white;
        margin-right: 15px;
        width: 80%;
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
        background-color: white;
        margin-right: 15px;
    }

    .scope-chart {
        background-color: white;
        width: 20%;
    }

    .finished {

    }

    .pre-finish {

    }

    .log {
        margin: 15px 0px;
        background-color: white;
        max-height: 200px;
        overflow: scroll;
    }

    .message{
        justify-content: flex-start;
    display: flex;
    margin-left: 15px;
    }


</style>