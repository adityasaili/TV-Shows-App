const showsContainer = document.getElementById("showsContainer");
const showInput = document.getElementById("showInput");
const msgContain = document.getElementById("msgContain");
const detailContainer = document.getElementById("detailContainer");
const homeLink = document.getElementById("homeLink");
const main = document.getElementById("main");

homeLink.onclick = () => {
    main.style.display = "flex";
    detailContainer.style.display = "none";
}


showInput.addEventListener("input", () => {    // refreshes when gets input

    showsContainer.innerHTML = "";      // Clear Previous Data
    value = showInput.value;            // Get Show-Input Value

    let req = new XMLHttpRequest();     // Send New Request

    let link = "https://api.tvmaze.com/search/shows?q=" + value;  // update link with input value

    req.open("GET", link);      // open request
    req.send();                 // send request
    req.onload = function () {  // execute if successfull

        // console.log(this);
        // console.log(JSON.parse(this.response));

        let arr = JSON.parse(this.response);    // make objects array

        for (let show of arr) {                 // loop array to create HTML elements

            // showBox - contains details of single shows
            let showBox = document.createElement("div");
            showBox.classList.add("showBox");
            showsContainer.appendChild(showBox);

            // showImg - show image
            let showImg = document.createElement("div");
            showImg.classList.add("showImg");

            let image = document.createElement("img");
            showImg.appendChild(image);

            showBox.appendChild(showImg);

            // showOptions - title, details button
            let showOptions = document.createElement("div");
            showOptions.classList.add("showOptions");

            let title = document.createElement("div");
            title.classList.add("title");
            let showDetailsBtn = document.createElement("button");
            showDetailsBtn.classList.add("showDetailsBtn");
            showDetailsBtn.id = "detailsBtn";
            showDetailsBtn.innerText = "Details 💪";


            showOptions.appendChild(title);
            showOptions.appendChild(showDetailsBtn);

            showBox.appendChild(showOptions);

            showDetailsBtn.onclick = () => {

                detailContainer.innerText = "";

                detailContainer.style.display = "flex";
                main.style.display = "none";

                let detailBack = document.createElement("div");
                detailBack.classList.add("detailBack");
                let pinkDetail = document.createElement("div");
                pinkDetail.classList.add("pinkDetail");
                let greyDetail = document.createElement("div");
                greyDetail.classList.add("greyDetail");
                detailBack.appendChild(pinkDetail);
                detailBack.appendChild(greyDetail);
                detailContainer.appendChild(detailBack);

                let detailPhotoDiv = document.createElement("div");
                detailPhotoDiv.classList.add("detailPhotoDiv");
                let detailImg = document.createElement("img");
                detailImg.classList.add("detailImg");
                detailPhotoDiv.appendChild(detailImg);
                detailContainer.appendChild(detailPhotoDiv);

                let detailMain = document.createElement("div");
                detailMain.classList.add("detailMain");

                let detailTitle = document.createElement("div");
                detailTitle.classList.add("detailTitle");

                // let detailHeart = document.createElement("button");
                // detailHeart.classList.add("detailHeart");
                // detailHeart.textContent = "🧡";

                detailMain.appendChild(detailTitle);
                // detailMain.appendChild(detailHeart);
                detailContainer.appendChild(detailMain);

                let detailSummary = document.createElement("div");
                detailSummary.classList.add("detailSummary");
                detailContainer.appendChild(detailSummary);

                detailImg.setAttribute("src", show.show.image.medium);
                detailTitle.innerText = show.show.name;
                detailSummary.innerHTML = show.show.summary;

            }


            // if image not available don't make ShowBox
            if (show.show.image === null) {
                showBox.style.display = "none";
            }
            else {
                // else set photo & title
                image.setAttribute("src", show.show.image.medium);
                title.innerText = show.show.name;
            }

        }

    }

    req.onerror = function () {       // executes if data is not fetched
        // console.log(this);
    }

});

