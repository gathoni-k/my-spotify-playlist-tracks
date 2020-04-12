<template>
  <div id="home">
    <a href="http://localhost:8080/auth/spotify" id="btn-spotify"  @click="getInfo"><i class="fab fa-spotify"></i>login to spotify </a>
    <button id="btn"  v-on:click.once="getInfo">Get playlists </button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'Login',
  mounted(){
    this.isLoggedIn()
  },
  data() {
    return {
      info:[],
    }
  },
  methods: {
    isLoggedIn(){
      axios.get('http://localhost:8080/user',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      })
      .then(response => {
        let userId = response.data.user.userId
        let accessToken = response.data.user.accessToken
        this.info = [...this.info, {'userId':userId}, {'accessToken': accessToken}]
      })
      .catch(err => {
        console.log(err)
      })
    },
    getInfo(){
      this.$emit('get-info', this.info)
    }
  }

}
</script>

<style scoped>
  #home{
    display: flex;
    flex-direction: row;
  }
  #btn{
    background-color: #046E8F;
    padding: 1em;
    border-radius: 7px;
    border: 0;
    text-decoration: none;
    color: #ffffff;
    font-family: cursive;
    margin: 1em;
  }
  #btn:hover{
        -webkit-box-shadow: 0px 0px 6px 0px #ccc;
        -moz-box-shadow: 0px 0px 6px 0px #ccc;
        box-shadow: 0px 0px 6px 0px #ccc;
  }
  #btn-spotify{
    background-color: transparent;
    border: 1px solid;
    border-color: #000;
    padding: 1em;
    border-radius: 7px;
    text-decoration: none;
    color: #ffffff;
    font-family: cursive;
    margin: 1em;
  }
  i{
    margin-right: 0.5em;
    color: #000;
    font-size: 1.2em;
  }
</style>