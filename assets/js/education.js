document.addEventListener("DOMContentLoaded", function () {
  // ✅ Retrieve stored education data from localStorage, or initialize global array if none exists
  educationEntries = JSON.parse(localStorage.getItem("educationData")) || [];

  // ✅ Select modal-related DOM elements
  const educationModal = document.getElementById("education-modal");
  const openEducationModalBtn = document.getElementById("open-education-modal");
  const closeEducationModalBtn = document.getElementById(
    "close-education-modal"
  );
  const educationModalList = document.getElementById("education-modal-list");
  const saveEducationBtn = document.getElementById("save-education");

  // ✅ Hide modal initially to prevent unwanted display on page load
  educationModal.style.display = "none";

  // ✅ Open the education modal when the "Add Education" button is clicked
  openEducationModalBtn.addEventListener("click", function () {
    educationModal.style.display = "flex"; // Show modal
    displayEducationEntries(); // Ensure previously saved education data is displayed
  });

  // ✅ Close the modal when the close button ("X") is clicked
  closeEducationModalBtn.addEventListener("click", function () {
    educationModal.style.display = "none"; // Hide modal
  });

  // ✅ Close the modal if the user clicks outside of it (on the background overlay)
  window.addEventListener("click", function (event) {
    if (event.target === educationModal) {
      educationModal.style.display = "none";
    }
  });

  // ✅ Function to save a new education entry
  function saveEducationEntry() {
    // ✅ Collect form data and create a new entry object
    const newEntry = {
      degree: document.getElementById("education-degree").value.trim(),
      specialization: document.getElementById("education-subject").value.trim(),
      institution: document
        .getElementById("education-institution")
        .value.trim(),
      startYear: document.getElementById("education-start").value,
      endYear: document.getElementById("education-end").value || "Present", // Defaults to "Present" if left empty
      scoreType: document.getElementById("education-score-type").value, // CGPA or Percentage
      score: document.getElementById("education-score").value,
    };

    // ✅ Validate required fields (degree, institution, start year, and score cannot be empty)
    if (
      !newEntry.degree ||
      !newEntry.institution ||
      !newEntry.startYear ||
      !newEntry.score
    ) {
      alert("Please fill all required fields.");
      return;
    }

    // ✅ Validate score range based on score type (CGPA: 0-10, Percentage: 0-100)
    if (
      newEntry.scoreType === "CGPA" &&
      (newEntry.score < 0 || newEntry.score > 10)
    ) {
      alert("CGPA must be between 0 and 10.");
      return;
    } else if (
      newEntry.scoreType === "Percentage" &&
      (newEntry.score < 0 || newEntry.score > 100)
    ) {
      alert("Percentage must be between 0% and 100%.");
      return;
    }

    // ✅ Save the new entry into the global array and update localStorage
    educationEntries.push(newEntry);
    localStorage.setItem("educationData", JSON.stringify(educationEntries));

    updateViewEntriesButton();

    // ✅ Refresh the UI and clear form fields after saving
    displayEducationEntries();
    clearEducationForm();
  }

  // ✅ Function to display stored education entries inside the modal's table
  function displayEducationEntries() {
    educationModalList.innerHTML = ""; // ✅ Clear previous entries to avoid duplicates

    // ✅ Show a message if no education records exist
    if (educationEntries.length === 0) {
      educationModalList.innerHTML = `<tr><td colspan="7">No education records found.</td></tr>`;
      return;
    }

    // ✅ Iterate through stored education entries and dynamically create table rows
    educationEntries.forEach((entry, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${entry.degree}</td>
        <td>${entry.specialization || "N/A"}</td>
        <td>${entry.institution}</td>
        <td>${entry.startYear}</td>
        <td>${entry.endYear}</td>
        <td>${entry.score} ${
        entry.scoreType === "Percentage" ? "%" : entry.scoreType
      }</td>

        <td><button class="remove-entry" data-index="${index}">❌</button></td>
      `;
      educationModalList.appendChild(row);
    });

    // ✅ Attach event listeners to delete buttons for each entry
    document.querySelectorAll(".remove-entry").forEach((btn) => {
      btn.addEventListener("click", function () {
        const index = parseInt(btn.getAttribute("data-index")); // Get entry index
        educationEntries.splice(index, 1); // Remove entry from array
        localStorage.setItem("educationData", JSON.stringify(educationEntries)); // Update localStorage
        updateViewEntriesButton(); // update number of entries in the view entries button
        displayEducationEntries(); // Refresh UI
      });
    });
  }

  // ✅ Function to clear input fields after saving or canceling
  function clearEducationForm() {
    document.getElementById("education-degree").value = "";
    document.getElementById("education-subject").value = "";
    document.getElementById("education-institution").value = "";
    document.getElementById("education-start").value = "";
    document.getElementById("education-end").value = "";
    document.getElementById("education-score-type").value = "CGPA"; // Default to CGPA
    document.getElementById("education-score").value = "";
  }

  function updateViewEntriesButton() {
    openEducationModalBtn.innerText = `View (${educationEntries.length}) Entries`;
  }

  // ✅ Load existing education records from localStorage on page load
  displayEducationEntries();
  updateViewEntriesButton();

  // ✅ Attach event listener to the "Save Education" button
  saveEducationBtn.addEventListener("click", saveEducationEntry);
});
