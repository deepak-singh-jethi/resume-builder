document.addEventListener("DOMContentLoaded", function () {
  const hobbiesInput = document.getElementById("hobbies-input");
  const hobbiesItem = document.getElementById("hobbies-list");
  const hobbiesSuggestions = document.getElementById("hobbies-suggestions");
  const prevBtn = document.getElementById("prev-btn-hobbies");
  const nextBtn = document.getElementById("next-btn-hobbies");
  // const deleteBtn = document.getElementById("delete-btn")

  // ✅ Handle Previous button navigation
  prevBtn.addEventListener("click", function () {
    const prevSectionId = prevBtn.getAttribute("action-section");
    if (prevSectionId) {
      showSection(prevSectionId); // Show the previous section
    }
  });
  // ✅ Handle Next button navigation
  nextBtn.addEventListener("click", function () {
    const nextSectionId = nextBtn.getAttribute("action-section");
    if (nextSectionId) {
      showSection(nextSectionId); // Show the next section
    }
  });

  let hobbiesList = JSON.parse(localStorage.getItem("hobbiesData")) || [];
  const hobbySuggestionsData = [
    // 🎨 Creative & Artistic
    "Reading",
    "Writing",
    "Blogging",
    "Painting",
    "Sketching",
    "Calligraphy",
    "Photography",
    "Graphic Design",
    "Dancing",
    "Singing",
    "Music",
    "Acting",
    "Knitting",
    "Embroidery",
    "Origami",
    "Pottery",
    "Woodworking",
    "Tattoo Art",

    // 🎮 Entertainment & Games
    "Gaming",
    "Board Games",
    "Chess",
    "Puzzle Solving",
    "Card Games",
    "Escape Rooms",
    "Sudoku",
    "Riddles",
    "Crossword Puzzles",
    "Rubik's Cube",
    "Fantasy Sports (Dream11, MPL)",
    "Carrom",
    "Ludo",
    "Gully Cricket",

    // ✈️ Travel & Adventure
    "Traveling",
    "Hiking",
    "Camping",
    "Backpacking",
    "Road Trips",
    "Scuba Diving",
    "Paragliding",
    "Sailing",
    "Skydiving",
    "Mountain Climbing",
    "Jungle Safari",
    "Spiritual Tourism (Visiting Temples, Ashrams, Monasteries)",
    "Bike Riding (Leh-Ladakh Trips)",

    // 🏋️‍♂️ Sports & Fitness
    "Cycling",
    "Swimming",
    "Running",
    "Gym Workouts",
    "Martial Arts",
    "Yoga",
    "Pilates",
    "Tennis",
    "Badminton",
    "Soccer",
    "Basketball",
    "Table Tennis",
    "Cricket",
    "Football",
    "Kabaddi",
    "Kho Kho",
    "Archery",
    "Horse Riding",
    "Gilli Danda",
    "Kite Flying",
    "Mallakhamb",
    "Wrestling (Kushti)",

    // 🍳 Culinary & Food
    "Cooking",
    "Baking",
    "Wine Tasting",
    "Mixology",
    "Food Blogging",
    "Trying Street Food",
    "Exploring Indian Cuisines",

    // 🌱 Nature & Outdoor
    "Gardening",
    "Bird Watching",
    "Fishing",
    "Stargazing",
    "Beekeeping",
    "Farming",
    "Organic Farming",
    "Planting Tulsi, Aloe Vera, and Medicinal Herbs",

    // 📚 Learning & Educational
    "Meditation",
    "Public Speaking",
    "Learning Languages (Hindi, Sanskrit, Tamil, Bengali, etc.)",
    "Programming",
    "DIY Projects",
    "Stock Trading",
    "Philosophy",
    "Astronomy",
    "Mythology Studies",
    "Vedic Mathematics",

    // 🎥 Media & Entertainment
    "Watching Bollywood Movies",
    "Watching Cricket Matches",
    "Listening to Bollywood Songs",
    "Podcast Listening",
    "Film Making",
    "YouTube Content Creation",
    "Vlogging",
    "Indian Classical Music (Sitar, Tabla, Veena, etc.)",

    // 💼 Productivity & Lifestyle
    "Minimalism",
    "Self-Improvement",
    "Journaling",
    "Volunteering",
    "Fundraising",
    "Astrology",
    "Palmistry",
    "Collecting Coins/Stamps",
    "Social Work",
    "Political Debating",
    "Folk Dancing (Garba, Bhangra, Bharatanatyam)",
    "Tattoo Designing",
    "Handicraft Making (Warli Art, Madhubani Art)",

    // 🚀 Tech & Digital
    "Coding",
    "Hackathons",
    "App Development",
    "Tech Blogging",
    "Crypto & NFT Research",
    "Drone Flying",

    // 🛍️ Collecting & Cultural
    "Collecting Antique Items",
    "Temple Hopping",
    "Handicraft Shopping",
    "Indian Ethnic Fashion Designing",

    // 🎭 Performing Arts
    "Drama & Theater",
    "Mimicry",
    "Stand-up Comedy",
    "Poetry Recitation",
    "Shayari Writing",
    "Rangoli Designing",

    // 🔥 Traditional Indian Hobbies
    "Kirtan & Bhajan Singing",
    "Spiritual Chanting (Gayatri Mantra, Hanuman Chalisa)",
    "Astang Yoga",
    "Ayurveda & Herbal Medicine Preparation",
    "Tanpura & Mridangam Playing",
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
      localStorage.setItem("hobbiesData", JSON.stringify(hobbiesList));
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
    console.log();

    hobbiesList = hobbiesList.filter((item) => item !== hobby);
    localStorage.setItem("hobbiesData", JSON.stringify(hobbiesList));
    renderHobbies();
  }

  renderHobbies();
});
