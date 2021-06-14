<template>
  <v-app>
    <v-main>
      <Main/>
    </v-main>
  </v-app>
</template>

<script>
import Main from './components/Main';
  
export default {
  name: 'App',

  components: {
    Main,
  },

  data: () => ({
    //
  }),
};
</script>

<style lang="scss">
@import 'styles/_grid.scss';
@import 'styles/_typography.scss';

#app-wrapper {
  height: calc(var(--vh, 1vh) * 100 );
  @media screen and (max-width: 1100px) {
    overflow: hidden
  }    
}
</style>