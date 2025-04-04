document.addEventListener("DOMContentLoaded", function () {
  const name = document.getElementById("full-name");
  const phone = document.getElementById("phone");
  const city = document.getElementById("city-name");
  const country = document.getElementById("country-name");
  const pinCode = document.getElementById("pin-code");
  const email = document.getElementById("email");
  const linkedin = document.getElementById("linkedin");
  const github = document.getElementById("github");
  const website = document.getElementById("website");
  const nextButton = document.getElementById("next-btn-contact");

  // ✅ Retrieve contact data from localStorage
  const contactData = JSON.parse(localStorage.getItem("contactData")) || {
    fullName: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    pinCode: "",
    linkedin: "",
    github: "",
    website: "",
  };

  // ✅ Autofill fields with stored data
  function autofillFields() {
    name.value = contactData.fullName || "";
    email.value = contactData.email || "";
    phone.value = contactData.phone || "";
    city.value = contactData.city || "";
    country.value = contactData.country || "";
    pinCode.value = contactData.pinCode || "";
    linkedin.value = contactData.linkedin || "";
    github.value = contactData.github || "";
    website.value = contactData.website || "";
  }
  autofillFields();

  // ✅ Save form data on "Next" button click
  nextButton.addEventListener("click", function () {
    const newContactInfo = {
      fullName: name.value.trim(),
      email: email.value.trim(),
      phone: phone.value.trim(),
      city: city.value.trim(),
      country: country.value.trim(),
      pinCode: pinCode.value.trim(),
      linkedin: linkedin.value.trim(),
      github: github.value.trim(),
      website: website.value.trim(),
    };

    // ✅ Save in localStorage under "contactData"
    localStorage.setItem("contactData", JSON.stringify(newContactInfo));

    // ✅ Handle Next button navigation
    const nextSectionId = nextButton.getAttribute("action-section");
    if (nextSectionId) {
      showSection(nextSectionId);
    }
  });

  // ✅ Handle toggle for LinkedIn, GitHub, and Website
  function setupToggle(toggleId, inputId, defaultText) {
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

  // ✅ Initialize toggles
  setupToggle("linkedin-toggle", "linkedin-input", "LinkedIn");
  setupToggle("github-toggle", "github-input", "GitHub");
  setupToggle("website-toggle", "website-input", "Website");
});
