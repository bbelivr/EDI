const dotenv = require('dotenv')

dotenv.config()

const lostFmURI = "http://ws.audioscrobbler.com/2.0/?method="
// const apiKey =  process.env.API_KEY;
const apiKey = '94e6d3bbb7108bdd9c22fbf74fd1e474'

async function getImageFromTrackName(author, track){
    const response = await fetch(`${lostFmURI}track.getInfo&api_key=${apiKey}&artist=${author}&track=${track}&format=json`)
    if (response.statusText == "OK") {
        const responseJson = await response.json();
        console.log(responseJson.track)
        const images = responseJson?.track?.album?.image[1]['#text'] ?? "no image"; 
        return images;
    } else {
        return response.status;
    }
}

module.exports = { getImageFromTrackName }