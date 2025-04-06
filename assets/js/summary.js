document.addEventListener("DOMContentLoaded", function () {
  const saveAndNextButton = document.getElementById("next-btn-summary");
  const prevButton = document.getElementById("prev-btn-summary");

  // 📌 Get modal elements
  const summaryModal = document.getElementById("summary-modal");
  const openModalBtn = document.getElementById("open-summary-modal");
  const closeModalBtn = document.querySelector(".close-btn");
  const summaryList = document.getElementById("summary-list");

  const charCounter = document.getElementById("char-counter");
  const maxChars = 300; // 🔢 Maximum character limit for summary
  const summaryTextarea = document.getElementById("summary-text");

  summaryModal.style.display = "none";

  // ✅ Retrieve summary data from localStorage
  const storedSummary = localStorage.getItem("summaryData") || "";
  summaryTextarea.value = storedSummary;
  charCounter.textContent = `${storedSummary.length}/${maxChars}`;

  // 📝 List of predefined summary suggestions
  const suggestions = [
    "Experienced software engineer specializing in web development and UI/UX design.",
    "Creative and detail-oriented developer with a passion for building interactive applications.",
    "Proficient in JavaScript, React, and Node.js with strong problem-solving skills.",
    "Dedicated software engineer with expertise in full-stack development and cloud computing.",
    "Highly motivated coder with experience in scalable and optimized web applications.",
    "Software developer with 5+ years of experience in front-end and back-end technologies.",
    "Full-stack developer with expertise in building scalable and secure web applications.",
    "Passionate UI/UX designer focused on delivering visually appealing and user-friendly interfaces.",
    "Experienced in Agile development, working in collaborative environments to deliver high-quality software.",
    "Backend developer specializing in database management, API development, and system architecture.",
    "Frontend engineer with expertise in modern JavaScript frameworks like React, Angular, and Vue.",
    "Tech enthusiast passionate about building high-performance and accessible web applications.",
    "Strong problem-solver with experience in algorithms, data structures, and software optimization.",
    "Mobile app developer skilled in React Native and Flutter, creating cross-platform applications.",
    "Cloud computing expert with experience in AWS, Azure, and serverless architectures.",
    "AI/ML enthusiast with knowledge in Python, TensorFlow, and deep learning applications.",
    "Cybersecurity specialist with expertise in ethical hacking, penetration testing, and data protection.",
    "Blockchain developer with hands-on experience in smart contracts and decentralized applications.",
    "Game developer with proficiency in Unity and Unreal Engine, passionate about immersive experiences.",
    "DevOps engineer with expertise in CI/CD pipelines, Kubernetes, and cloud deployment automation.",
  ];

  // ✅ Handle Save and Next
  saveAndNextButton.addEventListener("click", function () {
    const summaryTextValue = summaryTextarea.value.trim();

    if (summaryTextValue === "") {
      Swal.fire({
        icon: "warning",
        title: "Summary is empty",
        text: "Please fill in the summary before continuing.",
      });
      return;
    }

    // ✅ Save summary separately in localStorage
    localStorage.setItem("summaryData", summaryTextValue);

    // ✅ Navigate to the next section
    const nextSectionId = saveAndNextButton.getAttribute("action-section");
    if (nextSectionId) {
      showSection(nextSectionId);
    }
  });

  // ✅ Handle Previous button
  prevButton.addEventListener("click", function () {
    const prevSectionId = prevButton.getAttribute("action-section");
    if (prevSectionId) {
      showSection(prevSectionId);
    }
  });

  //  ********* //
  // MODAL LOGIC //
  //  ********* //

  // 🟢 Open modal when button is clicked
  openModalBtn.addEventListener("click", function () {
    summaryModal.style.display = "flex";
    renderSummaries(); // 🔄 Load summary suggestions into the modal
  });

  // ❌ Close modal when close button is clicked
  closeModalBtn.addEventListener("click", function () {
    summaryModal.style.display = "none";
  });

  // 🔲 Close modal when clicking outside of it
  window.addEventListener("click", function (event) {
    if (event.target === summaryModal) {
      summaryModal.style.display = "none";
    }
  });

  // ⏳ Limit summary text length and update character counter
  summaryTextarea.addEventListener("input", function () {
    if (summaryTextarea.value.length > maxChars) {
      summaryTextarea.value = summaryTextarea.value.substring(0, maxChars);
    }
    charCounter.textContent = `${summaryTextarea.value.length}/${maxChars}`;
  });

  // 📜 Render summary suggestions inside the modal
  function renderSummaries() {
    summaryList.innerHTML = ""; // 🔄 Clear existing list before adding new ones
    suggestions.forEach((text) => {
      const li = document.createElement("li");
      li.textContent = text;
      li.classList.add("summary-item");
      li.addEventListener("click", function () {
        summaryTextarea.value = text; // 📝 Set selected summary text
        charCounter.textContent = `${text.length}/${maxChars}`;
        summaryModal.style.display = "none"; // ❌ Close modal after selection
      });
      summaryList.appendChild(li);
    });
  }
});
