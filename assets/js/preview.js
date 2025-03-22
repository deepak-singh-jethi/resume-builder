/* -------------------------------- */
/* 🚀 Preview Area 🚀 */
/* -------------------------------- */

// 4️⃣ **Quick Actions Panel**
function saveResume() {
  alert("Chutiyaa....");
}

function downloadPDF() {
  alert("Land....");
}

function clearForm() {
  document.getElementById("resume-form").reset();
  alert("Muttthiii....");
}

// Function to update the resume preview in real time
function updatePreview(data) {
  document.querySelector(".preview").innerHTML = `
        <h2>Resume Preview</h2>
        <p><strong>Name:</strong> ${data["fullName"] || "N/A"}</p>
        <p><strong>Email:</strong> ${data["email"] || "N/A"}</p>
        <p><strong>Phone:</strong> ${data["phone"] || "N/A"}</p>
        <p><strong>Summary:</strong> ${data["summary"] || "N/A"}</p>
    `;
}
