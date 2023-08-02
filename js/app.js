/* Data Base */
let usersDataBase = [
  { id: 1, name: "mohammad", family: "noohi" },
  { id: 2, name: "maral", family: "noohi" },
  { id: 3, name: "hosein", family: "noohi" },
  { id: 4, name: "fezeh", family: "ebrahimzadeh" },
  { id: 5, name: "masoud", family: "noohi" },
  { id: 6, name: "alireza", family: "noohi" },
  { id: 7, name: "mahroo", family: "noohi" },
  { id: 8, name: "mozhdeh", family: "sabt" },
  { id: 9, name: "nooshin", family: "ahmadi" },
  { id: 10, name: "negin", family: "ahmadi" },
  { id: 11, name: "fatemeh", family: "mohammadi" },
  { id: 12, name: "sahar", family: "mohammadi" },
  { id: 13, name: "esmaeil", family: "mohammadi" },
  { id: 14, name: "khadijeh", family: "mohammadi" },
  { id: 15, name: "leili", family: "dehghanpoor" },
  { id: 16, name: "lilia", family: "dehghanpoor" },
  { id: 17, name: "rahman", family: "dehghanpoor" },
  { id: 18, name: "leyla", family: "ebrahimzadeh" },
  { id: 19, name: "amirhosein", family: "akbari" },
  { id: 20, name: "mohsen", family: "akbari" },
  { id: 21, name: "mehdi ", family: "akbari" },
  { id: 22, name: "mahdieh ", family: "akbari" },
];

/* select all elements */
const $ = document;
const usersTemplate = $.querySelector(".users-template");
const usersList = $.querySelector(".users-list");
const pagination = $.querySelector(".pagination");
const pageNumberInput = $.querySelector("#user-number-input");

// flags for control functions
let rows = 5;
let currentPage = 1;




/* CHANG TAMEPLATE OF USERS LIST */
usersTemplate.addEventListener("click", function (event) {
  // console.log(event.target);
  if (event.target.id === "one-column") {
    usersList.style = "grid-template-columns: repeat(1, 1fr);";

    usersList.classList.add("users-list__animation");
    usersList.addEventListener("animationend", function (event) {
      event.target.classList.remove("users-list__animation");
    });
  } else if (event.target.id === "two-column") {
    usersList.style = "grid-template-columns: repeat(2, 1fr);";

    usersList.classList.add("users-list__animation");
    usersList.addEventListener("animationend", function (event) {
      event.target.classList.remove("users-list__animation");
    });
  }
});

/* GENERATE USER ITEMS */
function userItemGenerator(allUsersArray, usersList, rows, currentPage) {
  let endIndex = rows * currentPage;
  let startIndex = endIndex - rows;

  let slicedUsers = allUsersArray.slice(startIndex, endIndex);
  // clear content of uses list element
  usersList.innerHTML = "";
  // add new users item to users list
  slicedUsers.forEach(function (user) {
    let userLiElem = $.createElement("li");
    userLiElem.classList.add("user-item");
    userLiElem.innerHTML = user.name + " " + user.family;
    usersList.append(userLiElem);
  });
}
userItemGenerator(usersDataBase, usersList, rows, currentPage);


/* GENERATE PAGES OF PAGINATION  AND GO TO SPECIFY PAGE */
function pageGenerator(allUsersArray, pagination, rows) {
  let pagesCount = Math.ceil(allUsersArray.length / rows);
  for (let i = 1; i < pagesCount + 1; i++) {
    let pageButton = $.createElement("div");
    pageButton.classList.add("page");
    pageButton.innerHTML = i;
    // set current page style
    if (currentPage === i) {
      pageButton.classList.add("current-page");
    }
    pageButton.addEventListener("click", function (event) {
      let prevPage = $.querySelector(".page.current-page");
      prevPage.classList.remove("current-page");
      event.target.classList.add("current-page");
      currentPage = event.target.innerHTML;
      userItemGenerator(usersDataBase, usersList, rows, currentPage);
    });
    pagination.append(pageButton);
  }
}
pageGenerator(usersDataBase, pagination, rows);

/* set special number of user in each page */
pageNumberInput.addEventListener("change", function (event) {
  rows = event.target.value;
  // set current page to default to void a bug
  currentPage = 1 ;
  userItemGenerator(usersDataBase, usersList, rows, currentPage);
  pagination.innerHTML = "";
  pageGenerator(usersDataBase, pagination, rows);
});
