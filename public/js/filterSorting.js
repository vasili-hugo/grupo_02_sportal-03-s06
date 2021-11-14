window.onload = function () {

  let form = document.querySelector("#form-search-submit");
  form.addEventListener("submit", function(e) {
    e.preventDefault();
  });

  let inputSearch = document.querySelector(".header-search-input");
  inputSearch.addEventListener("change", function(e) {
    e.preventDefault();
    updateQuery();
  });

  let filter = document.querySelector("#filter-options");
  filter.addEventListener("change", function(e) {
    updateQuery();
  });

  let sort = document.querySelector("#sort-options");
  sort.addEventListener("change", function(e) {
    updateQuery();
  });

  function updateQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(inputSearch.value + ", " + filter.value + ", " + sort.value)
    urlParams.set('searchString', inputSearch.value);
    if (filter.value.length > 0) {
      urlParams.set('filter', filter.value);
    } else {
      urlParams.delete('filter');
    }
    if (sort.value.length > 0) {
      urlParams.set('sort', sort.value);
    } else {
      urlParams.delete('sort');
    }
    window.location.search = urlParams;
  }
}