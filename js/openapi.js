// Test JavaScript connection
console.log("Open API JavaScript is working.");

// Select containers for cat results and cat information
const catResults = document.getElementById("cat-results");
const catInfo = document.getElementById("cat-info");

// Test HTML element selection
console.log(catResults);
console.log(catInfo);

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

// Request and process cat data from TheCatAPI
fetch(searchURL, requestOptions)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);

        data.forEach((cat) => {
            console.log(cat);

            // Create an image element for each cat
            const catImage = document.createElement("img");

            // Set the image source to the cat's URL
            catImage.src = cat.url;

            // Identify the selected cat
            catImage.addEventListener("click", () => {
                console.log(cat.id);

                // ----- ENDPOINT 2: SELECTED CAT DETAILS -----

                // Create the detail URL for the selected cat
                const detailURL = `https://api.thecatapi.com/v1/images/${cat.id}`;

                console.log(detailURL);

                // Request details for the selected cat
                fetch(detailURL, requestOptions)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        console.log(data);

                        // Create an image element for the selected cat
                        const detailImage = document.createElement("img");

                        // Set the image source to the selected cat's URL
                        detailImage.src = data.url;
                        console.log(detailImage);

                        // Add the selected cat's image to the details section
                        catInfo.appendChild(detailImage);

                        // Get the selected cat's breed name
                        console.log("Breed:", data.breeds[0].name);

                        const breedName = document.createElement("h3");
                        breedName.textContent = "Breed: " + data.breeds[0].name;
                        console.log(breedName);

                        // Add the breed name to the details section
                        catInfo.appendChild(breedName);

                        // Get the selected cat's breed group
                        console.log("Breed Group: ", data.breeds[0].breed_group);

                        const breedGroup = document.createElement("p");
                        breedGroup.textContent = "Breed Group: " + data.breeds[0].breed_group;
                        console.log(breedGroup);

                        // Add the breed group to the details section
                        catInfo.appendChild(breedGroup);

                        // Get the selected cat's temperament
                        console.log("Temperament: ", data.breeds[0].temperament);

                        const temperamentText = document.createElement("p");
                        temperamentText.textContent = "Temperament: " + data.breeds[0].temperament;
                        console.log(temperamentText);

                        // Add the temperament to the details section
                        catInfo.appendChild(temperamentText);

                        // Get the selected cat's origin
                        console.log("Origin: ", data.breeds[0].origin);

                        const origin = document.createElement("p");
                        origin.textContent = "Origin: " + data.breeds[0].origin;
                        console.log(origin);

                        // Add the origin to the details section
                        catInfo.appendChild(origin);

                        // Get the selected cat's life span
                        console.log("Life Span: ", data.breeds[0].life_span);

                        const lifeSpan = document.createElement("p");
                        lifeSpan.textContent = "Life Span: " + data.breeds[0].life_span;
                        console.log(lifeSpan);

                        // Add the lifespan to the details section
                        catInfo.appendChild(lifeSpan);

                        // Get the selected cat's description
                        console.log("Description: ", data.breeds[0].description);

                        const description = document.createElement("p");
                        description.textContent = "Description: " + data.breeds[0].description;
                        console.log(description);

                        // Add the description to the details section
                        catInfo.appendChild(description);

                        // Get the selected cat's history
                        console.log("History: ", data.breeds[0].history);

                        const history = document.createElement("p");
                        history.textContent = "History: " + data.breeds[0].history;
                        console.log(history);

                        // Add the history to the details section
                        catInfo.appendChild(history);
                    });
            });

            console.log(catImage);
            catResults.appendChild(catImage);
        });
    });