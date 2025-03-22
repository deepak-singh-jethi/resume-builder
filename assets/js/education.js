document.addEventListener("DOMContentLoaded", function () {
  const educationList = document.getElementById("education-list");
  const addEducationBtn = document.getElementById("add-education");

  let educationEntries = []; // Stores saved education data

  function createEducationEntry(existingData = null) {
    if (document.querySelector(".education-form")) return;

    const entryForm = document.createElement("div");
    entryForm.classList.add("education-form");

    entryForm.innerHTML = `
      <div class="form-row">
        <div class="input-group">
          <label>Degree:</label>
          <input type="text" list="degree-options" class="education-degree" placeholder="Enter or select degree">
          <datalist id="degree-options">
            <option value="B.Tech"></option>
            <option value="M.Tech"></option>
            <option value="MBA"></option>
            <option value="Diploma"></option>
            <option value="B.Sc"></option>
            <option value="M.Sc"></option>
            <option value="PhD"></option>
            <option value="LLB"></option>
            <option value="MBBS"></option>
            <option value="BBA"></option>
            <option value="B.Com"></option>
            <option value="M.Com"></option>
            <option value="Other"></option>
          </datalist>
        </div>

        <div class="input-group">
          <label>Specialization:</label>
          <input type="text" class="education-subject" placeholder="E.g., Civil Engineering">
        </div>
      </div>

      <div class="form-row">
        <div class="input-group">
          <label>Institution:</label>
          <input type="text" class="education-institution" placeholder="Enter institution name" required>
        </div>

        <div class="input-group">
          <label>Location (City, Country):</label>
          <input type="text" class="education-location" placeholder="Enter location (Optional)">
        </div>
      </div>

      <div class="form-row date-score">
        <div class="input-group">
          <label>Start Date:</label>
          <input type="date" class="education-start" required>
        </div>

        <div class="input-group">
          <label>End Date:</label>
          <input type="date" class="education-end">
        </div>

        <div class="input-group">
          <label>Score Type:</label>
          <select class="education-score-type">
            <option value="CGPA">CGPA</option>
            <option value="Percentage">Percentage</option>
          </select>
        </div>

        <div class="input-group">
          <label>Score:</label>
          <input type="number" class="education-score" placeholder="Enter CGPA or Percentage" required>
          <small class="error-message"></small>
        </div>
      </div>

      <div class="form-row full-width">
        <div class="input-group">
          <label>Additional Notes:</label>
          <textarea class="education-notes" placeholder="Honors, Achievements, etc."></textarea>
        </div>
      </div>

      <div class="form-actions">
        <button type="button" class="save-entry">✔ Save</button>
        <button type="button" class="cancel-entry">✖ Cancel</button>
      </div>
    `;

    // Real-time validation
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
        saveEducationEntry(entryForm);
      });

    entryForm
      .querySelector(".cancel-entry")
      .addEventListener("click", function () {
        entryForm.remove();
        addEducationBtn.style.display = "block";
      });

    educationList.appendChild(entryForm);
    addEducationBtn.style.display = "none";
  }

  function saveEducationEntry(form) {
    const degree = form.querySelector(".education-degree").value;
    const subject = form.querySelector(".education-subject").value;
    const institution = form.querySelector(".education-institution").value;
    const location = form.querySelector(".education-location").value;
    const startDate = form.querySelector(".education-start").value;
    const endDate = form.querySelector(".education-end").value;
    const scoreType = form.querySelector(".education-score-type").value;
    const score = form.querySelector(".education-score").value;
    const notes = form.querySelector(".education-notes").value;

    if (!degree || !institution || !startDate || !score) {
      alert("Please fill all required fields.");
      return;
    }

    const newEntry = {
      degree,
      subject,
      institution,
      location,
      startDate,
      endDate,
      scoreType,
      score,
      notes,
    };
    educationEntries.push(newEntry);

    form.remove();
    displayEducationEntries();
    addEducationBtn.style.display = "block";
  }

  function displayEducationEntries() {
    educationList.innerHTML = "";

    educationEntries.forEach((entry, index) => {
      const entryDiv = document.createElement("div");
      entryDiv.classList.add("education-entry");

      entryDiv.innerHTML = `
        <div class="education-card">
          <div class="edu-details">
            <h3>${entry.degree} in ${entry.subject} - ${entry.institution}</h3>
            <p>${entry.location || "Location: N/A"}</p>
            <p>${entry.startDate} to ${entry.endDate || "Present"}</p>
            <p>${entry.scoreType}: ${entry.score}</p>
            <p>${entry.notes}</p>
          </div>
          <button type="button" class="remove-entry" data-index="${index}">❌ Remove</button>
        </div>
      `;

      entryDiv
        .querySelector(".remove-entry")
        .addEventListener("click", function () {
          educationEntries.splice(index, 1);
          displayEducationEntries();
        });

      educationList.appendChild(entryDiv);
    });
  }

  addEducationBtn.addEventListener("click", createEducationEntry);
});
