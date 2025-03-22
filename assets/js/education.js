document.addEventListener("DOMContentLoaded", function () {
  const educationListTable = document.getElementById("education-list-table");
  const addEducationBtn = document.getElementById("add-education");
  const educationTable = document.getElementById("education-table");

  let educationEntries = []; // Stores saved education data

  // 📌 Create New Education Entry Form
  function createEducationEntry(existingData = null) {
    // if a form already exist dont open other education form
    if (document.querySelector(".education-form")) return;

    // create a education form using js
    const entryForm = document.createElement("div");
    entryForm.classList.add("education-form");

    entryForm.innerHTML = `
      <div class="form-row">
        <div class="input-group">
          <label>Degree:</label>
          <input type="text" list="degree-options" class="education-degree" placeholder="Enter or select degree" value="${
            existingData?.degree || ""
          }">
          <datalist id="degree-options">
            <option value="B.Tech"></option>
            <option value="M.Tech"></option>
            <option value="MBA"></option>
            <option value="Diploma"></option>
            <option value="B.Sc"></option>
            <option value="M.Sc"></option>
            <option value="PhD"></option>
            <option value="Other"></option>
          </datalist>
        </div>

        <div class="input-group">
          <label>Specialization:</label>
          <input type="text" class="education-subject" placeholder="E.g., Civil Engineering" value="${
            existingData?.subject || ""
          }">
        </div>
      </div>

      <div class="form-row">
        <div class="input-group">
          <label>Institution:</label>
          <input type="text" class="education-institution" placeholder="Enter institution name" required value="${
            existingData?.institution || ""
          }">
        </div>

        <div class="input-group">
          <label>Start Date:</label>
          <input type="date" class="education-start" required value="${
            existingData?.startDate || ""
          }">
        </div>

        <div class="input-group">
          <label>End Date:</label>
          <input type="date" class="education-end" value="${
            existingData?.endDate || ""
          }">
        </div>
      </div>

      <div class="form-row">
        <div class="input-group">
          <label>Score Type:</label>
          <select class="education-score-type">
            <option value="CGPA" ${
              existingData?.scoreType === "CGPA" ? "selected" : ""
            }>CGPA</option>
            <option value="Percentage" ${
              existingData?.scoreType === "Percentage" ? "selected" : ""
            }>Percentage</option>
          </select>
        </div>

        <div class="input-group">
          <label>Score:</label>
          <input type="number" class="education-score" placeholder="Enter CGPA or Percentage" required value="${
            existingData?.score || ""
          }">
          <small class="error-message"></small>
        </div>
      </div>

      <div class="form-actions">
        <button type="button" class="save-entry">✔ Save</button>
        <button type="button" class="cancel-entry">✖ Cancel</button>
      </div>
    `;

    // 📌 Real-time validation for CGPA & Percentage
    const scoreInput = entryForm.querySelector(".education-score");
    const scoreTypeSelect = entryForm.querySelector(".education-score-type");
    const errorMsg = entryForm.querySelector(".error-message");

    function validateScoreInput() {
      let value = parseFloat(scoreInput.value);
      if (scoreTypeSelect.value === "CGPA" && (value < 0 || value > 10)) {
        errorMsg.textContent = "CGPA must be between 0 and 10.";
        scoreInput.style.borderColor = "red";
      } else if (
        scoreTypeSelect.value === "Percentage" &&
        (value < 0 || value > 100)
      ) {
        errorMsg.textContent = "Percentage must be between 0 and 100.";
        scoreInput.style.borderColor = "red";
      } else {
        errorMsg.textContent = "";
        scoreInput.style.borderColor = "";
      }
    }
    scoreInput.addEventListener("input", validateScoreInput);

    entryForm
      .querySelector(".save-entry")
      .addEventListener("click", function () {
        saveEducationEntry(entryForm, existingData);
      });

    entryForm
      .querySelector(".cancel-entry")
      .addEventListener("click", function () {
        entryForm.remove();
        addEducationBtn.style.display = "block";
      });

    document.getElementById("education-form-container").appendChild(entryForm);
    addEducationBtn.style.display = "none";
  }

  // 📌 Save Education Entry
  function saveEducationEntry(form, existingData = null) {
    const newEntry = {
      degree: form.querySelector(".education-degree").value,
      subject: form.querySelector(".education-subject").value,
      institution: form.querySelector(".education-institution").value,
      startDate: form.querySelector(".education-start").value,
      endDate: form.querySelector(".education-end").value,
      scoreType: form.querySelector(".education-score-type").value,
      score: form.querySelector(".education-score").value,
    };

    // check if all data exist
    if (
      !newEntry.degree ||
      !newEntry.institution ||
      !newEntry.startDate ||
      !newEntry.score
    ) {
      alert("Please fill all required fields.");
      return;
    }

    // validation for marks range
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
    // push new entry into the array
    educationEntries.push(newEntry);

    // remove form
    form.remove();

    // display table again
    displayEducationEntries();
    // again show add education button
    addEducationBtn.style.display = "block";
  }

  // 📌 Display Education Entries in Table
  function displayEducationEntries() {
    educationListTable.innerHTML = "";

    if (educationEntries.length === 0) {
      educationTable.classList.add("hidden"); // ✅ don't show table when no entries exist
      addEducationBtn.style.display = "block"; // ✅ Show button when no entries exist
      return;
    }

    educationTable.classList.remove("hidden"); // ✅ show table when entries exist
    addEducationBtn.style.display = "none"; // ✅ Hide button when entries exist

    // Render Table on display

    educationEntries.forEach((entry, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
            <td>${entry.degree}</td>
            <td>${entry.subject || "N/A"}</td>
            <td>${entry.institution}</td>
            <td>${entry.startDate}</td>
            <td>${entry.endDate || "Present"}</td>
            <td>${entry.scoreType}</td>
            <td>${entry.score}</td>
            <td>
                <button class="remove-entry" data-index="${index}">❌ Remove</button>
            </td>
        `;
      educationListTable.appendChild(row);
    });

    // ✅ Attach Remove Event Listeners After Rendering Entries
    document.querySelectorAll(".remove-entry").forEach((btn) => {
      btn.addEventListener("click", function () {
        // get the index in the array in which remove is pressed
        const index = parseInt(btn.getAttribute("data-index"));
        // remove that part
        educationEntries.splice(index, 1);

        // render the table again
        displayEducationEntries(); // ✅ Update UI after deletion
      });
    });
  }

  addEducationBtn.addEventListener("click", createEducationEntry);
});
