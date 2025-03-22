/* -------------------------------- */
/* Handles Progress Bar, Sidebar Navigation & Form Data Sync */
/* -------------------------------- */

let myData = {
  personalInfo: {},
  summary: {},
  education: [],
  experience: [], // ✅ Added Experience Section
  projects: [],
  skills: [],
  languages: [],
  achievements: [],
  hobbies: [],
};

let educationEntries = [];
let experienceEntries = []; // ✅ Added Experience Array

document.addEventListener("DOMContentLoaded", function () {
  const sidebarItems = document.querySelectorAll(".sidebar-item");
  const formSections = document.querySelectorAll(".form-section");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  let currentSectionIndex = 0;

  // Restore saved data from localStorage
  const savedData = localStorage.getItem("resumeData");
  if (savedData) {
    myData = JSON.parse(savedData);
    educationEntries = myData.education || [];
    experienceEntries = myData.experience || []; // ✅ Load saved experience
    console.log("Loaded Saved Data:", myData);
  }

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
    nextBtn.disabled = index === sidebarItems.length - 1;

    currentSectionIndex = index;
    updateProgress(index + 1);
  }

  // Handle Sidebar Clicks
  sidebarItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      saveCurrentFormData();
      showSectionByIndex(index);
    });
  });

  // Handle Next & Previous Button Clicks
  nextBtn.addEventListener("click", () => {
    saveCurrentFormData();
    const newIndex = currentSectionIndex + 1;
    if (newIndex < sidebarItems.length) showSectionByIndex(newIndex);
  });

  prevBtn.addEventListener("click", () => {
    saveCurrentFormData();
    const newIndex = currentSectionIndex - 1;
    if (newIndex >= 0) showSectionByIndex(newIndex);
  });

  // ✅ Save Form Data Before Switching Sections
  function saveCurrentFormData() {
    const activeSection =
      sidebarItems[currentSectionIndex].getAttribute("data-section");

    switch (activeSection) {
      case "contact":
        myData.personalInfo = {
          fullName: document.getElementById("full-name").value,
          email: document.getElementById("email").value,
          phone: document.getElementById("phone").value,
          address: document.getElementById("address").value,
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
        myData.education = [...educationEntries]; // ✅ Sync Education Data
        break;

      case "experience":
        myData.experience = [...experienceEntries]; // ✅ Sync Experience Data
        break;

      case "projects":
        myData.projects.push({
          title: document.getElementById("project-title").value,
          description: document.getElementById("project-description").value,
          link: document.getElementById("project-link").value,
        });
        break;

      case "skills":
        myData.skills = document
          .getElementById("skills-input")
          .value.split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill !== "");
        break;

      case "languages":
        myData.languages = document
          .getElementById("languages-input")
          .value.split(",")
          .map((lang) => lang.trim())
          .filter((lang) => lang !== "");
        break;

      case "achievements":
        const newAchievement = document
          .getElementById("achievement-text")
          .value.trim();
        if (newAchievement) {
          myData.achievements.push({ achievement: newAchievement });
        }
        break;

      case "hobbies":
        myData.hobbies = document
          .getElementById("hobbies-input")
          .value.split(",")
          .map((hobby) => hobby.trim())
          .filter((hobby) => hobby !== "");
        break;
    }

    // ✅ Store Data in localStorage for Persistence
    localStorage.setItem("resumeData", JSON.stringify(myData));
    console.log("Updated Data:", myData);
  }

  showSectionByIndex(0);
});

/* -------------------------------- */
/* 🚀 Progress Bar Logic 🚀 */
/* -------------------------------- */
const totalSteps = 10;

function updateProgress(currentStep) {
  const progressBar = document.getElementById("progressBar");
  const progressStep = document.getElementById("progressStep");

  progressBar.style.width = (currentStep / totalSteps) * 100 + "%";
  progressStep.innerText = currentStep + "/" + totalSteps;
}
