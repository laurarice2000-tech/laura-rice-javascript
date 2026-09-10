// Select HTML elements
const catResults = document.getElementById("cat-results");
const catInfo = document.getElementById("cat-info");
const exploreCatsLink = document.getElementById("explore-cats-link");
const catDetailsSection = document.getElementById("cat-details");
const menuButton = document.getElementById("menu-button");
const navMenu = document.querySelector("nav ul");

// Handle hamburger menu
menuButton.addEventListener("click", function() {
    if (navMenu.style.display === "flex") {
        navMenu.style.display = "none";
    }
    else {
        navMenu.style.display = "flex";
    }
});

// Display the selected cat's details
function displayCatDetails(data) {
    catInfo.textContent = "";

    const detailImage = document.createElement("img");
    detailImage.src = data.url;
    detailImage.alt = "Selected cat image";
    catInfo.appendChild(detailImage);

    // Check for breed information and display available details
    if (data.breeds.length > 0) {
        const breed = data.breeds[0];

        const breedName = document.createElement("h3");
        breedName.textContent = "Breed: " + breed.name;
        catInfo.appendChild(breedName);

        const breedGroup = document.createElement("p");
        breedGroup.textContent = "Breed Group: " + breed.breed_group;
        catInfo.appendChild(breedGroup);

        const temperamentText = document.createElement("p");
        temperamentText.textContent = "Temperament: " + breed.temperament;
        catInfo.appendChild(temperamentText);

        const origin = document.createElement("p");
        origin.textContent = "Origin: " + breed.origin;
        catInfo.appendChild(origin);

        const lifeSpan = document.createElement("p");
        lifeSpan.textContent = "Life Span: " + breed.life_span;
        catInfo.appendChild(lifeSpan);

        const description = document.createElement("p");
        description.textContent = "Description: " + breed.description;
        catInfo.appendChild(description);

        const history = document.createElement("p");
        history.textContent = "History: " + breed.history;
        catInfo.appendChild(history);
    } else {
        const noBreedInfo = document.createElement("p");
        noBreedInfo.textContent = "Breed information isn't available.";
        catInfo.appendChild(noBreedInfo);
    }
}

// ----- ENDPOINT 1: CAT IMAGE SEARCH -----

// Cat image search URL
const searchURL = "https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&limit=6";

// API request options
const requestOptions = {
    method: "GET",
    headers: {
        "x-api-key": "live_KcKz112YhgHDjzFW8h1S9BCLUHjIC5OyFftHxvAQyAlZXWo2ykAScieo0gpoPP9f"
    }
};

// Handle Explore Cats navigation
exploreCatsLink.addEventListener("click", () => {
    // Fetch new cat images
    fetch(searchURL, requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch cats.");
            }

            return response.json();
        })
        .then((data) => {
            catResults.textContent = "";
            catInfo.textContent = "";

            data.forEach((cat) => {
                const newCatImage = document.createElement("img");
                newCatImage.src = cat.url;
                newCatImage.alt = "Cat image";

                // Handle selection of a new cat
                newCatImage.addEventListener("click", () => {
                    const detailURL = `https://api.thecatapi.com/v1/images/${cat.id}`;

                    fetch(detailURL, requestOptions)
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error("Failed to fetch cat details.");
                            }

                            return response.json();
                        })
                        .then((data) => {
                            displayCatDetails(data);

                            // Jump to the Cat Details section
                            catDetailsSection.scrollIntoView();
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                });
                catResults.appendChild(newCatImage);
            });
        })
        .catch((error) => {
            console.error(error);
        });
});

// Request initial cat images
fetch(searchURL, requestOptions)
    .then((response) => {
        if (!response.ok) {
            throw new Error("Failed to fetch cats.");
        }

        return response.json();
    })
    .then((data) => {
        data.forEach((cat) => {
            const catImage = document.createElement("img");

            catImage.src = cat.url;
            catImage.alt = "Cat image";

            // Handle selection of a cat
            catImage.addEventListener("click", () => {
                // ----- ENDPOINT 2: SELECTED CAT DETAILS -----
                const detailURL = `https://api.thecatapi.com/v1/images/${cat.id}`;

                fetch(detailURL, requestOptions)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Failed to fetch cat details.");
                        }

                        return response.json();
                    })
                    .then((data) => {
                        displayCatDetails(data);

                        // Jump to the Cat Details section
                        catDetailsSection.scrollIntoView();
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            });

            catResults.appendChild(catImage);
        });
    })
    .catch((error) => {
        console.error(error);
    });