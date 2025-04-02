document.addEventListener("DOMContentLoaded", function () {
  const resumeData = JSON.parse(localStorage.getItem("resumeData"));

  console.log({ ...resumeData });

  if (!resumeData) {
    alert("No resume data found!");
    return;
  }

  document.getElementById("name").textContent =
    resumeData.contactInfo.fullName || "Your Name";
  document.getElementById("email").textContent =
    resumeData.contactInfo.email || "Email Not Provided";
  document.getElementById("phone").textContent =
    resumeData.contactInfo.phone || "Phone Not Provided";
  document.getElementById("location").textContent = `${
    resumeData.contactInfo.city || ""
  }, ${resumeData.contactInfo.country || ""}`.trim();
  document.getElementById("summary").textContent =
    resumeData.summary.text || "No summary available.";

  // Skills
  const skillsList = document.getElementById("skills-list");
  resumeData.skills.forEach((skill) => {
    let li = document.createElement("li");
    li.textContent = skill;
    skillsList.appendChild(li);
  });

  // Hobbies
  const hobbiesList = document.getElementById("hobbies-list");
  resumeData.hobbies.forEach((hobby) => {
    let li = document.createElement("li");
    li.textContent = hobby;
    hobbiesList.appendChild(li);
  });

  // Education
  const educationList = document.getElementById("education-list");
  resumeData.education.forEach((edu) => {
    let div = document.createElement("div");
    div.innerHTML = `
            <h4>${edu.degree} in ${edu.specialization}</h4>
            <p>${edu.institution} (${edu.startYear} - ${edu.endYear})</p>
            <p>${edu.scoreType}: ${edu.score}</p>
        `;
    educationList.appendChild(div);
  });

  // Experience
  const experienceList = document.getElementById("experience-list");
  if (resumeData.experience.length > 0) {
    resumeData.experience.forEach((exp) => {
      let div = document.createElement("div");
      div.innerHTML = `
                <h4>${exp.role} at ${exp.company}</h4>
                <p>${exp.startDate} - ${exp.endDate}</p>
                <p>${exp.location}</p>
                <p>${exp.description}</p>
            `;
      experienceList.appendChild(div);
    });
  } else {
    document.querySelector(".template-1-experience").style.display = "none";
  }

  // Certifications
  const certList = document.getElementById("certifications-list");
  if (resumeData.certifications.length > 0) {
    resumeData.certifications.forEach((cert) => {
      let li = document.createElement("li");
      li.textContent = cert.details;
      certList.appendChild(li);
    });
  } else {
    document.querySelector(".template-1-certifications").style.display = "none";
  }
});
