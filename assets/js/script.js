document.addEventListener("DOMContentLoaded", function () {
  // ✅ Retrieve last visited section (or default to "contact")
  const defaultSection = localStorage.getItem("currentSection") || "contact";
  showSection(defaultSection);
});

function showSection(sectionId) {
  sectionId = sectionId || "contact"; // Default to "contact" if no ID is provided

  // ✅ Hide all sections and show only the selected one
  document.querySelectorAll(".form-section").forEach((section) => {
    section.style.display = section.id === sectionId ? "block" : "none";
  });

  // ✅ Update sidebar active state
  document.querySelectorAll(".sidebar-item").forEach((item) => {
    item.classList.toggle(
      "active",
      item.getAttribute("data-section") === sectionId
    );
  });

  // ✅ Save current section to localStorage
  localStorage.setItem("currentSection", sectionId);
}
