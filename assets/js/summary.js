document.addEventListener("DOMContentLoaded", function () {
  const summaryModal = document.getElementById("summary-modal");
  const openModalBtn = document.getElementById("open-summary-modal");
  const closeModalBtn = document.querySelector(".close-btn");
  const summaryList = document.getElementById("summary-list");
  const summaryTextarea = document.getElementById("summary-text");
  const charCounter = document.getElementById("char-counter");
  const maxChars = 300;

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

  // 🟢 Open modal
  openModalBtn.addEventListener("click", function () {
    summaryModal.style.display = "flex";
    renderSummaries();
  });

  // ❌ Close modal
  closeModalBtn.addEventListener("click", function () {
    summaryModal.style.display = "none";
  });

  // 🔲 Close modal when clicking outside
  window.addEventListener("click", function (event) {
    if (event.target === summaryModal) {
      summaryModal.style.display = "none";
    }
  });

  // limit summary text length
  summaryTextarea.addEventListener("input", function () {
    if (summaryTextarea.value.length > maxChars) {
      summaryTextarea.value = summaryTextarea.value.substring(0, maxChars);
    }
    charCounter.textContent = `${summaryTextarea.value.length}/${maxChars}`;
  });

  // 📜 Render summary suggestions in modal
  function renderSummaries() {
    summaryList.innerHTML = "";
    suggestions.forEach((text) => {
      const li = document.createElement("li");
      li.textContent = text;
      li.addEventListener("click", function () {
        summaryTextarea.value = text;
        charCounter.textContent = `${text.length}/${maxChars}`;
        summaryModal.style.display = "none";
      });
      summaryList.appendChild(li);
    });
  }
});
