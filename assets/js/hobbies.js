document.addEventListener("DOMContentLoaded", function () {
  const hobbiesInput = document.getElementById("hobbies-input");
  const hobbiesItem = document.getElementById("hobbies-list");
  const hobbiesSuggestions = document.getElementById("hobbies-suggestions");
  const prevBtn = document.getElementById("prev-btn-hobbies");
  const nextBtn = document.getElementById("next-btn-hobbies");

  prevBtn.addEventListener("click", function () {
    const prevSectionId = prevBtn.getAttribute("action-section");
    if (prevSectionId) showSection(prevSectionId);
  });

  nextBtn.addEventListener("click", function () {
    const nextSectionId = nextBtn.getAttribute("action-section");
    if (nextSectionId) showSection(nextSectionId);
  });

  let hobbiesList = JSON.parse(localStorage.getItem("hobbiesData")) || [];

  const hobbySuggestionsData = [
    // [Full hobby list here as provided earlier...]
    "Reading",
    "Writing",
    "Blogging",
    "Painting",
    "Sketching", // ... etc
  ];

  hobbiesInput.addEventListener("input", function () {
    filterHobbies(hobbiesInput.value.trim());
  });

  // Handle Enter key for custom hobbies
  hobbiesInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      const hobby = hobbiesInput.value.trim();
      if (hobby && !hobbiesList.includes(hobby)) {
        addHobby(hobby);
      }
    }
  });

  function filterHobbies(query) {
    hobbiesSuggestions.innerHTML = "";
    if (!query) {
      hobbiesSuggestions.style.display = "none";
      return;
    }

    const filtered = hobbySuggestionsData.filter(
      (hobby) =>
        hobby.toLowerCase().includes(query.toLowerCase()) &&
        !hobbiesList.includes(hobby)
    );

    filtered.forEach((hobby) => {
      const div = document.createElement("div");
      div.textContent = hobby;
      div.classList.add("suggestion-item");
      div.addEventListener("click", () => addHobby(hobby));
      hobbiesSuggestions.appendChild(div);
    });

    hobbiesSuggestions.style.display = filtered.length ? "block" : "none";
  }

  function addHobby(hobby) {
    hobbiesList.push(hobby);
    localStorage.setItem("hobbiesData", JSON.stringify(hobbiesList));
    renderHobbies();
    hobbiesInput.value = "";
    hobbiesSuggestions.style.display = "none";

    Swal.fire({
      icon: "success",
      title: "Hobby Added",
      text: `"${hobby}" has been added to your hobbies!`,
      timer: 1500,
      showConfirmButton: false,
    });
  }

  function renderHobbies() {
    hobbiesItem.innerHTML = "";
    hobbiesList.forEach((hobby) => {
      const hobbyTag = document.createElement("div");
      hobbyTag.classList.add("hobby-tag");
      hobbyTag.textContent = hobby;

      const deleteBtn = document.createElement("span");
      deleteBtn.classList.add("material-icons", "delete-btn");
      deleteBtn.textContent = "delete";
      deleteBtn.title = "Remove hobby";
      deleteBtn.addEventListener("click", () => confirmRemoveHobby(hobby));

      hobbyTag.appendChild(deleteBtn);
      hobbiesItem.appendChild(hobbyTag);
    });
  }

  function confirmRemoveHobby(hobby) {
    Swal.fire({
      title: `Remove "${hobby}"?`,
      text: "Are you sure you want to delete this hobby?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        hobbiesList = hobbiesList.filter((item) => item !== hobby);
        localStorage.setItem("hobbiesData", JSON.stringify(hobbiesList));
        renderHobbies();

        Swal.fire({
          icon: "success",
          title: "Deleted",
          text: `"${hobby}" has been removed.`,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  }

  renderHobbies();
});
