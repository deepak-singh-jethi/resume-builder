document.addEventListener("DOMContentLoaded", function () {
  const hobbiesInput = document.getElementById("hobbies-input");
  const hobbiesItem = document.getElementById("hobbies-list");
  const hobbiesSuggestions = document.getElementById("hobbies-suggestions");

  hobbiesList = JSON.parse(localStorage.getItem("hobbiesData")) || [];
  const hobbySuggestionsData = [
    "Reading",
    "Traveling",
    "Painting",
    "Gaming",
    "Cooking",
    "Photography",
    "Music",
    "Dancing",
    "Cycling",
    "Swimming",
    "Gardening",
    "Writing",
    "Blogging",
    "Hiking",
    "Meditation",
  ];

  hobbiesInput.addEventListener("input", function () {
    filterHobbies(hobbiesInput.value);
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
      div.addEventListener("click", () => addHobby(hobby));
      hobbiesSuggestions.appendChild(div);
    });

    hobbiesSuggestions.style.display = filtered.length ? "block" : "none";
  }

  function addHobby(hobby) {
    if (!hobbiesList.includes(hobby)) {
      hobbiesList.push(hobby);
      myData.hobbies = [...hobbiesList];
      localStorage.setItem("hobbiesData", JSON.stringify(hobbiesList));
      localStorage.setItem("resumeData", JSON.stringify(myData));
      renderHobbies();
    }
    hobbiesInput.value = "";
    hobbiesSuggestions.style.display = "none";
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
      deleteBtn.addEventListener("click", () => removeHobby(hobby));

      hobbyTag.appendChild(deleteBtn);
      hobbiesItem.appendChild(hobbyTag);
    });
  }

  function removeHobby(hobby) {
    hobbiesList = hobbiesList.filter((item) => item !== hobby);
    myData.hobbies = [...hobbiesList];
    localStorage.setItem("hobbiesData", JSON.stringify(hobbiesList));
    localStorage.setItem("resumeData", JSON.stringify(myData));
    renderHobbies();
  }

  renderHobbies();
});
