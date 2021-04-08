<template>
    <div>
        <div class="center-align" v-if="!existItems.length">
            <button @click="getAllItemsList" class="btn ">Show all existing items names</button>
        </div>
        <div class="existing-list z-depth-5">
            <div ref="output" v-if="existItems.length">
                <div :data-id="item.idx" :key="item.idx" class="existing-item" v-for="(item, index) in existItems">
                    <span><strong>{{index+1}}: {{item.idx}}</strong></span>
                    <span><strong>Name:</strong> {{item.name}}</span>
                    <span><strong>Category:</strong> {{item.category}}</span>
                    <div class="remove">
                        <button @click="removeItemNameFromList(item.idx)" class="btn ">Remove item</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    const firebase = require('../firebaseCfg.js');

    export default {
        name: "ExistItemsList.vue",

        data() {
            return {
                existItems: []
            }
        },
        methods: {
            //Get all item names from fireStore
            async getAllItemsList() {
                await firebase.itemNamesCollection
                    .onSnapshot((querySnapshot) => {
                        this.existItems = []
                        querySnapshot.forEach((doc) => {
                            this.existItems.push(doc.data());
                        });
                    });
            },
            //Delete item from fireStore
            removeItemNameFromList(itemFirebaseId) {
                if (confirm("Are you sure want delete item?")){
                     firebase.itemNamesCollection
                    .where("idx", "==", itemFirebaseId)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach(doc => {
                            doc.ref.delete();
                        });
                    })
                    .then(() => {
                        console.log("Document successfully deleted!");
                    })
                    .catch((error) => {
                        console.error("Error removing document: ", error);
                    });
                }
            },
        },
        computed: {
            //Get all item names from fireStore
        },
        mounted() {
            window.M.Modal.init(this.$refs.modal, {});
        }
    }
</script>

<style scoped>
    .existing-list {
        margin-bottom: 25px;
        padding: 5px;
    }

    .existing-item {
        padding: 5px;
        margin: 5px;
        display: flex;
        justify-content: space-between;
        border: 1px solid #26a69a;
        transition: all 0.3s;
    }
    .existing-item:hover{
        transform: scale(0.99);
    }
    .remove{
            min-width: fit-content;
    }
</style>