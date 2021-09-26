<template>
  <section class="page-footer">

    <div class="wave-divider">
      <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
      </svg>
    </div>  

    <div class="page-footer-content">
      <v-container class="px-sm-8 py-0 pa-md-0">  
        <div class="mb-8 text-center">  
            <p class="text-body text-center">A data story project by Siti Aishah. </p>
            <p class="text-body text-center">I'm open to collab for any webdev work or dataviz projects!</p>
            <p class="text-body text-center font-weight-bold text--fes-blue mb-4">Find me here</p>            
          <div class="fes-socials text-center text-md-left">
            <span v-for="(icon, i) in socials" :key="i + '-socials'" :class="`mr-${iconSpacing}`">
              <a :href= icon.link target="_blank">
                <v-icon :color="inputColor" :style="`font-size: ${size}px`">{{ icon.item }}</v-icon>
              </a>
            </span>
          </div>          
        </div>
      </v-container> 
    </div>

  </section>
</template>

<script>
export default {
  name: 'Sectionfooter',
  props: {
    inputColor: {
      type: String,
      default: '#db9487'
    },
    iconSpacing: {
      type: Number,
      default: 12
    },
    size: {
      type: Number,
      default: 32
    }           
  },  
  data() {
    return {
      socials: [
        {item: 'mdi-github', link: 'https://github.com/sitiaish/' },
        {item: 'mdi-twitter', link: 'https://twitter.com/teh0prendjak' },
        {item: 'mdi-linkedin', link: 'https://linkedin.com/sitiaish' },
        {item: 'mdi-web', link: 'https://sitiaish.github.io/' },
        {item: 'mdi-email', link: 'mailto: sitiaishahaz@gmail.com' },
      ]      
    };
  },
}
</script>


<style lang="scss" scoped>
 .page-footer {
  background: #f5f5f5;
  // background: linear-gradient(180deg, rgba(242,243,245,1) 0%, rgba(255,255,255,1) 100%);
  position: relative;

  .page-footer-content {
    padding-top: 96px;
  }
 }

 
.footer-wrapper {
  background: #f5f5f5;
  // background: linear-gradient(180deg, rgba(242,243,245,1) 0%, rgba(255,255,255,1) 100%);
  position: relative;
  height: 400px;
  max-height: 400px;
}

.wave-divider {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    transform: rotate(180deg);
}

.wave-divider svg {
    position: relative;
    display: block;
    width: calc(130% + 1.3px);
    height: 62px;
}

.wave-divider .shape-fill {
    fill: white;
}

.fes-socials {
  display: inline-block;
  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    p {
      display: block;
    }    
    margin: 0 auto;
  } 
   
  a {
    border: none !important;
    text-decoration: none;
  }

  span:last-child {
    margin-right: 0px !important;
  }
}

</style>

