function toggleSection(yesId, noId, sectionClass, storageKey) {
  document.addEventListener("DOMContentLoaded", function () {
    const yesRadio = document.getElementById(yesId);
    const noRadio = document.getElementById(noId);
    const section = document.querySelector(sectionClass);

    if (!yesRadio || !noRadio || !section) {
      console.error(`Missing elements for ${sectionClass}`);
      return;
    }

    // Load saved state, default to "no" if not set
    const savedState = localStorage.getItem(storageKey) || "no";

    if (savedState === "yes") {
      section.style.display = "block";
      yesRadio.checked = true;
    } else {
      section.style.display = "none";
      noRadio.checked = true;
    }

    // Event listeners to toggle section
    yesRadio.addEventListener("change", () => {
      section.style.display = "block";
      localStorage.setItem(storageKey, "yes");
    });

    noRadio.addEventListener("change", () => {
      section.style.display = "none";
      localStorage.setItem(storageKey, "no");
    });
  });
}

// Apply to different sections
toggleSection(
  "experience-yes",
  "experience-no",
  ".experience-form",
  "experienceState"
);
toggleSection("project-yes", "project-no", ".projects-form", "projectState");
toggleSection(
  "certificate-yes",
  "certificate-no",
  ".certificate-form",
  "certificateState"
);
