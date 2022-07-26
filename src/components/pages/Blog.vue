<template>
  <div id="blog">
    <div class="containers">
      <div class="container" :class="index%2==0?'text-right':'text-left'"
        v-for="(blog,index) in blogs"
        :key = "index">
        <p class="date" v-if="index%2!=0">{{lang=='tr'?blog['date'].split('|')[0]:blog['date'].split('|')[1]}}</p>
        <div class="container-content">
          <img :src="blog['thumbnail']">
          <div class="blog-detail">
            <h3 class="title">{{blog['title']}}</h3>
            <p class="description">{{blog['description']}}</p>
            <a :href="blog['url']">{{lang=='tr'?'Devamını Oku':'Read More'}}</a>
          </div>
        </div>
        <p class="date" v-if="index%2==0">{{lang=='tr'?blog['date'].split('|')[0]:blog['date'].split('|')[1]}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default{
  name: 'BlogPage',
  props:['lang'],
  data(){
    return {
      blogs:[]
    }
  },
  created(){
    axios({
      method:'get',
      url:'{{blogsapilink}}',
    }).then(res => {
      this.blogs = res.data;
    });
    
  }
}
</script>



<style scoped>
#blog{
  background-color: #111111;
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

.containers{
  display: flex;
  flex-direction: column-reverse;
}
.container{
  width: 100%;
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: 50% 50%;
}


.container .container-content{
  display: flex;
  flex-direction: column;
  position: relative;
  width: 80%;
  min-height: 90%;
  padding:10px 30px;
  border-radius: 12px;
  background-color: transparent;
  border:1px solid #f7422b;
  color:white;
}
.container.text-left .container-content::before{
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
.container.text-left .container-content::after{
  content: "";
  position: absolute;
  top: 48.5%;
  left: -11%;
  transform: translateY(-50%);
  width:11%;
  height: 3px;
  background-color: #f7422b;
  z-index: 1;
}
.container.text-right .container-content::before{
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
.container.text-right .container-content::after{
  content: "";
  position: absolute;
  top: 48.5%;
  right: -11%;
  transform: translateY(-50%);
  width:11%;
  height: 3px;
  background-color: #f7422b;
  z-index: 1;
}

.container .date{
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
.container.text-left .date::before{
  content: "";
  position: absolute;
  top: 0;
  right: -1.5px;
  width:3px;
  height: 100%;
  background-color: #f7422b;
}
.container.text-left .date::after{
  content: "";
  position: absolute;
  top: 50%;
  right: -13px;
  transform: translateY(-50%);
  width:20px;
  height: 20px;
  border-radius: 50%;
  background-color: #111111;
  border:3px solid #f7422b;
  z-index: 2;
}
.container.text-right .date::before{
  content: "";
  position: absolute;
  top: 0;
  left: -1.5px;
  width:3px;
  height: 100%;
  background-color: #f7422b;
}
.container.text-right .date::after{
  content: "";
  position: absolute;
  top: 50%;
  left: -13px;
  transform: translateY(-50%);
  width:20px;
  height: 20px;
  border-radius: 50%;
  background-color: #111111;
  border:3px solid #f7422b;
  z-index: 2;
}

.container-content img{
  border-radius: 12px;
}
.container-content .title{
  font-size: 1.3rem;
  font-weight: bold;
  margin: 10px 0;
  color:white;
}
.container-content .description{
  font-size: 1.1rem;
  color:white;
}
.container-content .description p{
  margin: 10px 0;
}
.container-content a{
  color:#f7422b;
  text-decoration: none;
}

@media screen and (max-width: 700px){
  .container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top:10%;
    position: relative;
    height: auto;
  }
  .container::before{
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
  .container.text-right{
    flex-direction: column-reverse;
  }

  .container .container-content{
    border:0;
    font-size: 15px;
  }
  .container .container-content::before{
    display: none;
  }
  .container .container-content::after{
    display: none;
  }
  .container .date{
    display: none;
  }
  .container .date::before{
    display: none;
  }
  .container .date::after{
    display: none;
  }
}
</style>