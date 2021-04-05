
<template>
  <div class="container">
      <div class="main-page-title">
          <h3>{{ header }}</h3>
      </div>
      <div class="new-item">
          <AddItemName />
      </div>
      <div class="existing">
          <ExistItemsList/>
      </div>
  </div>

</template>

<script>
import AddItemName from "@/components/AddItemName.vue";
import ExistItemsList from "@/components/ExistItemsList.vue";


export default {
  name: 'AddItem',
  components: {
      AddItemName,
      ExistItemsList,
  },
    data() {
        return {
            header: "Add new item names to storage",
    }
  },
    mounted() {
    },
    methods: {
    },
    computed: {

    }
}
</script>

<style scoped>
.main-page-title{
    text-align: center;
}
</style>
