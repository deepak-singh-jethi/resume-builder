document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.querySelector(".sidebar");
  const sidebarItems = document.querySelectorAll(".sidebar-item");
  const hamburger = document.querySelector(".hamburger");

  // Toggle Sidebar Collapse
  hamburger.addEventListener("click", function () {
    sidebar.classList.toggle("collapsed");
  });

  // Sidebar Item Click Handling
  sidebarItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Remove active class from all items
      sidebarItems.forEach((i) => i.classList.remove("active"));

      // Add active class to clicked item
      this.classList.add("active");

      // Update Form Section
      const section = this.getAttribute("data-section");
      showSection(section);
    });
  });

  // Function to Show Selected Form
  function showSection(section) {
    const allSections = document.querySelectorAll(".form-section");
    allSections.forEach((sec) => (sec.style.display = "none"));

    const activeSection = document.getElementById(section);
    if (activeSection) {
      activeSection.style.display = "block";
    }
  }
});
