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

    // Get the corresponding section ID from sidebar
    const targetSection = sidebarItems[index].getAttribute("data-section");

    // Show only the matched form section
    Object.values(sectionMap).forEach((section) => {
      section.style.display = section.id === targetSection ? "block" : "none";
    });

    // Highlight the active sidebar item
    sidebarItems.forEach((item, i) => {
      item.classList.toggle("active", i === index);
    });

    // Enable/Disable navigation buttons
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === sidebarItems.length - 1;

    // Update the current section index
    currentSectionIndex = index;
  }

  // Handle sidebar item clicks
  sidebarItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      showSectionByIndex(index);
    });
  });

  // Handle Next button click
  nextBtn.addEventListener("click", () => {
    if (currentSectionIndex < sidebarItems.length - 1) {
      showSectionByIndex(++currentSectionIndex);
    }
  });

  // Handle Previous button click
  prevBtn.addEventListener("click", () => {
    if (currentSectionIndex > 0) {
      showSectionByIndex(--currentSectionIndex);
    }
  });

  // Show the first section by default
  showSectionByIndex(0);
});
