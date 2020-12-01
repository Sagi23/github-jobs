const cardsDiv = document.querySelector(".cards");
const form = document.querySelector("form");
let desc = document.querySelector("#title");
let loc = document.querySelector("#location");
let checkbox = document.querySelector("#full-time");
const errorMsg = document.querySelector(".error-msg-1");
const errorMsg2 = document.querySelector(".error-msg-2");
const toggleBtn = document.querySelector("#toggle");
let body = document.querySelector("html");
let inputs = document.querySelectorAll("input");
const err = document.querySelector(".error");
const loadDiv = document.querySelector(".load");
let loadMore = document.createElement("button");
let page = 1;

const setClass = (a, b, c, d, e, f) => {
  a.classList.add("card");
  b.classList.add("company-logo");
  c.classList.add("secondery");
  d.classList.add("title");
  e.classList.add("secondery");
  f.classList.add("location");
};

toggleBtn.addEventListener("click", () => {
  if (toggleBtn.src.match("/assets/desktop/toggle.svg")) {
    toggleBtn.src = "/assets/desktop/toggle1.svg";
    body.style.backgroundColor = "#121721";
    form.style.backgroundColor = "#19202D";
    form.style.color = "white";
    inputs.forEach((i) => (i.style.color = "white"));
    err.style.color = "white";
  } else {
    toggleBtn.src = "/assets/desktop/toggle.svg";
    body.style.backgroundColor = "#F4F6F8";
    form.style.backgroundColor = "white";
    form.style.color = "black";
    inputs.forEach((i) => (i.style.color = "black"));
    err.style.color = "black";
  }
});

const getJobs = async (description, location, full_time, page) => {
  const res = await axios.get(
    `https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description=${description}&page=${page}&location=${location}&full_time=${full_time}&markdown=true`
  );
  let s = res.data;
  if (s.length !== 0) {
    for (r of s) {
      let date = r.created_at;
      date = date.slice(4, 10);
      let newCard = document.createElement("div");
      let companyLogo = document.createElement("img");
      let type = document.createElement("p");
      let title = document.createElement("a");
      let companyName = document.createElement("p");
      let companyLocation = document.createElement("p");
      companyLogo.src = r.company_logo;
      type.textContent = `${date} • ${r.type}`;
      title.textContent = r.title;
      title.href = r.how_to_apply;
      title.target = "_blank";
      companyName.textContent = r.company;
      companyLocation.textContent = r.location;
      setClass(newCard, companyLogo, type, title, companyName, companyLocation);
      newCard.append(companyLogo, type, title, companyName, companyLocation);
      cardsDiv.append(newCard);
    }
    loadMore.textContent = "Load More";
    loadMore.classList.add("btn");
    loadDiv.style.display = "block";
    loadDiv.append(loadMore);
  } else if (s.length == 0 && cardsDiv.textContent == "") {
    errorMsg.style.display = "block";
  } else {
    errorMsg2.style.display = "block";
  }
};
loadMore.addEventListener("click", () => {
  page += 1;
  getJobs(desc.value, loc.value, checkbox.checked, page);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  loadDiv.style.display = "none";
  errorMsg.style.display = "none";
  errorMsg2.style.display = "none";
  cardsDiv.textContent = "";
  getJobs(desc.value, loc.value, checkbox.checked, page);
});
