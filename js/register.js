const elForm = document.querySelector(".js-form");
const elNameInput = document.querySelector(".js-name");
const elPhoneInput = document.querySelector(".js-phone");
const elEmailInput = document.querySelector(".js-email");
const elPasswordInput = document.querySelector(".js-password");
const elEyeBtn = document.querySelector(".js-eye");

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  fetch("http://localhost:5000/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_name: elNameInput.value,
      phone: elPhoneInput.value,
      email: elEmailInput.value,
      password: elPasswordInput.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        location.replace("index.html");
        localStorage.setItem("token", data.token);
      }
    })
    .catch((err) => console.log(err));
});

elEyeBtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  if (elPasswordInput.type !== "text") elPasswordInput.type = "text";
  else elPasswordInput.type = "password";
});
