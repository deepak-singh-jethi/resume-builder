/* -------------------------------- */
/* Resume Form Handler Script 🚀 */
/* -------------------------------- */

// ✅ Manages Progress Bar, Sidebar Navigation & Form Data Sync

let myData = {
  contactInfo: {},
  summary: {},
  education: [],
  experience: [],
  projects: [],
  skills: [],
  languages: [],
  achievements: [],
  hobbies: [],
};

// ✅ Global Arrays for Education  Experience and Project Data
let educationEntries = [];
let experienceEntries = [];
let projectEntries = [];
let certificateEntries = [];
let skillList = [];
let hobbiesList = [];

document.addEventListener("DOMContentLoaded", function () {
  // ✅ Get references to sidebar items, form sections, and navigation buttons
  const sidebarItems = document.querySelectorAll(".sidebar-item");
  const formSections = document.querySelectorAll(".form-section");
  let prevBtn = document.getElementById("prev-btn");
  let nextBtn = document.getElementById("next-btn");

  let currentSectionIndex = 0; // ✅ Track current form section index

  // ✅ Restore saved form data from localStorage (if available)
  const savedData = localStorage.getItem("resumeData");
  if (savedData) {
    myData = JSON.parse(savedData);
    educationEntries = myData.education || [];
    experienceEntries = myData.experience || [];
    console.log("Loaded Saved Data:", myData);
  }

  /**
   * ✅ Show a specific section based on index
   * @param {number} index - Index of the section to display
   */
  function showSectionByIndex(index) {
    if (index < 0 || index >= sidebarItems.length) return;

    const targetSection = sidebarItems[index].getAttribute("data-section");

    // Hide all sections and display the active one
    formSections.forEach((section) => (section.style.display = "none"));
    const activeSection = document.getElementById(targetSection);
    if (activeSection) activeSection.style.display = "block";

    // Highlight the active sidebar item
    sidebarItems.forEach((item, i) =>
      item.classList.toggle("active", i === index)
    );

    // Enable/Disable navigation buttons based on the current section
    prevBtn.disabled = index === 0;

    if (index === sidebarItems.length - 1) {
      nextBtn.innerText = "Finish";

      // ✅ Remove previous event listener before adding a new one
      nextBtn.replaceWith(nextBtn.cloneNode(true));
      nextBtn = document.getElementById("next-btn"); // Get new reference

      nextBtn.addEventListener("click", () => {
        saveCurrentFormData();
        alert("Form Completed! ✅ Data Saved.");
      });
    } else {
      nextBtn.innerText = "Next";

      // ✅ Remove previous event listener before adding a new one
      nextBtn.replaceWith(nextBtn.cloneNode(true));
      nextBtn = document.getElementById("next-btn"); // Get new reference

      nextBtn.addEventListener("click", () => {
        saveCurrentFormData();
        showSectionByIndex(index + 1);
      });
    }

    // ✅ Remove and reattach previous button event listener
    prevBtn.replaceWith(prevBtn.cloneNode(true));
    prevBtn = document.getElementById("prev-btn"); // Get new reference

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
      saveCurrentFormData(); // Save data before switching
      showSectionByIndex(index);
    });
  });

  // ✅ Handle "Next" Button Click
  nextBtn.addEventListener("click", () => {
    saveCurrentFormData();
    const newIndex = currentSectionIndex + 1;
    console.log(newIndex);

    if (newIndex < sidebarItems.length) showSectionByIndex(newIndex);
  });

  // ✅ Handle "Previous" Button Click
  prevBtn.addEventListener("click", () => {
    saveCurrentFormData();
    const newIndex = currentSectionIndex - 1;
    if (newIndex >= 0) showSectionByIndex(newIndex);
  });
  // ✅ Handle "preview-resume-btn" Button Click
  const previewBtn = document.getElementById("preview-resume-btn");
  if (previewBtn) {
    previewBtn.addEventListener("click", function () {
      alert("Opening Resume Preview...");
      window.location.href = "resume-preview.html"; // Replace with actual preview page
    });
  } else {
    console.error("Preview button not found!");
  }

  /**
   * ✅ Save Form Data Before Switching Sections
   */
  function saveCurrentFormData() {
    const activeSection =
      sidebarItems[currentSectionIndex].getAttribute("data-section");

    switch (activeSection) {
      case "contact":
        myData.contactInfo = {
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
        myData.summary = {
          text: document.getElementById("summary-text").value,
        };
        break;

      case "education":
        myData.education = [...educationEntries];
        break;

      case "experience":
        myData.experience = [...experienceEntries];
        break;

      case "projects":
        myData.projects = [...projectEntries];
        break;

      case "skills":
        myData.skills = [...skillList];
        break;

      case "certifications":
        myData.certifications = [...certificateEntries];
        break;

      case "hobbies":
        myData.hobbies = [...hobbiesList];
        break;
      case "personal-info":
        myData.personalInfo = {
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

    // ✅ Save data to localStorage for persistence
    localStorage.setItem("resumeData", JSON.stringify(myData));
    console.log("Updated Data:", myData);
  }

  // ✅ Initially show the first section (Contact Info)
  showSectionByIndex(0);
});

/* -------------------------------- */
/* 🚀 Progress Bar Logic 🚀 */
/* -------------------------------- */

const totalSteps = 9; // ✅ Define total steps for progress calculation

/**
 * ✅ Update Progress Bar
 * @param {number} currentStep - The current step number
 */
function updateProgress(currentStep) {
  const progressBar = document.getElementById("progressBar");
  const progressStep = document.getElementById("progressStep");

  progressBar.style.width = (currentStep / totalSteps) * 100 + "%";
  progressStep.innerText = currentStep + "/" + totalSteps;
}
