// form handler

document.querySelectorAll(".next-btn, .prev-btn").forEach((button) => {
  button.addEventListener("click", function () {
    let target =
      this.getAttribute("data-next") || this.getAttribute("data-prev");
    document
      .querySelectorAll(".form-section")
      .forEach((form) => form.classList.add("hidden"));
    document.getElementById(target).classList.remove("hidden");
  });
});
