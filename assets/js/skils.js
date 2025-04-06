document.addEventListener("DOMContentLoaded", function () {
  const skillsInput = document.getElementById("skills-input");
  const skillsListEl = document.getElementById("skills-list");
  const skillsSuggestions = document.getElementById("skills-suggestions");
  const nextButton = document.getElementById("next-btn-skills");
  const prevButton = document.getElementById("prev-btn-skills");

  let skillList = JSON.parse(localStorage.getItem("skillsData")) || [];

  const skillSuggestionsData = [
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "HTML",
    "CSS",
    "React",
    "Node.js",
    "SQL",
    "MongoDB",
  ];

  // Navigation: Go to previous section
  prevButton.addEventListener("click", function () {
    const prevSectionId = prevButton.getAttribute("action-section");
    if (prevSectionId) showSection(prevSectionId);
  });

  // Navigation: Validate skills before moving to next section
  nextButton.addEventListener("click", function () {
    const nextSectionId = nextButton.getAttribute("action-section");
    if (skillList.length === 0) {
      Swal.fire(
        "No Skills Added",
        "Please add at least one skill before continuing.",
        "warning"
      );
      return;
    }
    showSection(nextSectionId);
  });

  // Debounced skill input for suggestions
  let debounceTimer;
  skillsInput.addEventListener("input", function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      filterSkills(skillsInput.value.trim());
    }, 300);
  });

  // Handle Enter key for custom skill entry
  skillsInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      const skillName = skillsInput.value.trim();
      if (
        skillName &&
        !skillList.some((s) => s.name.toLowerCase() === skillName.toLowerCase())
      ) {
        addSkill(skillName);
      }
    }
  });

  // Filter and show suggestions
  function filterSkills(query) {
    skillsSuggestions.innerHTML = "";
    if (!query) {
      skillsSuggestions.style.display = "none";
      return;
    }

    const filtered = skillSuggestionsData.filter(
      (skill) =>
        skill.toLowerCase().includes(query.toLowerCase()) &&
        !skillList.some((s) => s.name.toLowerCase() === skill.toLowerCase())
    );

    filtered.forEach((skill) => {
      const div = document.createElement("div");
      div.textContent = skill;
      div.classList.add("suggestion-item");
      div.addEventListener("click", () => addSkill(skill));
      skillsSuggestions.appendChild(div);
    });

    skillsSuggestions.style.display = filtered.length ? "block" : "none";
  }

  // Show modal to select skill level
  function addSkill(skillName) {
    if (skillList.some((s) => s.name.toLowerCase() === skillName.toLowerCase()))
      return;

    Swal.fire({
      title: `What's your proficiency in "${skillName}"?`,
      text: "Choose the most appropriate level:",
      input: "radio",
      inputOptions: {
        Beginner: "Beginner",
        Intermediate: "Intermediate",
        Expert: "Expert",
        skip: "Skip",
      },
      inputValidator: (value) => {
        if (!value) return "Please select a skill level.";
      },
      confirmButtonText: "Add Skill",
      showCancelButton: true,
      customClass: {
        popup: "swal-skill-popup",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        skillList.push({ name: skillName, level: result.value });
        localStorage.setItem("skillsData", JSON.stringify(skillList));
        renderSkills();
        skillsInput.value = "";
        skillsSuggestions.style.display = "none";
      }
    });
  }

  // Display all selected skills
  function renderSkills() {
    skillsListEl.innerHTML = "";
    skillList.forEach(({ name, level }) => {
      const skillTag = document.createElement("div");
      skillTag.classList.add("skill-tag");

      const displayText = level === "skip" ? name : `${name} (${level})`;
      skillTag.textContent = displayText;

      const deleteBtn = document.createElement("span");
      deleteBtn.classList.add("material-icons", "delete-btn-skill");
      deleteBtn.textContent = "delete";
      deleteBtn.title = "Remove skill";
      deleteBtn.setAttribute("data-skill", name);

      deleteBtn.addEventListener("click", function () {
        const skillNameToRemove = this.getAttribute("data-skill");
        removeSkill(skillNameToRemove);
      });

      skillTag.appendChild(deleteBtn);
      skillsListEl.appendChild(skillTag);
    });
  }

  // Remove a skill
  function removeSkill(skillName) {
    Swal.fire({
      title: `Remove "${skillName}"?`,
      text: "Are you sure you want to delete this skill?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        skillList = skillList.filter((s) => s.name !== skillName); // ✅ Correct logic
        localStorage.setItem("skillsData", JSON.stringify(skillList));
        renderSkills();

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `"${skillName}" has been removed.`,
          timer: 1200,
          showConfirmButton: false,
        });
      }
    });
  }

  // Initial render
  renderSkills();
});
