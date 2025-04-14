document.addEventListener("DOMContentLoaded", function () {
  const sidebarItems = document.querySelectorAll(".sidebar-item");
  const allSections = document.querySelectorAll(".form-section");

  function showSection(sectionId) {
    allSections.forEach((section) => {
      section.style.display = "none"; // Hide all sections
    });

    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
      activeSection.style.display = "block"; // Show the selected section
    }

    // Update active sidebar item
    sidebarItems.forEach((item) => item.classList.remove("active"));
    const activeItem = document.querySelector(`[data-section="${sectionId}"]`);
    if (activeItem) {
      activeItem.classList.add("active");
    }

    // ✅ Close the sidebar after section selection
    document.querySelector(".sidebar").classList.remove("open");

    // Update progress bar
    handleProgressBar(sectionId);
  }

  // Attach event listeners
  sidebarItems.forEach((item) => {
    item.addEventListener("click", function () {
      const sectionId = this.getAttribute("data-section");
      showSection(sectionId);
    });
  });

  // Automatically show the first section on load
  const firstSection = sidebarItems[0]?.getAttribute("data-section");
  if (firstSection) {
    showSection(firstSection);
  }
});
