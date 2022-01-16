// -------------- Constants ------------------

const apiUrl = "https://api.github.com/users/";

const  userForm = document.getElementById("user-form");
const   userSearch = document.getElementById("user-search");
const container = document.getElementById("container");

// ------- The initialization with default user (me=bee-thedev);

getUser("bee-thedev");

// -------------Creating an async function to fetch data from API, wait and then distribute

async function getUser(username){
    const response = await (await fetch(apiUrl + username)).json();

    userCardCreation(response);
    getRepositories(username);
}

// ---------------Creating async function to get the REPO record of particular USER

async function getRepositories(username){
    const response = await (await fetch(apiUrl + username + "/repos")).json();

    addRepositorytoCard(response);
}

// --------------- Creating USER card(info box) ----------------------

function userCardCreation(user){
    const cardCreation = `
    <div class="user-creation">
            <div>
            <img class="avatar" src=${user.avatar_url} alt=${user.name} />
            </div>

            <div class="user-information">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>

                <ul>
                <li>${user.followers}<b>Followers</b></li>
                <li>${user.following}<b>Following</b></li>
                <li>${user.public_repos}<b>Repositories</b></li>
                </ul>

                <div id="repos"></div>
            </div>
    </div>
    `;
    container.innerHTML = cardCreation;
}

// --------------- Adding Repositories to Card for indiviual USER 

function addRepositorytoCard(repos){
    const repositoriesElement = document.getElementById("repos");

    repos
    .sort((a,b)=> b.stargazers_count - a.stargazers_count)
    .slice(0,12)
    .forEach((repo) =>{
        const repositoryElement = document.createElement("a");
        repositoryElement.classList.add("repo");

        repositoryElement.href = repo.html_url;
        repositoryElement.target = "_blank";
        repositoryElement.innerText = repo.name;

        repositoriesElement.appendChild(repositoryElement);
    });
}

// ----- Submitting value into search-box

userForm.addEventListener("submit", (event)=>{
    event.preventDefault();

    const user = userSearch.value;

    if(user){
        getUser(user);
        userSearch.value = "";
    }

})