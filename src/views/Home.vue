<template>
  <div class="container">
      <div class="main-page-title">
          <h3>{{ header }}</h3>
      </div>
      <Filter/>
      <Loader v-if="state == 1"/>
      <ul v-if="filteredProducts.length && state==3">
          <li class="product" v-for="product in filteredProducts" :key="product.data.idx">
              <ItemCard :product="product" />
          </li>
      </ul>
      <div v-if="!filteredProducts.length && state==3" class="message"><h4>Dont have products in list</h4></div>
  </div>
</template>

<script>
import ItemCard from "@/components/ItemCard.vue";
import Filter from "@/components/Filter.vue"
import Loader from "@/components/Loader.vue"
import ENUM from "@/enums"
const firebase = require("../firebaseCfg")

export default {
  name: 'App',
  components: {
      ItemCard,
      Filter,
      Loader,
  },
    data() {
        return {
            header: "Storage items list",
            products: [],
            filtered:[],
            state: ENUM.LOADING
    }
  },
    created() {
        //Real time listener of all products in storage to show on page
        firebase.productsCollection
            .onSnapshot((querySnapshot) => {
                this.products = []
                querySnapshot.forEach((doc) => {
                    this.products.push(doc.data())
                });
                //Set state to LOADED for remove loader and show content
                this.state = ENUM.LOADED
            });
    },
    methods:{},
    computed:{
        productsList(){
            return this.products
        },
        //Filter for products
        filteredProducts(){
            return this.productsList.filter(product => {
                if (this.$store.getters.GetFilterState == 1){
                    return product.quantity  === 0
                }
                if (this.$store.getters.GetFilterState == 2){
                    return product.quantity  > 0
                }
                else {
                    return true
                }
            })
        }
    }
}
</script>

<style scoped>
    .main-page-title{
        text-align: center;
    }
    .product{
        animation:fadein 0.5s ease-in-out;
    }
</style>
