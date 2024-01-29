let searchInputEL = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResults(result) {
    let {
        title,
        link,
        description
    } = result
    //1, Div Element cl-result-item
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item")
    //append to search result 
    searchResultsEl.appendChild(resultItemEl)
    //2.anchor anchor
    let resultTitleEl = document.createElement("a");
    resultTitleEl.classList.add("result-title")
    resultTitleEl.textContent = title
    resultTitleEl.href = link
    resultTitleEl.target = "_blank";
    resultItemEl.appendChild(resultTitleEl)
    //3.title break
    let titleBreakEl = document.createElement("br")
    resultTitleEl.appendChild(titleBreakEl)
    //4 anchor Element-- result-url
    let urlElement = document.createElement("a")
    urlElement.classList.add("result-url")
    urlElement.href = link
    urlElement.textContent = link
    urlElement.target = "_blank";
    resultItemEl.appendChild(urlElement)
    //5. Link break
    let lineBreakEl = document.createElement("br")
    resultItemEl.appendChild(lineBreakEl)
    //6. decription paragraph Element--line-description
    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("link-description")
    descriptionEl.textContent = description
    resultItemEl.appendChild(descriptionEl)
}

function displayResults(searchresults) {
    spinnerEl.classList.toggle("d-none");
    for (let result of searchresults) {
        createAndAppendSearchResults(result);
    }
}

function wikipediaSearch(event) {
    if (event.key === "Enter") {
        searchResultsEl.textContent = "";
        spinnerEl.classList.toggle("d-none");
        let searchInput = searchInputEL.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        }
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results)
            });
    }
}
searchInputEL.addEventListener("keydown", wikipediaSearch);