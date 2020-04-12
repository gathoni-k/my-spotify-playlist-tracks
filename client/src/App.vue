<template>
  <div id="app">
    <Playlist/>
  </div>
</template>

<script>
import Playlist from '../src/components/Playlist.vue'
export default {
  name: 'app',
  components: {
    Playlist
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');
body{
  margin: 0;
  padding: 0;
background: #D1913C;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #FFD194, #D1913C);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #FFD194, #D1913C); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align:center;
  font-family: 'Montserrat', sans-serif

}
</style>
