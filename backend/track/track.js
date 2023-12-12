const dotenv = require('dotenv')

dotenv.config()

const lostFmURI = "http://ws.audioscrobbler.com/2.0/?method="
const apiKey =  process.env.API_KEY;

async function getImageFromTrackName(author, track){
    const response = await fetch(`${lostFmURI}track.getInfo&api_key=${apiKey}&artist=${author}&track=${track}&format=json`)
    if (response.statusText == "OK"){
        const responseJson = await response.json();
        const images = responseJson.track.album.image;
        return images;
    } else {
        return response.status;
    }
}

module.exports = { getImageFromTrackName }