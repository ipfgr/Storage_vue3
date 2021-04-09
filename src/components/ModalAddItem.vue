<template>

          <!-- Modal Structure -->
          <div id="modal1" ref="modal" class="modal bottom-sheet">
            <div class="modal-content">
              <h4>Add items to Storage</h4>
              <ItemInput />
            </div>
            <div class="modal-footer">
              <button class="modal-close waves-effect waves-green btn-flat">Exit</button>
            </div>
          </div>
</template>

<script>
    import ItemInput from "@/components/ItemInput"
    export default {
        name: "ModalAddItem",
        instance : "",
        components:{
          ItemInput,
        },
        mounted(){
                this.instance = window.M.AutoInit()
            },
    }
</script>

<style scoped>
    .modal{
        overflow-y: visible;
    }
</style>