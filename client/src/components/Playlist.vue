<template>
    <div id="playlist">
        <!-- catch emitted event and make request to spotify for playlists upon clicking get playlist -->
         <Login @get-info="populatePlaylist"/>
         <!-- render NoTracks commponent if there are no tracks -->
            <NoTracks v-if='noTracks'/>
            <div v-else>
                <!-- render tracks -->
                <Tracks v-show="isModalVisible" @close="closeModal" v-bind:tracks="tracksData"/>
            </div>   
        <!-- show playlists  -->
        <ul v-bind:key="playlist.id" v-for="playlist in playlists" id="list">
        <li>
            <!-- make request to spotify on click to et playlists tracks -->
            <p v-on:click="tracks(playlist.id)">{{playlist.name}}</p> 
        </li>
        </ul>
    </div>
</template>

<script>
import Tracks from "./Tracks.vue";
import NoTracks from "./NoTracks.vue";
import Login from './Login.vue'
import axios from "axios";
export default {
    name: 'Playlist',
    components: {
        Login,
        NoTracks,
        Tracks
    },
    data(){
        return {
            playlists: [],
            token: [],
            tracksData:[],
            isModalVisible: false,
        }
    },
    computed: {
        noTracks() {
            return this.tracksData.length === 0
        }
    },

    methods: {
        populatePlaylist(info){
            // fetch playlist data
            if(info.length !== 0) {
                console.log(info[1].accessToken)
            
            let accessToken = info[1].accessToken
            axios.get('https://api.spotify.com/v1/me/playlists', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            .then((response) => {
                let data = response.data.items
                for (let i = 0; i< data.length; i++) {
                  let playlist = {}
                  playlist.id = data[i].id
                  playlist.name = data[i].name
                  playlist.url = data[i].href
                  playlist.owner = data[i].owner.display_name
                  this.playlists.push(playlist)
                  this.token.push(accessToken)
                   
                }
                console.log(this.playlists)

            })
            .catch(err =>
                {
                    console.log(err)
                })
            } else {
                console.log('Please login')
            }

        },
        tracks(id) {
            this.isModalVisible = true;
            // retrieve tracks
            axios.get(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
                headers: {
                    'Authorization' : `Bearer ${this.token}`
                }
            })
            .then((response) => {
                // let url = response.data.href
                let tracks = response.data.items
                this.tracksData = []
                for (let i = 0; i < tracks.length; i++) {
                    let track = { }
                    track.id = tracks[i].track.id
                    track.name = tracks[i].track.name
                    track.albumName = tracks[i].track.album.name
                    let artists = []
                    tracks[i].track.artists.forEach(artist => {
                      artists.push(artist.name)  
                    });
                    track.artists = artists
                    this.tracksData = [...this.tracksData, track]    
                }
            })
            .catch(err => console.log(err))
        },
        showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      }
    }
}
</script>

<style scoped>
    #playlist{
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        width: 100%;
        margin-top: 2em;
        
    }
    #list{
        padding: 0.5em;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 50%;
        }
    p{
        color: #000;
        text-decoration: none;
        border-color: #ccc;
        font-weight: bold;
        transition: all 0.2s ease-in-out 0s;
        
    }
    p:hover{
        cursor: pointer;
        transform: scale(.9)
    }
</style>
