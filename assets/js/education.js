document.addEventListener("DOMContentLoaded", function () {
  const educationModal = document.getElementById("education-modal");
  const openEducationModalBtn = document.getElementById("open-education-modal");
  const closeEducationModalBtn = document.getElementById(
    "close-education-modal"
  );
  const educationModalList = document.getElementById("education-modal-list");
  const saveEducationBtn = document.getElementById("save-education");
  const prevButton = document.getElementById("prev-btn-education");
  const nextButton = document.getElementById("next-btn-education");

  educationModal.style.display = "none";

  let educationData = JSON.parse(localStorage.getItem("educationData")) || [];

  function toggleModal(modal, show) {
    modal.style.display = show ? "flex" : "none";
  }

  function isValidScore(score, scoreType) {
    const numeric = parseFloat(score);
    if (isNaN(numeric)) return false;
    if (scoreType === "CGPA") return numeric >= 0 && numeric <= 10;
    if (scoreType === "Percentage") return numeric >= 0 && numeric <= 100;
    return false;
  }

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

  function updateViewEntriesButton() {
    openEducationModalBtn.innerText = `View (${educationData.length}) Entries`;
  }

  function displayEducationEntries() {
    educationModalList.innerHTML = "";

    if (educationData.length === 0) {
      educationModalList.innerHTML = `<tr><td colspan="8">No education records found.</td></tr>`;
      return;
    }

    educationData.forEach((entry, index) => {
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
        <td><button class="remove-edu" data-index="${index}">❌</button></td>
      `;
      educationModalList.appendChild(row);
    });

    // Delete functionality
    document.querySelectorAll(".remove-edu").forEach((btn) => {
      btn.addEventListener("click", function (event) {
        event.preventDefault(); // ✅ Prevent default button behavior (like form submission)

        const index = parseInt(btn.getAttribute("data-index"));

        Swal.fire({
          title: "Are you sure?",
          text: "Do you want to delete this education entry?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            educationData.splice(index, 1);
            localStorage.setItem(
              "educationData",
              JSON.stringify(educationData)
            );
            displayEducationEntries();
            updateViewEntriesButton();

            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: "Education entry has been removed.",
              timer: 1500,
              showConfirmButton: false,
            });
          }
        });
      });
    });
  }

  function saveEducationEntry() {
    const degree = document.getElementById("education-degree").value.trim();
    const specialization = document
      .getElementById("education-subject")
      .value.trim();
    const institution = document
      .getElementById("education-institution")
      .value.trim();
    const startYear = document.getElementById("education-start").value.trim();
    const endYear =
      document.getElementById("education-end").value.trim() || "Present";
    const scoreType = document.getElementById("education-score-type").value;
    const score = document.getElementById("education-score").value.trim();
    const location = document.getElementById("education-location").value.trim();

    if (!degree || !institution || !startYear || !score) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Fields",
        text: "Please fill Degree, Institution, Start Year, and Score.",
      });
      return false;
    }

    if (!isValidScore(score, scoreType)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Score",
        text:
          scoreType === "CGPA"
            ? "CGPA must be between 0 and 10."
            : "Percentage must be between 0% and 100%.",
      });
      return false;
    }

    const newEntry = {
      degree,
      specialization,
      institution,
      startYear,
      endYear,
      scoreType,
      score: parseFloat(score),
      location,
    };

    educationData.push(newEntry);
    localStorage.setItem("educationData", JSON.stringify(educationData));

    clearEducationForm();
    displayEducationEntries();
    updateViewEntriesButton();

    Swal.fire({
      icon: "success",
      title: "Saved!",
      text: "Education entry has been added.",
      timer: 1500,
      showConfirmButton: false,
    });

    return true;
  }

  // Modal open/close
  openEducationModalBtn.addEventListener("click", function () {
    toggleModal(educationModal, true);
    displayEducationEntries();
  });

  closeEducationModalBtn.addEventListener("click", function () {
    toggleModal(educationModal, false);
  });

  window.addEventListener("click", function (event) {
    if (event.target === educationModal) {
      toggleModal(educationModal, false);
    }
  });

  saveEducationBtn.addEventListener("click", saveEducationEntry);

  // Navigation logic
  nextButton.addEventListener("click", function () {
    const hasSavedEducations = educationData.length > 0;

    const hasInput =
      document.getElementById("education-degree").value.trim() ||
      document.getElementById("education-institution").value.trim() ||
      document.getElementById("education-start").value.trim() ||
      document.getElementById("education-score").value.trim();

    if (hasSavedEducations && !hasInput) {
      moveToNextSection();
      return;
    }

    if (!hasSavedEducations && hasInput) {
      const saved = saveEducationEntry();
      if (saved) moveToNextSection();
      return;
    }

    if (hasSavedEducations && hasInput) {
      const saved = saveEducationEntry();
      if (saved) moveToNextSection();
      return;
    }

    Swal.fire(
      "Missing Education",
      "Please add at least one education entry or fill in a field.",
      "warning"
    );
  });

  prevButton.addEventListener("click", function () {
    const prevSectionId = prevButton.getAttribute("action-section");
    if (prevSectionId) showSection(prevSectionId);
  });

  function moveToNextSection() {
    const nextSectionId = nextButton.getAttribute("action-section");
    if (nextSectionId) showSection(nextSectionId);
  }

  displayEducationEntries();
  updateViewEntriesButton();
});
