# Spotify Web App Backend
This is the backend for https://github.com/andrewlod/react-spotify-clone. It is an API that connects the frontend to the Spotify application while protecting the application key and secret needed to use Spotify Web API.

## Spotify Developer application
Make sure you have an application on Spotify Developer by logging into https://developer.spotify.com/dashboard/login. Once you are inside the application dashboard, copy the Client ID and Client Secret to the environment variables.

Make sure to setup your Redirect URI, which will be the route that Spotify will redirect the user to authenticate their account. This can be found by clicking on **Edit Settings > Redirect URIs**.

## Environment variables
The environment variable template can be found on the `.env.template` file. There you must copy the Spotify Client ID and Secret into the proper fields.
```env
CLIENT_ID=
CLIENT_SECRET=
EXPIRE_MARGIN=60
API_IP=https://api.spotify.com/v1
SV_PORT=8000
REDIRECT_URI=http://localhost:3000/callback
```
## Build and run
### `npm install` or `npm i`

Installs all dependencies required to run and build the project. This command must be run before any attempt to build or start the application.

### `npm start`

Runs the app in the development mode or production.

### `npm test`

Unit tests are currently not implemented in this project.