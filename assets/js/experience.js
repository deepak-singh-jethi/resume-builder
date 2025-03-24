document.addEventListener("DOMContentLoaded", function () {
  let experienceEntries =
    JSON.parse(localStorage.getItem("experienceData")) || [];

  // ✅ Modal Elements
  const experienceModal = document.getElementById("experience-modal");
  const openExperienceModalBtn = document.getElementById(
    "open-experience-modal"
  );
  const closeExperienceModalBtn = document.getElementById(
    "close-experience-modal"
  );
  const experienceModalList = document.getElementById("experience-modal-list");
  const saveExperienceBtn = document.getElementById("save-experience");

  // ✅ Form Elements
  const endDateInput = document.getElementById("experience-end");
  const currentCheckbox = document.getElementById("experience-current");

  // ✅ Ensure Modal is Hidden on Load
  experienceModal.style.display = "none";

  // ✅ Handle "Currently Working Here" Checkbox (Disable Instead of Hiding)
  currentCheckbox.addEventListener("change", function () {
    endDateInput.disabled = this.checked; // ✅ Disable if checked
    if (this.checked) {
      endDateInput.value = ""; // ✅ Clear End Date when disabled
    }
  });

  // ✅ Open Modal on Click
  openExperienceModalBtn.addEventListener("click", function () {
    experienceModal.style.display = "flex";
    displayExperienceEntries();
  });

  // ✅ Close Modal on "X" Click
  closeExperienceModalBtn.addEventListener("click", function () {
    experienceModal.style.display = "none";
  });

  // ✅ Close Modal When Clicking Outside
  window.addEventListener("click", function (event) {
    if (event.target === experienceModal) {
      experienceModal.style.display = "none";
    }
  });

  // ✅ Function to Save Experience Entry
  function saveExperienceEntry() {
    const newEntry = {
      company: document.getElementById("experience-company").value.trim(),
      role: document.getElementById("experience-role").value.trim(),
      industry: document.getElementById("experience-industry").value,
      startDate: document.getElementById("experience-start").value,
      endDate: currentCheckbox.checked ? "Present" : endDateInput.value,
      location: document.getElementById("experience-location").value,
      description: document
        .getElementById("experience-description")
        .value.trim(),
      skills: document
        .getElementById("experience-skills")
        .value.split(",")
        .map((skill) => skill.trim()),
    };

    // ✅ Validation for Required Fields
    if (!newEntry.company || !newEntry.role || !newEntry.startDate) {
      alert("Please fill in required fields (Company, Role, Start Date).");
      return;
    }

    // ✅ Save Entry in Global Array & Local Storage
    experienceEntries.push(newEntry);
    localStorage.setItem("experienceData", JSON.stringify(experienceEntries));

    // ✅ Update UI
    displayExperienceEntries();
    clearExperienceForm();
  }

  // ✅ Function to Display Experience Entries in Modal Table
  function displayExperienceEntries() {
    experienceModalList.innerHTML = ""; // ✅ Clear previous list

    if (experienceEntries.length === 0) {
      experienceModalList.innerHTML = `<tr><td colspan="7">No experience records found.</td></tr>`;
      return;
    }

    experienceEntries.forEach((entry, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${entry.company}</td>
        <td>${entry.role}</td>
        <td>${entry.industry}</td>
        <td>${entry.location}</td>
        <td>${entry.startDate}</td>
        <td>${
          entry.endDate === "Present" ? "Present" : entry.endDate
        }</td> <!-- ✅ Display "Present" when checked -->
        <td><button class="remove-entry" data-index="${index}">❌</button></td>
      `;
      experienceModalList.appendChild(row);
    });

    // ✅ Attach Remove Event Listeners
    document.querySelectorAll(".remove-entry").forEach((btn) => {
      btn.addEventListener("click", function () {
        const index = parseInt(btn.getAttribute("data-index"));
        experienceEntries.splice(index, 1);
        localStorage.setItem(
          "experienceData",
          JSON.stringify(experienceEntries)
        );
        displayExperienceEntries();
      });
    });
  }

  // ✅ Function to Clear Form
  function clearExperienceForm() {
    document.getElementById("experience-company").value = "";
    document.getElementById("experience-role").value = "";
    document.getElementById("experience-industry").value = "IT";
    document.getElementById("experience-start").value = "";
    document.getElementById("experience-end").value = "";
    document.getElementById("experience-current").checked = false;
    document.getElementById("experience-location").value = "Onsite";
    document.getElementById("experience-description").value = "";
    document.getElementById("experience-skills").value = "";

    endDateInput.disabled = false; // ✅ Ensure End Date is enabled when form resets
  }

  // ✅ Attach Event Listeners
  saveExperienceBtn.addEventListener("click", saveExperienceEntry);
});
