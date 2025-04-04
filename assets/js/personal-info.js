document.addEventListener("DOMContentLoaded", function () {
  const dob = document.getElementById("dob");
  const gender = document.getElementById("gender");
  const religion = document.getElementById("religion");
  const maritalStatus = document.getElementById("marital-status");
  const fatherName = document.getElementById("father");
  const spouseName = document.getElementById("spouse");
  const motherName = document.getElementById("mother");
  const nextButton = document.getElementById("next-btn");

  const nextButtonSection = nextButton.getAttribute("data-section");
  console.log(nextButtonSection);

  // ✅ Retrieve stored personal info or initialize an empty object
  const storedData = JSON.parse(localStorage.getItem("personalData")) || {};

  let personalInfo = storedData || {
    dob: "",
    gender: "",
    maritalStatus: "",
    religion: "",
    father: "",
    spouse: "",
    mother: "",
  };

  function autofillFields() {
    // ✅ Ensure dob has a valid format
    dob.value = personalInfo.dob
      ? personalInfo.dob
      : new Date().toISOString().split("T")[0];

    religion.value = personalInfo.religion || "";
    maritalStatus.value = personalInfo.maritalStatus || "";
    gender.value = personalInfo.gender || "";
    fatherName.value = personalInfo.father || "";
    spouseName.value = personalInfo.spouse || "";
    motherName.value = personalInfo.mother || "";
  }

  autofillFields();

  // ✅ Save form data on next button click
  nextButton.addEventListener("click", function () {
    if (nextButtonSection === "personal-info") {
      console.log("Saving personal info...");
      const newPersonalInfo = {
        dob: dob.value || new Date().toISOString().split("T")[0], // Ensure valid date
        religion: religion.value,
        gender: gender.value,
        maritalStatus: maritalStatus.value,
        father: fatherName.value,
        spouse: spouseName.value,
        mother: motherName.value,
      };
      personalInfo = newPersonalInfo;
      localStorage.setItem("personalData", JSON.stringify(personalInfo)); // ✅ Fixed variable name
    }
  });

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

  // Initialize toggles for optional fields
  setupToggle("father-section", "father-toggle", "father-input", "Father Name");
  setupToggle("spouse-section", "spouse-toggle", "spouse-input", "Spouse Name");
  setupToggle("mother-section", "mother-toggle", "mother-input", "Mother Name");
});
