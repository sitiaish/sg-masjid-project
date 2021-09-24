<template>
  <section class="section-conclusion"> 
    <v-container class="pa-md-0 inner section-conclusion-block">
      <div class="text-center mb-8">
        <img src="@/assets/title.svg" width="60px" class="scroll-embellish" />      
        <p class="text--h3 scroll-prompt font-weight-bold">The mosques live on</p>           
      </div>      

      <p class="text--body-2">
        The mosque is a place of worship for Muslims in Singapore. But it also forms its own organic community and, with its identity.
      </p>

      <div class="archi-saf my-12">
        <v-row justify="center" align="start" no-gutters>
          <v-col cols="1">
            <img src="@/assets/archi-imam.png" width="100%" class="mb-8"/>
          </v-col>
          <v-col cols="1">
            <div @click="safetyDistance = !safetyDistance" class="px-4 font-italic" style="cursor: pointer;"> 
              <v-icon class="mb-2">mdi-cursor-default-click</v-icon>
              {{ safetyDistance ? 'okay good' : 'safety distancing k' }}
            </div>
          </v-col>          
        </v-row>

        <div v-if="!safetyDistance">
          <v-row align="end" no-gutters>
            <v-col cols="1">
              <img src="@/assets/archi-makmum-1.png" width="100%"/>
            </v-col>
            <v-col cols="1">
              <img src="@/assets/archi-makmum-2.png" width="100%"/>
            </v-col>
            <v-col cols="1">
              <img src="@/assets/archi-makmum-1.png" width="100%"/>
            </v-col>
            <v-col cols="1">
              <img src="@/assets/archi-makmum-2.png" width="100%"/>
            </v-col>
            <v-col cols="1">
              <img src="@/assets/archi-makmum-1.png" width="100%"/>
            </v-col>
            <v-col cols="1">
              <img src="@/assets/archi-makmum-2.png" width="100%"/>
            </v-col>
            <v-col cols="1">
              <img src="@/assets/archi-makmum-1.png" width="100%"/>
            </v-col>
            <v-col cols="1">
              <img src="@/assets/archi-makmum-2.png" width="100%"/>
            </v-col>
          <v-col cols="1">
              <img src="@/assets/archi-makmum-1.png" width="100%"/>
            </v-col>
            <v-col cols="1">
              <img src="@/assets/archi-makmum-2.png" width="100%"/>
            </v-col>
          <v-col cols="1">
              <img src="@/assets/archi-makmum-1.png" width="100%"/>
            </v-col>
            <v-col cols="1">
              <img src="@/assets/archi-makmum-2.png" width="100%"/>
            </v-col>                                                                                          
          </v-row>
        </div>

        <div v-if="safetyDistance">
          <v-row align="end" justify="space-around" no-gutters>
            <v-col cols="1" offset="1">
              <img src="@/assets/archi-makmum-1.png" width="100%"/>
            </v-col>
            <v-col cols="1">
              <img src="@/assets/archi-makmum-2.png" width="100%"/>
            </v-col>

            <v-col cols="1">
              <img src="@/assets/archi-makmum-1.png" width="100%"/>
            </v-col>

            <v-col cols="1">
              <img src="@/assets/archi-makmum-2.png" width="100%"/>
            </v-col>

            <v-col cols="1">
              <img src="@/assets/archi-makmum-2.png" width="100%"/>
            </v-col>
          </v-row>
          <v-row align="end"  justify="space-between" no-gutters>
            <v-col cols="1">
              <img src="@/assets/archi-makmum-1.png" width="100%"/>
            </v-col>
            <v-col cols="1">
              <img src="@/assets/archi-makmum-2.png" width="100%"/>
            </v-col>
          <v-col cols="1">
              <img src="@/assets/archi-makmum-1.png" width="100%"/>
            </v-col>
            <v-col cols="1">
              <img src="@/assets/archi-makmum-2.png" width="100%"/>
            </v-col>
          <v-col cols="1">
              <img src="@/assets/archi-makmum-1.png" width="100%"/>
            </v-col>
            <v-col cols="1">
              <img src="@/assets/archi-makmum-2.png" width="100%"/>
            </v-col>                                                                                          
          </v-row>
        </div>               
      </div>      

      <p class="text--body-2">
        Sometimes, it’s a microcosm of it’s external location. I remember how significant the Bangladeshi community was in Assyakirin Mosque before the pandemic struck. On Sundays in Ramadan, they would cook biryani in the mosque compound for a communal break fast meal. Anyone can walk in and join. Migrant workers from the nearby dormitories would come by and perform <em>Maghrib</em> prayers after. My dad enjoyed the food so much that he’d break fast there on Sundays. 
      </p>

      <p class="text--body-2">
        Sometimes, people look for older mosques - you know, those with the <em>kampong</em> vibes - to find tranquility and reminisce the times before MBMF mosques came in. (I checked the Google reviews and saw these comments!) 
      </p>

      <v-row justify="center" align="center" class="mt-8 mt-md-12 mb-6">
        <v-col cols="6" md="3">
          <div class="review-1">
            <p class="text--body-3 text-center mb-0">"Love the kampung environment 🥰" (2021)</p>
          </div>          
        </v-col>

        <v-col cols="6" md="4">
          <div class="review-2">
            <p class="text--body-3 text-center mb-0">"Kampung old school feeling, cosy and close to nature" (2020)</p>
          </div>        
        </v-col>

        <v-col cols="8" md="5">
          <div class="review-2">
            <p class="text--body-3 text-center mb-0">
              "My go-to place in seek of solace. The kampung atmosphere is awesome!" (2019)
            </p>      
          </div>           
        </v-col>        
      </v-row>
      <p class="text--body-4 text-right mb-8 mb-md-12 mr-8">-on Masjid Petempatan Melayu Sembawang</p>


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
      safetyDistance: false,
    };
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.section-conclusion {
  padding: 64px 0;
  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    padding: 48px 0;
  }  
}

div.review-1 {
	display: flex;
	align-content: center;
	align-items: center;
	justify-content: center;
  padding: 16px;
	width: 100%;
	height: 150px;
	margin: auto;
  border: 2px solid #2e2e2e;
	// background-color: #21D4FD;
	border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
	box-shadow: 15px 15px 50px rgba(0,0,0,0.08);
	animation: morphing 8s alternate infinite;
	overflow: hidden;
}

div.review-2 {
	display: flex;
	align-content: center;
	align-items: center;
	justify-content: center;
  padding: 16px;
	width: 100%;
	height: 150px;
  border: 2px solid #2e2e2e;
	// background-color: #21D4FD;
	border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
	box-shadow: 15px 15px 50px rgba(0,0,0,0.08);
	animation: morphing 9s alternate-reverse infinite;
	overflow: hidden;
}

	@keyframes morphing {
		0% {
			border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
			box-shadow: 15px 15px 50px rgba(0,0,0,0.08);
		}
		25% { 
			border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%;
		}
		50% {
			border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%;
			box-shadow: -10px -5px 50px rgba(0,0,0,0.08);
		}
		75% {
			border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%;	
		}
	}

</style>