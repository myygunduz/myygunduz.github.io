<template>
  <div id="navbar">

    <a v-for="(navBarItem,index) in lang == 'tr' ? navBarItemsTR : navBarItemsEN" 
        :key="index" 
        :class="[(navBarItem.index==activePage ? 'active' : ''),'page-'+index]" 
        :href="navBarItem.link"
        @click="changePage(index)">

        <span>{{navBarItem.title}}</span>
        
    </a>
    
  </div>
</template>


<script>

let navBarData = require('../../database/NavBar.json');

export default{
  data(){
    return{
      navBarItemsTR: navBarData['navBarItemsTR'],
      navBarItemsEN: navBarData['navBarItemsEN'],
    }
  },
  props: ['activePage','lang'],
  methods:{
    changePage(index){
      this.$emit('changePage', index);
    }
  }
}
</script>



<style scoped>
#navbar{
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 5vw;
}
a{
  text-decoration: none;
  color: #f7422b;
  font-size: 20px;
  font-weight: bold;
  margin: 0 10px;
  transition: all .7s;
  cursor: pointer;
  opacity: .5;
}
a:hover{
  opacity: 1;
}
.active{
  opacity: 1;
}


@media screen and (max-width: 600px){
  #navbar{
    height: 20vw;
  }
  a{
    font-size: 15px;
  }
}
@media screen and (max-width: 400px){
  #navbar{
    height: 20vw;
  }
  a{
    font-size: 10px;
  }
}
</style>