const totalUsers = 10;
let currentUsers = [];
let addButton = document.getElementById("actionButton");
let userRow = document.getElementById("userRow");

async function getUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  return data;
}

function displayUsers(users) {
  userRow.innerHTML = "";
  for (let i = 0; i < users.length; i++) {
    let card = document.createElement("div");
    card.classList.add("card");
    let userImage = document.createElement("img");
    userImage.src = `https://i.pravatar.cc/150?u=${users[i].id}`;
    userImage.alt = users[i].name;
    let userName = document.createElement("p");
    userName.textContent = users[i].name;
    let userEmail = document.createElement("p");
    userEmail.textContent = users[i].email;
    card.appendChild(userImage);
    card.appendChild(userName);
    card.appendChild(userEmail);
    userRow.appendChild(card);
  }
}

async function addButtonClick() {
  if (currentUsers.length < totalUsers) {
    const users = await getUsers();
    currentUsers.push(users[currentUsers.length]);
    displayUsers(currentUsers);
    if (currentUsers.length === totalUsers) {
      addButton.innerText = "Reiniciar";
      addButton.style.backgroundColor = "#dc3232";
    }
  } else {
    location.reload();
  }
}

addButton.addEventListener("click", addButtonClick);

(async () => {
  const users = await getUsers();
  currentUsers = users.slice(0, 6);
  displayUsers(currentUsers);
})();
