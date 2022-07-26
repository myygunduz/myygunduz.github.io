<template>
  <div id="projects">
    <div v-for="(project, index) in projectsData"
      :key="index"
      class="project-container">
      <header>
        <div class="project-title">
          <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-repo mr-1 color-fg-muted">
            <path fill-rule="evenodd" fill="#8F8F8F" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path>
          </svg>
          <span class="project-title-text">myygunduz / <span class="project-title-text-color">{{ project.title }}</span></span>  
        </div>
        <div class="project-stats">
          <span>{{project.star}} <i class="fa-solid fa-star"></i></span>
          <span>{{project.fork}} <i class="fa-solid fa-code-fork"></i></span>
        </div>
      </header>
      <div class="languages-progress-bar">
        <div v-for="(language,index) in project.languages" :key="index" :style="{'--width':language.percent,'--color':language.color}"></div>
      </div>
      <div class="project-description">
        <p>{{ project.description }}</p>
        <a :href="project.url" target="_blank">{{lang=="tr"? "Projeye Git":"Go to Project"}}</a>
        <a :href="project.source"  target="_blank"><i class="fa-brands fa-github"></i> {{lang=="tr"? "Kaynak Kodu":"Source Code"}}</a>
      </div>
      <div class="project-contributors">
        <div class="project-contributors-all">
          <div 
          v-for="(contributor, index) in project.contributors" 
          :key="index" 
          v-show="(project.contributors.indexOf(contributor)<5)"
          :style="{'--bg-image':contributor.avatar,'z-index':5-index,'--index':index}">
          </div>
        </div>

        <span>{{ project.contributorsLenght }} {{lang=="tr"? "Kişi Katkıda Bulundu":"Contributors"}}</span>
      </div>
    </div>
    <a href="https://github.com/myygunduz" target="_blank" class="more-projects-button"> 
      <i class="fa-brands fa-github"></i>
      <span>{{lang=="tr"? "Github'da daha fazlasını keşfet":"View More on Github"}}</span>
    </a>
  </div>
</template>

<script>
import axios from 'axios';

export default{
  name: 'ProjectsPage',
  data(){
    return {
      projectsData: []
    }
  },
  props: ['lang'],
  methods:{
    getLanguagesData(languages_url){
      var languagesData = [];
      axios.get(languages_url).then(res => {
        var language = res.data;
        for (var i = 0; i < Object.keys(language).length; i++) {
          var languageData = {};
          languageData.name = Object.keys(language)[i];
          languageData.percent = language[Object.keys(language)[i]];
          languageData.color = this.getColor(languageData.name);
          languagesData.push(languageData);
        }
        var total = 0;
        for (var is = 0; is < languagesData.length; is++) {
          total += parseInt(languagesData[is].percent);
        }
        for (var it = 0; it < languagesData.length; it++) {
          languagesData[it].percent = (parseInt(languagesData[it].percent)/total)*100+'%';
        }
      });
      return languagesData;
    },
    getColor(lang_name){
      var lang_colors = {
        'python': '#3572A5',
        'javascript': '#F9DE55',
        'java': '#B07219',
        'c++': '#F34B7D',
        'c': '#F34B7D',
        'c#': '#F34B7D',
        'php': '#4F5D95',
        'html': '#E44D26',
        'css': '#563D7C',
        'ruby': '#7F0046',
        'swift': '#FFCA28',
        'objective-c': '#438EFF',
        'kotlin': '#F18E33',
        'typescript': '#2B7489',
        'haskell': '#5E5086',
        'scala': '#C22D40',
        'go': '#375EAB'
      }
      return lang_colors[lang_name.toLowerCase()];
    },
    getContributorsData(contributors_url){
      var contributorsData = [];
      axios.get(contributors_url).then(res => {
        var contributors = res.data;
        for (var i = 0; i < contributors.length; i++) {
          var contributor = {};
          contributor.name = contributors[i]['login'];
          contributor.avatar = "url('"+contributors[i]['avatar_url']+"')";
          contributorsData.push(contributor);
        }
      });
      return contributorsData;
    }
  },
  created(){
    axios({
      method:'get',
      url:'{{projectsapilink}}',
    }).then(res => {
      if(res.data['message']=='NotUpdated'){
        axios.get('https://api.github.com/users/myygunduz/repos').then(res => {
          var projectsData = res.data;
          var projectsDataList = [];
          for (var i = 0; i < projectsData.length; i++) {
          if(!projectsData[i].fork){
            var project = {}
            project.title = projectsData[i]['name'];
            project.description = projectsData[i]['description'] == null ? 'No description' : projectsData[i]['description'];
            project.url = projectsData[i]['homepage'] == null ? projectsData[i]['html_url'] : projectsData[i]['homepage'];
            project.source = projectsData[i]['html_url'];
            project.languages = this.getLanguagesData(projectsData[i]['languages_url']);
            project.contributors = this.getContributorsData(projectsData[i]['contributors_url']);
            project.contributorsLenght = project.contributors.length+1;
            project.star = projectsData[i]['stargazers_count'];
            project.fork = projectsData[i]['forks_count'];
            projectsDataList.push(project);
          }}
          this.projectsData = projectsDataList;
        });
        axios({
          method:'get',
          url:'{{projectsapilink}}',
        })
        setTimeout(() => {
          for(let i=0; i<this.projectsData.length; i++){
            if(Object.keys(this.projectsData[i]['languages']).length!=0){
              axios({
                method: 'post',
                url: '{{projectsapilink}}',
                data: {
                  title: this.projectsData[i]['title'],
                  description: this.projectsData[i]['description'],
                  url: this.projectsData[i]['url'],
                  source: this.projectsData[i]['source'],
                  languages: this.projectsData[i]['languages'],
                  contributors: this.projectsData[i]['contributors'],
                  contributorsLenght: this.projectsData[i]['contributorsLenght'],
                  star: this.projectsData[i]['star'],
                  fork: this.projectsData[i]['fork']
                } 
              }).then(res => {
                location.reload()
                return res
              });
            }
          }
        }, 3000);

      }else{
        var whatUsedLanguages = {};
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].languages = JSON.parse(res.data[i].languages);
          res.data[i].contributors = JSON.parse(res.data[i].contributors);
          for (var j = 0; j < res.data[i].languages.length; j++) {
            var language = res.data[i].languages[j];
            if(whatUsedLanguages[res.data[i].languages[j].name]==undefined){
              whatUsedLanguages[language.name] = {'name': language.name, 'percent': language.percent, 'color': this.getColor(language.name)};
            } else{
              whatUsedLanguages[language.name].percent = parseInt(whatUsedLanguages[language.name].percent)+parseInt(language.percent);
            }
          }
        this.projectsData = res.data;
        }
        var totalPercent = 0;
        for(var t1=0; t1<Object.keys(whatUsedLanguages).length; t1++){
          totalPercent += parseInt(whatUsedLanguages[Object.keys(whatUsedLanguages)[t1]].percent);
        }
        for(var t2=0; t2<Object.keys(whatUsedLanguages).length; t2++){
          whatUsedLanguages[Object.keys(whatUsedLanguages)[t2]].percent = (parseInt(whatUsedLanguages[Object.keys(whatUsedLanguages)[t2]].percent)/totalPercent)*100+'%';
        } 
        this.$emit('whatUsedLanguages',whatUsedLanguages);
      }
    });
    
  }
}



