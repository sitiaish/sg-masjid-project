<template>
  <div>
    <SectionLanding />
    <Section2Names/>  
    <SectionMapSg />
    <!-- <SectionMosques /> -->


<!-- 
    <SectionSaf />
    <SectionMap /> -->

    <div class="landing-mosque ml-16">
      <img src="@/assets/assyakirin-wire.svg" height="450px" />
      <p class="text--caption">
        Assyakirin, Taman Jurong
      </p>
    </div> 
    
    <div class="landing-mosque ml-16">
      <img src="@/assets/ghufran-pink.png" height="450px" />
      <p class="text--caption">
        Assyakirin, Taman Jurong
      </p>
    </div>       
  </div>
</template>

<script>
import SectionLanding from '@/components/views/SectionLanding'
import Section2Names from '@/components/views/Section2Names'
// import SectionMosques from '@/components/views/SectionMosques'
import SectionMapSg from '@/components/views/SectionMapSg'

// import SectionSaf from '@/components/views/SectionSaf';
// import SectionMap from '@/components/views/SectionMap';

export default {
  name: 'Main',
  components: {
    SectionLanding,    
    Section2Names,
    // SectionMosques,
    SectionMapSg    
    // SectionSaf,
    // SectionMap,
  },
  data: () => ({
    ecosystem: [
      {
        text: 'vuetify-loader',
        href: 'https://github.com/vuetifyjs/vuetify-loader',
      },
      {
        text: 'github',
        href: 'https://github.com/vuetifyjs/vuetify',
      },
      {
        text: 'awesome-vuetify',
        href: 'https://github.com/vuetifyjs/awesome-vuetify',
      },
    ],
    importantLinks: [
      {
        text: 'Documentation',
        href: 'https://vuetifyjs.com',
      },
      {
        text: 'Chat',
        href: 'https://community.vuetifyjs.com',
      },
      {
        text: 'Made with Vuetify',
        href: 'https://madewithvuejs.com/vuetify',
      },
      {
        text: 'Twitter',
        href: 'https://twitter.com/vuetifyjs',
      },
      {
        text: 'Articles',
        href: 'https://medium.com/vuetify',
      },
    ],
    whatsNext: [
      {
        text: 'Explore components',
        href: 'https://vuetifyjs.com/components/api-explorer',
      },
      {
        text: 'Select a layout',
        href: 'https://vuetifyjs.com/getting-started/pre-made-layouts',
      },
      {
        text: 'Frequently Asked Questions',
        href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions',
      },
    ],
  }),
}
</script>

<style scoped lang="scss">
  .landing-mosque {
    position: relative;

    p {
      position: absolute;
      bottom: 0;
      left: 0;
      writing-mode: vertical-rl;
      text-orientation: mixed;
      display: inline;
    }
  }
</style>