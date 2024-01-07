async function loadArtistList() {
    const responce = await fetch("https://vinyl-store-olive.vercel.app/getArtistsAndNames");
    const data = await responce.json();
    return data;
}

async function getImage(artist, song) {
    const responce = await fetch(`https://vinyl-store-olive.vercel.app/getimage?author=${artist}&track=${song}`);
    const text = responce.text();
    return text;
}

function card(song_data) {
    return `
        <div class="grid__item">
            <div class="grid__item-flex shadow-s">
                <div class="grid__preview" id="${song_data.song}_image"></div>
                <div class="grid__title">
                    <h2 class="grid__title-name">${song_data.song}</h2>
                    <h3 class="grid__title-author">${song_data.name}</h3>
                </div>
            </div>
            <div class="grid__overlay">
                <div class="grid__overlay-items">
                    <h2 class="grid__overlay-price">
                        ${song_data.price}.99$
                    </h2>
                    <button class="grid__overlay-buy">
                        Buy
                    </button>
                </div>
            </div>
        </div>
    `
}

// fill
function fill_grid(row_element, data) {
    let result = "";
    data.forEach(element => {
        result += card(element);
    });

    row_element.innerHTML = result;
}

const new_grid = document.getElementById("new_arrivals");
const popular_grid = document.getElementById("popular");

async function addImages(data) {
    const imagesArr = data.map(({ name, song }) => getImage(name, song));
    const images = await Promise.all(imagesArr);

    const updatedData = data.map(( element, index ) => ({
        ...element,
        image: images[index],
    }));

    data.forEach((element, index) => {
        const image_block = document.getElementById(`${element.song}_image`)
        if (image_block != undefined) {
            image_block.setAttribute("style", "background-image: url(" + images[index] + ")")
        } else {
            console.log(element.song, element.name, "does not exist!")
        }
    })

    return updatedData
}

async function render() {
    const data = await loadArtistList(); // no images
    // const data = await addImages(no_images);
    const new_slice = data.slice(0, 5);
    const popular_slice = data.slice(5, 10);

    // console.log(new_slice)
    // console.log(popular_slice)

    fill_grid(new_grid, new_slice);
    fill_grid(popular_grid, popular_slice);

    addImages(data)
}

render();