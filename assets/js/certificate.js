document.addEventListener("DOMContentLoaded", function () {
  // ✅ Retrieve stored certificates from localStorage or initialize an empty array
  certificateEntries =
    JSON.parse(localStorage.getItem("certificateData")) || [];

  // ✅ Modal Elements
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

  // ✅ Ensure Modal is Hidden on Load
  certificateModal.style.display = "none";

  // ✅ Open Modal on Click
  openCertificateModalBtn.addEventListener("click", function () {
    certificateModal.style.display = "flex";
    displayCertificateEntries();
  });

  // ✅ Close Modal on "X" Click
  closeCertificateModalBtn.addEventListener("click", function () {
    certificateModal.style.display = "none";
  });

  // ✅ Close Modal When Clicking Outside
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

    // ✅ Validation
    if (!newEntry.details) {
      alert("Please enter the certification details.");
      return;
    }

    // ✅ Save Entry
    certificateEntries.push(newEntry);
    localStorage.setItem("certificateData", JSON.stringify(certificateEntries));

    // ✅ Update UI
    displayCertificateEntries();
    clearCertificateForm();
    updateViewCertificatesButton();
  }

  // ✅ Function to Display Certificates
  function displayCertificateEntries() {
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

    // ✅ Attach Event Listeners to Remove Buttons
    document.querySelectorAll(".remove-certificate").forEach((btn) => {
      btn.addEventListener("click", function () {
        const index = parseInt(btn.getAttribute("data-index"));
        certificateEntries.splice(index, 1);
        localStorage.setItem(
          "certificateData",
          JSON.stringify(certificateEntries)
        );
        displayCertificateEntries();
        updateViewCertificatesButton();
      });
    });
  }

  // ✅ Function to Clear Form
  function clearCertificateForm() {
    document.getElementById("certificate-details").value = "";
  }

  // ✅ Function to Update View Certificates Button
  function updateViewCertificatesButton() {
    openCertificateModalBtn.innerText = `View (${certificateEntries.length}) Certifications`;
  }

  updateViewCertificatesButton();

  // ✅ Attach Event Listener to Save Button
  saveCertificateBtn.addEventListener("click", saveCertificateEntry);
});
