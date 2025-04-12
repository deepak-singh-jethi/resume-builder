document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("burger-btn").addEventListener("click", function () {
    document.querySelector(".sidebar").classList.toggle("open");
  });

  const previewResumeBtn = document.getElementById("preview-resume-btn");
  const certificateModal = document.getElementById("certificate-modal");
  console.log(certificateModal);

  //close all modals on load
  certificateModal.style.display = "none"; // Hide modal on load

  // redirect to preview
  previewResumeBtn.addEventListener("click", function (event) {
    window.location.href = "resume-preview.html";
  });

  handleProgressBar();
});

// ********* //
// ** function to handle progress bar ** //
// ********** //

function handleProgressBar(sectionId = "contact") {
  const progressBar = document.getElementById("progressBar");
  const progressStep = document.getElementById("progressStep");

  console.log(sectionId);

  // ! note: for any change in the sidebar, update this array
  const formSections = [
    "contact",
    "summary",
    "education",
    "experience",
    "projects",
    "certifications",
    "skills",
    "hobbies",
    "personal-info",
  ];
  // check the index of sectionId in the array
  let currentStep = formSections.indexOf(sectionId) + 1; // +1 to convert to 1-based index

  // Add more sections if needed
  const totalSteps = formSections.length;

  let progressPercentage = (currentStep / totalSteps) * 100;
  progressBar.style.width = `${progressPercentage}%`;
  progressStep.textContent = `${currentStep}/${totalSteps}`;
}

// ********* //
// ** function to show the selected section ** //
// ********** //
function showSection(sectionId) {
  sectionId = sectionId || "contact"; // Default to "contact" if no ID is provided

  // ✅ Hide all sections and show only the selected one
  document.querySelectorAll(".form-section").forEach((section) => {
    section.style.display = section.id === sectionId ? "block" : "none";
  });

  // ✅ Update sidebar active state
  document.querySelectorAll(".sidebar-item").forEach((item) => {
    item.classList.toggle(
      "active",
      item.getAttribute("data-section") === sectionId
    );
  });

  console.log(sectionId);

  handleProgressBar(sectionId); // 🔥 Update progress bar
}
