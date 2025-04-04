document.addEventListener("DOMContentLoaded", function () {
  // ✅ Retrieve stored projects from localStorage or initialize an empty array

  projectEntries = JSON.parse(localStorage.getItem("projectData")) || [];

  // ✅ Modal Elements
  const projectModal = document.getElementById("project-modal");
  const openProjectModalBtn = document.getElementById("open-project-modal");
  const closeProjectModalBtn = document.getElementById("close-project-modal");
  const projectModalList = document.getElementById("project-modal-list");
  const saveProjectBtn = document.getElementById("save-project");

  // ✅ Ensure Modal is Hidden on Load
  projectModal.style.display = "none";

  // ✅ Open Modal on Click
  openProjectModalBtn.addEventListener("click", function () {
    projectModal.style.display = "flex";
    displayProjectEntries();
  });

  // ✅ Close Modal on "X" Click
  closeProjectModalBtn.addEventListener("click", function () {
    projectModal.style.display = "none";
  });

  // ✅ Close Modal When Clicking Outside
  window.addEventListener("click", function (event) {
    if (event.target === projectModal) {
      projectModal.style.display = "none";
    }
  });

  // ✅ Function to Save Project Entry
  function saveProjectEntry() {
    const newEntry = {
      title: document.getElementById("project-title").value.trim(),
      description: document.getElementById("project-description").value.trim(),
      technologies: document
        .getElementById("project-achievements")
        .value.trim(),
    };

    // ✅ Validation
    if (!newEntry.title || !newEntry.description) {
      alert("Please enter at least the project title and description.");
      return;
    }

    // ✅ Save Entry
    projectEntries.push(newEntry);
    localStorage.setItem("projectData", JSON.stringify(projectEntries));

    // ✅ Update UI
    displayProjectEntries();
    clearProjectForm();
    updateViewProjectsButton();
  }

  // ✅ Function to Display Projects
  function displayProjectEntries() {
    projectModalList.innerHTML = "";

    if (projectEntries.length === 0) {
      projectModalList.innerHTML = `<tr><td colspan="5">No projects added yet.</td></tr>`;
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

    // ✅ Attach Event Listeners to Remove Buttons
    document.querySelectorAll(".remove-project").forEach((btn) => {
      btn.addEventListener("click", function () {
        const index = parseInt(btn.getAttribute("data-index"));
        projectEntries.splice(index, 1);
        localStorage.setItem("projectData", JSON.stringify(projectEntries));
        displayProjectEntries();
        updateViewProjectsButton();
      });
    });
  }

  // ✅ Function to Clear Form
  function clearProjectForm() {
    document.getElementById("project-title").value = "";
    document.getElementById("project-description").value = "";
    document.getElementById("project-achievements").value = "";
  }

  // ✅ Function to Update View Projects Button
  function updateViewProjectsButton() {
    openProjectModalBtn.innerText = `View (${projectEntries.length}) Projects`;
  }

  updateViewProjectsButton();

  // ✅ Attach Event Listener to Save Button
  saveProjectBtn.addEventListener("click", saveProjectEntry);
});
