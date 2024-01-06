const dotenv = require('dotenv')

dotenv.config()

const mockarooURL = "https://api.mockaroo.com/api/generate.json?key="
const mocakrooApiKey = "ea0440b0";

async function getArtistsAndTracksList() {
    const response = await fetch(`${mockarooURL}${mocakrooApiKey}&array=true&schema=team-project-schema`, {
        method: "POST",
    })
    if (response.statusText == "OK"){
        const responseJson = await response.json();
        for (let i = 0; i < responseJson.length; i++){
            const str = responseJson[i].element;
            const splitted = str.split("-")
            const newElement = {
                name: splitted[0],
                song: splitted[1],
            }
            responseJson[i] = newElement;
        }
        return responseJson;
    } else {
        return response.status;
    }
}

module.exports = { getArtistsAndTracksList }