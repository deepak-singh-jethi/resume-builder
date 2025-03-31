document.addEventListener("DOMContentLoaded", function () {
  // Retrieve stored education data from localStorage or initialize an empty array
  educationEntries = JSON.parse(localStorage.getItem("educationData")) || [];

  // Select modal-related DOM elements
  const educationModal = document.getElementById("education-modal");
  const openEducationModalBtn = document.getElementById("open-education-modal");
  const closeEducationModalBtn = document.getElementById(
    "close-education-modal"
  );
  const educationModalList = document.getElementById("education-modal-list");
  const saveEducationBtn = document.getElementById("save-education");

  // Hide modal initially
  educationModal.style.display = "none";

  // Open the education modal
  openEducationModalBtn.addEventListener("click", function () {
    toggleModal(educationModal, true);
    displayEducationEntries();
  });

  // Close the modal when the close button is clicked
  closeEducationModalBtn.addEventListener("click", function () {
    toggleModal(educationModal, false);
  });

  // Close the modal if the user clicks outside of it
  window.addEventListener("click", function (event) {
    if (event.target === educationModal) {
      toggleModal(educationModal, false);
    }
  });

  // Save a new education entry
  saveEducationBtn.addEventListener("click", saveEducationEntry);

  // Function to toggle modal visibility
  function toggleModal(modal, show) {
    modal.style.display = show ? "flex" : "none";
  }

  // Function to save a new education entry
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

    // Save the new entry
    educationEntries.push(newEntry);
    localStorage.setItem("educationData", JSON.stringify(educationEntries));

    updateViewEntriesButton();
    displayEducationEntries();
    clearEducationForm();
  }

  // Function to validate score based on score type
  function isValidScore(score, scoreType) {
    if (scoreType === "CGPA") {
      return score >= 0 && score <= 10;
    } else if (scoreType === "Percentage") {
      return score >= 0 && score <= 100;
    }
    return false;
  }

  // Function to display stored education entries
  function displayEducationEntries() {
    educationModalList.innerHTML = ""; // Clear previous entries

    if (educationEntries.length === 0) {
      educationModalList.innerHTML = `<tr><td colspan="7">No education records found.</td></tr>`;
      return;
    }

    educationEntries.forEach((entry, index) => {
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

    // Attach event listeners to delete buttons
    document.querySelectorAll(".remove-entry").forEach((btn) => {
      btn.addEventListener("click", function () {
        const index = parseInt(btn.getAttribute("data-index"));
        educationEntries.splice(index, 1);
        localStorage.setItem("educationData", JSON.stringify(educationEntries));
        updateViewEntriesButton();
        displayEducationEntries();
      });
    });
  }

  // Function to clear input fields
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

  // Function to update the "View Entries" button text
  function updateViewEntriesButton() {
    openEducationModalBtn.innerText = `View (${educationEntries.length}) Entries`;
  }

  // Initialize the UI on page load
  displayEducationEntries();
  updateViewEntriesButton();
});
