// ✅ This makes it globally accessible
function goToTemplate(templatePath) {
  window.location.href = templatePath;
}
function handleChangePreview() {
  window.location.href = "resume-preview.html";
}

document.addEventListener("DOMContentLoaded", function () {
  /* -------------------------------- */
  /* 🚀 return back to main page 🚀 */
  /* -------------------------------- */
  const returnBtn = document.getElementById("return-btn");
  if (returnBtn) {
    returnBtn.addEventListener("click", function () {
      window.location.href = "index.html"; // Redirect to the main form page
    });
  } else {
    console.error("Return button not found!");
  }
});
