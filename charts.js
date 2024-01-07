async function loadArtistList() {
    const responce = await fetch("https://vinyl-store-olive.vercel.app/getArtistsAndNames");
    const data = await responce.json();
    return data.slice(0, 7);
}

async function getPriceChartData(data) {
    const chart_data = []
    for (const element of data){
        chart_data.push({
            song: element.song,
            price: element.price,
        })
    }
    return chart_data;
}

async function createChart(data){
    new Chart(
        document.getElementById('price_chart'),
        {
          type: 'bar',
          data: {
            labels: data.map(row => row.song),
            datasets: [
              {
                label: 'Price',
                data: data.map(row => row.price)
              }
            ]
          }
        }
      );
}

async function render() {
    const data = await loadArtistList(); // no images
    const price_chart_data = getPriceChartData(data);
    await createChart(data);
}

render();

