document.addEventListener("DOMContentLoaded", () => {
  const contactData = JSON.parse(localStorage.getItem("contactData"));
  const educationData = JSON.parse(localStorage.getItem("educationData"));
  const experienceData = JSON.parse(localStorage.getItem("experienceData"));
  const skillsData = JSON.parse(localStorage.getItem("skillsData"));
  const personalData = JSON.parse(localStorage.getItem("personalData"));
  const projectData = JSON.parse(localStorage.getItem("projectData"));
  const certificateData = JSON.parse(localStorage.getItem("certificateData"));
  const summaryData = localStorage.getItem("summaryData");

  const resume = document.querySelector(".template-2-resume");

  resume.innerHTML = `
    <div class="resume">
      <div class="resume-left">
        <div class="photo">
          <img src="/avatar.png" alt="Profile Photo">
        </div>
        <div class="name-title">
          <h2>${contactData.fullName}</h2>
          <p>Job Title</p>
        </div>
        <div class="contact section">
          <h3>Contact</h3>
          <p>${contactData.email}</p>
          <p>${contactData.phone}</p>
          <p>${contactData.city}, ${contactData.country}</p>
          <p>${contactData.linkedin}</p>
        </div>
        <div class="section">
          <h3>Skills</h3>
          <ul>
            ${skillsData.map((skill) => `<li>${skill.name}</li>`).join("")}
          </ul>
        </div>
        <div class="section">
          <h3>Languages</h3>
          <ul>
            ${personalData.languages
              .map((lang) => `<li>${lang.name}: ${lang.level}</li>`)
              .join("")}
          </ul>
        </div>
      </div>
      <div class="resume-right">
        <div class="section">
          <h3>Profile Summary</h3>
          <p>${summaryData}</p>
        </div>
        <div class="section" id="experience">
          <h3>Experience</h3>
          ${experienceData
            .map(
              (exp) => `
            <div class="job">
              <h4>${exp.company}</h4>
              <p>${exp.role} | ${new Date(
                exp.startDate
              ).toLocaleDateString()} - ${
                exp.endDate === "Present"
                  ? "Present"
                  : new Date(exp.endDate).toLocaleDateString()
              }</p>
              <p>${exp.description.replace(/\n/g, "<br>")}</p>
            </div>
          `
            )
            .join("")}
        </div>
        <div class="section" id="education">
          <h3>Education</h3>
          ${educationData
            .map(
              (edu) => `
            <div class="edu">
              <h4>${edu.degree} in ${edu.specialization}</h4>
              <p>${edu.institution}, ${edu.location}</p>
              <p>${edu.startYear} - ${edu.endYear} (${edu.scoreType}: ${edu.score})</p>
            </div>
          `
            )
            .join("")}
        </div>
        <div class="section">
          <h3>Projects</h3>
          ${projectData
            .map(
              (proj) => `
            <div class="job">
              <h4>${proj.title}</h4>
              <p>${proj.description}</p>
              <p>${proj.achievements.replace(/\n/g, "<br>")}</p>
            </div>
          `
            )
            .join("")}
        </div>
        <div class="section">
          <h3>Certificates</h3>
          <ul>
            ${certificateData
              .map((cert) => `<li>${cert.details}</li>`)
              .join("")}
          </ul>
        </div>
      </div>
    </div>
  `;
});
