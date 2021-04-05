<template>
    <div class="input centered">
        <div class="row">
            <form class="col s12 ">
                <div class="row add-item">
                    <div class="input-field col s6">
                        <i class="material-icons prefix">mode_edit</i>
                        <input class="validate" id="item-name" required type="text" v-model="itemName">
                        <label for="item-name">Item Name</label>

                    </div>
                    <div class="input-field col s6">
                        <select ref="select" v-model="category">
                            <option disabled selected value="">Choose category</option>
                            <option :key="index" v-bind:value="category" v-for="(category, index) in categories">{{
                                category }}
                            </option>

                        </select>
                        <label>Category</label>
                    </div>
                    <div class="buttons">
                        <button @click.prevent="addNewItem" class="btn">Add</button>
                    </div>

                </div>
            </form>
            <div class="message">{{ message }}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TaskInput",
        data() {
            return {
                itemName: "",
                category: "",
                message: "",
                categories: this.$store.getters.GetAllCategories
            }
        },
        methods: {
            //Add new item to items list
            addNewItem() {
                let uniqueId = (Math.random() * 1000).toFixed(0)
                if (this.category == "") this.category = "Other"
                if (this.itemName) {
                    this.$store.commit('addItemNameToList', {
                        idx: "ID" + uniqueId,
                        name: this.itemName,
                        category: this.category
                    });
                    console.log("We are update", this.itemName, this.category)
                    this.itemName = ""
                    this.message = "Item added successful"
                    setTimeout(() => this.message = "", 2000)
                } else alert("Add correct item name")
            },
        },
        mounted() {
            window.M.updateTextFields(),
                window.M.FormSelect.init(this.$refs.select, {})
        }

    }
</script>

<style scoped>
    .add-item {
        justify-content: center;
        display: inline-flex;
    }

    .centered {
        display: flex;
        justify-content: center;
    }

</style>