// Create footer with current year
const footerElement = document.createElement("footer");
document.body.appendChild(footerElement);

const today = new Date();
const thisYear = today.getFullYear();

const footer = document.querySelector("footer");

const copyright = document.createElement("p");
copyright.innerHTML = `\u00A9 Laura Rice ${thisYear}`;
footer.appendChild(copyright);

// Create and display technical skills
const skills = ["C++", "Python", "Java", "JavaScript", "HTML", "CSS", "MySQL", "Git", "GitHub", "Visual Studio Code", "Microsoft Office Suite", "Troubleshooting", "Debugging"];

const skillsSection = document.getElementById("skills");
const skillsList = skillsSection.querySelector("ul");

for (let i = 0; i < skills.length; i++) {
    const skill = document.createElement("li");
    skill.innerText = skills[i];
    skillsList.appendChild(skill);
}

// Handle hamburger menu
const menuButton = document.getElementById("menu-button");
const navMenu = document.querySelector("nav ul");

menuButton.addEventListener("click", function() {
    if (navMenu.style.display === "flex") {
        navMenu.style.display = "none";
    }
    else {
        navMenu.style.display = "flex";
    }
});

// Select the Leave a Message form
const messageForm = document.querySelector('[name="leave_message"]');

// Handle form submission
messageForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const userName = event.target.usersName.value;
    const userEmail = event.target.usersEmail.value;
    const userMessage = event.target.usersMessage.value;

    const messageSection = document.querySelector("#messages");
    const messageList = messageSection.querySelector("ul");
    const newMessage = document.createElement("li");

    // Add the submitted message
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

const projectSection = document.querySelector("#projects");
const projectList = projectSection.querySelector("ul");

// Fetch and display GitHub repositories
fetch("https://api.github.com/users/laurarice2000-tech/repos")
    .then(function(response) {
        return response.json();
    })
    .then(function(repos) {
        const repositories = repos;

        return repositories;
    })
    .then(function(repositories) {
        // Add each GitHub repository to the Projects list
        for (let i = 0; i < repositories.length; i++) {
            const project = document.createElement("li");

            const projectLink = document.createElement("a");
            projectLink.innerText = repositories[i]["name"];
            projectLink.href = repositories[i]["html_url"];

            project.appendChild(projectLink);

            const projectDescription = document.createElement("p");
            projectDescription.innerText = repositories[i]["description"];
            project.appendChild(projectDescription);

            const projectCreatedDate = document.createElement("p");
            const createdDate = new Date(repositories[i]["created_at"]);

            const month = createdDate.getMonth() + 1;
            const day = createdDate.getDate();
            const year = createdDate.getFullYear();

            const formattedDate = `Created: ${month}/${day}/${year}`;

            projectCreatedDate.innerText = formattedDate;
            project.appendChild(projectCreatedDate);

            projectList.appendChild(project);
        }
    })
    .catch(function(error) {
        console.log(error);
        const errorMessage = document.createElement("p");
        errorMessage.innerText = "Unable to load projects at this time. Please try again later.";
        projectSection.appendChild(errorMessage);
    });