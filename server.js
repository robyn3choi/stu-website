const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const FormData = require('form-data');

// TODO: hide keys in .env
const clientId = "cc5cc78ad7b442b5af0335f7c7b623c2";
const clientSecret = "da8fada032394f319131f84493af556a";
const base64 = "Y2M1Y2M3OGFkN2I0NDJiNWFmMDMzNWY3YzdiNjIzYzI6ZGE4ZmFkYTAzMjM5NGYzMTkxMzFmODQ0OTNhZjU1NmE=";
let accessToken;

const furyId = '44Wi4QHWK4CzACCqCyxo3x';
const defqwopId = '0lfD4Ye7RAbP8FQiuE6aFs';
const intercomId = '6cHi0QWaBxWN71YpvTR4Jr';

const app = express();
app.use(bodyParser.json());
app.use(cors()); 

// app.get('/', (req, res) => {
//   fetch('https://accounts.spotify.com/api/token', {
//     method: 'post',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded', 
//       'Authorization': `Basic ${base64}`,
//     }, 
//     body: 'grant_type=client_credentials'
//   })
//   .then(response => response.json())
//   .then(json => {
//     if (json.access_token) {
//       accessToken = json.access_token;
//       console.log(accessToken);
//     }
//   })
//   .catch(error => console.error(error));
// });


app.get('/spotify', async (req, res, next) => {
  try {
    await getSpotifyAccessToken();

    const furyFollowers = getFollowers(furyId);
    const defqwopFollowers = getFollowers(defqwopId);
    const intercomFollowers = getFollowers(intercomId);

    Promise.all([furyFollowers, defqwopFollowers, intercomFollowers])
      .then(results => {
        const totalFollowers = results.reduce((a, b) => a + b);
        res.send({totalFollowers: totalFollowers});
      });
  }
  catch(err) {
    next(err);
  }
});


const getSpotifyAccessToken = () => {
  return fetch('https://accounts.spotify.com/api/token', {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded', 
      'Authorization': `Basic ${base64}`,
    }, 
    body: 'grant_type=client_credentials'
  })
  .then(response => response.json())
  .then(json => accessToken = json.access_token)
  .catch(error => console.error(error));
}


const getFollowers = () => {
  return fetch(`https://api.spotify.com/v1/artists/${furyId}`, {
    method: 'get',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    } 
  })
  .then(response => response.json())
  .then(json => json.followers.total)
  .catch(error => console.error(error));  
}
 

app.listen(3000);  