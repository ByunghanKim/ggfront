<template>
  <v-app>
    <Navbar/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import Navbar from "@/components/NavBar/Navbar";
export default {
  name: 'App',
  components: {Navbar},
};
</script>