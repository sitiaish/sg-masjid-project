<template>
  <v-container outer class="scrolly-overlay">
    <v-row justify="space-between" align="start">  
      <v-col cols="12" class="scrolly__sticky" style="background-color: #f5f5f5;">
        <div v-if="currentStep === '1'">                         
          <p v-for="(n, i) in mosquenames" :key="i + 'step1'" 
            class="text--mosque-label">
            <RoughNotation
              v-if="n.namesOfPeople"            
              type="highlight"
              :color="n.namesOfPeople === 'name' ? '#bddcff' : '#ffbdce'"
              :is-show = true>
              <span class="font-weight-bold">{{ n.name }}</span>
            </RoughNotation>
            <span v-else class="dimmed">{{ n.name }}</span>

            <span class="mx-2"/>
          </p>
        </div>
    
        <div v-if="currentStep === '2'">        
          <p v-for="(n, i) in mosquenames" :key="i + 'step2'" 
            class="text--mosque-label">
            <RoughNotation
              v-if="n.language === 'arabic'"            
              type="circle"
              :strokeWidth="1"
              color="#54ad67"
              :is-show = true>
              <span class="font-weight-bold">{{ n.name }}</span>
            </RoughNotation>
            <span v-else-if="n.namesOfPeople" class="dimmed">{{ n.name }}</span>
            <span v-else class="dimmed">{{ n.name }}</span>

            <span class="mx-2" style="font-weight: 500"/>
          </p>
        </div>    

        <div v-if="currentStep === '3'">        
          <p v-for="(n, i) in mosquenames" :key="i + 'step3'" 
            class="text--mosque-label">
            <RoughNotation
              v-if="n.language === 'malay' || n.language === 'english'"            
              type="box"
              :strokeWidth="1"
              color="#2D432B"
              :is-show = true>
              <span class="font-weight-bold">{{ n.name }}</span>
            </RoughNotation>

            <span 
              v-else-if="n.namesOfPeople"
              class="dimmed">
              {{ n.name }}
            </span>

            <span 
              v-else-if="n.language === 'arabic'"
              class="dimmed">
              {{ n.name }}
            </span>              

            <span v-else class="dimmed">
              {{ n.name }}
            </span>

            <span class="mx-2" style="font-weight: 500"/>
          </p>
        </div>      

        <div v-if="currentStep === '4'">        
          <p v-for="(n, i) in mosquenames" :key="i + 'step4'" 
            class="text--mosque-label">
            <RoughNotation
              v-if="n.indianMuslim"           
              type="highlight"
              color="#ffd3c3"
              :is-show = true>
              <span class="font-weight-bold">{{ n.name }}</span>
            </RoughNotation>           

            <span v-else class="dimmed">
              {{ n.name }}
            </span>

            <span class="mx-2" style="font-weight: 500"/>
          </p>
        </div>                  

        <div v-if="currentStep === '0'">                         
          <p v-for="(n, i) in mosquenames" :key="i + 'step-default'" 
            class="text--mosque-label">
            <span>{{ n.name }}</span>
            <span class="mx-2" style="font-weight: 500"/>
          </p>
        </div>
      </v-col>     

      <v-col cols="12" md="4" class="scrolly__content">

        <div class="step" data-step="0">
          <div class="text-block">
            <p class="text--body-3 mb-0">
              I look the liberty of arranging the mosque names in alphabetical order for this visualisation. Let's first look at the mosques that are <span class="text--body-2 font-tertiary font-weight-bold">named after people</span>.
            </p>           
          </div>
        </div>

        <div class="step" data-step="1">
          <div class="text-block">
            <p class="text--body-1 font-tertiary font-weight-bold">Masjid {name-of-person}</p>

            <p class="text--body-3">
              Some of the mosques are named after people of influence and/or had contributed their wealth, land or energy in establishing the mosque. 
            </p>

            <p class="text--body-3 mb-0">  
              The names suggest that the people are of Arab, Indian and Malay descents. The former two probably landed on Singapore shores for purposes of trade but ended up staying longer. 
            </p>           
          </div>
        </div>        

        <div class="step first" data-step="1">
          <div class="text-block">            
            <p class="text--body-3">
              <span class="text--body-2 font-tertiary font-weight-bold">Alkaff</span> and 
              <span class="text--body-2 font-tertiary font-weight-bold">Ba'alwie</span> are famous Arab family surnames in Singapore. 
              <span class="text--body-2 font-tertiary font-weight-bold">Ahmad Ibrahim</span> was a Member of Parliament of Sembawang Nee Soon in 1959 who'd contributed to the mosque during his term. 
            </p>

            <div class="text-block-legend my-3">
              <p class="text--body-3 ml-2 mb-2">
                <span style="background-color: #ffbdce">women names</span> 3 mosques
              </p>
              <p class="text--body-3 ml-2 mb-2">            
                <span style="background-color: #bddcff">men names</span> 25 mosques
              </p>                
            </div>

            <p class="text--body-3 mb-0">
              Women represent! There are 3 mosques named after women benefactors. The prefix  
              <span class="text--body-2 font-tertiary font-weight-bold">Hajjah</span> is a form of address for a Muslim woman who has performed her Hajj pilgrimage to Mecca.
            </p>
          </div>
        </div>         

        <div class="step first" data-step="2">
          <div class="text-block">
            <p class="text--body-1 font-tertiary font-weight-bold">Named after Virtues (in Arabic)</p>
            
            <p class="text--body-3">
              Then, there are mosques that are named after good virtues and values but in the Arabic language. You can distinguish them by the tell-tale prefix of ‘Al’ or (aliflam) which translates to the article ‘the’ in Arabic.
            </p>  

            <p class="text--body-3">
              For instance, <span class="text--body-2 font-tertiary font-weight-bold">Al-Muttaqin</span> means ‘<em>The</em> pious people who are ever aware of God the Almighty’. 
            </p>              
          </div>
        </div>

        <div class="step first" data-step="3">
          <div class="text-block">
            <p class="text--body-1 font-tertiary font-weight-bold">Named after places or landmarks nearby</p>

            <p class="text--body-3">
              These are the handful that are named after places or landmarks nearby. 
              <span class="text--body-2 font-tertiary font-weight-bold">Masjid Bencoolen</span>
              is literally at the Bencoolen MRT station!
            </p>
            
            <p class="text--body-3">
              <span class="text--body-2 font-tertiary font-weight-bold">Masjid Pusara Aman</span> which signposts its own location sits just off Lim Chu Kang Road, near the Muslim cemetery.
            </p>

            <p class="text--body-3">              
              And, no, 
              <span class="text--body-2 font-tertiary font-weight-bold">
                Masjid Hang Jebat
              </span> 
              was not named after the legendary fallen Malaccan hero. Rather, it’s named after the road that it sits on: Jalan Hang Jebat. 
            </p>       
          </div>
        </div>

        <div class="step first" data-step="3">
          <div class="text-block">
            <p class="text--body-3">
              Of these annotated ones, I feel a slight affinity to mosques with Malay origins in their name. It brings back a slice of history to the present day. 
            </p>

            <p class="text--body-3">
              Like the name <span class="text--body-2 font-tertiary font-weight-bold">Masjid Tasek Utara</span> which translates to Masjid North Lake! Even <em>‘tasek’</em> is spelt in old Malay with an ‘e’ instead of ‘i’. I checked the mosque on the map; it’s concrete buildings all around and no sign of any lakes nearby. 
            </p>
          </div>
        </div>

        <div class="step first" data-step="4">
          <div class="text-block">
            <p class="text--body-1 font-tertiary font-weight-bold">Names with roots to the Indian Muslim community</p>

            <p class="text--body-3">
              Islam in Singapore has always been associated with the Malays but that’s a big misconception -- religion is universal.
            </p>

            <p class="text--body-3 mb-0">            
              This is a shoutout to the Indian Muslim community in Singapore. These mosques bear historial importance to the Indian Muslims who came to our shores, some 
              <a href="https://www.straitstimes.com/singapore/mosque-for-the-tamil-milkman" target="_blank"> two centuries ago as moneylenders or traders</a>. 
            </p>
          </div>
        </div>

        <div class="step first" data-step="4">
          <div class="text-block">
            <p class="text--body-3">
              <span class="text--body-2 font-tertiary font-weight-bold">Masjid Jamae Chulia</span> 
              was named after the Chulias, Tamil Muslims from India's south-eastern coast. This mosque is also referred to as the Paalkaara <em>Kadai Palli</em> (Milkman's Shop Mosque), <em>Periya Palli</em> (Big Mosque) and <em>Chulia Palli</em> (Chulia Mosque).
            </p>
            
            <p class="text--body-3 mb-0">
              And the sermons for Friday prayers here are still conducted in Tamil today. 
            </p>
          </div>
        </div> 
      </v-col>  

    </v-row>
  </v-container> 
