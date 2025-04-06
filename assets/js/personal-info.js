document.addEventListener("DOMContentLoaded", function () {
  const dob = document.getElementById("dob");
  const gender = document.getElementById("gender");
  const religion = document.getElementById("religion");
  const maritalStatus = document.getElementById("marital-status");
  const saveButtonAndPreview = document.getElementById(
    "next-btn-personal-info"
  );
  const prevBtn = document.getElementById("prev-btn-personal-info");

  console.log(prevBtn);

  const languageInput = document.getElementById("language-input");
  const addLanguageBtn = document.getElementById("add-language-btn");
  const languageList = document.getElementById("language-list");

  let personalInfo = JSON.parse(localStorage.getItem("personalData")) || {
    dob: "",
    gender: "",
    maritalStatus: "",
    religion: "",
    languages: [],
  };

  function autofillFields() {
    dob.value = personalInfo.dob || "";
    religion.value = personalInfo.religion || "";
    maritalStatus.value = personalInfo.maritalStatus || "";
    gender.value = personalInfo.gender || "";
    renderLanguages();
  }

  autofillFields();

  function renderLanguages() {
    languageList.innerHTML = "";

    personalInfo.languages.forEach((lang, index) => {
      const div = document.createElement("div");
      div.className = "skill-tag";
      div.innerHTML = `
        ${lang.name} (${lang.level})
        <span class="material-icons delete-btn" title="Remove language" data-index="${index}">delete</span>
      `;
      languageList.appendChild(div);
    });

    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        const index = this.getAttribute("data-index");

        Swal.fire({
          title: "Remove Language?",
          text: `Are you sure you want to remove "${personalInfo.languages[index].name}"?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, remove it",
        }).then((result) => {
          if (result.isConfirmed) {
            personalInfo.languages.splice(index, 1);
            localStorage.setItem("personalData", JSON.stringify(personalInfo));
            renderLanguages();
            Swal.fire("Removed!", "Language has been removed.", "success");
          }
        });
      });
    });
  }

  addLanguageBtn.addEventListener("click", () => {
    const languageName = languageInput.value.trim();
    if (!languageName) {
      Swal.fire({
        icon: "warning",
        title: "Language Required",
        text: "Please enter a language before adding.",
      });
      return;
    }

    Swal.fire({
      title: `Select your proficiency in "${languageName}"`,
      input: "select",
      inputOptions: {
        Beginner: "Beginner (Basic words & phrases)",
        Intermediate: "Intermediate (Can converse comfortably)",
        Advanced: "Advanced (Fluent in most contexts)",
        Native: "Native (Mother tongue or near-native)",
      },
      inputPlaceholder: "Select level",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const selectedLevel = result.value;
        personalInfo.languages.push({
          name: languageName,
          level: selectedLevel,
        });
        localStorage.setItem("personalData", JSON.stringify(personalInfo));
        renderLanguages();
        languageInput.value = "";
      }
    });
  });

  prevBtn.addEventListener("click", function () {
    console.log("yes");

    const prevSectionId = prevBtn.getAttribute("action-section");
    if (prevSectionId) showSection(prevSectionId);
  });

  saveButtonAndPreview.addEventListener("click", function () {
    const errors = [];

    const dobVal = dob.value.trim();
    const genderVal = gender.value;
    const maritalVal = maritalStatus.value;
    const religionVal = religion.value.trim();
    const langCount = personalInfo.languages.length;

    // Validate Date of Birth
    if (!dobVal) {
      errors.push("• Date of Birth is required");
    } else {
      const dobDate = new Date(dobVal);
      const today = new Date();
      if (dobDate > today) {
        errors.push("• Date of Birth cannot be in the future");
      }
    }

    if (!genderVal) errors.push("• Gender must be selected");
    if (!maritalVal) errors.push("• Marital Status must be selected");
    if (!religionVal) errors.push("• Religion is required");
    if (langCount === 0) errors.push("• At least one language must be added");

    if (errors.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Please fix the following:",
        html: errors.join("<br>"),
      });
      return;
    }

    // Save the data
    personalInfo.dob = dobVal;
    personalInfo.religion = religionVal;
    personalInfo.gender = genderVal;
    personalInfo.maritalStatus = maritalVal;

    localStorage.setItem("personalData", JSON.stringify(personalInfo));

    Swal.fire({
      title: "Great! Personal Info Saved ✅",
      text: "Would you like to continue to the preview or review your details again?",
      icon: "success",
      showCancelButton: true,
      confirmButtonText: "Yes, take me to preview",
      cancelButtonText: "No, I want to review",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "resume-preview.html";
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        showSection("contact");
      }
    });
  });
});
