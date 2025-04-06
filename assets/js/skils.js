document.addEventListener("DOMContentLoaded", function () {
  const skillsInput = document.getElementById("skills-input");
  const skillsList = document.getElementById("skills-list");
  const skillsSuggestions = document.getElementById("skills-suggestions");
  const nextButton = document.getElementById("next-btn-skills");
  const prevButton = document.getElementById("prev-btn-skills");

  let skillList = JSON.parse(localStorage.getItem("skillsData")) || [];

  const skillSuggestionsData = ["Java", "javaScript"]; // will add more
  // ✅ Handle "Previous" button navigation

  prevButton.addEventListener("click", function () {
    const prevSectionId = prevButton.getAttribute("action-section");
    if (prevSectionId) {
      showSection(prevSectionId); // Show the previous section
    }
  });

  // ✅ Handle "save and Next" button navigation
  nextButton.addEventListener("click", function () {
    const nextSectionId = nextButton.getAttribute("action-section");

    const skillData = JSON.parse(localStorage.getItem("skillsData")) || []; // Get stored skills
    const hasSavedSkills = skillData.length > 0; // Check if skills exist

    // ✅ Case 1: Skills exist & inputs are empty → Move to next section
    if (!hasSavedSkills) {
      window.alert(
        "Please add a skill or fill in at least one field before proceeding."
      );
      return;
    }
    // ✅ Case 2: Skills exist & inputs are filled → Move to next section
    if (hasSavedSkills) {
      showSection(nextSectionId); // Show the next section
      return;
    }
  });

  // Debounce function to optimize search input
  let debounceTimer;
  skillsInput.addEventListener("input", function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      filterSkills(skillsInput.value);
    }, 300);
  });

  // Function to filter skill suggestions
  function filterSkills(query) {
    skillsSuggestions.innerHTML = "";
    if (!query) {
      skillsSuggestions.style.display = "none";
      return;
    }

    const filteredSuggestions = skillSuggestionsData.filter(
      (skill) =>
        skill.toLowerCase().includes(query.toLowerCase()) &&
        !skillList.includes(skill)
    );

    filteredSuggestions.forEach((skill) => {
      const div = document.createElement("div");
      div.textContent = skill;
      div.addEventListener("click", () => addSkill(skill));
      skillsSuggestions.appendChild(div);
    });

    skillsSuggestions.style.display = filteredSuggestions.length
      ? "block"
      : "none";
  }

  // Function to add skill
  function addSkill(skill) {
    if (!skillList.includes(skill)) {
      skillList.push(skill);
      localStorage.setItem("skillsData", JSON.stringify(skillList));
      renderSkills();
    }
    skillsInput.value = "";
    skillsSuggestions.style.display = "none";
  }

  // Function to render skills list
  function renderSkills() {
    skillsList.innerHTML = "";
    skillList.forEach((skill) => {
      const skillTag = document.createElement("div");
      skillTag.classList.add("skill-tag");
      skillTag.textContent = skill;

      // Create delete button with Material Icon
      const deleteBtn = document.createElement("span");
      deleteBtn.classList.add("material-icons", "delete-btn");
      deleteBtn.textContent = "delete"; // Material icon for delete
      deleteBtn.addEventListener("click", () => removeSkill(skill));

      skillTag.appendChild(deleteBtn);
      skillsList.appendChild(skillTag);
    });
  }

  // Function to remove skill
  function removeSkill(skill) {
    skillList = skillList.filter((item) => item !== skill); // Remove selected skill from the list
    localStorage.setItem("skillsData", JSON.stringify(skillList)); // Update localStorage
    renderSkills(); // Re-render the skills list
  }

  // Initial rendering of skills from localStorage
  renderSkills();
});
