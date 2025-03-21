/* -------------------------------- */
/* This JS files mainly handles  Progress bar and form navigation from sidebar and Prev ,Next button */
/* -------------------------------- */

document.addEventListener("DOMContentLoaded", function () {
  // Select all sidebar items
  const sidebarItems = document.querySelectorAll(".sidebar-item");

  // Select all form sections
  const formSections = document.querySelectorAll(".form-section");

  // Get navigation buttons
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  // Track the currently active section
  let currentSectionIndex = 0;

  // Create a mapping of section names to their respective DOM elements
  const sectionMap = {};
  formSections.forEach((section) => {
    sectionMap[section.id] = section;
  });

  // Function to update the displayed section
  function showSectionByIndex(index) {
    if (index < 0 || index >= sidebarItems.length) return;

    // Get target section
    const targetSection = sidebarItems[index].getAttribute("data-section");

    // Hide all sections, then show only the target section
    formSections.forEach((section) => {
      section.style.display = "none";
    });

    const activeSection = sectionMap[targetSection];
    if (activeSection) {
      activeSection.style.display = "block";
    }

    // Highlight active sidebar item
    sidebarItems.forEach((item, i) =>
      item.classList.toggle("active", i === index)
    );

    // Enable/Disable navigation buttons
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === sidebarItems.length - 1;

    // Update index
    currentSectionIndex = index;

    // Update Progress Bar
    updateProgress(index + 1);
  }

  // Handle sidebar item clicks
  sidebarItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      showSectionByIndex(index);
    });
  });

  // Handle Next and Previous button clicks
  [prevBtn, nextBtn].forEach((btn, direction) => {
    btn.addEventListener("click", () => {
      const newIndex = currentSectionIndex + (direction ? 1 : -1);
      if (newIndex >= 0 && newIndex < sidebarItems.length) {
        showSectionByIndex(newIndex);
      }
    });
  });

  // Show the first section by default
  showSectionByIndex(0);
});

/* -------------------------------- */
/* 🚀 Progress BAR 🚀 */
/* -------------------------------- */

// !Change this based on the total number of sections

const totalSteps = 7;

function updateProgress(currentStep) {
  const progressBar = document.getElementById("progressBar");
  const progressStep = document.getElementById("progressStep");

  progressBar.style.width = (currentStep / totalSteps) * 100 + "%";
  progressStep.innerText = currentStep + "/" + totalSteps;
}
