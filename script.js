//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}
//function for getting episodes
function makePageForEpisodes(episodeList) {
  createEl(episodeList);
  searchBar();
  dropdown();
}
//function for dropdown
function dropdown() {
  const dropdown = document.getElementsByClassName("form-select")[0];
  const allEpisodes = getAllEpisodes();
  dropdown.addEventListener("change", (event) => {
    const selected = event.target.value;
    const filteredEpisodes = allEpisodes.filter((episode) => {
      return episode.id === parseInt(selected);
    });
    const rowElem = document.getElementsByClassName("row")[0];
    rowElem.innerHTML = "";
    createEl(filteredEpisodes);
  });
  //Selecting All Episodes option will bring all episodes back
  dropdown.addEventListener("change", (event) => {
    if (event.target.value === "All Episodes") {
      const rowElem = document.getElementsByClassName("row")[0];
      rowElem.innerHTML = "";
      createEl(allEpisodes);
    }
  });
}

//function for search bar
function searchBar() {
  const searchBar = document.getElementById("search");
  const allEpisodes = getAllEpisodes();
  searchBar.addEventListener("keyup", (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredEpisodes = allEpisodes.filter((episode) => {
      return (
        episode.name.toLowerCase().includes(searchTerm) ||
        episode.summary.toLowerCase().includes(searchTerm)
      );
    });
    createEl(filteredEpisodes);
  });
}

//function for creating elements
function createEl(episodeList) {
  const episodeText = document.getElementById("basic-addon2");
  episodeText.textContent = `Displaying ${episodeList.length}/ ${
    getAllEpisodes().length
  } episode(s)`;
  episodeList.forEach((episode) => {
    const rowElem = document.getElementsByClassName("row")[0];
    //create dropdown
    const dropdown = document.getElementsByClassName("form-select")[0];
    const option = document.createElement("option");
    option.value = episode.id;
    option.textContent = `S${episode.season
      .toString()
      .padStart(2, "0")}E${episode.number.toString().padStart(2, "0")} ${
      episode.name
    }`;
    dropdown.appendChild(option);

    //create grid style bootstrap card
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
    imgElem.src = episode.image.medium;
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
