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
                    })
            });

            console.log(catImage);
            catResults.appendChild(catImage);
        });
    });