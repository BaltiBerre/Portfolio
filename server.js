import 'dotenv/config';
import express from 'express';
import axios from 'axios';
import cors from 'cors';

// At the top of your server.js file
const wordsToFilter = ['ass', 'marihuana', 'weed', 'cocaine', 'explicit']; // Add more words as needed

function censorTitle(title) {
  let censoredTitle = title;
  wordsToFilter.forEach(word => {
    const regex = new RegExp(word, 'gi');
    censoredTitle = censoredTitle.replace(regex, '*'.repeat(word.length));
  });
  return censoredTitle;
}


async function getHistoricalEvent() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const year = today.getFullYear() - 100;
  
  const url = `https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${month}/${day}`;
  
  try {
    const response = await axios.get(url);
    const events = response.data.events;
    const event = events.find(e => e.year === year) || events.find(e => Math.abs(e.year - year) < 5 || events(e => e.day === day));
    return event ? `On this day in ${event.year}: ${event.text}` : 'No significant event found for this day 100 years ago.';
  } catch (error) {
    console.error('Error fetching historical event:', error);
    return 'Unable to fetch historical event.';
  }
}


function isInappropriate(track) {
  const lowercaseTitle = track.name.toLowerCase();
  return wordsToFilter.some(word => lowercaseTitle.includes(word)) || track.explicit;
}

const app = express();
app.use(cors());

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

let accessToken = null;

async function refreshAccessToken() {
    console.log("Refresh Token:", REFRESH_TOKEN);
    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', 
            new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: REFRESH_TOKEN,
            }), {
                headers: {
                    'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        accessToken = response.data.access_token;
        console.log("New Access Token:", accessToken);
        setTimeout(refreshAccessToken, (response.data.expires_in - 60) * 1000);
    } catch (error) {
        console.error('Error refreshing access token:', error.response ? error.response.data : error);
        setTimeout(refreshAccessToken, 60000);
    }
}

refreshAccessToken(); // Initial token refresh

// Root route
app.get('/', (req, res) => {
    res.send('Spotify API server is running');
});

// Check authentication status
app.get('/check-auth', (req, res) => {
    res.json({ isAuthenticated: !!accessToken });
});


app.get('/top-tracks', async (req, res) => {
    if (!accessToken) {
      return res.status(503).json({ error: 'Service unavailable' });
    }
    try {
      const response = await axios.get('https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10', {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      
      const topTracks = response.data.items
        .filter(track => !isInappropriate(track))
        .slice(0, 5)
        .map(track => ({
          name: censorTitle(track.name),
          artist: track.artists[0].name,
          albumArt: track.album.images[0]?.url
        }));
  
      console.log('Tracks with album art:', topTracks);
      res.json(topTracks);
    } catch (error) {
      console.error('Error fetching top tracks:', error.response?.data || error.message);
      res.status(400).json({ error: 'Failed to fetch top tracks' });
    }
  });

app.get('/login', (req, res) => {
    const scope = 'user-top-read';
    res.redirect('https://accounts.spotify.com/authorize?' +
        new URLSearchParams({
            response_type: 'code',
            client_id: CLIENT_ID,
            scope: scope,
            redirect_uri: 'http://localhost:5000/callback'
        }));
});

app.get('/callback', async (req, res) => {
    const code = req.query.code;
    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', 
            new URLSearchParams({
                code: code,
                redirect_uri: 'http://localhost:5000/callback',
                grant_type: 'authorization_code'
            }), {
                headers: {
                    'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        
        const { access_token, refresh_token } = response.data;
        // Store these tokens securely
        console.log('Refresh Token:', refresh_token);
        res.send('Authorization successful! You can close this window.');
    } catch (error) {
        console.error('Error in callback:', error);
        res.status(500).send('Authorization failed');
    }
});

// HISTORICAL EVENT
app.get('/historical-event', async (req, res) => {
    try {
      const event = await getHistoricalEvent();
      res.json({ event });
    } catch (error) {
      console.error('Error in historical event endpoint:', error);
      res.status(500).json({ error: 'Failed to fetch historical event' });
    }
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));