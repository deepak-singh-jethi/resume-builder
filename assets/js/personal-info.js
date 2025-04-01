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

  // Initialize toggles for Father, Spouse, and Mother Name fields
  setupToggle("father-section", "father-toggle", "father-input", "Father Name");
  setupToggle("spouse-section", "spouse-toggle", "spouse-input", "Spouse Name");
  setupToggle("mother-section", "mother-toggle", "mother-input", "Mother Name");
});
