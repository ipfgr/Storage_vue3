
<template>
  <div class="container">
      <div class="main-page-title">
          <h3>{{ header }}</h3>
      </div>
        <ItemInput />
      <br/>
  </div>

</template>

<script>
import ItemInput from "@/components/ItemInput.vue";

export default {
  name: 'AppToStorage',
    data() {
        return {
            header: "Add items to storage",
        }
    },
  components: {
      ItemInput,
  },
    mounted() {

    },
    methods: {


    },
    computed: {
      message(){
         return  this.$store.getters.saveResultMessage
      }

    }
}
</script>

<style scoped>

.main-page-title{
    text-align: center;
}
</style>
