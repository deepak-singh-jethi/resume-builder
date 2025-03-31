document.addEventListener("DOMContentLoaded", function () {
  function setupToggle(sectionId, toggleId, inputId, defaultText) {
    const toggleLabel = document.getElementById(toggleId);
    const inputField = document.getElementById(inputId);

    toggleLabel.addEventListener("click", function () {
      const isHidden = inputField.classList.contains("hidden");

      if (isHidden) {
        inputField.classList.remove("hidden");
        inputField.classList.add("visible");
        toggleLabel.textContent = `- ${defaultText}`;
      } else {
        inputField.classList.remove("visible");
        inputField.classList.add("hidden");
        toggleLabel.textContent = `+ ${defaultText} (optional)`;
      }
    });
  }

  // Initialize toggles
  setupToggle(
    "linkedin-section",
    "linkedin-toggle",
    "linkedin-input",
    "LinkedIn"
  );
  setupToggle("github-section", "github-toggle", "github-input", "GitHub");
  setupToggle("website-section", "website-toggle", "website-input", "Website");
});
