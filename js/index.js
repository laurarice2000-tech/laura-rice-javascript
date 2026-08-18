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
const skillsSection = document.getElementById("Skills");

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