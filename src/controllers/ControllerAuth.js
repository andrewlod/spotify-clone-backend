const request = require("request")
const querystring = require("querystring")

const { CLIENT_ID, CLIENT_SECRET, EXPIRE_MARGIN, REDIRECT_URI } = process.env

class ControllerSpotify {
    constructor() {
        this._client_id = CLIENT_ID
        this._client_secret = CLIENT_SECRET
        this._token = null
        this._last_token_time = null
        this._token_expire_time = 3600
    }

    getUserToken(){
        return async (req, res) => {
            console.log("Getting user token")
            var code = req.query.code || null;
            var state = req.query.state || null;
          
            if (state === null) {
              res.redirect('/#' +
                querystring.stringify({
                  error: 'state_mismatch'
                }));
            } else {
              var authOptions = {
                url: 'https://accounts.spotify.com/api/token',
                form: {
                  code: code,
                  redirect_uri: REDIRECT_URI,
                  grant_type: 'authorization_code'
                },
                headers: {
                  'Authorization': 'Basic ' + (new Buffer(this._client_id + ':' + this._client_secret).toString('base64'))
                },
                json: true
              };
              request.post(authOptions, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                  var access_token = body.access_token;
                  res.redirect("/?" + querystring.stringify({
                    'access_token': access_token
                  }));
                }
              })
            }

        }
    }

    authenticateUser(){
        return async (req, res) => {  
            console.log("Authenticating user")
            var state = "1234567890123456";
            var scope = 'streaming user-read-email user-read-private user-modify-playback-state user-read-playback-state user-read-playback-position user-read-currently-playing app-remote-control';
          
            res.redirect('https://accounts.spotify.com/authorize?' +
              querystring.stringify({
                response_type: 'code',
                client_id: this._client_id,
                scope: scope,
                redirect_uri: REDIRECT_URI,
                state: state
              }));

        }
    }

    _authenticate() {
        return new Promise(resolve => {
            var authOptions = {
                url: 'https://accounts.spotify.com/api/token',
                headers: {
                    'Authorization': 'Basic ' + (new Buffer(this._client_id + ':' + this._client_secret).toString('base64'))
                },
                form: {
                    grant_type: 'client_credentials'
                },
                json: true
            }

            request.post(authOptions, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    resolve({token: body.access_token, expire_time: body.expires_in - parseInt(EXPIRE_MARGIN), timestamp: new Date()})
                }
            })
        })
    }

    authenticate() {
        return async (req, res, next) => {
            var now = new Date()

            if (this._token == null || now.getTime() >= this._last_token_time.getTime() + this._token_expire_time) {
                await this._authenticate().then(response => {
                    this._token = `Bearer ${response.token}`
                    this._token_expire_time = response.expire_time
                    this._last_token_time = response.timestamp
                })
            }

            req.body.token = this._token
            next()
            
        }
    }
}

module.exports = new ControllerSpotify()