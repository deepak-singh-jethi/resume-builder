/* -------------------------------- */
/* 🚀 Resume Form Handler Script 🚀 */
/* -------------------------------- */

// ✅ Global Object for Form Data
let myData = {
  contactInfo: {},
  summary: {},
  education: [],
  experience: [],
  projects: [],
  skills: [],
  hobbies: [],
  certifications: [],
  personalInfo: {},
};

// ✅ Global Arrays for Form Data
let educationEntries = [];
let experienceEntries = [];
let projectEntries = [];
let certificateEntries = [];
let skillList = [];
let hobbiesList = [];
let contactInfo = {};
let personalInfo = {};
let summary = {};

document.addEventListener("DOMContentLoaded", function () {
  // ✅ Get references to sidebar items, form sections, and navigation buttons
  const sidebarItems = document.querySelectorAll(".sidebar-item");
  const formSections = document.querySelectorAll(".form-section");
  let prevBtn = document.getElementById("prev-btn");
  let nextBtn = document.getElementById("next-btn");

  let currentSectionIndex = 0; // ✅ Track current form section index

  // ✅ Restore saved form data from localStorage
  const savedData = localStorage.getItem("resumeData");
  if (savedData) {
    myData = JSON.parse(savedData) || {};

    educationEntries = myData.education || [];
    experienceEntries = myData.experience || [];
    projectEntries = myData.projects || [];
    certificateEntries = myData.certifications || [];
    skillList = myData.skills || [];
    hobbiesList = myData.hobbies || [];
    contactInfo = myData.contactInfo || {};
    summary = myData.summary || {};
    personalInfo = myData.personalInfo || {};

    console.log("Loaded Saved Data:", myData);
  }

  // ✅ Autofill form fields if data exists
  function autofillFields() {
    if (contactInfo) {
      document.getElementById("full-name").value = contactInfo.fullName || "";
      document.getElementById("email").value = contactInfo.email || "";
      document.getElementById("phone").value = contactInfo.phone || "";
      document.getElementById("city-name").value = contactInfo.city || "";
      document.getElementById("country-name").value = contactInfo.country || "";
      document.getElementById("pin-code").value = contactInfo.pinCode || "";
      document.getElementById("linkedin").value = contactInfo.linkedin || "";
      document.getElementById("github").value = contactInfo.github || "";
      document.getElementById("website").value = contactInfo.website || "";
    }

    if (summary) {
      document.getElementById("summary-text").value = summary.text || "";
    }

    if (personalInfo) {
      document.getElementById("dob").value = personalInfo.dob || "";
      document.getElementById("gender").value = personalInfo.gender || "";
      document.getElementById("marital-status").value =
        personalInfo.maritalStatus || "";
      document.getElementById("religion").value = personalInfo.religion || "";
      document.getElementById("father").value = personalInfo.father || "";
      document.getElementById("spouse").value = personalInfo.spouse || "";
      document.getElementById("mother").value = personalInfo.mother || "";
    }
  }
  autofillFields();

  /**
   * ✅ Save Form Data Before Switching Sections
   */
  function saveCurrentFormData() {
    const activeSection =
      sidebarItems[currentSectionIndex].getAttribute("data-section");

    let storedData = JSON.parse(localStorage.getItem("resumeData")) || myData;

    switch (activeSection) {
      case "contact":
        storedData.contactInfo = {
          fullName: document.getElementById("full-name").value,
          email: document.getElementById("email").value,
          phone: document.getElementById("phone").value,
          city: document.getElementById("city-name").value,
          country: document.getElementById("country-name").value,
          pinCode: document.getElementById("pin-code").value,
          linkedin: document.getElementById("linkedin").value,
          github: document.getElementById("github").value,
          website: document.getElementById("website").value,
        };
        break;

      case "summary":
        storedData.summary = {
          text: document.getElementById("summary-text").value,
        };
        break;

      case "education":
        storedData.education = [...educationEntries];
        break;

      case "experience":
        storedData.experience = [...experienceEntries];
        break;

      case "projects":
        storedData.projects = [...projectEntries];
        break;

      case "skills":
        storedData.skills = [...skillList];
        break;

      case "certifications":
        storedData.certifications = [...certificateEntries];
        break;

      case "hobbies":
        storedData.hobbies = [...hobbiesList];
        break;

      case "personal-info":
        storedData.personalInfo = {
          dob: document.getElementById("dob").value,
          gender: document.getElementById("gender").value,
          maritalStatus: document.getElementById("marital-status").value,
          religion: document.getElementById("religion").value,
          father: document.getElementById("father").value,
          spouse: document.getElementById("spouse").value,
          mother: document.getElementById("mother").value,
        };
        break;
    }

    localStorage.setItem("resumeData", JSON.stringify(storedData));
    console.log("Updated Data Saved in localStorage:", storedData);
  }

  // ✅ Show a specific section based on index
  function showSectionByIndex(index) {
    if (index < 0 || index >= sidebarItems.length) return;

    formSections.forEach((section) => (section.style.display = "none"));
    const targetSection = document.getElementById(
      sidebarItems[index].getAttribute("data-section")
    );
    if (targetSection) targetSection.style.display = "block";

    sidebarItems.forEach((item, i) =>
      item.classList.toggle("active", i === index)
    );

    prevBtn.disabled = index === 0;

    nextBtn.innerText = index === sidebarItems.length - 1 ? "Finish" : "Next";

    nextBtn.replaceWith(nextBtn.cloneNode(true));
    nextBtn = document.getElementById("next-btn");

    nextBtn.addEventListener("click", () => {
      saveCurrentFormData();
      if (index < sidebarItems.length - 1) showSectionByIndex(index + 1);
    });

    prevBtn.replaceWith(prevBtn.cloneNode(true));
    prevBtn = document.getElementById("prev-btn");

    prevBtn.addEventListener("click", () => {
      saveCurrentFormData();
      showSectionByIndex(index - 1);
    });

    currentSectionIndex = index;
    updateProgress(index + 1);
  }

  // ✅ Handle Sidebar Click Events
  sidebarItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      saveCurrentFormData();
      showSectionByIndex(index);
    });
  });

  // ✅ Handle "preview-resume-btn"
  const previewBtn = document.getElementById("preview-resume-btn");
  if (previewBtn) {
    previewBtn.addEventListener("click", function () {
      alert("Opening Resume Preview...");
      window.location.href = "resume-preview.html";
    });
  }

  // ✅ Initially show the first section
  showSectionByIndex(0);
});

/* -------------------------------- */
/* 🚀 Progress Bar Logic 🚀 */
/* -------------------------------- */
const totalSteps = 9;
function updateProgress(currentStep) {
  document.getElementById("progressBar").style.width =
    (currentStep / totalSteps) * 100 + "%";
  document.getElementById("progressStep").innerText =
    currentStep + "/" + totalSteps;
}
