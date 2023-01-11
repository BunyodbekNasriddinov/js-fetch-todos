const elForm = document.querySelector(".js-form");
const elEmailInput = document.querySelector(".js-email");
const elPasswordInput = document.querySelector(".js-password");
const elEyeBtn = document.querySelector(".js-eye");
const localData = localStorage.getItem("token");

if (localData) {
  location.replace("index.html");
}

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  fetch("http://localhost:5000/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localData,
    },
    body: JSON.stringify({
      email: elEmailInput.value,
      password: elPasswordInput.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        location.replace("index.html");
      }
    })
    .catch((err) => console.log(err));
});

elEyeBtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  if (elPasswordInput.type !== "text") elPasswordInput.type = "text";
  else elPasswordInput.type = "password";
});
