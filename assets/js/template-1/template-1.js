function renderSidebar() {
  const sidebar = document.getElementById("template-1-sidebar");

  const contactData = JSON.parse(localStorage.getItem("contactData")) || {};
  const skillsData = JSON.parse(localStorage.getItem("skillsData")) || [];
  const hobbiesData = JSON.parse(localStorage.getItem("hobbiesData")) || [];
  const personalData = JSON.parse(localStorage.getItem("personalData")) || {};
  const summaryData = localStorage.getItem("summaryData") || "";

  const fullName = contactData.fullName || "Your Name";

  const createSection = (title, content) => {
    if (!content || (Array.isArray(content) && content.length === 0)) return "";
    return `
      <div class="template-1-section">
        <h2 class="template-1-heading">${title}</h2>
        ${content}
      </div>
    `;
  };

  const renderLinks = () => {
    const links = ["linkedin", "github", "website"];
    let linkHTML = "";

    links.forEach((key) => {
      if (contactData[key]) {
        const label = key.charAt(0).toUpperCase() + key.slice(1);
        linkHTML += `<p>${label}: ${contactData[key]}</p>`;
      }
    });

    return linkHTML ? createSection("Links", linkHTML) : "";
  };

  const sidebarHTML = `
    <div class="template-1-profile">
      <h1 class="template-1-name">${fullName}</h1>
      ${summaryData ? `<p class="template-1-role">${summaryData}</p>` : ""}
    </div>

    ${createSection(
      "Contact",
      `
      ${contactData.email ? `<p>Email: ${contactData.email}</p>` : ""}
      ${contactData.phone ? `<p>Phone: ${contactData.phone}</p>` : ""}
      ${
        contactData.city || contactData.country
          ? `<p>Address: ${contactData.city || ""}, ${
              contactData.country || ""
            } , ${contactData.pinCode || ""}</p>`
          : ""
      }
    
    `
    )}

    ${renderLinks()}

    ${createSection(
      "Skills",
      `
      <ul class="template-1-list">
        ${skillsData.map((skill) => `<li>${skill}</li>`).join("")}
      </ul>
    `
    )}

    ${createSection(
      "Hobbies",
      `
      <ul class="template-1-list">
        ${hobbiesData.map((hobby) => `<li>${hobby}</li>`).join("")}
      </ul>
    `
    )}

    ${createSection(
      "Personal",
      `
      ${personalData.dob ? `<p>DOB: ${personalData.dob}</p>` : ""}
      ${personalData.gender ? `<p>Gender: ${personalData.gender}</p>` : ""}
      ${
        personalData.religion ? `<p>Religion: ${personalData.religion}</p>` : ""
      }
      ${
        personalData.maritalStatus
          ? `<p>Marital Status: ${personalData.maritalStatus}</p>`
          : ""
      }
    `
    )}
  `;

  sidebar.innerHTML = sidebarHTML;
}

function loadMainContent() {
  const mainContent = document.getElementById("template-1-main-content");
  mainContent.innerHTML = "";

  const summary = localStorage.getItem("summaryData");
  const experience = JSON.parse(localStorage.getItem("experienceData") || "[]");
  const education = JSON.parse(localStorage.getItem("educationData") || "[]");
  const certifications = JSON.parse(
    localStorage.getItem("certificationsData") || "[]"
  );
  const projects = JSON.parse(localStorage.getItem("projectData") || "[]");

  // === Summary ===
  if (summary) {
    mainContent.appendChild(
      createSection("Professional Summary", `<p>${summary}</p>`)
    );
  }

  // === Experience ===
  if (experience.length > 0) {
    const expHTML = experience
      .map(
        (exp) => `
        <div class="template-1-main-details-div">
          <h3>${exp.role} at ${exp.company} <span class="template-1-date-range">(${exp.startDate} - ${exp.endDate}) </span></h3>
          <p>${exp.description}</p>
        </div>
      `
      )
      .join("");
    mainContent.appendChild(createSection("Experience", expHTML));
  }

  // === Education ===
  if (education.length > 0) {
    const eduHTML = education
      .map(
        (edu) => `
        <div class="template-1-main-details-div">
  <h3>${edu.degree} in ${edu.specialization} 
    <span class="template-1-date-range">(${edu.startYear} - ${
          edu.endYear
        })</span>
  </h3>
  <p>${edu.institution}, ${edu.location} 
    <span class="template-1-date-range">
      (${edu.score}${
          edu.scoreType === "Percentage" ? "%" : ` ${edu.scoreType}`
        })
    </span>
  </p>
</div>
      `
      )
      .join("");
    mainContent.appendChild(createSection("Education", eduHTML));
  }

  // === Certifications ===
  if (certifications.length > 0) {
    const certHTML =
      "<ul class='template-1-bullet-list'>" +
      certifications.map((cert) => `<li>${cert.details}</li>`).join("") +
      "</ul>";
    mainContent.appendChild(createSection("Certifications", certHTML));
  }

  // === Projects ===
  if (projects.length > 0) {
    const projectHTML = projects
      .map(
        (proj) => `
        <div class="template-1-main-details-div">
  <h3>${proj.title}</h3>
  <p>${proj.description}</p>
  ${
    proj.achievements
      ? `<p class="template-1-project-achievements">${proj.achievements
          .replace(/\n/g, ", ")
          .trim()}</p>`
      : ""
  }
</div>

      `
      )
      .join("");
    mainContent.appendChild(createSection("Projects", projectHTML));
  }
}

// === Helper Functions ===
function createSection(title, contentHTML) {
  const section = document.createElement("div");
  section.className = "template-1-main-section";
  section.innerHTML = `<h2>${title}</h2>${contentHTML}`;
  return section;
}

function formatDate(dateStr) {
  if (dateStr === "Present") return "Present";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
}

document.addEventListener("DOMContentLoaded", function () {
  loadMainContent();
  renderSidebar();

  document
    .querySelector('[data-section="download"]')
    .addEventListener("click", () => {
      const resumeElement = document.querySelector(".template-1-resume");

      // Store the original styles
      const originalHeight = resumeElement.style.height;
      const originalPaddingLeft = resumeElement.style.paddingLeft;

      // Remove height and padding-left before generating the PDF
      resumeElement.style.height = "auto";
      resumeElement.style.paddingLeft = "0";

      const opt = {
        margin: 0,
        filename: "resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          scrollY: 0,
        },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      // Generate and save the PDF
      html2pdf()
        .set(opt)
        .from(resumeElement)
        .save()
        .then(() => {
          // Restore the original styles after download
          resumeElement.style.height = originalHeight;
          resumeElement.style.paddingLeft = originalPaddingLeft;
        })
        .catch((err) => {
          console.error("Download failed:", err);
          // Restore the original styles even if the download fails
          resumeElement.style.height = originalHeight;
          resumeElement.style.paddingLeft = originalPaddingLeft;
        });
    });
});
