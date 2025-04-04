document.addEventListener("DOMContentLoaded", function () {
  // Retrieve all necessary data from localStorage
  const contactData = JSON.parse(localStorage.getItem("contactData")) || {};
  const summaryData =
    localStorage.getItem("summaryData") || "No summary available.";
  const skillsData = JSON.parse(localStorage.getItem("skillsData")) || [];
  const hobbiesData = JSON.parse(localStorage.getItem("hobbiesData")) || [];
  const educationData = JSON.parse(localStorage.getItem("educationData")) || [];
  const experienceData =
    JSON.parse(localStorage.getItem("experienceData")) || [];
  const certificationsData =
    JSON.parse(localStorage.getItem("certificateData")) || [];
  const personalData = JSON.parse(localStorage.getItem("personalData")) || {};

  console.log({
    contactData,
    summaryData,
    skillsData,
    hobbiesData,
    educationData,
    experienceData,
    certificationsData,
    personalData,
  });

  // If no essential contact data exists, alert and stop execution
  if (!contactData.fullName) {
    alert("No resume data found!");
    return;
  }

  // Fill Contact Info
  document.getElementById("name").textContent =
    contactData.fullName || "Your Name";
  document.getElementById("email").textContent =
    contactData.email || "Email Not Provided";
  document.getElementById("phone").textContent =
    contactData.phone || "Phone Not Provided";
  document.getElementById("location").textContent = `${
    contactData.city || ""
  }, ${contactData.country || ""}`.trim();
  document.getElementById("summary").textContent = summaryData;

  // Fill Skills
  const skillsList = document.getElementById("skills-list");
  skillsData.forEach((skill) => {
    let li = document.createElement("li");
    li.textContent = skill;
    skillsList.appendChild(li);
  });

  // Fill Hobbies
  const hobbiesList = document.getElementById("hobbies-list");
  hobbiesData.forEach((hobby) => {
    let li = document.createElement("li");
    li.textContent = hobby;
    hobbiesList.appendChild(li);
  });

  // Fill Education
  const educationList = document.getElementById("education-list");
  if (educationData.length > 0) {
    educationData.forEach((edu) => {
      let div = document.createElement("div");
      div.innerHTML = `
        <h4>${edu.degree || "Degree Not Provided"} in ${
        edu.specialization || "Specialization Not Provided"
      }</h4>
        <p>${edu.institution || "Institution Not Provided"} (${
        edu.startYear || "Start Year"
      } - ${edu.endYear || "End Year"})</p>
        <p>${edu.scoreType || "Score Type"}: ${edu.score || "N/A"}</p>
      `;
      educationList.appendChild(div);
    });
  } else {
    document.querySelector(".template-1-education").style.display = "none";
  }

  // Fill Experience
  const experienceList = document.getElementById("experience-list");
  if (experienceData.length > 0) {
    experienceData.forEach((exp) => {
      let div = document.createElement("div");
      div.innerHTML = `
        <h4>${exp.role || "Role Not Provided"} at ${
        exp.company || "Company Not Provided"
      }</h4>
        <p>${exp.startDate || "Start Date"} - ${exp.endDate || "End Date"}</p>
        <p>${exp.location || "Location Not Provided"}</p>
        <p>${exp.description || "No description available."}</p>
      `;
      experienceList.appendChild(div);
    });
  } else {
    document.querySelector(".template-1-experience").style.display = "none";
  }

  // Fill Certifications
  const certList = document.getElementById("certifications-list");
  if (certificationsData.length > 0) {
    certificationsData.forEach((cert) => {
      let li = document.createElement("li");
      li.textContent = cert.details || "No Certification Details";
      certList.appendChild(li);
    });
  } else {
    document.querySelector(".template-1-certifications").style.display = "none";
  }
});
