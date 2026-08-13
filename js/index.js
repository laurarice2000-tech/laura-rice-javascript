// Create and add the footer to the body
const footerElement = document.createElement("footer");
document.body.appendChild(footerElement);

// Get the current date and year
const today = new Date();
const thisYear = today.getFullYear();

// Select the footer from the DOM
const footer = document.querySelector("footer");

// Add copyright text to the footer
const copyright = document.createElement("p");
copyright.innerHTML = `\u00A9 Laura Rice ${thisYear}`;
footer.appendChild(copyright);