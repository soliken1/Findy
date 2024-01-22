function searchText() {
    var searchInput = document.getElementById('searchbox').value;
    fetch('https://spotify23.p.rapidapi.com/search/?q=' + searchInput + '&type=multi&offset=0&limit=10&numberOfTopResults=3', {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'ad3ec5a369mshf5f01f7b784ff09p1a3634jsnf1989bcc621e',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        displayTrackInfo(data);
    })
    .catch(error => console.log(error));
}

function displayTrackInfo(data) {
    const tableBody = document.getElementById('table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = "";

    data.albums.items.forEach((item, index) => {
        const title = item.data.name;
        const artists = item.data.artists.items.map(artist => artist.profile.name).join(', ');
        const album = item.data.name;
        const coverArtUrl = item.data.coverArt.sources[0].url;

        const newRow = tableBody.insertRow();

        const coverCell = newRow.insertCell(0);
        const titleCell = newRow.insertCell(1);
        const albumCell = newRow.insertCell(2);

        const imgElement = document.createElement('img');
        imgElement.src = coverArtUrl;
        imgElement.width = 50;
        imgElement.height = 50;
        coverCell.appendChild(imgElement);

        titleCell.textContent = title;
        albumCell.textContent = album;

        newRow.addEventListener('click', function () {
            updateMainElements(item.data);
        });
    });

    if (data.albums.items.length > 0) {
        updateMainElements(data.albums.items[0].data);
    }
}

function updateMainElements(trackData) {
    const title = trackData.name;
    const artists = trackData.artists.items.map(artist => artist.profile.name).join(', ');
    const album = trackData.name;
    const coverArtUrl = trackData.coverArt.sources[0].url;

    const coverMain = document.getElementById('coverMain');
    const coverTandA = document.getElementById('trackInfo');
    const coverAlbum = document.getElementById('album');

    coverMain.setAttribute('src', coverArtUrl);
    coverTandA.textContent = artists + ' - ' + title;
    coverAlbum.textContent = album;
}