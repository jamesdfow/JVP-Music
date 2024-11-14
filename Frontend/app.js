//Waits for the document to fully load before running the script
document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.getElementById("searchForm");

  //checks if the search form exists on the page
  if (searchForm) {
    searchForm.addEventListener("submit", function (event) {
      //prevents form from submitting and reloading the page
      event.preventDefault();
      //retrieves search query from the input field
      let searchQuery = document.getElementById("searchQuery").value;

      //storing search query in Local storage to access on the next page
      localStorage.setItem("searchQuery", searchQuery);
      //redirecting to page2.html after saving the query
      window.location.href = "page2.html";
    });
  }
});
