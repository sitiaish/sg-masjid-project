<template>
  <section class="section-landing py-12">
    <v-container inner py-12>
      <p class="text--body-2">
        <span class="font-weight-bold">I miss going to the mosque</span>,
         especially during Ramadan and for Hari Raya prayers. 
      </p>

      <p class="text--body-2">
        You all also, right?  If not, why the booking system break down at 10AM on 11/5/2021. The exact moment that you all can book the prayer slot for Hari Raya, eh? 
      </p>

      <p class="text--body-2">
        So I made this project about mosques in Singapore.
      </p>

      <p class="text--caption">
        Note: colors/sketch dimensions is not to scale
      </p>      
    </v-container>

    <div class="section-landing-title">
      <v-container>
        <v-row justify="center" align="center" no-gutters>
          <v-col cols="12" md="6">
            <div class="landing-mosque">
              <img src="@/assets/ghufran-pink.png" height="600px" />
              <p class="text--caption">
                Darul Ghufran, Tampines
              </p>
            </div>
          </v-col>

          <v-col cols="12" md="6" class="text-left"> 
            <h1 class="text--h1 font-weight-regular mb-8">This is a mosque somewhere in Singapore.</h1> 
            <p class="text--body-2">
              It's where me and other Muslims can go for congregational prayers and maybe attend a religious class or two.
            </p>
            <p class="text--body-2">
              There are ~72 mosques still standing in Singapore. This is an exploration of some of them. 
            </p>               
          </v-col>
        </v-row>
      </v-container>     
    </div>   
  </section>
</template>  

<script>
export default {
  name: 'SectionLanding',
  coponents: {},
  data() {
    return {
      mosque1: [
        'Abdul Aleem Siddique',
        'Abdul Gafoor',
        'Abdul Hamid Kampong Pasiran',
        'Ahmad',
        'Ahmad Ibrahim',
        'Al-Abdul Razak',
        'Al-Abrar',
        'Al-Amin',
        'Al-Ansar',
        'Al-Falah',
        'Al-Firdaus',
        'Al-Huda',
        'Al-Iman',
        'Al-Islah',
        'Al-Istighfar',
        'Al-Istiqamah',
        'Alkaff Kampong Melayu',
        'Alkaff Upper Serangoon',
        'Al-Khair',
        'Al-Mawaddah',
        'Al-Mukminin',
        'Al-Muttaqin',
        'Al-Taqua',
        'Angullia',
        'An-Nahdhah',
        'An-Nur',
        'Ar-Raudhah',
        'Assyafaah',
        'Assyakirin',
        "Ba'alwie",
        'Bencoolen',
        'Burhani',
        'Darul Aman',
        'Darul Ghufran',
        'Darul Makmur',
        'Darussalam',
        'En-Naeem',
        'Haji Mohd Salleh (Geylang)',
      ],
      mosque2: [
        'Haji Muhammad Salleh (Palmer)',
        'Haji Yusoff',
        'Hajjah Fatimah',
        'Hajjah Rahimabi',
        'Hang Jebat',
        'Hasanah',
        'Hussein Sulaiman',
        'Jamae Chulia',
        'Jamek Queenstown',
        'Jamiyah Ar-Rabitah',
        'Kampong Delta',
        'Kampong Siglap',
        'Kassim',
        'Khadijah',
        'Khalid',
        'Maarof',
        'Malabar',
        'Moulana Mohd Ali',
        'Muhajirin',
        'Mujahidin',
        'Mydin',
        'Omar Kampong Melaka',
        'Omar Salmah',
        'Petempatan Melayu Sembawang',
        'Pulau Bukom',
        'Pusara Aman',
        'Sallim Mattar',
        'Sultan',
        'Tasek Utara',
        'Temenggong Daeng Ibrahim',
        'Tentera Di Raja',
        'Wak Tanjong',
        'Yusof Ishak',        
      ]
    };
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.section-landing {

  .section-landing-title {
    background-color: #f5f5f5;

    .landing-mosque {
      position: relative;

      p {
        position: absolute;
        bottom: 0;
        left: -24px;
        writing-mode: vertical-rl;
        text-orientation: mixed;
        display: inline;
      }
    }
  }
}
</style>