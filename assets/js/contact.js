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

  // ✅ Validation Helpers
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidPhone(phone) {
    const phoneDigits = phone.replace(/[^\d]/g, "");
    return phoneDigits.length >= 10 && phoneDigits.length <= 15;
  }

  // ✅ Save form data on "Next" button click
  nextButton.addEventListener("click", function () {
    const fullName = name.value.trim();
    const emailVal = email.value.trim();
    const phoneVal = phone.value.trim();
    const cityVal = city.value.trim();
    const countryVal = country.value.trim();
    const pinCodeVal = pinCode.value.trim();

    // ✅ Validation for required fields
    if (
      !fullName ||
      !phoneVal ||
      !cityVal ||
      !countryVal ||
      !pinCodeVal ||
      !emailVal
    ) {
      Swal.fire({
        icon: "warning",
        title: "Required Fields Missing",
        text: "Please fill in all required fields: Full Name, Phone, City, Country, Pin-Code, and Email.",
      });
      return;
    }

    // ✅ Validate email format
    if (!isValidEmail(emailVal)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email Format",
        text: "Please enter a valid email address (e.g., john@example.com).",
      });
      return;
    }

    // ✅ Validate phone format
    if (!isValidPhone(phoneVal)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Phone Number",
        text: "Phone number should contain 10 to 15 digits. You may use +, spaces, or dashes.",
      });
      return;
    }

    const newContactInfo = {
      fullName,
      email: emailVal,
      phone: phoneVal,
      city: cityVal,
      country: countryVal,
      pinCode: pinCodeVal,
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
