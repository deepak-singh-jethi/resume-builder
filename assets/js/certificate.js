document.addEventListener("DOMContentLoaded", function () {
  const nextButton = document.getElementById("next-btn-certifications");
  const prevButton = document.getElementById("prev-btn-certifications");

  const certificateModal = document.getElementById("certificate-modal"); // Modal container
  const openCertificateModalBtn = document.getElementById(
    "open-certificate-modal"
  );
  const closeCertificateModalBtn = document.getElementById(
    "close-certificate-modal"
  ); // Close modal button
  const certificateModalList = document.getElementById(
    "certificate-modal-list"
  ); // Table to display certificates
  const saveCertificateBtn = document.getElementById("save-certificate"); // Save button

  // ✅ Ensure Modal is Hidden on Load
  certificateModal.style.display = "none";

  // ✅ Handle "Previous" button navigation
  prevButton.addEventListener("click", function () {
    const prevSectionId = prevButton.getAttribute("action-section");
    if (prevSectionId) {
      showSection(prevSectionId); // Show the previous section
    }
  });
  // ✅ Handle "save and Next" button navigation
  nextButton.addEventListener("click", function () {
    const certificateState = localStorage.getItem("certificateState"); // "yes" or "no"
    const certificateData =
      JSON.parse(localStorage.getItem("certificateData")) || []; // Get stored certificates
    const hasSavedCertificates = certificateData.length > 0; // Check if certificates exist

    const details = document.getElementById("certificate-details").value.trim();
    const hasInput = details.length > 0; // Check if input is entered

    // if certificateState is "no" and no input is given, just move to next section
    if (certificateState === "no") {
      moveToNextSection();
      return;
    }

    // ✅ Case 1: Certificates exist & inputs are empty → Move to next section
    if (certificateState === "yes" && hasSavedCertificates && !hasInput) {
      moveToNextSection();
      return;
    }

    // ✅ Case 2: No certificates saved but inputs are filled → Save & Move
    if (certificateState === "yes" && !hasSavedCertificates && hasInput) {
      saveCertificateEntry();
      moveToNextSection();
      return;
    }

    // ✅ Case 3: No certificates exist & inputs are empty → Show alert & stop
    if (!hasSavedCertificates && !hasInput) {
      alert(
        "Please add a certification or fill in at least one field before proceeding."
      );
      return;
    }
  });

  // Function to handle navigation to the next section
  function moveToNextSection() {
    const nextSectionId = nextButton.getAttribute("action-section");
    if (nextSectionId) {
      showSection(nextSectionId);
    }
  }

  // ✅ Retrieve stored certificate entries safely
  function getStoredCertificateData() {
    try {
      return JSON.parse(localStorage.getItem("certificateData")) || [];
    } catch (error) {
      console.error("Invalid JSON in localStorage:", error);
      return [];
    }
  }

  let certificateEntries = getStoredCertificateData();

  // ✅ Open Modal on Click (Displays the certification list)
  openCertificateModalBtn.addEventListener("click", function () {
    certificateModal.style.display = "flex"; // Show modal
    displayCertificateEntries(); // Load existing certificates
  });

  // ✅ Close Modal on "X" Click
  closeCertificateModalBtn.addEventListener("click", function () {
    certificateModal.style.display = "none";
  });

  // ✅ Close Modal When Clicking Outside of It
  window.addEventListener("click", function (event) {
    if (event.target === certificateModal) {
      certificateModal.style.display = "none";
    }
  });

  // ✅ Function to Save Certificate Entry
  function saveCertificateEntry() {
    const newEntry = {
      details: document.getElementById("certificate-details").value.trim(),
    };

    // ✅ Validation: Ensure required fields are filled
    if (!newEntry.details) {
      alert("Please enter the certification details.");
      return;
    }

    // ✅ Save Entry in Global Array & Local Storage
    certificateEntries.push(newEntry);
    localStorage.setItem("certificateData", JSON.stringify(certificateEntries));
    updateViewCertificatesButton(); // Update button text

    // ✅ Update UI
    displayCertificateEntries();
    clearCertificateForm(); // Clear the form after saving
  }

  // ✅ Function to Display Certificate Entries in Modal Table
  function displayCertificateEntries() {
    certificateModalList.innerHTML = ""; // Clear previous list

    // ✅ If no entries exist, display a message
    if (certificateEntries.length === 0) {
      certificateModalList.innerHTML = `<tr><td colspan="2">No certifications added yet.</td></tr>`;
      return;
    }

    // ✅ Populate Table with Entries
    certificateEntries.forEach((entry, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${entry.details}</td>
        <td><button class="remove-certificate" data-index="${index}">❌</button></td>
      `;
      certificateModalList.appendChild(row);
    });

    // ✅ Attach Event Listeners to Remove Buttons
    document.querySelectorAll(".remove-certificate").forEach((btn) => {
      btn.addEventListener("click", function () {
        const index = parseInt(btn.getAttribute("data-index")); // Get entry index
        certificateEntries.splice(index, 1); // Remove entry from array
        localStorage.setItem(
          "certificateData",
          JSON.stringify(certificateEntries)
        ); // Update localStorage
        displayCertificateEntries(); // Refresh list
        updateViewCertificatesButton(); // Update button text
      });
    });
  }

  // ✅ Function to Clear Form Fields
  function clearCertificateForm() {
    document.getElementById("certificate-details").value = "";
  }

  // ✅ Function to Update View Certificates Button
  function updateViewCertificatesButton() {
    openCertificateModalBtn.innerText = `View (${certificateEntries.length}) Certifications`;
  }

  // ✅ Initialize UI with stored data
  updateViewCertificatesButton();

  // ✅ Attach Event Listener to Save Button
  saveCertificateBtn.addEventListener("click", saveCertificateEntry);
});
