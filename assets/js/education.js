const educationObject = {
  degree: "",
  specialization: "",
  institution: "",
  startYear: "",
  endYear: "",
  scoreType: "",
  score: "",
};

document.addEventListener("DOMContentLoaded", function () {
  const educationListTable = document.getElementById("education-modal-list"); // ✅ Using modal table
  const saveEducationBtn = document.getElementById("save-education");
  const clearEducationBtn = document.getElementById("clear-education");

  // ✅ Modal Elements
  const educationModal = document.getElementById("education-modal");
  const openEducationModalBtn = document.getElementById("open-education-modal");
  const closeEducationModalBtn = document.getElementById(
    "close-education-modal"
  );

  // ✅ Ensure Modal is Hidden on Load
  educationModal.style.display = "none";

  // 📌 Open Modal on Button Click
  openEducationModalBtn.addEventListener("click", function () {
    educationModal.style.display = "flex";
    displayEducationEntries(); // ✅ Render entries inside modal
  });

  // 📌 Close Modal on "X" Click
  closeEducationModalBtn.addEventListener("click", function () {
    educationModal.style.display = "none";
  });

  // 📌 Close Modal When Clicking Outside
  window.addEventListener("click", function (event) {
    if (event.target === educationModal) {
      educationModal.style.display = "none";
    }
  });

  // 📌 Function to Save Education Entry
  function saveEducationEntry() {
    const newEntry = {
      degree: document.getElementById("education-degree").value,
      specialization: document.getElementById("education-subject").value,
      institution: document.getElementById("education-institution").value,
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

    // ✅ Save Entry
    educationEntries.push(newEntry);
    displayEducationEntries(); // ✅ Updates modal table
    clearForm();
  }

  // 📌 Function to Display Education Entries in Modal Table
  function displayEducationEntries() {
    educationListTable.innerHTML = ""; // ✅ Clear previous entries

    if (educationEntries.length === 0) {
      educationListTable.innerHTML = `<tr><td colspan="7">No education records found.</td></tr>`;
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
      educationListTable.appendChild(row);
    });

    // ✅ Attach Remove Event Listeners
    document.querySelectorAll(".remove-entry").forEach((btn) => {
      btn.addEventListener("click", function () {
        const index = parseInt(btn.getAttribute("data-index"));
        educationEntries.splice(index, 1);
        displayEducationEntries();
      });
    });
  }

  // 📌 Function to Clear Form
  function clearForm() {
    document.getElementById("education-degree").value = "";
    document.getElementById("education-subject").value = "";
    document.getElementById("education-institution").value = "";
    document.getElementById("education-start").value = "";
    document.getElementById("education-end").value = "";
    document.getElementById("education-score-type").value = "CGPA";
    document.getElementById("education-score").value = "";
  }

  // ✅ Event Listeners
  saveEducationBtn.addEventListener("click", saveEducationEntry);
  clearEducationBtn.addEventListener("click", clearForm);
});
