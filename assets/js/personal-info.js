document.addEventListener("DOMContentLoaded", function () {
  const dob = document.getElementById("dob");
  const gender = document.getElementById("gender");
  const religion = document.getElementById("religion");
  const maritalStatus = document.getElementById("marital-status");
  const saveButtonAndPreview = document.getElementById(
    "next-btn-personal-info"
  );
  const prevBtn = document.getElementById("prev-btn-personal-info");
  const languageInput = document.getElementById("language-input");
  const addLanguageBtn = document.getElementById("add-language-btn");
  const languageList = document.getElementById("language-list");
  const profileInput = document.getElementById("profile-picture");
  const profileImg = document.getElementById("profile-img");
  const deleteProfileImg = document.getElementById("delete-profile-img");

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
        <span class="material-icons delete-btn-lang" title="Remove language" data-index="${index}">delete</span>
      `;
      languageList.appendChild(div);
    });

    const deleteButtons = document.querySelectorAll(".delete-btn-lang");
    deleteButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        const index = this.getAttribute("data-index");

        Swal.fire({
          title: "Remove Language?",
          text: `Are you sure you want to remove`,
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

  // Load stored image from localStorage (if any)
  const storedProfile = localStorage.getItem("profileImage");
  if (storedProfile) {
    profileImg.src = storedProfile;
    profileImg.style.display = "block";
    deleteProfileImg.style.display = "block"; // Show the delete button
  } else {
    profileImg.style.display = "none";
    deleteProfileImg.style.display = "none"; // Hide delete button if no image
  }

  profileInput.addEventListener("change", function () {
    const file = this.files[0];

    if (!file || !file.type.startsWith("image/")) {
      Swal.fire({
        icon: "error",
        title: "Invalid File",
        text: "Please upload a valid image file.",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const base64Image = e.target.result;
      profileImg.src = base64Image;
      profileImg.style.display = "block";
      deleteProfileImg.style.display = "block"; // Show the delete button
      localStorage.setItem("profileImage", base64Image); // Save base64 to localStorage
    };
    reader.readAsDataURL(file);
  });

  // Delete the profile picture when the delete button is clicked
  deleteProfileImg.addEventListener("click", function () {
    Swal.fire({
      icon: "warning",
      title: "Delete Profile Picture",
      text: "Are you sure you want to delete your profile picture?",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Clear the image from localStorage and UI
        localStorage.removeItem("profileImage");
        profileImg.src = "";
        profileImg.style.display = "none";
        deleteProfileImg.style.display = "none"; // Hide the delete button

        // Reset the input so the user can upload a new image
        profileInput.value = "";
      }
    });
  });
});