</script>


<style scoped>
#projects{
background-color: #111111;
width: 100%;
height: 100%;
display: grid;
grid-template-columns:1fr 1fr;
justify-items: center;
overflow-y: scroll;
overflow-x: hidden;
padding:40px 0;
}

::-webkit-scrollbar {
width: 15px;
}
::-webkit-scrollbar-thumb {
background: #f7422b;
}


.project-container,
.more-projects-button{
width:400px;
height:200px;
background-color: #161616;
margin:20px 0;

box-shadow:0px 0px 10px #000000;
}

header{
background-color: #282828;
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
height: 30px;
color:#f5f5f5;
}

.project-title{
display: flex;
align-items: center;
height: 100%;  
padding-left: 10px;
}
.project-title .project-title-text{
margin-left:10px;
color:#8F8F8F;
}
.project-title .project-title-text-color{
color:#f7422b;
}

.project-stats{
display: flex;
align-items: center;
height: 100%;  
}
.project-stats span{
margin-right:10px;
color:#8F8F8F;
}
.project-stats .fa-star{
color:#F2DF3A;
}


.languages-progress-bar{
width: 100%;
height: 10px;
display: flex;
flex-direction: row;
justify-content: space-around;
align-items: center;
}
.languages-progress-bar div{  
width: var(--width);
height: 100%;
background-color: var(--color);
}

.project-description{
width: 100%;
height: 55%;
padding:10px;
color:#f5f5f5;
display: flex;
flex-direction: column;
}
.project-description a{
margin-top:10px;
color:#8F8F8F;
text-decoration: none;
cursor: pointer;
}
.project-description a:hover{
text-decoration: underline;
}



.project-contributors{
width: 100%;
height: 45px;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding:10px;
color:#f5f5f5;
}
.project-contributors-all{
display: flex;
flex-direction: row;
justify-content: flex-start;
align-items: center;
height: auto;
color:#f5f5f5;
position: relative;
} 
.project-contributors-all div{
width: 45px;
height: 45px;
background-image: var(--bg-image);
background-size: cover;
background-position: center;
border-radius: 50%;
position: absolute;
top: 0;
left: 0;
transform: translateX(calc(var(--index)*40px)) translateY(-50%);
border: 1px solid #161616;
}

.project-contributors span{
color:#8F8F8F;
}

.more-projects-button{
border: 2px solid #f7422b;
border-radius: 12px;
color: #f7422b;

display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
text-decoration: none;

font-size: 1.5rem;
position: relative;
transition: all 0.5s;
}
.more-projects-button:hover{
background-color: #f7422b;
color: #111111;
}
.more-projects-button i{
position: absolute;
top: 5%;
right: 5%;
font-size: 10rem;
color: #f7422b80;
transition: all 0.5s;
}
.more-projects-button:hover i{
color: #11111180;
}


@media screen and (max-width: 1000px){
#projects{
    grid-template-columns:1fr;
}
.project-container,
.more-projects-button{
    width:100%;
    
}
header{
    height: auto;
}
.project-contributors-all div{
    transform: translateX(0) translateY(-50%);
}
}
@media screen and (max-width: 400px){
.project-contributors-all{
    display: none;
}
.more-projects-button {
    font-size: 1rem;
}
}
</style>