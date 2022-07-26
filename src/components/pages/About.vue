<template>
  <div id="about-me">
    <div class="about-me-header">
      <div class="header-content">
        <img src="../../assets/avatar.jpg" alt="">
        <h1>{{lang=='tr' ? 'Hakkımda':'About Me'}}</h1>
      </div>
    </div>
    <div class="about-me-body">
      <div class="container-part"
        v-for="(content,index) in lang=='tr' ? aboutDataTR : aboutDataEN"
        :key="index"
        :class="{'title-left':index%2==0, 'title-right':index%2!=0}">
        <p class="container-title" v-if="index%2==0">{{content['title']}}</p>
        <p class="container-content" v-html="content['text']"></p>
        <p class="container-title" v-if="index%2!=0">{{content['title']}}</p>
      </div>
      <div class="container-part title-left">
        <p class="container-title">{{lang=="tr"? "Projelerimde Hangi Dilleri Kullandım?" : "What Languages Did I Use In My Projects?"}}</p>
        <div class="container-content used-languages">
          <div v-for="(usedLanguage, index) in whatUsedLanguages" :key="index" class="used-language">
            <p>{{usedLanguage['name']}}</p>
            <div class="language-bar">
              <div class="language-bar-inner" :style="{'--width':usedLanguage['percent'],'--bgColor':usedLanguage['color']}"></div>
              <span>{{usedLanguage['percent'].slice(0,5)+'%'}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="container-part title-right social">
        <div class="container-content social-medias">
          <a v-for="(socialMedia, index) in socialMedias" 
          :key="index" 
          v-html="socialMedia['icon']" 
          :href="socialMedia['link']"
          target="_blank"></a>
        </div>
        <p class="container-title">{{lang=="tr"? "Sosyal Medyalarım" : "My Social Medias"}}</p>
      </div>
    </div>
  </div>
</template>

<script>
let aboutData = require('../../../database/pages/About.json');
let socialMediasData = require('../../../database/pages/SocialMedia.json');

export default{
  name: 'AboutPage',
  props:['lang', 'whatUsedLanguages'],
  data(){
    return{
      aboutDataTR: aboutData['TR'],
      aboutDataEN: aboutData['EN'],
      socialMedias: socialMediasData['socialMedias'],
    }
  }
}
</script>



<style scoped>
#about-me{
  background-color: #111111;
  color: #fff;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
}

::-webkit-scrollbar {
  width: 15px;
}
::-webkit-scrollbar-thumb {
  background: #f7422b;
}

.about-me-header{
  width: 100%;
  height: 102%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.about-me-header .header-content{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-bottom: 3px solid #f7422b;
  width: 350px;
  height: 350px;
  border-radius: 20px;
  position: relative;
}

.about-me-header .header-content img{
  width:200px;
  height:200px;
  border-radius: 50%;
  box-shadow: 0 0 10px #f7422b;
  margin-bottom: 20px;
}
.about-me-header .header-content h1{
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
  color:#f7422b;
}

.about-me-body{
  border-top: 3px solid #f7422b;
  padding-top: 3px;
}

.container-part{
  width: 100%;
  height: 200px;
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: 50% 50%;
}
.container-part .container-content{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 80%;
  min-height: 90%;
  padding:10px 30px;
  border-radius: 12px;
  background-color: transparent;
  border:1px solid #f7422b;
}
.container-part.title-left .container-content::before{
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width:3px;
  height: 70%;
  background-color: #f7422b;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.container-part.title-left .container-content::after{
  content: "";
  position: absolute;
  top: 47%;
  left: -11%;
  transform: translateY(-50%);
  width:11%;
  height: 3px;
  background-color: #f7422b;
  z-index: 1;
}

.container-part.title-right .container-content::before{
  content: "";
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  width:3px;
  height: 70%;
  background-color: #f7422b;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.container-part.title-right .container-content::after{
  content: "";
  position: absolute;
  top: 47%;
  right: -11%;
  transform: translateY(-50%);
  width:11%;
  height: 3px;
  background-color: #f7422b;
  z-index: 1;
}


.container-part .container-title{
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
  color:#f7422b;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.container-part.title-left .container-title::before{
  content: "";
  position: absolute;
  top: 0;
  right: -1.5px;
  width:3px;
  height: 100%;
  background-color: #f7422b;
}
.container-part.title-left .container-title::after{
  content: "";
  position: absolute;
  top: 50%;
  right: -12px;
  transform: translateY(-50%);
  width:20px;
  height: 20px;
  border-radius: 50%;
  background-color: #111111;
  border:3px solid #f7422b;
  z-index: 2;
}
.container-part.title-right .container-title::before{
  content: "";
  position: absolute;
  top: 0;
  left: -1.5px;
  width:3px;
  height: 100%;
  background-color: #f7422b;
}
.container-part.title-right .container-title::after{
  content: "";
  position: absolute;
  top: 50%;
  left: -12px;
  transform: translateY(-50%);
  width:20px;
  height: 20px;
  border-radius: 50%;
  background-color: #111111;
  border:3px solid #f7422b;
  z-index: 2;
}

.used-languages{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.used-languages .used-language{
  width: 100%;
}
.used-languages .language-bar{
  width: 100%;
  height: 10px;
  position: relative;
  display: grid;
  grid-template-columns: 85% 15%;
}
.used-languages .language-bar .language-bar-inner{
  background-color: white;
  height: 10px;
  border-radius: 5px;
}
.used-languages .language-bar .language-bar-inner::before{
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: var(--width);
  height: 100%;
  background-color: var(--bgColor);
  border-radius: 5px;
}

.used-languages .language-bar span{
  line-height: 10px;
  padding-left: 3px;
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

.container-part .social-medias{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}
.container-part .social-medias a{
  margin: 0 10px;
  font-size: 30px;
  color: #f7422b;
  transition: all .7s;
  cursor: pointer;
  opacity: .5;
}
.container-part .social-medias a:hover{
  opacity: 1;
  transform: scale(1.1);
}


@media screen and (max-width: 700px){
  .container-part{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top:10%;
    position: relative;
    height: auto;
  }
  .container-part::before{
    content: "";
    position: absolute;
    bottom: -2%;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 2px;
    background-color: #f7422b;
    border-radius: 5px;
  }
  .container-part.social::before{
    display:none;
  }
  .container-part.title-right{
    flex-direction: column-reverse;
  }

  .container-part .container-content{
    border:0;
    font-size: 15px;
  }
  .container-part .container-content::before{
    display: none;
  }
  .container-part .container-content::after{
    display: none;
  }
  .container-part .container-title{
    font-size: 1.2rem;
  }
  .container-part .container-title::before{
    display: none;
  }
  .container-part .container-title::after{
    display: none;
  }
}


</style>