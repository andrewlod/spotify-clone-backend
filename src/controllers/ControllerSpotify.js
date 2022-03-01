const axios = require("axios")
const { API_IP } = process.env

class ControllerSpotify {
    constructor() {
    }

    handleRequest() {
        return async (req, res) => {
            const options = {
                headers: { "Authorization": req.body.token, "Content-Type": "application/json" }
            }
            axios.get(API_IP + "/search?type=album&limit=20&q=" + req.body.query, {headers: options.headers}).then((response) => {
                res.json(response.data.albums.items)
            }).catch(err => {
                console.log(err)
            })
        }
    }

    handleAlbumTracks() {
        return async(req, res) => {
            console.log(req.body.token)
            const options = {
                headers: { "Authorization": req.body.token, "Content-Type": "application/json" }
            }
            axios.get(`${API_IP}/albums/${req.body.id}/tracks`, {headers: options.headers}).then((response) => {
                res.json(response.data.items)
            }).catch(err => {
                console.log(err)
            })
        }
    }

    handleAlbum() {
        return async(req, res) => {
            const options = {
                headers: { "Authorization": req.body.token, "Content-Type": "application/json" }
            }
            axios.get(`${API_IP}/albums/${req.body.id}`, {headers: options.headers}).then((response) => {
                res.json(response.data)
            }).catch(err => {
                console.log(err)
            })
        }
    }
}

module.exports = new ControllerSpotify()