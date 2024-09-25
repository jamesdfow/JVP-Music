//Prevents the form from submitting
document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.getElementById("searchForm");
  if (searchForm) {
    searchForm.addEventListener("submit", function (event) {
      //prevents form from actually submitting
      event.preventDefault();
      //retrieves search query from the input field
      let searchQuery = document.getElementById("searchQuery").value;

      //storing search query in Local storage
      localStorage.setItem("searchQuery", searchQuery);
      //redirecting to page 2
      window.location.href = "page2.html";
    });
  }
});
