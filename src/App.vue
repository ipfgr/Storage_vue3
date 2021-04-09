
<template>
 <Navbar />

  <router-view/>

<ModalAddItem/>
<Footer />
</template>

<script>
import Navbar from "@/components/Navbar.vue"
import Footer from "@/components/Footer.vue"
import ModalAddItem from "@/components/ModalAddItem";

export default {
  name: 'App',
  components: {
   ModalAddItem,
   Navbar,
   Footer,
  },
  mounted(){

  }

}
</script>

<style>
@import "~materialize-css/dist/css/materialize.css";
*{
 margin:0;
 padding:0;
 box-sizing:border-box;
}
body{
 background-color: ghostwhite;
}
.main-page-title{
    text-align: center;
}


  @keyframes fadein{
  0% {opacity: 0}
  50%  {opacity: 0.5}
  100%   {opacity:1}
    }
</style>
