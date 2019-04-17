import express from 'express';
import querystring from 'querystring';
import request from 'request';

const router = express.Router();
const redirectUri = process.env.SPOTIFY_REDIRECT_URI || 'http://localhost:8000/spotify/callback';

router.get('/login', (req, res) => {
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      client_id: process.env.SPOTIFY_CLIENT_ID,
      response_type: process.env.SPOTIFY_RESPONSE_TYPE,
      redirect_uri: redirectUri
    })
  );
});

router.get('/callback', (req, res) => {
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      grant_type: process.env.SPOTIFY_GRANT_TYPE,
      code: req.query.code || null,
      redirect_uri: redirectUri
    },
    headers: {
      'Authorization': 'Basic ' + Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    res.cookie('spotifyAccessToken', body.access_token);
    res.redirect(`http://localhost:3000`);
  });
});

export default router;
