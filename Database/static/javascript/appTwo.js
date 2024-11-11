document.addEventListener('DOMContentLoaded', async () => {
  const resultsContainer = document.getElementById('results');
  if (resultsContainer) {
    const artistId = localStorage.getItem('artistId');
    console.log('localStorage', artistId);
    if (artistId) {
      const request = await getAlbums(artistId);
      let albums = {};
      try {
        const response = await request.json();
        albums = response.data;
        if (albums.length) {
          const albumListContainer = document.createElement('div');
          albumListContainer.innerText =
            'We found the following albums in our database:';
          albums.forEach((album) => {
            const listElement = document.createElement('li');
            listElement.innerText = album.title;
            albumListContainer.appendChild(listElement);
          });
          resultsContainer.appendChild(albumListContainer);
        }
        console.log('albums', albums);
      } catch (e) {
        console.log(e);
      }
    }
  }
});

async function getAlbums(artistId) {
  const apiEndpoint = '/api/v1/albums';
  const searchParams = new URLSearchParams({ artist_id: Number(artistId) });
  const fullUrl = `${apiEndpoint}?${searchParams}`;
  let albums = undefined;
  try {
    albums = await fetch(fullUrl);
  } catch (e) {
    console.log(e);
  }
  return albums;
}
