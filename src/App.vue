<template>
  <v-app dark id="app" class="app">
    <v-container>
      <img src="./assets/logo.png" width="70px">
      <h1 class="app__header">Vue cli based frontend boilerplate</h1>
      <router-view/>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style src="./styles/_stylebase.scss" lang="scss"></style>
