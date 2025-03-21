document.addEventListener("DOMContentLoaded", function () {
  // 📝 Professional Summary Section Logic
  const summaryTextarea = document.getElementById("summary-text");
  const charCounter = document.getElementById("char-counter");
  const maxChars = 300;

  if (summaryTextarea) {
    // Update character count dynamically
    summaryTextarea.addEventListener("input", function () {
      const charCount = summaryTextarea.value.length;
      charCounter.textContent = `${charCount}/${maxChars}`;

      // Prevent exceeding character limit
      if (charCount > maxChars) {
        summaryTextarea.value = summaryTextarea.value.substring(0, maxChars);
        charCounter.textContent = `${maxChars}/${maxChars}`;
      }
    });

    // Function to insert a predefined summary
    window.insertSuggestion = function () {
      summaryTextarea.value =
        "Experienced software engineer with expertise in web development, passionate about creating user-friendly applications.";
      charCounter.textContent = `${summaryTextarea.value.length}/${maxChars}`;
    };
  }
});
