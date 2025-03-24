document.addEventListener("DOMContentLoaded", function () {
  let educationEntries =
    JSON.parse(localStorage.getItem("educationData")) || []; // ✅ Load existing data

  // ✅ Modal Elements
  const educationModal = document.getElementById("education-modal");
  const openEducationModalBtn = document.getElementById("open-education-modal");
  const closeEducationModalBtn = document.getElementById(
    "close-education-modal"
  );
  const educationModalList = document.getElementById("education-modal-list");
  const saveEducationBtn = document.getElementById("save-education");

  // ✅ Ensure Modal is Hidden on Load
  educationModal.style.display = "none";

  // ✅ Open Modal on Click
  openEducationModalBtn.addEventListener("click", function () {
    educationModal.style.display = "flex";
    displayEducationEntries(); // ✅ Now shows existing local storage data
  });

  // ✅ Close Modal on "X" Click
  closeEducationModalBtn.addEventListener("click", function () {
    educationModal.style.display = "none";
  });

  // ✅ Close Modal When Clicking Outside
  window.addEventListener("click", function (event) {
    if (event.target === educationModal) {
      educationModal.style.display = "none";
    }
  });

  // ✅ Function to Save Education Entry
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
    };

    // ✅ Validation for Required Fields
    if (
      !newEntry.degree ||
      !newEntry.institution ||
      !newEntry.startYear ||
      !newEntry.score
    ) {
      alert("Please fill all required fields.");
      return;
    }

    // ✅ Validate Score Range
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

    // ✅ Save Entry in Global Array & Local Storage
    educationEntries.push(newEntry);
    localStorage.setItem("educationData", JSON.stringify(educationEntries));

    // ✅ Update UI
    displayEducationEntries();
    clearEducationForm();
  }

  // ✅ Function to Display Education Entries in Modal Table
  function displayEducationEntries() {
    educationModalList.innerHTML = ""; // ✅ Clear previous list

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
        <td>${entry.score} ${entry.scoreType}</td>
        <td><button class="remove-entry" data-index="${index}">❌</button></td>
      `;
      educationModalList.appendChild(row);
    });

    // ✅ Attach Remove Event Listeners
    document.querySelectorAll(".remove-entry").forEach((btn) => {
      btn.addEventListener("click", function () {
        const index = parseInt(btn.getAttribute("data-index"));
        educationEntries.splice(index, 1);
        localStorage.setItem("educationData", JSON.stringify(educationEntries));
        displayEducationEntries();
      });
    });
  }

  // ✅ Function to Clear Form
  function clearEducationForm() {
    document.getElementById("education-degree").value = "";
    document.getElementById("education-subject").value = "";
    document.getElementById("education-institution").value = "";
    document.getElementById("education-start").value = "";
    document.getElementById("education-end").value = "";
    document.getElementById("education-score-type").value = "CGPA";
    document.getElementById("education-score").value = "";
  }

  // ✅ Load Existing Entries on Page Load
  displayEducationEntries();

  // ✅ Attach Event Listeners
  saveEducationBtn.addEventListener("click", saveEducationEntry);
});
