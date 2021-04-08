<!--Component for show loading bar-->
<template>
      <div class="progress">
          <div class="indeterminate"></div>
      </div>
</template>

<script>
    export default {
        name: "Loader.vue",
        data() {
            return {}

        },
        mounted() {
            window.M.AutoInit()
        }
    }
</script>

<style scoped>

</style>