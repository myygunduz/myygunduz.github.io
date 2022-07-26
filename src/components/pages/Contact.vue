<template>
  <div id="contact-me">
    <div class="container">
      <div class="container-part" id="mail">
        <p class="container-title" >{{lang=="tr"? "Bir Eposta Gönder" : "Send an Email"}}</p>
        <a href="mailto:myygunduz@gmail.com">myygunduz@gmail.com</a>
      </div>
      <div class="container-part">
        <p class="container-title">{{lang=="tr"? "Takip Et" : "Follow Me"}}</p>
        <div class="social-medias">
          <a v-for="(socialMedia, index) in socialMedias" 
          :key="index" 
          v-html="socialMedia['icon']" 
          :href="socialMedia['link']"
          target="_blank"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let socialMediasData = require('../../../database/pages/SocialMedia.json');



export default{
  name: 'ContactPage',
  data(){
    return{
      socialMedias: socialMediasData['socialMedias']
    }
  },
  props:['lang']
}
</script>



<style scoped>
#contact-me{
  background-color: #111111;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.container{
  display: flex;
  height: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color:#fff;
}
.container-part{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 20px;
}

.container-title{
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  color:#f7422b;
}
.container-part a{
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  text-decoration: none;
  transition: all .7s;
  cursor: pointer;
}
.container-part a:hover{
  color: #f7422b;
}

.social-medias{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}
.social-medias a{
  margin: 0 10px;
  font-size: 30px;
  color: #f7422b;
  transition: all .7s;
  cursor: pointer;
  opacity: .5;
}
.social-medias a:hover{
  opacity: 1;
  transform: scale(1.1);
}


@media screen and (max-width:700px){
  #contact-me{
    flex-direction: column;
    align-items: center;
  }
  .container{
    flex-direction: column;
    align-items: center;
  }
  .container-part{
    margin: 0;
  }
  .container-part:first-child{
    margin-top: 20px;
  }
  .container-part:last-child{
    margin-top: 20px;
  }
  .container-part:nth-child(2){
    margin-top: 20px;
  }
}
</style>