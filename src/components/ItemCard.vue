<template>
    <div class="card-container">

        <div class="item-description">
                <div><strong>Name: </strong> {{ product.data.name}}</div>
                <div><strong>Storage Quantity: </strong> {{ product.quantity}}</div>
                <div><strong>Category: </strong> {{ product.data.category}}</div>

        </div>

        <div class="take-items">
            <div class="input-field col s3 left-align">
                <input ref="takequantity" placeholder="Take items" type="number" data-length="4">
            </div>
            <div class="buttons">
                <button @click=onTake class="btn">Take from storage</button>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        props: {
            product: {
                required: true,
                type: Object,
            }
        },

        methods: {
            onTake() {
                if ( this.product.quantity < this.$refs.takequantity.value){
                    alert("Cant take quantity more then exist at storage")
                    return 0
                }
                if( this.$refs.takequantity.value < 0){
                    alert("Please input positive number of items for take")
                    return 0
                }
                else {
                    let payload  = {
                        data:{
                            idx: this.product.data.idx,
                            name: this.product.data.name,
                            category: this.product.data.category,
                        },
                        quantity: parseInt(this.product.quantity) - parseInt(this.$refs.takequantity.value)
                    }
                    this.$refs.takequantity.value = ""
                    this.$store.commit("takeItemsFromStorage", payload)
                }
                //
            },
            onAdd() {

            }
        }
    }
</script>

<style scoped>

    .card-container {
        display: flex;
        margin: 10px;
        justify-content: center;
        align-items: center;
        justify-content: space-between;
        border: 1px solid #cdd820;
        padding: 0px 10px 0px 10px;
    }

    .btn {
        margin: 0px 5px 0px 5px;
    }

    .item-description {
        display: flex;
        flex-direction: column;
        margin-left: 5px;
        justify-content:space-between;
    }

    .done {
        text-decoration: line-through;
        color: red;
    }
    .buttons{
        margin: 5px 0px;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
    }
    .take-items{
        display: inline-flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        align-items: center;

    }
</style>