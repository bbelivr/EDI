const dotenv = require('dotenv')

dotenv.config()

const mockarooURL = "https://api.mockaroo.com/api/generate.json?key="
const mocakrooApiKey = "7a1b58b0"; // ea0440b0

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
                price: responseJson[i].price,
            }
            responseJson[i] = newElement;
        }
        return responseJson;
    } else {
        return response.status;
    }
}

module.exports = { getArtistsAndTracksList }