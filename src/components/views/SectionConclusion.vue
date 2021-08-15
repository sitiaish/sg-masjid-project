<template>
  <section class="section-conclusion"> 
    <v-container class="pa-md-0 inner section-conclusion-block">
      <div class="text-center mb-8">
        <img src="@/assets/title.svg" width="60px" class="scroll-embellish" />      
        <p class="text--h4 scroll-prompt font-weight-bold">The mosques live on</p> 
        <p class="text--body-4 mb-0 font-italic">
          The mosque is kept alive by the adhan; five times every day.
        </p>                    
      </div>      

      <p class="text--body-2">
        The mosque is a place of worship for Muslims in Singapore. But it also forms its own organic community and with it identity.
      </p>

      <p class="text--body-2">
        Sometimes, it’s a microcosm of it’s external location. I remember how significant the Bangladeshi community was in Assyakirin Mosque before the pandemic struck. On Sundays in Ramadan, they would cook biryani in the mosque as a communal break fast meal in the mosque. Anyone can walk in and join. Migrant workers from the nearby dormitory would come by and perform <em>Maghrib</em> prayers after. My dad enjoyed the food so much that he’d break fast there on Sundays. 
      </p>

      <p class="text--body-2">
        Sometimes, people look for older mosques - you know, those with the kampong vibes - to find tranquility and reminisce the times before MBMF mosques came in. (I checked the Google reviews and saw these comments okay!) 
      </p>

      <p class="text--body-2">
        But whatever it is, this project serves to remember and data-visualise the remaining mosques that still stand in Singapore in 2021. Who knows how the landscape will change again over time? 
      </p>       
    </v-container>

    <LayoutReferences />
  </section>
</template>

<script>
import LayoutReferences from '@/components/views/LayoutReferences'

export default {
  name: 'SectionConclusion',
  components: {
    LayoutReferences,
  },
  data() {
    return {
    };
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.section-conclusion {
  padding: 64px 0;
}

.scroll-embellish {
  display: inline-block;
}

.scroll-prompt {
  position: relative;
  display: inline-block;
  margin-left: 24px;
}

.scroll-prompt:before {
  content: ' ';
  position: absolute;
  top: 0;
  bottom: 0;
  left: -12px;
  border-left: 3px solid #2e2e2e;
}


</style>