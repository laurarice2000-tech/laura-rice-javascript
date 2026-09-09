// Select HTML elements
const catResults = document.getElementById("cat-results");
const catInfo = document.getElementById("cat-info");
const exploreCatsLink = document.getElementById("explore-cats-link");
const catDetailsSection = document.getElementById("cat-details");

// Select the hamburger menu button
const menuButton = document.getElementById("menu-button");

// Select the navigation menu
const navMenu = document.querySelector("nav ul");

// Handle hamburger menu clicks
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
    // Clear the previous cat details
    catInfo.textContent = "";

    // Display the selected cat's image
    const detailImage = document.createElement("img");
    detailImage.src = data.url;
    catInfo.appendChild(detailImage);

    // Check for breed information and display available details
    if (data.breeds.length > 0) {
        const breed = data.breeds[0];

        // Display breed name
        const breedName = document.createElement("h3");
        breedName.textContent = "Breed: " + breed.name;
        catInfo.appendChild(breedName);

        // Display breed group
        const breedGroup = document.createElement("p");
        breedGroup.textContent = "Breed Group: " + breed.breed_group;
        catInfo.appendChild(breedGroup);

        // Display temperament
        const temperamentText = document.createElement("p");
        temperamentText.textContent = "Temperament: " + breed.temperament;
        catInfo.appendChild(temperamentText);

        // Display origin
        const origin = document.createElement("p");
        origin.textContent = "Origin: " + breed.origin;
        catInfo.appendChild(origin);

        // Display life span
        const lifeSpan = document.createElement("p");
        lifeSpan.textContent = "Life Span: " + breed.life_span;
        catInfo.appendChild(lifeSpan);

        // Display description
        const description = document.createElement("p");
        description.textContent = "Description: " + breed.description;
        catInfo.appendChild(description);

        // Display history
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

// Store the API URL for the cat image search request
const searchURL = "https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&limit=6";

// Set up the API request options
const requestOptions = {
    method: "GET",
    headers: {
        "x-api-key": "live_KcKz112YhgHDjzFW8h1S9BCLUHjIC5OyFftHxvAQyAlZXWo2ykAScieo0gpoPP9f"
    }
};

// Handle Explore Cats navigation
exploreCatsLink.addEventListener("click", () => {

    // Request new cat images
    fetch(searchURL, requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch cats.");
            }

            return response.json();
        })
        .then((data) => {

            // Clear the previous cat images
            catResults.textContent = "";

            // Clear the previous cat details
            catInfo.textContent = "";

            data.forEach((cat) => {

                // Create an image element for each new cat
                const newCatImage = document.createElement("img");

                // Set the image source to the new cat's URL
                newCatImage.src = cat.url;

                // Handle selection of a new cat
                newCatImage.addEventListener("click", () => {

                    // Create the detail URL for the selected new cat
                    const detailURL = `https://api.thecatapi.com/v1/images/${cat.id}`;

                    // Request details for the selected new cat
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

                // Append the new cat image to the gallery
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

            // Create an image element for each cat
            const catImage = document.createElement("img");

            // Set the image source to the cat's URL
            catImage.src = cat.url;

            // Handle selection of a cat
            catImage.addEventListener("click", () => {

                // ----- ENDPOINT 2: SELECTED CAT DETAILS -----

                // Create the detail URL for the selected cat
                const detailURL = `https://api.thecatapi.com/v1/images/${cat.id}`;

                // Request details for the selected cat
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