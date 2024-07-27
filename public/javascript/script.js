const goBackButton = document.querySelector(".goBack-button");
if (goBackButton) {
  goBackButton.addEventListener("click", function () {
    location.href = "/";
  });
}

const createVoteButton = document.querySelector(".create-vote-button");
createVoteButton && createVoteButton.addEventListener("click", function () {
  location.href = "/votings/new";
});

const myVoteButton = document.querySelector(".my-vote-button");
myVoteButton && myVoteButton.addEventListener("click", function () {
  location.href = "/my-votings";
});

const logoutButton = document.querySelector(".logout-button");
logoutButton && logoutButton.addEventListener("click", function () {
  location.href = "/logout";
});

const signupButton = document.querySelector(".signup-button");
signupButton && signupButton.addEventListener("click", function () {
  location.href = "/signup";
});

const deleteButton = document.querySelector(".delete-button");
deleteButton && deleteButton.addEventListener("click", async function () {
  const req = new Request(`${location.pathname}`, { method: "DELETE" })
  const answer = await fetch(req);

  location.href = "/";
});
