/* -------------------------------- */
/* 🚀 Resume Form Handler Script 🚀 */
/* -------------------------------- */

// ✅ Manages Progress Bar, Sidebar Navigation & Form Data Sync

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
    myData = JSON.parse(savedData);

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

    // ✅ Autofill form fields if data exists
    if (myData.contactInfo) {
      document.getElementById("full-name").value =
        myData.contactInfo.fullName || "";
      document.getElementById("email").value = myData.contactInfo.email || "";
      document.getElementById("phone").value = myData.contactInfo.phone || "";
      document.getElementById("city-name").value =
        myData.contactInfo.city || "";
      document.getElementById("country-name").value =
        myData.contactInfo.country || "";
      document.getElementById("pin-code").value =
        myData.contactInfo.pinCode || "";
      document.getElementById("linkedin").value =
        myData.contactInfo.linkedin || "";
      document.getElementById("github").value = myData.contactInfo.github || "";
      document.getElementById("website").value =
        myData.contactInfo.website || "";
    }

    if (myData.summary) {
      document.getElementById("summary-text").value = myData.summary.text || "";
    }

    if (myData.personalInfo) {
      document.getElementById("dob").value = myData.personalInfo.dob || "";
      document.getElementById("gender").value =
        myData.personalInfo.gender || "";
      document.getElementById("marital-status").value =
        myData.personalInfo.maritalStatus || "";
      document.getElementById("religion").value =
        myData.personalInfo.religion || "";
      document.getElementById("father").value =
        myData.personalInfo.father || "";
      document.getElementById("spouse").value =
        myData.personalInfo.spouse || "";
      document.getElementById("mother").value =
        myData.personalInfo.mother || "";
    }
  }

  /**
   * ✅ Save Form Data Before Switching Sections
   */
  function saveCurrentFormData() {
    const activeSection =
      sidebarItems[currentSectionIndex].getAttribute("data-section");

    // Load previous data to prevent overwriting
    let storedData = JSON.parse(localStorage.getItem("resumeData")) || {};

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

    // ✅ Save merged data to localStorage
    localStorage.setItem("resumeData", JSON.stringify(storedData));
    console.log("Updated Data Saved in localStorage:", storedData);
  }

  // ✅ Show a specific section based on index
  function showSectionByIndex(index) {
    if (index < 0 || index >= sidebarItems.length) return;

    const targetSection = sidebarItems[index].getAttribute("data-section");

    formSections.forEach((section) => (section.style.display = "none"));
    const activeSection = document.getElementById(targetSection);
    if (activeSection) activeSection.style.display = "block";

    sidebarItems.forEach((item, i) =>
      item.classList.toggle("active", i === index)
    );

    prevBtn.disabled = index === 0;

    if (index === sidebarItems.length - 1) {
      nextBtn.innerText = "Finish";
      nextBtn.replaceWith(nextBtn.cloneNode(true));
      nextBtn = document.getElementById("next-btn");

      nextBtn.addEventListener("click", () => {
        saveCurrentFormData();
        alert("Form Completed! ✅ Data Saved.");
      });
    } else {
      nextBtn.innerText = "Next";
      nextBtn.replaceWith(nextBtn.cloneNode(true));
      nextBtn = document.getElementById("next-btn");

      nextBtn.addEventListener("click", () => {
        saveCurrentFormData();
        showSectionByIndex(index + 1);
      });
    }

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
  const progressBar = document.getElementById("progressBar");
  const progressStep = document.getElementById("progressStep");

  progressBar.style.width = (currentStep / totalSteps) * 100 + "%";
  progressStep.innerText = currentStep + "/" + totalSteps;
}
