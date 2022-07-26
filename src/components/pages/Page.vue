<template>
    <div class="slide hi-slide">
        <div class="hi-prev" @click="clickPrev"></div>
        <div class="hi-next" @click="clickNext"></div>
        <ul>
            <li><page-about    :lang="lang" :whatUsedLanguages="whatUsedLanguages"/></li>
            <li><page-contact  :lang="lang"/></li>
            <li><page-home     :lang="lang" 
            @changePage    = "this.$emit('changePage',$event)" 
            @changeLanguage= "this.$emit('changeLanguage',$event)"/></li>
            <li><page-blog     :lang="lang"/></li>
            <li><page-projects :lang="lang" @whatUsedLanguages="whatUsedLanguages = $event" /></li>
        </ul>
    </div>
</template>


<script>

import AboutPage from './About.vue'
import BlogPage from './Blog.vue'
import ContactPage from './Contact.vue'
import HomePage from './Home.vue'
import ProjectsPage from './Projects.vue'

export default{
    name: 'PagesArea',
    props: ['activePage', 'lang'],
    components: {
        'page-about':AboutPage,
        'page-blog':BlogPage,
        'page-contact':ContactPage,
        'page-home':HomePage,
        'page-projects':ProjectsPage
    },
    methods:{
        clickPrev(){
            this.$emit('clickPrev', function(){
                if (this.activePage == 0) {
                    return 4;
                } else {
                    return this.activePage-1;
                }
            }.bind(this));
        },
        clickNext(){
            this.$emit('clickNext', function(){
                if (this.activePage == 4) {
                    return 0;
                }
                return this.activePage+1;
            }.bind(this));
        }
    },
    data(){
        return{
            whatUsedLanguages: [],
        }
    }
}
</script>


<style scoped>

.hi-slide{
    position: relative;
    width: 90%;
    height:90%;
    border-radius: 50px;
    transition: all .5s;
}
.hi-slide .hi-prev,
.hi-slide .hi-next{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    margin-top: 20px;
    border-radius: 50px;
    line-height: 35px;
    text-align: center;
    cursor: pointer;
    background-color: transparent;
    color:#f7422b;
    transition: all .7s;
    font-size: 20px;
    font-weight: bold;
    border:2px solid #f7422b;
}

.hi-slide .hi-prev:hover,
.hi-slide .hi-next:hover{
    background-color: #f7422b;
    color: #fff;
}
.hi-slide .hi-prev{
    left: -4%;
}
.hi-slide .hi-prev::before{
    content: "<<";
}
.hi-slide .hi-next{
    right: -4%;
}
.hi-slide .hi-next::before{
    content: ">>";
}
.hi-slide > ul {
    list-style: none;
    position: relative;
    width:100%;
    height:100%;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;

}

.hi-slide > ul > li {
    overflow: hidden;
    position: absolute;
    z-index: 0;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    border: 3px solid #111111;
}


@media screen and (max-width: 700px){
    .hi-slide{
        height:80%;
    }
    .hi-slide .hi-prev{
        top:100%;
        left: 40%;
        transform: translateX(-50%);
    }
    .hi-slide .hi-next{
        top:100%;
        right: 40%;
        transform: translateX(50%);
    }
    .hi-slide .hi-prev:hover,
    .hi-slide .hi-next:hover{
        background-color: transparent;
        color: #f7422b;
    }
}
</style>