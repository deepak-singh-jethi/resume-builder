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
  const educationListTable = document.getElementById("education-list-table");
  const saveEducationBtn = document.getElementById("save-education");
  const clearEducationBtn = document.getElementById("clear-education");

  let educationEntries = [];

  // 📌 Function to Save Education Entry
  function saveEducationEntry() {
    const newEntry = {
      degree: document.getElementById("education-degree").value,
      subject: document.getElementById("education-subject").value,
      institution: document.getElementById("education-institution").value,
      startDate: document.getElementById("education-start").value,
      endDate: document.getElementById("education-end").value || "Present",
      scoreType: document.getElementById("education-score-type").value,
      score: document.getElementById("education-score").value,
    };

    // Check for missing required fields
    if (
      !newEntry.degree ||
      !newEntry.institution ||
      !newEntry.startDate ||
      !newEntry.score
    ) {
      alert("Please fill all required fields.");
      return;
    }

    // Validate score range
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

    console.log(newEntry);

    // Save new entry
    educationEntries.push(newEntry);
    displayEducationEntries();
    clearForm();
  }

  // 📌 Function to Display Education Entries
  function displayEducationEntries() {
    educationListTable.innerHTML = "";

    educationEntries.forEach((entry, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${entry.degree}</td>
                <td>${entry.subject || "N/A"}</td>
                <td>${entry.institution}</td>
                <td>${entry.startDate}</td>
                <td>${entry.endDate}</td>
                <td>${entry.score} ${entry.scoreType}</td>
                <td>
                    <button class="remove-entry" data-index="${index}">❌</button>
                </td>
            `;
      educationListTable.appendChild(row);
    });

    // Attach remove event listeners
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

  // Event Listeners
  saveEducationBtn.addEventListener("click", saveEducationEntry);
  clearEducationBtn.addEventListener("click", clearForm);
});

console.log(myData);
