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

// Create an array containing my technical skills
const skills = ["C++", "Python", "Java", "JavaScript", "HTML", "CSS", "MySQL", "Git", "GitHub", "Visual Studio Code", "Microsoft Office Suite", "Troubleshooting", "Debugging"];

// Select the Skills section from the DOM using its ID 
const skillsSection = document.getElementById("skills");

// Select the <ul> element inside the Skills section
const skillsList = skillsSection.querySelector("ul");

// Loop through the skills array and create a list item for each skill
for (let i = 0; i < skills.length; i++) {
    const skill = document.createElement("li");
    skill.innerText = skills[i];
    skillsList.appendChild(skill);
}

// Selects the Leave a Message form by its name attribute
const messageForm = document.querySelector('[name="leave_message"]');

// Handle form submission
messageForm.addEventListener("submit", function(event) {
    // Prevent the form from refreshing the page
    event.preventDefault();

    // Get the values entered in the form fields
    const userName = event.target.usersName.value;
    const userEmail = event.target.usersEmail.value;
    const userMessage = event.target.usersMessage.value;

    // Log the submitted form values to the console
    console.log(userName, userEmail, userMessage);

    // Select the Messages section by its ID
    const messageSection = document.querySelector("#messages");

    // Select the message list within the Messages section
    const messageList = messageSection.querySelector("ul");

    // Create a new list item for the message
    const newMessage = document.createElement("li");

    // Add the user's name, email, and message to the new list item
    newMessage.innerHTML = `<a href="mailto:${userEmail}">${userName}</a> <span>${userMessage}</span>`;

    // Create a remove button for the message
    const removeButton = document.createElement("button");

    // Set the remove button text
    removeButton.innerText = "remove";

    removeButton.setAttribute("type", "button");

    removeButton.addEventListener("click", function(event) {
        const entry = removeButton.parentNode;
        entry.remove();
        newMessage.appendChild(removeButton);
        messageList.appendChild(newMessage);
    });
    // Clear the form after submission
    event.target.reset();
});