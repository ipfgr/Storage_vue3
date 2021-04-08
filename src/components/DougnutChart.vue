<template>
    <vue3-chart-js
            :data="doughnutChart.data"
            :id="doughnutChart.id"
            :type="doughnutChart.type"
    ></vue3-chart-js>
</template>

<script>
    import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'

    export default {
        name: "DougnutChart",
        components: {
            Vue3ChartJs
        },
        props:{
            dataScope: Array,
        },

        data() {
            return {
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
                                data: this.dataScope
                            }
                        ]
                    }
                }
            }
        },
    }

</script>

<style scoped>

</style>