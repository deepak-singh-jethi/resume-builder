document.addEventListener("DOMContentLoaded", function () {
  // Select modal-related DOM elements
  const educationModal = document.getElementById("education-modal");
  const openEducationModalBtn = document.getElementById("open-education-modal");
  const closeEducationModalBtn = document.getElementById(
    "close-education-modal"
  );
  const educationModalList = document.getElementById("education-modal-list");
  const saveEducationBtn = document.getElementById("save-education");
  const prevButton = document.getElementById("prev-btn-education");
  const nextButton = document.getElementById("next-btn-education");

  // ✅ Handle "save and Next" button click
  nextButton.addEventListener("click", function () {
    const educationState = localStorage.getItem("educationState");
    if (educationState === "yes") saveEducationEntry(); // Save the education entry

    const nextSectionId = nextButton.getAttribute("action-section");

    if (nextSectionId) {
      showSection(nextSectionId);
    }
  });
  // ✅ Handle "Previous" button click

  prevButton.addEventListener("click", function () {
    const prevSectionId = prevButton.getAttribute("action-section");
    if (prevSectionId) {
      showSection(prevSectionId);
    }
  });

  // ✅ Safe function to get stored education data

  function getStoredEducationData() {
    try {
      return JSON.parse(localStorage.getItem("educationData")) || [];
    } catch (error) {
      console.error("Invalid JSON in localStorage:", error);
      return [];
    }
  }

  let educationData = getStoredEducationData(); // Load existing data

  // Hide modal initially
  educationModal.style.display = "none";

  // ✅ Save education entry
  function saveEducationEntry() {
    const newEntry = {
      degree: document.getElementById("education-degree").value.trim(),
      specialization: document.getElementById("education-subject").value.trim(),
      institution: document
        .getElementById("education-institution")
        .value.trim(),
      startYear: document.getElementById("education-start").value,
      endYear: document.getElementById("education-end").value || "Present",
      scoreType: document.getElementById("education-score-type").value,
      score: document.getElementById("education-score").value,
      location: document.getElementById("education-location").value.trim(),
    };

    // Validate required fields
    if (
      !newEntry.degree ||
      !newEntry.institution ||
      !newEntry.startYear ||
      !newEntry.score
    ) {
      alert("Please fill all required fields.");
      return;
    }

    // Validate score range
    if (!isValidScore(newEntry.score, newEntry.scoreType)) {
      alert(
        newEntry.scoreType === "CGPA"
          ? "CGPA must be between 0 and 10."
          : "Percentage must be between 0% and 100%."
      );
      return;
    }

    console.log("New Education Entry:", newEntry);

    // ✅ Add new entry and update localStorage
    educationData.push(newEntry);
    localStorage.setItem("educationData", JSON.stringify(educationData));

    updateViewEntriesButton();
    displayEducationEntries();
    clearEducationForm();
  }

  // ✅ Validate score
  function isValidScore(score, scoreType) {
    if (scoreType === "CGPA") return score >= 0 && score <= 10;
    if (scoreType === "Percentage") return score >= 0 && score <= 100;
    return false;
  }

  // ✅ Open the education modal
  openEducationModalBtn.addEventListener("click", function () {
    toggleModal(educationModal, true);
    displayEducationEntries();
  });

  // ✅ Close modal logic
  closeEducationModalBtn.addEventListener("click", function () {
    toggleModal(educationModal, false);
  });
  window.addEventListener("click", function (event) {
    if (event.target === educationModal) {
      toggleModal(educationModal, false);
    }
  });

  // ✅ Save education entry on button click
  saveEducationBtn.addEventListener("click", saveEducationEntry);

  // ✅ Toggle modal visibility
  function toggleModal(modal, show) {
    modal.style.display = show ? "flex" : "none";
  }

  // ✅ Display stored education entries
  function displayEducationEntries() {
    educationModalList.innerHTML = ""; // Clear previous entries

    if (educationData.length === 0) {
      educationModalList.innerHTML = `<tr><td colspan="7">No education records found.</td></tr>`;
      return;
    }

    educationData.forEach((entry, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${entry.degree}</td>
        <td>${entry.specialization || "N/A"}</td>
        <td>${entry.institution}</td>
        <td>${entry.startYear}</td>
        <td>${entry.endYear}</td>
        <td>${entry.location || "N/A"}</td>
        <td>${entry.score} ${
        entry.scoreType === "Percentage" ? "%" : entry.scoreType
      }</td>
        <td><button class="remove-entry" data-index="${index}">❌</button></td>
      `;
      educationModalList.appendChild(row);
    });

    // ✅ Attach event listeners to delete buttons
    document.querySelectorAll(".remove-entry").forEach((btn) => {
      btn.addEventListener("click", function () {
        const index = parseInt(btn.getAttribute("data-index"));
        educationData.splice(index, 1);

        // ✅ Update localStorage with modified data
        localStorage.setItem("educationData", JSON.stringify(educationData));
        updateViewEntriesButton();
        displayEducationEntries();
      });
    });
  }

  // ✅ Clear input fields
  function clearEducationForm() {
    document.getElementById("education-degree").value = "";
    document.getElementById("education-subject").value = "";
    document.getElementById("education-institution").value = "";
    document.getElementById("education-start").value = "";
    document.getElementById("education-end").value = "";
    document.getElementById("education-score-type").value = "CGPA";
    document.getElementById("education-score").value = "";
    document.getElementById("education-location").value = "";
  }

  // ✅ Update "View Entries" button text
  function updateViewEntriesButton() {
    openEducationModalBtn.innerText = `View (${educationData.length}) Entries`;
  }

  // ✅ Initialize UI
  displayEducationEntries();
  updateViewEntriesButton();
});
