const dotenv = require('dotenv')

dotenv.config()

const lostFmURI = "http://ws.audioscrobbler.com/2.0/?method="
// const apiKey =  process.env.API_KEY;
const apiKey = '94e6d3bbb7108bdd9c22fbf74fd1e474'

async function getImageFromTrackName(author, track){
    const response = await fetch(`${lostFmURI}track.getInfo&api_key=${apiKey}&artist=${author}&track=${track}&format=json`)
    if (response.statusText == "OK") {
        const responseJson = await response.json();
        const images = responseJson?.track?.album?.image[3]['#text'] ?? "https://media.tate.org.uk/aztate-prd-ew-dg-wgtail-st1-ctr-data/images/malevich5_0_EI2bD0b.width-340.jpg"; 
        return images;
    } else {
        return response.status;
    }
}

module.exports = { getImageFromTrackName }