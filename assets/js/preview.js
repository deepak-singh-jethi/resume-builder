document.addEventListener("DOMContentLoaded", function () {
  // get data from localStorage
  const resumeData = localStorage.getItem("resumeData");
  console.log(resumeData);

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
