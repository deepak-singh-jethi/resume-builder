document.addEventListener("DOMContentLoaded", function () {
  const prevBtn = document.getElementById("prev-btn-experience");
  const nextBtn = document.getElementById("next-btn-experience");

  // ✅ Handle Previous button navigation
  prevBtn.addEventListener("click", function () {
    const prevSectionId = prevBtn.getAttribute("action-section");
    if (prevSectionId) {
      showSection(prevSectionId); // Show the previous section
    }
  });

  // ✅ Handle save Next button navigation
  nextBtn.addEventListener("click", function () {
    const experienceState = localStorage.getItem("experienceState"); // "yes" or "no"
    const experienceData =
      JSON.parse(localStorage.getItem("experienceData")) || []; // Get stored experiences
    const hasSavedExperiences = experienceData.length > 0; // Check if experiences exist

    const company = document.getElementById("experience-company").value.trim();
    const role = document.getElementById("experience-role").value.trim();
    const startDate = document.getElementById("experience-start").value.trim();
    const hasInput = company || role || startDate; // Check if input fields have data

    // if experienceState is "no"  or null / undefined and no input is given, just move to next section
    if (
      experienceState === "no" ||
      experienceState === null ||
      experienceState === undefined
    ) {
      moveToNextSection();
      return;
    }

    // ✅ Case 1: Experiences exist & inputs are empty → Move to next section
    if (experienceState === "yes" && hasSavedExperiences && !hasInput) {
      moveToNextSection();
      return;
    }

    // ✅ Case 2: No experiences saved but inputs are filled → Save & Move
    if (experienceState === "yes" && !hasSavedExperiences && hasInput) {
      saveExperienceEntry();
      moveToNextSection();
      return;
    }

    // ✅ Case 3: No experiences exist & inputs are empty → Show alert & stop
    if (!hasSavedExperiences && !hasInput) {
      alert(
        "Please add an experience or fill in at least one required field before proceeding."
      );
      return;
    }
  });

  // Function to handle navigation to the next section
  function moveToNextSection() {
    const nextSectionId = nextBtn.getAttribute("action-section");
    if (nextSectionId) {
      showSection(nextSectionId);
    }
  }

  // ✅ Retrieve stored experience entries safely
  function getStoredExperienceData() {
    try {
      return JSON.parse(localStorage.getItem("experienceData")) || [];
    } catch (error) {
      console.error("Invalid JSON in localStorage:", error);
      return [];
    }
  }

  let experienceEntries = getStoredExperienceData();

  // ✅ Modal Elements
  const experienceModal = document.getElementById("experience-modal"); // Modal container
  const openExperienceModalBtn = document.getElementById(
    "open-experience-modal"
  ); // Open modal button
  const closeExperienceModalBtn = document.getElementById(
    "close-experience-modal"
  ); // Close modal button
  const experienceModalList = document.getElementById("experience-modal-list"); // Table to display experiences
  const saveExperienceBtn = document.getElementById("save-experience"); // Save button

  // ✅ Form Elements
  const endDateInput = document.getElementById("experience-end"); // End date input field
  const currentCheckbox = document.getElementById("experience-current"); // "Currently Working" checkbox

  // ✅ Ensure Modal is Hidden on Load
  experienceModal.style.display = "none";

  // ✅ Handle "Currently Working Here" Checkbox (Disables End Date if checked)
  currentCheckbox.addEventListener("change", function () {
    endDateInput.disabled = this.checked; // Disable end date input when checked
    if (this.checked) {
      endDateInput.value = ""; // Clear end date value when disabled
    }
  });

  // ✅ Open Modal on Click (Displays the experience list)
  openExperienceModalBtn.addEventListener("click", function () {
    experienceModal.style.display = "flex"; // Show modal
    displayExperienceEntries(); // Load existing experience entries
  });

  // ✅ Close Modal on "X" Click
  closeExperienceModalBtn.addEventListener("click", function () {
    experienceModal.style.display = "none";
  });

  // ✅ Close Modal When Clicking Outside of It
  window.addEventListener("click", function (event) {
    if (event.target === experienceModal) {
      experienceModal.style.display = "none";
    }
  });

  // ✅ Function to Save Experience Entry
  function saveExperienceEntry() {
    // Create a new experience object from form values
    const newEntry = {
      company: document.getElementById("experience-company").value.trim(),
      role: document.getElementById("experience-role").value.trim(),
      industry: document.getElementById("experience-industry").value,
      startDate: document.getElementById("experience-start").value,
      endDate: currentCheckbox.checked ? "Present" : endDateInput.value, // Set "Present" if checkbox is checked
      location: document.getElementById("experience-location").value,
      description: document
        .getElementById("experience-responsibility")
        .value.trim(),
    };

    // ✅ Validation: Ensure required fields are filled
    if (!newEntry.company || !newEntry.role || !newEntry.startDate) {
      alert("Please fill in required fields (Company, Role, Start Date).");
      return;
    }

    // ✅ Save Entry in Global Array & Local Storage
    experienceEntries.push(newEntry);
    localStorage.setItem("experienceData", JSON.stringify(experienceEntries));
    updateViewEntriesButton(); // Update button text

    // ✅ Update UI
    displayExperienceEntries();
    clearExperienceForm(); // Clear the form after saving
  }

  // ✅ Function to Display Experience Entries in Modal Table
  function displayExperienceEntries() {
    experienceModalList.innerHTML = ""; // Clear previous list

    // ✅ If no entries exist, display a message
    if (experienceEntries.length === 0) {
      experienceModalList.innerHTML = `<tr><td colspan="7">No experience records found.</td></tr>`;
      return;
    }

    // ✅ Populate Table with Entries
    experienceEntries.forEach((entry, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${entry.company}</td>
        <td>${entry.role}</td>
        <td>${entry.industry}</td>
        <td>${entry.location}</td>
        <td>${entry.startDate}</td>
        <td>${entry.endDate === "Present" ? "Present" : entry.endDate}</td>
        <td><button class="remove-entry" data-index="${index}">❌</button></td>
      `;
      experienceModalList.appendChild(row);
    });

    // ✅ Attach Event Listeners to Remove Buttons
    document.querySelectorAll(".remove-entry").forEach((btn) => {
      btn.addEventListener("click", function () {
        const index = parseInt(btn.getAttribute("data-index")); // Get entry index
        experienceEntries.splice(index, 1); // Remove entry from array
        localStorage.setItem(
          "experienceData",
          JSON.stringify(experienceEntries)
        ); // Update localStorage
        displayExperienceEntries(); // Refresh list
        updateViewEntriesButton(); // Update button text
      });
    });
  }

  // ✅ Function to Clear Form Fields
  function clearExperienceForm() {
    document.getElementById("experience-company").value = "";
    document.getElementById("experience-role").value = "";
    document.getElementById("experience-industry").value = "IT";
    document.getElementById("experience-start").value = "";
    document.getElementById("experience-end").value = "";
    document.getElementById("experience-current").checked = false;
    document.getElementById("experience-location").value = "Onsite";
    document.getElementById("experience-responsibility").value = "";
    endDateInput.disabled = false; // Ensure End Date is enabled after reset
  }

  function updateViewEntriesButton() {
    openExperienceModalBtn.innerText = `View (${experienceEntries.length}) Entries`;
  }

  // ✅ Initialize UI with stored data
  updateViewEntriesButton();

  // ✅ Attach Event Listener to Save Button
  saveExperienceBtn.addEventListener("click", saveExperienceEntry);
});
