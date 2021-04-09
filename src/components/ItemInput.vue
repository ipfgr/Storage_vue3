<template>
    <div class="input">
        <form class="col s12 ">
            <div :key="index" class="item centered" v-for="(line,index) in lines">
                <div class="row add-todo">
                    <div class="input-field col">
                        <div class="wrapper">
                        <select class="input-container" ref="select" v-model="line.data">
                            <option disabled selected v-if="!AllItems.length" value="">Not have any items in database
                            </option>
                            <option disabled selected v-else value="">Choose your option</option>
                            <option :key="item.idx" :value="{idx:item.idx, name:item.name, category:item.category}" v-for="item in AllItems" >{{ item.name }}</option>
                        </select>
                            </div>
                    </div>
                    <div class="input-field col">
                        <input class="input-container validate" id="stock" required type="number"
                               v-model="line.quantity">
                        <label for="stock">Quantity</label>
                    </div>
                </div>
            </div>
        </form>
        <!--        Buttons        -->
        <div class="buttons center-align">
            <a @click.prevent="addLine" class="btn-floating btn-medium waves-effect waves-light red"><i class="material-icons">add</i></a>
            <a @click.prevent="removeLine(index)" class="btn-floating btn-medium waves-effect waves-light red"><i
                    class="material-icons">remove</i></a>
        </div>
        <div class="buttons center-align">
            <button @click.prevent="addItemsToStorage" class="btn">Save to Storage</button>
            <div class="message"><h5>{{ message }}</h5></div>

        </div>
        <!--        Buttons       -->
    </div>
</template>

<script>
const firebase = require("../firebaseCfg")

export default {
        name: "TaskInput",
        data() {
            return {
                lines: [],
                AllItems: this.$store.getters.GetAllItemNamesList,
            }
        },
        methods: {
            async addLine() {
                await this.lines.push({})
                window.M.FormSelect.init(this.$refs.select,{})
            },
            removeLine(index) {
                this.lines.splice(index, 1)
            },
            //Add items to bucket
            addItemsToStorage() {
                let checker = true
                this.lines.forEach(product => {
                    if (!product.quantity || product.quantity < 0){
                        checker = false
                        return alert(`Please enter quantity for product: ${product.data.name}`)
                    }
                })
                if (checker){
                    this.$store.dispatch("addItemToStorage", this.lines)
                }
                this.lines = []
            },

        },
        beforeMount() {
            let AllItemNamesList = []
            async function allItems() {
                await firebase.itemNamesCollection
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            AllItemNamesList.push(doc.data());
                        });
                    })
            }
            allItems().then(() => this.$store.commit("AddItemNames", AllItemNamesList))
        },
        mounted() {
                window.M.FormSelect.init(this.$refs.select,{})
        },

        computed: {
            message(){
                return this.$store.getters.saveResultMessage
            }
        },
    }
</script>

<style scoped>
    .add-todo {
        justify-content: center;
        display: flex;
        flex-wrap: wrap;
    }

    .buttons {
        margin: 10px;
    }

    .buttons a {
        margin: 0px 10px 0px 10px;
    }

    .centered {
        display: flex;
        justify-content: center;
    }

    .input-field {
        min-width: 500px;
    }

    .message{
        padding: 15px;
    }
    @media (max-width: 600px){
        .input-field {
            min-width: 350px !important;
        }
    }
</style>