const SpotifyWebApi = require("spotify-web-api-node")

const scopes = "user-read-private user-read-email ugc-image-upload user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-private user-read-email user-follow-modify user-follow-read user-library-modify user-library-read streaming app-remote-control user-read-playback-position user-top-read user-read-recently-played playlist-modify-private playlist-read-collaborative playlist-read-private playlist-modify-public"

const params = {
    score: scopes
}

const queryParamsString = new URLSearchParams(params)
const LOGIN_URL = "https://accounts.spotify.com/authorize?" + queryParamsString.toString()

module.exports = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: "http://localhost:8000/callback"
})