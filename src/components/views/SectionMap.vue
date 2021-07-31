<template>
  <div class="wrapper__story">
    <Map />
  </div>
</template>

<script>
import axios from 'axios';
import Map from '@/components/viz/Map';

export default {
  name: 'SectionMap',
  components: {
    Map,
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      step: 1,
      slideStep: 0,
      finalStep: 5,
      key: '1Cko8WVKmeU7JPb-9cuJz9NjjXB9sc3JGfHmAZShoLT8',
      data: null,
      quoteListG: [],
      authorList: [],
      tagList: [],
    };
  },
  // async created() {
  //   // const key = this.key;
  //   try {
  //     const response = await axios.get(`https://spreadsheets.google.com/feeds/list/${this.key}/od6/public/values?alt=json`)
  //     this.data = response.data;
  //     console.log(this.data);
  //   } catch (e) {
  //     this.errors.push(e)
  //   }
  // },
  mounted() {
    axios
      .get(`https://spreadsheets.google.com/feeds/list/1Cko8WVKmeU7JPb-9cuJz9NjjXB9sc3JGfHmAZShoLT8/1/public/values?alt=json`)
      .then(response => (
        this.parseData(response.data.feed.entry)
        // console.log(response)
      ))    
  },
  methods: {
    handleStep(event) {
      if (event === 'back' && this.step > 1) {
        this.step--;
      } else if (event === 'next' && this.step === this.finalStep) {
        this.step = this.finalStep; // just in case
      } else if (event === 'next') {
        this.step++;
      }

      if (this.step <= 3) {
        this.slideStep = 0;
      } else if (this.step >= 4) {
        this.slideStep = 1;
      }
    },
    parseData(entries) {
      
      // var authorSet = new Set();
      // var tagSet = new Set();
      var quoteList = [];

      entries.forEach(function(value) {
        var entry = {
          // "quote": value.gsx$quote.$t,
          // "author": value.gsx$author.$t,
          // "source": value.gsx$source.$t,
          // "tags": value.gsx$tags.$t.split(",")
          "id": value.gsx$id.$t,
          "text": value.gsx$text.$t,
        };
        // authorSet.add(entry.author);

        // entry.tags.forEach(function(t) {
        //   tagSet.add(t);
        // });

        quoteList.push(entry);
        // console.log(quoteList)
      });

      // this.authorList = Array.from(authorSet);
      // this.authorList.sort();

      // this.tagList = Array.from(tagSet);
      // this.tagList.sort();

      this.quoteListG = quoteList;
      // quotes.quotes = this.quoteList;
      // authors.authors = authorList;
      // tags.tags = tagList;
    }
  },
}
</script>

<style lang="scss" scoped>
// .wrapper__story {
//   // background-color: #ddcabd;
// }
</style>
