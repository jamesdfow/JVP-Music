//Prevents the form from submitting
document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('searchForm');
  if (searchForm) {
    searchForm.addEventListener('submit', async (event) => {
      //retrieves search query from the input field
      const searchQuery = searchForm.children[0].value;
      //prevents form from actually submitting
      event.preventDefault();
      let request = await executeArtistQuery(searchQuery);
      let artist = {};
      try {
        if (request) {
          let response = await request.json();
          artist = response.data;

          console.log('artist', artist);
        }
      } catch (e) {
        console.log(e);
      } finally {
        //   redirecting to page 2
        localStorage.setItem('artistId', `${artist.id}`);
        window.location.href = '/results';
      }
    });
  }
});

async function executeArtistQuery(searchTerm) {
  const apiEndpoint = '/api/v1/artists';
  const searchParams = new URLSearchParams({ artist_name: searchTerm });
  const fullUrl = `${apiEndpoint}?${searchParams}`;
  console.log('fullUrl', fullUrl);
  let artists = undefined;
  try {
    artists = await fetch(fullUrl);
  } catch (e) {
    console.log(e);
  }
  return artists;
}
