document.addEventListener("DOMContentLoaded", function () {
  const prevBtn = document.getElementById("prev-btn-experience");
  const nextBtn = document.getElementById("next-btn-experience");

  const openExperienceModalBtn = document.getElementById(
    "open-experience-modal"
  );
  const experienceModal = document.getElementById("experience-modal");
  const closeExperienceModalBtn = document.getElementById(
    "close-experience-modal"
  );
  const experienceModalList = document.getElementById("experience-modal-list");
  const saveExperienceBtn = document.getElementById("save-experience");

  const endDateInput = document.getElementById("experience-end");
  const currentCheckbox = document.getElementById("experience-current");

  experienceModal.style.display = "none";
  let experienceEntries =
    JSON.parse(localStorage.getItem("experienceData")) || [];

  // Checkbox handling
  currentCheckbox.addEventListener("change", function () {
    endDateInput.disabled = this.checked;
    if (this.checked) endDateInput.value = "";
  });

  // Open modal
  openExperienceModalBtn.addEventListener("click", function () {
    experienceModal.style.display = "flex";
    displayExperienceEntries();
  });

  closeExperienceModalBtn.addEventListener(
    "click",
    () => (experienceModal.style.display = "none")
  );

  window.addEventListener("click", function (e) {
    if (e.target === experienceModal) experienceModal.style.display = "none";
  });

  function saveExperienceEntry(callback = null) {
    const company = document.getElementById("experience-company").value.trim();
    const role = document.getElementById("experience-role").value.trim();
    const startDate = document.getElementById("experience-start").value.trim();
    const description = document
      .getElementById("experience-responsibility")
      .value.trim();

    if (!company || !role || !startDate || !description) {
      Swal.fire({
        title: "Missing Fields",
        text: "Please fill Company, Role, Start Date, and Job Responsibility.",
        icon: "warning",
      });
      return;
    }

    const entry = {
      company,
      role,
      industry: document.getElementById("experience-industry").value,
      startDate,
      endDate: currentCheckbox.checked
        ? "Present"
        : document.getElementById("experience-end").value,
      location: document.getElementById("experience-location").value,
      description,
    };

    experienceEntries.push(entry);
    localStorage.setItem("experienceData", JSON.stringify(experienceEntries));
    displayExperienceEntries();
    updateViewEntriesButton();
    clearForm();

    Swal.fire({
      icon: "success",
      title: "Saved!",
      text: "Experience added successfully.",
      timer: 1200,
      showConfirmButton: false,
    }).then(() => {
      if (typeof callback === "function") {
        // Ensure callback is a function before calling it
        callback(); // ✅ Only move to next after confirmation
      }
    });
  }

  function displayExperienceEntries() {
    experienceModalList.innerHTML = "";

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
        <td>${entry.endDate}</td>
        <td><button type="button" class="remove-entry" data-index="${index}">❌</button></td>
      `;
      experienceModalList.appendChild(row);
    });

    document.querySelectorAll(".remove-entry").forEach((btn) => {
      btn.addEventListener("click", function () {
        const index = parseInt(btn.getAttribute("data-index"));

        Swal.fire({
          title: "Are you sure?",
          text: "Do you want to delete this experience entry?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            experienceEntries.splice(index, 1);
            localStorage.setItem(
              "experienceData",
              JSON.stringify(experienceEntries)
            );
            updateViewEntriesButton();
            displayExperienceEntries();

            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: "Experience entry has been removed.",
              timer: 1500,
              showConfirmButton: false,
            });
          }
        });
      });
    });
  }

  function clearForm() {
    document.getElementById("experience-company").value = "";
    document.getElementById("experience-role").value = "";
    document.getElementById("experience-industry").value = "IT";
    document.getElementById("experience-location").value = "Onsite";
    document.getElementById("experience-start").value = "";
    document.getElementById("experience-end").value = "";
    document.getElementById("experience-responsibility").value = "";
    currentCheckbox.checked = false;
    endDateInput.disabled = false;
  }

  function updateViewEntriesButton() {
    openExperienceModalBtn.innerText = `View (${experienceEntries.length}) Entries`;
  }

  saveExperienceBtn.addEventListener("click", saveExperienceEntry);

  // Navigation handling
  nextBtn.addEventListener("click", function () {
    const experienceState = localStorage.getItem("experienceState");
    const hasSavedExperiences = experienceEntries.length > 0;

    const company = document.getElementById("experience-company").value.trim();
    const role = document.getElementById("experience-role").value.trim();
    const startDate = document.getElementById("experience-start").value.trim();
    const description = document
      .getElementById("experience-responsibility")
      .value.trim();

    const hasInput = company || role || startDate || description;

    if (!experienceState || experienceState === "no") {
      moveToNextSection();
      return;
    }

    // Case 1: Experience = yes, no entries, no input → BLOCK
    if (experienceState === "yes" && !hasSavedExperiences && !hasInput) {
      Swal.fire(
        "Missing Experience",
        "Please add at least one experience or fill in the required fields.",
        "warning"
      );
      return;
    }

    // Case 2: Experience = yes, no entries, valid input → SAVE and move
    if (experienceState === "yes" && !hasSavedExperiences && hasInput) {
      saveExperienceEntry(() => {
        moveToNextSection();
      });
      return;
    }

    // ✅ Case 3: Experience = yes, entries exist, valid input → SAVE and move
    if (experienceState === "yes" && hasSavedExperiences && hasInput) {
      saveExperienceEntry(() => {
        moveToNextSection();
      });
      return;
    }

    // Case 4: Experience = yes, entries exist, no input → MOVE
    if (experienceState === "yes" && hasSavedExperiences && !hasInput) {
      moveToNextSection();
      return;
    }
  });

  prevBtn.addEventListener("click", function () {
    const prevSectionId = prevBtn.getAttribute("action-section");
    if (prevSectionId) showSection(prevSectionId);
  });

  function moveToNextSection() {
    const nextSectionId = nextBtn.getAttribute("action-section");
    if (nextSectionId) showSection(nextSectionId);
  }

  updateViewEntriesButton();
});
