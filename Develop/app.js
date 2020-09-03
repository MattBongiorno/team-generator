const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const team = [];
const newPerson = [{
    type: 'list',
    name: 'jobDescription',
    message: 'what position would you like to create a info card for? (select "no more" if you have entered all of the positions that you would like to.)',
    choices: ["Engineer", "Intern", "No More"],
}, ]
const managerQuestions = [{
        type: 'input',
        name: 'managerName',
        message: "What is the manager of the team's name?",
    },

    {
        type: 'input',
        name: 'managerId',
        message: "What is the manager's Id number?",
    },

    {
        type: 'input',
        name: 'managerEmail',
        message: "What is the manager's email address?",
    },

    {
        type: 'input',
        name: 'officeNumber',
        message: "What is the manager's Office Number?",
    },
]
const engineerQuestions = [

    {
        type: 'input',
        name: 'engineerName',
        message: "What is the Engineer's name?",
    },

    {
        type: 'input',
        name: 'engineerId',
        message: "What is the Engineer's Id number?",
    },

    {
        type: 'input',
        name: 'engineerEmail',
        message: "What is the engineer's email?",
    },

    {
        type: 'input',
        name: 'github',
        message: "Enter this engineer's GitHub user name",
    },
]
const internQuestions = [

    {
        type: 'input',
        name: 'internName',
        message: "What is the Intern's name?",
    },

    {
        type: 'input',
        name: 'internId',
        message: "What is the intern's Id number?",
    },

    {
        type: 'input',
        name: 'internEmail',
        message: "What is the Intern's Email address?",
    },

    {
        type: 'input',
        name: 'school',
        message: "Where does the Intern go to school?",
    },
]

function init() {
    console.log("Inside the init function")
    managerPrompt();
};

function otherPeople() {
    console.log("Inside the oyther people function")
    inquirer.prompt(newPerson).then((response) => {
        switch (response.jobDescription) {
            case "Engineer":
                engineerPrompt();
                break;
            case "Intern":
                internPrompt();
                break;
            case "No More":
                createTeam();
                console.log("The team is created.  You can see the 'Team.html' file in the 'output' folder")
                break;
        }

    })
}

function managerPrompt() {
    console.log("Inside the manager function")
    inquirer.prompt(managerQuestions).then((response) => {
        let name = response.managerName;
        let id = response.managerId;
        let email = response.managerEmail;
        let officeNumber = response.officeNumber;
        const manager = new Manager(name, id, email, officeNumber);
        team.push(manager);
        otherPeople();
    })
}

function engineerPrompt() {
    console.log("Inside the engineer function")
    inquirer.prompt(engineerQuestions).then((response) => {
        let name = response.engineerName;
        let id = response.engineerId;
        let email = response.engineerEmail;
        let officeNumber = response.officeNumber;
        const engineer = new Engineer(name, id, email, officeNumber);
        team.push(engineer);
        otherPeople();
    })
}

function internPrompt() {
    console.log("Inside the intern function")
    inquirer.prompt(internQuestions).then((response) => {
        let name = response.internName;
        let id = response.internId;
        let email = response.internEmail;
        let officeNumber = response.officeNumber;
        const intern = new Intern(name, id, email, officeNumber);
        team.push(intern);
        otherPeople();
    })
}

function createTeam() {
    fs.writeFile(outputPath, render(team), function(err) {
        if (err) {
            return console.log(err)
        }
    })
}

init();