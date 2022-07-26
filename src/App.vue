<template>
  <div id="parentDiv" :class="theme">
    <nav-bar-area 
      @changePage="changePageFunc"
      :activePage="activePageVar"
      :lang="lang"
    />
    
    <pages-area 
      @clickPrev="clickPrevFunc" 
      @clickNext="clickNextFunc"
      @changePage="changePageFunc"
      @changeLanguage="changeLanguageFunc"
      :activePage="activePageVar"
      :lang="lang"
      
    />
  </div>
</template>

<script>
import NavBarArea from './components/NavBar.vue'
import PagesArea from './components/pages/Page.vue'
import axios from 'axios';

export default{
  name: 'App',
  components: {
    'nav-bar-area':NavBarArea,
    'pages-area':PagesArea
  },
  data(){
    return{
      theme:"dark",
      activePageVar:2,
      lang:"tr",
    }
  },
  methods:{
    changePageFunc(index){
      this.activePageVar = index;
    },
    changeLanguageFunc(lang){
      this.lang = lang;
    },
    clickPrevFunc(index){
      this.activePageVar = index();
    },
    clickNextFunc(index){
      this.activePageVar = index();
    }
  },
  created(){
    axios.get('https://www.cloudflare.com/cdn-cgi/trace')
    .then(response=>{
      //console.log(response);
      let veri=response.data.split('\n');
      
      let konum=veri[8].split('=')[1];
      if (konum=="TR"){
        this.lang="tr";
      }
      else{
        this.lang="en";
      }
    })
    .catch(e=>{
        console.error(e)
    }) 
  }
}
</script>

<style>
@import "../src/style/style.css";

</style>
