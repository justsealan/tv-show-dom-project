// You can edit ALL of the code here
function setup() {
  const tvShows = getAllShows();
  tvShowsDropdown(tvShows);
}
var count = 0;
//function for tv shows dropdown
function tvShowsDropdown(tvShows) {
  //dropdown for tv shows
  const dropdownTV = document.getElementsByClassName("form-select")[0];
  //show select must list shows in alphabetical order, case-insensitive.
  tvShows.sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  });
  //add shows to dropdown
  tvShows.forEach((show) => {
    const option = document.createElement("option");
    option.value = show.id;
    option.textContent = show.name;
    dropdownTV.appendChild(option);
  });
  dropdownTV.addEventListener("change", (event) => {
    const rowElem = document.getElementsByClassName("row")[0];
    rowElem.innerHTML = "";
    const selectedShow = tvShows.find(
      (show) => show.id === Number(event.target.value)
    );
    //clear the episodes dropdown
    const dropdownEpisodes = document.getElementsByClassName("form-select")[1];
    dropdownEpisodes.innerHTML = "";
    //add all episodes to dropdown
    const allEpisodes = document.createElement("option");
    allEpisodes.value = "All Episodes";
    allEpisodes.textContent = "All Episodes";
    dropdownEpisodes.appendChild(allEpisodes);

    fetch(`https://api.tvmaze.com/shows/${selectedShow.id}/episodes`).then(
      (response) =>
        response.json().then((data) => {
          count++;
          console.log(count);
          makePageForEpisodes(data);
          dropdown(data);
          searchBar(data);
        })
    );
  });
}

//function for episodes dropdown
function dropdown(episodeList) {
  const dropdown = document.getElementsByClassName("form-select")[1];
  dropdown.addEventListener("change", (event) => {
    const selected = event.target.value;
    const filteredEpisodes = episodeList.filter((episode) => {
      return episode.id === parseInt(selected);
    });
    const rowElem = document.getElementsByClassName("row")[0];
    rowElem.innerHTML = "";
    makePageForEpisodes(filteredEpisodes);
  });
  //Selecting All Episodes option will bring all episodes back
  dropdown.addEventListener("change", (event) => {
    if (event.target.value === "All Episodes") {
      const rowElem = document.getElementsByClassName("row")[0];
      rowElem.innerHTML = "";
      makePageForEpisodes(episodeList);
    }
  });
}

//function for search bar
function searchBar(episodeList) {
  const episodeText = document.getElementById("basic-addon2");
  episodeText.textContent = `Got ${episodeList.length} episode(s)`;
  const searchBar = document.getElementById("search");
  searchBar.addEventListener("keyup", (event) => {
    const searchTerm = event.target.value.toLowerCase();
    let search = episodeList.filter((episode) => {
      return (
        episode.name.toLowerCase().includes(searchTerm) ||
        episode.summary.toLowerCase().includes(searchTerm)
      );
    });
    const rowElem = document.getElementsByClassName("row")[0];
    rowElem.innerHTML = "";
    episodeText.textContent = `Displaying ${search.length}/${episodeList.length} episode(s)`;
    makePageForEpisodes(search);
  });
}

//function for creating elements
function makePageForEpisodes(episodeList) {
  episodeList.forEach((episode) => {
    const rowElem = document.getElementsByClassName("row")[0];
    //create dropdown for the episodes
    const dropdown = document.getElementsByClassName("form-select")[1];
    const option = document.createElement("option");
    option.value = episode.id;
    option.textContent = `S${episode.season
      .toString()
      .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")} ${
      episode.name
    }`;
    dropdown.appendChild(option);

    //create grid style bootstrap cards
    //create col
    const colElem = document.createElement("div");
    colElem.classList.add("col");
    rowElem.appendChild(colElem);
    //div card
    const divElem = document.createElement("div");
    divElem.classList.add("card");
    divElem.classList.add("h-100");
    divElem.classList.add("text-center");
    divElem.style.width = "25rem";
    colElem.appendChild(divElem);
    //img
    const imgElem = document.createElement("img");
    imgElem.classList.add("card-img-top");
    if (episode.image !== null) {
      imgElem.src = episode.image.medium;
    } else {
      imgElem.src =
        "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
    }
    divElem.appendChild(imgElem);
    //div-body
    const divBodyElem = document.createElement("div");
    divBodyElem.classList.add("card-body");
    divElem.appendChild(divBodyElem);
    //title
    const episodeTitle = document.createElement("h5");
    episodeTitle.classList.add("card-title");
    episodeTitle.textContent = episode.name;
    divBodyElem.appendChild(episodeTitle);
    //summary
    const episodeSummary = document.createElement("p");
    episodeSummary.classList.add("card-text");
    episodeSummary.innerHTML = episode.summary;
    divBodyElem.appendChild(episodeSummary);
    //card footer
    const cardFooter = document.createElement("div");
    cardFooter.classList.add("card-footer");
    cardFooter.classList.add("text-muted");
    divElem.appendChild(cardFooter);
    //ul for episode code
    const episodeCode = document.createElement("ul");
    episodeCode.classList.add("list-group");
    episodeCode.classList.add("list-group-flush");
    cardFooter.appendChild(episodeCode);
    //episode code
    const episodeCodeElem = document.createElement("li");
    episodeCodeElem.classList.add("list-group-item");
    episodeCodeElem.textContent = `S${episode.season
      .toString()
      .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")}`;
    episodeCode.appendChild(episodeCodeElem);
    //episode url
    const sourceElem = document.createElement("li");
    sourceElem.classList.add("list-group-item");
    sourceElem.textContent = "Source: TVMaze.com";
    episodeCode.appendChild(sourceElem);
    //button for url
    const urlButton = document.createElement("a");
    urlButton.classList.add("btn");
    urlButton.classList.add("btn-primary");
    urlButton.href = episode.url;
    urlButton.target = "_blank";
    urlButton.textContent = "Episode Page";
    cardFooter.appendChild(urlButton);
  });
}
window.onload = setup;