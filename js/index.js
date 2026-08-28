// Create and add the footer to the page
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

// Select the Skills section from the DOM 
const skillsSection = document.getElementById("skills");

// Select the skills list within the Skills section
const skillsList = skillsSection.querySelector("ul");

// Add each skill to the skills list
for (let i = 0; i < skills.length; i++) {
    const skill = document.createElement("li");
    skill.innerText = skills[i];
    skillsList.appendChild(skill);
}

// Select the Leave a Message form
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

    // Select the Messages section
    const messageSection = document.querySelector("#messages");

    // Select the message list within the Messages section
    const messageList = messageSection.querySelector("ul");

    // Create a new list item for the submitted message
    const newMessage = document.createElement("li");

    // Add the user's name, email, and message
    newMessage.innerHTML = `<a href="mailto:${userEmail}">${userName}</a> <span>${userMessage}</span>`;

    // Create and configure the edit button
    const editButton = document.createElement("button");
    editButton.innerText = "edit";
    editButton.setAttribute("type", "button");

    // Handle editing the message
    editButton.addEventListener("click", function() {
        const entry = editButton.parentNode;
        const message = entry.querySelector("span");

        const editField = document.createElement("textarea");
        editField.value = message.textContent;

        entry.appendChild(editField);

        message.style.display = "none";
        editButton.style.display = "none";

        // Create and configure the save button
        const saveButton = document.createElement("button");
        saveButton.innerText = "save";
        saveButton.setAttribute("type", "button");

        entry.appendChild(saveButton);

        saveButton.addEventListener("click", function() {
            //console.log("Save button clicked");
            const newMessageText = editField.value;
            message.textContent = newMessageText;

            editField.style.display = "none";
            saveButton.style.display = "none";
            message.style.display = "inline";
            editButton.style.display = "inline";
        });
    });

    // Create a remove button for the message
    const removeButton = document.createElement("button");
    removeButton.innerText = "remove";
    removeButton.setAttribute("type", "button");

    // Remove the message when the button is clicked
    removeButton.addEventListener("click", function() {
        const entry = removeButton.parentNode;
        entry.remove();
    });

    newMessage.appendChild(editButton);
    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);

    // Clear the form after submission
    event.target.reset();
});

// Select the Projects section
const projectSection = document.querySelector("#projects");

// Select the project list within the Projects section
const projectList = projectSection.querySelector("ul");

// Fetch and parse GitHub repository data
fetch("https://api.github.com/users/laurarice2000-tech/repos")
    .then(function(response) {
        return response.json();
    })
    .then(function(repos) {
        const repositories = repos;
        console.log(repositories);

        // Add each GitHub repository to the Projects list
        for (let i = 0; i < repositories.length; i++) {
            const project = document.createElement("li");
            project.innerText = repositories[i]["name"];
            projectList.appendChild(project);
        }
    })
    .catch(function(error) {
        console.log(error);
        const errorMessage = document.createElement("p");
        errorMessage.innerText = "Unable to load projects at this time. Please try again later.";
        projectSection.appendChild(errorMessage);
    });