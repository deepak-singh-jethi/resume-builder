document.addEventListener("DOMContentLoaded", function () {
  const nextButton = document.getElementById("next-btn-projects");
  const prevButton = document.getElementById("prev-btn-projects");

  prevButton.addEventListener("click", function () {
    const prevSectionId = prevButton.getAttribute("action-section");
    if (prevSectionId) showSection(prevSectionId);
  });

  nextButton.addEventListener("click", function () {
    const projectState = localStorage.getItem("projectState");
    const projectData = JSON.parse(localStorage.getItem("projectData")) || [];
    const hasSavedProjects = projectData.length > 0;

    const title = document.getElementById("project-title").value.trim();
    const description = document
      .getElementById("project-description")
      .value.trim();
    const achievements = document
      .getElementById("project-achievements")
      .value.trim();
    const hasInput = title || description || achievements;

    if (!projectState || projectState === "no") {
      moveToNextSection();
      return;
    }

    if (projectState === "yes" && hasSavedProjects && !hasInput) {
      moveToNextSection();
      return;
    }

    if (projectState === "yes" && !hasSavedProjects && hasInput) {
      saveProjectEntry();
      moveToNextSection();
      return;
    }

    if (!hasSavedProjects && !hasInput) {
      Swal.fire({
        title: "Missing Project",
        text: "Please add a project or fill in at least one field before proceeding.",
        icon: "warning",
      });
      return;
    }
  });

  function moveToNextSection() {
    const nextSectionId = nextButton.getAttribute("action-section");
    if (nextSectionId) showSection(nextSectionId);
  }

  function getStoredProjectData() {
    try {
      return JSON.parse(localStorage.getItem("projectData")) || [];
    } catch (error) {
      console.error("Invalid JSON in localStorage:", error);
      return [];
    }
  }

  let projectEntries = getStoredProjectData();

  const projectModal = document.getElementById("project-modal");
  const openProjectModalBtn = document.getElementById("open-project-modal");
  const closeProjectModalBtn = document.getElementById("close-project-modal");
  const projectModalList = document.getElementById("project-modal-list");
  const saveProjectBtn = document.getElementById("save-project");

  projectModal.style.display = "none";

  openProjectModalBtn.addEventListener("click", function () {
    projectModal.style.display = "flex";
    displayProjectEntries();
  });

  closeProjectModalBtn.addEventListener("click", function () {
    projectModal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target === projectModal) {
      projectModal.style.display = "none";
    }
  });

  function saveProjectEntry() {
    const newEntry = {
      title: document.getElementById("project-title").value.trim(),
      description: document.getElementById("project-description").value.trim(),
      achievements: document
        .getElementById("project-achievements")
        .value.trim(),
    };

    if (!newEntry.title || !newEntry.description) {
      Swal.fire({
        title: "Missing Fields",
        text: "Please enter at least the project title and description.",
        icon: "warning",
      });
      return;
    }

    projectEntries.push(newEntry);
    localStorage.setItem("projectData", JSON.stringify(projectEntries));
    updateViewProjectsButton();
    displayProjectEntries();
    clearProjectForm();

    Swal.fire({
      icon: "success",
      title: "Saved!",
      text: "Project added successfully.",
      timer: 1500,
      showConfirmButton: false,
    });
  }

  function displayProjectEntries() {
    projectModalList.innerHTML = "";

    if (projectEntries.length === 0) {
      projectModalList.innerHTML = `<tr><td colspan="3">No projects added yet.</td></tr>`;
      return;
    }

    projectEntries.forEach((entry, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${entry.title}</td>
        <td>${
          entry.description.length > 15
            ? entry.description.slice(0, 15) + "..."
            : entry.description
        }</td>
        <td><button class="remove-project" data-index="${index}">❌</button></td>
      `;
      projectModalList.appendChild(row);
    });

    document.querySelectorAll(".remove-project").forEach((btn) => {
      btn.addEventListener("click", function (event) {
        event.preventDefault(); // ✅ Prevent page refresh

        const index = parseInt(btn.getAttribute("data-index"));

        Swal.fire({
          title: "Are you sure?",
          text: "Do you want to delete this project?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            projectEntries.splice(index, 1);
            localStorage.setItem("projectData", JSON.stringify(projectEntries));
            updateViewProjectsButton();
            displayProjectEntries();

            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: "Project entry has been removed.",
              timer: 1500,
              showConfirmButton: false,
            });
          }
        });
      });
    });
  }

  function clearProjectForm() {
    document.getElementById("project-title").value = "";
    document.getElementById("project-description").value = "";
    document.getElementById("project-achievements").value = "";
  }

  function updateViewProjectsButton() {
    openProjectModalBtn.innerText = `View (${projectEntries.length}) Projects`;
  }

  updateViewProjectsButton();

  saveProjectBtn.addEventListener("click", saveProjectEntry);
});
