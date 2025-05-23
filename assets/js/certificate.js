document.addEventListener("DOMContentLoaded", function () {
  const nextButton = document.getElementById("next-btn-certifications");
  const prevButton = document.getElementById("prev-btn-certifications");

  const certificateModal = document.getElementById("certificate-modal");
  const openCertificateModalBtn = document.getElementById(
    "open-certificate-modal"
  );
  const closeCertificateModalBtn = document.getElementById(
    "close-certificate-modal"
  );
  const certificateModalList = document.getElementById(
    "certificate-modal-list"
  );
  const saveCertificateBtn = document.getElementById("save-certificate");

  certificateModal.style.display = "none";

  prevButton.addEventListener("click", function () {
    const prevSectionId = prevButton.getAttribute("action-section");
    if (prevSectionId) {
      showSection(prevSectionId);
    }
  });

  nextButton.addEventListener("click", function () {
    const certificateState = localStorage.getItem("certificateState");
    const certificateData =
      JSON.parse(localStorage.getItem("certificateData")) || [];
    const hasSavedCertificates = certificateData.length > 0;

    const detailsInput = document.getElementById("certificate-details");
    const details = detailsInput.value.trim();
    const hasInput = details.length > 0;

    // Case: user selected "no" for certifications
    if (
      certificateState === "no" ||
      certificateState === null ||
      certificateState === undefined
    ) {
      moveToNextSection();
      return;
    }

    // Case: user selected "yes", has previous entries, no new input
    if (certificateState === "yes" && hasSavedCertificates && !hasInput) {
      moveToNextSection();
      return;
    }

    // Case: user selected "yes", no previous entries, valid input
    if (certificateState === "yes" && !hasSavedCertificates && hasInput) {
      saveCertificateEntry(() => {
        moveToNextSection();
      });
      return;
    }

    // ✅ Case: user selected "yes", has previous entries, and valid input (MISSING CASE)
    if (certificateState === "yes" && hasSavedCertificates && hasInput) {
      saveCertificateEntry(() => {
        moveToNextSection();
      });
      return;
    }

    // Case: no saved certificates, no input — block
    if (!hasSavedCertificates && !hasInput) {
      Swal.fire({
        title: "Missing Certification",
        text: "Please add a certification or fill in at least one field before proceeding.",
        icon: "warning",
      });
      return;
    }
  });

  function moveToNextSection() {
    const nextSectionId = nextButton.getAttribute("action-section");
    if (nextSectionId) {
      showSection(nextSectionId);
    }
  }

  function getStoredCertificateData() {
    try {
      return JSON.parse(localStorage.getItem("certificateData")) || [];
    } catch (error) {
      console.error("Invalid JSON in localStorage:", error);
      return [];
    }
  }

  let certificateEntries = getStoredCertificateData();

  openCertificateModalBtn.addEventListener("click", function () {
    certificateModal.style.display = "flex";
    displayCertificateEntries();
  });

  closeCertificateModalBtn.addEventListener("click", function () {
    certificateModal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target === certificateModal) {
      certificateModal.style.display = "none";
    }
  });

  function saveCertificateEntry(callback = null) {
    const details = document.getElementById("certificate-details").value.trim();

    if (!details) {
      Swal.fire({
        title: "Missing Field",
        text: "Please enter the certification details.",
        icon: "warning",
      });
      return;
    }

    const newEntry = { details };

    certificateEntries.push(newEntry);
    localStorage.setItem("certificateData", JSON.stringify(certificateEntries));
    updateViewCertificatesButton();
    displayCertificateEntries();
    clearCertificateForm();

    Swal.fire({
      icon: "success",
      title: "Saved!",
      text: "Certificate added successfully.",
      timer: 1200,
      showConfirmButton: false,
    }).then(() => {
      if (typeof callback === "function") {
        callback(); // ✅ safely call only if it's actually a function
      }
    });
  }

  function displayCertificateEntries() {
    certificateEntries = getStoredCertificateData(); // 🔁 Always reload fresh data
    certificateModalList.innerHTML = "";

    if (certificateEntries.length === 0) {
      certificateModalList.innerHTML = `<tr><td colspan="2">No certifications added yet.</td></tr>`;
      return;
    }

    certificateEntries.forEach((entry, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
      <td>${entry.details}</td>
      <td><button class="remove-certificate" data-index="${index}">❌</button></td>
    `;
      certificateModalList.appendChild(row);
    });

    document.querySelectorAll(".remove-certificate").forEach((btn) => {
      btn.addEventListener("click", function () {
        event.preventDefault();
        const index = parseInt(btn.getAttribute("data-index"));

        Swal.fire({
          title: "Are you sure?",
          text: "Do you want to delete this certificate?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            certificateEntries.splice(index, 1);
            localStorage.setItem(
              "certificateData",
              JSON.stringify(certificateEntries)
            );
            displayCertificateEntries();
            updateViewCertificatesButton();

            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: "Certificate entry has been removed.",
              timer: 1500,
              showConfirmButton: false,
            });
          }
        });
      });
    });
  }

  function clearCertificateForm() {
    document.getElementById("certificate-details").value = "";
  }

  function updateViewCertificatesButton() {
    openCertificateModalBtn.innerText = `View (${certificateEntries.length}) Certifications`;
  }

  updateViewCertificatesButton();
  saveCertificateBtn.addEventListener("click", saveCertificateEntry);
});
