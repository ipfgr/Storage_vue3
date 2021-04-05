<template>
    <div class="filter">
        <div class="input-field col s12">
            <select @change="filterChange" ref="select" v-model="selected">
                <option disabled selected value="">Choose your option</option>
                <option selected value="0">Show All</option>
                <option value="1">Finished items</option>
                <option value="2">Available items</option>
            </select>
            <label>Items Filter</label>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Filter',
        data(){
            return{
                selected: ""
            }
        },

        mounted() {
            window.M.FormSelect.init(this.$refs.select, {})
        },
        methods:{
            filterChange(event){
                this.$store.commit("setFilter", event)
            }
        }
    }
</script>

<style scoped>
    .filter {
        max-width: 300px;
        margin-left: 15px;
    }

</style>