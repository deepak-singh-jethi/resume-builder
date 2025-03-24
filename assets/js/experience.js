document.addEventListener("DOMContentLoaded", function () {
  let experienceEntries =
    JSON.parse(localStorage.getItem("experienceData")) || [];

  // Cache DOM elements once
  const formElements = {
    company: document.getElementById("experience-company"),
    role: document.getElementById("experience-role"),
    industry: document.getElementById("experience-industry"),
    startDate: document.getElementById("experience-start"),
    endDate: document.getElementById("experience-end"),
    current: document.getElementById("experience-current"),
    location: document.getElementById("experience-location"),
    description: document.getElementById("experience-description"),
    skills: document.getElementById("experience-skills"),
    form: document.getElementById("experience-form"), // Form element for reset
  };

  // Handle "Currently Working Here" checkbox
  formElements.current.addEventListener("change", function () {
    formElements.endDate.disabled = this.checked;
    if (this.checked) formElements.endDate.value = "";
  });

  // Function to save experience entry
  function saveExperienceEntry() {
    const newEntry = {
      company: formElements.company.value.trim(),
      role: formElements.role.value.trim(),
      industry: formElements.industry.value,
      startDate: formElements.startDate.value,
      endDate: formElements.current.checked
        ? "Present"
        : formElements.endDate.value,
      location: formElements.location.value,
      description: formElements.description.value.trim(),
      skills: formElements.skills.value.split(",").map((skill) => skill.trim()),
    };

    // Validation: Ensure required fields are filled
    if (!newEntry.company || !newEntry.role || !newEntry.startDate) {
      alert("Please fill in required fields (Company, Role, Start Date).");
      return;
    }

    experienceEntries.push(newEntry);

    // ✅ Debounce localStorage update (Waits 500ms before saving)
    clearTimeout(window.experienceSaveTimeout);
    window.experienceSaveTimeout = setTimeout(() => {
      localStorage.setItem("experienceData", JSON.stringify(experienceEntries));
      console.log("Saved to localStorage");
    }, 500);

    console.log("Experience Saved:", experienceEntries);
    clearExperienceForm();
  }

  // Function to clear form fields
  function clearExperienceForm() {
    formElements.form?.reset(); // ✅ Reset entire form instead of clearing each field
    formElements.endDate.disabled = false; // Ensure End Date is enabled
  }

  document
    .getElementById("add-experience")
    .addEventListener("click", saveExperienceEntry);
});
