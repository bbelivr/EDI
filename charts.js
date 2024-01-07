async function loadArtistList() {
    const responce = await fetch("https://vinyl-store-olive.vercel.app/getArtistsAndNames");
    const data = await responce.json();
    return data;
}

async function createFirstChart(data){
    new Chart(
        document.getElementById('price_chart'),
        {
          type: 'bar',
          data: {
            labels: data.map(row => row.song),
            datasets: [
              {
                label: 'Price ($)',
                data: data.map(row => row.price)
              }
            ]
          }
        }
      );
}

async function createSecondChart(data){
    new Chart(
        document.getElementById('some_chart'),
        {
          type: 'line',
          data: {
            labels: data.map(row => row.song),
            datasets: [
              {
                label: 'Price ($)',
                data: data.map(row => row.price),
                borderColor: '#8c43d2',
                borderWidth: 2,
                fill: true,
              }
            ]
          }
        }
      );
}

async function render() {
    const data = await loadArtistList(); // no images
    await createFirstChart(data.slice(0, 7));
    await createSecondChart(data.slice(8, 15));
}

render();

