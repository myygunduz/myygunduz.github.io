<template>
  <div id="home">
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 297.37 297.37" style="enable-background:new 0 0 297.37 297.37;" xml:space="preserve" class="photo">
    <g>
      <g>
        <path style="fill:#f7422b;" d="M18.83,33.994c0,0,21.751,329.063,138.691,251.557S278.54,93.824,278.54,93.824l-58.47-48.952
          C141.204,44.872,36.502,0,36.502,0L18.83,33.994z"/>
        <image xlink:href="../../assets/avatar.png" style="width:90%;height:100%;"/>
      </g>
    </g>

    </svg>
    <div class="about-me-simple">
      <h1>{{lang=='tr'?'Merhaba 👋 Ben':'Hi! 👋 I am'}} <span>Mücahit Gündüz</span></h1>
      <div class="buttons">
        <button @click="changePage(0)" id="about_me_button">{{lang=='tr'?'Hakkımda...':'About me...'}}</button>
        <button @click="changePage(1)" id="contact_me_button"> <i class="fa-solid fa-paper-plane"></i> {{lang=='tr'?'İletişime Geç':'Contact Me'}}</button>
      </div>
      <div class="social-medias">
          <a v-for="(socialMedia, index) in socialMedias" 
          :key="index" 
          v-html="socialMedia['icon']" 
          :href="socialMedia['link']"
          target="_blank"></a>
      </div>
      <div class="lang-toggle-bar" @click="changeLanguage" :class="{'animation': langAnimated}" @animationend="langAnimated = false">
        <div class="toogle" :class="lang"></div>
        <div class="lang-toggle-bar-item" :class="{'active': lang === 'tr'}">
          TR
        </div>
        <div class="lang-toggle-bar-item" :class="{'active': lang === 'en'}">
          EN
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let socialMediasData = require('../../../database/pages/SocialMedia.json');

export default{
  name: 'HomePage',
  data(){
    return{
      socialMedias: socialMediasData['socialMedias'],
      lang: 'tr',
      langAnimated: false
    }
  },
  created(){
    setInterval(()=>{
      this.activeImage = this.activeImage==3 ? 1 : this.activeImage+1;
    }, 5000);
  },
  methods:{
    changePage(index){
      this.$emit('changePage', index);
    },
    changeLanguage(){
      this.lang = this.lang=='tr' ? 'en' : 'tr';
      this.langAnimated = true;
      this.$emit('changeLanguage', this.lang);
    },
  }
}
</script>


<style scoped>
#home{
  background-color: #111111;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}

.photo{
  margin-left:5%;
}

.about-me-simple{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  color:white
}
.about-me-simple h1 span{
  color: #f7422b;
}





.buttons{
  display: flex;
  flex-flow: row;
}

#about_me_button,
#contact_me_button{
  margin:10px;
  font-size: 15px;
  background-color:#111111;
  border:1px solid #f7422b;
  color: #f7422b;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.5s;
  padding:10px;
}
#about_me_button:hover,
#contact_me_button:hover{
  background-color: #f7422b;
  color: #111111;
  transform: scale(1.1);
}

.social-medias{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin:20px;
}
.social-medias a{
  margin: 10px;
  font-size: 30px;
  color: #f7422b80;
  transition: all .7s;
  cursor: pointer;
}
.social-medias a:hover{
  color: #f7422b;
  transform: scale(1.1);
}

.lang-toggle-bar{
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  background-color:#282828;
  width: 80px;
  height: 40px;
  border-radius: 50px;
  cursor: pointer;
}
.lang-toggle-bar .toogle{
  position: absolute;
  top: 2.5px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #f7422b;

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  transition: all .7s;
}
.lang-toggle-bar .toogle.tr{
  background-image: url('https://i.pinimg.com/originals/b1/78/b2/b178b2ff0ebb7436e23f37750715f18c.jpg');
  left: 2.5px;
  box-shadow: inset 0 0 10px #111111;
}
.lang-toggle-bar .toogle.en{
  background-image: url('https://cdn.evrimagaci.org/gSNnJsKWOjhVIUiM2J8rb-rq6uM=/evrimagaci.org%2Fpublic%2Fcontent_media%2F0e86f979eff69c68dac5da07a665b078.jpg');
  left: 52.5%;
  box-shadow: inset 0 0 10px #111111;
}





@media screen and (max-width: 768px){
  #home{
    flex-direction: column;
    align-items: center;
  }
  .photo{
    margin-left:0;
    margin-top:5%;
  }
  .about-me-simple{
    font-size: 16px;
    flex-direction: column;
  }
  .about-me-simple h1{
    font-size: 20px;
  }
  .buttons{
    flex-direction: column;
  }
  .social-medias{
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    flex-direction: column;
  }
}
@media screen and (max-width: 480px){
  .social-medias{
    display: none;
  }
}
  
</style>