</template>

<script>
import * as d3 from 'd3';
import scrollama from 'scrollama';

export default {
  name: 'VizNamesScrollyOverlay',
  components: {},
  data() {
    return {
      currentStep: '0',
      mosquenames: null
    };
  },
  mounted() {
    this.initScrollama();    
    this.loadData();
  },  
  methods: {
    initScrollama() {
      // instantiate scrollama
      const scrollerDesktop = scrollama();

      const stepH = Math.floor(window.innerHeight * 1);
      d3.selectAll('.step').style("height", stepH + "px");    

      // setup scrollama
      scrollerDesktop.setup({
        container: '.scrolly-overlay',
        graphic: '.scrolly-overlay .scrolly__sticky',
        step: '.scrolly-overlay .scrolly__content .step', // required
        offset: 0.8,
        debug: false
      })
      .onStepEnter(this.handleStepEnter)
    },
    handleStepEnter({ element }) {
      const step = d3.select(element).attr('data-step');
      this.currentStep = step; 
      console.log(step)
    },
    async loadData() {
      this.mosquenames = await d3.csv('/data/mosque-names.csv');
    }, 
  },
}
</script>

<style lang="scss" scoped>
.text-block {
  background-color: white;
  color: #2E2E2E;
  padding: 16px;
}

.scrolly__overlay {
  position: relative;
}

.scrolly__content {
  position: relative;
  padding: 0 1rem;
  width: 100%;
}

.step {
  margin: 0 auto 2rem auto;
  display: flex;
  justify-content: center;
  align-items: center;    
}

.scrolly__sticky {
  justify-content: center;  
  align-items: center;
  position: sticky;
  top: 24px;
  z-index: 0;
  height: calc(100vh - 64px);
}

.text--mosque-label {
  font-weight: 400;
  font-size: 12px;
  display: inline-block;
  font-family: 'Inconsolata', monospace;
  line-height: 8px;
}

.dimmed {
  opacity: 0.18;
}
</style>