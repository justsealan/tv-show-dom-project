//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  // const ulElem = document.createElement("ul");
  // rootElem.appendChild(ulElem);
  //create row
  const rowElem = document.createElement("div");
  rowElem.classList.add("row");
  rowElem.classList.add("row-cols-4");
  rowElem.classList.add("g-4");
  rootElem.appendChild(rowElem);
  episodeList.forEach((episode) => {
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
    //season and episode number
    // const episodeInfo = document.createElement("h6");
    // episodeInfo.classList.add("card-subtitle");
    // episodeInfo.textContent = `Season ${episode.season} Episode ${episode.number}`;
    // divBodyElem.appendChild(episodeInfo);
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
