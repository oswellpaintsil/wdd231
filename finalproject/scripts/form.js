const params = new URLSearchParams(window.location.search);

document.querySelector("#fullname").textContent =
params.get("fullname");

document.querySelector("#email").textContent =
params.get("email");

document.querySelector("#occupation").textContent =
params.get("occupation");

document.querySelector("#message").textContent =
params.get("message");