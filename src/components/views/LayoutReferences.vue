<template>
<v-container inner class="my-16">
  <v-expansion-panels class="layout-references mb-8">
    <v-expansion-panel>
      <v-expansion-panel-header
        class="layout-references__header">
        <span>Methodology and references</span>
      </v-expansion-panel-header>

      <v-expansion-panel-content class="layout-references__panel-content">
        <div class="layout-references__content my-8">

          <div class="footer-references">
            <div class="mb-2">References</div>

            <div class="footer-references__content text-caption">
              hello testing <a>then how</a>
            </div>
          </div>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>

  <p class="text--body-4 mb-2">
    <strong>/story </strong> Dian Nadhirah, Khairunisa Khaider, Siti Aishah
  </p>
  <p class="text--body-4 mb-2">
    <strong>/illustrations </strong> Dian Nadhirah
  </p>
   <p class="text--body-4 mb-2"> 
    <strong>/code </strong > Siti Aishah
  </p>
</v-container>
</template>

<style lang="scss" scoped>
.layout-references {
  // overwrite vuetify
  .v-expansion-panel {
    &:before {
      box-shadow: none;
    }

    .v-expansion-panel-header {
      min-height: 0;
    }

    @media #{map-get($display-breakpoints, 'sm-and-down')} {
      ::v-deep .v-expansion-panel-content__wrap {
        padding: 16px;
      }
    }      
  }

  // children
  &__panel-content {
    border-top: 1px solid #ffd3c3;
  }

  &__content {
    word-wrap: break-word;
  }

  .footer-methodology__content,
  .footer-references__content {
    ::v-deep p:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
