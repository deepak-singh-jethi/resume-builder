document.addEventListener("DOMContentLoaded", function () {
  const dob = document.getElementById("dob");
  const gender = document.getElementById("gender");
  const religion = document.getElementById("religion");
  const maritalStatus = document.getElementById("marital-status");
  const fatherName = document.getElementById("father");
  const spouseName = document.getElementById("spouse");
  const motherName = document.getElementById("mother");
  const saveButtonAndPreview = document.getElementById(
    "next-btn-personal-info"
  );

  // ✅ Retrieve stored personal info or initialize an empty object
  let personalInfo = JSON.parse(localStorage.getItem("personalData")) || {
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
    dob.value = personalInfo.dob || "";
    religion.value = personalInfo.religion || "";
    maritalStatus.value = personalInfo.maritalStatus || "";
    gender.value = personalInfo.gender || "";
    fatherName.value = personalInfo.father || "";
    spouseName.value = personalInfo.spouse || "";
    motherName.value = personalInfo.mother || "";
  }

  autofillFields();

  // ✅ Save form data on next button click
  saveButtonAndPreview.addEventListener("click", function () {
    const newPersonalInfo = {
      dob: dob.value || "", // Ensure valid date
      religion: religion.value,
      gender: gender.value,
      maritalStatus: maritalStatus.value,
      father: fatherName.value,
      spouse: spouseName.value,
      mother: motherName.value,
    };

    // ✅ Save updated personal info in localStorage
    localStorage.setItem("personalData", JSON.stringify(newPersonalInfo));
    // ✅ Navigate to resume-preview.html
    window.location.href = "resume-preview.html";
  });

  // ✅ Function to toggle optional fields
  function setupToggle(toggleId, inputId, defaultText) {
    const toggleLabel = document.getElementById(toggleId);
    const inputField = document.getElementById(inputId);

    if (!toggleLabel || !inputField) return; // Ensure elements exist

    toggleLabel.addEventListener("click", function () {
      const isHidden = inputField.classList.contains("hidden");

      if (isHidden) {
        inputField.classList.remove("hidden");
        toggleLabel.textContent = `- ${defaultText}`;
      } else {
        inputField.classList.add("hidden");
        toggleLabel.textContent = `+ ${defaultText} (optional)`;
      }
    });
  }

  // ✅ Initialize toggles for optional fields
  setupToggle("father-toggle", "father", "Father Name");
  setupToggle("spouse-toggle", "spouse", "Spouse Name");
  setupToggle("mother-toggle", "mother", "Mother Name");
});
