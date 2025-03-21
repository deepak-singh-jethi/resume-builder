document.addEventListener("DOMContentLoaded", function () {
  const sidebarItems = document.querySelectorAll(".sidebar-item");
  const formSections = document.querySelectorAll(".form-section");
  const nextButtons = document.querySelectorAll(".next-btn");
  const prevButtons = document.querySelectorAll(".prev-btn");

  function showForm(sectionId) {
    formSections.forEach((form) => {
      form.classList.remove("active");
    });

    document.getElementById(sectionId).classList.add("active");

    // Highlight the correct sidebar item
    sidebarItems.forEach((item) => {
      item.classList.remove("active");
      if (item.dataset.section === sectionId) {
        item.classList.add("active");
      }
    });
  }

  // Sidebar Click Event
  sidebarItems.forEach((item) => {
    item.addEventListener("click", function () {
      showForm(this.dataset.section);
    });
  });

  // Next Button Event
  nextButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      showForm(this.dataset.next);
    });
  });

  // Previous Button Event
  prevButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      showForm(this.dataset.prev);
    });
  });
});
