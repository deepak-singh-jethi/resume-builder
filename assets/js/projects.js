document.addEventListener("DOMContentLoaded", function () {
  const nextButton = document.getElementById("next-btn-projects");
  const prevButton = document.getElementById("prev-btn-projects");

  // ✅ Handle "Previous" button click
  prevButton.addEventListener("click", function () {
    const prevSectionId = prevButton.getAttribute("action-section");
    if (prevSectionId) {
      showSection(prevSectionId); // Show the previous section
    }
  });

  // ✅ Handle "save and Next" button click
  nextButton.addEventListener("click", function () {
    const projectState = localStorage.getItem("projectState"); // "yes" or "no"
    const projectData = JSON.parse(localStorage.getItem("projectData")) || []; // Existing projects array
    const hasSavedProjects = projectData.length > 0; // Check if projects exist

    const title = document.getElementById("project-title").value.trim();
    const description = document
      .getElementById("project-description")
      .value.trim();
    const achievements = document
      .getElementById("project-achievements")
      .value.trim();
    const hasInput = title || description || achievements; // Check if any field has input
    // if projectState is "no"  or null/undefined and no input is given, just move to next section
    if (
      projectState === "no" ||
      projectState === null ||
      projectState === undefined
    ) {
      moveToNextSection();
      return;
    }

    // ✅ Case 1: Projects exist & inputs are empty → Move to next section
    if (projectState === "yes" && hasSavedProjects && !hasInput) {
      moveToNextSection();
      return;
    }

    // ✅ Case 2: No projects saved but inputs are filled → Save & Move
    if (projectState === "yes" && !hasSavedProjects && hasInput) {
      saveProjectEntry();
      moveToNextSection();
      return;
    }

    // ✅ Case 3: No projects exist & inputs are empty → Show alert & stop
    if (!hasSavedProjects && !hasInput) {
      alert(
        "Please add a project or fill in at least one field before proceeding."
      );
      return;
    }
  });

  // Function to handle navigation to the next section
  function moveToNextSection() {
    const nextSectionId = nextButton.getAttribute("action-section");
    if (nextSectionId) {
      showSection(nextSectionId);
    }
  }

  // ✅ Retrieve stored project entries safely
  function getStoredProjectData() {
    try {
      return JSON.parse(localStorage.getItem("projectData")) || [];
    } catch (error) {
      console.error("Invalid JSON in localStorage:", error);
      return [];
    }
  }

  let projectEntries = getStoredProjectData();

  // ✅ Modal Elements
  const projectModal = document.getElementById("project-modal"); // Modal container
  const openProjectModalBtn = document.getElementById("open-project-modal"); // Open modal button
  const closeProjectModalBtn = document.getElementById("close-project-modal"); // Close modal button
  const projectModalList = document.getElementById("project-modal-list"); // Table to display projects
  const saveProjectBtn = document.getElementById("save-project"); // Save button

  // ✅ Ensure Modal is Hidden on Load
  projectModal.style.display = "none";

  // ✅ Open Modal on Click (Displays the project list)
  openProjectModalBtn.addEventListener("click", function () {
    projectModal.style.display = "flex"; // Show modal
    displayProjectEntries(); // Load existing projects
  });

  // ✅ Close Modal on "X" Click
  closeProjectModalBtn.addEventListener("click", function () {
    projectModal.style.display = "none";
  });

  // ✅ Close Modal When Clicking Outside of It
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
      achievements: document
        .getElementById("project-achievements")
        .value.trim(),
    };

    // ✅ Validation: Ensure required fields are filled
    if (!newEntry.title || !newEntry.description) {
      alert("Please enter at least the project title and description.");
      return;
    }

    // ✅ Save Entry in Global Array & Local Storage
    projectEntries.push(newEntry);
    localStorage.setItem("projectData", JSON.stringify(projectEntries));
    updateViewProjectsButton(); // Update button text

    // ✅ Update UI
    displayProjectEntries();
    clearProjectForm(); // Clear the form after saving
  }

  // ✅ Function to Display Project Entries in Modal Table
  function displayProjectEntries() {
    projectModalList.innerHTML = ""; // Clear previous list

    // ✅ If no entries exist, display a message
    if (projectEntries.length === 0) {
      projectModalList.innerHTML = `<tr><td colspan="3">No projects added yet.</td></tr>`;
      return;
    }

    // ✅ Populate Table with Entries
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
        const index = parseInt(btn.getAttribute("data-index")); // Get entry index
        projectEntries.splice(index, 1); // Remove entry from array
        localStorage.setItem("projectData", JSON.stringify(projectEntries)); // Update localStorage
        displayProjectEntries(); // Refresh list
        updateViewProjectsButton(); // Update button text
      });
    });
  }

  // ✅ Function to Clear Form Fields
  function clearProjectForm() {
    document.getElementById("project-title").value = "";
    document.getElementById("project-description").value = "";
    document.getElementById("project-achievements").value = "";
  }

  // ✅ Function to Update View Projects Button
  function updateViewProjectsButton() {
    openProjectModalBtn.innerText = `View (${projectEntries.length}) Projects`;
  }

  // ✅ Initialize UI with stored data
  updateViewProjectsButton();

  // ✅ Attach Event Listener to Save Button
  saveProjectBtn.addEventListener("click", saveProjectEntry);
});
